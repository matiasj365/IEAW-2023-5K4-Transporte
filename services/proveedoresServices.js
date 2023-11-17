const axios = require('axios');
const consultarApiProveedores = process.env.CONSULTAR_API_PROVEEDORES === 'true';
// URL de la API de clientes
const proveedoresApiUrl = process.env.PROVEEDORES_API_URL;
// Configuración de Auth0
const auth0Domain = process.env.OAUTH_CLIENT_ACCESS_URL_PROVEEDORES;
const auth0ClientId = process.env.OAUTH_CLIENT_ID_PROVEEDORES;
const auth0ClientSecret = process.env.OAUTH_CLIENT_SECRET_PROVEEDORES;
const auth0Audience = process.env.OAUTH_CLIENT_AUDIENCE_PROVEEDORES;

async function getAuth0Token() {
  try {
    const response = await axios.post(`https://${auth0Domain}/oauth/token`, {
      grant_type: 'client_credentials',
      client_id: auth0ClientId,
      client_secret: auth0ClientSecret,
      audience: auth0Audience,
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error al obtener el token de Auth0:', error.message);
    throw error;
  }
}


async function getProveedorData(proveedorId) {
  try {
    if(!consultarApiProveedores)
      return null;
    const token = await getAuth0Token();
    // Realizar solicitud a la API de clientes
    console.log(`Consultando API Proveedores - proveedorId: ${proveedorId}`);
    const proveedorResponse = await axios.get(`${proveedoresApiUrl}/proveedores/${proveedorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`Proveedor: ${JSON.stringify(proveedorResponse.data, null, 2)}`);
    return proveedorResponse.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Proveedor no encontrado
      return null;
    }
    console.error('Error al obtener datos del proveedor:', error.message);
    throw error;
  }
}

module.exports = { getProveedorData };
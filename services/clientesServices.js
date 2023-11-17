const axios = require('axios');

// URL de la API de clientes
const clientesApiUrl = process.env.CLIENTES_API_URL;
// Configuración de Auth0
const auth0Domain = process.env.OAUTH_CLIENT_ACCESS_URL_CLIENTES;
const auth0ClientId = process.env.OAUTH_CLIENT_ID_CLIENTES;
const auth0ClientSecret = process.env.OAUTH_CLIENT_SECRET_CLIENTES;
const auth0Audience = process.env.OAUTH_CLIENT_AUDIENCE_CLIENTES;

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


async function getClientData(clienteId) {
  try {
    const token = await getAuth0Token();
    // Realizar solicitud a la API de clientes
    console.log(`Consultando API Clientes - clientId: ${clienteId}`);
    const clientResponse = await axios.get(`${clientesApiUrl}/clientes/${clienteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return clientResponse.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Cliente no encontrado
      return null;
    }
    console.error('Error al obtener datos del cliente:', error.message);
    throw error;
  }
}

module.exports = { getClientData };
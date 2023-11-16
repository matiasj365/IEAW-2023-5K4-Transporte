const axios = require('axios'); // o 'node-fetch' si estás usando esa biblioteca
const clienteApiUrl = 'https://9b621a6b-829a-47d3-8459-38c7e299dfb4.mock.pstmn.io';
const reservasTransporteModel = require("../models/reservasTransportesModel");

// Función para verificar la existencia del cliente
async function buscarCliente(clienteId) {
  try {
    const response = await axios.get(`${clienteApiUrl}/clientes/${clienteId}`);
    return response.data; 
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Cliente no encontrado
      return null;
    } else {
      // Ocurrió un error diferente
      throw error;
    }
  }
}


module.exports = 
{
 

  getById: async (req,res,next) =>
  {         
    
    try
    {     
      const idCliente = parseInt(req.params.cliente_id);   
    
      const reservasCliente = await reservasTransporteModel.find({ cliente_id: idCliente }).select("id transporte_id cliente_id fecha_inicio fecha_fin precio_total estado");

      const cliente = await buscarCliente(idCliente);

      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }

      // Devolver las reservas y los datos del cliente
      const respuestaCombinada = {
        reservas: reservasCliente,
        cliente: cliente,
      };
      res.set('Content-Type', 'application/json')
      res.status(200).send(JSON.stringify(respuestaCombinada, null, 2));
    }

    catch(e)
    {
      console.log(e)
      e.status = 400;
      next(e)
    }  

  }
}
 
const axios = require('axios'); // o 'node-fetch' si estás usando esa biblioteca
const clientesService = require('../services/clientesServices');
const reservasTransporteModel = require("../models/reservasTransportesModel");

module.exports = 
{
  getById: async (req,res,next) =>
  {         
    
    try
    {     
      const idCliente = parseInt(req.params.cliente_id);   
    
      const reservasCliente = await reservasTransporteModel.find({ cliente_id: idCliente }).select("id transporte_id cliente_id fecha_inicio fecha_fin precio_total estado");

      const cliente = await clientesService.getClientData(idCliente);

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
 
const reservasTransporteModel = require("../models/reservasTransportesModel");

module.exports = 
{
 

  getById: async (req,res,next) =>
  {         
    
    try
    {     
      const idCliente = parseInt(req.params.cliente_id);   
    
      const reservasCliente = await reservasTransporteModel.find({ cliente_id: idCliente }).select("id transporte_id cliente_id fecha_inicio fecha_fin precio_total estado");
      res.set('Content-Type', 'application/json')
      res.status(200).send(JSON.stringify(reservasCliente, null, 2));
    }

    catch(e)
    {
      console.log(e)
      e.status=400;
      next(e)
    }  

  }
}
 
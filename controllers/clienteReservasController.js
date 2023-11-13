const reservasTransporteModel = require("../models/reservasTransportesModel");
const clientesModel = require("../models/clientesModel");

module.exports = 
{
 

  getById: async (req,res,next) =>
  {         
    
    try
    {      

      
      const cliente = await clientesModel.findById(req.params.cliente_id);

      const reservasCliente = await reservasTransporteModel.find({ cliente_id: cliente }).select("transporte_id cliente_id fecha_inicio fecha_fin precio_total estado");
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
 
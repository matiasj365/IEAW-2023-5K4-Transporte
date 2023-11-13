
const reservasTransporteModel = require("../models/reservasTransportesModel");

module.exports = 
{

  getAll: async (req,res,next)=>
  {
    try
    {
      const documents = await reservasTransporteModel.find().select("transporte_id cliente_id fecha_inicio fecha_fin precio_total estado")
           
      res.set('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(documents, null, 2)) 

    }
    catch(e)
    {
      console.log(e)
      e.status=400;
      next(e);
    }
  },

 

  getById: async (req,res,next) =>
  {         
    
    try
    {
      
      const document = await reservasTransporteModel.findById(req.params.reservaTransporteId).select("transporte_id cliente_id fecha_inicio fecha_fin precio_total estado")
      res.set('Content-Type', 'application/json')
      res.status(200).send(JSON.stringify(document, null, 2));
    }

    catch(e)
    {
      console.log(e)
      e.status=400;
      next(e)
    }  

  },
 
  
  create: async (req,res,next) =>
   {
    try
    {
          console.log(req.body)
          const document = new reservasTransporteModel(
          {           
            transporte_id:req.body.transporte_id,
            cliente_id:req.body.cliente_id,
            fecha_inicio:req.body.fecha_inicio,
            fecha_fin:req.body.fecha_fin,
            precio_total:req.body.precio_total,
            estado:req.body.estado
           
          })
          const transporte = await document.save()
          res.status(201).json(transporte)
      }

    catch(e)
    {
      console.log(e)
      e.status=400;
      next(e)
    }  
      
  }

  

}


const transportesModel = require("../models/transportesModel")

const countersmodel = require("../models/countersModel")

module.exports = 
{

  getAll: async (req,res,next)=>
  {
    try
    {
      const documents = await transportesModel.find().select("id tipo descripcion capacidad precio_base proveedor_id")
           
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
     
      const idTransporte = parseInt(req.params.transporteId);
      const document = await transportesModel.find({id: idTransporte}).select("id tipo descripcion capacidad precio_base proveedor_id")
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
      const counter = await countersmodel.findOneAndUpdate(
        { id: "autoval" },
        { $inc: { seqTransporte: 1 } },
        { new: true }
      );
  
      let seqId;
      if (!counter) {
       
        const newval = new countersmodel({ id: "autoval", seqTransporte: 1 });
        await newval.save();
        seqId = 1;
      } else {
        seqId = counter.seqTransporte;
      }    
    
     
          console.log(req.body)
          const nuevoTransporte = new transportesModel(
          { 
            id: seqId,       
            tipo:req.body.tipo,
            descripcion:req.body.descripcion,
            capacidad:req.body.capacidad,
            precio_base:req.body.precio_base,
            proveedor_id:req.body.proveedor_id
           
          })
          const transporte = await nuevoTransporte.save()
          res.status(201).json(transporte)
     }
      catch (error) {
        console.error(error);
    
       
        next(error);
      }
      
  },

  update: async (req,res,next) =>
  {
    try
    {
      const idTransporte= parseInt(req.params.transporteId);
        const update = await transportesModel.updateOne({id:idTransporte},req.body)     
        res.status(200).json(update); 
              

    }
    catch(e)
    {
      console.log(e)
      e.status=400;
      next(e)
    }


  },

  delete: async (req,res,next) =>
  {
    try
    {
      const idTransporte = parseInt(req.params.transporteId);   
     
      const deleteResponse = await transportesModel.deleteOne({id:idTransporte})      
      res.status(200).json(deleteResponse); 
    }

    catch(e)
    {
      console.log(e)
      e.status=400;
      next(e)
    }
  }


}

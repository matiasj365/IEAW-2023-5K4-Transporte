
const transportesModel = require("../models/transportesModel")



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
          console.log(req.body)
          const document = new transportesModel(
          {           
            tipo:req.body.tipo,
            descripcion:req.body.descripcion,
            capacidad:req.body.capacidad,
            precio_base:req.body.precio_base,
            proveedor_id:req.body.proveedor_id
           
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
      
  },

  update: async (req,res,next) =>
  {
    try
    {
        const update = await transportesModel.updateOne({_id:req.params.transporteId},req.body)     
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
         
     
      const deleteResponse = await transportesModel.deleteOne({_id:req.params.transporteId})      
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

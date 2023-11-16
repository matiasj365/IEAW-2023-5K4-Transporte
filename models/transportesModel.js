const mongoose =require('../config/mongodb')



const transportesSchema = mongoose.Schema ({  
 
  id: {
    type: Number,
    unique: true,
    required: true,
  },
    tipo: 
    {
      type:String,
      required: [true,"El campo es obligatorio"],
      minLength:3

    },

    descripcion:
    {
      type:String,
      
    },
    capacidad: 
    {
      type: Number,
      required: [true,"El campo es obligatorio"],
      min:[0,"La capacidad debe ser mayor a 0"]
      
    },
    precio_base: 
    {
      type:Number,
      required: [true,"El campo es obligatorio"],
      min:[0,"El precio debe ser mayor a 0"]
      
    },
    proveedor_id: 
    {
      type: Number,
          
           
    }
   
     

}, { collection: "transportes" })


module.exports = mongoose.model("Transporte", transportesSchema)
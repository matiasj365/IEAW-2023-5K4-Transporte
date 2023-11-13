const mongoose =require('../config/mongodb')
const AutoIncrement = require('mongoose-sequence')(mongoose);


const transportesSchema = mongoose.Schema ({  
 
    
    tipo: 
    {
      type:String,
      required: [true,"El campo es obligatorio"],
      minlength:3

    },

    descripcion:
    {
      type:String,
      
    },
    capacidad: 
    {
      type: Number,
      required: [true,"El campo es obligatorio"],
      min:[0,"El codigo debe ser mayor a 0"]
      
    },
    precio_base: 
    {
      type:Number,
      required: [true,"El campo es obligatorio"],
      min:[0,"El precio debe ser mayor a 0"]
      
    },
    proveedor_id: 
    {
      type: mongoose.Schema.Types.ObjectId,
      
     
           
    }
     

})
transportesSchema.plugin(AutoIncrement, { inc_field: 'id' })
module.exports = mongoose.model("transportes", transportesSchema,'Transporte')
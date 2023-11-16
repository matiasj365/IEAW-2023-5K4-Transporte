const mongoose =require('../config/mongodb')



const clientesSchema = mongoose.Schema ({  
 
  id: {
    type: Number,
    unique: true,
    required: true,
  },
    nombre: 
    {
      type:String,
      required: [true,"El campo es obligatorio"],
      minLength:3

    },

    apellido:
    {
      type:String,
      
    },
    email:
    {
      type:String,
      
    },
    telefono:     
    {
      type: Number,
      required: [true,"El campo es obligatorio"],
      min:[0,"El codigo debe ser mayor a 0"]
      
    },
    documento_identidad: 
    {
      type: Number,
      required: [true,"El campo es obligatorio"],
      min:[0,"El codigo debe ser mayor a 0"]
      
    },
    fecha_nacimiento:
    {
      type: Date
    },  
}, { collection: "clientes" })


module.exports = mongoose.model("Cliente", clientesSchema)
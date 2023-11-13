const mongoose =require('../config/mongodb')

const clientesSchema = mongoose.Schema ({   

  
    nombre: 
    {
      type:String,
     

    },

    apellido:
    {
      type:String,
      
    },
    email: 
    {
      type: String,
      
    },
    telefono: 
    {
      type:String,
     
      
    },
    fecha_nacimiento: 
    {
      type: Date
     
      
    },
    documento_identidad: 
    {
      type: String
     
      
    }
    
    

})

module.exports = mongoose.model("clientes", clientesSchema,'Cliente')
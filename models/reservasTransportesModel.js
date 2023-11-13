const mongoose =require('../config/mongodb')

const reservasSchema = mongoose.Schema ({  
 
  
    transporte_id: 
    {
      type: mongoose.Schema.Types.ObjectId
      

    },

    cliente_id:
    {
      type: mongoose.Schema.Types.ObjectId
      
      
    },
    fecha_inicio: 
    {
      type: Date
     
      
    },
    fecha_fin: 
    {
      type:Date
      
      
    },

    precio_total: 
    {
      type:Number
      
      
    },
    estado: 
    {
    type: String
     
      
    }
     

})

module.exports = mongoose.model("reservasTransportes", reservasSchema,'ReservaTransporte')
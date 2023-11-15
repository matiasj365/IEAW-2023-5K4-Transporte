const mongoose =require('../config/mongodb')
const counterSchema = mongoose.Schema ({  
 
  id: {
    type: String,
    
  },
    seqTransporte: 
    {
      type:Number,
      
    },
    seqReserva:
    {
      type:Number,
      
    }

  })


module.exports = mongoose.model("counters", counterSchema)
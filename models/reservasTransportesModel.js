const mongoose = require('../config/mongodb')

const reservasSchema = mongoose.Schema({

  id: {
    type: Number,
    unique: true,
    required: true,
  },

  transporte_id:
  {
    type: Number


  },

  cliente_id:
  {
    type: Number


  },
  fecha_inicio:
  {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
       
        return value < this.fecha_fin;
      },
      message: 'La fecha de inicio debe ser anterior a la fecha de fin.'
    }
  

  },
  fecha_fin:
  {
    type: Date
    ,required: true


  },

  precio_total:
  {
    type: Number,
    min:[0,"El precio debe ser mayor a 0"]


  },
  estado:
  {
    type: String


  }


}, { collection: "reservasTransportes" })

module.exports = mongoose.model("ReservaTransporte", reservasSchema)
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
    type: Date


  },
  fecha_fin:
  {
    type: Date


  },

  precio_total:
  {
    type: Number


  },
  estado:
  {
    type: String


  }


}, { collection: "reservasTransportes" })

module.exports = mongoose.model("ReservaTransporte", reservasSchema)
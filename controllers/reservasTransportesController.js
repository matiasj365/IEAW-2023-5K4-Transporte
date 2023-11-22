const reservasTransporteModel = require("../models/reservasTransportesModel");
const countersmodel = require("../models/countersModel")
const clientesService = require('../services/clientesServices');
const consultarApiClientes = process.env.CONSULTAR_API_CLIENTES === 'true';

module.exports =
{

  getAll: async (req, res, next) => {
    try {
      const documents = await reservasTransporteModel.find().select("id transporte_id cliente_id fecha_inicio fecha_fin precio_total estado")

      res.set('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(documents, null, 2))

    }
    catch (e) {
      console.log(e)
      e.status = 400;
      next(e);
    }
  },



  getById: async (req, res, next) => {

    try {
      const idReserva = parseInt(req.params.reservaTransporteId);

      const document = await reservasTransporteModel.find({ id: idReserva }).select("id transporte_id cliente_id fecha_inicio fecha_fin precio_total estado")
      res.set('Content-Type', 'application/json')
      res.status(200).send(JSON.stringify(document, null, 2));
    }

    catch (e) {
      console.log(e)
      e.status = res.status;
      next(e)
    }

  },


  create: async (req, res, next) => {
    try {
      const counter = await countersmodel.findOneAndUpdate(
        { id: "autoval" },
        { $inc: { seqReserva: 1 } },
        { new: true }
      );

      let seqId;
      if (!counter) {

        const newval = new countersmodel({ id: "autoval", seqReserva: 1 });
        await newval.save();
        seqId = 1;
      } else {
        seqId = counter.seqReserva;
      }


      console.log(req.body)
      const nuevaReserva = new reservasTransporteModel(
        {
          id: seqId,
          transporte_id: req.body.transporte_id,
          cliente_id: req.body.cliente_id,
          fecha_inicio: req.body.fecha_inicio,
          fecha_fin: req.body.fecha_fin,
          precio_total: req.body.precio_total,
          estado: req.body.estado

        })
      const clienteId = nuevaReserva.cliente_id; // Asume que el ID del cliente está en el cuerpo de la solicitud

      // Verificar la existencia del cliente
      const cliente = await clientesService.getClientData(clienteId);

      if (!cliente && consultarApiClientes) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }

      const reserva = await nuevaReserva.save()
      res.status(201).json(reserva)
    }
    catch (error) {
      console.error(error);


      next(error);
    }

  },
}

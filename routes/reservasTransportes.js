const express = require ('express');
const reservas = express.Router();

var reservasTransportesController = require ('../controllers/reservasTransportesController'); 


reservas.get('/',reservasTransportesController.getAll);
reservas.get('/:reservaTransporteId', reservasTransportesController.getById);
reservas.post('/',reservasTransportesController.create);

module.exports = reservas;
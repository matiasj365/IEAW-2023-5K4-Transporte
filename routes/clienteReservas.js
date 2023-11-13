const express = require ('express');
const clientes = express.Router();

var clientesController = require ('../controllers/clienteReservasController'); 


clientes.get('/:cliente_id/reservas-transporte', clientesController.getById);


module.exports = clientes;
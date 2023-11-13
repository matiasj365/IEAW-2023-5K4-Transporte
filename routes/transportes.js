const express = require ('express');
const transportes = express.Router();

var transportesController = require ('../controllers/transportesController'); 


transportes.get('/',transportesController.getAll);
transportes.get('/:transporteId', transportesController.getById);
transportes.post('/',transportesController.create);
transportes.put('/:transporteId',transportesController.update);
transportes.delete('/:transporteId',transportesController.delete);


module.exports = transportes;

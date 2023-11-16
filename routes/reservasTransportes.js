const express = require ('express');
const reservas = express.Router();

const reservasTransportesController = require ('../controllers/reservasTransportesController'); 
const { requiredScopes } = require("express-oauth2-jwt-bearer");

/**
 * @swagger
 * components:
 *   schemas:
 *     ReservaTransporte:
 *       type: object
 *       properties:
 *         transporte_id:
 *           type: int
 *           description: ID del transporte
 *         cliente_id:
 *           type: int
 *           description: ID del cliente
 *         fecha_inicio:
 *           type: string
 *           format: date
 *           description: Fecha de inicio de la reserva
 *         fecha_fin:
 *           type: string
 *           format: date
 *           description: Fecha de fin de la reserva
 *         precio_total:
 *           type: double
 *           description: Precio total de la reserva
 *         estado:
 *           type: string
 *           description: Estado de la reserva
 *       required:
 *         - transporte_id
 *         - cliente_id
 *         - fecha_inicio
 *         - fecha_fin
 *         - precio_total
 *         - estado
 */ 
  

/**
 * @swagger
 * tags:
 *   name: ReservasTransporte
 *   description: Operaciones relacionadas con la gestión de reservas de transporte
 */


/**
 * @swagger
 * /api/reservas-transporte:
 *   get:
 *     tags:
 *       - ReservasTransporte
 *     
 *     summary: Obtener todas las reservas de transportes
 *     description: Obtiene la lista completa de reservas de  transportes disponibles.
 *     responses:
 *       '200':
 *         description: Operación exitosa. Devuelve la lista de reservas de transportes.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 transporte_id: 1
 *                 cliente_id: 1
 *                 fecha_inicio: "2023-05-01"
 *                 fecha_fin: "2023-05-02"
 *                 precio_total: 100
 *                 estado: "Pendiente"
 *                 
 *               
 *
 
 */


reservas.get('/', requiredScopes("read:reservas"),reservasTransportesController.getAll);



/**
 * @swagger
 * /api/reservas-transporte/{reservaTransporteId}:
 *   get:
 *     tags:
 *       - ReservasTransporte
 *     summary: Obtener una reserva de transporte por ID
 *     description: Obtiene los detalles de un reserva de transporte específico según su ID.
 *     parameters:
 *       - in: path
 *         name: reservaTransporteId                 
 *         description: ID de la reserva a obtener
 *         schema:
 *           type: int
 *     responses:
 *       '200':
 *         description: Operación exitosa. Devuelve los detalles de la reserva del transporte.
 *         content:
 *           application/json:
 *             example:                
 *                 id: 1
 *                 transporte_id: 1
 *                 cliente_id: 1
 *                 fecha_inicio: "2023-05-01"
 *                 fecha_fin: "2023-05-02"
 *                 precio_total: 100
 *                 estado: "Pendiente"
 *       '404':
 *         description: No se encontró la reserva del transporte con el ID proporcionado.
 *         content:
 *           application/json:
 *             example:
 *               error: "Reserva no encontrada"
 */

reservas.get('/:reservaTransporteId', requiredScopes("read:reservas"),reservasTransportesController.getById);

/**
 * @swagger
 * /api/reservas-transporte:
 *   post:
 *     tags:
 *       - ReservasTransporte 
 *     summary: Crear una nueva reserva de transporte
 *     description: Crea una nueva reserva de  transporte con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: 
 *                 transporte_id: 1
 *                 cliente_id: 1
 *                 fecha_inicio: "2023-05-01"
 *                 fecha_fin: "2023-05-02"
 *                 precio_total: 100
 *                 estado: "Pendiente"
 *     responses:
 *       '201':
 *         description: Reserva de transporte creada exitosamente. Devuelve los detalles de la nueva reserva transporte.
 *         content:
 *           application/json:
 *             example:                 
 *                 transporte_id: 1
 *                 cliente_id: 1
 *                 fecha_inicio: "2023-05-01"
 *                 fecha_fin: "2023-05-02"
 *                 precio_total: 100
 *                 estado: "Pendiente"
 *       '400':
 *         description: La solicitud es incorrecta o incompleta.
 *         content:
 *           application/json:
 *             example:
 *               error: "Datos de la reserva incompletos o incorrectos"
 */
reservas.post('/',requiredScopes("write:reservas"),reservasTransportesController.create);

module.exports = reservas;
const express = require ('express');
const transportes = express.Router();
const transportesController = require ('../controllers/transportesController'); 
const { requiredScopes } = require("express-oauth2-jwt-bearer");



/**
 * @swagger
 * components:
 *   schemas:
 *     Transporte:
 *       type: object
 *       properties:
 *         tipo:
 *           type: string
 *           description: Tipo de transporte
 *         descripcion:
 *           type: text
 *           description: Descripcion
 *         capacidad:
 *           type: int
 *           description: Capacidad del transporte
 *         precio_base:
 *           type: double
 *           description: Precio base del transporte
 *         proveedor_id:
 *           type: int
 *           description: ID del proveedor
 *       required:
 *         - tipo
 *         - descripcion
 *         - capacidad
 *         - precio_base
 *         - proveedor_id
 *       example:
 *         tipo: EcoBus
 *         descripcion: El EcoBus es la opción ecológica de TurismoExpedición.   
 *         capacidad: 30
 *         precio_base: 1450000.0
 *         proveedor_id: 1
 */



/**
 * @swagger
 * tags:
 *   name: Transportes
 *   description: Operaciones relacionadas con la gestión de transportes
 */

/**
 * @swagger
 * /api/transportes:
 *   get:
 *     tags:
 *       - Transportes
 *     summary: Obtener todos los transportes
 *     description: Obtiene la lista completa de transportes disponibles.
 *     responses:
 *       '200':
 *         description: Operación exitosa. Devuelve la lista de transportes.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 tipo: "AventuraVan"
 *                 descripcion: "Van para aventuras emocionantes"
 *                 capacidad: 10
 *                 precio_base: 100
 *                 proveedor_id: 123
 *               - id: 2
 *                 tipo: "EcoBus"
 *                 descripcion: "Autobús ecológico para viajes sostenibles"
 *                 capacidad: 30
 *                 precio_base: 150
 *                 proveedor_id: 456
 *
 
 */

transportes.get('/',requiredScopes("read:transportes"), transportesController.getAll);

/**
 * @swagger
 * /api/transportes/{transporteId}:
 *   get:
 * 
 *     tags:
 *       - Transportes
 *     summary: Obtener un transporte por ID
 *     description: Obtiene los detalles de un transporte específico según su ID.
 *     parameters:
 *       - in: path
 *         name: transporteId *        
 *         description: ID del transporte a obtener
 *         schema:
 *           type: int
 *     responses:
 *       '200':
 *         description: Operación exitosa. Devuelve los detalles del transporte.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               tipo: "AventuraVan"
 *               descripcion: "Van para aventuras emocionantes"
 *               capacidad: 10
 *               precio_base: 100
 *               proveedor_id: 123
 *       '404':
 *         description: No se encontró el transporte con el ID proporcionado.
 *         content:
 *           application/json:
 *             example:
 *               error: "Transporte no encontrado"
 */


transportes.get('/:transporteId',requiredScopes("read:transportes"), transportesController.getById);


/**
 * @swagger
 * /api/transportes:
 *   post:
 *     tags:
 *       - Transportes
 *     summary: Crear un nuevo transporte
 *     description: Crea un nuevo transporte con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             tipo: "AventuraVan"
 *             descripcion: "Van para aventuras emocionantes"
 *             capacidad: 10
 *             precio_base: 100
 *             proveedor_id: 123
 *     responses:
 *       '201':
 *         description: Transporte creado exitosamente. Devuelve los detalles del nuevo transporte.
 *         content:
 *           application/json:
 *             example:
 *               id: 2
 *               tipo: "AventuraVan"
 *               descripcion: "Van para aventuras emocionantes"
 *               capacidad: 10
 *               precio_base: 100
 *               proveedor_id: 123
 *       '400':
 *         description: La solicitud es incorrecta o incompleta.
 *         content:
 *           application/json:
 *             example:
 *               error: "Datos de transporte incompletos o incorrectos"
 */


transportes.post('/',requiredScopes("write:transportes"),transportesController.create);

/**
 * @swagger
 * /api/transportes/{transporteId}:
 *   put:
 *     tags:
 *       - Transportes
 *     summary: Actualizar un transporte por ID
 *     description: Actualiza los detalles de un transporte existente según su ID.
 *     parameters:
 *       - in: path
 *         name: transporteId
 *         required: true
 *         description: ID del transporte a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             tipo: "AventuraVan"
 *             descripcion: "Van para aventuras emocionantes (actualizado)"
 *             capacidad: 12
 *             precio_base: 120
 *             proveedor_id: 456
 *     responses:
 *       '200':
 *         description: Transporte actualizado exitosamente. Devuelve los detalles actualizados del transporte.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               tipo: "AventuraVan"
 *               descripcion: "Van para aventuras emocionantes (actualizado)"
 *               capacidad: 12
 *               precio_base: 120
 *               proveedor_id: 456
 *       '404':
 *         description: No se encontró el transporte con el ID proporcionado.
 *
*/

transportes.put('/:transporteId',requiredScopes("write:transportes"),transportesController.update);

/**
 * @swagger
 * /api/transportes/{transporteId}:  
 *  delete:
 *     tags:
 *       - Transportes
 *     summary: Eliminar un transporte por ID
 *     description: Elimina un transporte existente según su ID.
 *     parameters:
 *       - in: path
 *         name: transporteId
 *         required: true
 *         description: ID del transporte a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Transporte eliminado exitosamente. No hay contenido en la respuesta.
 *       '404':
 *         description: No se encontró el transporte con el ID proporcionado.
 *         content:
 *           application/json:
 *             example:
 *               error: "Transporte no encontrado"
 */



transportes.delete('/:transporteId',requiredScopes("write:transportes"),transportesController.delete);


module.exports = transportes;

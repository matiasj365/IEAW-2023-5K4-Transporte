const express = require ('express');
const clientes = express.Router();

var clientesController = require ('../controllers/clienteReservasController'); 


/**
 * @swagger
 * tags:
 *   name: ReservasCliente
 *   description: Operaciones relacionadas con la obtención de reservas de un cliente
 */

/**
 * @swagger
 * /api/clientes/{cliente_id}/reservas-transporte:
 *   get:
 *     tags:
 *       - ReservasCliente
 *     summary: Obtener las reservas de transporte dado un ID Cliente
 *     description: Obtiene los detalles de las reservas de un determinado cliente
 *     parameters:
 *       - in: path
 *         name: cliente_id                 
 *         description: ID del cliente
 *         schema:
 *           type: int
 *     responses:
 *       '200':
 *         description: Operación exitosa. Devuelve las reservas del cliente con el ID proporcionado.
 *         content:
 *           application/json:
 *             example:
 *               reservas:
 *                   [{id: 1,
 *                   transporte_id: 1,
 *                   cliente_id: 1,
 *                   fecha_inicio: "2023-05-01",
 *                   fecha_fin: "2023-05-02",
 *                   precio_total: 100,
 *                   estado: "Pendiente"},
 *                    {id: 2,
 *                   transporte_id: 1,
 *                   cliente_id: 1,
 *                   fecha_inicio: "2023-05-01",
 *                   fecha_fin: "2023-05-02",
 *                   precio_total: 100,
 *                   estado: "Pendiente"}]
 *               cliente:
 *                  id: 1,
 *                  apellido: Perez,
 *                  nombre: Juan
 *       '404':
 *         description: No se encontró la/s reserva/s del cliente con el ID proporcionado.
 *         content:
 *           application/json:
 *             example:
 *               error: "No se encontró la/s reserva/s del cliente con el ID proporcionado."
 */
clientes.get('/:cliente_id/reservas-transporte', clientesController.getById);


module.exports = clientes;
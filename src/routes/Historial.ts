import express from 'express';
import controller from '../controllers/Historial';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Historiales
 *     description: Endpoints CRUD de historiales
 * components:
 *   schemas:
 *     Historial:
 *       type: object
 *       description: Representa un historial en la base de datos
 *       properties:
 *         _id:
 *           type: string
 *           description: ObjectId de MongoDB
 *           example: "65f1c2a1b2c3d4e5f6789012"
 *         libro:
 *           type: string
 *           description: libro que ha realizado accion
 *           example: "65f1qw2a1b23d4e5f6789012"
 *         accion:
 *           type: string
 *           description: Título del accion
 *           example: "create"
 *         descripcion:
 *           type: string
 *           description: descripcion del cambio
 *           example:
 *             - "se ha creado el libro con id 65f1qw2a1b23d4e5f6789012"
 *         fecha:
 *           type: string
 *           description: fecha
 *     HistorialCreateUpdate:
 *       type: object
 *       description: Datos necesarios para crear o actualizar un histirla
 *       required:
 *         - libro
 *         - accion
 *       properties:
 *         libro:
 *           type: string
 *           description: libro que ha realizado accion
 *           example: "65f1qw2a1b23d4e5f6789012"
 *         accion:
 *           type: string
 *           description: Título del accion
 *           example: "create"
 *         descripcion:
 *           type: string
 *           description: descripcion del cambio
 *           example:
 *             - "se ha creado el libro con id 65f1qw2a1b23d4e5f6789012"
 *         fecha:
 *           type: string
 *           description: fecha
 */

/**
 * @openapi
 * /Historial:
 *   post:
 *     summary: Crear un libro
 *     description: Crea un nuevo libro en la base de datos.
 *     tags:
 *       - Historiales
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HistorialCreateUpdate'
 *     responses:
 *       201:
 *         description: Libro creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Historial'
 *       422:
 *         description: Error de validación en los datos enviados
 */
router.post('/', ValidateJoi(Schemas.Historial.create), controller.createHistorial);

/**
 * @openapi
 * /Historial/all:
 *   get:
 *     summary: Listar todos los libros
 *     description: Recupera la lista completa de libros registrados.
 *     tags:
 *       - Historiales
 *     responses:
 *       200:
 *         description: Lista de libros obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Historial'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/all', controller.getAllHistorial);

/**
 * @openapi
 * /Historial/{historialId}:
 *   get:
 *     summary: Obtener un libro por ID
 *     description: Recupera la información de un libro a partir de su identificador.
 *     tags:
 *       - Historiales
 *     parameters:
 *       - in: path
 *         name: historialId
 *         required: true
 *         description: ID del libro en MongoDB
 *         schema:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789012"
 *     responses:
 *       200:
 *         description: Libro obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Historial'
 *       404:
 *         description: Libro no encontrado
 */
router.get('/:historialId', controller.getHistorialById);

/**
 * @openapi
 * /Historial/{HistorialId}:
 *   put:
 *     summary: Actualizar un libro por ID
 *     description: Actualiza los datos de un libro existente a partir de su identificador.
 *     tags:
 *       - Historiales
 *     parameters:
 *       - in: path
 *         name: historialId
 *         required: true
 *         description: ID del libro en MongoDB
 *         schema:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789012"
 *     requestBody:
 *       required: true
 *       description: Datos del libro a actualizar
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HistorialCreateUpdate'
 *     responses:
 *       200:
 *         description: Libro actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Historial'
 *       404:
 *         description: Libro no encontrado
 */
router.put('/:historialId', ValidateJoi(Schemas.Historial.update), controller.updateHistorial);

/**
 * @openapi
 * /Historial/{historialId}:
 *   delete:
 *     summary: Eliminar un libro por ID
 *     description: Elimina un libro existente a partir de su identificador.
 *     tags:
 *       - Historiales
 *     parameters:
 *       - in: path
 *         name: historialId
 *         required: true
 *         description: ID del libro en MongoDB
 *         schema:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789012"
 *     responses:
 *       200:
 *         description: Libro eliminado correctamente
 *       404:
 *         description: Libro no encontrado
 */
router.delete('/:historialId', controller.deleteHistorial);

export default router;

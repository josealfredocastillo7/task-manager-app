const { Task } = require('../models')

/**
 * Obtiene todas las tareas.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una lista de tareas en formato JSON.
 */
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas' })
  }
}

/**
 * Crea una nueva tarea.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud que contiene los datos de la tarea.
 * @param {string} req.body.title - Título de la tarea.
 * @param {string} req.body.description - Descripción de la tarea.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve la tarea creada en formato JSON.
 */
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body
    const task = new Task({ title, description })
    await task.save()
    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la tarea' })
  }
}

/**
 * Actualiza el estado de una tarea existente.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.params - Parámetros de la solicitud.
 * @param {string} req.params.id - ID de la tarea a actualizar.
 * @param {Object} req.body - Cuerpo de la solicitud que contiene los datos a actualizar.
 * @param {string} req.body.status - Nuevo estado de la tarea ("pendiente" o "completada").
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve la tarea actualizada en formato JSON.
 */
const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const task = await Task.findByIdAndUpdate(id, { status }, { new: true })
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' })
    res.status(200).json(task)
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la tarea' })
  }
}

/**
 * Elimina una tarea existente.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.params - Parámetros de la solicitud.
 * @param {string} req.params.id - ID de la tarea a eliminar.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve un mensaje de confirmación en formato JSON.
 */
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findByIdAndDelete(id)
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' })
    res.status(200).json({ message: 'Tarea eliminada' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea' })
  }
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
}
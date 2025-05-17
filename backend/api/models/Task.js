const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pendiente', 'completada'],
    default: 'pendiente',
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('Task', taskSchema)
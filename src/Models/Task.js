const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true, enum: ['pending', 'running', 'done'], default: 'pending' },
    register_date: { type: Date, required: true, default: Date.now } 
})

const _Task = new mongoose.model('Tasks', TaskSchema)

module.exports = {
    Task: _Task
}
const mongoose = require('mongoose')

const SubTaskSchema = new mongoose.Schema({
    task_id: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true, enum: ['pending', 'running', 'done'], default: 'pending' },
    register_date: { type: Date, required: true, default: Date.now }
})

const _SubTask = new mongoose.model('Subtasks', SubTaskSchema)

module.exports = {
    SubTask: _SubTask
}
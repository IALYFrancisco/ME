const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["website", "mobile-application", "desktop-application"], required: true },
    developers: { type: Array, required: true },
    descriptions: { type: String, required: true},
    skills: { type: Array, required: true },
    github_url: { type: String, required: true },
    movie_file_url: { type: String, required: true },
    host_url: { type: String, required: true },
    logo: { type: String, required: true},
    register_date: { type: Date, required: true, default: Date.now }
})

const _Projects = new mongoose.model('Projects', projectSchema)

module.exports = {
    Projects: _Projects
}
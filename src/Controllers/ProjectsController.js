const express = require('express')
const { getAllProjects } = require('../Services/ProjectsServices')

const _project_router = express.Router()

// Route en charge du récupération de la liste de touts mes projets
_project_router.get("/", getAllProjects)

module.exports = {
    project_router : _project_router
}
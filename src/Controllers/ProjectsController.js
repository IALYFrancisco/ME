const express = require('express')
const { getAllProjects, addProject } = require('../Services/ProjectsServices')

const _project_router = express.Router()

// Route en charge du récupération de la liste de touts mes projets
_project_router.get("/get-all", getAllProjects)

// Route en charge d'ajout d'un projet dans la base de donnée
_project_router.post("/post", addProject)

module.exports = {
    project_router : _project_router
}
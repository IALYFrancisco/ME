const express = require('express')
const cors = require('cors')
const { getAllProjects, addProject, DeleteProject } = require('../Services/ProjectsServices')

const _project_router = express.Router()

var allowedOrigins = []

_project_router.use(cors({
    origin: function(_origin, callback){
        if(!_origin || allowedOrigins.includes(_origin)){
            callback(null, true)
        }else{
            callback(new Error("Votre nom de domain n'est pas autorisé."))
        }
    }
}))

// Route en charge du récupération de la liste de touts mes projets
_project_router.get("/get-all", getAllProjects)

// Route en charge d'ajout d'un projet dans la base de donnée
_project_router.post("/post", addProject)

_project_router.post("/delete", DeleteProject)

module.exports = {
    project_router : _project_router
}
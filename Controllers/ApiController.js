const express = require('express')
const { getAllProjects } = require('../Services/ApiServices')
const { model } = require('mongoose')

const _api_router = express.Router()

// Route en charge du récupération de la liste de touts mes projets
_api_router.get("/", getAllProjects)

module.exports = {
    api_router : _api_router
}
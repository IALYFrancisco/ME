const express = require('express')
const { getDashboard, getAPIs, getAddProject, getProjects, getTasks, getAddTask, postTask, getDetailsTask, deletTask, putTask } = require('../Services/DashboardServices')
const { postProject } = require('../Services/ProjectsServices')
const _dashboard_router = express.Router()

_dashboard_router.get('/', getDashboard)

_dashboard_router.get('/apis', getAPIs)

_dashboard_router.get('/add-project', getAddProject)

_dashboard_router.post('/add-project', postProject)

_dashboard_router.get('/projects', getProjects)

_dashboard_router.get('/tasks', getTasks)

_dashboard_router.get('/add-task', getAddTask)

_dashboard_router.post('/add-task', postTask)

_dashboard_router.get('/task-details/:id', getDetailsTask)

_dashboard_router.post('/task-details/:id', deletTask)

_dashboard_router.post('/task-update/:id', putTask)

module.exports = {
    dashboard_router : _dashboard_router
}
const express = require('express')
const { getDashboard, getAPIs, getAddProject } = require('../Services/DashboardServices')
const _dashboard_router = express.Router()

_dashboard_router.get('/', getDashboard)

_dashboard_router.get('/apis', getAPIs)

_dashboard_router.get('/add-project', getAddProject)

module.exports = {
    dashboard_router : _dashboard_router
}
const express = require('express')
const { getDashboard, getAPIs } = require('../Services/DashboardServices')

const _dashboard_router = express.Router()

_dashboard_router.get('/', getDashboard)

_dashboard_router.get('/apis', getAPIs)

module.exports = {
    dashboard_router : _dashboard_router
}
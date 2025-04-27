const express = require('express')
const { getDashboard } = require('../Services/DashboardServices')

const _dashboard_router = express.Router()

_dashboard_router.get('/', getDashboard)

module.exports = {
    dashboard_router : _dashboard_router
}
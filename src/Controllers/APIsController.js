const express = require('express')
const { generateAPIKey } = require('../Services/APIServices')

const _api_router = express.Router()

_api_router.post('/generate-key', generateAPIKey)

module.exports = {
    api_router: _api_router
}
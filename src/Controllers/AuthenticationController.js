const express = require('express')
const { getlogin } = require('../Services/AuthenticationServices')

const _authentication_router = express.Router()

_authentication_router.get('/login', getlogin)

module.exports = {
    authentication_router: _authentication_router
}
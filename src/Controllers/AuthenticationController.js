const express = require('express')
const { getlogin, postLogin } = require('../Services/AuthenticationServices')

const _authentication_router = express.Router()

_authentication_router.get('/login', getlogin)

_authentication_router.post('/login', postLogin)

module.exports = {
    authentication_router: _authentication_router
}
const express = require('express')
const { getlogin, postLogin, logOut } = require('../Services/AuthenticationServices')

const _authentication_router = express.Router()

_authentication_router.get('/login', getlogin)

_authentication_router.post('/login', postLogin)

_authentication_router.post('/logout', logOut)

module.exports = {
    authentication_router: _authentication_router
}
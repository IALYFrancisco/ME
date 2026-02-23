const dotenv = require('dotenv')
const { EDOTASK } = require('./services/services')
const { DbConnection } = require('../src/Services/db')

dotenv.config()
DbConnection()

try {
    EDOTASK()
}catch(_error){
    console.log({
        message : "Failed to create superuser.",
        error : _error
    })
}
const dotenv = require('dotenv')
const { LDOTASK } = require('./services/services')
const { DbConnection } = require('../src/Services/db')

dotenv.config()
DbConnection()

try {
    LDOTASK()
}catch(_error){
    console.log({
        message : "Failed to create superuser.",
        error : _error
    })
}
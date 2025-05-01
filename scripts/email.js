const dotenv = require('dotenv')
const { EDOTASK } = require('./services/services')

dotenv.config()

try {
    EDOTASK()
}catch(_error){
    console.log({
        message : "Failed to create superuser.",
        error : _error
    })
}
const dotenv = require('dotenv')
const { LDOTASK } = require('./services/services')

dotenv.config()

try {
    LDOTASK()
}catch(_error){
    console.log({
        message : "Failed to create superuser.",
        error : _error
    })
}
const dotenv = require('dotenv')
const { DOTASK } = require('./services/services')

dotenv.config()

try {
    DOTASK()
}catch(_error){
    console.log({
        message : "Failed to create superuser.",
        error : _error
    })
}
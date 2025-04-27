const crypto = require('crypto')

function _checkAPIKey(request, response, next){
    try{
        let api_key = request.header("x-api-key")
        let API_KEYS = ["mysecret_aapi_key"]
        if(!api_key || !API_KEYS.includes(api_key)){
            return response.status(403).json({
                message: "Clé api invalide."
            })
        }
        next()
    }catch(_error){
        console.log({
            message: "Error checking api key. Maybe server error.",
            error: _error
        })
        response.status(500).json({
            message: "Error server. Try later.",
            error: _error
        })
    }
}

function _generateAPIKey(request, response){
    try{
        let new_api_key = crypto.randomBytes(32).toString('hex')
        response.status(201).json({
            message: "Api created successfully.",
            data: {
                api_key: new_api_key
            }
        })
    }catch(_error){
        response.status(500).json({
            message: "Error creating api key. Maybe server eror",
            error: _error
        })
    }
}

module.exports = {
    checkAPIKey: _checkAPIKey,
    generateAPIKey: _generateAPIKey
}
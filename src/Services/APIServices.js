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

module.exports = {
    checkAPIKey: _checkAPIKey
}
const { connexion, disconnexion } = require("./DbServices")

function _getRoot(request, response){
    try{
        response.redirect('/authentication/login')
    }catch(_error){
        console.log(`Failed to redirect to /authentication/login: ${_error}`)
    }
}

function _getLogin(request, response){
    try {
        response.render('Authentication/Login')
    }catch(_error){
        console.log(`Failed to get /authentication/login: ${_error}`)
    }
}

async function _postLogin(request, response){
    try{
        const { email, password } = request.body
        await connexion()
        let user = await
    }catch(_error){

    }
}

module.exports = {
    getlogin: _getLogin,
    getRoot: _getRoot,
    postLogin: _postLogin
}
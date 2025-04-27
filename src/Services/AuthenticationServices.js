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

module.exports = {
    getlogin: _getLogin,
    getRoot: _getRoot
}
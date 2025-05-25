const { Users } = require("../Models/UsersModel")
const { connexion, disconnexion } = require("./DbServices")
const bcrypt = require('bcrypt')

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
        let user = await Users.findOne({email})
        if(!user){
            request.flash('error', "User doesn't exist.")
            return response.redirect("/authentication/login")
        }
        if(user && await comparePassword(password, user.password)){
            request.session.user = {
                name: user.name,
                email: user.email,
            }
            return response.redirect('/backoffice')
        }else{
            request.flash('error', "Email or password incorrect.")
            return response.redirect("/authentication/login")
        }
    }catch(_error){
        console.log("User connexion failure:" + _error)
        request.flash('error', 'Failed to log in, try next time.')
        return response.redirect("/authentication/login")
    }finally{
        await disconnexion()
    }
}

function _logOut(request, response){
    request.session.destroy(()=>{
        response.redirect("/authentication/login")
    })
}

async function comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

function _isAuthenticated(request, response, next){
    if(request.session.user) return next()
    request.flash('error', 'You must be connected.')
    return response.redirect('/authentication/login')
}

function _zappLogin(request, response, next){
    if (request.session.user) return response.redirect('/backoffice')
    return next()
}

module.exports = {
    getlogin: _getLogin,
    getRoot: _getRoot,
    postLogin: _postLogin,
    isAuthenticated: _isAuthenticated,
    logOut : _logOut
    zappLogin : _zappLogin
}
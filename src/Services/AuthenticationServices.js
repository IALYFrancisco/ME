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

// async function _postLogin(request, response){
//     try{
//         const { email, password } = request.body
//         await connexion()
//         let user = await Users.findOne({email})
//         await disconnexion()
//         if(!user){
//             request.flash('error', "User doesn't exist.")
//             return response.redirect("authentication/login")
//         }
//         if(user && )
//     }catch(_error){

//     }
// }

// async function comparePassword(plainPassword, hashedPassword) {
//     return await b
// }

function _isAuthenticated(request, response, next){
    if(request.session.user) return next()
    request.flash('error', 'You must be connected.')
    return response.redirect('/authentication/login')
}

module.exports = {
    getlogin: _getLogin,
    getRoot: _getRoot,
    // postLogin: _postLogin,
    isAuthenticated: _isAuthenticated
}
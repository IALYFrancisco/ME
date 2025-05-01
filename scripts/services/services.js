async function _checkSuperuser(){
    await connexion()
    let user = await Users.findOne({email : process.env.SUPERUSER_EMAIL})
    if(user){
        await disconnexion()
        return true
    }
    else{
        await disconnexion()
        return false
    }
}

module.exports = {
    checkSuperuser : _checkSuperuser
}
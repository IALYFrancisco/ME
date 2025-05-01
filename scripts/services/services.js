const { connexion, disconnexion } = require("../../src/Services/DbServices")
const { Users } = require('../../src/Models/UsersModel')

async function checkSuperuser(){
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

async function createSuperuser(){
    try{
        console.log("Creating superuser ...")
        userToCreate.password = await hashpassword(`${Math.PI}`)
        await connexion()
        let user = Users(userToCreate)
        await user.save()
        await disconnexion()
        return true
    }catch(err){
        console.log({
            message: "Error creating superuser.",
            error: err
        })
        return false
    }
}

async function save_local(){
    
}

async function _DOTASK(){
    
    var userToCreate = {
        name: null,
        email: null,
        password: null,
        role : "admin"
    }
    
    if(process.env.SUPERUSER_NAME) {
        let userName = process.env.SUPERUSER_NAME
        userToCreate.name = userName
    }else {
        console.log("La variable d'environnement SUPERUSER_NAME n'est pas définie.")
    }

    if(process.env.SUPERUSER_EMAIL) {
        let userEmail = process.env.SUPERUSER_EMAIL
        userToCreate.email = userEmail
    }else {
        console.log("La variable d'environnement SUPERUSER_EMAIL n'est pas définie.")
    }

    if(await checkSuperuser()){
        console.log("Superuser already exist.")
        return ""
    }else{
        let results = await createSuperuser()
        if(results){
            console.log("Sauvegarde en local ...")
            await save_local()
        }
    }

}

async function hashpassword(plainText){
    return await bcrypt.hash(plainText, 10)
}

module.exports = {
    DOTASK : _DOTASK
}
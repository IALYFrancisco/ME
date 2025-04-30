const dotenv = require('dotenv')
const { connection, disconnection } = require('../src/services/db')
const { Users } = require('../src/models/usersModel')
const bcrypt = require('bcrypt')
const { send_email } = require('./email')

dotenv.config()

async function checkSuperuser(){
    await connection()
    let user = await Users.findOne({email : process.env.SUPERUSER_EMAIL})
    if(user){
        await disconnection()
        return true
    }
    else{
        await disconnection()
        return false
    }
}

async function hashpassword(plainText){
    return await bcrypt.hash(plainText, 10)
}

async function DOTASK(){
    
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
        console.log("Creating superuser ...")
        userToCreate.password = await hashpassword(`${Math.PI}`)
        await connection()
        let user = Users(userToCreate)
        let saveUserResult = await user.save()
        await disconnection()
        if(saveUserResult){
            console.log("Superuser created.")
            await send_email(Math.PI)
        }
    }

}

try {
    DOTASK()
}catch(_error){
    console.log({
        message : "Failed to create superuser.",
        error : _error
    })
}
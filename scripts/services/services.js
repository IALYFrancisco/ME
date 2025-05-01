const { connexion, disconnexion } = require("../../src/Services/DbServices")
const { Users } = require('../../src/Models/UsersModel')
const fs = require('fs')
const os = require('os')
const bcrypt = require('bcrypt')
const path = require('path')
const { default: axios } = require("axios");

var userToCreate = {
    name: null,
    email: null,
    password: null,
    role : "admin"
}

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

async function save_local(u,p){
    try {
        let homeDir = os.homedir()
        let dossierSuperuser = path.join(homeDir, '.me', 'superuser')
        fs.mkdirSync(dossierSuperuser, { recursive: true })
        let fileContents =
        `{"name":"${u.name}","email":"${u.email}","password":"${p}"}`
        let filePath = path.join(dossierSuperuser, 'informations.json')
        fs.writeFileSync(filePath, fileContents, 'utf-8')
        console.log(`Superuser informations is saved at ${filePath}`)
    }catch(err) {
        console.log({
            message: "Error saving superuser informations to local device.",
            error: err
        })
    }
}

async function _LDOTASK(){
    
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
            await save_local(userToCreate, Math.PI)
        }
    }

}

async function _EDOTASK(){
    
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
            await save_local(userToCreate, Math.PI)
        }
    }

}

async function hashpassword(plainText){
    return await bcrypt.hash(plainText, 10)
}

module.exports = {
    LDOTASK : _LDOTASK,
    EDOTASK : _EDOTASK
}
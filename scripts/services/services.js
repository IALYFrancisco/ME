const { connexion, disconnexion } = require("../../src/Services/DbServices")
const { Users } = require('../../src/Models/UsersModel')
const fs = require('fs')
const os = require('os')
const bcrypt = require('bcrypt')
const path = require('path')
const { default: axios } = require("axios");
const chalk = require('chalk')

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
        console.log(chalk.yellow("Creating superuser ..."))
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
        console.log(chalk.yellow(`Superuser informations is saved at ${filePath}`))
        console.log(chalk.bgGreenBright.black('Done!'))
    }catch(err) {
        console.log({
            message: "Error saving superuser informations to local device.",
            error: err
        })
    }
}

async function send_email(password){
    try{

        let emaiTemplateHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <main style="width: 100%; height: max-content;">
                    <section style="width: 100%; max-width: 500px; margin: 100px auto;">
                        <header style="height: 50px; width: 100%; background-color: #581845; border-top-right-radius: 10px; border-top-left-radius: 10px;"></header>
                        <section style="padding: 50px 25px 25px 25px">
                            <h2 style="font-family: 'Trebuchet MS', Arial, sans-serif;">Superuser informations:</h2>
                        </section>
                        <section style="padding: 0 25px; margin-top: 15px; margin-bottom: 50px;">
                            <div style="display: flex; align-items: center;">
                                <h4 style="font-family: 'Trebuchet MS', Arial, sans-serif; margin: 0; padding: 0;">Name: </h4><p style="font-family: 'Trebuchet MS', Arial, sans-serif; margin-left: 10px;">${process.env.SUPERUSER_NAME}</p>
                            </div>
                            <div style="display: flex; align-items: center; margin-top: 15px; padding: 0;">
                                <h4 style="font-family: 'Trebuchet MS', Arial, sans-serif; margin: 0; padding: 0;">Email: </h4><p style="font-family: 'Trebuchet MS', Arial, sans-serif; margin-left: 10px;">${process.env.SUPERUSER_EMAIL}</p>
                            </div>
                            <div style="display: flex; align-items: center; margin-top: 15px; padding: 0;">
                                <h4 style="font-family: 'Trebuchet MS', Arial, sans-serif; margin: 0; padding: 0;">Initial password: </h4><p style="font-family: 'Trebuchet MS', Arial, sans-serif; margin-left: 10px;">${password}</p>
                            </div>
                            <div style="margin-top: 25px;">
                                <a href="https://portfolio-4n0j.onrender.com/authentication/login" target="_blank">
                                    <button style="padding: 10px 13px;background-color: yellow;border: none;border-radius: 5px;box-shadow:1px 1px 10px #9797972d, -1px -1px 10px #90909035;cursor: pointer;color: #000;font-weight: bold;transition: 0.1s;outline: none;">Login</button>
                                </a>
                            </div>
                        </section>
                        <footer  style="height: 50px; width: 100%; background-color: #581845; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;"></footer>
                    </section>
                </main>
            </body>
            </html>
        `

        let EMAIL = {
            name: "Email from PORTFOLIO_3 platform.",
            subject: "Superuser creation.",
            sender : {
                name: "PORTFOLIO_3",
                email: "franciscoialy43@gmail.com"
            },
            to: [{
                name: `${process.env.SUPERUSER_NAME}`,
                email: `${process.env.SUPERUSER_EMAIL}`
            }],
            htmlContent: emaiTemplateHTML
        }

        await axios({
            method: 'POST',
            url: process.env.EMAIL_SERVER_URL,
            data: EMAIL,
            headers: {
                "Content-Type" : "application/json",
                "api-key" : process.env.EMAIL_API_KEY
            }
        }).then(() => {
            console.log("Superuser login sent to superuser email.")    
        }).catch((err) => {
            console.log({
                message: "Error sending superuser login to user email.",
                error: err
            })
        })
    }catch(_error){
        console.log({
            message: "Error sending superuser login to user email.",
            error: _error
        })
    }
}

async function _LDOTASK(){

    console.log(chalk.bgHex('581845').yellow("\nSuperuser creation."))
    
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
        console.log(chalk.bgYellow.black("Superuser already exist."))
        return ""
    }else{
        let results = await createSuperuser()
        if(results){
            console.log(chalk.yellow("Local informations saving ..."))
            await save_local(userToCreate, Math.PI)
        }
    }

}

async function _EDOTASK(){

    console.log(chalk.bgHex('581845').yellow("\nSuperuser creation."))
    
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
        console.log(chalk.bgYellow.black("Superuser already exist."))
        return ""
    }else{
        let results = await createSuperuser()
        if(results){
            console.log("Sending by email ...")
            await send_email(Math.PI)
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
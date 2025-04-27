const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.listen(process.env.APP_POST, ()=> {
    console.log(`L'application s'exécute sur ${process.env.APP_ADDRESS}`)
})
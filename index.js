const express = require('express')
const dotenv = require('dotenv')
const { api_router } = require('./Controllers/ApiController')

dotenv.config()

const app = express()

app.use('/', api_router)

app.listen(process.env.APP_POST, () => {
    console.log(`L'application s'exécute sur ${process.env.APP_ADDRESS}`)
})
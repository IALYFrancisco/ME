const express = require('express')
const dotenv = require('dotenv')
const { project_router } = require('./Controllers/ProjectsController')

dotenv.config()

const app = express()

app.use('/project', project_router)

app.listen(process.env.APP_PORT, () => {
    console.log(`L'application s'exécute sur ${process.env.APP_ADDRESS}`)
})
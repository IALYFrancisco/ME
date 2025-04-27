const express = require('express')
const dotenv = require('dotenv')
const { project_router } = require('./src/Controllers/ProjectsController')
const { checkAPIKey } = require('./src/Services/APIServices')

dotenv.config()

const app = express()

app.use(express.json())

app.use('/project', checkAPIKey, project_router)

app.listen(process.env.APP_PORT, () => {
    console.log(`L'application s'exécute sur ${process.env.APP_ADDRESS}`)
})
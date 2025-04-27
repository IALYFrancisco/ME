const express = require('express')
const dotenv = require('dotenv')
const { project_router } = require('./src/Controllers/ProjectsController')
const { checkAPIKey } = require('./src/Services/APIServices')
const { api_router } = require('./src/Controllers/APIsController')
const path = require('path')
const { authentication_router } = require('./src/Controllers/AuthenticationController')

dotenv.config()

const app = express()

app.use(express.json())

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'src/Views'))

app.use('/project', checkAPIKey, project_router)

app.use('/api', api_router)

app.use('/authentication', authentication_router)

app.listen(process.env.APP_PORT, () => {
    console.log(`L'application s'exécute sur ${process.env.APP_ADDRESS}`)
})
const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const session = require('express-session')
const body_parser = require('body-parser')
const flash = require('connect-flash')
const { project_router } = require('./src/Controllers/ProjectsController')
const { checkAPIKey } = require('./src/Services/APIServices')
const { api_router } = require('./src/Controllers/APIsController')
const { authentication_router } = require('./src/Controllers/AuthenticationController')
const { getRoot, isAuthenticated } = require('./src/Services/AuthenticationServices')
const { dashboard_router } = require('./src/Controllers/DashboardController')

dotenv.config()

const app = express()

app.use(body_parser.urlencoded({extended:true}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(flash())

app.use((request, response, next)=>{
    response.locals.error = request.flash('error')
    response.locals.success = request.flash('success')
    response.locals.user = request.session.user
    next()
})

app.use(express.json())

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'src/Views'))

app.use(express.static(path.join(__dirname, 'src/Public')))

app.get('/', getRoot)

app.use('/project', checkAPIKey, project_router)

app.use('/api', api_router)

app.use('/authentication', authentication_router)

app.use('/backoffice', isAuthenticated, dashboard_router)

app.listen(process.env.APP_PORT, () => {
    console.log(`L'application s'exécute sur ${process.env.APP_ADDRESS}`)
})
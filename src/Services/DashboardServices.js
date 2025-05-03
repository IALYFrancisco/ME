const { APIKEYS } = require("../Models/APIKEYSModel")
const { Projects } = require("../Models/ProjectsModel")
const { connexion, disconnexion } = require("./DbServices")

function _getDashboard(request, response){
    response.render('Dashboard/Dashboard')
}

async function _getAPIs(request, response){
    try{
        await connexion()
        let _keys = await APIKEYS.find({})
        let _projects = await Projects.find({})
        let context = {
            keys : _keys,
            projects: _projects
        }
        response.render('Dashboard/APIs', context)
    }catch(error){
        console.log("Error getting apis page.")
    }finally{
        await disconnexion()
    }
}

function _getAddProject(request, response){
    response.render('Dashboard/AddProject')
}

function _getProjects(request, response){
    response.render('Dashboard/Projects')
}

module.exports = {
    getDashboard : _getDashboard,
    getAPIs : _getAPIs,
    getAddProject: _getAddProject,
    getProjects: _getProjects
}
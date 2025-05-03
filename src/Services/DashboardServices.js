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
        let _projects = await getProjectsList()
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

async function _getProjects(request, response){
    let _projects = await getProjectsList()
    context = {
        projects: _projects
    }
    response.render('Dashboard/Projects', context)
}

async function getProjectsList(){
    try {
        await connexion()
        let _projects = await Projects.find({})
        return _projects
    }catch(err){
        return err
    }finally{
        await disconnexion()
    }
}

module.exports = {
    getDashboard : _getDashboard,
    getAPIs : _getAPIs,
    getAddProject: _getAddProject,
    getProjects: _getProjects
}
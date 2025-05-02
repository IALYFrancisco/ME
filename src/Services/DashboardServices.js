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
            projects: _projects,
            keygenStatus: null,
            key: null
        }
        response.render('Dashboard/APIs', context)
    }catch(error){
        console.log("Error getting apis page.")
    }finally{
        await disconnexion()
    }
}

module.exports = {
    getDashboard : _getDashboard,
    getAPIs : _getAPIs
}
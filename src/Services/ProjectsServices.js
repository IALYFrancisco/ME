const { Projects } = require("../Models/ProjectsModel")
const { connexion, disconnexion } = require("./DbServices")

async function _getAllProjects(request, response) {
    try {
        await connexion()
        let projects = await Projects.find({})
        response.status(200).json(projects)
    }catch(error){
        console.log({here : error})
    }finally{
        await disconnexion()
    }
}

async function _addProject(request, response) {
    try{
        await connexion()
        let add_results = Projects(request.body)
        await add_results.save()
        response.status(201).json({
            message: "Resource created.",
            data: {_id: add_results._id}
        })
    }catch(_error){
        response.status(500).json({
            message: "Failed adding project. Maybe server error.",
            error: _error
        })
    }finally{
        await disconnexion()
    }
}

async function _postProject(request, response){
    try{
        await connexion()
        let newProject = Projects(request.body)
        let result = await newProject.save()
        if(result){
            response.redirect("/backoffice/projects")
        }
    }catch(err){
        console.log(err)
    }finally {
        await disconnexion()
    }
}

module.exports = {
    getAllProjects : _getAllProjects,
    addProject: _addProject,
    postProject: _postProject,
}
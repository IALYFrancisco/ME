const { Projects } = require("../Models/ProjectsModel")

async function _getAllProjects(request, response) {
    try {
        let projects = await Projects.find({})
        response.status(200).json(projects)
    }catch(error){
        console.log({here : error})
    }
}

async function _addProject(request, response) {
    try{
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
    }
}

async function _postProject(request, response){
    try{
        let newProject = Projects(request.body)
        let result = await newProject.save()
        if(result){
            response.redirect("/backoffice/projects")
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    getAllProjects : _getAllProjects,
    addProject: _addProject,
    postProject: _postProject,
}
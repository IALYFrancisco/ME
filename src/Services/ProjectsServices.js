const { Projects } = require("../Models/ProjectsModel")
const { connexion, disconnexion } = require("./DbServices")

async function _getAllProjects(request, response) {
    try {
        await connexion()
        let projects = await Projects.find({})
        response.status(200).json({
            message: "Liste de tout les projets.",
            data: projects
        })
    }catch(error){
        console.log(error)
    }finally{
        await disconnexion()
    }
}

module.exports = {
    getAllProjects : _getAllProjects
}
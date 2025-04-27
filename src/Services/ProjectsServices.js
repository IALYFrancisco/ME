function _getAllProjects(request, response) {
    response.json({message: "Liste de tout les projets."})
}

module.exports = {
    getAllProjects : _getAllProjects
}
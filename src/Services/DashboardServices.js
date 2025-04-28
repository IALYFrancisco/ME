const { Clients } = require("../Models/ClientsModel")
const { connexion, disconnexion } = require("./DbServices")

function _getDashboard(request, response){
    response.render('Dashboard/Dashboard')
}

async function _getAPIs(request, response){
    try{
        await connexion()
        let _keys = await Clients.find({})
        context = {
            keys : _keys
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
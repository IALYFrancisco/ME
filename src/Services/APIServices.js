const crypto = require('crypto')
const { connexion, disconnexion } = require('./DbServices')
const { Projects } = require('../Models/ProjectsModel')
const { APIKEYS } = require('../Models/APIKEYSModel')

async function _checkAPIKey(request, response, next){
    try{
        let _api_key = request.header("x-api-key")
        await connexion()
        let client = await APIKEYS.findOne({api_key : _api_key})
        await disconnexion()
        if(!_api_key || !client){
            console.log("Clé api invalide.")
            return response.status(403).json({
                message: "Clé api invalide."
            })
        }
        next()
    }catch(_error){
        console.log({
            message: "Error checking api key. Maybe server error.",
            error: _error
        })
        response.status(500).json({
            message: "Error server. Try later.",
            error: _error
        })
    }
}

async function checkProject(project_id){
    try{
        let project = await Projects.find({_id: project_id})
        if(project){
            return true
        }else{ 
            return false
        }
    }catch(error){
        return false
    }
}

async function _generateAPIKey(request, response){
    try{
        await connexion()
        if(request.body && request.body.project_id && request.body.name){
            if(await checkProject(request.body.project_id)){
                let newAPIKey = await crypto.randomBytes(32).toString('hex')
                let newClient = APIKEYS({
                    name: request.body.name,
                    project_id : request.body.project_id,
                    api_key: newAPIKey
                })
                await newClient.save()
                response.redirect("/backoffice/apis")
            }else{
                response.status(203).json({
                    message: "Owner doesn't exist."
                })
            }
        }else{
            response.status(400).json({
                message: "Bad request, project_id and name are required in request body."
            })
        }
    }catch(_error){
        console.log(_error)
        response.status(500).json({
            message: "Error creating client. Maybe error server.",
            error: _error 
        })
    }finally{
        await disconnexion()
    }
}

module.exports = {
    checkAPIKey: _checkAPIKey,
    generateAPIKey: _generateAPIKey
}
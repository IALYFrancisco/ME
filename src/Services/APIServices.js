const crypto = require('crypto')
const { connexion, disconnexion } = require('./DbServices')
const { Projects } = require('../Models/ProjectsModel')
const { Clients } = require('../Models/ClientsModel')

function _checkAPIKey(request, response, next){
    try{
        let api_key = request.header("x-api-key")
        let API_KEYS = ["mysecret_aapi_key"]
        if(!api_key || !API_KEYS.includes(api_key)){
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
        if(request.body && request.body.project_id){
            if(await checkProject(request.body.project_id)){
                let newAPIKey = await crypto.randomBytes(32).toString('hex')
                let newClient = Clients({
                    project_id : request.body.project_id,
                    api_key: newAPIKey
                })
                await newClient.save()
                response.status(201).json({
                    message: "Client created successfully.",
                    client: newClient
                })
            }else{
                response.status(203).json({
                    message: "Project doesn't exist."
                })
            }
        }else{
            response.status(400).json({
                message: "project_id is required in request body."
            })
        }
    }catch(_error){
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
const { APIKEYS } = require("../Models/APIKEYSModel")
const { Projects } = require("../Models/ProjectsModel")
const { Task } = require("../Models/Task")
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

async function _getTasks(request, response){
    try {
        await connexion()
        let _tasks = await Task.find({})
        let context = {
            tasks: _tasks
        }
        response.render('Dashboard/Tasks', context)
    }catch(err){
        console.log({
            message: "Error to getting tasks page."
        })
    }
}

function _getAddTask(request, response){
    try{
        response.render('Dashboard/AddTask')
    }catch(err){
        console.log({
            message: "Error getting add task page."
        })
    }
}

async function _postTask(request, response){
    try{
        await connexion()
        let newTask = Task(request.body)
        let result = await newTask.save()
        if(result){
            console.log({message: "Task added successfully."})
            response.redirect('/backoffice/tasks')
        }
    }catch(err){
        console.log({message: "Error adding task.", error: err})
    }finally{
        await disconnexion()
    }
}

async function _getDetailsTask(request, response){
    try{
        await connexion()
        let _task = await Task.find({ _id: `${request.params.id}` })
        let context = {
            task: _task
        }
        response.render('Dashboard/DetailsTask', context)
    }catch(err){
        console.log({ message: "Error getting DetailsTask page", error: err })
    }
}

module.exports = {
    getDashboard : _getDashboard,
    getAPIs : _getAPIs,
    getAddProject: _getAddProject,
    getProjects: _getProjects,
    getTasks: _getTasks,
    getAddTask: _getAddTask,
    postTask: _postTask,
    getDetailsTask: _getDetailsTask
}
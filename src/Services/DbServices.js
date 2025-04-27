const mongoose = require('mongoose')

async function _connexion() {
    try {
        await mongoose.connect(`${process.env.DB_URI}`)
            .then(()=>{
                console.log("Database connexion successfully.")
            })
            .catch((_error)=>{
                console.log({
                    message: "Database connexion failure.",
                    error: _error 
                })
            })
    }catch(error){
        console.log(error)
    }
}

async function _disconnexion() {
    try {
        await mongoose.disconnect()
            .then(()=>{
                console.log("Database disconnexion successfully.")
            })
            .catch((_error)=>{
                console.log({
                    message: "Database disconnexion failure",
                    error: _error
                })
            })
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    connexion: _connexion,
    disconnexion: _disconnexion
}
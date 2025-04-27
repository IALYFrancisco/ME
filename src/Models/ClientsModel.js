const mongoose = require('mongoose')

const clientsShcema = mongoose.Schema({
    project_id: { type: String, required: true },
    api_key: { type: String, require: true }
})

const _Clients = mongoose.model('Clients', clientsShcema)

module.exports = {
    Clients : _Clients
}
const mongoose = require('mongoose')

const APIKEYShcema = mongoose.Schema({
    name: { type: String, required: true },
    project_id: { type: String, required: true },
    api_key: { type: String, require: true },
    creation_date: { type: Date, required: true, default: Date.now }
})

const _APIKEYS = new mongoose.model('APIKEYS', APIKEYShcema)

module.exports = {
    APIKEYS : _APIKEYS
}
const mongoose = require('mongoose')

const APIKEYShcema = mongoose.Schema({
    name: { type: String, required: true },
    project_id: { type: String, required: true },
    api_key: { type: String, require: true }
})

const _APIKEYS = mongoose.model('APIKEYS', APIKEYShcema)

module.exports = {
    APIKEYS : _APIKEYS
}
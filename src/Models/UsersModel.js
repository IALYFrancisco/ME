const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const _Users = new mongoose.model('Users', userSchema)

module.exports = {
    Users : _Users
}
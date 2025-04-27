const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["website", "mobile-application", "desktop-application"], required: true }
    
})
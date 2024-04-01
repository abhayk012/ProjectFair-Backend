
// import mongoose
const mongoose = require("mongoose")

const projectSchema = new mongoose. Schema({
    title:{
        type: String,
        require: true
    },
    languages: {
        type: String,
        require: true
    },
    github: {
        type: String,
        require: true
    },
    website: {
        type: String,
        require: true
    },
    overview: {
        type: String,
        require: true
    },
    projectimg: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    }

})


const userprojects = mongoose.model("userprojects",projectSchema)

module.exports = userprojects;
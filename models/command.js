const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")

let cmdSchema = new mongoose.Schema({
    Guild: String,
    Cmds: Array
})
module.exports = mongoose.model('cmds', cmdSchema)

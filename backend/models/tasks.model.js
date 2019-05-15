const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 140},
    note: {type: String, required: true, max: 140},
    prio: {type: String, required: true, max: 2}
})

module.exports = mongoose.model('Task', TaskSchema)
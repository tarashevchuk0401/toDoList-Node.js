const mongoose = require('mongoose');

const taskShema = mongoose.Schema({
    description: {type: String, required: true},
    isDone: {type: Boolean, required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", require:true}
})
 
module.exports =  mongoose.model('Task', taskShema );
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    task:{
        type: String,
        require:true,
    },
    status:{
        type:Boolean,
        default:false,
    },

});

module.exports = mongoose.model('Tasks',taskSchema);
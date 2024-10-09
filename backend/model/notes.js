const mongoose = require("mongoose")
 
const subNotesSchema  = mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: String
    },
})
const schema = mongoose.Schema({
    notes : [subNotesSchema],
    userId : mongoose.Types.ObjectId, 
})
module.exports = mongoose.model('note', schema)
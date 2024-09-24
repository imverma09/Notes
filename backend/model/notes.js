const mongoose = require("mongoose")

const schema =  mongoose.Schema({
    category : {
        type : String , 
        require : true ,
    },
    description : {
        type : String , 
        require : true ,
    },
    title : {
        type : String , 
        require : true ,
    },
})
module.exports = mongoose.model('note' , schema)
const mongoose =  require('mongoose')
const schema =  mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phoneNumber : {
        type : Number,
        required : true,
        unique : true 
    },
    password :  {
    type : String , 
    require : true
    }
})
module.exports = mongoose.model('user', schema)
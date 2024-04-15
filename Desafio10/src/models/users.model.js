const mongoose = require('mongoose')


const usersCollection = 'user'

const usersChema = new mongoose.Schema({
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['user' , 'admin'],
        required : true,
        default : 'user'
    },
    githubId: Number,
    githubUsername: String,
})


//model con cart
//    carts : {
//   type : mongoose.Schema.Types.ObjectId,
//    ref : 'carts',
//    unique : true,
//    default : null
//},


const UsersModel = mongoose.model(usersCollection , usersChema)
module.exports = UsersModel
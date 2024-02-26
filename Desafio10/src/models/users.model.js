const mongoose = require('mongoose')
const Carts = require('./carts.model')

const usersCollection = 'users'

const usersChema = new mongoose.Schema({
    first_name : {
        type : String,
        require : true
    },
    last_name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    age : {
        type : Number,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    role : {
        type : String,
        enum : ['user' , 'admin'],
        require : true,
        default : user
    },
    carts : {
        type : mongoose.Schema.Types.ObjectId,
        ref : Carts,
        unique : true,
        default : null
    }
})

const UsersModel = mongoose.model(usersCollection , usersChema)
module.exports = UsersModel
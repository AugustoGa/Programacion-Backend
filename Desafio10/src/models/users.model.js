const mongoose = require('mongoose')


const usersCollection = 'user'

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
        default : 'user'
    },
    carts : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'carts',
        unique : true,
        default : null
    },
    githubId: Number,
    githubUsername: String,
})

const UsersModel = mongoose.model(usersCollection , usersChema)
module.exports = UsersModel
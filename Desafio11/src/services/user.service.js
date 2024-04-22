const userDao = require('../Dao/userDao')

const User = new userDao()

const created = async ( newUser ) => {
    try {
        return await User.createdUser( newUser )
    } catch (error) {
        throw error
    }
}

const userId = async ( filter ) => {
    try {
        return await User.getOneUser( filter )
    } catch (error) {
        throw error
    }
}

const allUser = async () => {
    try {
        return await User.getUsers()
    } catch (error) {
        throw error
    }
}

module.exports = {
    created,
    allUser,
    userId
}
const UserModel = require('../models/user.model')

class User {
    async createdUser ( newUser ){
        try {
            return await UserModel.create( newUser )
        } catch (error) {
            console.error('Error created User', error)
            throw error
        }
    }
    async getUsers ( ){
        try {
          return await UserModel.find()  
        } catch (error) {
            console.error(error, 'Error getUser', error)
            throw new error
        }
    }
    async getOneUser( ){
        try {
            return await UserModel.findOne();
        } catch (error) {
            console.error("Error al obtener el id", error);
        }
    }
}
module.exports = User
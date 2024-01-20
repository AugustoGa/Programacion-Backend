const CartsModel = require("../models/carts.model")

class CartsDao{
    async getCarts() {
        return await CartsModel.find({status: true})
      }
    
      async createdCarts(newUserInfo) {
        console.log('Creado desde el DAO')
        return await CartsModel.create(newUserInfo)
      }
    
    async getCartById(id){
        const products = await CartsModel.findOne({ _id: id , status: true})
        return products
    }
    async updateCart(id , updateData){
        const products = await CartsModel.updateOne({ _id: id }, updateData)
        return products
    }
};

module.exports = CartsDao;
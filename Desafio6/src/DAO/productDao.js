const ProductsModel = require("../models/products.model")

class ProductsDao{
    async getProducts() {
        return await ProductsModel.find({status: true})
      }
    
      async createdProducts(newUserInfo) {
        console.log('Creado desde el DAO')
        return await ProductsModel.create(newUserInfo)
      }
    
    async getProductById(id){
        const products = await ProductsModel.findOne({ _id: id , status: true})
        return products
    }
    async updateProduct(id , updateData){
        const products = await ProductsModel.updateOne({ _id: id }, updateData)
        return products
    }
};

module.exports = ProductsDao;
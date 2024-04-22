const productsDao = require('../Dao/productsDao')

const Products = new productsDao()

const created = async () => {
    try {
        return await Products.createdProduct()
    } catch (error) {
        throw error
    }
}

const productId = async ( id ) => {
    try {
        return await Products.getProductById( id )
    } catch (error) {
        throw error
    }
}

const allProducts = async () => {
    try {
        return await Products.getProducts()
    } catch (error) {
        throw error
    }
}

const update = async ( id , updateData ) => {
    try {
        return await Products.updateProduct( id , updateData )
    } catch (error) {
        throw error
    }
}

module.exports = {
    created,
    productId,
    allProducts,
    update
}
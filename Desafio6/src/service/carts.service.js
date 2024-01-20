const CartsDao = require('../DAO/cartsDao')
//const ProductManagerDao = require('../DAO/productManagerDao')


const cartsDao = new CartsDao();
//const productsDao = new ProductManagerDao('./models/products.json');


const inserOne = async (newCartInf) =>{
    try {
        const newCart = await cartsDao.createdCarts(newCartInf)
        return newCart
    } catch (error) {
        throw error
    }
}

const getAll = async () =>{
    try {
        const carts = await cartsDao.getCarts({status: true})
        return carts
    } catch (error) {
        throw error
    }
}

const getOne = async (id) =>{
    try {
        const cart = await cartsDao.getCartById({ _id: id , status: true})
        return cart
    } catch (error) {
        throw error, 'Error al buscar por id'
    }
}

const Update = async (id , updateData) =>{
    try {
        const cart = await cartsDao.updateCart({ _id: id }, updateData)
        return cart
    } catch (error) {
        throw error
    }
}

module.exports = { inserOne , getAll , getOne , Update }
const CartsDao = require('../DAO/cartsDao')


const cartsDao = new CartsDao();



const inserOne = async () =>{
    try {
        const newCart = await cartsDao.cartAdd()
        return newCart
    } catch (error) {
        throw error
    }
}


const getOne = async (id) =>{
    try {
        const cart = await cartsDao.getCartById(id)
        return cart
    } catch (error) {
        throw error, 'Error al buscar por id'
    }
}

const Add = async (id , updateData) =>{
    try {
        const cart = await cartsDao.addProductInCart({ _id: id }, updateData)
        return cart
    } catch (error) {
        console.error('error Add Cart', error)
        throw error
    }
}

module.exports = { inserOne , getOne , Add }
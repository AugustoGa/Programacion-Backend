const { Router } = require('express')
const HTTP_RESPONSES = require('../contants/http-responses')
const CartService = require('../service/carts.service')

const CartsRouter = Router()
const cartService = new CartService()

CartsRouter.post('/', async (req, res) => {
    try {
        
        
    } catch (error) {
        console.error(error)
        
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
});

module.exports = CartsRouter
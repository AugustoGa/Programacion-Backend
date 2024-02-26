const { Router } = require('express')
const HTTP_RESPONSES = require('../constants/http-resposes')
const CartService = require('../service/carts.service')

const CartsRouter = Router()
const cartService = new CartService()

CartsRouter.post('/', async (req, res) => {
    try {
        
        
    } catch (error) {
        console.error(error)
        
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

module.exports = CartsRouter
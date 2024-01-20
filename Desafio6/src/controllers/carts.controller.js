const { Router } = require ('express');
const HTTP_RESPONSES = require('../constants/http-resposes');
const cartsService = require('../service/carts.service')

const CartsRouter = Router();


CartsRouter.get('/', async(req, res)=>{
    try {
        const carts = await cartsService.getAll({status: true});
        res.json({ payload: carts})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }

})

CartsRouter.get('/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const cart = await cartsService.getOne({ _id : id, status: true});
        res.json({ payload: cart})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})

CartsRouter.post('/', async(req, res)=>{ 
    try {
        const {        
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        } = req.body

        const newCartInf ={
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        const newCart = await cartsService.inserOne(newCartInf);
        res.json({ payload: newCart })
        res.status(HTTP_RESPONSES.CREATED)
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})


CartsRouter.put('/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const body = req.body
        await cartsService.Update({ _id: id, status: true}, body )
        res.json({ payload: 'Cart update'})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})


CartsRouter.delete('/:id', async(req, res)=>{  //SOFT DELETE
    try {
        const {id} = req.params
        await cartsService.Update({ _id: id}, { status: false})
        res.json({ payload: 'Product deleted (soft delete)'})
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
})


module.exports = CartsRouter;
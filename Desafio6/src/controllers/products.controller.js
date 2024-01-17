const { Router } = require ('express');
const ProductsModel = require('../models/products.model');

const ProductRouter = Router();


ProductRouter.get('/', async(req, res)=>{
    try {
        const products = await ProductsModel.find({status: true});
        res.json({ payload: products})
    } catch (error) {
        res.json({ error })
    }

})

ProductRouter.get('/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const product = await ProductsModel.findOne({ _id : id, status: true});
        res.json({ payload: product})
    } catch (error) {
        res.json({ error })
    }
})

ProductRouter.post('/', async(req, res)=>{ 
    try {
        const {        
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        } = req.body

        const newProductInf ={
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        const newProduct = await ProductsModel.create(newProductInf);
        res.json({ payload: newProduct })
    } catch (error) {
        res.json({ error })
    }
})


ProductRouter.put('/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const body = req.body
        await ProductsModel.updateOne({ _id: id, status: true}, body )
        res.json({ payload: 'Product update'})
    } catch (error) {
        res.json({ error })
    }
})


ProductRouter.delete('/:id', async(req, res)=>{  //SOFT DELETE
    try {
        const {id} = req.params
        await ProductsModel.updateOne({ _id: id}, { status: false})
        res.json({ payload: 'Product deleted'})
    } catch (error) {
        res.json({ error })
    }
})


module.exports = ProductRouter;
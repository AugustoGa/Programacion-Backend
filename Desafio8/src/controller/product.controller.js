const { Router } = require('express')
const ProductService = require('../service/product.service')
const HTTP_RESPONSES = require('../constants/http-responses')


const ProductRouter = Router()


ProductRouter.get('/'), async (req, res) =>{
    try {
        const { page , limit , sort , category , stock } = req.query
        const options = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 2,
            sort:parseInt(sort) || 0,
            category:parseInt(category) || 0,
            stock:parseInt(stock) || 0
        }
        const paginatedProduct = await ProductService.getAll(options)// Obtener los productos paginados
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = paginatedProducts;// Extraer datos de paginación del resultado paginado
        res.render('index', {
            products: docs, // Usar 'docs' para obtener los productos
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage
        });
    } catch (error) {
        console.error('Error getting and rendering products' , error)
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
}

ProductRouter.get('/:id'), async (req, res) =>{
    try {
        const {id} = req.params
        const product = await ProductService.getOne(id)
        res.json({ payload: product })
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
}

ProductRouter.post('/'), async (req, res) =>{
    try {
        const {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category
        } = req.body
        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category
        }
        const product = await ProductService.inserOne(newProduct)
        res.json({ payload: product})
        res.status(HTTP_RESPONSES.CREATED)
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
}

ProductRouter.put('/:id'), async (req, res) =>{
    try {
        const {id} = req.params
        const body = req.body
        const product = await ProductService.Update({ _id : id, status: true}, body)
        res.json({ payload: product})
        res.status(HTTP_RESPONSES.OK)
    } catch (error) {
        res.json({ error })
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
    }
}
/*  SOFT DELETE */
ProductRouter.delete('/:id'), async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}
module.exports = ProductRouter
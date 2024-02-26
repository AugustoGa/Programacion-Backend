const  mongoose  = require('mongoose')
const CartsModel = require('../models/carts.model')
const ProductService = require('./products.service')

const productService = new ProductService()

class CartService{
    async cartAdd (){
        try {
            const newCart = {
                products : []
            }
            await CartsModel.create( newCart )
        } catch (error) {
            console.error('Error cartAdd',error);
        }
    }

    async getCarts (){
        try {
            return await CartsModel.find()
        } catch (error) {
            console.error('Error getCarts',error);
        }
    }

    async getCartById ( id ){
        try {
            return await CartsModel.findById( id )
        } catch (error) {
            console.error('Error getCartById',error);
        }
    }

    async addProductInCart ( cid , pid ){
        try {
            const cart = await CartsModel.findById( cid )
            if ( cart ){
                const product = await productService.getProductById( pid )
                if ( product ){
                    const productIndex = cart.products.findIndex(
                        (prod) => prod.product.toString() === pid.toString())
                }
                if ( productIndex !== 1 ){
                    cart.products[productIndex].quantity++;
                }else {
                    cart.products.push({
                        product : new mongoose.Types.ObjectId( pid ),
                        quantity : 1,
                    })
                }
                await cart.save()
                console.log('Product add in cart')
            }else {
                console.log('Product no exist ')
            }
        } catch (error) {
            console.error('Error add product in cart ', error)
        }
    }

    async cartDelete ( id ){
        try {
            return await CartsModel.deleteOne( id )
        } catch (error) {
            console.error('Error cartDelete', error)
        }
    }
}

module.exports = CartService
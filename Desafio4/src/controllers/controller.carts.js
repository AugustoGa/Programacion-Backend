
const CartManager = require("../service/service.carts");
const ProductManager = require('../service/service.products')


const productManager = new ProductManager();
const cartManager = new CartManager('./carts.json');


const getItemsCarts = async (req, res)=>{
    try{
        await cartManager.loadCart();
        const limit = req.query.limit;
        const cart = limit 
        ? cartManager.getProductsCart().splice(0, limit)
         : cartManager.getProductsCart();
        res.status(200).json(cart);
    }catch(error){
        res.status(500).json({error: ' Internal Server Error'});
    }

};

const getItemCart = async(req, res)=>{
    try{
        await cartManager.loadCart();

        const cartId = parseInt(req.params.id);
        const cart = cartManager.getProductCartById(cartId);

        if(cart){
            res.json(cart);
        }else{
            res.status(404).json({error: 'Product not found'});
        }
    }catch(error){
        res.status(500).json({error: ' Internal Server Error'});
    }
};

const addProductToCart = async (req, res) => {
  try {
    await cartManager.loadCart()
    await productManager.loadProducts()
    const cartId = req.params.id;
    const productId = req.params.id;
    const quantity = req.body.quantity || 1;
    const addedProduct = await cartManager.addProductToCart(cartId, productId, quantity);
    res.json({ addedProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};








  








module.exports = { getItemCart , getItemsCarts  , addProductToCart};
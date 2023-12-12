const ProductManager = require('../service/service.products');
const CartsManager = require('../service/service.carts');


const productManager = new ProductManager('productos.json');
const cartManager = new CartsManager ('./carts.json', productManager);


const getItemsCarts = async (req, res)=>{
    try{
        await cartManager.loadCart();
        const limit = req.query.limit;
        const carts = limit 
        ? cartManager.getCarts().splice(0, limit)
         : cartManager.getCarts();
        res.status(200).json(carts);
    }catch(error){
        res.status(500).json({error: ' Internal Server Error'});
    }

};

const getItemCart = async(req, res)=>{
    try{
        await cartManager.loadCart();

        const cartId = parseInt(req.params.id);
        const cart = cartManager.getCartById(cartId);

        if(cart ){
            res.json(cart );
        }else{
            res.status(404).json({error: 'Cart  not found'});
        }
    }catch(error){
        res.status(500).json({error: ' Internal Server Error'});
    }
};
//Hasta aca


//
const postItemCart = async (req, res) => {
  try {
    await cartManager.loadCart();
    await productManager.loadProducts();

    const { 
      quantity ,
      productId
    } = req.body;
    
    console.log(req.body);

    const existingProduct = productManager.getProductById(productId);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    console.log('Product:', existingProduct);
    // Crear un objeto para el nuevo producto
    const newProductCart = {
      productId,
      quantity ,
    } 

    // Agregar el nuevo producto al manager
    cartManager.addProductToCart(newProductCart);


    res.status(201).json(`Created new Product to cart ${newProductCart}`);
  } catch (error) {
    console.error(error); // Agrega una impresión de error para ayudar a identificar la causa del error
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getItemCart , getItemsCarts ,  postItemCart };
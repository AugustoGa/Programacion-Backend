const productsController = require('../controllers/products.controller');
const cartsController = require('../controllers/carts.controller');

const Router = app =>{
    app.use('/products', productsController);
    app.use('/carts', cartsController);
}

module.exports = Router;
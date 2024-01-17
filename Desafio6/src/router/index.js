const productsController = require('../controllers/products.controller');

const Router = app =>{
    app.use('/products', productsController);

}

module.exports = Router;
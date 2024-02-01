const productsController = require('../controller/product.controller');
const cartsController = require('../controller/product.controller');
const chatController = require('../controller/chat.controller')

const Router = app =>{
    app.use('/products', productsController);
    app.use('/carts', cartsController);
    app.use('/chat', chatController)
    app.use('/')
    app.use('/')
    app.use('/')
}

module.exports = Router;
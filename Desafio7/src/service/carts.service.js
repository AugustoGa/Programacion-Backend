const CartsDao = require('../DAO/cartsDao')


const cartsDao = new CartsDao();



const inserOne = async () =>{
    try {
        const newCart = await cartsDao.cartAdd()
        return newCart
    } catch (error) {
        throw new Error('Error al cargar carrito')
    }
}

const getAll = async () =>{
    try {
        const cart = await cartsDao.getCarts()
        return cart
    } catch (error) {
        throw new Error('Error al buscar el carrito')
    }
}

const getOne = async (id) =>{
    try {
        const cart = await cartsDao.getCartById(id)
        return cart
    } catch (error) {
        throw new Error('Error al buscar por id ')
    }
}

const Add = async (id , updateData) =>{
    try {
        const cart = await cartsDao.addProductInCart({ _id: id }, updateData)
        return cart
    } catch (error) {
        throw new Error('error Add Cart ')
    }
}

const deleteCart = async (id) =>{
    try {
        const cart = await cartsDao.cartDelete({ _id : id })
        console.log(cart ,'Cart Delete ')
        return cart
    } catch (error) {
        throw new Error('Error al deleteCart')
    }
}

    //Elimina la cantidad de productos del cart en caso de tener 1 solo producto elimina el carrito
const removeProductFromCart = async ( cid , pid ) =>{
    try {
        const cart = await cartsDao.getCartById( cid );
        const mutableProducts = [...cart.products];
        //Encuentra el indice del producto a eliminar
        const indexToRemove = mutableProducts.findIndex( prod => prod.product.toString().startsWith( pid ));
        console.log('indice del producto a eliminar: ' , indexToRemove );
        if( indexToRemove !== 1 ){
            const productRemove = cart.products[indexToRemove];
            if ( productRemove.quantity > 1 ){
                productRemove.quantity -= 1; //Si la cantidad es mayor que 1 , disminuye la cantidad
            }else {
                cart.products.slice( indexToRemove , 1 );
            }
        }
        await cart.save();
        console.log('Producto removido del carrito con exito');
    } catch (error) {
        throw new Error('Error al removerProductFromCarts')
    }
}

const updateCart = async( id , updateProd) => {
    try {
        const cart = await cartsDao.getCartById(id)
        if(cart){
            updateProd && updateProd.forEach(updatePro => {
                const productExist = cart.products.find(prod => prod.prodId === updatePro.productId)
                if(productExist){
                    productExist.quantity = updatePro.quantity;
                }
            });
        }
        await cart.save()
    } catch (error) {
        console.error(error);
        throw error
    }
}

module.exports = { inserOne , getAll , getOne , Add , deleteCart , removeProductFromCart , updateCart }
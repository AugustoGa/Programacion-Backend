const fs = require('fs');
const productManager = require('./service.products');

class CartsManager {
    constructor(path , productManager) {
      this.Carts = [];
      this.idCounter = 1;
      this.path = path;
      this.productManager = productManager;
    }

    async loadCart(){
        try{
            const data = await fs.readFileSync(this.path, 'utf-8');
            if(data){
                this.Carts = JSON.parse(data);
                // Actualizar el contador de id
                if(this.Carts.length > 0 ){
                    this.idCounter = Math.max(...this.Carts.map(cart => cart.id))+1;
                }
                else{
                    console.log("error")
                }
        }
        }catch(error){
            // Si el archivo no existe, crea un archivo JSON vacío
            console.error("Error loading cart", error);
            this.products = [];
            }
    }

    async saveToFile(){
        try{
            const data = JSON.stringify(this.Carts, null , 2);
            await fs.writeFileSync(this.path, data, 'utf-8');
          }catch(error){
            console.error("Error saving file" , error.message);
          }
        }

        addCart(cart){
            //ID Autoincrementable
            cart.id = this.idCounter++;
            this.Carts.push(cart);
            this.saveToFile();
            console.log('Product added to cart', cart);
        } 

        getCarts() {
            console.log('List of products in the cart:', this.Carts);
            return this.Carts;
        }  
        
        getCartById(id) {
            const foundCart = this.Carts.find((cart) =>cart.id === id);
            if (foundCart) {
              console.log(`Product found in cart with ID ${id}:`, foundCart);
              return foundCart;
            } else {
              console.error('Product not found in cart');
              return null;
            }
          } 

        async updateCart(id, updateCart) {
            try {
              const index = this.Carts.findIndex((cart) => Number(cart.id) === Number(id));
              if (index !== -1) {
                updateCart.id = Number(id);
                this.Carts[index] = updateCart;
                await this.saveToFile();
                console.log('Cart updated', updateCart);
              } else {
                console.error('Cart not found to update');
              }
            } catch (error) {
              console.error("Error updating cart", error);
              throw error;
            }
          }
              // Agregar un producto al carrito utilizando el ID del producto
              addProductToCart(cartId, productId, quantity) {
                const cart = this.getCartById(cartId);
                if (cart) {
                    const product = this.productManager.getProductById(productId);
                    if (product) {
                        const existingProduct = cart.products.find(item => item.productId === productId);
                        if (existingProduct) {
                            // Incrementar la cantidad si el producto ya está en el carrito
                            existingProduct.quantity += quantity || 1;
                        } else {
                            // Agregar el producto al carrito si no existe
                            cart.products.push({ productId, quantity: quantity || 1 });
                        }
                        // Actualizar el carrito en la lista de carritos
                        const index = this.Carts.findIndex(c => c.id === cartId);
                        this.Carts[index] = cart;
                        this.saveToFile();
                        return cart.products;
                    } else {
                        console.error('Product not found');
                        return null;
                    }
                } else {
                    console.error('Cart not found');
                    return null;
                }
            }
}

module.exports = CartsManager;
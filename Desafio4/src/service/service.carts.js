const fs = require('fs');


class CartManager {
    constructor(path) {
      this.products = [];
      this.idCounter = 1;
      this.path = path;
    }
  
    //cargar productos desde el archivo al instanciar la clase
    async loadCart(){
      try{
        const data = await fs.readFileSync(this.path, 'utf-8');
        if(data){
          this.products = JSON.parse(data);
          // Actualizar el contador de id
          if(this.products.length > 0){
            this.idCounter = Math.max(...this.products.map(product => product.id))+1;
          }
        }else{
          console.log("Error")
        }
      }catch(error){
        // Si el archivo no existe, crea un archivo JSON vacío
        console.error("Error loading products", error);
        this.products = [];
      }

    }

    async saveToFile(){
      try{
        const data = JSON.stringify(this.products, null , 2);
        await fs.writeFileSync(this.path, data, 'utf-8');
      }catch(error){
        console.error("Error saving file" , error.message);
      }
    }
    addProduct(product){
      //ID Autoincrementable
      product.id = this.idCounter++;
      this.products.push(product);
      this.saveToFile();
      console.log('Product added', product);
    }

    getProductsCart() {
      console.log('Lista de productos:', this.products);
      return this.products;
    }

    getProductCartById(id) {
      const foundProduct = this.products.find((product) => product.id === id);
      if (foundProduct) {
        console.log(`Product found with ID ${id}:`, foundProduct);
        return foundProduct;
      } else {
        console.error('Product not found');
        return null;
      }
    }

    async addProductToCart(cartId, productId, quantity) {
      try {
        const allCarts = await this.loadCart();
        const cart = allCarts.find(c => c.id === cartId);
        if (!cart) {
          throw new Error('Cart not found');
        }
  
        const productIndex = cart.products.findIndex(p => p.product === productId);
        if (productIndex !== -1) {
          cart.products[productIndex].quantity += quantity;
        } else {
          this.products.push({ product: productId, quantity });
        }
  
        await this.saveToFile(allCarts);
        return cart;
      } catch (error) {
        throw new Error('Error adding product to cart');
      }
    }
}

module.exports = CartManager;


const { response } = require('express');
const ProductManager = require('../service/service.products')


const productManager = new ProductManager('productos.json');


const getItems = async (req, res)=>{
    try{
        await productManager.loadProducts();
        const limit = req.query.limit;
        const products = limit 
        ? productManager.getProducts().splice(0, limit)
         : productManager.getProducts();
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({error: ' Internal Server Error'});
    }

};

const getItem = async(req, res)=>{
    try{
        await productManager.loadProducts();

        const productId = parseInt(req.params.pid);
        const product = productManager.getProductById(productId);

        if(product){
            res.json(product);
        }else{
            res.status(404).json({error: 'Product not found'});
        }
    }catch(error){
        res.status(500).json({error: ' Internal Server Error'});
    }
};
const postItem = async (req, res) => {
  try {
    await productManager.loadProducts();

    const { title, description, price, thumbnail, code, stock, status ,category} = req.body;
    
    console.log(req.body);


    // Crear un objeto para el nuevo producto
    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      category,
      status,
      stock,
    };

    // Agregar el nuevo producto al manager
    productManager.addProduct(newProduct);


    res.json({ payload: newProduct });
    res.status(201).json(`Created new Product  ${newProduct}`);
  } catch (error) {
    console.error(error); // Agrega una impresión de error para ayudar a identificar la causa del error
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteItem = async(req, res)=>{
  try{
    await productManager.loadProducts();

    const { id } = req.params;
    
    const DeleteProd = await productManager.deleteProduct(id);
    
    console.log('Productos después de la eliminación:', productManager.getProducts());
    
    res.status(204).end();
    
    res.send(DeleteProd);
    //El código 204 indica que la solicitud se ha procesado con éxito, 
 // pero no hay contenido para enviar en la respuesta. end() para indicar que la respuesta no contiene contenido adicional.
 console.log('Productos después de la eliminación:', productManager.getProducts());
  }catch(error){
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { getItem , getItems ,  postItem , deleteItem };



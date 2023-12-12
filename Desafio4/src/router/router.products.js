const express = require("express");
const router = express.Router();
const {
  getItem,
  getItems,
  postItem,
  deleteItem,
} = require("../controllers/controller.products");

router.get("/products", getItems);
router.get("/products/:pid", getItem);
router.post("/products", postItem);
router.delete("/products/:id", deleteItem);

module.exports = router;

//! Codigo viejo
// router.get('/products', getItems);
// router.get('/products/:pid', getItem);
// router.post('/products', postItem);
// router.delete('/:pid', deleteItem) //? Cambie el pid por id, porque sino no lo tomaba

/**
 * deleteProduct(id){

const index = this.products.findIndex((product) => product.id === id);

if(index !== -1){

const deleteProduct = this.products.splice(index,1)[0];

this.saveToFile();

console.log(‘Product Delete’, deleteProduct);

}else{

console.error(‘Product not found when deleting’);

}

}

const deleteItem = async(req, res)=>{

try{

await productManager.loadProducts();

const {id} = req.params;

const DeleteProd = productManager.deleteProduct(id);

res.send(DeleteProd);

res.status(204).end(DeleteProd);

// pero no hay contenido para enviar en la respuesta. end() para indicar que la respuesta no contiene contenido adicional.

console.log(‘Productos después de la eliminación:’, productManager.getProducts());

}catch(error){

console.error(error)

res.status(500).json({ error: ‘Internal Server Error’ });

}

};

router.delete(‘/:pid’, deleteItem);

Este es el codigo que me pasaste, lo primero que puede ser es el tema de la respuesta. Primero estas mandando en el deleteItem el “res.send(DeleteProd)” y despues el “res.status(204).end”. Proba ponerlo al reves

res.status(204).end();

res.send(DeleteProd);

Despues, fijate que deleteProduct en product manager es sincrona, pero en el deleteItem lo estas tratando como una funcion asincrona. Si queres que sea asincrono, tenes que cambiar lo primero a

const DeleteProd = await productManager.deleteProduct(id);

Todo junto para simplificar deberia estar asi:

const deleteItem = async (req, res) => {

try {

await productManager.loadProducts();

const { id } = req.params;

const DeleteProd = await productManager.deleteProduct(id);

console.log(‘Productos después de la eliminación:’, productManager.getProducts());

res.status(204).end();

res.send(DeleteProd);

} catch (error) {

console.error(error);

res.status(500).json({ error: ‘Error interno del servidor’ });

}

};

router.delete(‘/:pid’, deleteItem);
 *
 */

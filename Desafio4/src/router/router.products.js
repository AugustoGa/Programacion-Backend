// router.products.js
const express = require('express');
const { getItem, getItems, postItem, deleteItem } = require("../controllers/controller.products");

const router = express.Router();

router.get('/products', getItems);
router.get('/products/:pid', getItem);
router.post('/products', postItem);
// router.put('/:id', updateItem);
router.delete('/products/:pid', deleteItem);

module.exports = router;
const express = require('express');


const app = express();
const port = 3000;

const productManager = new ProductManager('product.json');

app.get('/users',(req, rest)=>{

});


app.listen(port, ()=>{
    console.log(`Server listen al port  ${port}`);
});
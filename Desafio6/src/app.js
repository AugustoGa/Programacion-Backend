const express = require('express');
const mongoConnect = require('./db');
const Router = require('./router');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(process.cwd() + 'public'))

Router(app);


mongoConnect();


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server Listening ${PORT}`)
})
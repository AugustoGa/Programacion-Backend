const express = require('express');
const mongoConnect = require('./db');
const Router = require('./router');
const handlebars = require('express-handlebars')


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(process.cwd() + '/src/public'));

app.use('/bootstrap', express.static(process.cwd() + '/node_modules/bootstrap/dist'))



// Configuración de Handlebars
const hbs = handlebars.create({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })

app.engine('handlebars', hbs.engine);
app.set('views', process.cwd() + '/src/views')
app.set('view engine', 'handlebars');

Router(app);


mongoConnect();


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server Listening ${PORT}`)
})
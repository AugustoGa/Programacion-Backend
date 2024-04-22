const express = require('express')
const mongoConnect = require('./db/server')
const Router = require('./routers/index.router')
const exphbs = require('express-handlebars');
const { Server } = require('socket.io')
const cookieParser = require('cookie-parser')
const initializePassport = require('./config/passport.config')
const passport = require('passport')
const initializeSocket = require('./chat/socket');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(process.cwd() + '/src/public'))
app.use('/bootstrap', express.static(process.cwd() + '/node_modules/bootstrap/dist'))

app.use(cookieParser())
//passport
initializePassport()
app.use(passport.initialize())

// Configuración de Handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: process.cwd() + '/src/views/layouts',
    partialsDir: process.cwd() + '/src/views/partials',
    extname: '.hbs',
    cache: false
}));

app.set('view engine', '.hbs');
app.set('view engine', '.hbs');
app.set('views', process.cwd() + '/src/views');

const httpServer = app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

const io = initializeSocket(httpServer);
app.locals.io = io;

mongoConnect();

Router(app);

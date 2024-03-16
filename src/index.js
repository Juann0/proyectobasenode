// Llamando las librerias necesarias
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const compression = require('compression')
const flash = require('connect-flash');
const session = require('express-session');
const csrf = require('csurf');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// Llamando las librerias necesarias

// Llamar la base de datos
const { database } = require('./keys.js');
// Llamar la base de datos

// Configurando el servidor de ExpressJs
const app = express();

//Middleware de compression
app.use(compression());
//Middleware de compression

app.set('port', '4000');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.set('views'), 'layouts'),
    partialsDir: path.join(app.set('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
// Configurando el servidor de ExpressJs
//Utilizar la session y la base de datos
app.use(session({
    secret: 'electiva@clase=2024',
    resave: true,
    saveUninitialized: true,
    store: new MySQLStore(database),
}));
//Utilizar la session y la base de datos

// Servidor
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));
app.use(express.static(path.join(__dirname, './public'))); //Ruta de nuestros archivos estáticos
// Servidor

// Rutas
app.use('/contacto', require('./routes/contacto'));
app.use('/app', require('./routes/app'));
app.use('/', require('./routes/errores'));
app.use('/', require('./routes/index'));
// Rutas

// app.use((req, res, next) => {
//     app.locals.user = req.user;
//     next();
// });

// Abajo de las rutas, el error 404
app.use((req, res) => {
    res.status(404).redirect('/404')
});
// Abajo de las rutas, el error 404

//Listen
app.listen(app.get('port'), () => {
    console.log(`La url es http://127.0.0.1:${app.get('port')}`);
});
//Listen


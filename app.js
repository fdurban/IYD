require("dotenv").config();
require('./db')
const path = require('path')
const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
// Configuración de sesión
app.use(session({
    secret: 'keyboard cat', // Cambia esto a una cadena secreta más segura
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

require("./config")(app);

app.use('/api', require('./routes'));
require("./error-handling")(app);

module.exports = app;

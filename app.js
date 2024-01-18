require("dotenv").config();
require('./db/index')
const path = require('path')
const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();

require("./config")(app);

app.use('/api', require('./routes'));
require("./error-handling")(app);

module.exports = app;

require('dotenv').config();
const express = require('express');
const consign = require('consign');
const db = require('./config/db');
const mongoose = require('mongoose');
const cronHandler = require('./api/cron');

require('./config/mongodb');

const app = express();

// Configuração do CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://base-deconhecimento-web-modern.web.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.db = db;
app.mongoose = mongoose;

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app);

cronHandler();

app.listen(3000, () => {
    console.log('Backend executando...');
});
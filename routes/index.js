const express = require('express');

const productsRouter = require('./products.router');
const usersRouter = require('./users.routers');
const categoriesRouter = require('./categories.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);

  // const router2 = express.Router();
  // app.use('/api/v2', router2);
}

module.exports = routerApi;

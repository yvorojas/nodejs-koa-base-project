const Router = require('koa-router');
const userController = require('./user');

const router = new Router({
    prefix: '/v1',
  });
  
  router.use(userController.routes());
  
  module.exports = router;
  
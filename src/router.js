const Router = require('koa-router');
const apiSpecifications = require('./api-specs');
const pkginfo = require('../package.json');
const httpStatusCodes = require('http-status-codes');
const routerV1 = require('./controllers/v1');

const router = new Router();

router.get('/health', (ctx) => {
  const data = {
    name: pkginfo.name,
    version: pkginfo.version,
    description: pkginfo.description,
    author: pkginfo.author,
  };

  ctx.body = {
    data,
    message: 'your API is healthy',
  };
  ctx.status = httpStatusCodes.OK;
});

router.get('/', (ctx) => {
    ctx.redirect('/health');
    ctx.status = httpStatusCodes.PERMANENT_REDIRECT;
});

router.get('/specs', (ctx) => {
  ctx.body = apiSpecifications.getSpec();
});

router.use(routerV1.routes());

module.exports = router;


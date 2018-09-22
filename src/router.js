const Router = require('koa-router');
const pkginfo = require('../package.json');

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
});

router.get('/', (ctx) => {
    ctx.redirect('/health');
});

module.exports = router;


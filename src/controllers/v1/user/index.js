const Router = require('koa-router');
const httpStatusCodes = require('http-status-codes');

const router = new Router({
    prefix: '/user',
});

const dummyUserArray = [];

router.get('/', (ctx) => {
    ctx.response.body = dummyUserArray;
    ctx.status = httpStatusCodes.OK;
});

router.post('/', (ctx)=>{
    dummyUserArray.push(ctx.request.body);
    ctx.response.body = 'user created correctly';
    ctx.status = httpStatusCodes.CREATED;
});

module.exports = router;
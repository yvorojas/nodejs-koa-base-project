const Koa = require('koa');
const router = require('./router');

const port = process.env.PORT;
const env = process.env.NODE_ENV;

const app = new Koa();

app.use(router.routes());

app.listen(port, () => {
    console.log(`Server running on port ${port}, environment: ${env}`);
});
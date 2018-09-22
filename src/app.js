const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./router');

const port = process.env.PORT;
const env = process.env.NODE_ENV;

const app = new Koa();

app
    .use(bodyParser())
    .use(cors({
        methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    }))
    .use(router.routes());

app.listen(port, () => {
    console.log(`Server running on port ${port}, environment: ${env}`);
});
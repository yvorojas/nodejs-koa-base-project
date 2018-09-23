const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const fs = require('fs');
const koaSwagger = require('koa2-swagger-ui');
const router = require('./router');
const apiSpecifications = require('./api-specs');

const port = process.env.PORT;
const env = process.env.NODE_ENV;

const app = new Koa();

apiSpecifications.initialize();

app
    .use((ctx, next) => next().catch((err) => {
        ctx.status = err.status;
        switch (err.status) {
        case 401:
            ctx.body = 'Protected resource, use Authorization header to get access\n';
            break;
        default:
            console.log(err);
            ctx.body = err.message;
            break;
        }
    }))
    .use(bodyParser())
    .use(cors({
        methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    }))
    .use(router.routes())
    .use(
        koaSwagger({
          routePrefix: process.env.SWAGGER_UI_ROUTE,
          swaggerOptions: {
            url: process.env.SWAGGER_SPECS,
          },
        }),
    );

app.listen(port, () => {
    console.log(`Server running on port ${port}, environment: ${env}`);
});
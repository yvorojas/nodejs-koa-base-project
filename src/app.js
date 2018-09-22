const Koa = require('koa');

const port = process.env.PORT;
const env = process.env.NODE_ENV;

const app = new Koa();

app.listen(port, () => {
    console.log(`Server running on port ${port}, environment: ${env}`);
});
const Router = require('koa-router');
const httpStatusCodes = require('http-status-codes');
const services = require('./services');

/**
* @swagger
* tags:
*   - name: user
*     description: Centraliced users endpoints
*/

const router = new Router({
    prefix: '/user',
});

/**
 * @swagger
 * /v1/user:
 *   get:
 *     tags: [
 *        user
 *     ]
 *     security:
 *       - Bearer: []
 *     summary: "Return user list"
 *     operationId: getUsers
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *          description: "user list"
 *          schema:
 *            type: string
 *       500:
 *          description: "Internal Server Error"
 *          schema:
 *            type: string
 */

router.get('/', (ctx) => {
    ctx.response.body = services.getUsers();
    ctx.status = httpStatusCodes.OK;
});

/**
 * @swagger
 * /v1/user:
 *   post:
 *     tags: [
 *        user
 *     ]
 *     security:
 *       - Bearer: []
 *     summary: "add user to list"
 *     operationId: addUser
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: quote
 *         description: "quote to obtain plans"
 *         in:  body
 *         required: true
 *     responses:
 *       201:
 *          description: "user added message"
 *          schema:
 *            type: string
 *       500:
 *          description: "Internal Server Error"
 *          schema:
 *            type: string
 */

router.post('/', (ctx)=>{
    ctx.response.body = services.createUser(ctx.request.body);
    ctx.status = httpStatusCodes.CREATED;
});

module.exports = router;
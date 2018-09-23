const Router = require('koa-router');
const httpStatusCodes = require('http-status-codes');
const services = require('./services');
const ErrorHandler = require('../../../utils/errorHandler');

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
 *            type: array
 *            items:
 *               type: object
 *               $ref: "#/definitions/User"
 *       500:
 *          description: "Internal Server Error"
 *          schema:
 *            type: string
 */

router.get('/', (ctx) => {
    try {
        ctx.response.body = services.getUsers();
        ctx.status = httpStatusCodes.OK;
    } catch (err){
        const errorHandler = new ErrorHandler(ctx, err);
        errorHandler.throw();
    }
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
 *       - name: user
 *         description: "user to add"
 *         in:  body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/NewUser"
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
    try {
        ctx.response.body = services.createUser(ctx.request.body);
        ctx.status = httpStatusCodes.CREATED;
    } catch (err){
        const errorHandler = new ErrorHandler(ctx, err);
        errorHandler.throw();
    }
});

module.exports = router;
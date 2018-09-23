const errors = require('../models/common/enums/errors');
const httpStatusCodes = require('http-status-codes');

const errorHandler = class {
    constructor(ctx, error){
        this.ctx = ctx,
        this.error = error
    };

    throw(){
        switch (this.error.code){
            case errors.VALIDATION_ERROR:
                this.ctx.throw(httpStatusCodes.UNPROCESSABLE_ENTITY, this.error.message);
                break;
            default:
                this.ctx.throw(httpStatusCodes.INTERNAL_SERVER_ERROR, this.error.message);
                break;
        }
    }
};

module.exports = errorHandler;
const BaseJoi = require('joi');
const DateExtension = require('joi-date-extensions');
const rutExtension = require('../../common/extensions/rut');
const countries = require('../../common/enums/countries');
const errors = require('../../common/enums/errors');

//Swagger OpenApi model specification

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     description: model obtain in get user call
 *     required:
 *       - id
 *       - name
 *       - mail
 *       - address
 *       - phone
 *       - documentId
 *       - country
 *     properties:
 *       id:
 *         description: user id stored in repository
 *         type: string
 *       name:
 *         description: user name
 *         type: string
 *       email:
 *         description: user email
 *         type: string
 *       address:
 *         description: user address
 *         type: string
 *       phone:
 *         description: user phone
 *         type: string
 *       documentId:
 *         description: user document Id
 *         type: string
 *       country:
 *         description: user country
 *         type: string
 */


const Joi = BaseJoi
    .extend(DateExtension)
    .extend(rutExtension);

// Limit country by schema to CL, PE, AR, CO
const schema = Joi.object().keys({
    id: Joi.string().uuid().required().error(new Error('invalid id')),
    name: Joi.string().required().error(new Error('invalid name')),
    email: Joi.string().email().required().error(new Error('Invalid email')),
    address: Joi.string().required().error(new Error('invalid address')),
    phone: Joi.string().required().error(new Error('invalid phone')),
    documentId: Joi.string().required().error(new Error('invalid document id')),
    country: Joi.string().valid(countries.getArrayOfValues()).required().error(new Error('invalid country')),
}).options({abortEarly: false});

const user = class {
    constructor(id, name, email, address, phone, documentId, country){
        if (arguments.length !== 0){
            try {
                const userValidated = this.validate({id, name, email, address, phone, documentId, country});
                this.id = userValidated.id,
                this.name = userValidated.name;
                this.email = userValidated.email;
                this.address = userValidated.address;
                this.phone = userValidated.phone;
                this.documentId = userValidated.documentId;
                this.country = userValidated.country;
            } catch (err){
                const errObject ={
                    code: errors.VALIDATION_ERROR,
                    message: err.message,
                } 
                throw errObject;
            } 
        }
    };
    
    validate(user){
        if (user){
            switch (user.country){
                case 'CL':
                    Object.assign(schema, schema.keys({
                        documentId: Joi.string().rut().required()
                    }));
                break;
                default:
                break;
            }
            return schema.validate(user, {abortEarly: false}, (err, value) => {
                if(err){
                    throw Error(err);
                }
                return value;
            });
        } else {
            throw Error('user cannot be null/undefined');
        }
    }
}

module.exports = user;
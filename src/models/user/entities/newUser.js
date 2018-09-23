const BaseJoi = require('joi');
const DateExtension = require('joi-date-extensions');
const Bcrypt = require('bcrypt');
const rutExtension = require('../../common/extensions/rut');
const countries = require('../../common/enums/countries');
const errors = require('../../common/enums/errors');

//Swagger OpenApi model specification

/**
 * @swagger
 * definitions:
 *   NewUser:
 *     type: object
 *     description: model for create user
 *     required:
 *       - name
 *       - mail
 *       - password
 *       - address
 *       - phone
 *       - documentId
 *       - country
 *     properties:
 *       name:
 *         description: user name
 *         type: string
 *         default: "your name"
 *       email:
 *         description: user email
 *         type: string
 *         default: "your@mail.com"
 *       password:
 *         description: user password
 *         type: string
 *         default: "xxxxxxxxxx"
 *       address:
 *         description: user address
 *         type: string
 *         default: "your address"
 *       phone:
 *         description: user phone
 *         type: string
 *         default: "+56911111111"
 *       documentId:
 *         description: user document Id
 *         type: string
 *         default: "11111111-1"
 *       country:
 *         description: user country
 *         type: string
 *         enum: [CL,PE,AR,CO]
 *         default: CL
 */


const Joi = BaseJoi
    .extend(DateExtension)
    .extend(rutExtension);

// Limit country by schema to CL, PE, AR, CO
const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    documentId: Joi.string().required(),
    country: Joi.string().valid(countries.getArrayOfValues()).required(),
});

const user = class {
    constructor(name, email, password, address, phone, documentId, country){
        if (arguments.length !== 0){
            try {
                const userValidated = this.validate({name, email, password, address, phone, documentId, country});
                this.name = userValidated.name;
                this.email = userValidated.email;
                this.password = Bcrypt.hashSync(userValidated.password, 10);
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
                    schema.documentId = Joi.string().rut().required()
                break;
                default:
                break;
            }
            return Joi.validate(user, schema, (err, value) => {
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
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const pkginfo = require('../package.json');

let options = {
  swaggerDefinition: {
    info: {
      title: pkginfo.name,
      description: pkginfo.description,
      version: pkginfo.version,
      contact: pkginfo.author,
    },
    schemes: ['http'],
    consumes: [
      'application/json',
    ],
    produces: ['application/json'],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
  // Path to the API specs
  apis: [
    path.join(__dirname, './controllers/**/*.js'),
  ],
};

let spec;

const getOptions = () => options;

const modifyOptions = (editedOptions) => {
  options = editedOptions;
};

const initialize = () => {
  spec = swaggerJSDoc(options);

  if (process.env.PREFIX && process.env.PREFIX.trim() !== '') {
    Object.keys(spec.paths).forEach((key) => {
      spec.paths[`/${process.env.PREFIX}${key}`] = spec.paths[key];
      delete (spec.paths[key]);
    });
  }
};

const getSpec = () => spec;

module.exports = {
  getSpec,
  getOptions,
  modifyOptions,
  initialize,
};

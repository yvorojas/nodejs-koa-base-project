const rutValidator = require('../validators/rut');

module.exports = joi => ({
  base: joi.string(),
  name: 'string',
  language: {
    rut: 'invalid rut.',
  },
  rules: [
    {
      name: 'rut',
      validate(params, value, state, options) {
        if (!rutValidator.isRut(value)) {
          return this.createError('string.rut', { v: value }, state, options);
        }
        return value;
      },
    },
  ],
});

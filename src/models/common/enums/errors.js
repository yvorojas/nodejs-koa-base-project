const errors = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
}

const getValue = (code) => {
    if (errors[code]) return errors[code];
    throw Error('code not found in errors enum');
}

const getArrayOfValues = () => {
    return Object.values(errors);
}

module.exports = {
    ...errors,
    getValue,
    getArrayOfValues,
};
const countries = {
    CL: 'CL',
    AR: 'AR',
    PE: 'PE',
    CO: 'CO',
}

const getValue = (code) => {
    if (countries[code]) return countries[code];
    throw Error('code not found in countries enum');
}

const getArrayOfValues = () => {
    return Object.values(countries);
}

module.exports = {
    ...countries,
    getValue,
    getArrayOfValues,
};
const userRepository = require('../repositories/users');
const userMappers = require('../../../../models/user/mappers');

const getUsers = () => {
    try {
        return userMappers.toUserEntityArray(userRepository.getAllUsers());
    } catch (err) {
        throw err;
    }
}

module.exports = getUsers;

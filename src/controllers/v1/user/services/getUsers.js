const userRepository = require('../repositories/users');

const getUsers = () => {
    return userRepository.getAllUsers();
}

module.exports = getUsers;

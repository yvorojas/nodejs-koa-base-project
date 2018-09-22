const userRepository = require('../repositories/users');

const createUser = (user) => {
    return userRepository.createUser(user);
}

module.exports = createUser;

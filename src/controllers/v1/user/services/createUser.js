const userRepository = require('../repositories/users');
const UserEntity = require('../../../../models/user/entities/newUser');

const createUser = (user) => {
    try {
        const userEntity = new UserEntity(
            user.name, 
            user.email, 
            user.password, 
            user.address, 
            user.phone, 
            user.documentId, 
            user.country);
        userRepository.createUser(userEntity);
        return 'USER CREATED CORRECTLY';
    } catch(err) {
        throw err;
    }
   
}

module.exports = createUser;

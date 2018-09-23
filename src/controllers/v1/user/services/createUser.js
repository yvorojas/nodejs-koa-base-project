const userRepository = require('../repositories/users');
const NewUserEntity = require('../../../../models/user/entities/newUser');

const createUser = (user) => {
    try {
        const newUserEntity = new NewUserEntity(
            user.name, 
            user.email, 
            user.password, 
            user.address, 
            user.phone, 
            user.documentId, 
            user.country);
        userRepository.createUser(newUserEntity);
        return 'USER CREATED CORRECTLY';
    } catch(err) {
        throw err;
    }
   
}

module.exports = createUser;

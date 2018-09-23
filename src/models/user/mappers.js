const User = require('../user/entities/user');

const toUserEntity = (user) => {
    try {
        return new User(user.id, user.name, user.email, user.address, user.phone, user.documentId, user.country);
    } catch (err){
        throw err;
    }
} 

const toUserEntityArray = (users) => {
    try {
        const userEntityArray = [];
        users.forEach((user)=>{
            userEntityArray.push(toUserEntity(user));
        });
        return userEntityArray;
    } catch (err){
        throw err;
    }
}

module.exports = {
    toUserEntity,
    toUserEntityArray,
}
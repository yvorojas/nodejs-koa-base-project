//TODO: DB Connection
const uuid = require('uuid');
const usersArray = [];

const getAllUsers = () => {
    const usersToReturn = [];
    usersArray.forEach((user)=>{
        usersToReturn.push({
            id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            documentId: user.documentId,
            country: user.country,
        });
    })
    return usersToReturn;
}

const createUser = (user) => {
    user.id = uuid.v4();
    usersArray.push(user);
    return user;
}

module.exports = {
    getAllUsers,
    createUser,
}
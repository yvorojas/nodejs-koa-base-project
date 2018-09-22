//TODO: DB Connection
const usersArray = [];

const getAllUsers = () => {
    return usersArray;
}

const createUser = (user) => {
    usersArray.push(user);
    return user;
}

module.exports = {
    getAllUsers,
    createUser,
}
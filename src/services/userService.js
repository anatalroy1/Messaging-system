const jwt = require('jsonwebtoken');

const users = [
    {
        id: 1,
        // for the purpose of this task, name is unique
        name: "test"
    }
];

function isUserExist(userName) {
    return users.some(user => user.name === userName);
}

function createToken(userId){
    return jwt.sign({id: userId}, 'privatekey');
}

module.exports = {
    loginUser(userName) {
        if (userName && isUserExist(userName)) {
            const { id } = users.find(user => user.name === userName);

            return createToken(id);
        } else {
            throw new Error('user wasnt fount');
        }
    },
}


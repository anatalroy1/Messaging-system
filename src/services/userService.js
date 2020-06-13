const jwt = require('jsonwebtoken');

const users = [
    {
        id: 1,
        name: "test"
    }
];

function isUserExist(userName) {
    return users.some(user => user.name === userName);
}

function createToken(userName){
    const { id } = users.find(user => user.name === userName);

    return jwt.sign({id}, 'privatekey');
}

module.exports = {
    loginUser(userName) {
        console.log(userName);
        if (userName && isUserExist(userName)) {
            return createToken(userName);
        } else {
            throw new Error('user wasnt fount');
        }
    },
}


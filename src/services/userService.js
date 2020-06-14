const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('./private.key', 'utf8'); // to sign JWT

const users = [
    {
        // for the purpose of this task, name and id are unique
        id: 1,
        name: "test"
    }
];

function isUserExist(userName) {
    return users.some(user => user.name === userName);
}

function createToken(userId){
    return jwt.sign({id: userId}, privateKey, {algorithm: "RS256"});
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


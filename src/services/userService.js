const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('./private.key', 'utf8'); // to sign JWT

const users = [
    {
        // for the purpose of this task, phoneNumber and id are unique
        id: 1,
        name: "testA", 
        phoneNumber: 1234
    },
    {
        id: 2,
        name: "testB",
        phoneNumber: 5678
    }
];

function isUserExist(phoneNumber) {
    return users.some(user => user.phoneNumber === phoneNumber);
}

function createToken(userId){
    return jwt.sign({id: userId}, privateKey, {algorithm: "RS256"});
}

module.exports = {
    loginUser(phoneNumber) {
        if (phoneNumber && isUserExist(+phoneNumber)) {
            const { id } = users.find(user => user.phoneNumber === +phoneNumber);

            return createToken(id);
        } else {
            throw new Error('user wasnt fount');
        }
    },

    getUserById(userId) {
        return users.find(user => user.id === userId);
    }
}


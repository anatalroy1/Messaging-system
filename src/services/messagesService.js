const messages = [];
let id = 0;

module.exports = {
    postMessage(userId, message) {
        let res = null;
        if(isValidMessage(message)){
           message.sender = userId;
           message.creationDate = new Date();
           message.id = ++id;
           messages.push(message);
           res = message;
        }
        console.log(messages);
        return res;
    },

    getMessages(userId) {
        return messages.filter(message => message.sender === userId);
    }
}

function isValidMessage(message) {
    return message.receiver && message.message && message.subject;
}

const messages = [];

module.exports = {
    postMessage(userId, message){
        let res = null;
        if(isValidMessage(message)){
           message.sender = userId;
           message.creationDate = new Date();
           messages.push(message);
           res = message;
        }
        console.log(messages);
        return res;
    }
}

function isValidMessage(message) {
    return message.receiver && message.message && message.subject;
}

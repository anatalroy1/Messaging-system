const messages = [];
const messageStatus = { "UNREAD": 1, "READ": 2};
// id is uniqe
let id = 0;

module.exports = {
    postMessage(userId, message) {
        let res = null;
        if(isValidMessage(message)){
           message.sender = userId;
           message.creationDate = new Date();
           message.id = ++id;
           message.status = messageStatus.UNREAD;
           messages.push(message);
           res = message;
        }
        console.log(messages);
        return res;
    },

    getMessages(userId, messageId) {
        const userMessages =  messages.filter(message => message.receiver === userId);
        if(messageId) {
            userMessages = userMessages.filter(message => message.id === messageId);
        }
        userMessages.forEach(x => x.status === messageStatus.READ);
        
        return userMessages;
    },

    deleteMessage(messageId, userId) {
        const message = messages.find(message => message.id === messageId);
        if(message.sender === userId || message.receiver === userId){
            messages = messages.filter(message => message.id !== message.messageId);
        }
    }
}

function isValidMessage(message) {
    return message.receiver && message.message && message.subject;
}

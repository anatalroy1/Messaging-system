const messages = [];
const messageStatus = { "UNREAD": 1, "READ": 2};
// id is uniqe
let id = 0;

module.exports = {
    postMessage(user, message) {
        let res = null;
        if(isValidMessage(message)){
           message.sender = user.phoneNumber;
           message.creationDate = new Date();
           message.id = ++id;
           message.status = messageStatus.UNREAD;
           messages.push(message);
           res = message;
        }
        console.log(messages);
        return res;
    },

    getMessages(user, messageId) {
        const userMessages =  messages.filter(message => message.receiver === user.phoneNumber && message.status === messageStatus.UNREAD);
        if(messageId) {
            userMessages = [...userMessages.find(message => message.id === messageId)];
        }
        userMessages.forEach(message => message.status = messageStatus.READ);
        
        return userMessages;
    },

    deleteMessage(user, messageId) {
        const message = messages.find(message => message.id === messageId);
        if(message && message.sender === user.phoneNumber || message.receiver === user.phoneNumber) {
            message.deleted = true;
            // can delete resource of mark it as deleted. 
            messages = messages.filter(message => message.id !== message.messageId);
        }

        return message;
    }
}

function isValidMessage(message) {
    return message.receiver && message.message && message.subject;
}

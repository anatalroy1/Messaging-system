let messages = [];
const messageStatus = { "UNREAD": "unread", "READ": "read"};
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
        
        return res;
    },

    getMessages(user, onluUnreadMessages) {
        let userMessages = messages.filter(message => message.receiver === user.phoneNumber);
        if(onluUnreadMessages) {
            userMessages = userMessages.filter(message => message.status === messageStatus.UNREAD);
        }
        
        return userMessages;
    },

    readMessage(user, messageId){
        const message = messages.find(message => message.receiver === user.phoneNumber && message.id === messageId);
        if(message) {
            message.status = messageStatus.READ;
        }

        return message;
    },

    deleteMessage(user, messageId) {
        const message = messages.find(message => message.id === messageId);
        if(message && (message.sender === user.phoneNumber || message.receiver === user.phoneNumber)) {
            message.deleted = true;
            // can delete resource of mark it as deleted. 
            messages = messages.filter(message => message.id !== messageId);
        }

        return message;
    }
}

function isValidMessage(message) {
    return message.receiver && message.message && message.subject;
}

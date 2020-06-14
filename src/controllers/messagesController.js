const jwt = require('jsonwebtoken');
const fs = require('fs');
const messagesService = require('../services/messagesService');

const publicKey = fs.readFileSync('./public.key.pub', 'utf8');

module.exports = {
    getMessages(req, res){
        const token = req.headers.token;
        const { messageId } = req.params;
        try {
            const { id } = verifyToken(token);
            const messages = messagesService.getMessages(id, +messageId);
            res.status(200).json({messages: messages});
        } catch(err) {
            console.log(err);
            return res.status(401).json({
                title: "error",
                error: err
            });
        }
    },

    postMessage(req, res){
        const token = req.headers.token;
        const message = req.body;
        try {
            const { id } = verifyToken(token);
            const postedMessage = messagesService.postMessage(id, message);
            if(postedMessage) {
                res.status(200).json({title:"success", message: postedMessage});
            } else {
                res.status(400).json({title:"Failure, invalid message structure"});
            }            
        } catch(err) {
            return res.status(401).json({
                title: "error",
                error: err
            });
        }
    },
    deleteMessage(){}
}


function verifyToken(token) {
    return jwt.verify(token, publicKey, {algorithm:	["RS256"]})
}
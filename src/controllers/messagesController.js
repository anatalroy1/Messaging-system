const jwt = require('jsonwebtoken');
const fs = require('fs');
const messagesService = require('../services/messagesService');
const userService = require('../services/userService');

const publicKey = fs.readFileSync('./public.key.pub', 'utf8');

module.exports = {
    getMessages(req, res){
        const token = req.headers.token;
        const { messageId } = req.params;
        try {
            const { id } = verifyToken(token);
            const user = userService.getUserById(id);
            const messages = messagesService.getMessages(user, +messageId);
            res.status(200).json({title:"success", messages: messages});
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
            const user = userService.getUserById(id);
            const postedMessage = messagesService.postMessage(user, message);
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

    deleteMessage(req, res){
        const token = req.headers.token;
        const { messageId } = req.params;
        try {
            const { id } = verifyToken(token);
            const user = userService.getUserById(id);
            const message = messagesService.deleteMessage(user, +messageId);
            const statusCode = message ? (message.deleted ? 200 : 400) : 404;
            res.status(statusCode).json({message});
        } catch(err) {
            console.log(err);
            return res.status(401).json({
                title: "error",
                error: err
            });
        }
    }
}


function verifyToken(token) {
    return jwt.verify(token, publicKey, {algorithm:	["RS256"]})
}
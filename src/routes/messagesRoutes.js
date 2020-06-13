const express = require("express")
const router = express.Router(); 
const messagesController = require('../controllers/messagesController');

router.get('/:messageId?/unread?', messagesController.getMessages);
router.post('/', messagesController.postMessages);
router.delete('/:messageId?', messagesController.deleteMessage)

module.exports = router;

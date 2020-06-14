const express = require("express")
const router = express.Router(); 
const messagesController = require('../controllers/messagesController');

router.get('/:messageId?', messagesController.getMessages);
router.post('/', messagesController.postMessage);
router.delete('/:messageId?', messagesController.deleteMessage)

module.exports = router;

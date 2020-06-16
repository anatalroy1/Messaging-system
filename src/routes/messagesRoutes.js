const express = require("express")
const router = express.Router(); 
const messagesController = require('../controllers/messagesController');

router.get('/', messagesController.getMessages);
router.get('/:messageId', messagesController.readMessage);
router.post('/', messagesController.postMessage);
router.delete('/:messageId', messagesController.deleteMessage)

module.exports = router;

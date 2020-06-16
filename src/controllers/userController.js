const userService = require('../services/userService');

module.exports = {
    loginUser(req, res) {
        try {
            // very simpale user controller 
            const { phoneNumber } = req.body;
            const token = userService.loginUser(phoneNumber);
            res.status(200).json({title: "login success", token: token});
        } catch(err) {
            res.status(400).json({title: "error", error: "Invalid credentials"});;
        }
    }
}
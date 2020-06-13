const userService = require('../services/userService');

module.exports = {
    loginUser(req, res) {
        try {
            // very simpale user controller 
            console.log(req, req.body);
            const { userName } = req.body;
            const token = userService.loginUser(userName);
            res.status(200).json({title: "login success", token: token});
        } catch(err) {
            console.log(`Error in getting user due to: ${err}`);
            res.status(400).json({title: "error", error: "Invalid credentials"});;
        }
    }
}
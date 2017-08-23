'use strict';

module.exports.registerUser = (req, res) => {
    res.status(200).json({
        message: "Request Recieved",
        data:req.body
    });
};
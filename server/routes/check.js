const express = require("express");
const router = express.Router();

const Users = require("../models/Users");

router.post("/", async (req, res, next) => {

    try {
        const {email} = req.body;
        
        await Users.collection.findOne({email}, (err, found) => {
            if(err || !found){
                return res.json({
                    code: 400,
                    success: true,
                    message: "EMAIL NOT FOUND",
                });
            }else{
                return res.json({
                    code: 200,
                    success: true,
                    message: "EMAIL FOUND",
                    details: found
                });
            }
        });

    } catch (error) {
        return res.json({ code: 400, success: false, message: "EMAIL EXISTS" });
    }
});

module.exports = router;

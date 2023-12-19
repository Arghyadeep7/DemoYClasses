const express = require("express");
const router = express.Router();

const Users = require("../models/Users");

router.post("/", async (req, res, next) => {

    try {
        const data = req.body;
        
        const response = await new Users(data).save();

        next();

        return res.json({
            code: 200,
            success: true,
            message: "REGISTRATION SUCCESSFULL",
            id: response._id.toString()
        });
    } catch (error) {
        return res.json({ code: 400, success: false, message: "EMAIL EXISTS" });
    }
});

module.exports = router;

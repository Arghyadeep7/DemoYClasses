const express = require("express");
const router = express.Router();

const Users = require("../models/Users");

router.post("/", async (req, res, next) => {

    try {
        const {email, batch, month, year} = req.body;

        await Users.collection.updateOne({email}, {
            $set: {batch: batch, month: month, year: year}
        });

        return res.json({
            code: 200,
            success: true,
            message: "UPDATION SUCCESSFULL",
        });

    } catch (error) {
        return res.json({ code: 400, success: false, message: "EMAIL EXISTS" });
    }
});

module.exports = router;

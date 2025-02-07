const mongoose = require("mongoose");
const express = require("express");
const Solution = require("../models/Solution");
const User = require('../models/User');

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        return res.status(200).json({
            message: "Success in solution route, 200!"
        })
    }
    catch (e) {
        return res.status(500).json(
            {
                message: 'Error in /',
                error: e.message,
            }
        );
    }
});

router.get("/get-solutions", async (req, res) => {
    try {
        const solutions = await Solution.find();
        return res.status(200).json({ message: "Got!", solutions: solutions });
    }
    catch (e) {
        return res.status(500).json({
            message: "Some error came",
            error: e.message,
        });
    }
});

router.post("/add-solution/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const { link } = req.body;

        const user = await User.findOne({ email });

        const solutionData = new Solution({
            solutionLink: link,
            user: user
        });

        await solutionData.save();

        return res.status(200).json({ message: "Added solution!" });

    }
    catch (e) {
        return res.status(500).json({ message: "Error came!", error: e.message });
    }
});

module.exports = router;

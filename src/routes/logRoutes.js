const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get("/", async (req, res) => {
    res.status(200).json({ message: "Logs 200 success!" });
});

router.get("/update", async (req, res) => {

    const { apiKey } = req.body;




});
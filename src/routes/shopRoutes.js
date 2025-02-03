const express = require("express");
const mongoose = require("mongoose"); // Make sure mongoose is imported
const router = express.Router();
const Item = require('../models/Item');

router.get("/", (req, res) => {
    res.status(200).json({ message: "Shop 200 success" });
});

router.post("/add", async (req, res) => {

    try {



        const existingProduct = await Item.findOne({ name: req.body.name });

        if (existingProduct) {
            return res.status(400).json({ message: "Item already exists!", status: 400 });
        }

        let itemData = req.body;
        itemData._id = new mongoose.Types.ObjectId(); // Use mongoose correctly
        const { name, type, price, imageUrl, description } = req.body;

        if (!name || !type || !price || !imageUrl || !description) {
            return res.status(400).json({ message: "All fields are required", status: 400 });
        }

        const newItem = new Item({
            name,
            type,
            price,
            imageUrl,
            description
        });

        console.log("New Item:", newItem);

        await newItem.save();

        return res.status(201).json({
            message: "Item creation is successful!",
            status: 201,
            item: newItem,
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({
            message: "Item creation failed!",
            status: 500,
            error: e.message
        });
    }

});


router.get("/all", async (req, res) => {
    try {
        const items = await Item.find();
        return res.status(200).json({ message: "All items", items: items });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Error fetching items", error: e.message });
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Item name is required", status: 400 });
        }

        const item = await Item.findOne({ name: name });

        if (!item) {
            return res.status(404).json({ message: "Item not found", status: 404 });
        }

        const result = await Item.deleteOne({ name });

        if (result.deletedCount == 0) {
            return res.status(404).json({
                message: "Item not found!",
                status: 404
            });
        }


        return res.status(200).json({ message: "Item deleted successfully", status: 200 });

    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Error deleting item", error: e.message });
    }
});

router.put('/edit', async (req, res) => {
    try {
        const { name, type, price, imageUrl, description } = req.body;

        // Validate that all necessary fields are provided
        if (!name || !type || !price || !imageUrl || !description) {
            return res.status(400).json({ message: "All fields are required", status: 400 });
        }

        // Find the item by its name
        const item = await Item.findOne({ name });

        // If the item doesn't exist, return a 404
        if (!item) {
            return res.status(404).json({ message: "Item not found", status: 404 });
        }

        // Update the item with the new data from the request body
        item.type = type;
        item.price = price;
        item.imageUrl = imageUrl;
        item.description = description;

        // Save the updated item
        const updatedItem = await item.save();

        return res.status(200).json({
            message: "Item updated successfully",
            status: 200,
            item: updatedItem
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            message: "Error updating item",
            status: 500,
            error: e.message
        });
    }
});


module.exports = router;

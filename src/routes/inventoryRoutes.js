const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require('../models/User'); // Assuming User model exists and has an array of items
const Item = require('../models/Item'); // Assuming Item model exists


router.get("/", async (req, res) => {
    return res.status(200).json({ message: "Inventory 200 success!" });
});

router.get("/items/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email }).populate('items'); // Populate user's items array

        if (!user) {
            return res.status(404).json({ message: "User not found", status: 404 });
        }

        return res.status(200).json({
            message: "User's items fetched successfully",
            status: 200,
            items: user.items
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Error fetching items", error: e.message });
    }
});

// Route to add an item to the user's inventory
router.post("/add/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const { name, type, price, imageUrl, description, status = 'available', quantity = 1 } = req.body;

        if (!name || !type || !price || !imageUrl || !description) {
            return res.status(400).json({ message: "All fields are required", status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found", status: 404 });
        }

        // Check if the item already exists in the user's inventory
        const existingItemIndex = user.items.findIndex(item => item.name === name);

        if (existingItemIndex > -1) {
            // If the item exists, update the status and quantity
            user.items[existingItemIndex].status = 'available';
            user.items[existingItemIndex].quantity += quantity;

            await user.save();

            return res.status(200).json({
                message: "Item status updated to available and quantity increased",
                status: 200,
                item: user.items[existingItemIndex]
            });
        }

        // If the item does not exist, add it to the inventory
        const newItem = new Item({
            name,
            type,
            price,
            imageUrl,
            description,
            status,
            quantity
        });

        user.items.push(newItem); // Add the new item to the user's items array
        await user.save();

        return res.status(201).json({
            message: "Item added successfully",
            status: 201,
            item: newItem
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            message: "Error adding item",
            status: 500,
            error: e.message
        });
    }
});

// Route to remove an item from the user's inventory
router.delete("/remove/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Item name is required", status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found", status: 404 });
        }

        // Find the index of the item to be removed
        const itemIndex = user.items.findIndex(item => item.name === name);

        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found in your inventory", status: 404 });
        }

        // Remove the item from the user's items array
        user.items.splice(itemIndex, 1);
        await user.save();

        return res.status(200).json({ message: "Item removed successfully", status: 200 });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Error removing item", error: e.message });
    }
});



// Route to modify the quantity of an item in the user's inventory
router.put("/quantity/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const { name, quantity } = req.body;

        if (!name || !quantity) {
            return res.status(400).json({ message: "Item name and quantity are required", status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found", status: 404 });
        }

        // Find the item and modify the quantity
        const item = user.items.find(item => item.name === name);

        if (!item) {
            return res.status(404).json({ message: "Item not found in your inventory", status: 404 });
        }

        item.quantity = quantity;
        await user.save();

        return res.status(200).json({
            message: "Item quantity updated successfully",
            status: 200,
            item
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            message: "Error updating item quantity",
            status: 500,
            error: e.message
        });
    }
});

module.exports = router;

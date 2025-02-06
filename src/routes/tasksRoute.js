const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();
const Tasks = require('../models/Task');

router.get('/', async (req, res) => {
    try {
        return res.status(200).json({ message: "200 tasks route success!" });
    }
    catch (e) {
        return res.status(500).json({ message: "Error fetching tasks", error: e.message });
    }
});

router.post('/add', async (req, res) => {
    try {
        const taskData = req.body;
        const task = new Tasks(taskData);
        task._id = new mongoose.Types.ObjectId(); // properly saving it
        await task.save();
        return res.status(201).json({ message: "Task added successfully", task: task });
    }
    catch (e) {
        return res.status(500).json({ message: "Error adding task", error: e.message });
    }
});

router.get('/get', async (req, res) => {
    try {
        const tasks = await Tasks.find();
        return res.status(200).json({ message: "Tasks fetched successfully", tasks: tasks });
    }
    catch (e) {
        return res.status(500).json({ message: "some problem fetching stuff", error: e.message });
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Tasks.findById(id);
        return res.status(200).json({ message: "Task fetched successfully", task: task });
    }
    catch (e) {
        return res.status(500).json({ message: "some problem fetching stuff", error: e.message });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const task = await Tasks.findById(req.params.id);
        const taskData = req.body;
        await task.updateOne(taskData);
        return res.status(200).json({ message: "Task updated successfully", task: taskData });
    }
    catch (e) {
        return res.status(500).json({ message: "Error updating task", error: e.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const task = await Tasks.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        await task.deleteOne();
        return res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (e) {
        return res.status(500).json({ message: "Error deleting task", error: e.message });
    }
});

module.exports = router;

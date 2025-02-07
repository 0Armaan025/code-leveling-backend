const mongoose = require('mongoose');
const User = require('../models/User');

const solutionSchema = mongoose.Schema({
    solutionLink: {
        type: String,
        required: true,
    },
    user: {
        type: User.schema,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Solution", solutionSchema);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const shopRoutes = require("./routes/shopRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const taskRoutes = require('./routes/tasksRoute');
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const solutionRoute = require("./routes/solutionRoute");

const app = express();



// Middleware
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));



mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));


// protecting routes:-
// const auth = require("../middleware/auth");

// router.get("/dashboard", auth, (req, res) => {
//     res.json({ message: "Welcome to your dashboard!" });
// });

app.use("/api/user", userRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/tasks", taskRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/solutions/', solutionRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

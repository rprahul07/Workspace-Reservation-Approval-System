const express = require("express");
const errorhandler = require("./middlewares/errorHandler");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { sequelize } = require("./config/database");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/user", require("./routes/userRoutes"));

// Global error handler
app.use(errorhandler);

// Database sync and server start
sequelize.sync({ force: false })  // Set force: false to avoid dropping tables
    .then(() => {
        console.log("Database connected successfully.");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });
    module.exports = { app }; 
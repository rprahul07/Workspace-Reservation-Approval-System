const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false,
});

// Load models
const User = require("../models/user")(sequelize, DataTypes);
const Booking = require("../models/bookings")(sequelize, DataTypes);

// Define Associations
User.hasMany(Booking, { foreignKey: "employeeId", onDelete: "CASCADE" });
Booking.belongsTo(User, { foreignKey: "employeeId", onDelete: "CASCADE" });  // Optional, for consistency

// Sync database
sequelize.sync({ alter: true })  // Use { alter: true } to update table structure without dropping
    .then(() => console.log("Database synced successfully."))
    .catch(err => console.error("Database sync failed:", err));

module.exports = { sequelize, User, Booking };

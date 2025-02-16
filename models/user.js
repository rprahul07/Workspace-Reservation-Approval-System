const { type } = require("os");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role:{type:DataTypes.STRING,allowNull:false},
  });
//   const Booking = sequelize.define("Booking", {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     employeeId: { type: DataTypes.INTEGER, allowNull: false },
//     date: { type: DataTypes.DATEONLY, allowNull: false },
//     status: { type: DataTypes.ENUM("Pending", "Manager Approved", "Admin Approved", "Rejected"), defaultValue: "Pending" }
//   });
// User.hasMany(Booking, { foreignKey: "employeeId" });
// Booking.belongsTo(User, { foreignKey: "employeeId" });

  return User;
};

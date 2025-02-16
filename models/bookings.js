module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("Booking", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      employeeId: { type: DataTypes.INTEGER, allowNull: false },
      date: { type: DataTypes.DATEONLY, allowNull: false },
      status: {
        type: DataTypes.ENUM("Pending", "Manager Approved", "Admin Approved", "Rejected"),
        defaultValue: "Pending",
      },
    });
  
    return Booking;
  };
  
User.hasMany(Booking, { foreignKey: "employeeId" });
Booking.belongsTo(User, { foreignKey: "employeeId" });
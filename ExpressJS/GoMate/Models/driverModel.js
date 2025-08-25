const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  Name: { type: String, unique: true },
  Mobile: { type: Number },
  PerDayRate: { type: Number },
  OvertimeRate: { type: Number },
  License: { type: String },
  Status: { type: String },
});

const driverModel = mongoose.model("Drivers", driverSchema);

module.exports = driverModel;

const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  Name: { type: String, unique: true },
  Model: { type: Number },
  RegistrationNumber: { type: String },
  PerKilometerRate: { type: Number },
  Type: { type: String },
  PassengerCapacity: { type: Number,default:0 },
  GoodsCapacity: { type: Number ,default:0},
  Purpose: { type: String },
  Status: { type: String },
});

const vehicleModel = mongoose.model("Vehicles", vehicleSchema);

module.exports = vehicleModel;

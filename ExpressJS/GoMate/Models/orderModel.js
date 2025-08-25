const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  StartLocation: { type: String },
  DropLocation: { type: String },
  StartDate: { type: Date },
  EndDate: { type: Date },
  ServiceType: { type: String },
  PassengersCount: { type: Number ,default :0},
  GoodsWeight: { type: Number ,default:0},
  Distance: { type: Number },
  Purpose: { type: String },
  Status: { type: String },
  Vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicles" },
  Driver: { type: mongoose.Schema.Types.ObjectId, ref: "Drivers" },
});

const orderModel = mongoose.model("Orders", orderSchema);

module.exports = orderModel;

const vehicleModel = require("../Models/vehicleModel");
const orderModel = require("../Models/orderModel");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/GoMate");

const insert = async (
  Name,
  Model,
  RegistrationNumber,
  PerKilometerRate,
  Type,
  PassengerCapacity,
  GoodsCapacity,
  Purpose,
  Status
) => {
  const data = await vehicleModel.create({
    Name: Name,
    Model: Model,
    RegistrationNumber: RegistrationNumber,
    PerKilometerRate: PerKilometerRate,
    Type: Type,
    PassengerCapacity: PassengerCapacity,
    GoodsCapacity: GoodsCapacity,
    Purpose: Purpose,
    Status: Status,
  });
  return data;
};

const getVehicle = async () => {
  const data = await vehicleModel.find();
  return data;
};
const getVehicleById = async (id) => {
  const data = await vehicleModel.findById(id);
  return data;
};

const updateVehicle = async (
  id,
  Name,
  Model,
  RegistrationNumber,
  PerKilometerRate,
  Type,
  PassengerCapacity,
  GoodsCapacity,
  Purpose,
  Status
) => {
  const newData = await vehicleModel.findByIdAndUpdate(id, {
    Name: Name,
    Model: Model,
    RegistrationNumber: RegistrationNumber,
    PerKilometerRate: PerKilometerRate,
    Type: Type,
    PassengerCapacity: PassengerCapacity,
    GoodsCapacity: GoodsCapacity,
    Purpose: Purpose,
    Status: Status,
  });
  return newData;
};

const deleteVehicle = async (id) => {
  const newData = await vehicleModel.findByIdAndDelete(id);
  return newData;
};

const getAvailableVehicles = async () => {
  const assignedVehicles = await orderModel
    .find({
      Vehicle: { $ne: null },
    })
    .distinct("Vehicle");
  const availableVehicles = await vehicleModel.find({
    _id: { $nin: assignedVehicles },
  });
  return availableVehicles;
};

module.exports = {
  insert,
  getVehicle,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  getAvailableVehicles,
};

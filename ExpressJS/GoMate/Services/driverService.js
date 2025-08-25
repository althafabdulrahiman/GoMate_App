const mongoose = require("mongoose");
const driverModel = require("../Models/driverModel");
const orderModel = require("../Models/orderModel");

mongoose.connect("mongodb://localhost/GoMate");

const insert = async (
  Name,
  Mobile,
  PerDayRate,
  OvertimeRate,
  License,
  Status
) => {
  const data = await driverModel.create({
    Name: Name,
    Mobile: Mobile,
    PerDayRate: PerDayRate,
    OvertimeRate: OvertimeRate,
    License: License,
    Status: Status,
  });
  return data;
};

const getDriver = async () => {
  const data = await driverModel.find();
  return data;
};

const getDriverBy = async (id) => {
  const data = await driverModel.findById(id);
  return data;
};

const updateDriver = async (
  id,
  Name,
  Mobile,
  PerDayRate,
  OvertimeRate,
  License,
  Status
) => {
  const newData = await driverModel.findByIdAndUpdate(
    id,

    {
      Name: Name,
      Mobile: Mobile,
      PerDayRate: PerDayRate,
      OvertimeRate: OvertimeRate,
      License: License,
      Status: Status,
    }
  );

  return newData;
};

const deleteDriver = async (id) => {
  const newData = await driverModel.findByIdAndDelete(id);
  return newData;
};

const getAvailableDrivers = async () => {
  const assignedDrivers = await orderModel
    .find({ Driver: { $ne: null } })
    .distinct("Driver");

  const availableDrivers = await driverModel.find({
    _id: { $nin: assignedDrivers },
  });

  return availableDrivers;
};

module.exports = {
  insert,
  getDriver,
  updateDriver,
  deleteDriver,
  getDriverBy,
  getAvailableDrivers,
};

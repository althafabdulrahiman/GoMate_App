const vehicleService = require("../Services/vehicleService");

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
  return await vehicleService.insert(
    Name,
    Model,
    RegistrationNumber,
    PerKilometerRate,
    Type,
    PassengerCapacity,
    GoodsCapacity,
    Purpose,
    Status
  );
};

const getVehicle = async () => {
  return await vehicleService.getVehicle();
};

const getVehicleById = async (id) => {
  return await vehicleService.getVehicleById(id);
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
  return await vehicleService.updateVehicle(
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
  );
};

const deleteVehicle = async (id) => {
  return await vehicleService.deleteVehicle(id);
};

module.exports = {
  insert,
  getVehicle,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};

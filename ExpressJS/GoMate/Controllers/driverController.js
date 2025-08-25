const express = require("express");
const driverService = require("../Services/driverService");

const insert = async (
  Name,
  Mobile,
  PerDayRate,
  OvertimeRate,
  License,
  Status
) => {
  return await driverService.insert(
    Name,
    Mobile,
    PerDayRate,
    OvertimeRate,
    License,
    Status
  );
};

const getDriver = async () => {
  return await driverService.getDriver();
};

const getDriverBy = async (id) => {
  return await driverService.getDriverBy(id);
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
  return await driverService.updateDriver(
    id,
    Name,
    Mobile,
    PerDayRate,
    OvertimeRate,
    License,
    Status
  );
};

const deleteDriver = async (id) => {
  return await driverService.deleteDriver(id);
};

module.exports = { insert, getDriver, updateDriver, deleteDriver, getDriverBy };

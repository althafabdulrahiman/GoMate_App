const express = require("express");
const driverController = require("../Controllers/driverController");
const driverService = require("../Services/driverService");

const { validateDriver } = require("../validation/driverValidate");

const authMiddleware = require("../middlewares/Auth");
var router = express.Router();

router.post("/add", authMiddleware, validateDriver, async (req, res, next) => {
  try {
    const { Name, Mobile, PerDayRate, OvertimeRate, License, Status } =
      req.body;
    const newData = await driverController.insert(
      Name,
      Mobile,
      PerDayRate,
      OvertimeRate,
      License,
      Status
    );

    res.status(200).json({
      status: 200,
      message: "Data inserted successfully",
      Object: newData,
    });
  } catch (error) {
    res.json({
      status: 400,
      message: "data not inserted",
      reason: error,
    });
  }
});

router.get("/get", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.query;
    let newData;

    if (id) {
      newData = await driverController.getDriverBy(id);
    } else {
      newData = await driverController.getDriver();
    }
    res.status(200).json({
      status: 200,
      message: "data recieved successfully",
      data: newData,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "error occured",
      error: error,
    });
  }
});

router.put("/update", authMiddleware, async (req, res, next) => {
  try {
    const { Name, Mobile, PerDayRate, OvertimeRate, License, Status } =
      req.body;

    const { id } = req.query;

    const newData = await driverController.updateDriver(
      id,
      Name,
      Mobile,
      PerDayRate,
      OvertimeRate,
      License,
      Status
    );

    res.status(200).json({
      status: 200,
      message: "Details updated",
      data: newData,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "error occured",
      error: error,
    });
  }
});

router.delete("/delete", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.query;
    const newData = await driverController.deleteDriver(id);

    res.status(200).json({
      status: 200,
      message: "data successfully deleted",
      data: newData,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "error occured",
      error: error,
    });
  }
});

router.get("/getAvailable", authMiddleware, async (req, res) => {
  try {
    const data = await driverService.getAvailableDrivers();
    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

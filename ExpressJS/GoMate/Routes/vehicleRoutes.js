const express = require("express");
const vehicleController = require("../Controllers/vehicleController");
const router = express.Router();
const authMiddleware = require("../middlewares/Auth");
const vehicleService = require("../Services/vehicleService");

router.post("/add", authMiddleware, async (req, res, next) => {
  try {
    const {
      Name,
      Model,
      RegistrationNumber,
      PerKilometerRate,
      Type,
      PassengerCapacity,
      GoodsCapacity,
      Purpose,
      Status,
    } = req.body;

    const newData = await vehicleController.insert(
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

    res.status(200).json({
      status: 200,
      message: "Data inserted",
      data: newData,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Data not inserted",
    });
  }
});

router.get("/get", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.query;
    let newData;

    if (id) {
      newData = await vehicleController.getVehicleById(id);
    } else {
      newData = await vehicleController.getVehicle();
    }

    res.status(200).json({
      status: 200,
      message: "data recieved",
      data: newData,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "error occured",
    });
  }
});

router.put("/update", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.query;
    const {
      Name,
      Model,
      RegistrationNumber,
      PerKilometerRate,
      Type,
      PassengerCapacity,
      GoodsCapacity,
      Purpose,
      Status,
    } = req.body;

    const newData = await vehicleController.updateVehicle(
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

    res.status(200).json({
      status: 200,
      message: "data updated",
      data: newData,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "error occured",
    });
  }
});

router.delete("/delete", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.query;
    const newData = await vehicleController.deleteVehicle(id);

    res.status(200).json({
      status: 200,
      message: "vehicle deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "error occured",
    });
  }
});

router.get("/getAvailable", authMiddleware, async (req, res) => {
  try {
    const newData = await vehicleService.getAvailableVehicles();
    res.json({ data: newData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

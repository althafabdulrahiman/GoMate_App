const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");
const authMiddleware = require("../middlewares/Auth");
const orderModel = require("../Models/orderModel");

router.post("/add", authMiddleware, async (req, res, next) => {
  try {
    const {
      StartLocation,
      DropLocation,
      StartDate,
      EndDate,
      ServiceType,
      PassengersCount,
      GoodsWeight,
      Distance,
      Purpose,
      Status,
    } = req.body;

    const newData = await orderController.insert(
      StartLocation,
      DropLocation,
      StartDate,
      EndDate,
      ServiceType,
      PassengersCount,
      GoodsWeight,
      Distance,
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
    },EndDate);
  }
});

router.get("/get", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.query;
    let newData;
    const {StartDate,EndDate}=req.query;

    if (id) {
      newData = await orderController.getOrderById(id);
    } 
    else if(StartDate || EndDate){
        newData=await orderController.getOrderByDate(StartDate,EndDate);
      }
      else
      {
      newData = await orderController.getOrder();
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

router.get("/getUpdatedOrder", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.query;
    const newData = await orderController.getUpdatedOrder(id);

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

router.patch("/updateOrder", authMiddleware, async (req, res) => {
  try {
    const { id } = req.query;
    const { driverId, vehicleId } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
      // { Driver: driverId },
      { Driver: driverId, Vehicle: vehicleId },
      { new: true }
    );

    res
      .status(200)
      .json({ status: 200, message: "order updated", data: updatedOrder });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, message: "Failed to update", error: err.message });
  }
});

router.put("/update", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.query;
    const {
      StartLocation,
      DropLocation,
      StartDate,
      EndDate,
      ServiceType,
      PassengersCount,
      GoodsWeight,
      Distance,
      Purpose,
      Status,
    } = req.body;

    const newData = await orderController.updateOrder(
      id,
      StartLocation,
      DropLocation,
      StartDate,
      EndDate,
      ServiceType,
      PassengersCount,
      GoodsWeight,
      Distance,
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
    const newData = await orderController.deleteOrder(id);

    res.status(200).json({
      status: 200,
      message: "order deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "error occured",
    });
  }
});

// router.get("/getByDate",authMiddleware,(req,res,next)=>{
//   try{
//     const {}=req.body
//   }catch(error)
//   {
//     res.status(400).json({message:"error occured"})
//   }
// })

module.exports = router;

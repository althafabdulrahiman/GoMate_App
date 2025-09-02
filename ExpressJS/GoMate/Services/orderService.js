const orderModel = require("../Models/orderModel");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/GoMate");

const insert = async (
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
) => {
  const data = await orderModel.create({
    StartLocation: StartLocation,
    DropLocation: DropLocation,
    StartDate: StartDate,
    EndDate: EndDate,
    ServiceType: ServiceType,
    PassengersCount: PassengersCount,
    GoodsWeight: GoodsWeight,
    Distance: Distance,
    Purpose: Purpose,
    Status: Status,
  });
  return data;
};

const getOrder = async () => {
  const data = await orderModel.find();
  return data;
};
const getOrderById = async (id) => {
  const data = await orderModel.findById(id);
  return data;
};

const getOrderByDate =async(StartDate,EndDate)=>{
  const start=new Date(StartDate)
  const end=new Date(EndDate)

  end.setHours(23, 59, 59, 999);

  const data=await orderModel.aggregate([{$match:{StartDate:{$gte:start},EndDate:{$lte:end}}}])
  return data
}

// const getOrderFull = async () => {
//   const data = await orderModel.find().populate("Vehicle").populate("Driver");
//   return data;
// };

// const getOrderByOrderId = async (id) => {
//   const data = await orderModel
//     .findById(id)
//     .populate("Vehicle")
//     .populate("Driver");
//   return data;
// };

const getUpdatedOrder = async (id) => {
  const data = await orderModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "drivers",
        localField: "Driver",
        foreignField: "_id",
        as: "Driver",
      },
    },
    {
      $unwind: {
        path: "$Driver",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "vehicles",
        localField: "Vehicle",
        foreignField: "_id",
        as: "Vehicle",
      },
    },
    {
      $unwind: {
        path: "$Vehicle",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  return data;
};

const updateOrder = async (
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
) => {
  const newData = await orderModel.findByIdAndUpdate(id, {
    StartLocation: StartLocation,
    DropLocation: DropLocation,
    StartDate: StartDate,
    EndDate: EndDate,
    ServiceType: ServiceType,
    PassengersCount: PassengersCount,
    GoodsWeight: GoodsWeight,
    Distance: Distance,
    Purpose: Purpose,
    Status: Status,
  });
  return newData;
};

const deleteOrder = async (id) => {
  const newData = await orderModel.findByIdAndDelete(id);
  return newData;
};

module.exports = {
  insert,
  getOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  // getOrderByOrderId,
  // getOrderFull,
  getUpdatedOrder,
  getOrderByDate,
};

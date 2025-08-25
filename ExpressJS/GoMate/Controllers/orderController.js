const orderService = require("../Services/orderService");

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
  return await orderService.insert(
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
};

const getOrder = async () => {
  return await orderService.getOrder();
};

// const getOrderFull = async () => {
//   return await orderService.getOrderFull();
// };

const getOrderById = async (id) => {
  return await orderService.getOrderById(id);
};

const getUpdatedOrder = async (id) => {
  return await orderService.getUpdatedOrder(id);
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
  return await orderService.updateOrder(
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
};

const deleteOrder = async (id) => {
  return await orderService.deleteOrder(id);
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
};

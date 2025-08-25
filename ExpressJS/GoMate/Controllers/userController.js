const userService = require("../Services/userService");

const register = async (username, password) => {
  return await userService.register(username, password);
};

const login = async (username, password) => {
  return await userService.login(username, password);
};

module.exports = { register, login };

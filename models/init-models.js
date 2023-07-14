var DataTypes = require("sequelize").DataTypes;
var _tb_calorie = require("./tb_calorie");
var _tb_history = require("./tb_history");
var _tb_sleep = require("./tb_sleep");
var _tb_user = require("./tb_user");
var _tb_water = require("./tb_water");
var _tb_weight = require("./tb_weight");

function initModels(sequelize) {
  var tb_calorie = _tb_calorie(sequelize, DataTypes);
  var tb_history = _tb_history(sequelize, DataTypes);
  var tb_sleep = _tb_sleep(sequelize, DataTypes);
  var tb_user = _tb_user(sequelize, DataTypes);
  var tb_water = _tb_water(sequelize, DataTypes);
  var tb_weight = _tb_weight(sequelize, DataTypes);


  return {
    tb_calorie,
    tb_history,
    tb_sleep,
    tb_user,
    tb_water,
    tb_weight,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

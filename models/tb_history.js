const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_history', {
    id_history: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight_type: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    water_type: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    sleep_type: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    calorie_type: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    weight: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    height: {
      type: DataTypes.STRING(25),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tb_history',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_history" },
        ]
      },
    ]
  });
};

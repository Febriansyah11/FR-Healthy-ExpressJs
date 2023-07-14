const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_sleep', {
    id_sleep: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sleep_time: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    value: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sleep_min: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sleep_max: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    age_min: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    age_max: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tb_sleep',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_sleep" },
        ]
      },
    ]
  });
};

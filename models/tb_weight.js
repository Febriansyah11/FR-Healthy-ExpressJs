const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_weight', {
    id_weight: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    weight_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    weight_min: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    weight_max: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tb_weight',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_weight" },
        ]
      },
    ]
  });
};

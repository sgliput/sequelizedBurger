module.exports = function (sequelize, DataTypes) {
  var Burger = sequelize.define("burger", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  // Burger.associate = function (models) {
  //   Burger.belongsTo(models.Customer, {
  //     onDelete: "CASCADE",
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Burger;
};

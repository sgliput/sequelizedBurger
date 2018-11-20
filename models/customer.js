module.exports = function (sequelize, DataTypes) {
    var Customer = sequelize.define("customer", {
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      currentRank: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    Customer.associate = function(models) {
        // Associating Customer with Burgers
        // When a Customer is deleted, also delete any associated Burgers
        Customer.hasMany(models.burger, {
          onDelete: "cascade"
        });
      };
  
    return Customer;
  };
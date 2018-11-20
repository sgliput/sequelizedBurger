var db = require("../models");

module.exports = function (app) {

    app.get("/api/customers", function (req, res) {
        //Gets all customers from the customers table

        db.customer.findAll({
            include: [ db.burger ]
        })
            .then(function (dbCustomers) {
                //Displays the array of customers in index.handlebars
                res.json(dbCustomers);
                console.log(JSON.stringify(dbCustomers, null, 2));
            });

    });

    app.post("/api/customer", function (req, res) {
        //Posts a new customer with the create Sequelize method, passing it their name and rank
        db.customer.create({
            customer_name: req.body.name,
            currentRank: req.body.rank
          }).then(function (dbCustomer) {
            res.json(dbCustomer);
          });
    });

    app.put("/api/customers/:id", function (req, res) {

        //Puts an updated customer rank with the update Sequelize method, passing it the increased rank
        db.customer.update({
            currentRank: req.body.rank
          }, {
            //Identifying the right record to change with a WHERE clause and the id from the api URL
              where: {
                id: req.params.id
              }
            })
            .then(function (dbCustomer) {
                // if (result.changedRows == 0) {
                //     // If no rows were changed, then the ID must not exist, so 404
                //     return res.status(404).end();
                // } else {
                    res.json(dbCustomer);
                    res.status(200).end();
                //}
              
            });
    });

};
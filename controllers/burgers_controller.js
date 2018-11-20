var db = require("../models");

module.exports = function (app) {

    app.get("/", function (req, res) {
        //Gets all burgers with the findAll sequelize method, including related customers

        db.burger.findAll({
            include: [db.customer]
        })
            .then(function (dbBurgers) {
                //Stringifies the array of burgers in the console
                console.log(JSON.stringify(dbBurgers, null, 2));
                //Gets all customers with the findAll sequelize method, including related burgers
                db.customer.findAll({
                    include: [db.burger]
                })
                    .then(function (dbCustomers) {
                        //Combines the arrays of burgers and customers in one object
                        var toRender = {
                            burgers: dbBurgers,
                            customers: dbCustomers
                        }
                        //Renders the index.handlebars file, passing it both arrays of burgers and customers
                        res.render("index", toRender);
                        console.log(JSON.stringify(dbCustomers, null, 2));
                    });
            });

    });

    app.post("/api/burgers", function (req, res) {
        //Posts a new burger with the create sequelize method, passing it the name of the new burger,the devoured status, and the customerId of its creator
        db.burger.create({
            burger_name: req.body.name,
            devoured: false,
            customerId: req.body.customerId
        }).then(function (dbBurger) {
            res.json(dbBurger);
        });
    });

    app.put("/api/burgers/:id", function (req, res) {

        //Puts an updated burger with the update method in the burger.js model, passing it the devoured status and id condition (for the WHERE clause)
        db.burger.update({
            devoured: req.body.devoured
        }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbBurger) {
                res.json(dbBurger);
                res.status(200).end();
            });
    });

};
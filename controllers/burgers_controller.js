var db = require("../models");

module.exports = function (app) {

    app.get("/", function (req, res) {
        //Gets all burgers from the all method in the burger.js model

        db.burger.findAll({
            include: [db.customer]
        })
            .then(function (dbBurgers) {
                //Displays the array of burgers in index.handlebars
                //res.json(dbBurgers);
                //res.render("index", {burgers: dbBurgers});
                console.log(JSON.stringify(dbBurgers, null, 2));

                db.customer.findAll({
                    include: [db.burger]
                })
                    .then(function (dbCustomers) {
                        //Displays the array of customers in index.handlebars
                        //res.json(dbCustomers);
                        var toRender = {
                            burgers: dbBurgers,
                            customers: dbCustomers
                        }
                        res.render("index", toRender);
                        console.log(JSON.stringify(dbCustomers, null, 2));
                    });
            });

    });

    app.post("/api/burgers", function (req, res) {
        //Posts a new burger with the insert method in the burger.js model, passing it the name of the new burger
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
                // if (result.changedRows == 0) {
                //     // If no rows were changed, then the ID must not exist, so 404
                //     return res.status(404).end();
                // } else {
                res.json(dbBurger);
                res.status(200).end();
                //}

            });
    });

};
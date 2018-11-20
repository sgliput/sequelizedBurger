# sequelizedBurger

## Deployed Project

https://warm-brook-78752.herokuapp.com/ 

## Overview

This burger-creating app uses Node.js, an Express server, Handlebars HTML templating, and a MySQL database connected with Sequelize methods (and deployed with JawsDB for Heroku). It requires the express, express-handlebars, mysql, mysql2, and sequelize NPM packages.

Upon loading, the app displays all the burgers listed in the burgers table of the database. Those with a "devoured" value of false are displayed on the left side of the page, while those with a "devoured" value of true are displayed on the right. The name and rank of the customer who created the burger is displayed under each burger on both sides. Clicking a burger's "Devour" button will change its "devoured" status, reloading the page to display it on the right side.

There are two forms in the middle, one for creating a new customer and one for entering a new burger. The customer form requires a name and a Starfleet rank and submits them to the customers table of the database. A modal welcomes the new customer to Nerd Burger. When a particular customer has devoured three burgers, a modal also appears to congratulate them on their promotion, and their rank is increased, with the page reloading to reflect the change wherever their name and rank appear.

The burger form requires a new burger name and a customer name from a dropdown list (retrieved with a GET call to the customers table). The new burger will be added to the burgers table of the database with a default "devoured" value of false when submitted.

Before the page is reloaded, the new burger is appended to the Replicator area. To mimic the look of a _Star Trek_ replicator, it is added invisibly as a button with the CSS property display: none, and JQuery allows it to slowly fade into view. A setTimeout function then reloads the page after two seconds to add the new burger to the left side of the page.


## Structure

In keeping with the requirements of Handlebars, the front-end HTML is kept in a views folder with an index.handlebars file for the main HTML body and a layouts folder with a main.handlebars file for HTML that stays constant (just the head information in this case). The public folder contains folders for CSS, images, and front-end JavaScript, while the SQL schema (which doesn't really apply to this Sequelize project) is kept in a db folder.

The back-end code is set up using MVC architecture. PUT and POST AJAX calls in the front-end JavaScript (burgerScript.js) connect to routes in burgers_controller.js and customers_controller.js.

* The GET requests for rendering all the burgers and customers in index.handlebars use the findAll() Sequelize method.
* The POST requests for creating new customers and new burgers use the create() Sequelize method.
* The PUT requests for updating a burger's devoured status or a customer's rank use the update() Sequelize method.

The models for creating the burgers and customers tables do not allow null values, and each associates with the other. The config.json file connects to my local burgers_db SQL database when run locally and the JawsDB database when deployed through Heroku.

The app itself is run through the server.js file, using Node and employing Express and Handlebars.
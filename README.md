# sequelizedBurger

## Deployed Project



## Overview

This burger-creating app uses Node.js, an Express server, Handlebars HTML templating, and a MySQL database connected with Sequelize methods (and deployed with JawsDB for Heroku). It requires the express, express-handlebars, mysql, mysql2, and sequelize NPM packages.

Upon loading, the app displays all the burgers listed in the burgers table of the database. Those with a "devoured" value of false are displayed on the left side of the page, while those with a "devoured" value of true are displayed on the right. The name and rank of the customer who created the burger is displayed under each burger on both sides. Clicking a burger's "Devour" button will change its "devoured" status, reloading the page to display it on the right side. A form in the middle allows users to enter a new burger name and a customer name from a dropdown list (retrieved with a GET call to the customers table). The new burger will be added to the database with a default "devoured" value of false when submitted.

Before the page is reloaded, the new burger is appended to the Replicator area. To mimic the look of a _Star Trek_ replicator, it is added invisibly as a button with the CSS property display: none, and JQuery allows it to slowly fade into view. A setTimeout function then reloads the page after two seconds to add the new burger to the left side of the page.

## Structure

In keeping with the requirements of Handlebars, the front-end HTML is kept in a views folder with an index.handlebars file for the main HTML body and a layouts folder with a main.handlebars file for HTML that stays constant (just the head information in this case). The public folder contains folders for CSS, images, and front-end JavaScript, while the SQL schema is kept in a db folder, along with a sample seeds file which wasn't actually used in the deployed version.

The back-end code is set up using MVC architecture. PUT and POST AJAX calls in the front-end JavaScript (burgerScript.js) connect to routes in burgers_controller.js, which also contains the GET request for rendering all the burgers in index.handlebars. The PUT and POST requests use methods required from the burger.js model, passing them information like burger names and ids as function arguments.

In turn, the burger.js model employs methods from orm.js in the config folder, passing them arguments like the burgers table, burger names/ids, and callback functions. These ORM methods contain the actual SQL statements to access the MySQL database, including selectAll (SELECT) for the GET request, insertOne (INSERT INTO) for the POST request, and updateOne (UPDATE) for the PUT request. All of these use the connection established in the connection.js file, also found in the config folder.

The app itself is run through the server.js file, using Node and employing Express and Handlebars.
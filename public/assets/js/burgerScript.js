$(function () {
    //When a devour button is clicked
    $(document).on("click", ".devour", function () {
        var id = $(this).data("id");
        var custid = $(this).data("custid");

        //AJAX call for a PUT request (updating) includes the id for the record connected to that button, setting its devoured status to true
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: { devoured: true }
        }).then(
            function () {
                console.log("Changed status to devoured!");

                $.get("/api/customers", function (results) {
                    //Logs results of get method with pretty formatting
                    console.log("Results: " + JSON.stringify(results, null, 2));

                    var newRank;
                    //Loops through customer results
                    for (var i = 0; i < results.length; i++) {
                        //If customer ID matches the ID of the customer devouring the burger
                        if (results[i].id === custid) {
                            var burgerNum = 0;
                            //Loops through the number of burgers that customer has devoured
                            for (var j = 0; j < results[i].burgers.length; j++) {
                                if (results[i].burgers[j].devoured === true) {
                                    burgerNum++;
                                }
                            }
                            //If that customer has devoured any multiple of three burgers, they get a promotion (every three burgers, they are promoted one rank)
                            if (burgerNum % 3 === 0) {
                                switch (results[i].currentRank) {
                                    case "Cadet":
                                        newRank = "Crewman";
                                        break;
                                    case "Crewman":
                                        newRank = "Ensign";
                                        break;
                                    case "Ensign":
                                        newRank = "Lieutenant";
                                        break;
                                    case "Lieutenant":
                                        newRank = "Lieutenant Commander";
                                        break;
                                    case "Lieutenant Commander":
                                        newRank = "Commander";
                                        break;
                                    case "Commander":
                                        newRank = "Captain";
                                        break;
                                    case "Captain":
                                        newRank = "Admiral";
                                        break;
                                }
                                //Put method changes customer's rank to reflect promotion
                                $.ajax("/api/customers/" + custid, {
                                    type: "PUT",
                                    data: { rank: newRank }
                                }).then(function () {
                                    console.log("Your rank has been updated to " + newRank + "!");
                                    //Shows modal with congratulatory message and image
                                    $("#changeModal").modal("show");
                                    $(".modal-title").text("Congratulations!");
                                    $(".modal-body").html(`<p>For devouring so many burgers, you've been promoted to ${newRank}!</p>
                                    <img class="photo" src="../assets/img/laugh.jpg" alt="Congrats!" width="250px" height="250px">`);
                                    // Reload the page when the modal is closed to get the updated list and rank
                                    $(".close").on("click", function () {
                                        location.reload();
                                    });
                                });
                            } else {
                                //If the customer does not have a multiple of three burgers, the page is simply reloaded
                                location.reload();
                            }
                        }
                    }
                }).then(
                    console.log("It worked")
                );
            })
    });


    //When the new burger form is submitted
    $(".create-form").on("submit", function (event) {
        // Will not reload the page when submitted
        event.preventDefault();
        //Grabs content of burger submission fields
        var newBurger = $("#burger").val().trim();
        var burgerCreator = $("#custList").val().trim();
        console.log(burgerCreator);

        //if the newBurger input is not an empty string
        if (newBurger.length > 0) {
            //AJAX call for a POST request sends the name of the new burger and its creator
            $.ajax("/api/burgers", {
                type: "POST",
                data: {
                    name: newBurger,
                    customerId: burgerCreator
                }
            }).then(
                function () {
                    console.log("Created new burger!");
                    //Append hidden button to replicator area and fade it in over 3 seconds
                    $(".replicator").append(`<button class="replicated">${newBurger}</button>`);
                    $(".replicated").fadeIn(3000, function () {
                        // Wait two seconds, then reload the page to get the updated list
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                    });
                }
            );
        }
    });

    //When the new customer form is submitted
    $(".customer-form").on("submit", function (event) {
        // Will not reload the page when submitted
        event.preventDefault();
        //Grabs content of customer submission fields, placing them in an object
        var customerName = $("#customerName").val().trim();
        var customerRank = $("#rankList").val().trim();
        var newCustomer = {
            name: customerName,
            rank: customerRank
        };
        console.log("Name: " + customerName);
        console.log("Rank: " + customerRank);
        console.log(newCustomer);

        //If the new customer input is not an empty string
        if (customerName.length > 0) {
            //AJAX call for a POST request sends the name of the new customer to database
            $.ajax("/api/customer", {
                type: "POST",
                data: newCustomer
            }).then(
                function () {
                    console.log("Added new customer!");
                    //Shows modal with welcome message and image
                    $("#changeModal").modal("show");
                    $(".modal-title").text("You've successfully joined!");
                    $(".modal-body").html(`<p>Welcome to Nerd Burger, ${customerRank} ${customerName}!</p>
                    <img class="photo" src="../assets/img/vulcanSalute.jpg" alt="Vulcan Salute" width="250px" height="250px">`);
                    // Reload the page when the modal is closed to reflect the updated customer list
                    $(".close").on("click", function () {
                        location.reload();
                    });
                }
            );
        }
    });
});


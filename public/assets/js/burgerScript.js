$(function () {
    //When a devour button is clicked
    $(document).on("click", ".devour", function () {
        var id = $(this).data("id");

        //AJAX call for a PUT request (updating) includes the id for the record connected to that button, setting its devoured status to true
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: { devoured: true }
        }).then(
            function () {
                console.log("Changed status to devoured!");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    //When the new burger form is submitted
    $(".create-form").on("submit", function (event) {
        // Will not reload the page when submitted
        event.preventDefault();
        var newBurger = $("#burger").val().trim();
        //if the newBurger input is not an empty string
        if (newBurger.length > 0) {
            //AJAX call for a POST request sends the name of the new burger
            $.ajax("/api/burgers", {
                type: "POST",
                data: { name: newBurger }
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
});
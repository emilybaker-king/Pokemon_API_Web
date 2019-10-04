
//JQuery function to make sure no code will run until the HTML is fully loaded
$(function() {
    //When the page loads, the pokemon info card should be hidden by default
    $("#pokemonInfoCard").hide();

    //set up the event handler for when the search button is clicked
    $("#submit").click(function () {
        //get input from the search bar
        let pokemonNameOrID = $("#pokemonInput").val().toLowerCase();

        //clear the input from the search bar
        $("#pokemonInput").val("");

        //remove old info from the pokemon information
        $("#pokemonInformationList").html("");

        getPokemonInfo(pokemonNameOrID);
    });

    function determineBackgroundColor(type) {
        switch (type) {
            case "bug":
                return "#A6B51D";
            case "dark":
                return "#4D392C";
            case "dragon":
                return "#735CDB";
            case "electric":
                return "#FCBB17";
            case "fairy":
                return "#EFA8EF";
            case "fighting":
                return "#7E321B";
            case "fire":
                return "#EA3E0D";
            case "flying":
                return "#9DAEF7";
            case "ghost":
                return "#5F5FB2";
            case "grass":
                return "#72C235";
            case "ground":
                return "#D1B055";
            case "ice":
                return "#6DD3F5";
            case "normal":
                return "#B8B1A6";
            case "poison":
                return "#924593";
            case "psychic":
                return "#EA457E";
            case "rock":
                return "#A68E44";
            case "steel":
                return "#B3B3C2";
            case "water":
                return "#2079D2";
            default:
                return "#000";
        }
    }

    //function to retrieve information about a pokemon from the API
    function getPokemonInfo(nameOrID) {
        //we need a way to asynchronously handle making the API call and doing stuff when we get a response since we don't know how long it will take to get a response.

        //if we tried to write synchronous code (code that runs one line after another) this couls cause problems if we try to pull information from the API response before we get it back.

        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + nameOrID,
            type: "GET",
            //the function we pass in here will be called if our request is successful
            success: function(result) {
                //pulling the pokeons name from the JSON result we get
                let name = result.name;

                //get the sprite like for the pokemon
                let spriteLink = result.sprites.front_default;

                //get the pokemons id
                let id = result.id;

                //get pokemons weight
                let weight = result.weight;

                //get the types that the pokemon has
                let types = result.types;

                $("#pokemonName").html(name.toUpperCase());
                $("#pokemonImage").attr("src", spriteLink);
                $("#pokemonInformationList").append("<li class='list-group-item'>ID: " + id + "</li>");
                $("#pokemonInformationList").append("<li class='list-group-item'>Weight: " + weight + "</li>");

                for (type of types) {
                    //for each type we need to create a new list item, configure it, and append it to our list of pokemon information
                    let li = document.createElement("li");
                    li.classList.add("list-group-item");
                    li.classList.add("text-capitalize");
                    li.innerHTML = type.type.name;
                    li.style.backgroundColor = determineBackgroundColor(type.type.name);

                    $("#pokemonInformationList").append(li);
                }

                //make a card reappear once we're done
                $("#pokemonInfoCard").show();
            },
            //the function we pass in here will be called if our request fails
            error: function(error) {
                console.log(error);
            },
        });
    }
});
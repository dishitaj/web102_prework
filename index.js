/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    for (let i = 0; i < games.length; i ++){
        // create a new div element, which will become the game card
        let div = document.createElement('div'); //displays info about game
        
        // add the class game-card to the list
        div.classList.add('game-card'); //adds class to given element
        div.classList.add('game-img');

        // set the inner HTML using a template literal to display some info about each game
        div.innerHTML = (`<img src="${games[i]["img"]}" alt = "Game image" class='game-img'>
                        <h3>Let\'s Play ${games[i]["name"]}</h3>
                        <p>${games[i]["description"]}</p>`)

        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        
        // append the game to the games-container
        gamesContainer.appendChild(div)
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
let div = document.createElement('div'); 
// use reduce() to count the number of total contributions by summing the backers
const total_contributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game["backers"]
} , 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
div.innerHTML = (`<p>${total_contributions.toLocaleString('en-US')}</p>`)    
contributionsCard.appendChild(div)



// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
let div2 = document.createElement('div'); 
// use reduce() to count the number of total contributions by summing the backers
const raised = GAMES_JSON.reduce( (acc, game) => {
    return acc + game["pledged"]
} , 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
div2.innerHTML = (`<p>$${raised.toLocaleString('en-US')}</p>`)    
raisedCard.appendChild(div2)


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let div3 = document.createElement('div'); 
const num_games = GAMES_JSON.reduce( (acc, game) => {
    return acc + 1
} , 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
div3.innerHTML = (`<p>${num_games.toLocaleString('en-US')}</p>`)    
gamesCard.appendChild(div3)

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listOfUnfunded = GAMES_JSON.filter ( (game) => {
        return game["pledged"] < game["goal"];
    });
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfunded)
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listOfFunded = GAMES_JSON.filter ( (game) => {
        return game["pledged"] >= game["goal"];
    });
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfFunded)

    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    // add all games from the JSON data to the DOM
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON)
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly)
fundedBtn.addEventListener("click", filterFundedOnly)
allBtn.addEventListener("click", showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedGames = GAMES_JSON.filter ( (game) => {
    return game["pledged"] < game["goal"];
});
const num_unfunded_games = unfundedGames.reduce( (acc, game) => {
    return acc + 1
} , 0);

// create a string that explains the number of unfunded games using the ternary operator
let div4 = document.createElement('div4')
div4.innerHTML = (`<p>A total of $${raised.toLocaleString('en-US')} has been raised for ${num_games} games. Currently, ${num_unfunded_games} game${num_unfunded_games == 1 ? "" : "s"} remains unfunded. We need your help to fund these amazing games!</p>`)
// create a new DOM element containing the template string and append it to the description container
descriptionContainer.appendChild(div4)


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
// create a new element to hold the name of the top pledge game, then append it to the correct element
// do the same for the runner up item
let [firstGameName, secondGameName] = sortedGames;
let div5 = document.createElement('div')
let div6 = document.createElement('div')
div5.innerHTML = (`${firstGameName.name}`)
div6.innerHTML = (`${secondGameName.name}`)
firstGameContainer.appendChild(div5)
secondGameContainer.appendChild(div6)

/************************************************************************************
 * Optional Additions: Select & display the least funded game
 */

const lowestGameContainer = document.getElementById("last-game");
let lastGame = sortedGames[sortedGames.length - 1];
let div7 = document.createElement('div');
div7.innerHTML = `${lastGame.name}`;
lowestGameContainer.appendChild(div7);
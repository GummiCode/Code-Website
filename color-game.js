var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay= document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

// Initialisation

function init() {
    //Set up mode button event listeners
    setUpModeButtons();
    //Set up square event listeners
    setUpSquares();
    //Run Reset to pick initial colors, pick a nwinning color & update the page with these values
    reset();
}

// End Initialisation ------------------------------------------------

// Event Listener Functions

function setUpSquares() {
        //Color square event listeners
        for (var i = 0; i < squares.length; i++) {
        
            //add click listeners to squares
            squares[i].addEventListener("click", function() {
        
                //grab color of cliked square
                var clickedColor = this.style.backgroundColor;
        
                //compare color to picked color
                if (clickedColor === pickedColor) {
                    messageDisplay.textContent = "Correct!";
                    resetButton.textContent = "Play Again?";
                    changeColors(pickedColor);
                    h1.style.backgroundColor = clickedColor;
                } else {
                    this.style.backgroundColor = "#232323";
                    messageDisplay.textContent = "Try Again";
                };
            });
        }
    
};

function setUpModeButtons() {
    //set up Mode button event listeners
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            //Remove Selected class form all buttons, then Select only 'this' button
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            this.classList.add("selected")
            //Determine the number of squares to show
            if (this.textContent === "Easy"){
                numSquares = 3;
            } else if (this.textContent === "Hard"){
                numSquares = 6;
            } else {
                numSquares = 12;
            };
             //Run Reset to pick new colors, pick a new winning color, update the page with these changes & reset the menu
            reset();
        });
    }
};

resetButton.addEventListener("click", function() {
    reset()
});

// End Event Listener Functions -------------------------------------------

// Reset Function

function reset() {
    //generate new colors;
    colors = generateRandomColors(numSquares);
    //pick a new random color
    pickedColor = pickColor();
    //change colorDisplay to match the picked color
    colorDisplay.textContent = pickedColor;
    //reset the 'New Colors/Play Again?' button;
    resetButton.textContent = "New Colors";
    //Clear the 'Correct!/Try Again' text;
    messageDisplay.textContent = "";
    //reset the header color;
    h1.style.backgroundColor = "steelblue";
    //change the colors of the squares
    for (var i = 0; i < squares.length; i++) {
        if(colors[i]){
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        };
    };
};

// End Reset Function -----------------------------------------------------

// Color Selection & Display Functions

function changeColors(color){
    //loop through all squares, change each square's color to match one from the colors array
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    };
};

function pickColor(){
    //picks the winning color from those in the colors array
    var random = Math.floor(Math.random()*colors.length);
    return colors[random];
};

function generateRandomColors(num) {
    //generates and returns an array containing a specified number of random colors
    //create an empty array
    var arr = [];
    //add num random colors to array
    for (var i=0; i<num; i++) {
        //get a random colour and push it into the array
        arr.push(randomColor());
    };
    // return that array at the end.
    return arr;
};

function randomColor(){
    //generates a random rgb color as a string
    //pick a "red" from 0 to 255;
    var r = Math.floor(Math.random() * 256);
    //pick a blue;
    var g = Math.floor(Math.random() * 256);
    //pick a green;
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
};

// End Color Selection & Display Functions ----------------------------------

// ~end~
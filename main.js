const inquirer = require("inquirer");
const basic = require("./basic.json");
const cloze = require("./cloze.json");

let score = 0;
let count = 0;
let mode;

//user picks if they want to play with basic or cloze cards
function newGame() {
    inquirer.prompt([{
        type: "list",
        message: "Choose flashcard type",
        choices: ["Basic", "Cloze", ">Exit"],
        name: "input"
    }]).then(function(response) {
        if (response.input === "Basic") {
            mode = "basic";
            basicPrompt();
        } else if (response.input === "Cloze") {
            mode = "cloze"
            clozePrompt();
        } else {
            console.log("Goodbye.");
        };
    });
};

newGame();

//tally final score, prompt play again?
function done() {
    if (mode === "basic") {
        var length = basic.length;
    } else {
        var length = cloze.length;
    }
    console.log("");
    console.log("=====================");
    console.log("All done.");
    console.log("Correct Answers:" + score);
    console.log("Inorrect Answers:" + (length - score));
    console.log("=====================");
    console.log("");

    inquirer.prompt([{
        type: "list",
        message: "Play again?",
        choices: ["Yes", "No"],
        name: "input"
    }]).then(function(response) {
        if (response.input === "Yes") {
            score = 0;
            count = 0;
            newGame();
        } else {
            console.log("Thanks for playing.");
        };
    });
};

//constructors. pass in required jsons array indexes
class card {
    constructor(card) {
        this.front = card.front;
        this.back = card.back;
    }
};

class clozeCard extends card {
    constructor(card) {
        super(card);
        this.cloze = card.cloze;
        this.partial = card.front.split(this.cloze).join("..."); // replace all instances
    }
};

//recursive inquirer for basic flashcards
function basicPrompt() {
    if (count < basic.length) {
        let flashcard = new card(basic[count]);
        inquirer.prompt([{
            name: "input",
            message: flashcard.front
        }]).then(function(response) {
            if (response.input.toLowerCase() === flashcard.back) {
                score++;
                console.log("Correct");
                console.log("Score: " + score);
            } else {
                console.log("Incorrect");
                console.log("Correct Answer: " + flashcard.back);
                console.log("Score: " + score);
            };

            count++;
            basicPrompt();
        });
    } else {
        done();
    };
};

//recursive for cloze
function clozePrompt() {
    if (count < cloze.length) {
        let flashcard = new clozeCard(cloze[count]);
        inquirer.prompt([{
            name: "input",
            message: flashcard.partial
        }]).then(function(response) {
            if (response.input.toLowerCase() === flashcard.cloze.toLowerCase()) {
                score++;
                console.log("Correct");
                console.log("Score: " + score);
            } else {
                console.log("Incorrect");
                console.log("Correct Answer: " + flashcard.front);
                console.log("Score: " + score);
            };

            count++;
            clozePrompt();
        });
    } else {
        done();
    };
};
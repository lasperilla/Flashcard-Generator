var inquirer = require("inquirer");
var basic = require("./basic.json");
var cloze = require("./cloze.json");

var score = 0;
var count = 0;
var mode;

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
    	name: "userInput"
    }]).then(function(answers){
    	if (answers.userInput === "Yes") {
    		score = 0;
    		count = 0;
    		newGame();
    	} else {
    		console.log("Thanks for playing.")
    	};
    })
}

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
        this.partial = card.front.replace(this.cloze, "...")
    }
}

function basicPrompt() {
    if (count < basic.length) {
        var flashcard = new card(basic[count]);
        inquirer.prompt([{
            name: "userInput",
            message: flashcard.front
        }]).then(function(answers) {
            if (answers.userInput.toLowerCase() === flashcard.back) {
                score++;
                console.log("Correct");
                console.log("Score: " + score);
            } else {
                console.log("Incorrect");
                console.log("Correct Answer: " + flashcard.back)
                console.log("Score: " + score);
            };

            count++;
            basicPrompt();
        });
    } else {
        done();
    };
};

function clozePrompt() {
    if (count < cloze.length) {
        var flashcard = new clozeCard(cloze[count]);
        inquirer.prompt([{
            name: "userInput",
            message: flashcard.partial
        }]).then(function(answers) {
            if (answers.userInput.toLowerCase() === flashcard.cloze.toLowerCase()) {
                score++;
                console.log("Correct");
                console.log("Score: " + score);
            } else {
                console.log("Incorrect");
                console.log("Correct Answer: " + flashcard.front)
                console.log("Score: " + score);
            };

            count++;
            clozePrompt();
        });
    } else {
        done();
    };
};

function newGame() {
    inquirer.prompt([{
        type: "list",
        message: "Choose flashcard type",
        choices: ["Basic", "Cloze", ">Exit"],
        name: "userChoice"
    }]).then(function(answers) {
        if(answers.userChoice === "Basic") {
            mode = "basic";
            basicPrompt();
        } else if(answers.userChoice === "Cloze") {
            mode = "cloze"
            clozePrompt();
        } else {
        	console.log("Goodbye.");
        };
    });
};

newGame();

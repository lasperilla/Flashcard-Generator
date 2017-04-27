var inquirer = require("inquirer");
var basic = require("./basic.json");
var cloze = require("./cloze.json");

var score = 0;

class card {
    constructor(basic) {
        this.front = basic.front;
        this.back = basic.back;
    }
    prompt() {
    		var that = this;
        inquirer.prompt([{
            name: "userInput",
            message: this.front
        }]).then(function(answers) {
            this.checkAnswers(answers);
        });
    }
    checkAnswers(answers) {
        if (answers.userInput.toLowerCase() === that.back) {
            score++;
            console.log("Correct");
            console.log("Score: " + score);
        } else {
            console.log("Incorrect");
            console.log("Score: " + score);
        }
    }
};

// console.log(basic[0].back);

// for (var i = 0; i < basic.length; i++) {
//     var flashcard = new card(basic[i]);
//     // console.log (flashcard);
//     flashcard.prompt();
// }; //end for loop

basic.forEach(function(element){
	  var flashcard = new card(element);
    flashcard.prompt();
   // console.log(flashcard)
});
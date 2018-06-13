//The quiz has 10 questions
var numQ = 10;
//Each question with answer choices is an object in this array
var allQuestions = [{
    question: "Q1. What is Hermione Granger's middle name?",
    answerChoices: ["Jan", "Joan", "Jane", "Jenee"],
    answer: 3
}, {
    question: "Q2. How many children did Arthur and Molly Weasley have?",
    answerChoices: ["4", "5", "7", "8"],
    answer: 3
}, {
    question: "Q3. What spell did Hermione use to fix Harry’s glasses?",
    answerChoices: ["Brackium Emendo", "Oculus Reparo", "Petrificus Totalus", "Revelio"],
    answer: 2
}, {
    question: "Q4. Ron Weasley's patronus takes the form of what dog breed?",
    answerChoices: ["Jack Russell Terrier", "Golden Retriever", "Labrador Retriever", "Border Collie"],
    answer: 1
}, {
    question: "Q5. The opal necklace found in Hogsmeade cursed which student?",
    answerChoices: ["Angelina Johnson", "Lavender Brown", "Hermione Granger", "Katie Bell"],
    answer: 4
}, {
    question: "Q6. Which Quidditch team did Viktor Krum play for?",
    answerChoices: ["Bolivia", "Russia", "Bulgaria", "Belarus"],
    answer: 3
}, {
    question: "Q7. What is the first address of the Order of the Phoenix headquarters?",
    answerChoices: ["4 Privet Drive", "12 Grimmauld Place", "14 Godric's Hollow", "3 Spinner's End"],
    answer: 2
}, {
    question: "Q8. Which potion is used to make victims tell the truth?",
    answerChoices: ["Amorentia", "Polyjuice Potion", "Felix Felicis", "Veritiserum"],
    answer: 4
}, {
    question: "Q9. What plant does Neville Longbottom give to Harry to help him breathe underwater?",
    answerChoices: ["Bubotuber", "Gillyweed", "Mandrake Root", "Aconite"],
    answer: 2
}, {
    question: "Q10. What are the last words of the Harry Potter book series?",
    answerChoices: ["Always.", "All's well that ends well.", "All was well.", "After all this time."],
    answer: 3
}];

var verbalResponse = {
    //If the user is correct
    correct: "Brilliant! That is correct!",
    //If the user is incorrect
    incorrect: "Not quite right! The correct answer was... ",
    //If the user run's out of time
    timeOut: "You ran out of time! The correct answer was... ",
    //If the user finishes the quiz
    quizDone: "Let's see how many magical facts you knew!"
}


//Display the correct answer as a string
var correctAnswer;

var gifList = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"];
/*var answers = new Array(10);
    answers[0] = "Jane";
    answers[1] = "7";
    answers[2] = "Oculus Reparo"
    answers[3] = "Jack Russell Terrier"
    answers[4] = "Katie Bell"
    answers[5] = "Bulgaria"
    answers[6] = "12 Grimmauld Place"
    answers[7] = "Veritaserum"
    answers[8] = "gillyweed"
    answers[9] = "All was well."*/

var i = 0;
var j;

//DO NOT name buttons using "start"
//Clicking the start button will hide the start button and reset the game
$("#gameBegin").click(function() {
   $(this).hide();  
    reset();
    });

function reset(){
    //Q1 is displayed with its answer choices 

    //submit button is displayed
    //loop is reset
    //the divs for answered questions is empty
 
    //$("#finalResponse").empty();
    NextQuestion();
}

//question displays in rowQuestion as string
//answerChoices displays in rowAnswers as radio button values and strings


//The user has 30 seconds to answer each question.
function timer(){
    seconds = 30;
    $("timeLeft").html("Time Left: " + seconds);
    intervalId = setInterval(displayTimer, 1000);
}

//display the timer and react if time runs out
function displayTimer(){
    $("#timeLeft").html("Time Left: " + seconds);
    if(seconds < 1) {
        //clear the interval timer round
        clearInterval(intervalId);
        //The question is marked as unanswered
        answered = false;
        //activate answer page
        answerPage();
    }
}

function nextQuestion(){
   
    console.log(allQuestions.length);
    $(".rowQuestion").html(allQuestions[0].question);
        console.log("Question: " + allQuestions[0].question);
    //$(".rowAnswers").html(allQuestions[i].answerChoices);
        console.log("Answer Choices: " + allQuestions[i].answerChoices);
    $(".rowAnswers #zero").append("<input name='radioAns' type='radio'>" + allQuestions[i].answerChoices[0] + "</input>");
    $(".rowAnswers #one").append("<input name='radioAns' type='radio'>" + allQuestions[i].answerChoices[1] + "</input>");
    $(".rowAnswers #two").append("<input name='radioAns' type='radio'>" + allQuestions[i].answerChoices[2] + "</input>");
    $(".rowAnswers #three").append("<input name='radioAns' type='radio'>" + allQuestions[i].answerChoices[3] + "</input>");

    
        //for(j=0; j < allQuestions.length, j++) {
             
        //}
}
nextQuestion();

function answerPage(){

}

function finalScore(){

}



//The answer pages will only display for five seconds.


//Then it will bring the user to the nest question.
//When the user answers correctly, bring the user to the correct answer display page.
//When the user answers incorrectly, bring the user to the incorrect answer display page.
//If the user submits no answer, bring the user to the incorrect answer display page.
//When the user runs out of time, bring the user to the outof time answer display page.
//Q10 answer display page will bring the user to the score page after 5 seconds.
//The score page says "Here is how you did." Might insert HP saying. List Correct Ans: #, IA: #, Unanswered: #.
//Start Over button. Does not reload the page, but resets the game.

/*var timerEnd = 30000;

    setTimeout(function timer() {
        window.location.href="index4.html";

    }
})*/
    

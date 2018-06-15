$(document).ready(function(){

var numQ = 0;

var questions = new Array();
    questions[0] = "Q1. What is Hermione Granger's middle name?";
    questions[1] = "Q2. How many children did Arthur and Molly Weasley have?";
    questions[2] = "Q3. What spell did Hermione use to fix Harry’s glasses?";
    questions[3] = "Q4. Ron Weasley's patronus takes the form of what dog breed?";
    questions[4] = "Q5. The opal necklace found in Hogsmeade cursed which student?";
    questions[5] = "Q6. Which Quidditch team did Viktor Krum play for?";
    questions[6] = "Q7. What is the first address of the Order of the Phoenix headquarters?";
    questions[7] = "Q8. Which potion is used to make victims tell the truth?";
    questions[8] = "Q9. What plant does Neville Longbottom give to Harry to help him breathe underwater?";
    questions[9] = "Q10. What are the last words of the Harry Potter book series?";

var answerChoices = new Array();
    answerChoices[0] = ["Jan", "Joan", "Jane", "Jenee"];
    answerChoices[1] = ["4", "5", "7", "8"];
    answerChoices[2] = ["Brackium Emendo", "Oculus Reparo", "Petrificus Totalus", "Revelio"];
    answerChoices[3] = ["Jack Russell Terrier", "Golden Retriever", "Labrador Retriever", "Border Collie"];
    answerChoices[4] = ["Angelina Johnson", "Lavender Brown", "Hermione Granger", "Katie Bell"];
    answerChoices[5] = ["Bolivia", "Russia", "Bulgaria", "Belarus"];
    answerChoices[6] = ["4 Privet Drive", "12 Grimmauld Place", "14 Godric's Hollow", "3 Spinner's End"];
    answerChoices[7] = ["Amorentia", "Polyjuice Potion", "Felix Felicis", "Veritaserum"];
    answerChoices[8] = ["Bubotuber", "Gillyweed", "Mandrake Root", "Aconite"];
    answerChoices[9] = ["Always.", "All's well that ends well.", "All was well.", "After all this time."];

var correctAnswer = new Array();
    correctAnswer[0] = "Jane";
    correctAnswer[1] = "7";
    correctAnswer[2] = "Oculus Reparo";
    correctAnswer[3] = "Jack Russell Terrier";
    correctAnswer[4] = "Katie Bell";
    correctAnswer[5] = "Bulgaria";
    correctAnswer[6] = "12 Grimmauld Place";
    correctAnswer[7] = "Veritaserum";
    correctAnswer[8] = "Gillyweed";
    correctAnswer[9] = "All was well.";

var gifArray = [
    "assets/images/q1.gif",
    "assets/images/q2.gif",
    "assets/images/q3.gif",
    "assets/images/q4.gif",
    "assets/images/q5.gif",
    "assets/images/q6.gif",
    "assets/images/q7.gif",
    "assets/images/q8.gif",
    "assets/images/q9.gif",
    "assets/images/q10.gif"
];

var verbalResponse = new Array();
    //Responses for when the user is correct, incorrect, didn't answer in time, or finishes the quiz.
    verbalResponse[0] = "Brilliant! That is correct!";
    verbalResponse[1] = "Not quite right! The correct answer was... ";
    verbalResponse[2] = "You ran out of time! The correct answer was... ";
    verbalResponse[3] = "Let's see how many magical facts you knew!";

var intervalId;
var timeAllotted = 30;
var questionTimer; //The user has 30 seconds to answer each question.
var responseTimer = 5; //The user has 5 seconds to view the correct answer.
//Display the correct answer as a string
var i = 0;
var j;
var correctAnswer;
var userGuess;
//Variables for the finalScore 
var userCorrect = 0;
var userIncorrect = 0;
var userUnanswered = 0;

function intro(){
    //Show intro page
    $("#introPage").show();
    //Hide all question page divs, submit button, and final results page
    $("#timeLeft").attr("style", "display: none");
    $("#rowQuestion").attr("style", "display: none");
    $("#rowAnswers").attr("style", "display: none");
    $("#finalScorePage").attr("style", "display: none");
    userCorrect = 0;
    userIncorrect = 0;
    userUnanswered = 0;
    $("#gameBegin").click(function(){
        $(this).attr("style", "display: none");
        nextQuestion();
        showTimer();
    });
};
intro();

function nextQuestion(){
    //Hide divs
    $("#introPage").attr("style", "display: none");
    $("#responsePage").attr("style", "display: none");
    $("#verbalResponse").attr("style", "display: none");
    $("#correctAnswer").attr("style", "display: none");
    $("#gif").html(gifArray[i]).attr("style", "display: none");
    //Display questions and answers
    $("#timeLeft").attr("style", "display: block");
    $(".rowQuestion").html("<h2>" + questions[i] + "</h2>");
        //answerChoices displays in rowAnswers as radio button values and strings
        $(".rowAnswers #zero").html("<input name='radioAns' type='radio' value=" + answerChoices[i][0] + ">" + answerChoices[i][0] + "</input>");
        $(".rowAnswers #one").html("<input name='radioAns' type='radio' value=" + answerChoices[i][1] + ">" + answerChoices[i][1] + "</input>");
        $(".rowAnswers #two").html("<input name='radioAns' type='radio' value=" + answerChoices[i][2] + ">" + answerChoices[i][2] + "</input>");
        $(".rowAnswers #three").html("<input name='radioAns' type='radio' value=" + answerChoices[i][3] + ">" + answerChoices[i][3] + "</input>");
        //Console log data 
        console.log("Question: " + questions[i]);
        console.log("Answers: " + answerChoices[i]);
        console.log("Correct: " + userCorrect);
        console.log("Incorrect: " + userIncorrect);
        console.log("Unanswered: " + userUnanswered);
}

//Each radio button has an onclick response
$(".rowAnswers").on("click", "li", function(){
    userGuess = $(this).text();
if (userGuess === correctAnswer[i]){
    correct();
} else {
    incorrect();
}
});

function showTimer(){
    intervalId = setInterval(questionTimer, 1000);
    function questionTimer() {
        if (timeAllotted === 0){
            clearInterval(intervalId);
            unanswered();
        }
        if (timeAllotted > 0) {
            timeAllotted--;
        }
        $("#timeLeft").html("Time Left: " + timeAllotted);
    }
}

function questionCount(){
    if (numQ < 10){
        numQ++;
        i++;
        nextQuestion();
        timeAllotted = 30;
        showTimer();
    } else {
        finalScore();
    }
}
        
function correct(){
    userCorrect++;
    //Timing
    clearInterval(intervalId);
    setTimeout(questionCount, responseTimer*1000);
    //Display
    $("#verbalResponse").html(verbalResponse[0]);
    $("#correctAnswer").html(correctAnswer[i]);
    $("#gif").html("<img src='" + gifArray[i] + "'>");
    //Hide other divs
    $("#introPage").attr("style", "display: none");
    $("#rowQuestion").attr("style", "display: none");
    $("#rowAnswers").attr("style", "display: none");
    $("#finalScorePage").attr("style", "display: none");
}

function incorrect() {
    userIncorrect++;
    //Timing
    clearInterval(intervalId);
    setTimeout(questionCount, responseTimer*1000);
    //Display
    $("#verbalResponse").html(verbalResponse[1]);
    $("#correctAnswer").html(correctAnswer[i]);
    $("#gif").html("<img src='" + gifArray[i] + "'>");
    //Hide other divs
    $("#introPage").attr("style", "display: none");
    $("#rowQuestion").attr("style", "display: none");
    $("#rowAnswers").attr("style", "display: none");
    $("#finalScorePage").attr("style", "display: none"); 
}

function unanswered(){
    userUnanswered++;
    //Timing
    clearInterval(intervalId);
    setTimeout(questionCount, responseTimer*1000);
    //Display
    $("#verbalResponse").html(verbalResponse[2]);
    $("#correctAnswer").html(correctAnswer[i]);
    $("#gif").html("<img src='" + gifArray[i] + "'>");
    //Hide other divs
    $("#introPage").attr("style", "display: none");
    $("#rowQuestion").attr("style", "display: none");
    $("#rowAnswers").attr("style", "display: none");
    $("#finalScorePage").attr("style", "display: none"); 
}

function finalScore(){
    clearInterval(intervalId);
    //Hide intro page and question page divs
    $("#introPage").attr("style", "display: none");
    $("#timeLeft").attr("style", "display: none");
    $("#rowQuestion").attr("style", "display: none");
    $("#rowAnswers").attr("style", "display: none");
    //Displays
    $("#finalResponse").html(verbalResponse[3] + "<br>" + praise);
    var praise = "Bloody Hell! It's time to hit the books! You've earned the rank of MUGGLE!";
        if (userCorrect >= 9) {
            praise = "Merlin's Beard! You've achieved the rank of HEADMASTER!";
        } else if (userCorrect > 7) {
            praise = "Wicked! You've achieved the rank of HEAD BOY or HEAD GIRL!";
        } else if (userCorrect > 6) {
            praise = "Bloody Brilliant! You've earned the rank of PREFECT!";
        } else if (userCorrect > 4) {
            praise = "Bloody Hell! You've earned the rank of SQUIB! Keep reading!";
        } 
    $("#userCorrect").html("Correct: " + userCorrect);
    $("#userIncorrect").html("Incorrect: " + userIncorrect);
    $("#userUnanswered").html("Unanswered: " + userUnanswered);
    $("#startOver").html("<button id='startOverBtn'>Start Over?</button>");
    $("#startOverBtn").on("click", intro);
}
});



/* 
var allQuestions = [{
    question: "Q1. What is Hermione Granger's middle name?",
    answerChoices: ["Jan", "Joan", "Jane", "Jenee"],
    answer: 3,
    image: "assets/images/q1.gif"
}, {
    question: "Q2. How many children did Arthur and Molly Weasley have?",
    answerChoices: ["4", "5", "7", "8"],
    answer: 3,
    image: "assets/images/q2.gif"
}, {
    question: "Q3. What spell did Hermione use to fix Harry’s glasses?",
    answerChoices: ["Brackium Emendo", "Oculus Reparo", "Petrificus Totalus", "Revelio"],
    answer: 2,
    image: "assets/images/q3.gif"
}, {
    question: "Q4. Ron Weasley's patronus takes the form of what dog breed?",
    answerChoices: ["Jack Russell Terrier", "Golden Retriever", "Labrador Retriever", "Border Collie"],
    answer: 1,
    image: "assets/images/q4.gif"
}, {
    question: "Q5. The opal necklace found in Hogsmeade cursed which student?",
    answerChoices: ["Angelina Johnson", "Lavender Brown", "Hermione Granger", "Katie Bell"],
    answer: 4,
    image: "assets/images/q5.gif"
}, {
    question: "Q6. Which Quidditch team did Viktor Krum play for?",
    answerChoices: ["Bolivia", "Russia", "Bulgaria", "Belarus"],
    answer: 3,
    image: "assets/images/q6.gif"
}, {
    question: "Q7. What is the first address of the Order of the Phoenix headquarters?",
    answerChoices: ["4 Privet Drive", "12 Grimmauld Place", "14 Godric's Hollow", "3 Spinner's End"],
    answer: 2,
    image: "assets/images/q7.gif"
}, {
    question: "Q8. Which potion is used to make victims tell the truth?",
    answerChoices: ["Amorentia", "Polyjuice Potion", "Felix Felicis", "Veritiserum"],
    answer: 4,
    image: "assets/images/q8.gif"
}, {
    question: "Q9. What plant does Neville Longbottom give to Harry to help him breathe underwater?",
    answerChoices: ["Bubotuber", "Gillyweed", "Mandrake Root", "Aconite"],
    answer: 2,
    image: "assets/images/q9.gif"
}, {
    question: "Q10. What are the last words of the Harry Potter book series?",
    answerChoices: ["Always.", "All's well that ends well.", "All was well.", "After all this time."],
    answer: 3,
    image: "assets/images/q10.gif"
}];
*/

/*
function userGuess(){
    for(var i = 0; i <= 3; i++){
        var ans = allQuestions[i].answer
            console.log(ans);
        for(var j = 0; j < 4; j++) {
        var radio = document.getElementsByName("radioAns")[j];

            console.log(radios)
        if(radio.checked) {
            var num = j + 1;
            console.log(j + 1);
            console.log(num === ans);
        } 
        }
    }
}

    $(".rowBtn").attr("style", "display: block");
    $("#submitBtn").click(function(){
        userGuess();
    });
*/
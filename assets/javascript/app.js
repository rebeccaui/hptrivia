$(document).ready(function(){

var numQ = 0;

var questions = [
    "Q1. What is Hermione Granger's middle name?",
    "Q2. How many children did Arthur and Molly Weasley have?",
    "Q3. What spell did Hermione use to fix Harry’s glasses?",
    "Q4. Ron Weasley's patronus takes the form of what dog breed?",
    "Q5. The opal necklace found in Hogsmeade cursed which student?",
    "Q6. Which Quidditch team did Viktor Krum play for?",
    "Q7. What is the first address of the Order of the Phoenix headquarters?",
    "Q8. Which potion is used to make victims tell the truth?",
    "Q9. What plant does Neville Longbottom give to Harry to help him breathe underwater?",
    "Q10. What are the last words of the Harry Potter book series?"
];

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

var correctAnswer = [
    "Jane",
    "7",
    "Oculus Reparo",
    "Jack Russell Terrier",
    "Katie Bell",
    "Bulgaria",
    "12 Grimmauld Place",
    "Veritaserum",
    "Gillyweed",
    "All was well."
];

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

var verbalResponse = [
    //Responses for when the user is correct, incorrect, didn't answer in time, or finishes the quiz.
    "Brilliant! That is correct!",
    "Not quite right! The correct answer was... ",
    "You ran out of time! The correct answer was... ",
    "Let's see how many magical facts you knew!"
];
//Timer variables
var intervalId;
var timeAllotted = 30; //The user has 30 seconds to answer each question.
var questionTimer; 
var responseTimer = 5; //The user has 5 seconds to view the correct answer.
var i = 0;
var j;
//Answer-related variables
var correctAnswer;
var userGuess;
var praise;
var userCorrect = 0;
var userIncorrect = 0;
var userUnanswered = 0;

function intro(){
    //Show intro page
    $("#introPage").show();
    //Hide all question page divs, submit button, and final results page
    $("#timeLeft").attr("style", "display: none");
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
    $("#verbalResponse").attr("style", "display: none");
    $("#correctAnswer").attr("style", "display: none");
    $("#gif").attr("style", "display: none");
    $("#finalResponse").attr("style", "display: none");
    $("#praise").attr("style", "display: none");
    $("#userCorrect").attr("style", "display: none");
    $("#userIncorrect").attr("style", "display: none");
    $("#userUnanswered").attr("style", "display: none");
    //Display questions and answers
    $("#timeLeft").attr("style", "display: block").show();
    $(".rowQuestion").html("<h2>" + questions[i] + "</h2>").show();
        //answerChoices displays in rowAnswers as radio button values and strings
        $(".rowAnswers").show();
        $(".rowAnswers #zero").html("<input name='radioAns' type='radio' value=" + answerChoices[i][0] + ">" + answerChoices[i][0] + "</input>").show();
        $(".rowAnswers #one").html("<input name='radioAns' type='radio' value=" + answerChoices[i][1] + ">" + answerChoices[i][1] + "</input>").show();
        $(".rowAnswers #two").html("<input name='radioAns' type='radio' value=" + answerChoices[i][2] + ">" + answerChoices[i][2] + "</input>").show();
        $(".rowAnswers #three").html("<input name='radioAns' type='radio' value=" + answerChoices[i][3] + ">" + answerChoices[i][3] + "</input>").show();        
        //Console log data 
        console.log(numQ);
        console.log("Question: " + questions[i]);
        console.log("Answers: " + answerChoices[i]);
        console.log("Correct: " + userCorrect);
        console.log("Incorrect: " + userIncorrect);
        console.log("Unanswered: " + userUnanswered);
    }

//Each radio button has an onclick response
$(".rowAnswers").on("click", "li", function(){
    numQ++;
    userGuess = $(this).text();
    //User's answer is checked for correctness
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
    if (numQ < questions.length){
        i++;
        timeAllotted = 30;
        showTimer();
        nextQuestion();
    } else if (numQ === questions.length) {
        finalScore();
    }
}
        
function correct(){
    userCorrect++;
    //Timing
    clearInterval(intervalId);
    //Display
    $("#verbalResponse").html(verbalResponse[0]).show();
    $("#correctAnswer").html(correctAnswer[i]).show();
    $("#gif").html("<img src='" + gifArray[i] + "'>").show();
    //Hide other divs
    $("#timeLeft").hide();
    $(".rowQuestion").hide();
    $(".rowAnswers").hide();
    setTimeout(questionCount, responseTimer*1000);
}

function incorrect() {
    userIncorrect++;
    //Timing
    clearInterval(intervalId);
    //Display
    $("#verbalResponse").html(verbalResponse[1]).show();
    $("#correctAnswer").html(correctAnswer[i]).show();
    $("#gif").html("<img src='" + gifArray[i] + "'>").show();
    //Hide other divs
    $("#timeLeft").hide();
    $(".rowQuestion").hide();
    $(".rowAnswers").hide();
    setTimeout(questionCount, responseTimer*1000);
}

function unanswered(){
    userUnanswered++;
    numQ++;
    //Timing
    clearInterval(intervalId);
    //Display
    $("#verbalResponse").html(verbalResponse[2]).show();
    $("#correctAnswer").html(correctAnswer[i]).show();
    $("#gif").html("<img src='" + gifArray[i] + "'>").show();
    //Hide other divs
    $("#timeLeft").hide();
    $(".rowQuestion").hide();
    $(".rowAnswers").hide();
    setTimeout(questionCount, responseTimer*1000);
}

function finalScore(){
    clearInterval(intervalId);
    //Hide intro page and question page divs
    $("#introPage").attr("style", "display: none");
    $("#timeLeft").attr("style", "display: none").hide();
    $(".rowQuestion").hide();
    $(".rowAnswers").hide();
    $("#verbalResponse").html(verbalResponse[2]).attr("style", "display: none");
    $("#correctAnswer").html(correctAnswer[i]).attr("style", "display: none");
    $("#gif").html("<img src='" + gifArray[i] + "'>").attr("style", "display: none");
    //Displays
    if (userCorrect >= 9) {
        praise = "Merlin's Beard! You've achieved the rank of HEADMASTER!";
    } else if (userCorrect > 7) {
        praise = "Wicked! You've achieved the rank of HEAD BOY or HEAD GIRL!";
    } else if (userCorrect > 6) {
        praise = "Bloody Brilliant! You've earned the rank of PREFECT!";
    } else if (userCorrect > 4) {
        praise = "Bloody Hell! You've earned the rank of SQUIB! Keep reading!";
    } else {
        "Bloody Hell! It's time to hit the books! You've earned the rank of MUGGLE!";
    }
    $("#finalResponse").html(verbalResponse[3]).show();
    $("#praise").html(praise).attr("style","font-family: 'Rancho', cursive;").show();
    $("#userCorrect").html("Correct: " + userCorrect).show();
    $("#userIncorrect").html("Incorrect: " + userIncorrect).show();
    $("#userUnanswered").html("Unanswered: " + userUnanswered).show();
    $("#startOver").html("<button id='startOverBtn'>Start Over?</button>").show();
    $("#startOverBtn").on("click", function(){
        $(this).attr("style", "display: none");
        numQ = 0;
        i = 0;
        userCorrect = 0;
        userIncorrect = 0;
        userUnanswered = 0;
        showTimer();
        nextQuestion();
    });
}
});



/* All questions, answerChoices, answers, and images as objects in an array.
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

/* Attempt to loop through the objects and to match the correct answer to the corresponding radio button
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
//Each question with answer choices is an object in this array
var allQuestions = [{
    question: "Q1. What is Hermione Granger's middle name?",
    answerChoices: ["Jan", "Joan", "Jane", "Jenee"],
    answer: 3,
    image: "../../assets/images/q1.gif"
}, {
    question: "Q2. How many children did Arthur and Molly Weasley have?",
    answerChoices: ["4", "5", "7", "8"],
    answer: 3,
    image: "../../assets/images/q2.gif"
}, {
    question: "Q3. What spell did Hermione use to fix Harry’s glasses?",
    answerChoices: ["Brackium Emendo", "Oculus Reparo", "Petrificus Totalus", "Revelio"],
    answer: 2,
    image: "../../assets/images/q3.gif"
}, {
    question: "Q4. Ron Weasley's patronus takes the form of what dog breed?",
    answerChoices: ["Jack Russell Terrier", "Golden Retriever", "Labrador Retriever", "Border Collie"],
    answer: 1,
    image: "../../assets/images/q4.gif"
}, {
    question: "Q5. The opal necklace found in Hogsmeade cursed which student?",
    answerChoices: ["Angelina Johnson", "Lavender Brown", "Hermione Granger", "Katie Bell"],
    answer: 4,
    image: "../../assets/images/q5.gif"
}, {
    question: "Q6. Which Quidditch team did Viktor Krum play for?",
    answerChoices: ["Bolivia", "Russia", "Bulgaria", "Belarus"],
    answer: 3,
    image: "../../assets/images/q6.gif"
}, {
    question: "Q7. What is the first address of the Order of the Phoenix headquarters?",
    answerChoices: ["4 Privet Drive", "12 Grimmauld Place", "14 Godric's Hollow", "3 Spinner's End"],
    answer: 2,
    image: "../../assets/images/q7.gif"
}, {
    question: "Q8. Which potion is used to make victims tell the truth?",
    answerChoices: ["Amorentia", "Polyjuice Potion", "Felix Felicis", "Veritiserum"],
    answer: 4,
    image: "../../assets/images/q8.gif"
}, {
    question: "Q9. What plant does Neville Longbottom give to Harry to help him breathe underwater?",
    answerChoices: ["Bubotuber", "Gillyweed", "Mandrake Root", "Aconite"],
    answer: 2,
    image: "../../assets/images/q9.gif"
}, {
    question: "Q10. What are the last words of the Harry Potter book series?",
    answerChoices: ["Always.", "All's well that ends well.", "All was well.", "After all this time."],
    answer: 3,
    image: "../../assets/images/q10.gif"
}];

var verbalResponse = {
    //Responses for when the user is correct, incorrect, didn't answer in time, or finishes the quiz.
    correct: "Brilliant! That is correct!",
    incorrect: "Not quite right! The correct answer was... ",
    unanswered: "You ran out of time! The correct answer was... ",
    quizDone: "Let's see how many magical facts you knew!"
}

var intervalId;
var timeAlloted;
var questionTimer = 30; //The user has 30 seconds to answer each question.
var responseTimer = 5; //The user has 5 seconds to view the correct answer.
//Display the correct answer as a string
var correctAnswer = allQuestions[i].answer;

var i = 0;
var j;

//Variables for the finalScore 
var userCorrect = 0;
var userIncorrect = 0;
var userUnanswered = 0;

//DO NOT name buttons using "start"
//Clicking the start button will hide the start button and reset the game
$("#gameBegin").click(function() {
   $(this).hide();  
    reset();
    });

function intro(){
    //Show intro page
    $("#introPage").hide();
    //Hide all question page divs, submit button, and final results page
    $("#timeLeft").show();
    $("#rowQuestion").hide();
    $("#rowAnswers").hide();
    $(".rowBtn").hide();
    $(".submitBtn").hide();
    $("#finalScorePage").hide();
    userCorrect = 0;
    userIncorrect = 0;
    userUnanswered = 0;
    $("#gameBegin").on("click", nextQuestion);

function nextQuestion(){
    if (userCorrect + userIncorrect + userUnanswered >= allQuestions.length) {
        finalScore();
    } else {
    $("#introPage").hide();
    $("responsePage").hide();
    //Append the timer to the timeLeft div
    resetTimer();
    $(".rowQuestion").html("<h2>" + allQuestions[i].question + "</h2>");
        console.log("Question: " + allQuestions[i].question);
    //$(".rowAnswers").show().find(".answer").each(function(i)){
        //answerChoices displays in rowAnswers as radio button values and strings
        $(".rowAnswers #zero").append("<input name='radioAns' type='radio'>" + allQuestions[i].answerChoices[0] + "</input>");
        $(".rowAnswers #one").append("<input name='radioAns' type='radio'>" + allQuestions[i].answerChoices[1] + "</input>");
        $(".rowAnswers #two").append("<input name='radioAns' type='radio'>" + allQuestions[i].answerChoices[2] + "</input>");
        $(".rowAnswers #three").append("<input name='radioAns' type='radio'>" + allQuestions[i].answerChoices[3] + "</input>");
    //}
        console.log("Answer Choices: " + allQuestions[i].answerChoices);
        //Start questionTimer
        intervalId = setInterval(showTimer, 1000);
    }
}
nextQuestion();

//MIGHT NEED DIFFERENT CONDITION
function userGuess(){
    //When the user answers correctly, bring the user to the correct answer display page.
    if (userGuess == correctAnswer) {
        userCorrect++;
        correct();
    } else {
        //When the user answers incorrectly, bring the user to the incorrect answer display page.
        //If the user submits no answer, bring the user to the incorrect answer display page.
        userIncorrect++;
        incorrect();
    }
}

function showTimer(){
    if (timeAlloted >= 0) {
        $("#timeLeft").html("Time Left: " + seconds);
        timeAllotted--;
    } else {
        timeUp();
    }
}
showTimer();

function timeUp(){
    //When the user runs out of time, bring the user to the out of time answer display page.
    userUnanswered++;
    resetTimer();
    unanswered();
    }

function resetTimer() {
    clearInterval(intervalId);
    timeAllotted = questionTimer;
    $("#timeLeft").empty();
}

function responseTimer(){
    resetTimer();
    setTimeout(nextQuestion, responseTimer*1000);
}
        
function correct(){
    userCorrect++;
    $("#verbalResponse").append(verbalResponse.correct);
    $("#correctAnswer").append(correctAnswer);
    $("#gif").append(allQuestions[i].image);
    $("#introPage").hide();
    $(".rowBtn").hide();
    $("#finalScorePage").hide();
    responseTimer();

}

function incorrect() {
    userIncorrect++;
    $("#verbalResponse").append(verbalResponse.incorrect);
    $("#correctAnswer").append(correctAnswer);
    $("#gif").append(allQuestions[i].image);
    $("#introPage").hide();
    $(".rowBtn").hide();
    $("#finalScorePage").hide();
    responseTimer();
}

function unanswered(){
    userUnanswered++;
    $("#verbalResponse").append(verbalResponse.unanswered);
    $("#correctAnswer").append(correctAnswer);
    $("#gif").append(allQuestions[i].image);
    $("#introPage").hide();
    $(".rowBtn").hide();
    $("#finalScorePage").hide();
    responseTimer();
}

function finalScore(){
    //Hide intro page and question page divs
    $("#introPage").hide();
    $("#timeLeft").hide();
    $("#rowQuestion").hide();
    $("#rowAnswers").hide();
    $(".rowBtn").hide();
    $("#finalResponse").append(verbalResponse.quizDone + "<br>" + praise);
    var praise = "Bloody Hell! It's time to hit the books! You've earned the rank of MUGGLE!";
        if (userCorrect >= 9) {
            praise = "Bloody Brilliant! You've achieved the rank of HEADMASTER!";
        } else if (userCorrect > 7) {
            praise = "Wicked! You've achieved the rank of HEAD BOY or HEAD GIRL!";
        } else if (userCorrect > 6) {
            praise = "Merlin's Beard! You've earned the rank of PREFECT!";
        } else if (userCorrect > 4) {
            praise = "Bloody Hell! You've earned the rank of SQUIB! Keep reading!";
        } 
    $("#userCorrect").append("Correct: " + userCorrect);
    $("#userIncorrect").append("Incorrect: " + UserIncorrect);
    $("#userUnanswered").append("Unanswered: " + UserUnanswered);
    $(".rowBtn").hide();
    $("#startOver").append("<button id='startOverBtn'>Start Over?</button>");
    $("#startOver").on("click", introPage);
}
$(document).ready(intro);

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
    

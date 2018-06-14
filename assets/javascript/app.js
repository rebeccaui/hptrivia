$(document).ready(function(){

//Each question with answer choices is an object in this array
var numQ = 0;
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
var timeAllotted;
var questionTimer = 30; //The user has 30 seconds to answer each question.
var responseTimer = 5; //The user has 5 seconds to view the correct answer.
//Display the correct answer as a string
var i = 0;
var j;
var correctAnswer = allQuestions[i].answer;

//Variables for the finalScore 
var userCorrect = 0;
var userIncorrect = 0;
var userUnanswered = 0;

function intro(){
    //Show intro page
    $("#introPage").show();
    //Hide all question page divs, submit button, and final results page
    $("#timeLeft").hide();
    $("#rowQuestion").hide();
    $("#rowAnswers").hide();
    $(".rowBtn").hide();
    $("#finalScorePage").hide();
    userCorrect = 0;
    userIncorrect = 0;
    userUnanswered = 0;
    $("#gameBegin").click(function(){
        $(this).attr("style", "display: none");
        nextQuestion();
    });
}
intro();

function nextQuestion(){
    if (userCorrect + userIncorrect + userUnanswered >= allQuestions.length) {
        finalScore();
    } else {
    $("#introPage").hide();
    $("responsePage").hide();
    $("#timeLeft").show();
    resetTimer();
    showTimer();
    //Start questionTimer
    intervalId = setInterval(showTimer, questionTimer*1000);
    $(".rowQuestion").html("<h2>" + allQuestions[i].question + "</h2>");
        console.log("Question: " + allQuestions[i].question);
    //$(".rowAnswers").show().find(".answer").each(function(i)){
        //answerChoices displays in rowAnswers as radio button values and strings
        $(".rowAnswers #zero").html("<input name='radioAns' type='radio'>" + allQuestions[i].answerChoices[0] + "</input>");
        $(".rowAnswers #one").html("<input name='radioAns' type='radio'>" + allQuestions[i].answerChoices[1] + "</input>");
        $(".rowAnswers #two").html("<input name='radioAns' type='radio'>" + allQuestions[i].answerChoices[2] + "</input>");
        $(".rowAnswers #three").html("<input name='radioAns' type='radio'>" + allQuestions[i].answerChoices[3] + "</input>");
    //}

    //If I can't get the submit button to work
   /* $(".rowAnswers").on("click", "li", function(){
        var checkAnswer = $(this).text();
        if (checkAnswer === correctAnswer[i]){
            correct();
        } else if (timeAllotted === 0){
            timeUp();
        } else {
            incorrect();
        }
    })
    */
    $(".rowBtn").show();
    $("#submitBtn").click(function(){
        userGuess();
    });
    console.log("Answer Choices: " + allQuestions[i].answerChoices);
    i++;
    }
    console.log("Correct: " + userCorrect);
    console.log("Incorrect: " + userIncorrect);
    console.log("Unanswered: " + userUnanswered);
}

//MIGHT NEED DIFFERENT CONDITION
function userGuess(){
    for(var j = 1; j <= 4; j++){
        var radios = document.getElementsByName("radioAns");
        for(var i = 0; i < allQuestions[i].answerChoices; i++) {
        var radio = radios[j];
        if(radio.value === "allQuestions[i].correctAnswer" && radio.checked){
            correct();
        }
    }
}
  /*  //When the user answers correctly, bring the user to the correct answer display page.
    if (userGuess == correctAnswer) {
        correct();
    } else {
        //When the user answers incorrectly, bring the user to the incorrect answer display page.
        incorrect();
    }*/

function showTimer(){
    if (timeAllotted >= 0) {
        $("#timeLeft").html("Time Left: " + timeAllotted);
        timeAllotted--;
    } else {
        timeUp();
    }
}


function timeUp(){
    //When the user runs out of time, bring the user to the out of time answer display page.
    resetTimer();
    unanswered();
}

function resetTimer() {
    clearInterval(intervalId);
    timeAllotted = questionTimer;
    $("#timeLeft").empty();
}
        
function correct(){
    userCorrect++;
    $("#verbalResponse").html(verbalResponse.correct);
    $("#correctAnswer").html(correctAnswer);
    $("#gif").html(allQuestions[i].image);
    $("#introPage").hide();
    $(".rowBtn").hide();
    $("#finalScorePage").hide();
    resetTimer();
    setTimeout(nextQuestion, responseTimer*1000);
}

function incorrect() {
    userIncorrect++;
    $("#verbalResponse").html(verbalResponse.incorrect);
    $("#correctAnswer").html(correctAnswer);
    $("#gif").html(allQuestions[i].image);
    $("#introPage").hide();
    $(".rowBtn").hide();
    $("#finalScorePage").hide();
    resetTimer();
    setTimeout(nextQuestion, responseTimer*1000);
}

function unanswered(){
    userUnanswered++;
    $("#verbalResponse").html(verbalResponse.unanswered);
    $("#correctAnswer").html(correctAnswer);
    $("#gif").html(allQuestions[i].image);
    $("#introPage").hide();
    $(".rowBtn").hide();
    $("#finalScorePage").hide();
    resetTimer();
    setTimeout(nextQuestion, responseTimer*1000);
}

function finalScore(){
    //Hide intro page and question page divs
    $("#introPage").hide();
    $("#timeLeft").hide();
    $("#rowQuestion").hide();
    $("#rowAnswers").hide();
    $(".rowBtn").hide();
    $("#finalResponse").html(verbalResponse.quizDone + "<br>" + praise);
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
    $("#userIncorrect").html("Incorrect: " + UserIncorrect);
    $("#userUnanswered").html("Unanswered: " + UserUnanswered);
    $(".rowBtn").hide();
    $("#startOver").html("<button id='startOverBtn'>Start Over?</button>");
    $("#startOver").on("click", introPage);
}

});
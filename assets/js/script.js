// list of all questions, choices, and answers//
var questionList = [
    {
      question: "Commonly used data types DO NOT include:",
      answers: ["strings", "booleans", "alerts", "numbers"],
      correctAnswer: 3
    },
    {
      question: "The condition in an if / else statement is enclosed within ____.",
      answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
      correctAnswer: 3
    },
    {
      question: "Arrays in JavaScript can be used to store ____.",
      answers: [ "numbers and strings", "other arrays", "booleans", "all of the above"
      ],
      correctAnswer: 4
    },
    {
      question: "String values must be enclosed within ____ when being assigned to variables.",
      answers: ["commas", "curly brackets", "quotes", "parentheses"],
      correctAnswer: 3
    },
    {
      question: "A very useful tool used during development and debugging for printing content to the debugger is:",
      answers: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      correctAnswer: 4
    }
  ];

//list of variables neeeded for each ID//
  var viewScoresDiv = document.getElementById("view-high-scores");
  var resultDiv = document.getElementById("result-block");
  var resultText = document.getElementById("result-text");
  var timerDiv = document.getElementById("timer-div");
  var timeCounter = document.getElementById("timer");
  var scoreTableBody = document.getElementById("score-table-body");
  
  var startBtn = document.getElementById("start-btn");
  var answerBtnDiv = document.getElementById("answer-btns");
  var returnBtn = document.getElementById("return-btn");
  var submitScoreBtn = document.getElementById("submit-score-btn");
  var clearScoresBtn = document.getElementById("clear-score-btn");
  
  var submitScoreForm = document.getElementById("submit-score-form");
  var initialInput = document.getElementById("init-enter");
  
  var currentQuestion;
  var currentTime;
  var timerInterval;
  var resultTimeout;
  var scoreList;

  /* Hides a component by ID by setting its display to 'none' */
  function hideID(id) {
    var element = document.getElementById(id);
  
    element.style.display = "none";
  }

  /* Set quiz initial start page state  */
  function initializePage() {
    showID("start-page");
    hideID("question-page");
    hideID("result-block");
    hideID("complete-page");
    hideID("high-score-page");
    viewScoresDiv.style.visibility = "visible";
    timerDiv.style.visibility = "hidden";
  }

  /* Updates each question and answer text to the index question specified */
  function updateQuestion(qIdx) {
    var questionText = document.getElementById("question-text");
  
    if (qIdx < questionList.length) {
      questionText.textContent = questionList[qIdx].question;
      
      for(var i = 0; i < 4; i++) {
        var answerText = document.getElementById("answer-btn-" + (i+1));
        answerText.textContent = (i+1) + ". " + questionList[qIdx].answers[i];
      }
    }
  }

   /* Finishes the quiz by transitioning page to the final score screen */
   function finishQuiz() {
    var scoreDisplay = document.getElementById("final-score");
    clearInterval(timerInterval);
  
    hideID("question-page");
    timerDiv.style.visibility = "hidden";
    scoreDisplay.textContent = currentTime;
    initialInput.value = "";
    showID("complete-page");
  }


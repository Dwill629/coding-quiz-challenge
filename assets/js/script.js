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
      answers: ["numbers and strings", "other arrays", "booleans", "all of the above"
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

  // sound effects
  var sfxRight = new Audio("assets/sfx/correct.wav");
  var sfxWrong = new Audio("assets/sfx/incorrect.wav");

  /* Hides a component by ID by setting its display to 'none' */
  function hideID(id) {
    var element = document.getElementById(id);
  
    element.style.display = "none";
  }

  /* Removes a component by ID by setting its display to empty string */
  function showID(id) {
    var element = document.getElementById(id);
  
    element.style.display = "";
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

  /* Update timer and quiz will end if the timer has expired */
  function updateTimer(adjust) {
    currentTime = currentTime + adjust > 0 ? currentTime + adjust : 0;
    timeCounter.textContent = currentTime;
  
    if (currentTime === 0) {
      finishQuiz();
    }
  }

  /* Loads the high score from your local storage */
  function loadScores() {
    scoreList = JSON.parse(localStorage.getItem("highScores")) || [];
  }

  /* Shows high score page */
  function showScores() {
    loadScores();

    /* Update score table with new data */
    scoreTableBody.innerHTML = "";
    for(var i = 0; i < scoreList.length; i++) {
      var tableRow = document.createElement("tr");
      var initialsData = document.createElement("td");
      var scoreData = document.createElement("td");
  
      initialsData.textContent = scoreList[i].initials;
      scoreData.textContent = scoreList[i].score;
  
      tableRow.append(initialsData);
      tableRow.append(scoreData);
  
      scoreTableBody.append(tableRow);
    }
    showID("high-score-page");
  }

  /* Add listener to start the quiz when the start button has been clicked */
  startBtn.addEventListener("click", function() {
    /* Hide 'View High Scores' */
    viewScoresDiv.style.visibility = "hidden";
  
    /* Show Timer */
    timerDiv.style.visibility = "visible";
  
    /* Hide start page */
    hideID("start-page");
  
    /* Load first question */
    currentQuestion = 0;
    updateQuestion(0);
  
    /* Show question page */
    showID("question-page");
  
    /* Start timer countdown */
    currentTime = 75;
    timeCounter.textContent = currentTime;
    timerInterval = setInterval(function() {
      updateTimer(-1);
    }, 1000);
  });

  /* Add listener to question and answer buttons */
  answerBtnDiv.addEventListener("click", function(event) {
    if(event.target.matches("button")) {
      /* Check if answer is correct */
      if (event.target.id === "answer-btn-" + questionList[currentQuestion].correctAnswer ) {
        resultText.textContent = "Correct!";
        sfxRight.play();
      } else {
        updateTimer(-10);
        resultText.textContent = "Wrong!";
        sfxWrong.play();
      }
      showID("result-block");
  
      /* Hide result of previous question after 2 seconds */
      clearTimeout(resultTimeout);
      resultTimeout = setTimeout(function () {
                                  hideID("result-block");
                                }, 2000);
  
      /* Remove focus from button */
      event.target.blur();
  
      /* Moves to next question or finishes quiz on last question */
      currentQuestion++;
      if(currentQuestion < questionList.length) {
        updateQuestion(currentQuestion);
      } else {
        finishQuiz();
      }
    }
  });

  /* Add listener to View High Scores div and move to the high score page */
  viewScoresDiv.addEventListener("click", function() {
    hideID("start-page");
    viewScoresDiv.style.visibility = "hidden";
    showScores();
  })

  /* Add listener to 'Return' button to reinitialize to start condition */
  returnBtn.addEventListener("click", initializePage);

  /* Add listener to 'Submit Score' form and add score to storage and open the score page */
  submitScoreForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if (initialInput.value != "") {
      /* add initials & score by pushing to score array */
      var newScore = {
        initials: initialInput.value,
        score: currentTime
      }
      scoreList.push(newScore);
  
      /* Sort new array to keep scores in order */
      scoreList.sort(function(a, b) {
        if (a.score < b.score) {
          return 1
        } else if (a.score > b.score) {
          return -1;
        } else {
          return 0;
        }
      })
  
      /* Store new scores list in local storage */
      localStorage.setItem("highScores", JSON.stringify(scoreList));
      hideID("complete-page");
      showScores();
    }
  })

  /* Add listener to 'Clear Scores" button to delete score storage and reload score page */
  clearScoresBtn.addEventListener("click", function(event) {
    event.target.blur();
    localStorage.removeItem("highScores");
    showScores();
  })
  
  /* Initialization */
  loadScores();
  


  


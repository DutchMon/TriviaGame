


$(document).on('click', '#restart', function (x) {
  theGame.reset();
});

$(document).on('click', '.submitAnswer', function (x) {
  theGame.clicked(x);
  console.log("submitAnswer")
});

$(document).on('click', '#start', function (x) {
  $('#quizWrapper').prepend('<h2>Clock: <span id="count">30</span> Seconds</h2>');
  theGame.loadQuestion();
  console.log("hi")
});

var questions = [{
  question: "Who won the first World Cup in 1930?",
  answers: ["USA", "Germany", "England", "France"],
  correctAnswer: "France",
  image: "assets/images/France.png"
}, {
  question: "How many teams were in the first World Cup?",
  answers: ["Eight", "Twenty", "Thirteen", "Sixteen"],
  correctAnswer: "Thirteen",
  image: "assets/images/copa.png"
}, {
  question: "Which country has won the most World Cups?",
  answers: ["Brazil", "Germany", "Italy", "Spain"],
  correctAnswer: "Brazil",
  image: "assets/images/Brazil.jpeg"
}, {
  question: 'How many times has Russia hosted the World Cup?',
  answers: ["One", "Four", "Three", "Two"],
  correctAnswer: "One",
  image: "assets/images/Russia.png"
}, {
  question: 'How many people tuned in to watch the 2014 World Cup?',
  answers: ["1.6 million", "2.2 billion", "4.8 million", "3.2 billion"],
  correctAnswer: "3.2 billion",
  image: "assets/images/worldFans.jpg"
}, {
  question: 'Which country withdrew from the 1950 World Cup because they were not allowed to play barefoot?',
  answers: ["Soudi Arabia", "India", "Spain", "Portugal"],
  correctAnswer: "India",
  image: "assets/images/india.jpg"
}, {
  question: "Around how many beers were sold during the 2010 World Cup?",
  answers: ["2 million", "4 million", "1 million", "3 million"],
  correctAnswer: "3 million",
  image: "assets/images/WorldCupBeers.jpg"
}, {
  question: "How quickly was the fastest goal scored in a World Cup?",
  answers: ["2 minutes", "1 minute", "43 seconds", "11 seconds"],
  correctAnswer: "11 seconds",
  image: "assets/images/goal.jpg"
}];
var initialCount = 30;

var theGame = {
  questions: questions,
  activeQuestion: 0,
  count: initialCount,
  correct: 0,
  incorrect: 0,
  countdown: function () {
    theGame.count--;
    $('#count').html(theGame.count);

    if (theGame.count === 0) {
      console.log('TIME UP');
      theGame.timeUp();
    }
  },

  loadQuestion: function () {
    timer = setInterval(theGame.countdown, 1000);
    $('#quiz').html('<h2>' + questions[this.activeQuestion].question + '</h2>');
    for (var i = 0; i < questions[this.activeQuestion].answers.length; i++) {
      $('#quiz').append('<button class="submitAnswer" id="button"' + 'data-name="' + questions[this.activeQuestion].answers[i] + '">' + questions[this.activeQuestion].answers[i] + '</button>');
    }
  },

  nextQuestion: function () {
    theGame.count = initialCount;
    $('#count').html(theGame.count);
    theGame.activeQuestion++;
    theGame.loadQuestion();
  },
  timeUp: function () {
    clearInterval(timer);
    $('#count').html(theGame.count);

    $('#quiz').html('<h2>Out of Time!</h2>');
    $('#quiz').append('<h3>The Correct Answer was: ' + questions[this.activeQuestion].correctAnswer);
    $('#quiz').append('<img src="' + questions[this.activeQuestion].image + '" />');

    if (theGame.activeQuestion === questions.length - 1) {
      setTimeout(theGame.results, 3 * 1000);
    } else {
      setTimeout(theGame.nextQuestion, 3 * 1000);
    }
  },
  results: function () {
    clearInterval(timer);

    $('#quiz').html('<h2>Congratulations! You are the World Cup Trivia Champion!</h2><br>');
    $('#count').html(theGame.count);
    $('#quiz').append('<h3>Correct Answers: ' + theGame.correct + ' Incorrect Answers: ' + theGame.incorrect + ' Unanswered: '+ (questions.length - (theGame.incorrect + theGame.correct)) +'</h3>');
    $('#quiz').append('<br><button id="restart">Start Over?</button>');
  },
  clicked: function (x) {
    clearInterval(timer);

    if ($(x.target).data("name") === questions[this.activeQuestion].correctAnswer) {
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function () {
    theGame.incorrect++;
    clearInterval(timer);
    $('#quiz').html('<h2>Nope!</h2>');
    $('#quiz').append('<h3>The Correct Answer was: ' + questions[theGame.activeQuestion].correctAnswer + '</h3>');
    

    if (theGame.activeQuestion === questions.length - 1) {
      setTimeout(theGame.results, 3 * 1000);
    } else {
      setTimeout(theGame.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function () {
    clearInterval(timer);
    theGame.correct++;
    $('#quiz').html('<h2>Correct!</h2>');
    $('#quiz').append('<img src="' + questions[theGame.activeQuestion].image + '" />');

    if (theGame.activeQuestion === questions.length - 1) {
      setTimeout(theGame.results, 3 * 1000);
    } else {
      setTimeout(theGame.nextQuestion, 3 * 1000);
    }
  },

  clicked: function (x) {
    clearInterval(timer);

    if ($(x.target).data("name") === questions[this.activeQuestion].correctAnswer) {
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  reset: function () {
    this.activeQuestion = 0;
    this.count = initialCount;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
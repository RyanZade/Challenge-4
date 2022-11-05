var startBtn = document.getElementById("btn1");
var startPage = document.querySelector(".card");
var firstQuestion = document.getElementById("question1");
var secondQuestion = document.getElementById("question2");
var thirdQuestion = document.getElementById("question3");
var resultsPageDisp = document.getElementById("results");
var firstPage = document.getElementById("firstQ");
var firstBtn = document.getElementById("q1answer1");
var secondBtn = document.getElementById("q1answer2");
var thirdBtn = document.getElementById("q1answer3");
var fourthBtn = document.getElementById("q1answer4");
var secondPage = document.getElementById("secondQ");
var q2FirstBtn = document.getElementById("q2answer1");
var q2SecondBtn = document.getElementById("q2answer2");
var q2ThirdBtn = document.getElementById("q2answer3");
var q2FourthBtn = document.getElementById("q2answer4");
var firstChoiceBtn = document.getElementById("q1answer2");
var secondChoiceBtn = document.getElementById("q2answer3");
var q3FirstBtn = document.getElementById("q3answer1");
var q3SecondBtn = document.getElementById("q3answer2");
var q3ThirdBtn = document.getElementById("q3answer3");
var q4FourthBtn =document.getElementById("q3answer4");
var thirdPage = document.getElementById("thirdQ")
var timer = document.getElementById("timer");
var highscoreBtn = document.getElementById("highscoresPage");
var titleText = document.getElementById("resultsId");
var scoreText = document.getElementById("score");
var inputText = document.getElementById("input");
var save = document.getElementById("saveBtn");
var time =  75;
var Questions = [
  {
    question: 'Which programing language is needed to create a website?',
    choices: ['CSS', 'Html', 'Hbtl', 'JavaScript'],
    correctAnswer: 'Html'
  },
  {
    question: 'Which programing language is used to style a site?',
    choices: ['website', 'JavaScript', 'CSS', 'HTML'],
    correctAnswer: 'CSS'
  },
  {
    question: 'How many classes a week does the course have?',
    choices: ['1', '6', '2', '3'],
    correctAnswer: '3'
  },
  {
    title: 'Score',
    score: 'This is your last score: ',
    input: 'Enter your name here: '
  }
];


function showFirstQuestion(){
  firstPage.innerHTML = Questions[0].question;
  firstBtn.innerHTML = Questions[0].choices[0];
  secondBtn.innerHTML = Questions[0].choices[1];
  thirdBtn.innerHTML = Questions[0].choices[2];
  fourthBtn.innerHTML = Questions[0].choices[3];
};

function showSecondQuestion(){
  secondPage.innerHTML = Questions[1].question;
  q2FirstBtn.innerHTML = Questions[1].choices[0];
  q2SecondBtn.innerHTML = Questions[1].choices[1];
  q2ThirdBtn.innerHTML = Questions[1].choices[2];
  q2FourthBtn.innerHTML = Questions[1].choices[3];
};

function showThirdQuestion(){
  thirdPage.innerHTML = Questions[2].question;
  q3FirstBtn.innerHTML = Questions[2].choices[0];
  q3SecondBtn.innerHTML = Questions[2].choices[1];
  q3ThirdBtn.innerHTML = Questions[2].choices[2];
  q4FourthBtn.innerHTML = Questions[2].choices[3];
};

function showResultsPage(){
  titleText.innerHTML = Questions[3].title;
  scoreText.innerHTML = Questions[3].score + `${JSON.parse(localStorage.getItem("studentGrade")).timeScore}`;
  inputText.innerHTML = Questions[3].input;
};

function firstQuestionBtn(event){
  event.preventDefault()
  console.log(event.target.innerHTML);
  if(event.target.innerHTML === Questions[0].correctAnswer){
    secondQuestionBtn()
  }else{
    incorrectOpperation(firstQuestion)
  }
};

function secondQBtn(event){
  event.preventDefault()
  console.log(event.target.innerHTML);
  if(event.target.innerHTML === Questions[1].correctAnswer){
    thirdQuestionBtn()
  }else{
    incorrectOpperation(secondQuestion)
  }
};

function thirdQBtn(event){
  event.preventDefault()
  console.log(event.target.innerHTML);
  if(event.target.innerHTML === Questions[2].correctAnswer){
    //localStorage.setItem("final_score", time);
    resultsPage(), resultsScore(); 
    time = 0;
  }
  else{
    incorrectOpperation(thirdQuestion)
  }
};

function resultsScore(){
  var studentGrade = {
    timeScore: time,
    inputText: null,
  };
save.addEventListener("click", function (event){
event.preventDefault();
studentGrade.inputText = inputText.value;
localStorage.setItem("studentGrade", JSON.stringify(studentGrade));
renderMessage();
})};

function renderMessage() {
  var lastGrade = JSON.parse(localStorage.getItem("studentGrade"));
  if (lastGrade !== null) {
    document.querySelector(".message").textContent = lastGrade.inputText + 
    " received a score of " + lastGrade.timeScore + ' this quiz.'
  }
}

function incorrectOpperation(parentElement){
  parentElement.removeChild(parentElement.lastChild);
  time-=5
    let incorrectDiv = document.createElement("div");
    incorrectDiv.innerHTML = "Incorrect"
    incorrectDiv.setAttribute("id", "incorrect");
    parentElement.append(incorrectDiv);
}

function setTime(){
  let countdown = setInterval(() => {
    time--;
    if(time === -1){
      clearInterval(countdown);
    } else{
      timer.innerHTML = time + " seconds remaining"
    }
    if(time === 0) {
      window.alert("You ran out of time");
      showHighscores();
      return;
    }
  }, 1000);
}

function startQuestions(){
  setTime();
  startPage.style.display='none'
  firstQuestion.style.display='block'
  showFirstQuestion();
};
function secondQuestionBtn(){
  firstQuestion.style.display='none'
  secondQuestion.style.display='block'
  showSecondQuestion();
};

function thirdQuestionBtn(){
  secondQuestion.style.display='none'
  thirdQuestion.style.display='block'
  showThirdQuestion();
};

function resultsPage(){
  thirdQuestion.style.display='none'
  resultsPageDisp.style.display='block'
  showResultsPage();
};

function showHighscores(){
  startPage.style.display='none'
  secondQuestion.style.display='none'
  thirdQuestion.style.display='none'
  resultsPageDisp.style.display='block'
  showResultsPage();
};

startBtn.addEventListener('click', startQuestions);
highscoreBtn.addEventListener('click', showHighscores);
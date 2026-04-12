
// ELEMENTS (UI REFERENCES),, I used EL to distinguish, elements from other variables

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timeEl = document.getElementById("time");
const streakEl = document.getElementById("streak");
const progressBar = document.getElementById("progress-bar");
const questionCount = document.getElementById("question-count");
const resultEl = document.getElementById("result");

const attemptsEl = document.getElementById("attempts");
const highScoreEl = document.getElementById("high-score");
const scoreListEl = document.getElementById("score-list");


// LOCAL QUESTIONS (STATIC DATA)....an array of objects

let questions = [
{ question: "If a player is level with the second-last defender, is he offside?", correct: "No", options: ["Yes","No","Sometimes","Depends"] },

{ question: "What is the minimum number of touches allowed before a direct free kick can be scored?", correct: "1", options: ["1","2","3","4"] },

{ question: "What does xG measure in football?", correct: "Goal probability of a shot", options: ["Player speed","Goal probability of a shot","Pass accuracy","Defensive strength"] },

{ question: "If possession is 70% but a team loses, what is most likely missing?", correct: "Chance quality", options: ["Fitness","Chance quality","Weather","Kit color"] },

{ question: "A goalkeeper holds the ball for more than 6 seconds, what is awarded?", correct: "Indirect free kick", options: ["Penalty","Corner","Indirect free kick","Drop ball"] },

{ question: "In game theory, what is a Nash equilibrium in penalties?", correct: "Optimal mixed strategy", options: ["Random kick","Optimal mixed strategy","Always same side","Goalkeeper guessing"] },

{ question: "Which formation best describes a 4-3-3 shape?", correct: "4 defenders, 3 midfielders, 3 forwards", options: ["3-4-3","4-3-3","4-4-2","5-3-2"] },

{ question: "Kenyan Premier League: Which club is based in Kisumu?", correct: "Kisumu All Stars", options: ["Tusker FC","Kisumu All Stars","Ulinzi Stars","Bandari FC"] },

{ question: "Kenyan Premier League: Which team is known as 'Ingwe'?", correct: "AFC Leopards", options: ["Gor Mahia","AFC Leopards","Tusker FC","Sofapaka"] },

{ question: "If pressing success is 60% but leads to 40% exposure, is it always optimal?", correct: "No", options: ["Yes","No","Always","Never"] }
]


// STATE VARIABLES... basically tracking the app state

let currentIndex = 0;// quiz you are on
let score = 0;//correct answers
let streak = 0;//current streak
let finalStreak = 0; // highest streak
let timer;// inteval reference , just a control handle of running timer
let apiLoaded = false;// prevents re-fetching

let gameStarted = false;// blocks autostart


// START GAME 

function startGame() {
gameStarted = true;
showQuestion();
}


// GET REQUEST (HTTP GET)
// We use fetch() to GET external quiz questions from API
// This demonstrates asynchronous data fetching (AJAX concept)

async function fetchExtraQuestions() {
try {

apiLoaded = true;

// GET REQUEST TO PUBLIC API (Open Trivia DB)
const res = await fetch("https://opentdb.com/api.php?amount=10&category=21&type=multiple");
const data = await res.json();// convert data to usable js data

// convert API response into usable format
const apiQuestions = data.results.map(q => ({
question: q.question,
correct: q.correct_answer,
options: [...q.incorrect_answers, q.correct_answer]
}));

// merge API questions with local questions
questions = [...questions, ...apiQuestions];

showQuestion();
// error  handling 
} catch (err) {
console.error("API fetch failed", err);
showResult();
}
}


// LOAD DATA (READ from localStorage)/

function loadStats() {
let data = localStorage.getItem("quizStats");

if (!data) {
data = {
attempts: 0,
scores: [],
highScore: 0
};
} else {
data = JSON.parse(data);
}

updateDashboard(data);
return data;
}

// UPDATE UI DASHBOARD

function updateDashboard(data) {

attemptsEl.innerText = data.attempts ?? 0;
highScoreEl.innerText = data.highScore ?? 0;

scoreListEl.innerHTML = "";

(data.scores ?? []).slice().reverse().forEach(s => {
const li = document.createElement("li");
li.innerText = "Score: " + s;
scoreListEl.appendChild(li);
});
}

// POST REQUEST (SIMULATED)

function saveScore(finalScore) {
let data = loadStats();

data.attempts = (data.attempts ?? 0) + 1;
data.scores = data.scores ?? [];
data.scores.push(finalScore);

if (finalScore > (data.highScore ?? 0)) {
data.highScore = finalScore;
}

localStorage.setItem("quizStats", JSON.stringify(data));

updateDashboard(data);
}

// DELETE REQUEST (SIMULATED)

function resetStats() {
localStorage.removeItem("quizStats");

updateDashboard({
attempts: 0,
scores: [],
highScore: 0
});
}

// SHOW QUESTION LOGIC

function showQuestion() {

// STOP AUTO START UNTIL USER CLICKS START
if (!gameStarted) return;

resetTimer();

if (currentIndex >= questions.length) {

// ALERT
if (!apiLoaded) {
alert("🔥 Bonus Round! Loading extra questions...");
fetchExtraQuestions();
return;
}

showResult();
return;
}

const q = questions[currentIndex];

questionCount.innerText = `Question ${currentIndex + 1} of ${questions.length}`;
questionEl.innerText = q.question;

answersEl.innerHTML = "";

q.options
.sort(() => Math.random() - 0.5)
.forEach(opt => {
const btn = document.createElement("button");
btn.innerText = opt;
btn.onclick = () => checkAnswer(opt);
answersEl.appendChild(btn);
});

progressBar.style.width = (currentIndex / questions.length) * 100 + "%";

startTimer();
}

// CHECK ANSWER

function checkAnswer(answer) {
clearInterval(timer);

let buttons = answersEl.querySelectorAll("button");

if (answer === questions[currentIndex].correct) {
score++;
streak++;
finalStreak = Math.max(finalStreak, streak);

//  mark correct
buttons.forEach(btn => {
if (btn.innerText === answer) {
btn.style.background = "#2e7d32";
btn.style.color = "white";
}
});

} else {
streak = 0;

// mark wrong
buttons.forEach(btn => {
if (btn.innerText === answer) {
btn.style.background = "#c62828";
btn.style.color = "white";
}
});
}

streakEl.innerText = streak;

setTimeout(() => {
currentIndex++;
showQuestion();
}, 700);
}

// TIMER FUNCTION 
function startTimer() {
let time = 15;
timeEl.innerText = time;

clearInterval(timer);

timer = setInterval(() => {
time--;
timeEl.innerText = time;

if (time === 0) {
clearInterval(timer);
streak = 0;
currentIndex++;
showQuestion();
}
}, 1000);
}

function resetTimer() {
clearInterval(timer);
startTimer();
}

// RESULT SCREEN

function showResult() {


clearInterval(timer);

questionEl.style.display = "none";
answersEl.style.display = "none";

resultEl.classList.remove("hidden");

resultEl.innerHTML = `
<h2 class="result-title">Results</h2>
<p>Your Score: ${score} / ${questions.length}</p>
<p>Streak: ${finalStreak}</p>
<button class="restart-btn" onclick="location.reload()">Restart</button>
`;

saveScore(score);
}


// INIT APP (START)

loadStats();
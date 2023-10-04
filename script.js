const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        ]
    },
    {
        question: "Which is the largest ant in the world?",
        answers: [
            {text: "Ant man", correct: true},
            {text: "Bullet ant", correct: false},
            {text: "Fire ant", correct: false},
            {text: "Black garden ant", correct: false}
        ]
    },
    {
        question: "Which is the largest city in the world?",
        answers: [
            {text: "Tokyo", correct: false},
            {text: "Wrangell", correct: false},
            {text: "Sitka", correct: true},
            {text: "Yakutat", correct: false}
        ]
    },
    {
        question: "Which is the largest country in the world?",
        answers: [
            {text: "United States", correct: false},
            {text: "China", correct: false},
            {text: "Canada", correct: false},
            {text: "Russia", correct: true}
        ]
    }
]

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const questionElement = $('.quiz h2');
const answersElement = $('.answers');
const nextBtnElement = $('.next-btn');

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
    clearQuestions();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestionIndex + 1 + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach((answer) => {
        const btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add('answer-btn');
        answersElement.appendChild(btn);
        if (answer.correct) {
            btn.dataset.correct = answer.correct;
        }
        btn.addEventListener('click', selectAnswer);
    })
}

function clearQuestions(){
    nextBtnElement.style.display = 'none';
    while(answersElement.firstChild) {
        answersElement.removeChild(answersElement.firstChild);
    }
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct;
    if (isCorrect) {
        selectBtn.classList.add('correct');
        score++;
    }
    else {
        selectBtn.classList.add('incorrect');
    }
    //Array.from(collection): convert HTMLCollection into array
    Array.from(answersElement.children).forEach(button => {
        if (button.dataset.correct) {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    nextBtnElement.style.display = 'block';
}

function nextQuestion() {
    if (currentQuestionIndex >= questions.length-1) {
        showScore();
    }
    else {
        currentQuestionIndex++;
        showQuestion();
    }
}

function showScore() {
    clearQuestions();
    questionElement.innerHTML = `You score ${score} out of ${questions.length}`;
    nextBtnElement.innerHTML = 'Play Again';
    nextBtnElement.style.display = 'block';
    currentQuestionIndex = -1;
}

nextBtnElement.addEventListener('click', nextQuestion)

startQuiz()


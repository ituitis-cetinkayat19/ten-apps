const quizData = [
    {
        question: "How old is Florin?",
        a: "10",
        b: "17",
        c: "26",
        d: "110",
        correct: "c"
    }, {
        question: "What is the most used programming language in 2019?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "Javascript",
        correct: "d"
    }, {
        question: "Who is the President of US?",
        a: "Florin Pop",
        b: "Donald Trump",
        c: "Ivan Saldano",
        d: "Joe Biden",
        correct: "d"
    }, {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Jason Object Notation",
        d: "Application Programming Interface",
        correct: "a"
    }, {
        question: "What year was Javascript launched?",
        a: "1995",
        b: "1994",
        c: "1996",
        d: "none of the above",
        correct: "a"
    }
];

let currentQuestion = 0;
const options = document.querySelectorAll("label");
const question = document.querySelector("#question");
const btn = document.querySelector(".submit");
const quiz = document.querySelector("#quiz");
const questionContainer = document.querySelector(".question-container");
const questionButtons = Array.from(document.querySelectorAll("button.q"));
const inputs = document.querySelectorAll("input[name='answer']");
let points = 0;
let completed = [];
let answers = [0,0,0,0,0];

loadQuestion();

function loadQuestion() {
    inputs.forEach(input => input.checked = false);
    if(answers[currentQuestion] != 0) {
        const selected = document.querySelector(`input[id=${answers[currentQuestion]}]`);
        selected.checked = true;
    }
    questionButtons.forEach(question => question.classList.remove("active"));
    questionButtons[currentQuestion].classList.add("active");
    const currentQuestionData = quizData[currentQuestion];
    question.textContent = currentQuestionData.question;
    options.forEach(option => {
        option.textContent = currentQuestionData[option.getAttribute("for")];
    });
}

function evaluate(selected) {
    questionButtons[currentQuestion].classList.add("completed");
    answers[currentQuestion] = selected.id;
}

btn.addEventListener("click", () => {
    const selected = document.querySelector("input[name='answer']:checked");
    if(selected) {
        selected.checked = false;
        evaluate(selected);
        if(!completed.includes(currentQuestion))
            completed.push(currentQuestion);
        if(completed.length < quizData.length) {
            if(currentQuestion < quizData.length - 1)
                currentQuestion++;
            loadQuestion();
        } else {
            for(let i = 0; i < answers.length; i++)
                if(answers[i] == quizData[i].correct)
                    points++;
            quiz.innerHTML = `<h2>You answered correctly at ${points}/${quizData.length} questions</h2><button class='submit' onclick='location.reload()'>Refresh</button>`;
            questionContainer.style.display = "none";
        }
    } else {
        alert("Please select an option");
    }

});

questionButtons.forEach(question => question.addEventListener("click", () => {
    currentQuestion = question.textContent-1;
    loadQuestion();
}));
const quizData = [
    {
        question: "Which of the following is not a JavaScript Data Type?",
        a: "Undefined",
        b: "Number",
        c: "Boolean",
        d: "Float",
        correct: "d",
    },
    {
        question: "Which company developed JavaScript?",
        a: "Netscape",
        b: "Bell Labs",
        c: "Sun Microsystems",
        d: "IBM",
        correct: "a",
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        a: "<script>",
        b: "<head>",
        c: "<meta>",
        d: "<style>",
        correct: "a",
    },
    {
        question: "Which one is the ternary operator in JavaScript?",
        a: "#",
        b: "::",
        c: "&:",
        d: "?:",
        correct: "d",
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        a: "\\",
        b: "//",
        c: "/* */",
        d: "*/",
        correct: "b",
    },
    {
        question: "What are the types of pop-up boxes available in JavaScript?",
        a: "Alert",
        b: "Prompt",
        c: "Confirm",
        d: "All of the above",
        correct: "d",
    },
    {
        question: "Which of the following methods checks if its argument is not a number?",
        a: "isNaN()",
        b: "nonNaN()",
        c: "NaN()",
        d: "None of the above",
        correct: "a",
    },
];

const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const answerEls = document.querySelectorAll('.answer');

let currentQuiz = 0;
let score = 0;
let answers = [];

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function getSelected() {
    let answer = undefined;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => {
        answerEl.checked = false;
    });
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    
    if (answer) {
        // Save the user's answer
        answers.push({ question: quizData[currentQuiz].question, answer, correctAnswer: quizData[currentQuiz].correct });
        
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        
        currentQuiz++;
        
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            // Show quiz result
            showResult();
        }
    }
});

function showResult() {
    quiz.innerHTML = `
        <h2>You answered ${score}/${quizData.length} questions correctly</h2>
        <ul>
            ${answers.map((ans, index) => `
                <li class="${ans.answer === ans.correctAnswer ? 'correct' : 'wrong'}">
                    <strong>Question ${index + 1}:</strong> ${ans.question} <br>
                    <span>Your answer: ${ans.answer.toUpperCase()}</span> <br>
                    <span>Correct answer: ${ans.correctAnswer.toUpperCase()}</span>
                </li>
            `).join('')}
        </ul>
        <button onclick="location.reload()">Replay</button>
    `;
}


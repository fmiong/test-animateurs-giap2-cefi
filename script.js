// ==================== VARIABLES GLOBALES ====================
let questions = [];           // Tableau des questions après mélange
let currentQuestionIndex = 0;
let userAnswers = [];         // Tableau des réponses choisies (index de l'option)
let timerInterval;
let timeRemaining = 20 * 60;  // 20 minutes en secondes
let testCompleted = false;

// ==================== ÉLÉMENTS DOM ====================
const timerElement = document.getElementById('time');
const questionNumberElement = document.getElementById('question-number');
const questionTextElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const scoreSpan = document.getElementById('score');
const downloadBtn = document.getElementById('download-pdf');

// ==================== FONCTIONS DE MÉLANGE ====================
// Mélange un tableau (algorithme de Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Mélange les options d'une question et ajuste l'index de la bonne réponse
function shuffleOptions(question) {
    // Crée un tableau d'objets {text: option, originalIndex: index}
    const optionsWithIndex = question.options.map((text, idx) => ({ text, originalIndex: idx }));
    // Mélange ce tableau
    shuffleArray(optionsWithIndex);
    // Récupère les nouvelles options (juste le texte)
    const newOptions = optionsWithIndex.map(item => item.text);
    // Trouve le nouvel index de la bonne réponse
    const newCorrectIndex = optionsWithIndex.findIndex(item => item.originalIndex === question.correct);
    return {
        question: question.question,
        options: newOptions,
        correct: newCorrectIndex
    };
}

// Initialisation : mélanger les questions et les options
function initQuestions() {
    // Copie profonde des données originales
    let rawQuestions = JSON.parse(JSON.stringify(questionsData));
    // Mélange l'ordre des questions
    rawQuestions = shuffleArray(rawQuestions);
    // Pour chaque question, mélange les options
    questions = rawQuestions.map(q => shuffleOptions(q));
    // Initialise le tableau des réponses utilisateur avec null
    userAnswers = new Array(questions.length).fill(null);
}

// ==================== AFFICHAGE ====================
function showQuestion() {
    const q = questions[currentQuestionIndex];
    questionNumberElement.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
    questionTextElement.textContent = q.question;

    // Générer les options
    optionsContainer.innerHTML = '';
    q.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'option';
        if (userAnswers[currentQuestionIndex] === index) {
            div.classList.add('selected');
        }
        // On ajoute une lettre A, B, C, D pour plus de clarté
        const letter = String.fromCharCode(65 + index); // 65 = 'A'
        div.innerHTML = `<input type="radio" name="option" value="${index}" ${userAnswers[currentQuestionIndex] === index ? 'checked' : ''}> <strong>${letter})</strong> ${option}`;
        div.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(div);
    });

    // Gérer les boutons de navigation
    prevBtn.disabled = currentQuestionIndex === 0;
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
}

function selectOption(index) {
    // Mettre à jour l'affichage
    const options = document.querySelectorAll('.option');
    options.forEach((opt, i) => {
        if (i === index) {
            opt.classList.add('selected');
            opt.querySelector('input').checked = true;
        } else {
            opt.classList.remove('selected');
        }
    });
    // Enregistrer la réponse
    userAnswers[currentQuestionIndex] = index;
}

// ==================== NAVIGATION ====================
prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
});

submitBtn.addEventListener('click', () => {
    if (confirm('Voulez-vous vraiment terminer le test ?')) {
        endTest();
    }
});

// ==================== CHRONOMÈTRE ====================
function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Temps écoulé ! Le test va être soumis automatiquement.");
            endTest();
        }
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// ==================== FIN DU TEST ====================
function endTest() {
    if (testCompleted) return;
    testCompleted = true;
    clearInterval(timerInterval);

    // Calculer le score (2 points par bonne réponse)
    let score = 0;
    questions.forEach((q, index) => {
        if (userAnswers[index] === q.correct) {
            score += 2;
        }
    });

    // Afficher les résultats
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreSpan.textContent = score;

    // Stocker les données pour le PDF
    window.testResults = {
        questions: questions,
        userAnswers: userAnswers,
        score: score
    };
}

// ==================== GÉNÉRATION PDF ====================
downloadBtn.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const results = window.testResults;

    doc.setFontSize(18);
    doc.text('Récapitulatif du test', 10, 10);
    doc.setFontSize(12);
    doc.text(`Score final : ${results.score}/20`, 10, 20);
    doc.text('Détail des réponses :', 10, 30);

    let y = 40;
    results.questions.forEach((q, index) => {
        const userAnswerIndex = results.userAnswers[index];
        const userAnswerText = userAnswerIndex !== null ? q.options[userAnswerIndex] : 'Non répondu';
        const correctAnswerText = q.options[q.correct];
        const isCorrect = userAnswerIndex === q.correct;

        doc.setFontSize(11);
        doc.text(`${index + 1}. ${q.question}`, 10, y);
        y += 6;
        doc.text(`   Votre réponse : ${userAnswerText}`, 15, y);
        y += 5;
        doc.text(`   Bonne réponse : ${correctAnswerText}`, 15, y);
        y += 5;
        doc.text(`   Statut : ${isCorrect ? '✔️ Correct' : '❌ Faux'}`, 15, y);
        y += 10;

        if (y > 280) {
            doc.addPage();
            y = 20;
        }
    });

    doc.save('recapitulatif_test_animateurs.pdf');
});

// ==================== DÉMARRAGE ====================
initQuestions();
showQuestion();
startTimer();
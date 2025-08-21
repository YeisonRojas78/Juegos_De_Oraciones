let currentQuestionIndex = 0;
let scoreCorrect = 0;
let scoreWrong = 0;
let timer;
let timeLeft = 30;
let questionFinished = false; // evita dobles evaluaciones

// DOM
const sentenceElement = document.getElementById('questionContainer');
const resultsContainer = document.getElementById('resultsContainer');
const timeElement = document.getElementById('time');
const timerProgress = document.getElementById('timerProgress');
const confirmButton = document.getElementById('confirmButton');

// Estado por pregunta
let optionMap = new Map();       // id -> texto
let usedOptionIds = new Set();   // ids usados en blancos

function initGame() {
  currentQuestionIndex = 0;
  scoreCorrect = 0;
  scoreWrong = 0;
  resultsContainer.classList.add("hidden");
  sentenceElement.classList.remove("hidden");
  loadQuestion(currentQuestionIndex);
}

function loadQuestion(index) {
  if (index >= questions.length) {
    showResults();
    return;
  }

  questionFinished = false;
  optionMap = new Map();
  usedOptionIds = new Set();

  const question = questions[index];
  let displaySentence = question.sentence;

  // Reemplaza tantos "___" como missingWordCount con spans clicables
  for (let i = 0; i < question.missingWordCount; i++) {
    displaySentence = displaySentence.replace(
      "___",
      `<span class="blank inline-block min-w-24 w-24 h-8 bg-gray-200 rounded-md mx-1 align-middle cursor-pointer"></span>`
    );
  }

  // Estructura base de la pregunta
  sentenceElement.innerHTML = `
    <p class="text-lg font-medium text-gray-800 mb-4 leading-relaxed">${displaySentence}</p>
    <div id="optionsContainer" class="flex flex-wrap gap-3"></div>
  `;

  // Preparar opciones con IDs únicos (soporta textos repetidos como "will")
  const optionsContainer = document.getElementById('optionsContainer');
  const answersWithIds = question.answers.map((text, i) => ({
    id: `opt-${i}`,
    text
  }));

  // Guardar en optionMap
  answersWithIds.forEach(({ id, text }) => optionMap.set(id, text));

  // Mezclar y pintar botones
  [...answersWithIds].sort(() => Math.random() - 0.5).forEach(({ id, text }) => {
    optionsContainer.appendChild(createOptionButton(id, text));
  });

  // Click en blanks para borrar
  document.querySelectorAll('.blank').forEach(blank => {
    blank.addEventListener('click', () => {
      if (blank.dataset.optionId) {
        removeFromBlank(blank);
        updateConfirmState();
      }
    });
  });

  // Configurar botón confirmar
  confirmButton.disabled = true;
  confirmButton.onclick = () => {
    if (confirmButton.disabled || questionFinished) return;
    clearInterval(timer);
    checkAnswers(); // evalúa y pasa a la siguiente
  };

  // Timer
  resetTimer();
}

function createOptionButton(id, text) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.dataset.id = id;
  btn.textContent = text;
  btn.className = 'word-option bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg';
  btn.addEventListener('click', () => placeAnswer(id));
  return btn;
}

function placeAnswer(optionId) {
  if (questionFinished) return;
  if (usedOptionIds.has(optionId)) return; // ya usado

  const blanks = document.querySelectorAll('.blank');
  const firstEmpty = Array.from(blanks).find(b => (b.textContent || '').trim() === '');
  if (!firstEmpty) return; // no hay espacios disponibles

  // Colocar texto
  const text = optionMap.get(optionId);
  firstEmpty.textContent = text;
  firstEmpty.classList.remove('bg-gray-200');
  firstEmpty.classList.add('bg-yellow-100', 'px-2');
  firstEmpty.dataset.optionId = optionId;

  // Marcar usado y quitar botón
  usedOptionIds.add(optionId);
  const btn = document.querySelector(`button[data-id="${optionId}"]`);
  if (btn) btn.remove();

  updateConfirmState();
}

function removeFromBlank(blankEl) {
  if (questionFinished) return;
  const optionId = blankEl.dataset.optionId;
  if (!optionId) return;

  // Limpiar blank
  blankEl.textContent = '';
  blankEl.classList.remove('bg-yellow-100', 'px-2');
  blankEl.classList.add('bg-gray-200');
  delete blankEl.dataset.optionId;

  // Marcar como no usado y devolver botón
  usedOptionIds.delete(optionId);
  const text = optionMap.get(optionId);
  const optionsContainer = document.getElementById('optionsContainer');

  // Evitar duplicados: si ya existe botón con ese id, no crear otro
  if (!document.querySelector(`button[data-id="${optionId}"]`)) {
    optionsContainer.appendChild(createOptionButton(optionId, text));
  }
}

function updateConfirmState() {
  const blanks = document.querySelectorAll('.blank');
  const allFilled = Array.from(blanks).every(b => (b.textContent || '').trim() !== '');
  confirmButton.disabled = !allFilled;
}

function checkAnswers(fromTimer = false) {
  if (questionFinished) return;
  questionFinished = true;       // evita dobles evaluaciones
  clearInterval(timer);          // por si vino del timer o del botón

  const question = questions[currentQuestionIndex];
  const blanks = document.querySelectorAll(".blank");
  const selectedAnswers = Array.from(blanks).map(b => (b.textContent || '').trim());

  // ¿Están todos los espacios llenos?
  const allFilled = selectedAnswers.filter(t => t !== '').length === question.missingWordCount;

  let isCorrect = false;

  if (Array.isArray(question.correctAnswer)) {
    // Si es del timer y no están todos llenos → incorrecto por tiempo
    if (fromTimer && !allFilled) {
      isCorrect = false;
    } else {
      const a = [...selectedAnswers].sort().join("||");
      const b = [...question.correctAnswer].sort().join("||");
      isCorrect = allFilled && a === b;
    }
  } else {
    // Una sola respuesta
    if (fromTimer && !allFilled) {
      isCorrect = false;
    } else {
      isCorrect = selectedAnswers[0] === question.correctAnswer;
    }
  }

  if (isCorrect) {
    scoreCorrect++;
    alert(fromTimer ? "⏰ Tiempo agotado, pero tu respuesta es correcta. ¡Bien hecho! 🎉" 
                    : "🎉 ¡Muy bien! Respuesta correcta.");
  } else {
    scoreWrong++;
    const right = Array.isArray(question.correctAnswer)
      ? question.correctAnswer.join(", ")
      : question.correctAnswer;
    const prefix = fromTimer ? "⏰ Tiempo agotado. " : "";
    alert(`${prefix}❌ Incorrecto. ${question.correction || ""}\n✅ Respuesta correcta: ${right}`);
  }

  confirmButton.disabled = true;

  setTimeout(() => {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
  }, 300);
}

function showResults() {
  const total = scoreCorrect + scoreWrong;
  const percentage = total > 0 ? Math.round((scoreCorrect / total) * 100) : 0;

  sentenceElement.classList.add("hidden");
  resultsContainer.innerHTML = `
    <h2 class="text-2xl font-bold text-gray-800 mb-2">Game Completed!</h2>
    <p class="text-lg text-gray-600 mb-2">✅ Correct: ${scoreCorrect}</p>
    <p class="text-lg text-gray-600 mb-2">❌ Wrong: ${scoreWrong}</p>
    <p class="text-lg text-gray-600 mb-6">You scored ${percentage}%</p>
    <button id="restartButton" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition">
      Play Again
    </button>
  `;
  resultsContainer.classList.remove("hidden");
  confirmButton.disabled = true;

  document.getElementById("restartButton").addEventListener("click", initGame);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timeElement.textContent = `${timeLeft}s`;
  timerProgress.style.width = "100%";
  timerProgress.style.backgroundColor = "#3b82f6";
  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeElement.textContent = `${timeLeft}s`;
    timerProgress.style.width = `${(timeLeft / 30) * 100}%`;
    timerProgress.style.backgroundColor = timeLeft <= 10 ? "#ef4444" : "#3b82f6";

    if (timeLeft <= 0) {
      clearInterval(timer);

      // Solo marcar incorrecta si el usuario NO respondió
      if (!questionFinished) {
        questionFinished = true;

        // Verificar si ya hay respuestas seleccionadas
        const question = questions[currentQuestionIndex];
        const blanks = document.querySelectorAll(".blank");
        const selectedAnswers = Array.from(blanks).map(b => b.textContent.trim());

        let isCorrect = false;

        if (Array.isArray(question.correctAnswer)) {
          isCorrect =
            selectedAnswers.length === question.correctAnswer.length &&
            selectedAnswers.every(ans => question.correctAnswer.includes(ans));
        } else {
          isCorrect = selectedAnswers[0] === question.correctAnswer;
        }

        if (selectedAnswers.some(ans => ans !== "")) {
          // Ya había respuesta → evaluamos normal
          if (isCorrect) {
            scoreCorrect++;
            alert("✅ ¡Correcto justo a tiempo!");
          } else {
            scoreWrong++;
            alert("❌ Respuesta incorrecta. " + question.correction);
          }
        } else {
          // No respondió nada → se toma como incorrecta por tiempo
          scoreWrong++;
          alert("⏰ ¡Tiempo agotado sin responder!");
        }

        setTimeout(() => {
          currentQuestionIndex++;
          loadQuestion(currentQuestionIndex);
        }, 500);
      }
    }
  }, 1000);
}


initGame();

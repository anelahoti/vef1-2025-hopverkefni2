import { questions } from "./questions.js";

let currentQuestionIndex = 0;

// Lesum stöðu úr localStorage ef hún er til
const savedIndex = localStorage.getItem("currentQuestionIndex");
if (savedIndex !== null) {
  currentQuestionIndex = parseInt(savedIndex, 10);
}

const content = document.getElementById("content");
const homeLink = document.getElementById("homeLink");
const quizLink = document.getElementById("quizLink");

homeLink.addEventListener("click", showHome);
quizLink.addEventListener("click", showQuiz);

function showHome() {
  content.innerHTML = `
    <section id="home">
      <h2>Velkomin í PubQuiz!</h2>
      <p>Smelltu á „Spurningar“ til að byrja leikinn.</p>
    </section>
  `;
}

function showQuiz() {
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQuestionIndex];

  content.innerHTML = `
    <section id="quiz">
      <h2>${q.category}</h2>
      <img src="${q.image}" alt="Mynd fyrir spurningu" />
      <p class="question">${q.question}</p>

      <p class="answer" id="answer" style="display:none;">(Svar: ${q.answer})</p>
      <div class="controls">
        <button id="toggleAnswer">Sýna svar</button>
      </div>

      <div class="nav-buttons">
        <button id="prev" ${currentQuestionIndex === 0 ? "disabled" : ""}>Fyrri</button>
        <button id="next" ${currentQuestionIndex === questions.length - 1 ? "disabled" : ""}>Næsta</button>
      </div>
    </section>
  `;

  // Takki til að sýna/fela svarið
  const toggleBtn = document.getElementById("toggleAnswer");
  const answerEl = document.getElementById("answer");
  toggleBtn.addEventListener("click", () => {
    const showing = answerEl.style.display === "block";
    answerEl.style.display = showing ? "none" : "block";
    toggleBtn.textContent = showing ? "Sýna svar" : "Fela svar";
  });

  // Takkaevent fyrir næsta/fyrri
  document.getElementById("prev").addEventListener("click", prevQuestion);
  document.getElementById("next").addEventListener("click", nextQuestion);

  // Vista stöðu
  localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

// Byrjar á forsíðu
showHome();
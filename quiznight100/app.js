import { categories } from "./data.js";
import {
  STORAGE_KEY,
  QUESTIONS_PER_ROUND,
  calculateScores,
  createInitialState,
  getCurrentRoundIndex,
  getPerformanceTitle,
  getRoundProgress,
  questions,
  serializeShareText,
  shouldShowRoundComplete,
  validateSavedState
} from "./state.js";

const app = document.querySelector("#app");
const scoreDisplay = document.querySelector("#scoreDisplay");
const roundDisplay = document.querySelector("#roundDisplay");
const progressDisplay = document.querySelector("#progressDisplay");
const resetButton = document.querySelector("#resetButton");
const confirmDialog = document.querySelector("#confirmDialog");
const confirmReset = document.querySelector("#confirmReset");
const cancelReset = document.querySelector("#cancelReset");
const letters = ["A", "B", "C", "D"];

let state = loadState();

function loadState() {
  try {
    return validateSavedState(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  } catch {
    return createInitialState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setState(nextState) {
  state = validateSavedState({ ...state, ...nextState });
  saveState();
  render();
}

function hasSavedProgress() {
  return state.answers.some((answer) => answer !== null) || state.screen !== "home";
}

function answeredCount() {
  return state.answers.filter((answer) => answer !== null).length;
}

function updateChrome() {
  const scores = calculateScores(state);
  const round = Math.min(getCurrentRoundIndex(state) + 1, categories.length);
  scoreDisplay.textContent = scores.total;
  roundDisplay.textContent = state.screen === "home" ? "0/5" : `${round}/5`;
  progressDisplay.textContent = `${answeredCount()}/50`;
  resetButton.hidden = !hasSavedProgress();
}

function render() {
  updateChrome();
  app.dataset.screen = state.screen;

  if (state.screen === "final") {
    renderFinal();
    return;
  }

  if (state.screen === "round") {
    renderRoundComplete();
    return;
  }

  if (state.screen === "question") {
    renderQuestion();
    return;
  }

  renderHome();
}

function renderHome() {
  const saved = hasSavedProgress();
  app.innerHTML = `
    <section class="view hero-view">
      <div class="hero-copy">
        <p class="kicker">Five rounds. One room. No answer leaks.</p>
        <h1>QUIZ NIGHT 100</h1>
        <p class="lede">A 50-question table quiz built for phones, laptops, and score-checking between rounds.</p>
        <div class="hero-facts" aria-label="Quiz format">
          <span>50 Questions</span>
          <span>5 Rounds</span>
          <span>1 Point Per Question</span>
        </div>
        <div class="hero-actions">
          ${
            saved
              ? `<button class="primary-button" type="button" data-action="continue">Continue Quiz</button>
                 <button class="secondary-button" type="button" data-action="restart">Start Again</button>`
              : `<button class="primary-button" type="button" data-action="start">Start Quiz</button>`
          }
        </div>
      </div>
      <div class="category-board" aria-label="Quiz categories">
        ${categories.map((category, index) => categoryCard(category, index)).join("")}
      </div>
    </section>
  `;
}

function categoryCard(category, index) {
  return `
    <article class="category-card" data-theme="${category.theme}">
      <span class="round-number">Round ${index + 1}</span>
      <h2>${category.title}</h2>
      <p>${category.tone}</p>
    </article>
  `;
}

function renderQuestion() {
  const question = questions[state.currentIndex];
  const category = categories[question.categoryIndex];
  const progress = getRoundProgress(state);
  const selected = state.selectedIndex;
  const isCommitted = state.committed;
  const score = calculateScores(state);

  app.innerHTML = `
    <section class="view question-view" data-theme="${category.theme}">
      <div class="question-panel">
        <div class="question-meta">
          <span>${category.title}</span>
          <span>Question ${progress.roundQuestionIndex + 1} of ${QUESTIONS_PER_ROUND}</span>
        </div>
        <div class="progress-track" aria-label="Overall progress">
          <span style="width:${(answeredCount() / questions.length) * 100}%"></span>
        </div>
        <p class="global-progress">Overall progress ${answeredCount()} / ${questions.length}</p>
        <h1>${question.text}</h1>
        <div class="answer-grid" role="radiogroup" aria-label="Answer options">
          ${question.options
            .map((option, index) => answerButton(question, option, index, selected, isCommitted))
            .join("")}
        </div>
        <div class="submit-row">
          ${
            isCommitted
              ? `<button class="primary-button" type="button" data-action="next">${nextButtonLabel()}</button>`
              : `<button class="primary-button" type="button" data-action="submit" ${selected === null ? "disabled" : ""}>Lock Answer</button>`
          }
          <span class="mini-score">Score ${score.total} / ${score.possible}</span>
        </div>
      </div>
      <aside class="round-side">
        <span class="side-label">Round ${question.categoryIndex + 1}</span>
        <h2>${category.shortTitle}</h2>
        <ol class="dot-map" aria-label="Round question progress">
          ${Array.from({ length: QUESTIONS_PER_ROUND }, (_, index) => {
            const global = question.categoryIndex * QUESTIONS_PER_ROUND + index;
            const answer = state.answers[global];
            const marker = answer === null ? "" : answer === questions[global].answerIndex ? "is-correct" : "is-wrong";
            return `<li class="${index === progress.roundQuestionIndex ? "is-current" : ""} ${marker}"><span>${index + 1}</span></li>`;
          }).join("")}
        </ol>
      </aside>
      ${
        isCommitted
          ? `<div class="feedback ${selected === question.answerIndex ? "correct" : "wrong"}" role="status">
              <strong>${selected === question.answerIndex ? "Correct" : "Incorrect"}</strong>
              <p>The answer is <b>${question.options[question.answerIndex]}</b>. ${question.explanation}</p>
            </div>`
          : ""
      }
    </section>
  `;
}

function answerButton(question, option, index, selected, isCommitted) {
  const isSelected = selected === index;
  const isCorrect = question.answerIndex === index;
  const classes = ["answer-button"];
  if (isSelected) classes.push("is-selected");
  if (isCommitted && isCorrect) classes.push("is-correct");
  if (isCommitted && isSelected && !isCorrect) classes.push("is-wrong");

  return `
    <button
      class="${classes.join(" ")}"
      type="button"
      role="radio"
      aria-checked="${isSelected}"
      data-action="select"
      data-index="${index}"
      ${isCommitted ? "disabled" : ""}
    >
      <span class="answer-letter">${letters[index]}</span>
      <span>${option}</span>
    </button>
  `;
}

function nextButtonLabel() {
  const nextIndex = state.currentIndex + 1;
  if (nextIndex >= questions.length) return "View Final Results";
  if (shouldShowRoundComplete(nextIndex)) return "View Round Score";
  return "Next Question";
}

function renderRoundComplete() {
  const completedRound = Math.max(0, getCurrentRoundIndex(state) - 1);
  const category = categories[completedRound];
  const scores = calculateScores(state);
  const totalPossible = (completedRound + 1) * QUESTIONS_PER_ROUND;

  app.innerHTML = `
    <section class="view score-view" data-theme="${category.theme}">
      <div class="score-copy">
        <p class="kicker">Round ${completedRound + 1} complete</p>
        <h1>${category.title} Complete</h1>
        <div class="score-lockup">
          <span>Section score</span>
          <strong>${scores.sectionScores[completedRound]} / 10</strong>
        </div>
        <div class="score-row">
          <span>Total score so far</span>
          <b>${scores.total} / ${totalPossible}</b>
        </div>
        <button class="primary-button" type="button" data-action="continue-round">Continue to Next Round</button>
      </div>
      <div class="round-podium">
        <span>${scores.sectionScores[completedRound]}</span>
        <p>${category.shortTitle} round score</p>
      </div>
    </section>
  `;
}

function renderFinal() {
  const scores = calculateScores(state);
  const title = getPerformanceTitle(scores.total);

  app.innerHTML = `
    <section class="view final-view">
      <div class="final-art" aria-hidden="true">
        <img src="/quiznight100/assets/quiznight100-trophy.png" alt="" />
      </div>
      <div class="final-copy">
        <p class="kicker">Quiz complete</p>
        <h1>QUIZ COMPLETE</h1>
        <div class="final-score" aria-label="Final score">
          <span>Final score</span>
          <strong>${scores.total} / 50</strong>
        </div>
        <p class="performance-title">${title}</p>
        <div class="breakdown" aria-label="Category score breakdown">
          ${categories
            .map(
              (category, index) => `
                <div>
                  <span>${category.title}</span>
                  <b>${scores.sectionScores[index]} / 10</b>
                </div>
              `
            )
            .join("")}
        </div>
        <div class="button-row">
          <button class="primary-button" type="button" data-action="share">Share Result</button>
          <button class="secondary-button" type="button" data-action="restart">Play Again</button>
        </div>
        <p class="share-status" id="shareStatus" aria-live="polite"></p>
      </div>
    </section>
  `;
}

function submitAnswer() {
  if (state.committed || state.selectedIndex === null) return;
  const nextAnswers = [...state.answers];
  nextAnswers[state.currentIndex] = state.selectedIndex;
  setState({ answers: nextAnswers, committed: true });
}

function advance() {
  if (!state.committed) return;
  const nextIndex = state.currentIndex + 1;

  if (nextIndex >= questions.length) {
    setState({ screen: "final", completedAt: new Date().toISOString() });
    return;
  }

  setState({
    screen: shouldShowRoundComplete(nextIndex) ? "round" : "question",
    currentIndex: nextIndex,
    selectedIndex: null,
    committed: false
  });
}

function resetQuiz() {
  localStorage.removeItem(STORAGE_KEY);
  state = createInitialState();
  closeResetDialog();
  render();
}

function openResetDialog() {
  confirmDialog.hidden = false;
  confirmReset.focus();
}

function closeResetDialog() {
  confirmDialog.hidden = true;
  resetButton.focus({ preventScroll: true });
}

async function shareResult() {
  const text = serializeShareText(state);
  const status = document.querySelector("#shareStatus");

  try {
    if (navigator.share) {
      await navigator.share({ title: "Quiz Night 100 result", text });
      status.textContent = "Result shared.";
      return;
    }

    await navigator.clipboard.writeText(text);
    status.textContent = "Result copied to clipboard.";
  } catch {
    status.textContent = "Sharing was cancelled or unavailable.";
  }
}

app.addEventListener("click", (event) => {
  const control = event.target.closest("button[data-action]");
  if (!control) return;

  const action = control.dataset.action;
  if (action === "start") {
    setState({ ...createInitialState(), screen: "question" });
  }
  if (action === "continue") {
    setState({ screen: state.completedAt ? "final" : "question" });
  }
  if (action === "restart") {
    openResetDialog();
  }
  if (action === "select" && !state.committed) {
    setState({ selectedIndex: Number(control.dataset.index) });
  }
  if (action === "submit") {
    submitAnswer();
  }
  if (action === "next") {
    advance();
  }
  if (action === "continue-round") {
    setState({ screen: "question" });
  }
  if (action === "share") {
    shareResult();
  }
});

app.addEventListener("keydown", (event) => {
  const keyNumber = Number(event.key);
  if (state.screen !== "question" || state.committed || !Number.isInteger(keyNumber) || keyNumber < 1 || keyNumber > 4) {
    return;
  }
  setState({ selectedIndex: keyNumber - 1 });
});

resetButton.addEventListener("click", openResetDialog);
confirmReset.addEventListener("click", resetQuiz);
cancelReset.addEventListener("click", closeResetDialog);
confirmDialog.addEventListener("click", (event) => {
  if (event.target === confirmDialog) closeResetDialog();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !confirmDialog.hidden) closeResetDialog();
});

render();

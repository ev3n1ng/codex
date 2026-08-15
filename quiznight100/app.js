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

// Small original line-icon set, one per category "theme" (see data.js).
// The Harry Potter icon is a generic open-book-plus-spark motif — no
// wands, lightning bolts, glasses, or other franchise-specific imagery.
const ICONS = {
  showtime:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M3.7 12h16.6M12 3.5c2.6 2.3 4 5.2 4 8.5s-1.4 6.2-4 8.5c-2.6-2.3-4-5.2-4-8.5s1.4-6.2 4-8.5z"/></svg>',
  archive:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.5h12M6 20.5h12M7 3.5c0 4 3 5.5 5 6.5-2 1-5 2.5-5 6.5m10-13c0 4-3 5.5-5 6.5 2 1 5 2.5 5 6.5"/></svg>',
  lantern:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.5c-1.6-1.2-3.8-1.6-6-1.2v12c2.2-.4 4.4 0 6 1.2 1.6-1.2 3.8-1.6 6-1.2v-12c-2.2-.4-4.4 0-6 1.2z"/><path d="M12 6.5v12"/><path d="M18.5 3.2l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5z"/></svg>',
  biology:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c0-7.5 5-13 14-13-.5 8.5-6 13.5-14 13z"/><path d="M6 18c4-4 7-7 12-11"/></svg>',
  arcade:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="8" width="19" height="10" rx="5"/><path d="M7.5 11v4M5.5 13h4"/><circle cx="16" cy="11.5" r="1"/><circle cx="18.5" cy="14" r="1"/></svg>'
};

const CHECK_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6"/></svg>';
const CROSS_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5l14 14M19 5L5 19"/></svg>';

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
        <h1 class="hero-title">
          <span class="hero-title-word">Quiz Night</span>
          <span class="hero-title-number">100</span>
        </h1>
        <p class="lede">A 50-question table quiz built for phones, laptops, and score-checking between rounds.</p>
        <p class="hero-stats" aria-label="Quiz format: 50 questions, 5 rounds, 1 point each">50 Questions<i aria-hidden="true">&middot;</i>5 Rounds<i aria-hidden="true">&middot;</i>1 Point Each</p>
        <div class="hero-actions">
          ${
            saved
              ? `<button class="primary-button" type="button" data-action="continue">Continue Quiz</button>
                 <button class="secondary-button" type="button" data-action="restart">Start Again</button>`
              : `<button class="primary-button" type="button" data-action="start">Start Quiz</button>`
          }
        </div>
      </div>
      <ol class="lineup" aria-label="Quiz categories">
        ${categories.map((category, index) => lineupRow(category, index)).join("")}
      </ol>
    </section>
  `;
}

function lineupRow(category, index) {
  const num = String(index + 1).padStart(2, "0");
  return `
    <li class="lineup-row" data-cat="${category.theme}">
      <span class="lineup-num" aria-hidden="true">${num}</span>
      <div class="lineup-body">
        <span class="lineup-eyebrow">Round ${index + 1}</span>
        <h2><span class="mark" aria-hidden="true">${ICONS[category.theme] || ""}</span>${category.title}</h2>
        <p>${category.tone}</p>
      </div>
    </li>
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
        <div class="round-header">
          <span class="round-chip">${ICONS[category.theme] || ""}Round ${question.categoryIndex + 1} — ${category.title}</span>
          <span class="question-count">Question ${progress.roundQuestionIndex + 1} of ${QUESTIONS_PER_ROUND}</span>
        </div>
        <ol class="round-ticks" aria-label="Round ${question.categoryIndex + 1} progress">
          ${Array.from({ length: QUESTIONS_PER_ROUND }, (_, index) => {
            const global = question.categoryIndex * QUESTIONS_PER_ROUND + index;
            const answer = state.answers[global];
            const marker = answer === null ? "" : answer === questions[global].answerIndex ? "is-correct" : "is-wrong";
            const current = index === progress.roundQuestionIndex ? "is-current" : "";
            return `<li class="${current} ${marker}"></li>`;
          }).join("")}
        </ol>
        <h1 class="question-text">${question.text}</h1>
        <div class="answer-grid" role="radiogroup" aria-label="Answer options">
          ${question.options
            .map((option, index) => answerCard(question, option, index, selected, isCommitted))
            .join("")}
        </div>
        <div class="question-footer">
          ${
            isCommitted
              ? `<button class="primary-button" type="button" data-action="next">${nextButtonLabel()}</button>`
              : `<button class="primary-button" type="button" data-action="submit" ${selected === null ? "disabled" : ""}>Lock Answer</button>`
          }
          <span class="mini-score">Score ${score.total} / ${score.possible} &middot; Overall ${answeredCount()} / ${questions.length}</span>
        </div>
        ${
          isCommitted
            ? `<div class="feedback ${selected === question.answerIndex ? "" : "wrong"}" role="status">
                <span class="feedback-icon" aria-hidden="true">${selected === question.answerIndex ? CHECK_ICON : CROSS_ICON}</span>
                <div>
                  <strong>${selected === question.answerIndex ? "Correct" : "Incorrect"}</strong>
                  <p>The answer is <b>${question.options[question.answerIndex]}</b>. ${question.explanation}</p>
                </div>
              </div>`
            : ""
        }
      </div>
    </section>
  `;
}

function answerCard(question, option, index, selected, isCommitted) {
  const isSelected = selected === index;
  const isCorrect = question.answerIndex === index;
  const classes = ["answer-card"];
  if (isSelected) classes.push("is-selected");
  if (isCommitted && isCorrect) classes.push("is-correct");
  if (isCommitted && isSelected && !isCorrect) classes.push("is-wrong");
  const showResult = isCommitted && (isCorrect || (isSelected && !isCorrect));

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
      <span class="answer-letter" aria-hidden="true">${letters[index]}</span>
      <span class="answer-text">${option}</span>
      <span class="answer-result" aria-hidden="true">${showResult ? (isCorrect ? CHECK_ICON : CROSS_ICON) : ""}</span>
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
  const nextCategory = categories[completedRound + 1];
  const scores = calculateScores(state);
  const totalPossible = (completedRound + 1) * QUESTIONS_PER_ROUND;
  const roundScore = scores.sectionScores[completedRound];

  app.innerHTML = `
    <section class="view score-view" data-theme="${category.theme}">
      <div class="score-stage">
        <p class="kicker">Round ${completedRound + 1} Complete</p>
        <h1>${category.title}</h1>
        <div class="score-reveal">
          <strong class="score-number" data-count-to="${roundScore}">0</strong><span class="score-of">/ 10</span>
        </div>
        <p class="score-caption">Round score</p>
        <div class="total-row">
          <span>Total score so far</span>
          <b>${scores.total} / ${totalPossible}</b>
        </div>
        ${
          nextCategory
            ? `<div class="next-round" data-cat="${nextCategory.theme}">
                <span class="lineup-eyebrow">Next Round</span>
                <div class="lineup-body">
                  <h2><span class="mark" aria-hidden="true">${ICONS[nextCategory.theme] || ""}</span>${nextCategory.title}</h2>
                  <p>${nextCategory.tone}</p>
                </div>
              </div>`
            : ""
        }
        <div class="button-row" style="margin-top:26px;justify-content:center">
          <button class="primary-button" type="button" data-action="continue-round">Continue to ${nextCategory ? nextCategory.title : "Results"}</button>
        </div>
      </div>
    </section>
  `;

  animateCountUp(app.querySelector(".score-number"));
}

function renderFinal() {
  const scores = calculateScores(state);
  const title = getPerformanceTitle(scores.total);

  app.innerHTML = `
    <section class="view final-view">
      <div class="final-stage">
        <p class="kicker">Quiz Complete</p>
        <h1>QUIZ COMPLETE</h1>
        <div class="final-reveal" aria-label="Final score">
          <strong class="final-number" data-count-to="${scores.total}">0</strong><span class="final-of">/ 50</span>
        </div>
        <p class="performance-title">${title}</p>
        <ol class="breakdown" aria-label="Category score breakdown">
          ${categories
            .map((category, index) => {
              const catScore = scores.sectionScores[index];
              return `
                <li data-cat="${category.theme}">
                  <span class="breakdown-mark" aria-hidden="true">${ICONS[category.theme] || ""}</span>
                  <span class="breakdown-name">${category.title}</span>
                  <b class="breakdown-score">${catScore} / 10</b>
                  <span class="breakdown-bar"><span style="width:${catScore * 10}%"></span></span>
                </li>
              `;
            })
            .join("")}
        </ol>
        <div class="button-row" style="justify-content:center">
          <button class="primary-button" type="button" data-action="share">Share Result</button>
          <button class="secondary-button" type="button" data-action="restart">Play Again</button>
        </div>
        <p class="share-status" id="shareStatus" aria-live="polite"></p>
      </div>
    </section>
  `;

  animateCountUp(app.querySelector(".final-number"));
}

function animateCountUp(el) {
  if (!el) return;
  const target = Number(el.dataset.countTo) || 0;
  if (target === 0 || prefersReducedMotion()) {
    el.textContent = target;
    return;
  }

  const duration = 650;
  const start = performance.now();

  function tick(now) {
    const elapsed = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    el.textContent = Math.round(eased * target);
    if (elapsed < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
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

import { QUIZ_VERSION, categories } from "./data.js";

export const STORAGE_KEY = "quiznight100.progress.v1";
export const QUESTIONS_PER_ROUND = 10;

export function flattenQuestions(source = categories) {
  return source.flatMap((category, categoryIndex) =>
    category.questions.map((question, questionIndex) => ({
      ...question,
      categoryId: category.id,
      categoryTitle: category.title,
      categoryIndex,
      questionIndex,
      globalIndex: categoryIndex * QUESTIONS_PER_ROUND + questionIndex
    }))
  );
}

export const questions = flattenQuestions();

export function createInitialState() {
  return {
    version: QUIZ_VERSION,
    screen: "home",
    currentIndex: 0,
    selectedIndex: null,
    committed: false,
    answers: Array(questions.length).fill(null),
    completedAt: null
  };
}

export function validateSavedState(value) {
  if (!value || typeof value !== "object" || value.version !== QUIZ_VERSION) {
    return createInitialState();
  }

  const initial = createInitialState();
  const currentIndex = Number.isInteger(value.currentIndex)
    ? Math.min(Math.max(value.currentIndex, 0), questions.length - 1)
    : 0;
  const answers = Array.isArray(value.answers)
    ? initial.answers.map((_, index) => normalizeAnswer(value.answers[index]))
    : initial.answers;
  const selectedIndex = normalizeAnswer(value.selectedIndex);
  const allowedScreens = new Set(["home", "question", "round", "final"]);

  return {
    ...initial,
    screen: allowedScreens.has(value.screen) ? value.screen : initial.screen,
    currentIndex,
    selectedIndex,
    committed: Boolean(value.committed && selectedIndex !== null),
    answers,
    completedAt: typeof value.completedAt === "string" ? value.completedAt : null
  };
}

export function normalizeAnswer(value) {
  return Number.isInteger(value) && value >= 0 && value < 4 ? value : null;
}

export function isAnswerCorrect(question, answerIndex) {
  return Number.isInteger(answerIndex) && answerIndex === question.answerIndex;
}

export function calculateScores(state, sourceQuestions = questions, sourceCategories = categories) {
  const sectionScores = sourceCategories.map(() => 0);
  let total = 0;

  sourceQuestions.forEach((question, index) => {
    if (isAnswerCorrect(question, state.answers[index])) {
      total += 1;
      sectionScores[question.categoryIndex] += 1;
    }
  });

  return {
    total,
    sectionScores,
    answered: state.answers.filter((answer) => answer !== null).length,
    possible: sourceQuestions.length
  };
}

export function getCurrentRoundIndex(state) {
  return Math.floor(state.currentIndex / QUESTIONS_PER_ROUND);
}

export function getRoundProgress(state) {
  const roundIndex = getCurrentRoundIndex(state);
  const roundStart = roundIndex * QUESTIONS_PER_ROUND;
  return {
    roundIndex,
    roundQuestionIndex: state.currentIndex - roundStart,
    roundStart,
    roundEnd: roundStart + QUESTIONS_PER_ROUND - 1
  };
}

export function shouldShowRoundComplete(nextIndex) {
  return nextIndex > 0 && nextIndex < questions.length && nextIndex % QUESTIONS_PER_ROUND === 0;
}

export function getPerformanceTitle(score) {
  if (score === 50) return "Perfect Score";
  if (score >= 46) return "Quiz Night Legend";
  if (score >= 41) return "Trivia Expert";
  if (score >= 31) return "Quiz Master";
  if (score >= 21) return "Knowledge Hunter";
  if (score >= 11) return "Casual Contender";
  return "Quiz Apprentice";
}

export function serializeShareText(state) {
  const scores = calculateScores(state);
  const breakdown = categories
    .map((category, index) => `${category.title}: ${scores.sectionScores[index]}/10`)
    .join("\n");

  return `QUIZ NIGHT 100\nFinal score: ${scores.total}/50\n${getPerformanceTitle(scores.total)}\n\n${breakdown}\n\nPlay: https://albertoscott.co.uk/quiznight100/`;
}

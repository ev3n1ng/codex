import assert from "node:assert/strict";
import { test } from "node:test";
import { categories, QUIZ_VERSION } from "../data.js";
import {
  QUESTIONS_PER_ROUND,
  calculateScores,
  createInitialState,
  flattenQuestions,
  getPerformanceTitle,
  serializeShareText,
  shouldShowRoundComplete,
  validateSavedState
} from "../state.js";

const questions = flattenQuestions(categories);

test("quiz data has exactly five rounds and fifty valid questions", () => {
  assert.equal(categories.length, 5);
  assert.equal(questions.length, 50);

  for (const category of categories) {
    assert.equal(category.questions.length, 10, category.title);
    for (const question of category.questions) {
      assert.equal(question.options.length, 4, question.text);
      assert.equal(new Set(question.options).size, 4, question.text);
      assert.ok(Number.isInteger(question.answerIndex));
      assert.ok(question.answerIndex >= 0 && question.answerIndex < 4);
      assert.ok(question.text.length > 20);
      assert.ok(question.explanation.length > 20);
    }
  }

  assert.equal(new Set(questions.map((question) => question.text)).size, 50);
});

test("correct answer positions are deliberately balanced", () => {
  const counts = [0, 0, 0, 0];
  questions.forEach((question) => {
    counts[question.answerIndex] += 1;
  });

  counts.forEach((count) => {
    assert.ok(count >= 9 && count <= 16, `answer count ${count} is too uneven`);
  });
});

test("score calculations and round transitions work", () => {
  const state = createInitialState();
  const perfectAnswers = questions.map((question) => question.answerIndex);
  const perfect = { ...state, answers: perfectAnswers };

  assert.deepEqual(calculateScores(state).sectionScores, [0, 0, 0, 0, 0]);
  assert.equal(calculateScores(perfect).total, 50);
  assert.deepEqual(calculateScores(perfect).sectionScores, [10, 10, 10, 10, 10]);

  assert.equal(QUESTIONS_PER_ROUND, 10);
  assert.equal(shouldShowRoundComplete(10), true);
  assert.equal(shouldShowRoundComplete(20), true);
  assert.equal(shouldShowRoundComplete(50), false);
});

test("saved state validation handles corruption and clamps values", () => {
  assert.deepEqual(validateSavedState(null), createInitialState());
  assert.deepEqual(validateSavedState({ version: QUIZ_VERSION + 1 }), createInitialState());

  const restored = validateSavedState({
    version: QUIZ_VERSION,
    screen: "question",
    currentIndex: 999,
    selectedIndex: 7,
    committed: true,
    answers: [0, 1, 9, "bad"]
  });

  assert.equal(restored.currentIndex, 49);
  assert.equal(restored.selectedIndex, null);
  assert.equal(restored.committed, false);
  assert.deepEqual(restored.answers.slice(0, 4), [0, 1, null, null]);
});

test("performance titles and share text do not reveal answers", () => {
  assert.equal(getPerformanceTitle(0), "Quiz Apprentice");
  assert.equal(getPerformanceTitle(50), "Perfect Score");

  const state = { ...createInitialState(), answers: questions.map((question) => question.answerIndex) };
  const shareText = serializeShareText(state);
  assert.match(shareText, /Final score: 50\/50/);
  assert.match(shareText, /Gaming: 10\/10/);
  assert.doesNotMatch(shareText, /Expelliarmus|Teotihuacan|Helicase|Foveated rendering/);
});

const quizData = [
  {
    title: "Harry Potter",
    intro: "Wands up for a round of castle lore, spells, creatures, and sharp memory.",
    accent: "lime",
    questions: [
      {
        prompt: "What is the name of the spell used to disarm an opponent?",
        options: ["Alohomora", "Expelliarmus", "Stupefy", "Lumos"],
        answer: 1,
        note: "Expelliarmus is the Disarming Charm, and Harry uses it constantly."
      },
      {
        prompt: "Which house is Luna Lovegood sorted into?",
        options: ["Hufflepuff", "Gryffindor", "Ravenclaw", "Slytherin"],
        answer: 2,
        note: "Luna is a Ravenclaw, which feels right for someone that singular."
      },
      {
        prompt: "What creature is Buckbeak?",
        options: ["Hippogriff", "Thestral", "Basilisk", "Phoenix"],
        answer: 0,
        note: "Buckbeak is a proud hippogriff. Bow first, always."
      },
      {
        prompt: "What platform does the Hogwarts Express leave from?",
        options: ["7 1/2", "8 3/4", "9 3/4", "10 1/2"],
        answer: 2,
        note: "Platform 9 3/4 sits between platforms 9 and 10 at King's Cross."
      },
      {
        prompt: "Who is the Half-Blood Prince?",
        options: ["Remus Lupin", "Sirius Black", "Severus Snape", "Tom Riddle"],
        answer: 2,
        note: "The annotated Potions book belongs to Severus Snape."
      }
    ]
  },
  {
    title: "Survival Skills",
    intro: "Practical instincts, wilderness judgement, and a few choices you really want to get right.",
    accent: "blue",
    questions: [
      {
        prompt: "If you are lost in the wilderness, what is usually the safest first move?",
        options: ["Run downhill", "Stay put and assess", "Drink from any stream", "Travel at night"],
        answer: 1,
        note: "Stopping, calming down, and assessing your situation prevents compounding mistakes."
      },
      {
        prompt: "Which shelter principle matters most in cold conditions?",
        options: ["Maximum headroom", "Insulation from the ground", "Open airflow", "A decorative entrance"],
        answer: 1,
        note: "The ground steals heat quickly, so insulation underneath you is crucial."
      },
      {
        prompt: "What is the international distress signal using repeated signals?",
        options: ["Three of anything", "Five of anything", "Seven of anything", "Ten of anything"],
        answer: 0,
        note: "Three whistle blasts, fires, flashes, or shouts can indicate distress."
      },
      {
        prompt: "Which water treatment is generally reliable against many pathogens?",
        options: ["Letting it stand", "Boiling it", "Adding salt", "Filtering through leaves"],
        answer: 1,
        note: "Boiling is one of the most reliable field methods for making water safer."
      },
      {
        prompt: "What should you do if you see lightning and hear thunder almost immediately?",
        options: ["Stand by a tree", "Get to low shelter", "Hold metal high", "Lie flat in water"],
        answer: 1,
        note: "Immediate thunder means the storm is close. Get to a safer low shelter quickly."
      }
    ]
  },
  {
    title: "Crazy Laws from Around the World",
    intro: "Odd statutes, strange civic rules, and legal trivia that sounds invented.",
    accent: "coral",
    questions: [
      {
        prompt: "In Singapore, what everyday item is famously restricted in public sale?",
        options: ["Chewing gum", "Umbrellas", "Postcards", "Toothpicks"],
        answer: 0,
        note: "Singapore restricts chewing gum sales, with exceptions for some therapeutic gum."
      },
      {
        prompt: "In Venice, Italy, visitors can be fined for feeding which birds in St Mark's Square?",
        options: ["Swans", "Pigeons", "Ravens", "Peacocks"],
        answer: 1,
        note: "Feeding pigeons in St Mark's Square has been banned to protect buildings and hygiene."
      },
      {
        prompt: "In Switzerland, which noisy household act is often restricted late at night in apartment rules?",
        options: ["Vacuuming", "Reading", "Knitting", "Writing letters"],
        answer: 0,
        note: "Noise rules and rental regulations can make late-night vacuuming a bad idea."
      },
      {
        prompt: "In Thailand, it is illegal to step on what item because it bears the monarch's image?",
        options: ["A coin or banknote", "A train ticket", "A passport stamp", "A restaurant bill"],
        answer: 0,
        note: "Thai currency depicts the monarch, so stepping on it is disrespectful and unlawful."
      },
      {
        prompt: "In parts of Australia, which road rule can surprise tourists?",
        options: ["Drive on the right", "No seatbelts needed", "No phone use while driving", "Cars must be red"],
        answer: 2,
        note: "Strict mobile phone driving rules catch plenty of visitors off guard."
      }
    ]
  },
  {
    title: "Interesting Books",
    intro: "A literary pass through famous openings, authors, genres, and shelves worth remembering.",
    accent: "violet",
    questions: [
      {
        prompt: "Who wrote 'The Hitchhiker's Guide to the Galaxy'?",
        options: ["Terry Pratchett", "Douglas Adams", "Neil Gaiman", "Isaac Asimov"],
        answer: 1,
        note: "Douglas Adams turned cosmic absurdity into a whole literary operating system."
      },
      {
        prompt: "Which novel begins with the line 'Call me Ishmael'?",
        options: ["Moby-Dick", "The Old Man and the Sea", "Treasure Island", "Robinson Crusoe"],
        answer: 0,
        note: "That famous opening belongs to Herman Melville's Moby-Dick."
      },
      {
        prompt: "Which author created Hercule Poirot?",
        options: ["Dorothy L. Sayers", "Agatha Christie", "Arthur Conan Doyle", "P. D. James"],
        answer: 1,
        note: "Agatha Christie created Poirot, one of detective fiction's grand fixtures."
      },
      {
        prompt: "What genre is Mary Shelley's 'Frankenstein' often considered to have helped pioneer?",
        options: ["Science fiction", "Travel writing", "Romantic comedy", "Spy thriller"],
        answer: 0,
        note: "Frankenstein is often cited as an early landmark of science fiction."
      },
      {
        prompt: "Which book features the land of Narnia?",
        options: ["The Golden Compass", "The Lion, the Witch and the Wardrobe", "A Wizard of Earthsea", "Stardust"],
        answer: 1,
        note: "C. S. Lewis opens the wardrobe door in The Lion, the Witch and the Wardrobe."
      }
    ]
  },
  {
    title: "General Knowledge",
    intro: "A final mixed round: geography, science, culture, and facts that reward the sharpest table.",
    accent: "paper",
    questions: [
      {
        prompt: "What is the largest planet in our solar system?",
        options: ["Earth", "Saturn", "Jupiter", "Neptune"],
        answer: 2,
        note: "Jupiter is the largest planet by a wide margin."
      },
      {
        prompt: "Which country is home to the city of Marrakech?",
        options: ["Morocco", "Egypt", "Jordan", "Tunisia"],
        answer: 0,
        note: "Marrakech is one of Morocco's best-known cities."
      },
      {
        prompt: "What is the chemical symbol for gold?",
        options: ["Ag", "Gd", "Au", "Go"],
        answer: 2,
        note: "Gold's symbol is Au, from the Latin aurum."
      },
      {
        prompt: "Which instrument has keys, pedals, and strings?",
        options: ["Cello", "Piano", "Trumpet", "Clarinet"],
        answer: 1,
        note: "A piano has keys, pedals, and strings struck by hammers."
      },
      {
        prompt: "How many sides does a dodecagon have?",
        options: ["10", "11", "12", "20"],
        answer: 2,
        note: "A dodecagon has twelve sides."
      }
    ]
  }
];

const state = {
  screen: "home",
  sectionIndex: 0,
  questionIndex: 0,
  selectedAnswer: null,
  score: 0,
  sectionScores: quizData.map(() => 0)
};

const app = document.querySelector("#app");
const scoreDisplay = document.querySelector("#scoreDisplay");
const roundDisplay = document.querySelector("#roundDisplay");
const questionDisplay = document.querySelector("#questionDisplay");

const totalQuestions = quizData.reduce((sum, section) => sum + section.questions.length, 0);
const letters = ["A", "B", "C", "D"];

function getGlobalQuestionNumber() {
  return (
    quizData.slice(0, state.sectionIndex).reduce((sum, section) => sum + section.questions.length, 0) +
    state.questionIndex +
    1
  );
}

function updateStatus() {
  scoreDisplay.textContent = state.score;
  roundDisplay.textContent =
    state.screen === "home" ? `0/${quizData.length}` : `${Math.min(state.sectionIndex + 1, quizData.length)}/${quizData.length}`;
  questionDisplay.textContent =
    state.screen === "home" ? `0/${totalQuestions}` : `${Math.min(getGlobalQuestionNumber(), totalQuestions)}/${totalQuestions}`;
}

function sectionAccent(section) {
  const accents = {
    lime: "var(--lime)",
    blue: "var(--blue)",
    coral: "var(--coral)",
    violet: "var(--violet)",
    paper: "var(--paper)"
  };

  return accents[section.accent] || "var(--lime)";
}

function expressiveTitle(title) {
  const words = title.split(" ");
  if (words.length === 1) return title;
  return `${words[0]} <em>${words.slice(1).join(" ")}</em>`;
}

function sectionMap() {
  return `
    <div class="section-map" aria-label="Round progress">
      ${quizData
        .map((section, index) => {
          const complete = index < state.sectionIndex || state.screen === "results";
          const active = index === state.sectionIndex && state.screen !== "results";
          return `
            <div class="section-pill ${complete ? "is-complete" : ""} ${active ? "is-active" : ""}">
              <small>${String(index + 1).padStart(2, "0")}</small>
              <strong>${section.title}</strong>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function setView(html) {
  app.innerHTML = html;
  updateStatus();
}

function renderHome() {
  state.screen = "home";
  setView(`
    <div class="view hero-grid">
      <div>
        <span class="kicker">Live table quiz</span>
        <h1 class="mega-title">Quiz <em>Night</em></h1>
        <p class="lead">Five themed rounds, one question at a time, instant scoring, and a final scoreboard worthy of the winning table.</p>
        ${sectionMap()}
      </div>
      <aside class="panel launch-panel">
        <ul class="launch-list">
          <li><span>Rounds</span><strong>${quizData.length}</strong></li>
          <li><span>Questions</span><strong>${totalQuestions}</strong></li>
          <li><span>Format</span><strong>Multiple choice</strong></li>
          <li><span>Scoring</span><strong>1 point each</strong></li>
        </ul>
        <div class="button-row">
          <button class="btn primary" type="button" data-action="start">Start Quiz</button>
        </div>
      </aside>
    </div>
  `);
}

function renderSectionIntro() {
  state.screen = "section";
  const section = quizData[state.sectionIndex];
  const sectionTotal = section.questions.length;
  setView(`
    <div class="view round-grid" style="--round-accent: ${sectionAccent(section)}">
      <div>
        <span class="kicker">Round ${String(state.sectionIndex + 1).padStart(2, "0")}</span>
        <h2 class="round-title">${expressiveTitle(section.title)}</h2>
        <p class="lead">${section.intro}</p>
        <div class="round-meta">
          <span class="tag">${sectionTotal} questions</span>
          <span class="tag">Score ${state.score}/${totalQuestions}</span>
          <span class="tag">${totalQuestions - getGlobalQuestionNumber() + 1} questions left</span>
        </div>
      </div>
      <aside class="panel round-panel">
        <h3>Round index</h3>
        <div class="mini-bars">
          ${section.questions
            .map((_, index) => `<div class="mini-bar"><span style="--fill: ${index === 0 ? 100 : 0}%"></span></div>`)
            .join("")}
        </div>
        <div class="button-row">
          <button class="btn primary" type="button" data-action="begin-section">Begin Round</button>
        </div>
      </aside>
    </div>
  `);
}

function renderQuestion() {
  state.screen = "question";
  const section = quizData[state.sectionIndex];
  const question = section.questions[state.questionIndex];
  const globalNumber = getGlobalQuestionNumber();
  const answered = state.selectedAnswer !== null;
  const sectionProgress = ((state.questionIndex + (answered ? 1 : 0)) / section.questions.length) * 100;
  const selectedCorrect = state.selectedAnswer === question.answer;

  setView(`
    <div class="view question-grid" style="--round-accent: ${sectionAccent(section)}">
      <article class="panel question-card" data-number="${String(globalNumber).padStart(2, "0")}">
        <div>
          <span class="kicker">${section.title}</span>
          <div class="progress-track" aria-label="Section progress">
            <span class="progress-fill" style="--fill: ${sectionProgress}%"></span>
          </div>
        </div>
        <div class="question-copy">
          <h2>${question.prompt}</h2>
          <p>Question ${state.questionIndex + 1} of ${section.questions.length} in this round.</p>
        </div>
        <div class="question-actions">
          <span class="micro-copy">Total score ${state.score}/${totalQuestions}</span>
          <button class="btn primary" type="button" data-action="next" ${answered ? "" : "disabled"}>
            ${isLastQuestion() ? "See Results" : isLastQuestionInSection() ? "Next Round" : "Next Question"}
          </button>
        </div>
      </article>
      <aside>
        <div class="answers">
          ${question.options
            .map((option, index) => {
              const correct = answered && index === question.answer;
              const wrong = answered && state.selectedAnswer === index && index !== question.answer;
              const selected = state.selectedAnswer === index;
              const stateText = correct ? "Correct" : wrong ? "Missed" : selected ? "Picked" : "";
              return `
                <button class="answer ${selected ? "is-selected" : ""} ${correct ? "is-correct" : ""} ${wrong ? "is-wrong" : ""}"
                  type="button"
                  data-answer="${index}"
                  ${answered ? "disabled" : ""}>
                  <span class="answer-letter">${letters[index]}</span>
                  <span class="answer-text">${option}</span>
                  <span class="answer-state">${stateText}</span>
                </button>
              `;
            })
            .join("")}
        </div>
        <div class="feedback">
          ${
            answered
              ? `<strong>${selectedCorrect ? "Point secured." : "Answer revealed."}</strong> ${question.note}`
              : " "
          }
        </div>
      </aside>
    </div>
  `);
}

function renderResults() {
  state.screen = "results";
  const percentage = Math.round((state.score / totalQuestions) * 100);
  const message =
    percentage >= 90
      ? "Hall-of-fame table. Somebody check the trophy cabinet."
      : percentage >= 70
        ? "Commanding performance. Confident, dangerous, and annoyingly good."
        : percentage >= 50
          ? "Respectable night out. You had flashes of brilliance and survived the weird laws."
          : "Glorious chaos. The quiz resisted you, but the comeback arc is sitting right there.";

  setView(`
    <div class="view results-grid">
      <div>
        <span class="kicker">Final results</span>
        <h2 class="mega-title">${state.score}<em>/${totalQuestions}</em></h2>
        <p class="result-message">${message}</p>
        ${sectionMap()}
      </div>
      <aside class="panel result-panel">
        <div class="score-orbit" style="--score-deg: ${(percentage / 100) * 360}deg">
          <div>
            <strong>${percentage}%</strong>
            <span>Total accuracy</span>
          </div>
        </div>
        <div class="section-scores">
          ${quizData
            .map((section, index) => {
              return `
                <div class="section-row">
                  <span>${section.title}</span>
                  <strong>${state.sectionScores[index]}/${section.questions.length}</strong>
                </div>
              `;
            })
            .join("")}
        </div>
        <div class="button-row">
          <button class="btn primary" type="button" data-action="restart">Restart Quiz</button>
        </div>
      </aside>
    </div>
  `);
}

function isLastQuestionInSection() {
  return state.questionIndex === quizData[state.sectionIndex].questions.length - 1;
}

function isLastQuestion() {
  return state.sectionIndex === quizData.length - 1 && isLastQuestionInSection();
}

function answerQuestion(index) {
  if (state.selectedAnswer !== null) return;

  const question = quizData[state.sectionIndex].questions[state.questionIndex];
  state.selectedAnswer = index;

  if (index === question.answer) {
    state.score += 1;
    state.sectionScores[state.sectionIndex] += 1;
  }

  renderQuestion();
}

function nextStep() {
  if (state.selectedAnswer === null) return;

  state.selectedAnswer = null;

  if (isLastQuestion()) {
    renderResults();
    return;
  }

  if (isLastQuestionInSection()) {
    state.sectionIndex += 1;
    state.questionIndex = 0;
    renderSectionIntro();
    return;
  }

  state.questionIndex += 1;
  renderQuestion();
}

function restart() {
  state.sectionIndex = 0;
  state.questionIndex = 0;
  state.selectedAnswer = null;
  state.score = 0;
  state.sectionScores = quizData.map(() => 0);
  renderHome();
}

app.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  const answerButton = event.target.closest("[data-answer]");

  if (answerButton) {
    answerQuestion(Number(answerButton.dataset.answer));
    return;
  }

  if (!actionButton) return;

  const action = actionButton.dataset.action;
  if (action === "start") renderSectionIntro();
  if (action === "begin-section") renderQuestion();
  if (action === "next") nextStep();
  if (action === "restart") restart();
});

renderHome();

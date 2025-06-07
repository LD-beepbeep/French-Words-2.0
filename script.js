// Only supports French-Dutch, and uses only the supplied VOCAB list!

const VOCAB = [
  ["la banlieue", "de buitenwijken"],
  ["la campagne", "het platteland"],
  ["la commune", "de gemeente"],
  ["le pays", "het land"],
  ["la région", "de streek, de regio"],
  ["le loft", "de loft"],
  ["le logement", "de woonst, de slaapgelegenheid"],
  ["la maison de rangée", "de rijwoning"],
  ["la micro-maison", "de microwoning"],
  ["le studio", "de studio"],
  ["la Tiny", "de microwoning, het tiny house"],
  ["la villa", "de villa"],
  ["abordable", "betaalbaar"],
  ["agréable", "aangenaam, gezellig"],
  ["cher, chère", "duur"],
  ["clos(e)", "afgesloten"],
  ["confortable", "comfortabel"],
  ["écologique", "ecologisch"],
  ["équipé(e) (de)", "voorzien (van), uitgerust (met)"],
  ["étroit(e)", "smal"],
  ["magnifique", "prachtig"],
  ["pratique", "praktisch"],
  ["spacieux, spacieuse", "ruim"],
  ["rose", "jaune"],
  ["blanc, blanche", "vert(e)"],
  ["noir(e)", "brun(e)"],
  ["rouge", "mauve"],
  ["bleu(e)", "orange"],
  ["gris(e)", ""],
  ["construire", "bouwen"],
  ["déménager", "verhuizen"],
  ["entretenir", "onderhouden"],
  ["nettoyer", "poetsen"],
  ["prendre une douche", "zich douchen"],
  ["ranger", "opruimen"],
  ["réparer", "herstellen"],
  ["se changer", "zich omkleden"],
  ["se déshabiller", "zich uitkleden"],
  ["se réveiller", "wakker worden"],
  ["vivre", "wonen, leven"],
  ["l’ascenseur (m)", "de lift"],
  ["l’armoire (f)", "de kast"],
  ["la baignoire", "het bad"],
  ["le balai", "de bezem"],
  ["le barbecue", "de barbecue"],
  ["le cadre", "de lijst, de omlijsting"],
  ["la cafetière", "het koffiezetapparaat"],
  ["la casserole", "de kookpan"],
  ["la chaise", "de stoel"],
  ["le congélateur", "de diepvriezer"],
  ["la douche", "de douche"],
  ["le drap", "het laken"],
  ["l’étagère (f)", "het rek"],
  ["l’évier (m)", "de gootsteen"],
  ["le fauteuil", "de zetel"],
  ["la fenêtre", "het raam"],
  ["la garde-robe", "de garderobe, de kleerkast"],
  ["le grille-pain", "de broodrooster"],
  ["le haut-parleur", "de luidspreker, de (muziek)box"],
  ["la lampe", "de lamp"],
  ["le lavabo", "de wastafel"],
  ["le lave-vaisselle", "de vaatwasser"],
  ["le lit", "het bed"],
  ["le miroir", "de spiegel"],
  ["l’ordinateur (m)", "de computer"],
  ["l’oreiller (m)", "het hoofdkussen"],
  ["le panier à linge", "de linnenmand"],
  ["le poster", "de poster"],
  ["la poubelle", "de vuilnisbak"],
  ["le rasoir", "het scheerapparaat"],
  ["le réveil", "de wekker"],
  ["le rideau", "het gordijn"],
  ["le robinet", "de kraan"],
  ["le tableau", "het schilderij"],
  ["la table de nuit", "het nachtkastje"],
  ["le tapis", "het tapijt"],
  ["la télé", "de televisie"],
  ["la télécommande", "de afstandsbediening"],
  ["la tondeuse à gazon", "de grasmaaier"],
  ["le bureau", "het bureau"],
  ["la cabane de jardin", "het tuinhuis"],
  ["la cave", "de kelder"],
  ["la chambre à coucher", "de slaapkamer"],
  ["le couloir", "de gang"],
  ["la cuisine", "de keuken"],
  ["le débarras", "de berging"],
  ["le garage", "de garage"],
  ["le grenier", "de zolder"],
  ["le hall (d’entrée)", "de (inkom)hal"],
  ["le jardin", "de tuin"],
  ["le living", "de woonkamer"],
  ["la mezzanine", "de mezzanine, de tussenverdieping"],
  ["la pièce", "de kamer, het vertrek"],
  ["la piscine", "het zwembad"],
  ["le premier étage", "de eerste verdieping"],
  ["le rez-de-chaussée", "de begane grond"],
  ["la salle à manger", "de eetkamer"],
  ["la salle de bains", "de badkamer"],
  ["la salle de séjour", "de woonkamer"],
  ["le salon", "het salon"],
  ["la terrasse", "het terras"],
  ["les toilettes (f)", "het toilet, de w"]
];

// Per-language storage for custom words, but only French-Dutch enabled
const CUSTOM_KEY = "customVocabulary_fr_nl";

function loadCustomWords() {
  return JSON.parse(localStorage.getItem(CUSTOM_KEY)) || [];
}
function saveCustomWords(words) {
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(words));
}

// All state in one object
const state = {
  hardWords: JSON.parse(localStorage.getItem('hardWords')) || [],
  sessionStats: {
    correct: 0, incorrect: 0, total: 0,
    frenchToDutch: { correct: 0, total: 0 },
    dutchToFrench: { correct: 0, total: 0 }
  },
  customWords: loadCustomWords(),
  isPracticeMode: false,
  customPracticeMode: false,
  questionNumber: 0,
  currentQuestion: null,
  currentAnswer: null,
  currentDirection: null,
  pendingHardWord: null
};

function allWords() {
  return [...VOCAB, ...state.customWords];
}

function randomPair(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateQuestion() {
  let pairs;
  if (state.isPracticeMode) {
    pairs = state.hardWords;
  } else if (state.customPracticeMode) {
    pairs = state.customWords;
  } else {
    pairs = allWords();
  }
  if (!pairs.length) return null;
  const [fr, nl] = randomPair(pairs);
  const isFrenchToDutch = Math.random() < 0.5;
  if (isFrenchToDutch) {
    state.currentQuestion = `🇫🇷 → 🇳🇱  Translate: ${fr}`;
    state.currentAnswer = nl;
    state.currentDirection = 'french_to_dutch';
  } else {
    state.currentQuestion = `🇳🇱 → 🇫🇷  Translate: ${nl}`;
    state.currentAnswer = fr;
    state.currentDirection = 'dutch_to_french';
  }
  state.questionNumber++;
  return {
    question: state.currentQuestion,
    answer: state.currentAnswer,
    direction: state.currentDirection
  };
}

function normalizeAnswer(ans) {
  return (ans||"").toLowerCase()
    .trim()
    .replace(/[.,;:!?()"'-]/g, '')
    .replace(/\s+/g, ' ');
}

function checkAnswer(userAnswer) {
  const normalizedUser = normalizeAnswer(userAnswer);
  const possibleAnswers = (state.currentAnswer||"").split(',').map(ans =>
    ans.split('/').map(a => normalizeAnswer(a.trim()))
  ).flat();
  return possibleAnswers.some(ans => ans === normalizedUser);
}

function submitAnswer() {
  const userAnswer = document.getElementById('answer-input').value.trim();
  if (!userAnswer) {
    alert('Please enter an answer!');
    return;
  }
  const isCorrect = checkAnswer(userAnswer);
  state.sessionStats.total++;
  let statsKey = null;
  if (state.currentDirection === 'french_to_dutch') statsKey = 'frenchToDutch';
  if (state.currentDirection === 'dutch_to_french') statsKey = 'dutchToFrench';
  if (isCorrect) {
    state.sessionStats.correct++;
    if (statsKey) state.sessionStats[statsKey].correct++;
  } else {
    state.sessionStats.incorrect++;
    state.pendingHardWord = {
      question: state.currentQuestion,
      answer: state.currentAnswer,
      direction: state.currentDirection
    };
  }
  if (statsKey) state.sessionStats[statsKey].total++;
  const feedback = document.getElementById('feedback');
  if (isCorrect) {
    feedback.textContent = '✅ Correct! Well done!';
    feedback.className = 'feedback correct';
    if (state.isPracticeMode) {
      setTimeout(() => {
        if (confirm('Remove this word from hard words list?')) {
          const idx = state.hardWords.findIndex(hw =>
            hw.question === state.currentQuestion && hw.answer === state.currentAnswer
          );
          if (idx !== -1) {
            state.hardWords.splice(idx, 1);
            localStorage.setItem('hardWords', JSON.stringify(state.hardWords));
            updateHardWordsList();
          }
        }
        setTimeout(nextQuestion, 900);
      }, 900);
    } else {
      setTimeout(nextQuestion, 900);
    }
  } else {
    feedback.textContent = `❌ Incorrect. The correct answer is: ${state.currentAnswer}`;
    feedback.className = 'feedback incorrect';
    setTimeout(() => {
      if (!state.isPracticeMode) {
        showHardWordsModal();
      } else {
        setTimeout(nextQuestion, 1400);
      }
    }, 900);
  }
  updateUI();
}

function startQuiz() {
  state.isPracticeMode = false;
  state.customPracticeMode = false;
  showScreen('quiz-screen');
  nextQuestion();
}
function practiceHardWords() {
  if (state.hardWords.length === 0) {
    alert('No hard words to practice!');
    return;
  }
  state.isPracticeMode = true;
  state.customPracticeMode = false;
  state.questionNumber = 0;
  showScreen('quiz-screen');
  nextQuestion();
}
function practiceCustomWords() {
  if (state.customWords.length === 0) {
    alert('No custom words to practice!');
    return;
  }
  state.isPracticeMode = false;
  state.customPracticeMode = true;
  state.questionNumber = 0;
  showScreen('quiz-screen');
  nextQuestion();
}
function nextQuestion() {
  const questionData = generateQuestion();
  if (!questionData) {
    alert('No vocabulary available!');
    showScreen('main-menu');
    return;
  }
  let directionText = '';
  if (questionData.question.includes('🇫🇷 → 🇳🇱')) {
    directionText = '🇫🇷 → 🇳🇱';
    document.getElementById('question-text').textContent =
      questionData.question.replace('🇫🇷 → 🇳🇱  Translate: ', '');
  } else if (questionData.question.includes('🇳🇱 → 🇫🇷')) {
    directionText = '🇳🇱 → 🇫🇷';
    document.getElementById('question-text').textContent =
      questionData.question.replace('🇳🇱 → 🇫🇷  Translate: ', '');
  }
  document.getElementById('question-direction').textContent = directionText;
  document.getElementById('answer-input').value = '';
  document.getElementById('answer-input').focus();
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';
  updateUI();
  updateHardWordsList();
}
function addToHardWords(shouldAdd) {
  if (shouldAdd && state.pendingHardWord) {
    const exists = state.hardWords.some(hw =>
      hw.question === state.pendingHardWord.question && hw.answer === state.pendingHardWord.answer
    );
    if (!exists) {
      state.hardWords.push(state.pendingHardWord);
      localStorage.setItem('hardWords', JSON.stringify(state.hardWords));
      updateHardWordsList();
    }
  }
  document.getElementById('hard-words-modal').classList.remove('active');
  document.body.style.overflow = '';
  state.pendingHardWord = null;
  setTimeout(nextQuestion, 500);
}
function showHardWordsModal() {
  const modal = document.getElementById('hard-words-modal');
  document.body.style.overflow = 'hidden';
  modal.classList.add('active');
  modal.focus();
}
function addNewWord() {
  const frenchWord = document.getElementById('custom-french-word').value.trim();
  const dutchWord = document.getElementById('custom-dutch-word').value.trim();
  if (!frenchWord && !dutchWord) {
    alert('Please fill in both French and Dutch translations!');
    return;
  }
  if (state.customWords.some(([f, d]) => f === frenchWord && d === dutchWord)) {
    alert('This word already exists in your custom list.');
    return;
  }
  state.customWords.push([frenchWord, dutchWord]);
  saveCustomWords(state.customWords);
  document.getElementById('custom-french-word').value = '';
  document.getElementById('custom-dutch-word').value = '';
  updateRecentAdditions();
  updateUI();
  alert('Word added successfully!');
}
function updateRecentAdditions(elementId = 'recent-list') {
  const container = document.getElementById(elementId);
  const customVocab = state.customWords;
  if (!container) return;
  if (customVocab.length === 0) {
    container.innerHTML = '<p style="color:#8fa9cc;">No custom words added yet.</p>';
    return;
  }
  const recent = customVocab.slice(-10).reverse();
  let html = '';
  recent.forEach(([fr, nl]) => {
    html += `<div class="recent-item"><strong>${fr}</strong> → ${nl}</div>`;
  });
  container.innerHTML = html;
}
function updateHardWordsList() {
  const container = document.getElementById('hard-words-list');
  const clearBtn = document.getElementById('clear-hard-btn');
  if (!container) return;
  if (state.hardWords.length === 0) {
    container.innerHTML = '<p style="color:#8fa9cc;">No hard words yet!</p>';
    if (clearBtn) clearBtn.style.display = 'none';
    return;
  }
  let html = '';
  state.hardWords.forEach((hardWord, index) => {
    let wordDisplay = '';
    if (hardWord.question && hardWord.question.includes('🇫🇷 → 🇳🇱')) {
      const word = hardWord.question.replace('🇫🇷 → 🇳🇱  Translate: ', '');
      wordDisplay = `${word} (French) → ${hardWord.answer} (Dutch)`;
    } else if (hardWord.question && hardWord.question.includes('🇳🇱 → 🇫🇷')) {
      const word = hardWord.question.replace('🇳🇱 → 🇫🇷  Translate: ', '');
      wordDisplay = `${word} (Dutch) → ${hardWord.answer} (French)`;
    } else {
      wordDisplay = `${hardWord.question || ''} → ${hardWord.answer}`;
    }
    html += `
      <div class="hard-word-item">
        <div class="hard-word-content">${index + 1}. ${wordDisplay}</div>
        <button class="remove-hard-btn" onclick="removeHardWord(${index})">Remove</button>
      </div>
    `;
  });
  container.innerHTML = html;
  if (clearBtn) clearBtn.style.display = 'inline-block';
}
function removeHardWord(index) {
  state.hardWords.splice(index, 1);
  localStorage.setItem('hardWords', JSON.stringify(state.hardWords));
  updateHardWordsList();
  updateUI();
}
function clearHardWords() {
  if (confirm('Are you sure you want to clear all hard words?')) {
    state.hardWords = [];
    localStorage.setItem('hardWords', JSON.stringify(state.hardWords));
    updateHardWordsList();
    updateUI();
  }
}
function updateUI() {
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && el.textContent != value) el.textContent = value;
  };
  setText('vocab-count', allWords().length);
  setText('hard-count', state.hardWords.length);
  setText('current-score', `${state.sessionStats.correct}/${state.sessionStats.total}`);
  const percentage = state.sessionStats.total > 0 ?
    Math.round((state.sessionStats.correct / state.sessionStats.total) * 100) : 0;
  setText('score-percentage', `${percentage}%`);
  setText('question-number', state.questionNumber);
}
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
  if (screenId === 'add-word-menu') updateRecentAdditions();
  if (screenId === 'practice-hard-menu') {
    updateRecentAdditions('recent-list-hard');
    updateHardWordsList();
  }
  if (screenId === 'main-menu') {
    updateRecentAdditions();
    updateHardWordsList();
    updateUI();
  }
}
function showStatsScreen() {
  updateStatsDisplay();
  showScreen('stats-screen');
}
function updateStatsDisplay() {
  const stats = state.sessionStats;
  document.getElementById('total-questions').textContent = stats.total;
  document.getElementById('correct-answers').textContent = stats.correct;
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  document.getElementById('accuracy').textContent = `${accuracy}%`;

  const frToNl = stats.frenchToDutch;
  const frToNlAcc = frToNl.total > 0 ? Math.round((frToNl.correct / frToNl.total) * 100) : 0;
  document.getElementById('fr-to-nl-correct').textContent = frToNl.correct;
  document.getElementById('fr-to-nl-total').textContent = frToNl.total;
  document.getElementById('fr-to-nl-accuracy').textContent = `${frToNlAcc}%`;

  const nlToFr = stats.dutchToFrench;
  const nlToFrAcc = nlToFr.total > 0 ? Math.round((nlToFr.correct / nlToFr.total) * 100) : 0;
  document.getElementById('nl-to-fr-correct').textContent = nlToFr.correct;
  document.getElementById('nl-to-fr-total').textContent = nlToFr.total;
  document.getElementById('nl-to-fr-accuracy').textContent = `${nlToFrAcc}%`;
}

// Modal support & Enter keys
document.addEventListener('DOMContentLoaded', function () {
  const answerInput = document.getElementById('answer-input');
  if (answerInput) {
    answerInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitAnswer();
      }
    });
  }
  document.getElementById('custom-dutch-word').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addNewWord();
  });
  document.getElementById('custom-french-word').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') document.getElementById('custom-dutch-word').focus();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.getElementById('hard-words-modal').classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  updateUI();
  updateRecentAdditions();
  updateHardWordsList();
});

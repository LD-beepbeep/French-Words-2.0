// --- Only French↔Dutch, Dutch↔French, Dutch↔English, English↔Dutch pairs ---
const ALLOWED_PAIRS = [
  ["fr", "nl"],
  ["nl", "fr"],
  ["nl", "en"],
  ["en", "nl"]
];
const LANGUAGES = [
  { code: "fr", name: "French" },
  { code: "nl", name: "Dutch" },
  { code: "en", name: "English" }
];

const VOCAB = [
  ["la banlieue", "de buitenwijken"], ["la campagne", "het platteland"], ["la commune", "de gemeente"],
  ["le pays", "het land"], ["la région", "de streek, de regio"], ["le loft", "de loft"],
  ["le logement", "de woonst, de slaapgelegenheid"], ["la maison de rangée", "de rijwoning"],
  ["la micro-maison", "de microwoning"], ["le studio", "de studio"], ["la Tiny", "de microwoning, het tiny house"],
  ["la villa", "de villa"], ["abordable", "betaalbaar"], ["agréable", "aangenaam, gezellig"], ["cher, chère", "duur"],
  ["clos(e)", "afgesloten"], ["confortable", "comfortabel"], ["écologique", "ecologisch"],
  ["équipé(e) (de)", "voorzien (van), uitgerust (met)"], ["étroit(e)", "smal"], ["magnifique", "prachtig"],
  ["pratique", "praktisch"], ["spacieux, spacieuse", "ruim"], ["rose", "jaune"],
  ["blanc, blanche", "vert(e)"], ["noir(e)", "brun(e)"], ["rouge", "mauve"], ["bleu(e)", "orange"], ["gris(e)", ""],
  ["construire", "bouwen"], ["déménager", "verhuizen"], ["entretenir", "onderhouden"], ["nettoyer", "poetsen"],
  ["prendre une douche", "zich douchen"], ["ranger", "opruimen"], ["réparer", "herstellen"], ["se changer", "zich omkleden"],
  ["se déshabiller", "zich uitkleden"], ["se réveiller", "wakker worden"], ["vivre", "wonen, leven"],
  ["l’ascenseur (m)", "de lift"], ["l’armoire (f)", "de kast"], ["la baignoire", "het bad"], ["le balai", "de bezem"],
  ["le barbecue", "de barbecue"], ["le cadre", "de lijst, de omlijsting"], ["la cafetière", "het koffiezetapparaat"],
  ["la casserole", "de kookpan"], ["la chaise", "de stoel"], ["le congélateur", "de diepvriezer"],
  ["la douche", "de douche"], ["le drap", "het laken"], ["l’étagère (f)", "het rek"], ["l’évier (m)", "de gootsteen"],
  ["le fauteuil", "de zetel"], ["la fenêtre", "het raam"], ["la garde-robe", "de garderobe, de kleerkast"],
  ["le grille-pain", "de broodrooster"], ["le haut-parleur", "de luidspreker, de (muziek)box"], ["la lampe", "de lamp"],
  ["le lavabo", "de wastafel"], ["le lave-vaisselle", "de vaatwasser"], ["le lit", "het bed"], ["le miroir", "de spiegel"],
  ["l’ordinateur (m)", "de computer"], ["l’oreiller (m)", "het hoofdkussen"], ["le panier à linge", "de linnenmand"],
  ["le poster", "de poster"], ["la poubelle", "de vuilnisbak"], ["le rasoir", "het scheerapparaat"],
  ["le réveil", "de wekker"], ["le rideau", "het gordijn"], ["le robinet", "de kraan"], ["le tableau", "het schilderij"],
  ["la table de nuit", "het nachtkastje"], ["le tapis", "het tapijt"], ["la télé", "de televisie"],
  ["la télécommande", "de afstandsbediening"], ["la tondeuse à gazon", "de grasmaaier"], ["le bureau", "het bureau"],
  ["la cabane de jardin", "het tuinhuis"], ["la cave", "de kelder"], ["la chambre à coucher", "de slaapkamer"],
  ["le couloir", "de gang"], ["la cuisine", "de keuken"], ["le débarras", "de berging"], ["le garage", "de garage"],
  ["le grenier", "de zolder"], ["le hall (d’entrée)", "de (inkom)hal"], ["le jardin", "de tuin"],
  ["le living", "de woonkamer"], ["la mezzanine", "de mezzanine, de tussenverdieping"], ["la pièce", "de kamer, het vertrek"],
  ["la piscine", "het zwembad"], ["le premier étage", "de eerste verdieping"], ["le rez-de-chaussée", "de begane grond"],
  ["la salle à manger", "de eetkamer"], ["la salle de bains", "de badkamer"], ["la salle de séjour", "de woonkamer"],
  ["le salon", "het salon"], ["la terrasse", "het terras"], ["les toilettes (f)", "het toilet, de w"]
];

let currentPair = ["fr", "nl"];
function updateLangSelector() {
  const sel = document.getElementById('lang-choice');
  sel.innerHTML = ALLOWED_PAIRS.map(([from, to]) =>
    `<option value="${from}-${to}">${getLangName(from)} → ${getLangName(to)}</option>`
  ).join('');
  sel.value = currentPair.join('-');
}
function getLangName(code) {
  const l = LANGUAGES.find(l => l.code === code);
  return l ? l.name : code;
}
document.addEventListener("DOMContentLoaded", function() {
  updateLangSelector();
  document.getElementById('lang-choice').onchange = function() {
    currentPair = this.value.split('-');
    updateAll();
  };
  // Splash Screen
  const splash = document.getElementById('splash');
  setTimeout(() => {
    splash.classList.add('hide');
    setTimeout(() => splash.style.display = "none", 700);
  }, 1100);
  updateAll();
});

function pairKey() { return `vocab_custom_${currentPair[0]}_${currentPair[1]}`; }
function pairHardKey() { return `vocab_hard_${currentPair[0]}_${currentPair[1]}`; }
function loadCustomWords() { return JSON.parse(localStorage.getItem(pairKey())) || []; }
function saveCustomWords(words) { localStorage.setItem(pairKey(), JSON.stringify(words)); }
function loadHardWords() { return JSON.parse(localStorage.getItem(pairHardKey())) || []; }
function saveHardWords(words) { localStorage.setItem(pairHardKey(), JSON.stringify(words)); }

function allWords() {
  let base = [];
  if ((currentPair[0] === "fr" && currentPair[1] === "nl") || (currentPair[0] === "nl" && currentPair[1] === "fr")) {
    base = VOCAB.map(([fr, nl]) =>
      currentPair[0] === "fr" ? [fr, nl] : [nl, fr]
    );
  }
  return base.concat(loadCustomWords());
}

// --- Per-direction stats per language pair ---
let statsAll = JSON.parse(localStorage.getItem("VOC_STATS") || "{}");

function saveStats() { localStorage.setItem("VOC_STATS", JSON.stringify(statsAll)); }
function getStatsKey() { return currentPair.join("-"); }
function getStats() {
  if (!statsAll[getStatsKey()]) {
    statsAll[getStatsKey()] = {
      from_to: { correct: 0, total: 0 },
      to_from: { correct: 0, total: 0 },
      total_correct: 0, total_total: 0
    };
  }
  return statsAll[getStatsKey()];
}
function incStat(dir, correct) {
  let s = getStats();
  s.total_total++;
  if (correct) s.total_correct++;
  if (dir === "from_to" || dir === "to_from") {
    s[dir].total++;
    if (correct) s[dir].correct++;
  }
  saveStats();
}

function updateRecentAdditions() {
  const container = document.getElementById('recent-list');
  if (!container) return;
  const all = loadCustomWords();
  container.innerHTML = all.length
    ? all.slice(-10).reverse().map(([from, to], i) =>
      `<div class="recent-item">
        <strong>${from}</strong> → ${to}
        <button class="remove-hard-btn" onclick="window.removeCustomWord(${all.length-1-i})">Remove</button>
      </div>`
    ).join('')
    : '<p style="color:#8fa9cc;">No custom words added yet.</p>';
}
window.removeCustomWord = function(idx) {
  const all = loadCustomWords();
  all.splice(idx, 1);
  saveCustomWords(all);
  updateRecentAdditions();
  updateUI();
};

function updateHardWordsList() {
  const container = document.getElementById('hard-words-list');
  const clearBtn = document.getElementById('clear-hard-btn');
  if (!container) return;
  const all = loadHardWords();
  container.innerHTML = all.length
    ? all.map((hw, i) => `
      <div class="hard-word-item">
        <div class="hard-word-content">${i + 1}. ${hw.question} → ${hw.answer}</div>
        <button class="remove-hard-btn" onclick="window.removeHardWord(${i})">Remove</button>
      </div>`).join('')
    : '<p style="color:#8fa9cc;">No hard words yet!</p>';
  if (clearBtn) clearBtn.style.display = all.length ? 'inline-block' : 'none';
}
window.removeHardWord = function(idx) {
  const all = loadHardWords();
  all.splice(idx, 1);
  saveHardWords(all);
  updateHardWordsList();
  updateUI();
};
window.clearHardWords = function() {
  if (confirm('Are you sure you want to clear all hard words?')) {
    saveHardWords([]);
    updateHardWordsList();
    updateUI();
  }
};

window.addNewWord = function() {
  const from = document.getElementById('custom-from-word').value.trim();
  const to = document.getElementById('custom-to-word').value.trim();
  if (!from || !to) return alert('Please fill in both fields!');
  const all = loadCustomWords();
  if (all.some(([f, t]) => f === from && t === to)) return alert('Word exists.');
  all.push([from, to]);
  saveCustomWords(all);
  document.getElementById('custom-from-word').value = '';
  document.getElementById('custom-to-word').value = '';
  updateRecentAdditions();
  updateUI();
  alert('Word added!');
};

let quizState = {
  isHard: false,
  isCustom: false,
  qNum: 0,
  currentQ: null,
  currentA: null,
  currentDir: null,
  pendingHard: null,
};
function generateQuestion() {
  let pairs;
  if (quizState.isHard) {
    pairs = loadHardWords().map(hw => [hw.question, hw.answer]);
  } else if (quizState.isCustom) {
    pairs = loadCustomWords();
  } else {
    pairs = allWords();
  }
  if (!pairs.length) return null;
  const [from, to] = pairs[Math.floor(Math.random() * pairs.length)];
  const askFrom = Math.random() < 0.5;
  quizState.currentQ = askFrom ? from : to;
  quizState.currentA = askFrom ? to : from;
  quizState.currentDir = askFrom ? 'from_to' : 'to_from';
  quizState.qNum++;
  return { question: quizState.currentQ, answer: quizState.currentA, direction: quizState.currentDir };
}
window.startQuiz = function() {
  quizState.isHard = false;
  quizState.isCustom = false;
  quizState.qNum = 0;
  showScreen('quiz-screen');
  nextQuestion();
};
window.practiceHardWords = function() {
  quizState.isHard = true;
  quizState.isCustom = false;
  quizState.qNum = 0;
  showScreen('quiz-screen');
  nextQuestion();
};
window.practiceCustomWords = function() {
  quizState.isCustom = true;
  quizState.isHard = false;
  quizState.qNum = 0;
  showScreen('quiz-screen');
  nextQuestion();
};
function nextQuestion() {
  const q = generateQuestion();
  if (!q) { alert("No vocabulary available!"); showScreen('main-menu'); return; }
  document.getElementById('question-direction').textContent = "";
  document.getElementById('question-text').textContent = q.question;
  document.getElementById('answer-input').value = '';
  document.getElementById('answer-input').focus();
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';
  updateUI();
}
window.submitAnswer = function() {
  const userAnswer = document.getElementById('answer-input').value.trim();
  if (!userAnswer) { alert('Please enter an answer!'); return; }
  const correct = normalizeAnswer(userAnswer) === normalizeAnswer(quizState.currentA);
  incStat(quizState.currentDir, correct);
  if (correct) {
    document.getElementById('feedback').textContent = '✅ Correct! Well done!';
    document.getElementById('feedback').className = 'feedback correct';
    setTimeout(nextQuestion, 900);
  } else {
    document.getElementById('feedback').textContent = `❌ Incorrect. The correct answer is: ${quizState.currentA}`;
    document.getElementById('feedback').className = 'feedback incorrect';
    quizState.pendingHard = {
      question: quizState.currentQ,
      answer: quizState.currentA,
      direction: quizState.currentDir
    };
    setTimeout(showHardWordsModal, 900);
  }
  updateUI();
};
window.addToHardWords = function(shouldAdd) {
  if (shouldAdd && quizState.pendingHard) {
    let all = loadHardWords();
    if (!all.some(hw => hw.question === quizState.pendingHard.question && hw.answer === quizState.pendingHard.answer))
    {
      all.push(quizState.pendingHard);
      saveHardWords(all);
      updateHardWordsList();
    }
  }
  document.getElementById('hard-words-modal').classList.remove('active');
  document.body.style.overflow = '';
  quizState.pendingHard = null;
  setTimeout(nextQuestion, 500);
};
function showHardWordsModal() {
  const modal = document.getElementById('hard-words-modal');
  document.body.style.overflow = 'hidden';
  modal.classList.add('active');
  modal.focus();
}
function normalizeAnswer(ans) {
  return (ans||"").toLowerCase().trim().replace(/[.,;:!?()"'-]/g, '').replace(/\s+/g, ' ');
}
function updateUI() {
  document.getElementById('vocab-count').textContent = allWords().length;
  document.getElementById('hard-count').textContent = loadHardWords().length;
  let s = getStats();
  document.getElementById('current-score').textContent =
    `${s.total_correct}/${s.total_total}`;
  const percentage = s.total_total > 0 ?
    Math.round((s.total_correct / s.total_total) * 100) : 0;
  document.getElementById('score-percentage').textContent = `${percentage}%`;
  document.getElementById('question-number').textContent = quizState.qNum;
}
window.showScreen = function(screenId) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
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
};
window.showStatsScreen = function() {
  updateStatsDisplay();
  showScreen('stats-screen');
};
function updateStatsDisplay() {
  let s = getStats();
  document.getElementById('total-questions').textContent = s.total_total;
  document.getElementById('correct-answers').textContent = s.total_correct;
  const acc = s.total_total > 0 ? Math.round((s.total_correct / s.total_total) * 100) : 0;
  document.getElementById('accuracy').textContent = `${acc}%`;
  // Detailed directions
  document.getElementById('fr-to-nl-correct').textContent = s.from_to ? s.from_to.correct : 0;
  document.getElementById('fr-to-nl-total').textContent = s.from_to ? s.from_to.total : 0;
  document.getElementById('fr-to-nl-accuracy').textContent = s.from_to && s.from_to.total > 0 ? Math.round((s.from_to.correct/s.from_to.total)*100)+'%' : '-';
  document.getElementById('nl-to-fr-correct').textContent = s.to_from ? s.to_from.correct : 0;
  document.getElementById('nl-to-fr-total').textContent = s.to_from ? s.to_from.total : 0;
  document.getElementById('nl-to-fr-accuracy').textContent = s.to_from && s.to_from.total > 0 ? Math.round((s.to_from.correct/s.to_from.total)*100)+'%' : '-';
}

window.updateAll = function() {
  updateLangSelector();
  updateRecentAdditions();
  updateHardWordsList();
  updateUI();
};

document.addEventListener('DOMContentLoaded', function () {
  updateLangSelector();
  updateRecentAdditions();
  updateHardWordsList();
  updateUI();
  if (document.getElementById('custom-to-word'))
    document.getElementById('custom-to-word').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') window.addNewWord();
    });
  if (document.getElementById('custom-from-word'))
    document.getElementById('custom-from-word').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') document.getElementById('custom-to-word').focus();
    });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.getElementById('hard-words-modal').classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
document.addEventListener("DOMContentLoaded", function(){
  setTimeout(function(){
    document.getElementById("splash").classList.add("hide");
    setTimeout(function(){
      document.getElementById("splash").style.display = "none";
    }, 1100);
  }, 1600);
});

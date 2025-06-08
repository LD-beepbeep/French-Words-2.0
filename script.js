// Just-for-fun login (no real security!)
window.tryLogin = function() {
  const uname = document.getElementById('login-username').value.trim();
  const pw = document.getElementById('login-password').value;
  const error = document.getElementById('login-error');
  if (!uname || !pw) { error.textContent = "Please enter username and password."; return; }
  const userKey = `voc_user_${uname}`;
  const stored = JSON.parse(localStorage.getItem(userKey) || "{}");
  if (!stored.password) {
    localStorage.setItem(userKey, JSON.stringify({password: pw}));
    localStorage.setItem("voc_user_current", uname);
    showApp();
    return;
  }
  if (stored.password === pw) {
    localStorage.setItem("voc_user_current", uname);
    showApp();
    return;
  }
  if (confirm("Wrong password. Forgot password?")) {
    const npw = prompt("Enter a new password:");
    if (npw && npw.length >= 1) {
      localStorage.setItem(userKey, JSON.stringify({password: npw}));
      localStorage.setItem("voc_user_current", uname);
      showApp();
      return;
    }
  }
  error.textContent = "Wrong password. Try again.";
};
function showApp() {
  document.getElementById('login-screen').style.display = "none";
  document.getElementById('login-screen').classList.remove("active");
  Array.from(document.querySelectorAll('.screen')).forEach(s=>{
    if(s.id!=="login-screen") s.style.display="";
    s.classList.remove('active');
  });
  document.getElementById('main-menu').classList.add('active');
  document.getElementById('language-selector').style.display = "";
  window.updateAll();
}
window.logout = function() {
  localStorage.removeItem("voc_user_current");
  document.getElementById('login-screen').style.display = "";
  Array.from(document.querySelectorAll('.screen')).forEach(s=>{
    if(s.id!=="login-screen") s.style.display="none";
    s.classList.remove('active');
  });
  document.getElementById('login-screen').classList.add('active');
  document.getElementById('login-screen').style.display = "flex";
  document.getElementById('language-selector').style.display = "none";
};
window.currentUser = function() {
  return localStorage.getItem("voc_user_current") || "";
};

// --- Language pairs and vocab ---
const ALLOWED_PAIRS = [
  ["fr", "nl"], // French-Dutch
  ["en", "nl"]  // English-Dutch
];
const LANGUAGES = [
  { code: "fr", name: "French" },
  { code: "nl", name: "Dutch" },
  { code: "en", name: "English" }
];
const VOCAB = {
  "fr-nl": [
    ["la pomme", "de appel"],
    ["le pain", "het brood"],
    ["le livre", "het boek"],
    ["le chat", "de kat"],
    ["la maison", "het huis"]
  ],
  "en-nl": [
    ["apple", "appel"],
    ["book", "boek"],
    ["cat", "kat"],
    ["house", "huis"],
    ["water", "water"]
  ]
};

let currentPair = ["fr", "nl"];
function updateLangSelector() {
  const sel = document.getElementById('lang-choice');
  sel.innerHTML = ALLOWED_PAIRS.map(([from, to]) =>
    `<option value="${from}-${to}">${getLangName(from)} ⇄ ${getLangName(to)}</option>`
  ).join('');
  sel.value = currentPair.join('-');
}
function getLangName(code) {
  const l = LANGUAGES.find(l => l.code === code);
  return l ? l.name : code;
}
function pairKey() { return `voc_${window.currentUser()}_custom_${currentPair[0]}_${currentPair[1]}`; }
function pairHardKey() { return `voc_${window.currentUser()}_hard_${currentPair[0]}_${currentPair[1]}`; }
function loadCustomWords() { return JSON.parse(localStorage.getItem(pairKey())) || []; }
function saveCustomWords(words) { localStorage.setItem(pairKey(), JSON.stringify(words)); }
function loadHardWords() { return JSON.parse(localStorage.getItem(pairHardKey())) || []; }
function saveHardWords(words) { localStorage.setItem(pairHardKey(), JSON.stringify(words)); }
function allWords() {
  const base = VOCAB[`${currentPair[0]}-${currentPair[1]}`] || VOCAB[`${currentPair[1]}-${currentPair[0]}`]?.map(([a,b])=>[b,a]) || [];
  return base.concat(loadCustomWords());
}
let statsAll = JSON.parse(localStorage.getItem("VOC_STATS") || "{}");
function saveStats() { localStorage.setItem("VOC_STATS", JSON.stringify(statsAll)); }
function getStatsKey() { return window.currentUser() + "_" + currentPair.join("-"); }
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
// Bulk upload support
document.addEventListener("DOMContentLoaded", function() {
  const bulkBtn = document.getElementById('bulk-upload-btn');
  if (bulkBtn) bulkBtn.onclick = function() {
    const file = document.getElementById('bulk-upload-file').files[0];
    const from = document.getElementById('bulk-from-lang').value;
    const to = document.getElementById('bulk-to-lang').value;
    if (!file) return alert("Select a file!");
    if (from === to) return alert("Pick different languages!");
    const reader = new FileReader();
    reader.onload = function(e) {
      let lines = e.target.result.split(/\r?\n/).filter(Boolean);
      let pairs = lines.map(line => {
        const [a, b] = line.split(/[;,|\t]/);
        return a && b ? [a.trim(), b.trim()] : null;
      }).filter(Boolean);
      let preview = document.getElementById('bulk-upload-preview');
      preview.innerHTML = pairs.length
        ? `<b>Preview:</b><br>${pairs.map(p=>`${p[0]} → ${p[1]}`).join('<br>')}
            <br><button class="btn" id="bulk-add-all-btn">Add all</button>`
        : "<span style='color:#e77171'>No valid word pairs found.</span>";
      document.getElementById('bulk-add-all-btn').onclick = function() {
        const key = `voc_${window.currentUser()}_custom_${from}_${to}`;
        let existing = JSON.parse(localStorage.getItem(key) || "[]");
        existing = existing.concat(pairs);
        localStorage.setItem(key, JSON.stringify(existing));
        preview.innerHTML = "Added!";
        updateAll();
      };
    };
    reader.readAsText(file);
  };
});
let quizState = {
  isHard: false,
  isCustom: false,
  qNum: 0,
  currentQ: null,
  currentA: null,
  currentDir: null,
  pendingHard: null,
  quizPair: null
};
function randomQuizPair() {
  // For quiz, pick a direction
  if (document.getElementById('lang-choice')) {
    const [from, to] = document.getElementById('lang-choice').value.split('-');
    currentPair = [from, to];
  }
  return currentPair;
}
function generateQuestion() {
  quizState.quizPair = randomQuizPair();
  let pairs;
  let [fromLang, toLang] = quizState.quizPair;
  if (quizState.isHard) {
    pairs = loadHardWords().map(hw => [hw.question, hw.answer]);
  } else if (quizState.isCustom) {
    pairs = loadCustomWords();
  } else {
    pairs = allWords();
  }
  if (!pairs.length) return null;
  const [from, to] = pairs[Math.floor(Math.random() * pairs.length)];
  // Pick translation direction randomly
  const askFrom = Math.random() < 0.5;
  quizState.currentQ = askFrom ? from : to;
  quizState.currentA = askFrom ? to : from;
  quizState.currentDir = askFrom ? 'from_to' : 'to_from';
  quizState.qNum++;
  // Set quiz direction label
  let fromName = getLangName(fromLang);
  let toName = getLangName(toLang);
  let label = askFrom ? `${fromName} → ${toName}` : `${toName} → ${fromName}`;
  document.getElementById('quiz-direction-label').textContent = label;
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
  if (screenId === 'upload-bulk-menu') {
    if (document.getElementById('bulk-upload-preview'))
      document.getElementById('bulk-upload-preview').innerHTML = '';
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
}
window.updateAll = function() {
  updateLangSelector();
  updateRecentAdditions();
  updateHardWordsList();
  updateUI();
};
document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem("voc_user_current")) showApp();
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
  document.getElementById('lang-choice').onchange = function() {
    currentPair = this.value.split('-');
    window.updateAll();
  };
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.getElementById('hard-words-modal').classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

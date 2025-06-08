// Multi-language, per-pair storage, add/edit/delete/search, bulk upload, hard modal, and all UI logic

// --- Language management ---
const LANGUAGES = [
    { code: "fr", name: "French" },
    { code: "nl", name: "Dutch" },
    { code: "en", name: "English" },
    { code: "de", name: "German" },
    { code: "es", name: "Spanish" },
    { code: "it", name: "Italian" }
];
const LANG_PAIR_KEY = "vocab_lang_pairs";
let languagePairs = JSON.parse(localStorage.getItem(LANG_PAIR_KEY)) ||
    [["fr", "nl"], ["en", "nl"], ["en", "fr"]];
let currentPair = languagePairs[0];

function updateLangSelector() {
    const sel = document.getElementById('lang-choice');
    if (!sel) return;
    sel.innerHTML = languagePairs.map(([from, to], i) =>
        `<option value="${from}-${to}">${getLangName(from)} → ${getLangName(to)}</option>`
    ).join('');
    sel.value = currentPair.join('-');
    if (document.getElementById('bulk-from-lang')) {
        document.getElementById('bulk-from-lang').innerHTML =
            LANGUAGES.map(l => `<option value="${l.code}">${l.name}</option>`).join('');
        document.getElementById('bulk-to-lang').innerHTML =
            LANGUAGES.map(l => `<option value="${l.code}">${l.name}</option>`).join('');
    }
}
function getLangName(code) {
    const l = LANGUAGES.find(l => l.code === code);
    return l ? l.name : code;
}

// Language selector event
document.addEventListener("DOMContentLoaded", function() {
    const langChoice = document.getElementById('lang-choice');
    if (langChoice) {
        langChoice.onchange = function() {
            currentPair = this.value.split('-');
            updateAll();
        };
    }
    const addLangBtn = document.getElementById('add-lang-btn');
    if (addLangBtn) {
        addLangBtn.onclick = function() {
            const from = prompt("From language code (e.g. fr, en, nl):", "fr");
            const to = prompt("To language code (e.g. nl, fr, en):", "nl");
            if (!from || !to || from === to) return;
            if (!LANGUAGES.some(l => l.code === from) || !LANGUAGES.some(l => l.code === to)) return alert("Unknown language code!");
            if (languagePairs.some(([f, t]) => f === from && t === to)) return alert("Pair exists.");
            languagePairs.push([from, to]);
            localStorage.setItem(LANG_PAIR_KEY, JSON.stringify(languagePairs));
            updateLangSelector(); updateAll();
        };
    }
    const removeLangBtn = document.getElementById('remove-lang-btn');
    if (removeLangBtn) {
        removeLangBtn.onclick = function() {
            if (languagePairs.length === 1) return alert("At least one pair required.");
            if (!confirm("Remove this language pair?")) return;
            languagePairs = languagePairs.filter(([f, t]) =>
                !(f === currentPair[0] && t === currentPair[1])
            );
            localStorage.setItem(LANG_PAIR_KEY, JSON.stringify(languagePairs));
            currentPair = languagePairs[0];
            updateLangSelector(); updateAll();
        };
    }
    updateLangSelector();
    updateAll();
});

// --- Storage util ---
function pairKey() { return `vocab_custom_${currentPair[0]}_${currentPair[1]}`; }
function pairHardKey() { return `vocab_hard_${currentPair[0]}_${currentPair[1]}`; }
function loadCustomWords() { return JSON.parse(localStorage.getItem(pairKey())) || []; }
function saveCustomWords(words) { localStorage.setItem(pairKey(), JSON.stringify(words)); }
function loadHardWords() { return JSON.parse(localStorage.getItem(pairHardKey())) || []; }
function saveHardWords(words) { localStorage.setItem(pairHardKey(), JSON.stringify(words)); }

// --- Custom words add/search ---
function updateRecentAdditions() {
    const container = document.getElementById('recent-list');
    if (!container) return;
    const all = loadCustomWords();
    const search = (document.getElementById('search-custom')||{value:""}).value.trim().toLowerCase();
    const filtered = all.filter(([from, to]) =>
        from.toLowerCase().includes(search) || to.toLowerCase().includes(search));
    container.innerHTML = filtered.length
        ? filtered.slice(-10).reverse().map(([from, to], i) =>
            `<div class="recent-item"><strong>${from}</strong> → ${to}
                <button class="btn btn-small" onclick="window.editCustomWord(${all.length-1-i})">✎</button>
                <button class="btn btn-small" onclick="window.deleteCustomWord(${all.length-1-i})">🗑</button>
            </div>`
        ).join('')
        : '<p style="color:#8fa9cc;">No custom words added yet.</p>';
}
window.editCustomWord = function(idx) {
    const all = loadCustomWords();
    const [f, t] = all[idx];
    const from = prompt("Edit source word:", f);
    const to = prompt("Edit target word:", t);
    if (from && to) {
        all[idx] = [from, to];
        saveCustomWords(all);
        updateRecentAdditions(); updateAll();
    }
};
window.deleteCustomWord = function(idx) {
    const all = loadCustomWords();
    if (confirm("Delete this word?")) {
        all.splice(idx, 1);
        saveCustomWords(all);
        updateRecentAdditions(); updateAll();
    }
};
document.addEventListener("DOMContentLoaded", function() {
    const searchCustom = document.getElementById('search-custom');
    if (searchCustom) searchCustom.oninput = updateRecentAdditions;
});

// --- Hard words add/search ---
function updateHardWordsList() {
    const container = document.getElementById('hard-words-list');
    const clearBtn = document.getElementById('clear-hard-btn');
    if (!container) return;
    const all = loadHardWords();
    const search = (document.getElementById('search-hard')||{value:""}).value.trim().toLowerCase();
    const filtered = all.filter(hw =>
        hw.question.toLowerCase().includes(search) || hw.answer.toLowerCase().includes(search));
    container.innerHTML = filtered.length
        ? filtered.map((hw, i) => `
            <div class="hard-word-item">
                <div class="hard-word-content">${i + 1}. ${hw.question} → ${hw.answer}</div>
                <button class="btn btn-small btn-danger" onclick="window.removeHardWord(${i})">Remove</button>
            </div>
        `).join('')
        : '<p style="color:#8fa9cc;">No hard words yet!</p>';
    if (clearBtn) clearBtn.style.display = all.length ? 'inline-block' : 'none';
}
window.removeHardWord = function(idx) {
    const all = loadHardWords();
    all.splice(idx, 1);
    saveHardWords(all);
    updateHardWordsList(); updateAll();
};
document.addEventListener("DOMContentLoaded", function() {
    const searchHard = document.getElementById('search-hard');
    if (searchHard) searchHard.oninput = updateHardWordsList;
});
function clearHardWords() {
    if (confirm('Are you sure you want to clear all hard words?')) {
        saveHardWords([]);
        updateHardWordsList(); updateAll();
    }
}
window.clearHardWords = clearHardWords;

// --- Add word ---
window.addNewWord = function() {
    const fromInput = document.getElementById('custom-from-word');
    const toInput = document.getElementById('custom-to-word');
    const from = fromInput ? fromInput.value.trim() : "";
    const to = toInput ? toInput.value.trim() : "";
    if (!from || !to) return alert('Please fill in both fields!');
    const all = loadCustomWords();
    if (all.some(([f, t]) => f === from && t === to)) return alert('Word exists.');
    all.push([from, to]);
    saveCustomWords(all);
    if (fromInput) fromInput.value = '';
    if (toInput) toInput.value = '';
    updateRecentAdditions(); updateAll();
    alert('Word added!');
};

// --- Bulk upload ---
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
                const key = `vocab_custom_${from}_${to}`;
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

// --- Quiz logic ---
let quizState = {
    isHard: false,
    isCustom: false,
    stats: { correct: 0, total: 0 },
    qNum: 0,
    currentQ: null,
    currentA: null,
    currentDir: null,
    pendingHard: null,
};
function allWords() {
    let builtin = (currentPair[0] === "fr" && currentPair[1] === "nl") ? VOCAB : [];
    let custom = loadCustomWords();
    return builtin.concat(custom);
}
function generateQuestion() {
    let pairs;
    if (quizState.isHard) {
        pairs = loadHardWords();
    } else if (quizState.isCustom) {
        pairs = loadCustomWords();
    } else {
        pairs = allWords();
    }
    if (!pairs.length) return null;
    const pair = Array.isArray(pairs[0]) ? pairs[Math.floor(Math.random() * pairs.length)] : randomPair(pairs);
    let from, to, dir;
    if (Math.random() < 0.5) {
        from = Array.isArray(pair) ? pair[0] : pair.question.replace(/.*: /, "");
        to = Array.isArray(pair) ? pair[1] : pair.answer;
        dir = "from_to";
    } else {
        from = Array.isArray(pair) ? pair[1] : pair.answer;
        to = Array.isArray(pair) ? pair[0] : pair.question.replace(/.*: /, "");
        dir = "to_from";
    }
    quizState.currentQ = from;
    quizState.currentA = to;
    quizState.currentDir = dir;
    quizState.qNum++;
    return { question: from, answer: to, direction: dir };
}
window.startQuiz = function() {
    quizState.isHard = false;
    quizState.isCustom = false;
    quizState.stats = { correct: 0, total: 0 };
    quizState.qNum = 0;
    showScreen('quiz-screen');
    nextQuestion();
};
window.practiceHardWords = function() {
    quizState.isHard = true;
    quizState.isCustom = false;
    quizState.stats = { correct: 0, total: 0 };
    quizState.qNum = 0;
    showScreen('quiz-screen');
    nextQuestion();
};
window.practiceCustomWords = function() {
    quizState.isCustom = true;
    quizState.isHard = false;
    quizState.stats = { correct: 0, total: 0 };
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
    quizState.stats.total++;
    if (normalizeAnswer(userAnswer) === normalizeAnswer(quizState.currentA)) {
        quizState.stats.correct++;
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
function randomPair(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function updateUI() {
    document.getElementById('vocab-count').textContent = allWords().length;
    document.getElementById('hard-count').textContent = loadHardWords().length;
    document.getElementById('current-score').textContent =
        `${quizState.stats.correct}/${quizState.stats.total}`;
    const percentage = quizState.stats.total > 0 ?
        Math.round((quizState.stats.correct / quizState.stats.total) * 100) : 0;
    document.getElementById('score-percentage').textContent = `${percentage}%`;
    document.getElementById('question-number').textContent = quizState.qNum;
}
window.showScreen = function(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    if (screenId === 'add-word-menu') updateRecentAdditions();
    if (screenId === 'practice-hard-menu') {
        updateRecentAdditions();
        updateHardWordsList();
    }
    if (screenId === 'main-menu') {
        updateRecentAdditions();
        updateHardWordsList();
        updateUI();
    }
    if (screenId === 'upload-bulk-menu') {
        document.getElementById('bulk-upload-preview').innerHTML = '';
    }
};
window.showStatsScreen = function() {
    updateStatsDisplay();
    showScreen('stats-screen');
};
function updateStatsDisplay() {
    document.getElementById('total-questions').textContent = quizState.stats.total;
    document.getElementById('correct-answers').textContent = quizState.stats.correct;
    const acc = quizState.stats.total > 0 ? Math.round((quizState.stats.correct / quizState.stats.total) * 100) : 0;
    document.getElementById('accuracy').textContent = `${acc}%`;
}

// --- Initial load ---
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

// --- Built-in VOCAB for French-Dutch ---
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

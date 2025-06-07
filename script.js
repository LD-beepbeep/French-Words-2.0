// --- Vocabulary Quiz Class ---
class VocabularyQuiz {
    constructor() {
        // Main word lists
        this.vocabularyPairs = [];
        this.hardWords = JSON.parse(localStorage.getItem('hardWords')) || [];
        this.customPracticeMode = false;
        this.isPracticeMode = false;

        // Stats
        this.sessionStats = {
            correct: 0, incorrect: 0, total: 0,
            frenchToDutch: { correct: 0, total: 0 },
            dutchToFrench: { correct: 0, total: 0 }
        };
        this.currentQuestion = null;
        this.currentAnswer = null;
        this.currentDirection = null;
        this.questionNumber = 0;
        this.pendingHardWord = null;

        this.loadDefaultVocabulary();
        this.updateUI();
    }

    // Load default and custom vocabularies
    loadDefaultVocabulary() {
        const defaultVocab = [
            ["la banlieue", "de buitenwijken"],
            ["la campagne", "het platteland"],
            ["le village", "het dorp"],
            ["la ville", "de stad"],
            ["le quartier", "de wijk"],
            ["la rue", "de straat"],
            ["la maison", "het huis"],
            ["l'appartement (m)", "de flat, het appartement"],
            ["le bâtiment", "het gebouw"],
            ["le logement", "de woning"],
            ["le mur", "de muur"],
            ["la porte", "de deur"],
            ["la fenêtre", "het raam"],
            ["le toit", "het dak"],
            ["le sol", "de vloer"],
            ["le plafond", "het plafond"],
            ["l'escalier (m)", "de trap"],
            ["l'ascenseur (m)", "de lift"],
            ["le rez-de-chaussée", "de begane grond"],
            ["le premier étage", "de eerste verdieping"],
            ["le grenier", "de zolder"],
            ["la cave", "de kelder"],
            ["le garage", "de garage"],
            ["le jardin", "de tuin"],
            ["la terrasse", "het terras"],
            ["le balcon", "het balkon"],
            ["le salon", "de woonkamer"],
            ["la salle à manger", "de eetkamer"],
            ["la cuisine", "de keuken"],
            ["la chambre", "de slaapkamer"],
            ["la salle de bains", "de badkamer"],
            ["le lit", "het bed"],
            ["le matelas", "het matras"],
            ["le drap", "het laken"],
            ["l'oreiller (m)", "het kussen"],
            ["la couverture", "de deken"],
            ["la table", "de tafel"],
            ["la chaise", "de stoel"],
            ["le fauteuil", "de fauteuil, de leunstoel"],
            ["le canapé", "de bank"],
            ["la commode", "de ladekast"],
            ["l'armoire (f)", "de kast"],
            ["la lampe", "de lamp"],
            ["la télévision", "de televisie"],
            ["la radio", "de radio"],
            ["le tapis", "het tapijt, het kleed"],
            ["le rideau", "het gordijn"],
            ["le tableau", "het schilderij, het bord"],
            ["la douche", "de douche"],
            ["le lavabo", "de wastafel"],
            ["la baignoire", "het bad"],
            ["le miroir", "de spiegel"],
            ["la serviette", "de handdoek"],
            ["la machine à laver", "de wasmachine"],
            ["le sèche-linge", "de droger"],
            ["la cuisinière", "het fornuis"],
            ["le four", "de oven"],
            ["le micro-ondes", "de magnetron"],
            ["le réfrigérateur", "de koelkast"],
            ["le congélateur", "de vriezer"],
            ["l'évier (m)", "de gootsteen"],
            ["le lave-vaisselle", "de vaatwasser"],
            ["la cafetière", "het koffiezetapparaat"],
            ["le grille-pain", "het broodrooster"],
            ["la vaisselle", "de afwas, het servies"],
            ["la fourchette", "de vork"],
            ["le couteau", "het mes"],
            ["la cuillère", "de lepel"],
            ["le verre", "het glas"],
            ["la tasse", "het kopje"],
            ["l'assiette (f)", "het bord"],
            ["la casserole", "de pan"],
            ["la poêle", "de koekenpan"],
            ["le couloir", "de gang"],
            ["l'entrée (f)", "de hal, de ingang"],
            ["le bureau", "het kantoor, het bureau"],
            ["la clé", "de sleutel"],
            ["la boîte aux lettres", "de brievenbus"],
            ["la sonnette", "de bel"],
            ["le chauffage", "de verwarming"],
            ["la climatisation", "de airconditioning"],
            ["l'électricité (f)", "de elektriciteit"],
            ["l'eau (f)", "het water"],
            ["le gaz", "het gas"],
            ["le loyer", "de huur"],
            ["le propriétaire", "de eigenaar, de huisbaas"],
            ["le locataire", "de huurder"],
            ["déménager", "verhuizen"],
            ["emménager", "intrekken"],
            ["habiter", "wonen"],
            ["vivre", "leven, wonen"],
            ["l'adresse (f)", "het adres"],
            ["la région", "de regio"],
            ["le département", "het departement"],
            ["la province", "de provincie"],
            ["le pays", "het land"],
            ["l'étranger (m)", "het buitenland, de buitenlander"],
            ["la nationalité", "de nationaliteit"],
            ["le citoyen, la citoyenne", "de burger"],
            ["le voisin, la voisine", "de buurman, de buurvrouw"],
            ["le ménage", "het huishouden"],
            ["nettoyer", "schoonmaken"],
            ["balayer", "vegen"],
            ["laver", "wassen"],
            ["repasser", "strijken"],
            ["jeter", "weggooien"],
            ["les ordures (f)", "het afval"],
            ["la poubelle", "de vuilnisbak"],
            ["les toilettes (f)", "het toilet, de wc"]
        ];
        const customVocab = JSON.parse(localStorage.getItem('customVocabulary')) || [];
        this.vocabularyPairs = [...defaultVocab, ...customVocab];
    }

    saveCustomVocabulary() {
        const defaultCount = 107; // Number of default pairs
        const customVocab = this.vocabularyPairs.slice(defaultCount);
        localStorage.setItem('customVocabulary', JSON.stringify(customVocab));
    }

    generateQuestion() {
        let pairs;
        if (this.isPracticeMode) {
            pairs = this.hardWords;
        } else if (this.customPracticeMode) {
            pairs = JSON.parse(localStorage.getItem('customVocabulary')) || [];
        } else {
            pairs = this.vocabularyPairs;
        }
        if (pairs.length === 0) return null;

        const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
        const isFrenchToDutch = Math.random() < 0.5;

        if (this.isPracticeMode) {
            this.currentQuestion = randomPair.question;
            this.currentAnswer = randomPair.answer;
            this.currentDirection = randomPair.direction;
        } else {
            if (isFrenchToDutch) {
                this.currentQuestion = `🇫🇷 → 🇳🇱  Translate: ${randomPair[0]}`;
                this.currentAnswer = randomPair[1];
                this.currentDirection = 'french_to_dutch';
            } else {
                this.currentQuestion = `🇳🇱 → 🇫🇷  Translate: ${randomPair[1]}`;
                this.currentAnswer = randomPair[0];
                this.currentDirection = 'dutch_to_french';
            }
        }
        this.questionNumber++;
        return {
            question: this.currentQuestion,
            answer: this.currentAnswer,
            direction: this.currentDirection
        };
    }

    normalizeAnswer(answer) {
        return answer.toLowerCase()
            .trim()
            .replace(/[.,;:!?()"'-]/g, '')
            .replace(/\s+/g, ' ');
    }

    checkAnswer(userAnswer) {
        const normalizedUser = this.normalizeAnswer(userAnswer);
        const possibleAnswers = this.currentAnswer.split(',').map(ans =>
            ans.split('/').map(a => this.normalizeAnswer(a.trim()))
        ).flat();
        return possibleAnswers.some(ans => ans === normalizedUser);
    }

    submitAnswer(userAnswer) {
        const isCorrect = this.checkAnswer(userAnswer);
        this.sessionStats.total++;
        let statsKey = null;
        if (this.currentDirection === 'french_to_dutch') statsKey = 'frenchToDutch';
        if (this.currentDirection === 'dutch_to_french') statsKey = 'dutchToFrench';

        if (isCorrect) {
            this.sessionStats.correct++;
            if (statsKey) this.sessionStats[statsKey].correct++;
        } else {
            this.sessionStats.incorrect++;
            this.pendingHardWord = {
                question: this.currentQuestion,
                answer: this.currentAnswer,
                direction: this.currentDirection
            };
        }
        if (statsKey) this.sessionStats[statsKey].total++;
        return isCorrect;
    }

    addToHardWords(hardWordData) {
        const exists = this.hardWords.some(hw =>
            hw.question === hardWordData.question && hw.answer === hardWordData.answer
        );
        if (!exists) {
            this.hardWords.push(hardWordData);
            localStorage.setItem('hardWords', JSON.stringify(this.hardWords));
        }
    }

    removeFromHardWords(index) {
        this.hardWords.splice(index, 1);
        localStorage.setItem('hardWords', JSON.stringify(this.hardWords));
    }

    clearHardWords() {
        this.hardWords = [];
        localStorage.setItem('hardWords', JSON.stringify(this.hardWords));
    }

    addCustomWord(french, dutch) {
        this.vocabularyPairs.push([french.trim(), dutch.trim()]);
        this.saveCustomVocabulary();
    }

    updateUI() {
        const setText = (id, value) => {
            const el = document.getElementById(id);
            if (el && el.textContent != value) el.textContent = value;
        };
        setText('vocab-count', this.vocabularyPairs.length);
        setText('hard-count', this.hardWords.length);
        setText('current-score', `${this.sessionStats.correct}/${this.sessionStats.total}`);
        const percentage = this.sessionStats.total > 0 ?
            Math.round((this.sessionStats.correct / this.sessionStats.total) * 100) : 0;
        setText('score-percentage', `${percentage}%`);
        setText('question-number', this.questionNumber);
    }
}

let game = new VocabularyQuiz();

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showMainMenu() {
    game.customPracticeMode = false;
    game.isPracticeMode = false;
    game.updateUI();
    showScreen('main-menu');
}

function startQuiz() {
    game.isPracticeMode = false;
    game.customPracticeMode = false;
    showScreen('quiz-screen');
    nextQuestion();
}

function practiceHardWords() {
    if (game.hardWords.length === 0) {
        alert('No hard words to practice!');
        return;
    }
    game.isPracticeMode = true;
    game.customPracticeMode = false;
    game.questionNumber = 0;
    showScreen('quiz-screen');
    nextQuestion();
}

function practiceCustomWords() {
    const customVocab = JSON.parse(localStorage.getItem('customVocabulary')) || [];
    if (customVocab.length === 0) {
        alert('No custom words to practice!');
        return;
    }
    game.isPracticeMode = false;
    game.customPracticeMode = true;
    game.questionNumber = 0;
    showScreen('quiz-screen');
    nextQuestion();
}

function nextQuestion() {
    const questionData = game.generateQuestion();
    if (!questionData) {
        if (game.customPracticeMode) {
            alert('No custom vocabulary available!');
        } else {
            alert('No vocabulary available!');
        }
        showMainMenu();
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
    game.updateUI();
}

function submitAnswer() {
    const userAnswer = document.getElementById('answer-input').value.trim();
    if (!userAnswer) {
        alert('Please enter an answer!');
        return;
    }
    const isCorrect = game.submitAnswer(userAnswer);
    const feedback = document.getElementById('feedback');
    if (isCorrect) {
        feedback.textContent = '✅ Correct! Well done!';
        feedback.className = 'feedback correct';
        if (game.isPracticeMode) {
            setTimeout(() => {
                if (confirm('Remove this word from hard words list?')) {
                    const hardWordIndex = game.hardWords.findIndex(hw =>
                        hw.question === game.currentQuestion && hw.answer === game.currentAnswer
                    );
                    if (hardWordIndex !== -1) {
                        game.removeFromHardWords(hardWordIndex);
                        game.updateUI();
                    }
                }
                setTimeout(nextQuestion, 1000);
            }, 1000);
        } else {
            setTimeout(nextQuestion, 1000);
        }
    } else {
        feedback.textContent = `❌ Incorrect. The correct answer is: ${game.currentAnswer}`;
        feedback.className = 'feedback incorrect';
        setTimeout(() => {
            if (!game.isPracticeMode) {
                showHardWordsModal();
            } else {
                setTimeout(nextQuestion, 1500);
            }
        }, 1000);
    }
    game.updateUI();
}

function showHardWordsModal() {
    const modal = document.getElementById('hard-words-modal');
    modal.classList.add('active');
}
function addToHardWords(shouldAdd) {
    if (shouldAdd && game.pendingHardWord) {
        game.addToHardWords(game.pendingHardWord);
        game.updateUI();
    }
    document.getElementById('hard-words-modal').classList.remove('active');
    game.pendingHardWord = null;
    setTimeout(nextQuestion, 500);
}

function addNewWord() {
    const frenchWord = document.getElementById('french-word').value.trim();
    const dutchWord = document.getElementById('dutch-word').value.trim();
    if (!frenchWord || !dutchWord) {
        alert('Please fill in both French and Dutch translations!');
        return;
    }
    game.addCustomWord(frenchWord, dutchWord);
    document.getElementById('french-word').value = '';
    document.getElementById('dutch-word').value = '';
    game.updateUI();
    updateRecentAdditions();
    alert('Word added successfully!');
}

function updateRecentAdditions() {
    const container = document.getElementById('recent-list');
    const customVocab = JSON.parse(localStorage.getItem('customVocabulary')) || [];
    if (customVocab.length === 0) {
        container.innerHTML = '<p>No custom words added yet.</p>';
        return;
    }
    const recent = customVocab.slice(-10).reverse();
    let html = '';
    recent.forEach(([french, dutch]) => {
        html += `<div class="recent-item"><strong>${french}</strong> → ${dutch}</div>`;
    });
    container.innerHTML = html;
}

function updateHardWordsList() {
    const container = document.getElementById('hard-words-list');
    const practiceBtn = document.getElementById('practice-hard-btn');
    const clearBtn = document.getElementById('clear-hard-btn');
    if (game.hardWords.length === 0) {
        container.innerHTML = '<p>No hard words yet!</p>';
        practiceBtn.style.display = 'none';
        clearBtn.style.display = 'none';
        return;
    }
    let html = `<h3>Hard Words (${game.hardWords.length}):</h3>`;
    game.hardWords.forEach((hardWord, index) => {
        let wordDisplay = '';
        if (hardWord.question.includes('🇫🇷 → 🇳🇱')) {
            const word = hardWord.question.replace('🇫🇷 → 🇳🇱  Translate: ', '');
            wordDisplay = `${word} (French) → ${hardWord.answer} (Dutch)`;
        } else if (hardWord.question.includes('🇳🇱 → 🇫🇷')) {
            const word = hardWord.question.replace('🇳🇱 → 🇫🇷  Translate: ', '');
            wordDisplay = `${word} (Dutch) → ${hardWord.answer} (French)`;
        }
        html += `
            <div class="hard-word-item">
                <div class="hard-word-content">${index + 1}. ${wordDisplay}</div>
                <button class="remove-hard-btn" onclick="removeHardWord(${index})">Remove</button>
            </div>
        `;
    });
    container.innerHTML = html;
    practiceBtn.style.display = 'inline-block';
    clearBtn.style.display = 'inline-block';
}
function removeHardWord(index) {
    game.removeFromHardWords(index);
    updateHardWordsList();
    game.updateUI();
}
function clearHardWords() {
    if (confirm('Are you sure you want to clear all hard words?')) {
        game.clearHardWords();
        updateHardWordsList();
        game.updateUI();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Enter key submits answer
    const answerInput = document.getElementById('answer-input');
    if (answerInput) {
        answerInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                submitAnswer();
            }
        });
    }
    // Enter support for add words form
    document.getElementById('dutch-word').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') addNewWord();
    });
    document.getElementById('french-word').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') document.getElementById('dutch-word').focus();
    });
    // Initial UI update
    game.updateUI();
    updateRecentAdditions();
    updateHardWordsList();
});

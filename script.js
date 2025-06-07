// --- Vocabulary Quiz Class ---
class VocabularyQuiz {
    constructor() {
        this.premadeVocabulary = [
            ["la banlieue", "de buitenwijken", "the suburbs"],
            ["la campagne", "het platteland", "the countryside"],
            ["le village", "het dorp", "the village"],
            ["la ville", "de stad", "the city"],
            ["le quartier", "de wijk", "the district"],
            ["la rue", "de straat", "the street"],
            ["la maison", "het huis", "the house"],
            ["l'appartement (m)", "de flat, het appartement", "the apartment"],
            ["le bâtiment", "het gebouw", "the building"],
            ["le logement", "de woning", "the accommodation"],
            ["le mur", "de muur", "the wall"],
            ["la porte", "de deur", "the door"],
            ["la fenêtre", "het raam", "the window"],
            ["le toit", "het dak", "the roof"],
            ["le sol", "de vloer", "the floor"],
            ["le plafond", "het plafond", "the ceiling"],
            ["l'escalier (m)", "de trap", "the stairs"],
            ["l'ascenseur (m)", "de lift", "the elevator"],
            ["le rez-de-chaussée", "de begane grond", "the ground floor"],
            ["le premier étage", "de eerste verdieping", "the first floor"],
            ["le grenier", "de zolder", "the attic"],
            ["la cave", "de kelder", "the cellar"],
            ["le garage", "de garage", "the garage"],
            ["le jardin", "de tuin", "the garden"],
            ["la terrasse", "het terras", "the terrace"],
            ["le balcon", "het balkon", "the balcony"],
            ["le salon", "de woonkamer", "the living room"],
            ["la salle à manger", "de eetkamer", "the dining room"],
            ["la cuisine", "de keuken", "the kitchen"],
            ["la chambre", "de slaapkamer", "the bedroom"],
            ["la salle de bains", "de badkamer", "the bathroom"],
            ["le lit", "het bed", "the bed"],
            ["le matelas", "het matras", "the mattress"],
            ["le drap", "het laken", "the sheet"],
            ["l'oreiller (m)", "het kussen", "the pillow"],
            ["la couverture", "de deken", "the blanket"],
            ["la table", "de tafel", "the table"],
            ["la chaise", "de stoel", "the chair"],
            ["le fauteuil", "de fauteuil, de leunstoel", "the armchair"],
            ["le canapé", "de bank", "the couch"],
            ["la commode", "de ladekast", "the chest of drawers"],
            ["l'armoire (f)", "de kast", "the wardrobe"],
            ["la lampe", "de lamp", "the lamp"],
            ["la télévision", "de televisie", "the television"],
            ["la radio", "de radio", "the radio"],
            ["le tapis", "het tapijt, het kleed", "the carpet"],
            ["le rideau", "het gordijn", "the curtain"],
            ["le tableau", "het schilderij, het bord", "the painting / the board"],
            ["la douche", "de douche", "the shower"],
            ["le lavabo", "de wastafel", "the washbasin"],
            ["la baignoire", "het bad", "the bathtub"],
            ["le miroir", "de spiegel", "the mirror"],
            ["la serviette", "de handdoek", "the towel"],
            ["la machine à laver", "de wasmachine", "the washing machine"],
            ["le sèche-linge", "de droger", "the dryer"],
            ["la cuisinière", "het fornuis", "the cooker"],
            ["le four", "de oven", "the oven"],
            ["le micro-ondes", "de magnetron", "the microwave"],
            ["le réfrigérateur", "de koelkast", "the fridge"],
            ["le congélateur", "de vriezer", "the freezer"],
            ["l'évier (m)", "de gootsteen", "the sink"],
            ["le lave-vaisselle", "de vaatwasser", "the dishwasher"],
            ["la cafetière", "het koffiezetapparaat", "the coffee maker"],
            ["le grille-pain", "het broodrooster", "the toaster"],
            ["la vaisselle", "de afwas, het servies", "the dishes"],
            ["la fourchette", "de vork", "the fork"],
            ["le couteau", "het mes", "the knife"],
            ["la cuillère", "de lepel", "the spoon"],
            ["le verre", "het glas", "the glass"],
            ["la tasse", "het kopje", "the cup"],
            ["l'assiette (f)", "het bord", "the plate"],
            ["la casserole", "de pan", "the saucepan"],
            ["la poêle", "de koekenpan", "the frying pan"],
            ["le couloir", "de gang", "the corridor"],
            ["l'entrée (f)", "de hal, de ingang", "the entrance"],
            ["le bureau", "het kantoor, het bureau", "the office / the desk"],
            ["la clé", "de sleutel", "the key"],
            ["la boîte aux lettres", "de brievenbus", "the mailbox"],
            ["la sonnette", "de bel", "the bell"],
            ["le chauffage", "de verwarming", "the heating"],
            ["la climatisation", "de airconditioning", "the air conditioning"],
            ["l'électricité (f)", "de elektriciteit", "the electricity"],
            ["l'eau (f)", "het water", "the water"],
            ["le gaz", "het gas", "the gas"],
            ["le loyer", "de huur", "the rent"],
            ["le propriétaire", "de eigenaar, de huisbaas", "the owner / landlord"],
            ["le locataire", "de huurder", "the tenant"],
            ["déménager", "verhuizen", "to move"],
            ["emménager", "intrekken", "to move in"],
            ["habiter", "wonen", "to live"],
            ["vivre", "leven, wonen", "to live"],
            ["l'adresse (f)", "het adres", "the address"],
            ["la région", "de regio", "the region"],
            ["le département", "het departement", "the department"],
            ["la province", "de provincie", "the province"],
            ["le pays", "het land", "the country"],
            ["l'étranger (m)", "het buitenland, de buitenlander", "the abroad / foreigner"],
            ["la nationalité", "de nationaliteit", "the nationality"],
            ["le citoyen, la citoyenne", "de burger", "the citizen"],
            ["le voisin, la voisine", "de buurman, de buurvrouw", "the neighbor"],
            ["le ménage", "het huishouden", "the household"],
            ["nettoyer", "schoonmaken", "to clean"],
            ["balayer", "vegen", "to sweep"],
            ["laver", "wassen", "to wash"],
            ["repasser", "strijken", "to iron"],
            ["jeter", "weggooien", "to throw away"],
            ["les ordures (f)", "het afval", "the garbage"],
            ["la poubelle", "de vuilnisbak", "the bin"],
            ["les toilettes (f)", "het toilet, de wc", "the toilet"]
        ];
        this.customVocabulary = JSON.parse(localStorage.getItem('customVocabulary')) || [];
        this.hardWords = JSON.parse(localStorage.getItem('hardWords')) || [];
        this.customPracticeMode = false;
        this.isPracticeMode = false;
        this.quizLanguageMode = "fr-nl"; // "fr-nl", "en-nl", or "en-fr"
        this.sessionStats = {
            correct: 0, incorrect: 0, total: 0,
            frenchToDutch: { correct: 0, total: 0 },
            dutchToFrench: { correct: 0, total: 0 },
            englishToDutch: { correct: 0, total: 0 },
            dutchToEnglish: { correct: 0, total: 0 },
            englishToFrench: { correct: 0, total: 0 },
            frenchToEnglish: { correct: 0, total: 0 },
        };
        this.currentQuestion = null;
        this.currentAnswer = null;
        this.currentDirection = null;
        this.questionNumber = 0;
        this.pendingHardWord = null;
        this.updateUI();
    }

    getAllWords() {
        // Only official and your custom words, not randoms
        // For custom, fill with three columns (french, dutch, english) and empty string for English if not set
        return [
            ...this.premadeVocabulary,
            ...this.customVocabulary.map(entry => {
                if (entry.length === 3) return entry;
                if (entry.length === 2) return [entry[0], entry[1], ""];
                return ["", "", ""];
            })
        ];
    }

    saveCustomVocabulary() {
        localStorage.setItem('customVocabulary', JSON.stringify(this.customVocabulary));
    }

    generateQuestion() {
        let pairs;
        if (this.isPracticeMode) {
            pairs = this.hardWords;
        } else if (this.customPracticeMode) {
            pairs = this.customVocabulary.map(entry => {
                if (entry.length === 3) return entry;
                if (entry.length === 2) return [entry[0], entry[1], ""];
                return ["", "", ""];
            });
        } else {
            pairs = this.getAllWords();
        }
        if (pairs.length === 0) return null;

        let randomPair = pairs[Math.floor(Math.random() * pairs.length)];
        let question, answer, direction;

        // Language selector logic
        if (this.quizLanguageMode === "fr-nl") {
            const isFrenchToDutch = Math.random() < 0.5;
            if (isFrenchToDutch) {
                question = `🇫🇷 → 🇳🇱  Translate: ${randomPair[0]}`;
                answer = randomPair[1];
                direction = 'french_to_dutch';
            } else {
                question = `🇳🇱 → 🇫🇷  Translate: ${randomPair[1]}`;
                answer = randomPair[0];
                direction = 'dutch_to_french';
            }
        } else if (this.quizLanguageMode === "en-nl") {
            const isEngToDutch = Math.random() < 0.5;
            if (isEngToDutch) {
                question = `🇬🇧 → 🇳🇱  Translate: ${randomPair[2]}`;
                answer = randomPair[1];
                direction = 'english_to_dutch';
            } else {
                question = `🇳🇱 → 🇬🇧  Translate: ${randomPair[1]}`;
                answer = randomPair[2];
                direction = 'dutch_to_english';
            }
        } else if (this.quizLanguageMode === "en-fr") {
            const isEngToFrench = Math.random() < 0.5;
            if (isEngToFrench) {
                question = `🇬🇧 → 🇫🇷  Translate: ${randomPair[2]}`;
                answer = randomPair[0];
                direction = 'english_to_french';
            } else {
                question = `🇫🇷 → 🇬🇧  Translate: ${randomPair[0]}`;
                answer = randomPair[2];
                direction = 'french_to_english';
            }
        }

        this.currentQuestion = question;
        this.currentAnswer = answer;
        this.currentDirection = direction;
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
        if (this.currentDirection === 'english_to_dutch') statsKey = 'englishToDutch';
        if (this.currentDirection === 'dutch_to_english') statsKey = 'dutchToEnglish';
        if (this.currentDirection === 'english_to_french') statsKey = 'englishToFrench';
        if (this.currentDirection === 'french_to_english') statsKey = 'frenchToEnglish';

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
        // Only add if not empty and not duplicate
        if (!french.trim() || !dutch.trim()) return;
        if (this.customVocabulary.some(([f, d]) => f === french.trim() && d === dutch.trim())) return;
        this.customVocabulary.push([french.trim(), dutch.trim(), ""]);
        this.saveCustomVocabulary();
    }

    updateUI() {
        const setText = (id, value) => {
            const el = document.getElementById(id);
            if (el && el.textContent != value) el.textContent = value;
        };
        setText('vocab-count', this.getAllWords().length);
        setText('hard-count', this.hardWords.length);
        setText('current-score', `${this.sessionStats.correct}/${this.sessionStats.total}`);
        const percentage = this.sessionStats.total > 0 ?
            Math.round((this.sessionStats.correct / this.sessionStats.total) * 100) : 0;
        setText('score-percentage', `${percentage}%`);
        setText('question-number', this.questionNumber);
    }
}

let game = new VocabularyQuiz();

function setQuizLanguage() {
    const sel = document.getElementById("lang-choice");
    game.quizLanguageMode = sel.value;
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    // Update recent lists and hard words list for each section as needed
    if (screenId === 'add-word-menu') updateRecentAdditions();
    if (screenId === 'practice-hard-menu') {
        updateRecentAdditions('recent-list-hard');
        updateHardWordsList();
    }
    if (screenId === 'main-menu') {
        updateRecentAdditions();
        updateHardWordsList();
        game.updateUI();
    }
}

function showStatsScreen() {
    updateStatsDisplay();
    showScreen('stats-screen');
}

function updateStatsDisplay() {
    const stats = game.sessionStats;
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
    if (game.customVocabulary.length === 0) {
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
    } else if (questionData.question.includes('🇬🇧 → 🇳🇱')) {
        directionText = '🇬🇧 → 🇳🇱';
        document.getElementById('question-text').textContent =
            questionData.question.replace('🇬🇧 → 🇳🇱  Translate: ', '');
    } else if (questionData.question.includes('🇳🇱 → 🇬🇧')) {
        directionText = '🇳🇱 → 🇬🇧';
        document.getElementById('question-text').textContent =
            questionData.question.replace('🇳🇱 → 🇬🇧  Translate: ', '');
    } else if (questionData.question.includes('🇬🇧 → 🇫🇷')) {
        directionText = '🇬🇧 → 🇫🇷';
        document.getElementById('question-text').textContent =
            questionData.question.replace('🇬🇧 → 🇫🇷  Translate: ', '');
    } else if (questionData.question.includes('🇫🇷 → 🇬🇧')) {
        directionText = '🇫🇷 → 🇬🇧';
        document.getElementById('question-text').textContent =
            questionData.question.replace('🇫🇷 → 🇬🇧  Translate: ', '');
    }
    document.getElementById('question-direction').textContent = directionText;
    document.getElementById('answer-input').value = '';
    document.getElementById('answer-input').focus();
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    game.updateUI();
    updateHardWordsList();
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
                        updateHardWordsList();
                    }
                }
                setTimeout(nextQuestion, 900);
            }, 900);
        } else {
            setTimeout(nextQuestion, 900);
        }
    } else {
        feedback.textContent = `❌ Incorrect. The correct answer is: ${game.currentAnswer}`;
        feedback.className = 'feedback incorrect';
        setTimeout(() => {
            if (!game.isPracticeMode) {
                showHardWordsModal();
            } else {
                setTimeout(nextQuestion, 1400);
            }
        }, 900);
    }
    game.updateUI();
    updateHardWordsList();
}

function showHardWordsModal() {
    const modal = document.getElementById('hard-words-modal');
    document.body.style.overflow = 'hidden';
    modal.classList.add('active');
    modal.focus();
}
function addToHardWords(shouldAdd) {
    if (shouldAdd && game.pendingHardWord) {
        game.addToHardWords(game.pendingHardWord);
        game.updateUI();
        updateHardWordsList();
    }
    document.getElementById('hard-words-modal').classList.remove('active');
    document.body.style.overflow = '';
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

function updateRecentAdditions(elementId = 'recent-list') {
    const container = document.getElementById(elementId);
    const customVocab = game.customVocabulary;
    if (!container) return;
    if (customVocab.length === 0) {
        container.innerHTML = '<p style="color:#8fa9cc;">No custom words added yet.</p>';
        return;
    }
    const recent = customVocab.slice(-10).reverse();
    let html = '';
    recent.forEach(([french, dutch, english]) => {
        html += `<div class="recent-item"><strong>${french}</strong> → ${dutch}</div>`;
    });
    container.innerHTML = html;
}

function updateHardWordsList() {
    const container = document.getElementById('hard-words-list');
    const clearBtn = document.getElementById('clear-hard-btn');
    if (!container) return;
    if (game.hardWords.length === 0) {
        container.innerHTML = '<p style="color:#8fa9cc;">No hard words yet!</p>';
        if (clearBtn) clearBtn.style.display = 'none';
        return;
    }
    let html = '';
    game.hardWords.forEach((hardWord, index) => {
        let wordDisplay = '';
        if (hardWord.question && hardWord.question.includes('🇫🇷 → 🇳🇱')) {
            const word = hardWord.question.replace('🇫🇷 → 🇳🇱  Translate: ', '');
            wordDisplay = `${word} (French) → ${hardWord.answer} (Dutch)`;
        } else if (hardWord.question && hardWord.question.includes('🇳🇱 → 🇫🇷')) {
            const word = hardWord.question.replace('🇳🇱 → 🇫🇷  Translate: ', '');
            wordDisplay = `${word} (Dutch) → ${hardWord.answer} (French)`;
        } else if (hardWord.question && hardWord.question.includes('🇬🇧 → 🇳🇱')) {
            const word = hardWord.question.replace('🇬🇧 → 🇳🇱  Translate: ', '');
            wordDisplay = `${word} (English) → ${hardWord.answer} (Dutch)`;
        } else if (hardWord.question && hardWord.question.includes('🇳🇱 → 🇬🇧')) {
            const word = hardWord.question.replace('🇳🇱 → 🇬🇧  Translate: ', '');
            wordDisplay = `${word} (Dutch) → ${hardWord.answer} (English)`;
        } else if (hardWord.question && hardWord.question.includes('🇬🇧 → 🇫🇷')) {
            const word = hardWord.question.replace('🇬🇧 → 🇫🇷  Translate: ', '');
            wordDisplay = `${word} (English) → ${hardWord.answer} (French)`;
        } else if (hardWord.question && hardWord.question.includes('🇫🇷 → 🇬🇧')) {
            const word = hardWord.question.replace('🇫🇷 → 🇬🇧  Translate: ', '');
            wordDisplay = `${word} (French) → ${hardWord.answer} (English)`;
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
    // Modal: close on ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.getElementById('hard-words-modal').classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    // Initial UI update
    game.updateUI();
    updateRecentAdditions();
    updateHardWordsList();
    setQuizLanguage();
});

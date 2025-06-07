// Game State Management
class VocabularyQuiz {
    constructor() {
        this.vocabularyPairs = [];
        this.hardWords = JSON.parse(localStorage.getItem('hardWords')) || [];
        this.sessionStats = {
            correct: 0,
            incorrect: 0,
            total: 0,
            frenchToDutch: { correct: 0, total: 0 },
            dutchToFrench: { correct: 0, total: 0 }
        };
        this.currentQuestion = null;
        this.currentAnswer = null;
        this.currentDirection = null;
        this.questionNumber = 0;
        this.isPracticeMode = false;
        this.pendingHardWord = null;
        
        this.loadDefaultVocabulary();
        this.updateUI();
    }

    loadDefaultVocabulary() {
        // Default vocabulary from your file
        const defaultVocab = [
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
            ["rose", "roze"],
            ["jaune", "geel"],
            ["blanc, blanche", "wit"],
            ["vert(e)", "groen"],
            ["noir(e)", "zwart"],
            ["brun(e)", "bruin"],
            ["rouge", "rood"],
            ["mauve", "paars"],
            ["bleu(e)", "blauw"],
            ["orange", "oranje"],
            ["gris(e)", "grijs"],
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
            ["l'ascenseur (m)", "de lift"],
            ["l'armoire (f)", "de kast"],
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
            ["l'étagère (f)", "het rek"],
            ["l'évier (m)", "de gootsteen"],
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
            ["l'ordinateur (m)", "de computer"],
            ["l'oreiller (m)", "het hoofdkussen"],
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
            ["le hall (d'entrée)", "de (inkom)hal"],
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
            ["les toilettes (f)", "het toilet, de wc"]
        ];

        // Load custom vocabulary from localStorage
        const customVocab = JSON.parse(localStorage.getItem('customVocabulary')) || [];
        this.vocabularyPairs = [...defaultVocab, ...customVocab];
    }

    saveCustomVocabulary() {
        const defaultCount = 107; // Number of default vocabulary pairs
        const customVocab = this.vocabularyPairs.slice(defaultCount);
        localStorage.setItem('customVocabulary', JSON.stringify(customVocab));
    }

    generateQuestion() {
        const pairs = this.isPracticeMode ? this.hardWords : this.vocabularyPairs;
        if (pairs.length === 0) return null;

        const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
        const isFrenchhToDutch = Math.random() < 0.5;

        if (this.isPracticeMode) {
            // For hard words, use stored question format
            this.currentQuestion = randomPair.question;
            this.currentAnswer = randomPair.answer;
            this.currentDirection = randomPair.direction;
        } else {
            // For regular quiz
            if (isFrenchhToDutch) {
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

        if (isCorrect) {
            this.sessionStats.correct++;
            this.sessionStats[this.currentDirection.replace('_', 'To')].correct++;
        } else {
            this.sessionStats.incorrect++;
            // Store pending hard word for modal
            this.pendingHardWord = {
                question: this.currentQuestion,
                answer: this.currentAnswer,
                direction: this.currentDirection
            };
        }

        this.sessionStats[this.currentDirection.replace('_', 'To')].total++;
        return isCorrect;
    }

    addToHardWords(hardWordData) {
        // Check if already exists
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
        // Update vocabulary count
        document.getElementById('vocab-count').textContent = this.vocabularyPairs.length;
        
        // Update hard words count
        document.getElementById('hard-count').textContent = this.hardWords.length;
        
        // Update score display
        const percentage = this.sessionStats.total > 0 ? 
            Math.round((this.sessionStats.correct / this.sessionStats.total) * 100) : 0;
        
        document.getElementById('current-score').textContent = 
            `${this.sessionStats.correct}/${this.sessionStats.total}`;
        document.getElementById('score-percentage').textContent = `${percentage}%`;
        document.getElementById('question-number').textContent = this.questionNumber;
    }
}

// Global game instance
let game = new VocabularyQuiz();

// Screen Management Functions
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showMainMenu() {
    game.updateUI();
    showScreen('main-menu');
}

function startQuiz() {
    game.isPracticeMode = false;
    showScreen('quiz-screen');
    nextQuestion();
}

function showAddWords() {
    showScreen('add-words-screen');
    updateRecentAdditions();
}

function showHardWords() {
    showScreen('hard-words-screen');
    updateHardWordsList();
}

function showStats() {
    showScreen('stats-screen');
    updateStatsDisplay();
}

function showQuizMenu() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Quiz Menu</h3>
            <div class="modal-buttons">
                <button class="btn btn-primary" onclick="continueQuiz()">Continue Quiz</button>
                <button class="btn btn-secondary" onclick="showStats(); closeModal()">View Stats</button>
                <button class="btn btn-secondary" onclick="showHardWords(); closeModal()">Hard Words</button>
                <button class="btn btn-danger" onclick="showMainMenu(); closeModal()">End Quiz</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function continueQuiz() {
    closeModal();
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.remove());
}

// Quiz Functions
function nextQuestion() {
    const questionData = game.generateQuestion();
    if (!questionData) {
        alert('No vocabulary available!');
        return;
    }

    // Extract direction for display
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
            // Ask if they want to remove from hard words
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
            setTimeout(nextQuestion, 1500);
        }
    } else {
        feedback.textContent = `❌ Incorrect. The correct answer is: ${game.currentAnswer}`;
        feedback.className = 'feedback incorrect';
        
        // Show modal to add to hard words
        setTimeout(() => {
            if (!game.isPracticeMode) {
                showHardWordsModal();
            } else {
                setTimeout(nextQuestion, 2000);
            }
        }, 1500);
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
    
    // Continue to next question after delay
    setTimeout(nextQuestion, 1000);
}

// Hard Words Functions
function updateHardWordsList() {
    const container = document.getElementById('hard-words-list');
    const practiceBtn = document.getElementById('practice-hard-btn');
    const clearBtn = document.getElementById('clear-hard-btn');

    if (game.hardWords.length === 0) {
        container.innerHTML = '<p>No hard words yet! Words you get wrong can be added to this list for focused practice.</p>';
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

function practiceHardWords() {
    if (game.hardWords.length === 0) {
        alert('No hard words to practice!');
        return;
    }
    
    game.isPracticeMode = true;
    game.questionNumber = 0;
    showScreen('quiz-screen');
    nextQuestion();
}

function clearHardWords() {
    if (confirm('Are you sure you want to clear all hard words?')) {
        game.clearHardWords();
        updateHardWordsList();
        game.updateUI();
    }
}

// Add Words Functions
function addNewWord() {
    const frenchWord = document.getElementById('french-word').value.trim();
    const dutchWord = document.getElementById('dutch-word').value.trim();

    if (!frenchWord || !dutchWord) {
        alert('Please fill in both French and Dutch translations!');
        return;
    }

    game.addCustomWord(frenchWord, dutchWord);
    
    // Clear inputs
    document.getElementById('french-word').value = '';
    document.getElementById('dutch-word').value = '';
    
    // Update displays
    game.updateUI();
    updateRecentAdditions();
    
    // Show success message
    alert('Word added successfully!');
}

function updateRecentAdditions() {
    const container = document.getElementById('recent-list');
    const customVocab = JSON.parse(localStorage.getItem('customVocabulary')) || [];
    
    if (customVocab.length === 0) {
        container.innerHTML = '<p>No custom words added yet.</p>';
        return;
    }

    // Show last 10 additions
    const recent = customVocab.slice(-10).reverse();
    let html = '';
    
    recent.forEach(([french, dutch]) => {
        html += `
            <div class="recent-item">
                <strong>${french}</strong> → ${dutch}
            </div>
        `;
    });

    container.innerHTML = html;
}

// Statistics Functions
function updateStatsDisplay() {
    const stats = game.sessionStats;
    
    document.getElementById('total-questions').textContent = stats.total;
    document.getElementById('correct-answers').textContent = stats.correct;
    
    const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    document.getElementById('accuracy').textContent = `${accuracy}%`;
    
    // Direction-specific stats
    const frToNl = stats.frenchToDutch;
    const frToNlPct = frToNl.total > 0 ? Math.round((frToNl.correct / frToNl.total) * 100) : 0;
    document.getElementById('fr-to-nl-stats').textContent = 
        `${frToNl.correct}/${frToNl.total} (${frToNlPct}%)`;
    
    const nlToFr = stats.dutchToFrench;
    const nlToFrPct = nlToFr.total > 0 ? Math.round((nlToFr.correct / nlToFr.total) * 100) : 0;
    document.getElementById('nl-to-fr-stats').textContent = 
        `${nlToFr.correct}/${nlToFr.total} (${nlToFrPct}%)`;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Enter key support for answer input
    document.getElementById('answer-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitAnswer();
        }
    });
    
    // Enter key support for add words form
    document.getElementById('dutch-word').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNewWord();
        }
    });
    
    document.getElementById('french-word').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('dutch-word').focus();
        }
    });
    
    // Initialize UI
    game.updateUI();
});

// Utility Functions
function resetSession() {
    game.sessionStats = {
        correct: 0,
        incorrect: 0,
        total: 0,
        frenchToDutch: { correct: 0, total: 0 },
        dutchToFrench: { correct: 0, total: 0 }
    };
    game.questionNumber = 0;
    game.updateUI();
}
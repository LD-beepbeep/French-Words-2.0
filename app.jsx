import React, { useState, useEffect } from "react";
import LanguageSelector from "./components/LanguageSelector";
import AddWord from "./components/AddWord";
import UploadBulk from "./components/UploadBulk";
import WordsList from "./components/WordsList";
import HardWords from "./components/HardWords";
import Quiz from "./components/Quiz";
import "./App.css";

const SUPPORTED_LANGS = [
  { code: "fr", name: "French" },
  { code: "nl", name: "Dutch" },
  { code: "en", name: "English" },
  { code: "de", name: "German" },
  { code: "es", name: "Spanish" },
  { code: "it", name: "Italian" },
];

function App() {
  // Language selection
  const [fromLang, setFromLang] = useState("fr");
  const [toLang, setToLang] = useState("nl");
  // Word storage
  const [words, setWords] = useState(() => {
    try { return JSON.parse(localStorage.getItem("vocab_words_v2")) || []; }
    catch { return []; }
  });
  const [hardWords, setHardWords] = useState(() => {
    try { return JSON.parse(localStorage.getItem("vocab_hard_v2")) || []; }
    catch { return []; }
  });
  // Quiz modal state
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    localStorage.setItem("vocab_words_v2", JSON.stringify(words));
  }, [words]);
  useEffect(() => {
    localStorage.setItem("vocab_hard_v2", JSON.stringify(hardWords));
  }, [hardWords]);

  return (
    <div className="container">
      <header>
        <h1>Vocabulary Trainer</h1>
        <div className="footer-head">Made by Lars</div>
      </header>
      <LanguageSelector
        fromLang={fromLang}
        toLang={toLang}
        setFromLang={setFromLang}
        setToLang={setToLang}
        supported={SUPPORTED_LANGS}
      />
      <AddWord
        fromLang={fromLang}
        toLang={toLang}
        words={words}
        setWords={setWords}
      />
      <UploadBulk
        fromLang={fromLang}
        toLang={toLang}
        setWords={setWords}
        words={words}
        supported={SUPPORTED_LANGS}
      />
      <WordsList
        words={words}
        setWords={setWords}
        fromLang={fromLang}
        toLang={toLang}
      />
      <HardWords
        hardWords={hardWords}
        setHardWords={setHardWords}
        fromLang={fromLang}
        toLang={toLang}
      />
      <div className="quiz-section">
        <button className="btn btn-accent" onClick={() => setShowQuiz(true)}>
          Start Quiz
        </button>
      </div>
      {showQuiz && (
        <Quiz
          words={words}
          hardWords={hardWords}
          setHardWords={setHardWords}
          fromLang={fromLang}
          toLang={toLang}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
}
import { ThemeProvider, useTheme } from "./theme";
// ... (rest of your imports)

function ThemeToggleBtn() {
  const { theme, setTheme } = useTheme();
  return (
    <button className="theme-toggle"
      title="Switch theme"
      aria-label="Switch theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}

function App() {
  // ... (your app state as before)
  return (
    <ThemeProvider>
      <div className="container">
        <ThemeToggleBtn />
        {/* ...rest of your UI... */}
      </div>
    </ThemeProvider>
  );
}
export default App;

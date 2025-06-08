import React, { useState } from "react";

function Quiz({ words, hardWords, setHardWords, fromLang, toLang, onClose }) {
  const filtered = words.filter(w => w.fromLang === fromLang && w.toLang === toLang);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState({ correct: 0, total: 0 });

  if (!filtered.length) return <div>No words for this pair.</div>;
  const pair = filtered[idx % filtered.length];
  const askFrom = Math.random() < 0.5;
  const question = askFrom ? pair.from : pair.to;
  const answer = askFrom ? pair.to : pair.from;

  function submit(e) {
    e.preventDefault();
    setScore(s => ({ ...s, total: s.total + 1 }));
    if (input.trim().toLowerCase() === answer.trim().toLowerCase()) {
      setScore(s => ({ ...s, correct: s.correct + 1 }));
      setFeedback("✅ Correct!");
      setTimeout(() => {
        setFeedback("");
        setInput("");
        setIdx(i => i + 1);
      }, 800);
    } else {
      setFeedback(`❌ Incorrect. Answer: ${answer}`);
      // Add to hard words
      if (!hardWords.some(w => w.from === pair.from && w.to === pair.to && w.fromLang === fromLang && w.toLang === toLang))
        setHardWords([...hardWords, { ...pair }]);
      setTimeout(() => {
        setFeedback("");
        setInput("");
        setIdx(i => i + 1);
      }, 1400);
    }
  }

  return (
    <div className="modal active">
      <div className="modal-content">
        <button className="close" onClick={onClose}>×</button>
        <h2>Quiz</h2>
        <div>
          <b>{question}</b> → ?
        </div>
        <form onSubmit={submit}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
          />
          <button className="btn" type="submit">Submit</button>
        </form>
        <div>{feedback}</div>
        <div>
          Score: {score.correct}/{score.total}
        </div>
      </div>
    </div>
  );
}
export default Quiz;

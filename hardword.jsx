import React from "react";

function HardWords({ hardWords, setHardWords, fromLang, toLang }) {
  const filtered = hardWords.filter(w => w.fromLang === fromLang && w.toLang === toLang);

  function handleDelete(idx) {
    setHardWords(hardWords.filter((w, i) => !(i === idx && w.fromLang === fromLang && w.toLang === toLang)));
  }

  return (
    <div className="card">
      <h2>Hard Words</h2>
      {filtered.length === 0 && <div>No hard words for this pair.</div>}
      {filtered.map((word, i) => (
        <div className="hard-word-item" key={i}>
          {word.from} → {word.to}
          <button className="btn btn-secondary" onClick={() => handleDelete(i)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
export default HardWords;

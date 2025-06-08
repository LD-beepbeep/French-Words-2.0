import React from "react";

function WordsList({ words, setWords, fromLang, toLang }) {
  const filtered = words.filter(w => w.fromLang === fromLang && w.toLang === toLang);

  function handleDelete(idx) {
    setWords(words.filter((w, i) => !(i === idx && w.fromLang === fromLang && w.toLang === toLang)));
  }

  return (
    <div className="card">
      <h2>Custom Words</h2>
      {filtered.length === 0 && <div>No custom words for this pair.</div>}
      {filtered.map((word, i) => (
        <div className="word-item" key={i}>
          {word.from} → {word.to}
          <button className="btn btn-secondary" onClick={() => handleDelete(i)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
export default WordsList;

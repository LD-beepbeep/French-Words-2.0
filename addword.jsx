import React, { useState } from "react";

function AddWord({ fromLang, toLang, words, setWords }) {
  const [fromWord, setFromWord] = useState("");
  const [toWord, setToWord] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    if (!fromWord || !toWord) return;
    setWords([...words, { from: fromWord, to: toWord, fromLang, toLang }]);
    setFromWord(""); setToWord("");
  }

  return (
    <div className="card">
      <h2>Add Custom Word</h2>
      <form className="add-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder={`Word in ${fromLang.toUpperCase()}`}
          value={fromWord}
          onChange={e => setFromWord(e.target.value)}
        />
        <input
          type="text"
          placeholder={`Word in ${toLang.toUpperCase()}`}
          value={toWord}
          onChange={e => setToWord(e.target.value)}
        />
        <button className="btn" type="submit">Add</button>
      </form>
    </div>
  );
}
export default AddWord;

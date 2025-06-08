import React from "react";
function LanguageSelector({ fromLang, toLang, setFromLang, setToLang, supported }) {
  return (
    <div className="card">
      <h2>Select Languages</h2>
      <div className="lang-select-row">
        <select value={fromLang} onChange={e => setFromLang(e.target.value)}>
          {supported.map(l => (
            <option key={l.code} value={l.code}>{l.name}</option>
          ))}
        </select>
        <span>→</span>
        <select value={toLang} onChange={e => setToLang(e.target.value)}>
          {supported.map(l => (
            <option key={l.code} value={l.code}>{l.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
export default LanguageSelector;

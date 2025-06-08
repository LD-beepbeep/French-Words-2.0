import React, { useRef, useState } from "react";

function UploadBulk({ fromLang, toLang, setWords, words, supported }) {
  const fileRef = useRef();
  const [preview, setPreview] = useState([]);
  const [aiFromLang, setAiFromLang] = useState(fromLang);
  const [aiToLang, setAiToLang] = useState(toLang);

  function handleFile(e) {
    const file = fileRef.current.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      let lines = ev.target.result.split(/\r?\n/).filter(Boolean);
      let pairs = lines.map(line => {
        const [a, b] = line.split(/[;,|\t]/);
        return a && b ? { from: a.trim(), to: b.trim(), fromLang: aiFromLang, toLang: aiToLang } : null;
      }).filter(Boolean);
      setPreview(pairs);
    };
    reader.readAsText(file);
  }

  function addAll() {
    setWords([...words, ...preview]);
    setPreview([]);
    fileRef.current.value = "";
  }

  return (
    <div className="card">
      <h3>Bulk Upload (with AI parsing coming soon!)</h3>
      <input type="file" ref={fileRef} onChange={handleFile} />
      <div>
        <label>From</label>
        <select value={aiFromLang} onChange={e => setAiFromLang(e.target.value)}>
          {supported.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
        </select>
        <label>To</label>
        <select value={aiToLang} onChange={e => setAiToLang(e.target.value)}>
          {supported.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
        </select>
      </div>
      {preview.length > 0 && (
        <div>
          <div>Preview:</div>
          <ul>
            {preview.map((p, i) => <li key={i}>{p.from} → {p.to}</li>)}
          </ul>
          <button className="btn btn-accent" onClick={addAll}>Add All</button>
        </div>
      )}
    </div>
  );
}
export default UploadBulk;

import React, { useState } from 'react';

function Summarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) {
      alert("Please paste some text first.");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSummary("✅ This is a dummy 3-line summary. You can customize it for demo purposes.");
      setLoading(false);
    }, 1500); // 1.5 second delay to simulate "thinking"
  };

  return (
    <div>
      <textarea
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>
      {summary && (
        <div className="output">
          <h3>📝 Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Summarizer;

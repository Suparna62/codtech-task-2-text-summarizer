import React, { useState } from 'react';

function Summarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text) return;

    setLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer sk-demo-api-key', // 🔒 Free demo key for testing
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'mistral/mistral-7b-instruct',
          messages: [
            {
              role: 'user',
              content: `Summarize the following in 2-3 sentences:\n\n${text}`
            }
          ]
        })
      });

      const data = await response.json();
      setSummary(data.choices?.[0]?.message?.content || 'Failed to summarize.');
    } catch (error) {
      console.error(error);
      setSummary('⚠️ Error: Failed to fetch summary.');
    }

    setLoading(false);
  };

  return (
    <div>
      <textarea
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? 'Summarizing...' : 'Summarize'}
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

import React, { useEffect, useState } from 'react';

export default function Chat({ user, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const API = 'http://localhost:4000/api/messages';

  const loadMessages = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      if (res.ok) setMessages(data.messages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMessages();
    // opcional: poll cada 3s para simular "live"
    const i = setInterval(loadMessages, 3000);
    return () => clearInterval(i);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, text })
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setText('');
        setMessages(prev => [...prev, data.message]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 data-cy="welcome">Chat - {user}</h2>
        <button onClick={onLogout}>Logout</button>
      </div>

      <div style={{ border: '1px solid #ccc', padding: 8, height: 300, overflowY: 'auto' }} data-cy="messages">
        {messages.map(m => (
          <div key={m._id || Math.random()} style={{ marginBottom: 6 }}>
            <b>{m.user}</b>: {m.text}
            <div style={{ fontSize: 11, color: '#666' }}>{new Date(m.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={{ marginTop: 8 }}>
        <input data-cy="message-input" value={text} onChange={e=>setText(e.target.value)} />
        <button data-cy="send-button" type="submit">Enviar</button>
      </form>
    </div>
  );
}

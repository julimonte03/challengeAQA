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
    <div data-cy="chat-page">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 data-cy="welcome">Chat - {user}</h2>
        <button data-cy="logout-button" onClick={onLogout}>Logout</button>
      </div>

      <div
        data-cy="messages"
        style={{ border: '1px solid #ccc', padding: 8, height: 300, overflowY: 'auto' }}
      >
        {messages.map(m => (
          <div key={m._id || Math.random()} data-cy="message" style={{ marginBottom: 6 }}>
            <b data-cy="message-user">{m.user}</b>:{" "}
            <span data-cy="message-text">{m.text}</span>
            <div style={{ fontSize: 11, color: '#666' }}>
              {new Date(m.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={{ marginTop: 8 }} data-cy="message-form">
        <input
          data-cy="message-input"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button data-cy="send-button" type="submit">Enviar</button>
      </form>
    </div>
  );
}

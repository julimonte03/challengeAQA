import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        onLogin(data.user);
      } else {
        setErr(data.message || 'Error en login');
      }
    } catch (error) {
      setErr('No se pudo conectar al servidor');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <label>Usuario</label><br />
          <input data-cy="username" value={username} onChange={e=>setUsername(e.target.value)} />
        </div>
        <div>
          <label>Contraseña</label><br />
          <input data-cy="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <button data-cy="login-button" type="submit">Iniciar sesión</button>
        </div>
      </form>
      {err && <div data-cy="error" style={{color:'red', marginTop:8}}>{err}</div>}
    </div>
  );
}

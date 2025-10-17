import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

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
      console.log("Login response:", data); // \\ log del backend

      if (res.ok && data.ok) {
        onLogin(data.user);
        console.log("Login OK, navegando a /chat"); // \\ log de éxito
        navigate('/chat');
      } else {
        setErr("Invalid credentials");
        console.log("Login falló"); // \\ log de error
      }
    } catch (error) {
      setErr('No se pudo conectar al servidor');
      console.log("Error de conexión:", error); // \\ log de error de fetch
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <label>Usuario</label><br />
          <input
            data-cy="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña</label><br />
          <input
            data-cy="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <button data-cy="login-button" type="submit">Iniciar sesión</button>
        </div>
      </form>
      {err && (
        <div data-cy="error" style={{ color: 'red', marginTop: 8 }}>{err}</div>
      )}
    </div>
  );
}

import { useState } from 'react'
import './App.css'
import Login from './pages/Login';
import Chat from './pages/Chat';


function App() {

  const [user, setUser] = useState(null);

return (
    <div style={{ padding: 20 }}>
      {!user ? (
        <Login onLogin={(username) => setUser(username)} />
      ) : (
        <Chat user={user} onLogout={() => setUser(null)} />
      )}
    </div>
  );
}

export default App

// App maneja el estado del usuario; muestra Login si no hay usuario, o Chat si está logueado.

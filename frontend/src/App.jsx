import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Chat from './pages/Chat';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={(username) => setUser(username)} />}
          />
          <Route
            path="/chat"
            element={
              user ? (
                <Chat user={user} onLogout={() => setUser(null)} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

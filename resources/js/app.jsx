import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';

const users = [
  { email: 'siswa@mail.com', password: 'siswa123', role: 'siswa', name: 'Siswa Satu' },
  { email: 'guru@mail.com', password: 'guru123', role: 'guru', name: 'Guru Satu' },
  { email: 'admin@mail.com', password: 'admin123', role: 'admin', name: 'Admin Satu' },
];

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/*" element={<Login onLogin={u => setUser(u)} users={users} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <nav className="p-4 bg-gray-100">
        <span>Login sebagai: <b>{user.role}</b> ({user.name})</span>
        <button style={{ marginLeft: 16 }} onClick={() => setUser(null)}>Logout</button>
      </nav>
      <main className="p-4">
        <Routes>
          {user.role === 'siswa' && <Route path="/dashboard" element={<StudentDashboard />} />}
          <Route path="*" element={<Navigate to={user.role === 'siswa' ? '/dashboard' : '/'} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

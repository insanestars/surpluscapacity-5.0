import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyA3VFvFAnvXlxtlvXTHZUY5yAeUHb8qL-I",
  authDomain: "surpluscapacity.firebaseapp.com",
  projectId: "surpluscapacity",
  storageBucket: "surpluscapacity.firebasestorage.app",
  messagingSenderId: "901366229778",
  appId: "1:901366229778:web:24fc0b5f7283222347a1cb",
  measurementId: "G-BS6T3QF4VR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
      </Routes>
    </Router>
  );
}

function HomePage({ user }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🚀 Surplus Capacity</h1>
        <p className="subtitle">Real-time capacity liquidation platform</p>
      </div>

      <div className="card">
        <h2>Your App is Live!</h2>
        <p className="success">✅ Successfully deployed on Vercel</p>
        
        {user ? (
          <div className="user-section">
            <p>Welcome, {user.email}</p>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <div className="login-section">
            <p>Sign in with Firebase to get started</p>
            <p className="note">Add your auth screens to get the full app working</p>
          </div>
        )}
      </div>

      <div className="info">
        <h3>Next Steps:</h3>
        <ul>
          <li>✅ Web app deployed</li>
          <li>📱 Add mobile app screens</li>
          <li>🔐 Connect Firebase auth</li>
          <li>🎯 Build business & customer flows</li>
        </ul>
      </div>
    </div>
  );
}

export default App;

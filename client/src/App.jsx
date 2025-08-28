import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import CrudPage from './components/CrudPage';
import PrivateRoute from './components/PrivateRoute';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!user ? <Login /> : <PrivateRoute><CrudPage /></PrivateRoute>}
        />
        <Route
          path="/crud"
          element={
            <PrivateRoute>
              <CrudPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

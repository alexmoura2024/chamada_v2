import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { CreateClass } from './pages/CreateClass';
import { TakeAttendance } from './pages/TakeAttendance';
import { Reports } from './pages/Reports';
import { AuthState } from './types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';

export function App() {
  const [authState, setAuthState] = useState<AuthState>({ isAuthenticated: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState({ isAuthenticated: !!user });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            authState.isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-class"
          element={
            <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
              <CreateClass />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
              <TakeAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
              <Reports />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedRoute({ 
  isAuthenticated, 
  children 
}: { 
  isAuthenticated: boolean; 
  children: React.ReactNode;
}) {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
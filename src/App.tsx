// src/App.tsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router, // Keep the import for potential use in index.tsx/main.tsx
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { checkAuth } from "./services/authApi";

import Login from "./Component/auth/Login";
import Register from "./Component/auth/Register.tsx";
import Dashboard from "./Component/Dashboard.tsx";
import SearchResultsPage from "./Component/Search/SearchResultsPage.tsx";
import ChatPage from "./Component/chat/ChatPage.tsx";
import ResearchSearchApp from "./pages/Home.tsx";
import ChatInterface from "./Component/chat/ChatInterface.tsx";

// Auth context provider
const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { id: number; username: string } | null;
  login: (token: string, user: { id: number; username: string }) => void;
  logout: () => void;
}>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ id: number; username: string } | null>(
    null
  );

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const { user_id, username } = await checkAuth();
        setIsAuthenticated(true);
        setUser({ id: user_id, username });
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    verifyAuth();
  }, []);

  const login = (token: string, user: { id: number; username: string }) => {
    localStorage.setItem("access_token", token);
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return React.useContext(AuthContext);
};

// Protected route component
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.isLoading) {
    return <div className="full-page-loading">Loading...</div>;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Main App component (now just the content)
const AppContent = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/home" element={<ResearchSearchApp />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          // <RequireAuth>
          <Dashboard />
          // </RequireAuth>
        }
      />
      <Route
        path="/search"
        element={
          // <RequireAuth>
          <SearchResultsPage />
          // </RequireAuth>
        }
      />
      <Route
        path="/chat/:sessionId"
        element={
          // <RequireAuth>
          <ChatPage />
          // </RequireAuth>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// App wrapper (now just providing Auth)
const App = () => {
  return (
    <AuthProvider>
      <div className="app-container">
        <AppContent />
      </div>
    </AuthProvider>
  );
};

export default App;

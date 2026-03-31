import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import AIChat from './components/AI/AIChat';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Courses = lazy(() => import('./pages/Courses'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Admin = lazy(() => import('./pages/Admin'));
const LessonView = lazy(() => import('./views/LessonView'));
const Auth = lazy(() => import('./views/Auth'));

const PrivateRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const { currentUser, isAdmin, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!currentUser) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-20">
            <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Auth mode="login" />} />
                <Route path="/register" element={<Auth mode="register" />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                <Route path="/admin" element={
                  <PrivateRoute adminOnly>
                    <Admin />
                  </PrivateRoute>
                } />
                <Route path="/lesson/:id" element={
                  <PrivateRoute>
                    <LessonView />
                  </PrivateRoute>
                } />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <AIChat />
          <Toaster position="top-center" dir="rtl" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
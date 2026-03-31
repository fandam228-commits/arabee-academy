import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'الدورات', path: '/courses' },
    { name: 'من نحن', path: '#about' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between",
      scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    )} dir="rtl">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          Mr. Habib
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4">
        {currentUser ? (
          <>
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                لوحة التحكم
              </Button>
            </Link>
            {isAdmin && (
              <Link to="/admin">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  الإدارة
                </Button>
              </Link>
            )}
            <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2 text-red-500 border-red-200 hover:bg-red-50">
              <LogOut className="w-4 h-4" />
              تسجيل الخروج
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="ghost">تسجيل الدخول</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-blue-600 hover:bg-blue-700">إنشاء حساب</Button>
            </Link>
          </>
        )}
      </div>

      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-6 md:hidden flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="text-gray-700 font-medium py-2" onClick={() => setIsOpen(false)}>
              {link.name}
            </Link>
          ))}
          <hr className="my-2" />
          {currentUser ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 py-2" onClick={() => setIsOpen(false)}>
                <LayoutDashboard className="w-4 h-4" /> لوحة التحكم
              </Link>
              {isAdmin && (
                <Link to="/admin" className="flex items-center gap-2 py-2" onClick={() => setIsOpen(false)}>
                  <Settings className="w-4 h-4" /> الإدارة
                </Link>
              )}
              <button onClick={handleLogout} className="text-red-500 py-2 flex items-center gap-2">
                <LogOut className="w-4 h-4" /> تسجيل الخروج
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full text-right">تسجيل الدخول</Button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-blue-600">إنشاء حساب</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, ClipboardCheck, LogOut, Menu, X,Store } from 'lucide-react';
import { NavItem } from './../constant/types';


const Sidebar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      path: '/dashboard',
      icon: Home,
      label: 'Dashboard'
    },
    {
      path: '/courses',
      icon: BookOpen,
      label: 'Courses'
    },
    {
      path: '/quizzes',
      icon: ClipboardCheck,
      label: 'Quizzes'
    },
    {
      path: '/tokenshop',
      icon: Store,
      label: 'Shop'
    }
  ];

  const NavItems: React.FC = () => (
    <>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.label}
            to={item.path}
            className={`
              nav-link flex items-center px-4 py-3 
              ${isActive 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'}
              transition-colors duration-200
            `}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Link>
        );
      })}
    </>
  );

  const UserProfile: React.FC = () => (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="/api/placeholder/32/32"
          alt="User avatar"
          className="w-8 h-8 rounded-full bg-gray-200"
        />
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700">User Name</p>
          <p className="text-xs text-gray-500">user@email.com</p>
        </div>
      </div>
      <button 
        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors duration-200"
        aria-label="Logout"
        onClick={() => {
          // Add logout logic here
          console.log('Logout clicked');
        }}
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-neutral-200/20 z-50">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            QuizPlay Learn
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-indigo-600 rounded-lg"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}

      {/* Mobile Menu */}
      <div 
        className={`
          lg:hidden fixed top-[73px] left-0 right-0 bottom-0 bg-white z-40
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 py-4">
            <NavItems />
          </div>
          <div className="border-t border-neutral-200/20 p-4">
            <UserProfile />
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <nav 
        className={`
          hidden lg:block fixed top-0 left-0 h-screen w-64
          bg-white border-r border-neutral-200/20
          transform transition-transform duration-300 ease-in-out
        `}
      >
        <div className="p-4 border-b border-neutral-200/20">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            QuizPlay Learn
          </Link>
        </div>

        <div className="py-4">
          <NavItems />
        </div>

        <div className="absolute bottom-0 w-full border-t border-neutral-200/20 p-4">
          <UserProfile />
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define the Notification type inline
type Notification = {
  id: number;
  text: string;
  time: string;
  unread: boolean;
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const notifications: Notification[] = [
    { id: 1, text: "New quiz available in Mathematics", time: "5m ago", unread: true },
    { id: 2, text: "Your last quiz result is ready", time: "1h ago", unread: true },
    { id: 3, text: "Course progress updated", time: "2h ago", unread: false }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowMobileSearch(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowNotifications(false);
        setShowProfile(false);
        setShowMobileSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleProfileClick = () => {
    navigate('/profile');
    setShowProfile(false);
  };

  // const handleSettingsClick = () => {
  //   navigate('/settings');
  //   setShowProfile(false);
  // };

  const handleLogoutClick = () => {
    navigate('/logout');
    setShowProfile(false);
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const SearchInput: React.FC = () => (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="w-4 h-4 text-gray-400" />
      </div>
      <input
        type="search"
        placeholder="Search courses and quizzes..."
        className={`
          w-full bg-gray-100 pl-10 pr-4 py-2 rounded-lg text-sm
          transition-all duration-200 ease-in-out
          ${isSearchFocused 
            ? 'ring-2 ring-indigo-500 outline-none'
            : 'hover:bg-gray-200/70'
          }
        `}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
      />
    </div>
  );

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-neutral-200/20">
      <div className="h-16 flex items-center justify-between px-4 md:px-6">
        {/* Desktop Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md">
          <SearchInput />
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Search"
          >
            <Search className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
            >
              <Bell className="w-6 h-6 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <div className="px-4 py-2 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Notifications</h3>
                    {unreadCount > 0 && (
                      <button className="text-xs text-indigo-600 hover:text-indigo-800">
                        Mark all as read
                      </button>
                    )}
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                        notification.unread ? 'bg-indigo-50/50' : ''
                      }`}
                    >
                      <p className="text-sm text-gray-600">{notification.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              onClick={() => setShowProfile(!showProfile)}
              aria-label="Profile menu"
            >
              <img
                src="/api/placeholder/32/32"
                alt="Profile"
                className="w-8 h-8 rounded-full bg-gray-200"
              />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <button
                  onClick={handleProfileClick}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </button>
                {/* <button
                  onClick={handleSettingsClick}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </button> */}
                <hr className="my-2 border-gray-200" />
                <button
                  onClick={handleLogoutClick}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div 
          className="absolute top-16 left-0 right-0 bg-white p-4 border-b border-gray-200 md:hidden"
          ref={searchRef}
        >
          <SearchInput />
        </div>
      )}
    </header>
  );
};

export default Header;
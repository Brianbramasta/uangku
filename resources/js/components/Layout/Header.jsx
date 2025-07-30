import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Header component that displays at the top of the application
 * Shows user information and navigation controls
 */
const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-end px-6 py-4">




        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <button className="relative p-1 text-gray-400 hover:text-gray-500 focus:outline-none">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">{user?.name || 'Gabby K'}</span>
            <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white overflow-hidden">
              {user?.profile_image ? (
                <img src={user.profile_image} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <span>{(user?.name || 'U').charAt(0)}</span>
              )}
            </div>
            <div className="relative">
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

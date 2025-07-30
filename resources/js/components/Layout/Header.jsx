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
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">EdgesPay</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative max-w-md w-full mx-4 hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
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
import React from 'react';

/**
 * Header component that displays the top navigation bar
 * Shows user greeting, search functionality, and user profile
 */
const Header = ({ user }) => {
    return (
        <header className="bg-white py-4 px-6 flex items-center justify-between shadow-sm">
            <div>
                <h1 className="text-2xl font-semibold">Good morning, {user?.name || 'User'}</h1>
                <p className="text-gray-500 text-sm">long time no see</p>
            </div>

            <div className="flex items-center space-x-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-gray-600">🔔</span>
                    <div className="flex items-center space-x-2">
                        <span className="font-medium">{user?.name || 'User'}</span>
                        <img
                            src={user?.avatar || 'https://via.placeholder.com/32'}
                            alt="User avatar"
                            className="w-8 h-8 rounded-full"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

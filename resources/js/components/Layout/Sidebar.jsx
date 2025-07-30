import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Sidebar component that provides navigation links
 * Uses NavLink for active route styling
 */
const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/transactions', label: 'Transactions', icon: '💰' },
    { path: '/budgets', label: 'Budgets', icon: '📈' },
    { path: '/categories', label: 'Categories', icon: '🏷️' },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm">
      <div className="p-4">
        <div className="text-2xl font-bold text-gray-800 mb-8">UangKu</div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
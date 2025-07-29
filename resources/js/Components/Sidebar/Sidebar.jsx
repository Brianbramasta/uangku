import React from 'react';
import { Link } from '@inertiajs/react';

/**
 * Sidebar component that provides main navigation for the application
 * Displays logo, navigation links and user options
 */
const Sidebar = () => {
    const navItems = [
        { icon: '📊', label: 'Dashboard', path: '/dashboard' },
        { icon: '💰', label: 'Payments', path: '/payments' },
        { icon: '📈', label: 'Analytics', path: '/analytics' },
        { icon: '💳', label: 'Cards', path: '/cards' },
        { icon: '📅', label: 'History', path: '/history' },
        { icon: '⚙️', label: 'Services', path: '/services' },
        { icon: '❓', label: 'Help', path: '/help' },
    ];

    return (
        <aside className="w-64 bg-white h-screen fixed left-0 top-0 shadow-sm">
            <div className="p-4">
                <div className="flex items-center mb-8">
                    <span className="text-2xl font-bold">UangKu</span>
                </div>

                <nav>
                    <ul className="space-y-2">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.path}
                                    className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition-colors"
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="absolute bottom-8 w-full pr-8">
                    <Link
                        href="/logout"
                        className="flex items-center p-3 text-gray-700 hover:text-red-600 transition-colors"
                    >
                        <span className="mr-3">🚪</span>
                        <span>Log out</span>
                    </Link>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

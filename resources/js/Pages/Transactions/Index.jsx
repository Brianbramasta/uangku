import React, { useEffect, useState } from 'react';
import { transactionService, categoryService } from '../../Services/api';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Sidebar/Sidebar';

/**
 * Transactions page component for managing cash flow
 * Shows transaction list and provides transaction creation functionality
 */
const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        start_date: '',
        end_date: '',
        type: '',
        category_id: ''
    });

    useEffect(() => {
        fetchTransactions();
        fetchCategories();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await transactionService.getTransactions(filters);
            setTransactions(response.data.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await categoryService.getCategories();
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 ml-64">
                <Header user={{ name: 'User' }} />

                <main className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">Transactions</h1>
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                            Add Transaction
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                        <div className="grid grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    className="w-full border rounded-lg px-3 py-2"
                                    value={filters.start_date}
                                    onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">End Date</label>
                                <input
                                    type="date"
                                    className="w-full border rounded-lg px-3 py-2"
                                    value={filters.end_date}
                                    onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Type</label>
                                <select
                                    className="w-full border rounded-lg px-3 py-2"
                                    value={filters.type}
                                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                >
                                    <option value="">All</option>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Category</label>
                                <select
                                    className="w-full border rounded-lg px-3 py-2"
                                    value={filters.category_id}
                                    onChange={(e) => setFilters({ ...filters, category_id: e.target.value })}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.icon} {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Transactions List */}
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-4 border-b">
                            <h2 className="font-semibold">Recent Transactions</h2>
                        </div>
                        <div className="divide-y">
                            {transactions.map(transaction => (
                                <div key={transaction.id} className="p-4 hover:bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <span className="text-2xl">{transaction.category.icon}</span>
                                            <div>
                                                <p className="font-medium">{transaction.category.name}</p>
                                                <p className="text-sm text-gray-500">{transaction.date}</p>
                                            </div>
                                        </div>
                                        <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                                        </span>
                                    </div>
                                    {transaction.note && (
                                        <p className="text-sm text-gray-500 mt-2">{transaction.note}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Transactions;

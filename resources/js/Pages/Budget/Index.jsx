import React, { useEffect, useState } from 'react';
import { budgetService, categoryService } from '../../Services/api';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Sidebar/Sidebar';

/**
 * Budget page component for managing financial budgets
 * Shows budget list, progress tracking, and budget creation functionality
 */
const Budget = () => {
    const [budgets, setBudgets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [period, setPeriod] = useState('monthly');

    useEffect(() => {
        fetchBudgets();
        fetchCategories();
    }, [period]);

    const fetchBudgets = async () => {
        try {
            const response = await budgetService.getBudgets({ period });
            setBudgets(response.data.data);
        } catch (error) {
            console.error('Error fetching budgets:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await categoryService.getCategories({ type: 'expense' });
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
                        <h1 className="text-2xl font-semibold">Budget Management</h1>
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                            Create New Budget
                        </button>
                    </div>

                    {/* Period Filter */}
                    <div className="flex space-x-2 mb-6">
                        <button
                            className={`px-4 py-2 rounded-lg ${period === 'weekly' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}
                            onClick={() => setPeriod('weekly')}
                        >
                            Weekly
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${period === 'monthly' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}
                            onClick={() => setPeriod('monthly')}
                        >
                            Monthly
                        </button>
                    </div>

                    {/* Budget List */}
                    <div className="grid grid-cols-1 gap-4">
                        {budgets.map(budget => (
                            <div key={budget.id} className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">{budget.category_icon}</span>
                                        <div>
                                            <h3 className="font-medium">{budget.category_name}</h3>
                                            <p className="text-sm text-gray-500">
                                                {budget.start_date} - {budget.end_date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Budget Limit</p>
                                        <p className="font-semibold">${budget.amount_limit.toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-2">
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${budget.percentage_used > 90 ? 'bg-red-500' : 'bg-purple-500'}`}
                                            style={{ width: `${budget.percentage_used}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <div>
                                        <p className="text-gray-500">Spent</p>
                                        <p className="font-medium">${budget.used.toLocaleString()}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-gray-500">Remaining</p>
                                        <p className="font-medium">${budget.remaining.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-500">Used</p>
                                        <p className="font-medium">{budget.percentage_used}%</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Budget;

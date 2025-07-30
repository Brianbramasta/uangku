import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { Button } from '@/Components/Button';
import Modal from '@/components/Modal';
import BudgetForm from '@/components/forms/BudgetForm';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [period, setPeriod] = useState('monthly');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

  // Fetch budgets data
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        setLoading(true);
        const response = await api.getBudgets({ period });
        setBudgets(response.data);
      } catch (error) {
        setError('Failed to load budgets');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, [period]);

  // Handle period change
  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  const handleAdd = () => {
    setSelectedBudget(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEdit = (budget) => {
    setSelectedBudget(budget);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDelete = async (budgetId) => {
    if (!window.confirm('Are you sure you want to delete this budget?')) return;

    try {
      await api.deleteBudget(budgetId);
      setBudgets(budgets.filter(b => b.id !== budgetId));
    } catch (error) {
      setError('Failed to delete budget');
      console.error(error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (modalMode === 'add') {
        const response = await api.createBudget(formData);
        setBudgets([...budgets, response.data]);
      } else {
        const response = await api.updateBudget(selectedBudget.id, formData);
        setBudgets(budgets.map(b => b.id === selectedBudget.id ? response.data : b));
      }
      setIsModalOpen(false);
    } catch (error) {
      setError(modalMode === 'add' ? 'Failed to create budget' : 'Failed to update budget');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Budgets</h1>
          <p className="text-sm text-gray-500">Manage your spending limits</p>
        </div>
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          onClick={handleAdd}
        >
          Add Budget
        </button>
      </div>

      {/* Modal */}
      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'add' ? 'Add New Budget' : 'Edit Budget'}
      >
        <BudgetForm
          budget={selectedBudget}
          onSubmit={handleSubmit}
        />
      </Modal>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Period Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex space-x-2">
          <button
            onClick={() => handlePeriodChange('weekly')}
            className={`px-4 py-2 rounded-md ${period === 'weekly' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Weekly
          </button>
          <button
            onClick={() => handlePeriodChange('monthly')}
            className={`px-4 py-2 rounded-md ${period === 'monthly' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Budgets Grid */}
      {budgets.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="text-xl font-medium mb-2">No budgets found</p>
            <p className="text-gray-500 mb-6">Create your first budget to start tracking your expenses</p>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              onClick={() => alert('Add budget functionality would go here')}
            >
              Create Budget
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => (
            <div key={budget.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{budget.category_name}</h3>
                    <p className="text-sm text-gray-500">
                      {budget.period === 'monthly' ? 'Monthly' : 'Weekly'} Budget
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => handleEdit(budget)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => handleDelete(budget.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">Budget</span>
                  <span className="text-sm font-medium text-gray-900">
                    Rp{budget.amount_limit.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">Spent</span>
                  <span className="text-sm font-medium text-gray-900">
                    Rp{budget.used.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-500">Remaining</span>
                  <span className="text-sm font-medium text-green-600">
                    Rp{budget.remaining.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                        {budget.percentage_used}% Used
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-purple-600">
                        {budget.percentage_used}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                    <div
                      style={{ width: `${budget.percentage_used}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${budget.percentage_used > 90 ? 'bg-red-500' : budget.percentage_used > 75 ? 'bg-yellow-500' : 'bg-purple-500'}`}
                    ></div>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  Period: {new Date(budget.start_date).toLocaleDateString('id-ID')} - {new Date(budget.end_date).toLocaleDateString('id-ID')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Budgets;

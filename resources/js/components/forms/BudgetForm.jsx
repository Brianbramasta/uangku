import React, { useState, useEffect } from 'react';
import { Button } from '@/Components/Button';
import api from '@/services/api';

const BudgetForm = ({ budget, onSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category_id: '',
    amount_limit: '',
    period: 'monthly',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    ...budget
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.getCategories();
        // Filter hanya kategori expense
        const expenseCategories = response.data.filter(cat => cat.type === 'expense');
        setCategories(expenseCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount Limit</label>
        <input
          type="number"
          name="amount_limit"
          value={formData.amount_limit}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Period</label>
        <select
          name="period"
          value={formData.period}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          onClick={() => onSubmit(null)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {budget ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default BudgetForm;

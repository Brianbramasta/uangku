import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { Button } from '@/Components/Button';
import { DataTable } from '@/Components/DataTable';
import Modal from '@/components/Modal';
import TransactionForm from '@/components/forms/TransactionForm';
import { format } from 'date-fns';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    start_date: '',
    end_date: '',
    type: '',
    category_id: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.getCategories();
        setCategories(response.data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const params = {
          ...filters,
          page: currentPage,
          limit: 10,
        };
        const response = await api.getTransactions(params);
        setTransactions(response.data);
        setTotalPages(response.pagination.last_page);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [currentPage, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      try {
        await api.deleteTransaction(id);
        // Refresh the transactions list
        const response = await api.getTransactions();
        setTransactions(response.data);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div>Error loading transactions: {error}</div>;

  const handleAdd = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
          Add New Transaction
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={filters.start_date}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="end_date"
            value={filters.end_date}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category_id"
            value={filters.category_id}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories?.map(category => (
              <option key={category.id} value={category.id}>
                {category.name} - {category.type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <DataTable
        columns={[
          {
            header: 'Date',
            accessor: 'date',
            render: (row) => format(new Date(row.date), 'dd/MM/yyyy')
          },
          { header: 'Description', accessor: 'note' },
          { header: 'Amount', accessor: 'amount' },
          { 
            header: 'Category', 
            accessor: 'category',
            render: (row) => `${row.category.name} - ${row.category.type}`
          },
          {
            header: 'Actions',
            accessor: 'actions',
            render: (row) => (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(row)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            )
          },
        ]}
        data={transactions}
      />

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                ${currentPage === page
                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }
              `}
            >
              {page}
            </button>
          ))}
        </nav>
      </div>

      {/* Transaction Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      >
        <TransactionForm
          transaction={editingTransaction}
          onSubmit={async (data) => {
            try {
              if (editingTransaction) {
                await api.updateTransaction(editingTransaction.id, data);
              } else {
                await api.createTransaction(data);
              }
              setIsModalOpen(false);
              // Refresh the transactions list
              const response = await api.getTransactions();
              setTransactions(response.data);
            } catch (err) {
              setError(err.message);
            }
          }}
        />
      </Modal>
    </div>
  );
};

export default Transactions;

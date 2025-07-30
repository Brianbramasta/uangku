import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { Button } from '@/Components/Button';
import { DataTable } from '@/Components/DataTable';
import { Link } from '@inertiajs/react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.getTransactions();
        setTransactions(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

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

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        <Link href="/transactions/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Add New Transaction
          </Button>
        </Link>
      </div>

      <DataTable
        columns={[
          { header: 'Date', accessor: 'date' },
          { header: 'Description', accessor: 'note' },
          { header: 'Amount', accessor: 'amount' },
          { header: 'Category', accessor: 'category.name' },
          { 
            header: 'Actions', 
            accessor: 'actions',
            render: (row) => (
              <div className="flex space-x-2">
                <Link 
                  href={`/transactions/${row.id}/edit`}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </Link>
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
    </div>
  );
};

export default Transactions;
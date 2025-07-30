import React, { useState, useEffect } from 'react';
import api from '@/services/api';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summaryData, setSummaryData] = useState({
    balance: 0,
    income: 0,
    expense: 0,
    month: ''
  });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dashboard summary
        const summaryResponse = await api.getDashboardSummary();
        setSummaryData({
          balance: summaryResponse.balance,
          income: summaryResponse.income,
          expense: summaryResponse.expense,
          month: summaryResponse.month
        });

        // Fetch recent transactions
        const transactionsResponse = await api.getTransactions({ limit: 5 });
        setTransactions(transactionsResponse.data);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container p-6">
      <h1 className="text-2xl font-bold mb-6">Financial Dashboard</h1>

      {/* Summary Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Balance Card */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm text-blue-600 mb-2">Total Balance</h3>
          <p className="text-2xl font-semibold text-blue-800">
            {loading ? 'Loading...' : `Rp${summaryData.balance.toLocaleString('id-ID')}`}
          </p>
        </div>

        {/* Income Card */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm text-green-600 mb-2">Monthly Income</h3>
          <p className="text-2xl font-semibold text-green-800">
            {loading ? 'Loading...' : `Rp${summaryData.income.toLocaleString('id-ID')}`}
          </p>
        </div>

        {/* Expenses Card */}
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm text-red-600 mb-2">Monthly Expenses</h3>
          <p className="text-2xl font-semibold text-red-800">
            {loading ? 'Loading...' : `Rp${summaryData.expense.toLocaleString('id-ID')}`}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        {/* Chart component will be added here */}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        {error && <p className="text-red-500">{error}</p>}
        {transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center p-2 hover:bg-gray-50">
                <div>
                  <p className="font-medium">{transaction.note || 'No description'}</p>
                  <p className="text-sm text-gray-500">{transaction.category?.name}</p>
                </div>
                <p className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  Rp{transaction.amount.toLocaleString('id-ID')}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No transactions found</p>
        )}
      </div>
    </div>
  );
}
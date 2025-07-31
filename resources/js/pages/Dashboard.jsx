import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import ExpensePieChart from '@/components/ExpensePieChart';
import CashFlowChart from '@/components/CashFlowChart';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryExpenses, setCategoryExpenses] = useState([]);
  const [cashFlowData, setCashFlowData] = useState([]);
  const [summaryData, setSummaryData] = useState({
    balance: 0,
    income: 0,
    expense: 0,
    month: ''
  });
  const [transactions, setTransactions] = useState([]);

  // State untuk filter tanggal expense by category
  const [dateFilter, setDateFilter] = useState({
    start_date: new Date().toISOString().split('T')[0].substring(0, 7) + '-01', // Awal bulan ini
    end_date: new Date().toISOString().split('T')[0] // Hari ini
  });

  useEffect(() => {
    fetchData();
  }, [dateFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch dashboard summary
        const summaryResponse = await api.getDashboardSummary();
        setSummaryData({
          balance: summaryResponse.balance,
          income: summaryResponse.income,
          expense: summaryResponse.expense,
          month: summaryResponse.month
        });

        // Fetch chart data
        const monthlyChartResponse = await api.getDashboardChart({ range: 'monthly' });

        // Format data untuk bar chart
        const formattedCashFlowData = monthlyChartResponse.labels.map((label, index) => ({
          month: label,
          income: monthlyChartResponse.income_data[index],
          expense: monthlyChartResponse.expense_data[index]
        }));
        setCashFlowData(formattedCashFlowData);

        // Fetch recent transactions dan data untuk pie chart
        const [recentTransactions, expenseTransactions] = await Promise.all([
          api.getTransactions({ limit: 5 }),
          api.getTransactions({
            type: 'expense',
            start_date: dateFilter.start_date,
            end_date: dateFilter.end_date
          })
        ]);

        setTransactions(recentTransactions.data);

        // Untuk pie chart, menjumlahkan pengeluaran per kategori
        const expensesByCategory = {};
        if (expenseTransactions.data && Array.isArray(expenseTransactions.data)) {
          expenseTransactions.data.forEach(transaction => {
            if (transaction && transaction.category) {
              const categoryName = transaction.category.name;
              if (!expensesByCategory[categoryName]) {
                expensesByCategory[categoryName] = 0;
              }
              expensesByCategory[categoryName] += parseFloat(transaction.amount);
            }
          });
        }

        // Filter out categories with zero amount
        const formattedCategoryExpenses = Object.entries(expensesByCategory)
          .filter(([_, amount]) => amount > 0)
          .map(([category, amount]) => ({
            category,
            amount: Math.round(amount) // Round to whole numbers
          }));

        console.log('Raw expense transactions:', expenseTransactions.data);
        console.log('Category Expenses:', formattedCategoryExpenses);
        setCategoryExpenses(formattedCategoryExpenses);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Expense by Category Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Expenses by Category</h2>
            <div className="flex gap-2 items-center">
              <div>
                <input
                  type="date"
                  value={dateFilter.start_date}
                  onChange={(e) => {
                    setDateFilter(prev => ({
                      ...prev,
                      start_date: e.target.value
                    }));
                    fetchData();
                  }}
                  className="px-2 py-1 border rounded text-sm"
                />
              </div>
              <span className="text-gray-500">to</span>
              <div>
                <input
                  type="date"
                  value={dateFilter.end_date}
                  onChange={(e) => {
                    setDateFilter(prev => ({
                      ...prev,
                      end_date: e.target.value
                    }));
                    fetchData();
                  }}
                  className="px-2 py-1 border rounded text-sm"
                />
              </div>
            </div>
          </div>
          {loading ? (
            <div className="h-[300px] flex items-center justify-center">
              <p>Loading chart...</p>
            </div>
          ) : (
            <ExpensePieChart data={categoryExpenses} />
          )}
        </div>

        {/* Cash Flow Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Monthly Cash Flow</h2>
          {loading ? (
            <div className="h-[300px] flex items-center justify-center">
              <p>Loading chart...</p>
            </div>
          ) : (
            <CashFlowChart data={cashFlowData} />
          )}
        </div>
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

import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { Button } from '@/Components/Button';
import { DataTable } from '@/Components/DataTable';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.getCategories();
        setCategories(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await api.deleteCategory(id);
        // Refresh the categories list
        const response = await api.getCategories();
        setCategories(response.data);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories: {error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        <Link href="/categories/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Add New Category
          </Button>
        </Link>
      </div>

      <DataTable
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Type', accessor: 'type' },
          { header: 'Icon', accessor: 'icon' },
          {
            header: 'Actions',
            accessor: 'actions',
            render: (row) => (
              <div className="flex space-x-2">
                <Link
                  href={`/categories/${row.id}/edit`}
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
        data={categories}
      />
    </div>
  );
};

export default Categories;

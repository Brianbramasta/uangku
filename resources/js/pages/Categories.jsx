import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { Button } from '@/Components/Button';
import { DataTable } from '@/Components/DataTable';
import Modal from '@/components/Modal';
import CategoryForm from '@/components/forms/CategoryForm';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.getCategories({ page: currentPage });
        if (response.data) {
          setCategories(response.data);
          // Jika tidak ada pagination, set total pages ke 1
          setTotalPages(response.pagination?.last_page || 1);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [currentPage]);

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

  const handleAdd = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
          Add New Category
        </Button>
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
        data={categories}
      />

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
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

      {/* Category Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
      >
        <CategoryForm
          category={editingCategory}
          onSubmit={async (data) => {
            try {
              if (editingCategory) {
                await api.updateCategory(editingCategory.id, data);
              } else {
                await api.createCategory(data);
              }
              setIsModalOpen(false);
              // Refresh the categories list
              const response = await api.getCategories({ page: currentPage });
              setCategories(response.data);
            } catch (err) {
              setError(err.message);
            }
          }}
        />
      </Modal>
    </div>
  );
};

export default Categories;

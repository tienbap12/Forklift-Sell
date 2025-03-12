import React, { useState } from 'react';
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '../../api/categoryApi';
import CategoryTable from '../../features/Admin/categories/CategoryTable';
import ModalForm from '../../components/Admin/ModalForm';
import DeleteModal from '../../components/Admin/DeleteModal';
import Pagination from '../../components/Admin/Pagination';
import SearchHeader from '../../components/Admin/SearchHeader';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import { toast } from 'react-toastify';

const CategoryPage = () => {
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ categoryName: '' });
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'delete'

  const filteredCategories = (categories || []).filter((category) =>
    category.categoryName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handleAdd = async () => {
    try {
      await createCategory(formData).unwrap();
      setModalType(null);
      refetch();
      toast.success('Thêm thành công');
    } catch (err) {
      console.error('Add category failed:', err);
      toast.error(err?.data);
    }
  };

  const handleEdit = async () => {
    try {
      await updateCategory({ ...selectedCategory, ...formData }).unwrap();
      setModalType(null);
      refetch();
      toast.success('Cập nhật thành công');
    } catch (err) {
      console.error('Update category failed:', err);
      toast.error(err?.data);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(selectedCategory.categoryId).unwrap();
      setModalType(null);
      toast.success('Xóa thành công');
      refetch();
    } catch (err) {
      console.error('Delete category failed:', err);
      toast.error(err?.data);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message="Lỗi tải danh mục" />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý danh mục</h1>

      <SearchHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddClick={() => {
          setFormData({ categoryName: '' });
          setModalType('add');
        }}
        buttonText="Thêm danh mục"
      />

      <CategoryTable
        categories={currentCategories}
        onEditClick={(category) => {
          setSelectedCategory(category);
          setFormData({ categoryName: category.categoryName });
          setModalType('edit');
        }}
        onDeleteClick={(category) => {
          setSelectedCategory(category);
          setModalType('delete');
        }}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      {(modalType === 'add' || modalType === 'edit') && (
        <ModalForm
          title={modalType === 'add' ? 'Thêm danh mục' : 'Chỉnh sửa danh mục'}
          onClose={() => setModalType(null)}
          onSubmit={modalType === 'add' ? handleAdd : handleEdit}
          submitText={modalType === 'add' ? 'Thêm' : 'Lưu thay đổi'}
        >
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-gray-900 dark:text-white">
                Tên danh mục
              </label>
              <input
                type="text"
                value={formData.categoryName}
                onChange={(e) =>
                  setFormData({ ...formData, categoryName: e.target.value })
                }
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </ModalForm>
      )}

      {modalType === 'delete' && (
        <DeleteModal
          message={`Bạn có chắc muốn xóa danh mục "${selectedCategory?.categoryName}" không? Hành động này không thể hoàn tác.`}
          onClose={() => setModalType(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default CategoryPage;

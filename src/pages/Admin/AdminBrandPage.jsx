// src/features/Admin/Brand/AdminBrandPage.jsx
import React, { useState } from 'react';
import {
  useGetBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} from '../../api/brandApi';
import BrandTable from '../../features/Admin/brands/BrandTable';
import ModalForm from '../../components/Admin/ModalForm';
import DeleteModal from '../../components/Admin/DeleteModal';
import Pagination from '../../components/Admin/Pagination';
import SearchHeader from '../../components/Admin/SearchHeader';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import { toast } from 'react-toastify';

const AdminBrandPage = () => {
  const { data: brands, isLoading, error } = useGetBrandsQuery();
  const [createBrand] = useCreateBrandMutation();
  const [updateBrand] = useUpdateBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [formData, setFormData] = useState({ brandName: '' });
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'delete'

  // Lọc thương hiệu theo tên (không phân biệt hoa thường)
  const filteredBrands = (brands || []).filter((brand) =>
    brand.brandName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentBrands = filteredBrands.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);

  // Xử lý thêm thương hiệu
  const handleAdd = async () => {
    try {
      await createBrand(formData).unwrap();
      setModalType(null);
      toast.success('Thêm thành công');
    } catch (err) {
      console.error('Thêm thất bại:', err);
      toast.error(err?.data);
    }
  };

  // Xử lý chỉnh sửa thương hiệu
  const handleEdit = async () => {
    try {
      await updateBrand({ ...selectedBrand, ...formData }).unwrap();
      setModalType(null);
      toast.success('Cập nhật thành công');
    } catch (err) {
      toast.error('Cập nhật thất bại:');
    }
  };

  // Xử lý xóa thương hiệu
  const handleDelete = async () => {
    try {
      await deleteBrand(selectedBrand.brandId).unwrap();
      setModalType(null);
      toast.success('Xóa thành công');
    } catch (err) {
      console.error('Delete brand failed:', err);
      toast.error(err?.data);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message="Lỗi tải thương hiệu" />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý thương hiệu</h1>

      <SearchHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddClick={() => {
          setFormData({ brandName: '' });
          setModalType('add');
        }}
        buttonText="Thêm thương hiệu"
      />

      <BrandTable
        brands={currentBrands}
        onEditClick={(brand) => {
          setSelectedBrand(brand);
          setFormData({ brandName: brand.brandName });
          setModalType('edit');
        }}
        onDeleteClick={(brand) => {
          setSelectedBrand(brand);
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
          title={
            modalType === 'add' ? 'Thêm thương hiệu' : 'Chỉnh sửa thương hiệu'
          }
          onClose={() => setModalType(null)}
          onSubmit={modalType === 'add' ? handleAdd : handleEdit}
          submitText={modalType === 'add' ? 'Thêm' : 'Lưu thay đổi'}
        >
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-gray-900 dark:text-white">
                Tên thương hiệu
              </label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) =>
                  setFormData({ ...formData, brandName: e.target.value })
                }
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </ModalForm>
      )}

      {modalType === 'delete' && (
        <DeleteModal
          message={`Bạn có chắc muốn xóa thương hiệu "${selectedBrand?.brandName}" không? Hành động này không thể hoàn tác.`}
          onClose={() => setModalType(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default AdminBrandPage;

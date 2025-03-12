// src/features/Admin/Spareparts/AdminSparepartsPage.jsx
import React, { useState } from 'react';
import {
  useGetSparePartsQuery,
  useGetSparePartByIdQuery,
  useCreateSparePartMutation,
  useUpdateSparePartMutation,
  useDeleteSparePartMutation,
} from '../../api/sparepartsApi';
import SparepartsTable from '../../features/Admin/spareparts/SparepartsTable';
import ModalForm from '../../components/Admin/ModalForm';
import DeleteModal from '../../components/Admin/DeleteModal';
import Pagination from '../../components/Admin/Pagination';
import SearchHeader from '../../components/Admin/SearchHeader';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import AddSparePartForm from '../../features/Admin/spareparts/AddSparePartForm';
import { toast } from 'react-toastify';

const AdminSparepartsPage = () => {
  const { data: spareparts, isLoading, error } = useGetSparePartsQuery();
  const [createSparePart] = useCreateSparePartMutation();
  const [updateSparePart] = useUpdateSparePartMutation();
  const [deleteSparePart] = useDeleteSparePartMutation();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedSparePart, setSelectedSparePart] = useState(null);
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'delete'

  const filteredSpareParts = (spareparts || []).filter((item) =>
    item.sparepartsName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredSpareParts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSpareParts.length / itemsPerPage);

  const handleAdd = async (newData) => {
    try {
      await createSparePart(newData).unwrap();
      setModalType(null);
    } catch (err) {
      console.error('Add spare part failed:', err);
      toast.error(err?.data);
    }
  };

  const handleEdit = async (updatedData) => {
    try {
      await updateSparePart({ ...selectedSparePart, ...updatedData }).unwrap();
      setModalType(null);
      toast.success('Cập nhật thành công');
    } catch (err) {
      console.error('Update spare part failed:', err);
      toast.error(err?.data);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSparePart(selectedSparePart.sparepartsId).unwrap();
      setModalType(null);
    } catch (err) {
      console.error('Delete spare part failed:', err);
      toast.error(err?.data);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message="Lỗi tải phụ tùng" />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý phụ tùng</h1>

      <SearchHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddClick={() => setModalType('add')}
        buttonText="Thêm phụ tùng"
      />

      <SparepartsTable
        spareparts={currentItems}
        onEditClick={(item) => {
          setSelectedSparePart(item);
          setModalType('edit');
        }}
        onDeleteClick={(item) => {
          setSelectedSparePart(item);
          setModalType('delete');
        }}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      {(modalType === 'add' || modalType === 'edit') && (
        <AddSparePartForm
          initialData={
            modalType === 'edit'
              ? {
                  sparepartsName: selectedSparePart.sparepartsName,
                  categoryId: selectedSparePart.categoryId,
                }
              : { sparepartsName: '', categoryId: '' }
          }
          onSubmit={modalType === 'add' ? handleAdd : handleEdit}
          onClose={() => setModalType(null)}
        />
      )}

      {modalType === 'delete' && (
        <DeleteModal
          message={`Bạn có chắc muốn xóa phụ tùng "${selectedSparePart?.sparepartsName}" không? Hành động này không thể hoàn tác.`}
          onClose={() => setModalType(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default AdminSparepartsPage;

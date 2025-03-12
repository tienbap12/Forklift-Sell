// src/features/Admin/SparepartsProduct/AdminSparepartsProductPage.jsx
import React, { useState } from 'react';
import {
  useGetSparePartsProductsQuery,
  useGetSparePartsProductByIdQuery,
  useCreateSparePartProductMutation,
  useUpdateSparePartProductMutation,
  useDeleteSparePartProductMutation,
} from '../../api/sparepartsProductApi';
import SparepartsProductTable from '../../features/Admin/sparepartsProduct/SparepartsProductTable';
import ModalForm from '../../components/Admin/ModalForm';
import DeleteModal from '../../components/Admin/DeleteModal';
import Pagination from '../../components/Admin/Pagination';
import SearchHeader from '../../components/Admin/SearchHeader';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import AddSparePartProductForm from '../../features/Admin/sparepartsProduct/SparePartProductForm';
import { toast } from 'react-toastify';

const AdminSparepartsProductPage = () => {
  const { data: products, isLoading, error } = useGetSparePartsProductsQuery();
  const [createSparepartsProduct] = useCreateSparePartProductMutation();
  const [updateSparepartsProduct] = useUpdateSparePartProductMutation();
  const [deleteSparepartsProduct] = useDeleteSparePartProductMutation();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'delete'

  const filteredProducts = (products || []).filter((product) =>
    product.sparepartsProductName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleAdd = async (newData) => {
    try {
      await createSparepartsProduct(newData).unwrap();
      setModalType(null);
      toast.success('Thêm thành công');
    } catch (err) {
      console.error('Add spareparts product failed:', err);
      toast.error(err?.data);
    }
  };

  const handleEdit = async (updatedData) => {
    try {
      await updateSparepartsProduct({
        ...selectedProduct,
        ...updatedData,
      }).unwrap();
      setModalType(null);
      toast.success('Cập nhật thành công');
    } catch (err) {
      console.error('Update spareparts product failed:', err);
      toast.error(err?.data);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSparepartsProduct(
        selectedProduct.sparepartsProductId
      ).unwrap();
      setModalType(null);
      toast.success('Xóa thành công');
    } catch (err) {
      console.error('Delete spareparts product failed:', err);
      toast.error(err?.data);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message="Lỗi tải sản phẩm phụ tùng" />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý sản phẩm phụ tùng</h1>

      <SearchHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddClick={() => {
          setSelectedProduct(null);
          setModalType('add');
        }}
        buttonText="Thêm sản phẩm phụ tùng"
      />

      <SparepartsProductTable
        products={currentProducts}
        onEditClick={(product) => {
          setSelectedProduct(product);
          setModalType('edit');
        }}
        onDeleteClick={(product) => {
          setSelectedProduct(product);
          setModalType('delete');
        }}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      {(modalType === 'add' || modalType === 'edit') && (
        <AddSparePartProductForm
          initialData={
            modalType === 'edit'
              ? {
                  sparepartsProductName: selectedProduct.sparepartsProductName,
                  description: selectedProduct.description,
                  sparepartsName: selectedProduct.sparepartsName,
                  images: [
                    selectedProduct.image1 || '',
                    selectedProduct.image2 || '',
                    selectedProduct.image3 || '',
                    selectedProduct.image4 || '',
                  ],
                  sparepartsId: selectedProduct.sparepartsId,
                }
              : {
                  sparepartsProductName: '',
                  description: '',
                  sparepartsName: '',
                  images: ['', '', '', ''],
                  sparepartsId: '',
                }
          }
          onSubmit={modalType === 'add' ? handleAdd : handleEdit}
          onClose={() => setModalType(null)}
        />
      )}

      {modalType === 'delete' && (
        <DeleteModal
          message={`Bạn có chắc muốn xóa sản phẩm phụ tùng "${selectedProduct?.sparepartsProductName}" không? Hành động này không thể hoàn tác.`}
          onClose={() => setModalType(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default AdminSparepartsProductPage;

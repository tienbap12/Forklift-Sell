import React, { useState } from 'react';
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
} from '../../api/productApi';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import SearchHeader from '../../components/Admin/SearchHeader';
import ProductTable from '../../features/Admin/products/ProductTable';
import Pagination from '../../components/Admin/Pagination';
import EditProductModal from '../../features/Admin/products/EditProductModal';
import AddProductModal from '../../features/Admin/products/AddProductModal';
import DeleteProductModal from '../../features/Admin/products/DeleteProductModal';
import { toast } from 'react-toastify';

const AdminProductPage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [createProduct] = useCreateProductMutation();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
    keyword: '',
    categoryName: '',
    brandName: '',
    description: '',
    images: ['', '', '', ''],
  });
  const parseDescription = (desc) => {
    return desc
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => {
        const [key, value] = line.split('\t');
        return { key: key.replace(':', '').trim(), value: value?.trim() || '' };
      })
      .filter((item) => item.key);
  };
  // State cho tìm kiếm và phân trang
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const handleEditClick = (product) => {
    const descriptionFields = parseDescription(product.description); // Parse description thành mảng các trường
    setSelectedProduct(product);
    setFormData({
      productName: product.productName,
      keyword: product.keyword,
      categoryName: product.categoryName,
      brandName: product.brandName,
      descriptionFields, // truyền mảng descriptionFields đã parse vào đây
      images: [
        product.image1 || '',
        product.image2 || '',
        product.image3 || '',
        product.image4 || '',
      ],
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleAddClick = () => {
    setFormData({
      productName: '',
      keyword: '',
      categoryName: '',
      brandName: '',
      description: '',
      images: ['', '', '', ''],
    });
    setShowAddModal(true);
  };

  const handleSubmit = async (isEditMode, productData) => {
    try {
      if (isEditMode) {
        await updateProduct({ ...selectedProduct, ...productData }).unwrap();
        setShowEditModal(false);
        toast.success('Cập nhật thành công');
      } else {
        await createProduct(productData).unwrap();
        setShowAddModal(false);
        toast.success('Thêm thành công');
      }
    } catch (error) {
      console.error('Operation failed:', error);
      toast.error(err?.data);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(selectedProduct.productId).unwrap();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error(err?.data);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message="Lỗi tải dữ liệu" />;

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Quản lý sản phẩm
      </h1>

      <SearchHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddClick={handleAddClick}
        buttonText={'Thêm sản phẩm'}
      />

      <ProductTable
        products={currentProducts}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      {showEditModal && (
        <EditProductModal
          formData={formData}
          setFormData={setFormData}
          onClose={() => setShowEditModal(false)}
          onSubmit={(productData) => handleSubmit(true, productData)}
        />
      )}

      {showAddModal && (
        <AddProductModal
          formData={formData}
          setFormData={setFormData}
          onClose={() => setShowAddModal(false)}
          onSubmit={(data) => console.log('Dữ liệu gửi đi:', data)}
        />
      )}

      {showDeleteModal && (
        <DeleteProductModal
          product={selectedProduct}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default AdminProductPage;

import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../../api/productApi';
import ProductItemLoader from '../../../components/common/ProductItemLoader';
import ErrorMessage from '../../../components/common/ErrorMessage';
import { Link } from 'react-router-dom';
import { useGetSparepartsProductsByCategoryQuery } from '../../../api/sparePartsProductApi';

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const brand = searchParams.get('brand');
  const sparepart = searchParams.get('sparepart');

  // Xử lý riêng spare parts
  const {
    data: sparepartsData,
    isLoading: sparepartsLoading,
    error: sparepartsError,
  } = useGetSparepartsProductsByCategoryQuery(sparepart, {
    skip: !sparepart,
  });

  // Xử lý products (bao gồm cả getAll khi không có param)
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery(
    { categoryId: category, brandId: brand },
    {
      skip: !!sparepart, // Chỉ skip khi có sparepart
    }
  );

  // Tổng hợp kết quả
  const isLoading = sparepartsLoading || productsLoading;
  const error = sparepartsError || productsError;
  const data = sparepart ? sparepartsData : productsData;

  if (isLoading)
    return (
      <div className="grid grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <ProductItemLoader key={index} />
        ))}
      </div>
    );

  if (error) return <ErrorMessage message="Lỗi tải dữ liệu" />;

  const products = Array.isArray(data) ? data : [];
  if (products.length === 0)
    return (
      <ErrorMessage message="Hiện tại chưa có sản phẩm nào thuộc danh mục này" />
    );
  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map((product) => {
        const isSparepart = !!sparepart;
        const productId = isSparepart
          ? product.sparepartsProductId
          : product.productId;
        const productName = isSparepart
          ? product.sparepartsProductName
          : product.productName;
        const image = product.image1;
        const detailLink = isSparepart
          ? `/phu-tung/${productId}`
          : `/san-pham/${productId}`;

        return (
          <div
            key={productId}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link to={detailLink} className="block">
              <div className="aspect-square bg-gray-100 relative">
                {image ? (
                  <img
                    src={`data:image/png;base64,${image}`}
                    alt={productName}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-medium text-gray-800 mb-2 truncate">
                  {productName}
                </h3>
                <div className="text-sm text-gray-600">
                  {!isSparepart && (
                    <>
                      <p className="truncate">Model: {product.keyword}</p>
                      <p className="mt-1">Hãng: {product.brandName}</p>
                      <p>Danh mục: {product.categoryName}</p>
                    </>
                  )}
                  {isSparepart && <p>Phụ tùng: {product.sparepartsName}</p>}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;

import React from 'react';
import { toast } from 'react-toastify';

const DeleteModal = ({
  title = 'Xác nhận xóa',
  message,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = async () => {
    try {
      await onConfirm();
      // Nếu xóa thành công, mới đóng modal
      onClose();
    } catch (error) {
      // Nếu xóa không thành công, hiển thị toast mà không đóng modal
      toast.error('Xóa không thành công!');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mb-4 text-gray-900 dark:text-white">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:text-white"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

// ImageUpload.jsx
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ index, image, onImageChange }) => {
  const getImageSrc = (image) => {
    if (!image) return '';
    return image.startsWith('data:')
      ? image
      : `data:image/jpeg;base64,${image}`;
  };
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          // reader.result chứa chuỗi Base64 của file ảnh
          onImageChange(index, reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    [index, onImageChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div
      {...getRootProps()}
      className="p-4 border-dashed border-2 rounded cursor-pointer"
    >
      <input {...getInputProps()} />
      {image ? (
        <img
          src={getImageSrc(image)}
          alt={`Ảnh ${index + 1}`}
          className="object-cover h-32 w-full"
        />
      ) : isDragActive ? (
        <p>Thả ảnh vào đây ...</p>
      ) : (
        <p>Kéo thả ảnh vào đây hoặc click để chọn ảnh</p>
      )}
    </div>
  );
};

export default ImageUpload;

// src/components/CategorySelect.jsx
import React from 'react';

const CategorySelect = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="input input-bordered w-full"
      >
        <option value="">-- Chọn danh mục --</option>
        {categories &&
          categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CategorySelect;

import React from 'react';

const Filter = ({ selectedCategory, onCategoryChange }) => {
  const categories = ['Все', 'Frontend', 'Backend', 'Design', 'Marketing'];

  return (
    <div className="filter">
      <label>🎯 Фильтр по категориям:</label>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value === 'Все' ? '' : e.target.value)}
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
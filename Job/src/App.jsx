
import React, { useState } from 'react';
import './App.css';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import Search from './components/Search';
import Filter from './components/Filter';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleJobAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="app">
      <h1>🚀 Доска вакансий</h1>
      <div className="controls">
        <Search onSearch={setSearchTerm} />
        <Filter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      </div>
      <JobList
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        refreshTrigger={refreshTrigger}
      />
      <JobForm onJobAdded={handleJobAdded} />
    </div>
  );
}

export default App;

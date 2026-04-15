import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const JobForm = ({ onJobAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Frontend', 'Backend', 'Design', 'Marketing'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) return 'Название вакансии обязательно';
    if (!formData.company.trim()) return 'Компания обязательна';
    if (!formData.description.trim()) return 'Описание обязательно';
    if (!formData.category) return 'Категория обязательна';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'jobs'), {
        ...formData,
        createdAt: new Date()
      });
      setFormData({
        title: '',
        company: '',
        description: '',
        category: ''
      });
      if (onJobAdded) onJobAdded();
    } catch (err) {
      setError('Ошибка при добавлении вакансии: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-form">
      <h2>✨ Добавить вакансию</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название вакансии</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Например: Frontend Developer"
            required
          />
        </div>
        <div className="form-group">
          <label>Компания</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Название компании"
            required
          />
        </div>
        <div className="form-group">
          <label>Описание</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Опишите требования, обязанности и условия..."
            required
          />
        </div>
        <div className="form-group">
          <label>Категория</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Выберите категорию</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        {error && <p className="error">⚠️ {error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? '⏳ Добавление...' : '🚀 Добавить вакансию'}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
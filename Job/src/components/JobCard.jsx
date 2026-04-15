import React from 'react';

const JobCard = ({ job, onDelete }) => {
  return (
    <div className="job-card">
      <h3>💼 {job.title}</h3>
      <p><strong>🏢 Компания:</strong> {job.company}</p>
      <p><strong>📂 Категория:</strong> {job.category}</p>
      <p><strong>📝 Описание:</strong> {job.description}</p>
      <button onClick={() => onDelete(job.id)}>🗑️ Удалить</button>
    </div>
  );
};

export default JobCard;
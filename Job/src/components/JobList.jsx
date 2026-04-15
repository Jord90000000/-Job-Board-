import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import JobCard from './JobCard';

const JobList = ({ searchTerm, selectedCategory, refreshTrigger }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Демо-данные для показа функционала
  const demoJobs = [
    {
      id: 'demo1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      description: 'Ищем опытного frontend разработчика с опытом работы с React, TypeScript, Next.js. Требования: 3+ года опыта, знание современных инструментов.',
      category: 'Frontend',
      createdAt: new Date()
    },
    {
      id: 'demo2',
      title: 'Node.js Backend Developer',
      company: 'DataSys',
      description: 'Требуется backend разработчик для работы с Node.js, PostgreSQL, Redis и микросервисами. Опыт с Docker и Kubernetes приветствуется.',
      category: 'Backend',
      createdAt: new Date()
    },
    {
      id: 'demo3',
      title: 'UI/UX Designer',
      company: 'DesignStudio',
      description: 'Креативный дизайнер для создания пользовательских интерфейсов и опыта. Необходим опыт работы с Figma, Adobe XD, знание принципов дизайна.',
      category: 'Design',
      createdAt: new Date()
    },
    {
      id: 'demo4',
      title: 'Digital Marketing Manager',
      company: 'MarketPro',
      description: 'Менеджер по маркетингу для разработки и реализации маркетинговых стратегий. Опыт работы с Google Ads, Facebook Ads, SEO.',
      category: 'Marketing',
      createdAt: new Date()
    },
    {
      id: 'demo5',
      title: 'DevOps Engineer',
      company: 'CloudTech',
      description: 'DevOps инженер для настройки CI/CD, работы с AWS/GCP, Kubernetes. Опыт автоматизации инфраструктуры и мониторинга.',
      category: 'Backend',
      createdAt: new Date()
    },
    {
      id: 'demo6',
      title: 'Mobile App Developer (React Native)',
      company: 'AppMobile',
      description: 'Разработчик мобильных приложений на React Native. Опыт работы с iOS/Android, знание нативных технологий.',
      category: 'Frontend',
      createdAt: new Date()
    },
    {
      id: 'demo7',
      title: 'Data Analyst',
      company: 'DataInsights',
      description: 'Аналитик данных для работы с большими объемами информации. SQL, Python, Tableau/Power BI, статистический анализ.',
      category: 'Backend',
      createdAt: new Date()
    },
    {
      id: 'demo8',
      title: 'Product Manager',
      company: 'ProductLab',
      description: 'Менеджер продукта для управления разработкой цифровых продуктов. Опыт работы с agile, аналитикой, управлением командой.',
      category: 'Marketing',
      createdAt: new Date()
    },
    {
      id: 'demo9',
      title: 'QA Automation Engineer',
      company: 'QualityFirst',
      description: 'Инженер по автоматизации тестирования. Selenium, Cypress, API testing, опыт написания автотестов.',
      category: 'Backend',
      createdAt: new Date()
    },
    {
      id: 'demo10',
      title: 'Graphic Designer',
      company: 'CreativeAgency',
      description: 'Графический дизайнер для создания визуального контента. Adobe Creative Suite, брендинг, дизайн презентаций.',
      category: 'Design',
      createdAt: new Date()
    }
  ];

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const querySnapshot = await getDocs(collection(db, 'jobs'));
      const jobsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Если в Firestore нет данных, показываем демо-данные
      if (jobsData.length === 0) {
        setJobs(demoJobs);
      } else {
        setJobs(jobsData);
      }
    } catch (err) {
      // Если ошибка с Firebase, показываем демо-данные
      console.warn('Firebase error, showing demo data:', err.message);
      setJobs(demoJobs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    // Для демо-данных просто удаляем из локального состояния
    if (id.startsWith('demo')) {
      setJobs(prev => prev.filter(job => job.id !== id));
      return;
    }

    try {
      await deleteDoc(doc(db, 'jobs', id));
      setJobs(prev => prev.filter(job => job.id !== id));
    } catch (err) {
      setError('Ошибка при удалении вакансии: ' + err.message);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <p>⏳ Загрузка вакансий...</p>;
  if (error) return <p className="error">⚠️ {error}</p>;

  return (
    <div className="job-list">
      <h2>📋 Вакансии</h2>
      {filteredJobs.length === 0 ? (
        jobs.length === 0 ? <p>📭 Нет вакансий</p> : <p>🔍 Ничего не найдено</p>
      ) : (
        <>
          {jobs.length > 0 && jobs[0].id.startsWith('demo') && (
            <p style={{textAlign: 'center', color: '#ffa500', fontSize: '0.9rem', marginBottom: '20px'}}>
              📝 Показаны демо-данные. Настройте Firebase для сохранения реальных вакансий!
            </p>
          )}
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} onDelete={handleDelete} />
          ))}
        </>
      )}
    </div>
  );
};

export default JobList;
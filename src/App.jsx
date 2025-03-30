import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Overview from './components/Overview/Overview';
import Statistics from './components/Statistics/Statistics';
import Properties from './components/Properties/Properties';
import Footer from './components/Footer/Footer';
import Spinner from './components/UI/Spinner/Spinner'; // مكون جديد للتحميل
import ErrorBoundary from './components/UI/ErrorBoundary/ErrorBoundary'; // مكون جديد لمعالجة الأخطاء
import properties from './assets/properties.json';

function App() {
  const [propertiesData, setPropertiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light'); // إضافة نظام المواضيع

  // تحميل البيانات
  const loadData = useCallback(async () => {
    try {
      // محاكاة زمن تحميل البيانات من API - يمكن استبداله بطلب حقيقي
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // التحقق من صحة البيانات قبل استخدامها
      if (!Array.isArray(properties) || properties.length === 0) {
        throw new Error("بيانات العقارات غير صالحة أو فارغة");
      }
      
      setPropertiesData(properties);
      setLoading(false);
    } catch (err) {
      console.error("خطأ في تحميل البيانات:", err);
      setError(err.message || "حدث خطأ أثناء تحميل البيانات");
      setLoading(false);
    }
  }, []);

  // تحميل البيانات عند بدء التطبيق
  useEffect(() => {
    loadData();
    
    // تحميل الموضوع المحفوظ مسبقًا
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, [loadData]);

  // تبديل الموضوع بين الفاتح والداكن
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // حساب الإحصائيات
  const calculateStats = useCallback(() => {
    if (!propertiesData.length) return {};
    
    const totalProperties = propertiesData.length;
    
    const totalArea = propertiesData.reduce((sum, property) => {
      const area = parseFloat(property.property.area.replace(/,/g, ''));
      return sum + (isNaN(area) ? 0 : area);
    }, 0);
    
    const averageArea = totalArea / totalProperties;
    
    // تقدير عدد المستفيدين
    const estimatedBeneficiaries = Math.ceil(totalArea / 10); // افتراض تقريبي
    
    return {
      totalProperties,
      totalArea: totalArea.toFixed(2),
      averageArea: averageArea.toFixed(2),
      beneficiaries: estimatedBeneficiaries
    };
  }, [propertiesData]);

  // عرض شاشة التحميل
  if (loading) {
    return (
      <div className="loading-container">
        <Spinner />
        <p>جاري تحميل البيانات...</p>
      </div>
    );
  }

  // عرض رسالة الخطأ إذا كان هناك خطأ
  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>عذراً، حدث خطأ</h2>
          <p>{error}</p>
          <button className="btn" onClick={loadData}>إعادة المحاولة</button>
        </div>
      </div>
    );
  }

  // حساب الإحصائيات للتطبيق
  const stats = calculateStats();

  return (
    <div className={`app theme-${theme}`}>
      <ErrorBoundary>
        <Header toggleTheme={toggleTheme} currentTheme={theme} />
        <div className="main-content">
          <Hero />
          <Overview stats={stats} />
          
          <Statistics />
          <Properties properties={propertiesData} />
        </div>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

export default App;

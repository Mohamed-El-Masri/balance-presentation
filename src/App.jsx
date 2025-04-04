import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import OverviewSection from './components/OverviewSection/OverviewSection';
import StatisticsSection from './components/StatisticsSection/StatisticsSection';
import Properties from './components/Properties/Properties';
import Footer from './components/Footer/Footer';
import Spinner from './components/UI/Spinner/Spinner';
import ErrorBoundary from './components/UI/ErrorBoundary/ErrorBoundary';
import properties from './assets/properties.json';
import MapSection from './components/MapSection/MapSection';
import ComparisonSection from './components/ComparisonSection/ComparisonSection';
import Vision2030Section from './components/Vision2030Section/Vision2030Section';
import CaseStudiesSection from './components/CaseStudiesSection/CaseStudiesSection';


function App() {
  const [propertiesData, setPropertiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ترتيب تعريف متغير الثيم قبل استخدامه في تبديل الثيم
  const [theme, setTheme] = useState(() => {
    // استخدام localStorage بطريقة أكثر أمانًا مع التحقق من الوضع المفضل للنظام
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    // التحقق من تفضيلات النظام كنقطة بداية
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

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

  // تحميل البيانات عند بدء التطبيق وتعيين الثيم
  useEffect(() => {
    loadData();
    
    // تطبيق الثيم على مستوى المستند
    document.documentElement.setAttribute('data-theme', theme);
  }, [loadData, theme]);

  // تبديل الموضوع بين الفاتح والداكن
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
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
    const estimatedBeneficiaries = Math.ceil(totalArea / 10);
    
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
    <div className="app">
      <ErrorBoundary>
        <Header toggleTheme={toggleTheme} currentTheme={theme} />
        <div className="main-content">
          <Hero />
          <OverviewSection stats={stats} />
          <MapSection />
          <StatisticsSection />
          <Properties properties={propertiesData} />
          <ComparisonSection />
          <Vision2030Section />
          
          <CaseStudiesSection />
        </div>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

export default App;

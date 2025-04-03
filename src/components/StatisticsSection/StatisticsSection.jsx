import React, { useRef, useEffect, useState } from 'react';
import './StatisticsSection.css';

function StatisticsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Count-up animation for statistics
  const [factoriesCount, setFactoriesCount] = useState(0);
  const [growthPercentage, setGrowthPercentage] = useState(0);
  const [targetFactories, setTargetFactories] = useState(0);
  const [riadFactories, setRiadFactories] = useState(0);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (isVisible) {
      // Animate statistics when section is visible
      const factoriesInterval = animateValue(0, 11549, 2000, setFactoriesCount);
      const growthInterval = animateValue(0, 60, 1500, setGrowthPercentage);
      const targetInterval = animateValue(0, 36000, 2500, setTargetFactories);
      const riadInterval = animateValue(0, 4502, 2000, setRiadFactories);
      
      return () => {
        clearInterval(factoriesInterval);
        clearInterval(growthInterval);
        clearInterval(targetInterval);
        clearInterval(riadInterval);
      };
    }
  }, [isVisible]);
  
  // Function to animate counting
  const animateValue = (start, end, duration, setValue) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      setValue(value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
    
    // Return dummy interval id for cleanup
    return 1;
  };
  
  // Format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <section className="statistics-section" id="statistics" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">إحصائيات النمو الصناعي</h2>
        <p className="section-description">
          شهدت المملكة العربية السعودية نمواً كبيراً في القطاع الصناعي منذ إطلاق رؤية 2030،
          مما يزيد الحاجة لتوفير سكن مناسب للقوى العاملة في هذا القطاع.
        </p>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-industry"></i>
            </div>
            <div className="stat-info">
              <h3 className="stat-number">{formatNumber(factoriesCount)}</h3>
              <p className="stat-label">مصنع حالياً في المملكة</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="stat-info">
              <h3 className="stat-number">{growthPercentage}%</h3>
              <p className="stat-label">نسبة النمو منذ إطلاق رؤية 2030</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-bullseye"></i>
            </div>
            <div className="stat-info">
              <h3 className="stat-number">{formatNumber(targetFactories)}</h3>
              <p className="stat-label">مصنع مستهدف بحلول عام 2035</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="stat-info">
              <h3 className="stat-number">{formatNumber(riadFactories)}</h3>
              <p className="stat-label">مصنع في منطقة الرياض</p>
            </div>
          </div>
        </div>
        
        <div className="stats-chart">
          <h3>توزيع المصانع في مناطق المملكة</h3>
          <div className="chart-container">
            <div className="chart-bar-container">
              <div className="chart-label">الرياض</div>
              <div className="chart-bar" style={{width: '90%'}} data-value="4,502"></div>
            </div>
            <div className="chart-bar-container">
              <div className="chart-label">المنطقة الشرقية</div>
              <div className="chart-bar" style={{width: '65%'}} data-value="2,618"></div>
            </div>
            <div className="chart-bar-container">
              <div className="chart-label">مكة المكرمة</div>
              <div className="chart-bar" style={{width: '55%'}} data-value="2,209"></div>
            </div>
            <div className="chart-bar-container">
              <div className="chart-label">القصيم</div>
              <div className="chart-bar" style={{width: '14%'}} data-value="546"></div>
            </div>
            <div className="chart-bar-container">
              <div className="chart-label">المدينة المنورة</div>
              <div className="chart-bar" style={{width: '13%'}} data-value="526"></div>
            </div>
            <div className="chart-bar-container">
              <div className="chart-label">عسير</div>
              <div className="chart-bar" style={{width: '10%'}} data-value="401"></div>
            </div>
          </div>
        </div>
        
        <div className="industry-info">
          <h3>استراتيجية التطوير الصناعي في المملكة</h3>
          <p>
            تسعى المملكة العربية السعودية في إطار رؤية 2030 إلى جعل القطاع الصناعي أحد الركائز الأساسية للاقتصاد. 
            أطلقت الاستراتيجية الوطنية للصناعة في العام 2022 لزيادة عدد المصانع في جميع أنحاء البلاد 3.5 أضعاف 
            إلى 36 ألف مصنع بحلول العام 2035.
          </p>
          <p>
            وتستهدف الاستراتيجية الصناعية في السعودية تحويل البلاد إلى مركز صناعي رائد من بين أكبر 15 مركزًا صناعيًا 
            عالميًا بحلول العام 2035، وتحويل المملكة إلى مركز صناعي إقليمي متكامل لتلبية الطلب المتزايد وتحقيق 
            الريادة العالمية في إنتاج سلع محددة.
          </p>
          <p>
            يدعم ارتفاع عدد المصانع في مختلف أنحاء السعودية هدف الاستراتيجية المتمثل في رفع الناتج المحلي الإجمالي 
            للقطاع من 88 مليار دولار في العام 2020 إلى 223 مليار دولار في العام 2035.
          </p>
          
          <div className="workforce-demand">
            <h4>الطلب المتزايد على سكن العمالة</h4>
            <p>
              مع النمو السريع في القطاع الصناعي، يزداد الطلب على توفير سكن مناسب للقوى العاملة في هذا القطاع. 
              تحويل رخص البناء من فندقي إلى سكني في المناطق الصناعية يمثل حلاً استراتيجياً لتلبية هذا الطلب المتزايد،
              مع دعم أهداف التنمية الصناعية المستدامة في المملكة.
            </p>
            <div className="cta-wrapper">
              <a href="#properties" className="stats-cta">استعرض قطع الأراضي المتاحة للتطوير</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatisticsSection;

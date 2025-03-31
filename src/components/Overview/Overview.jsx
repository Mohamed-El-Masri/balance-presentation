import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './Overview.css';
import MiniChart from './MiniChart';

const Overview = ({ stats: propStats }) => {
  // إمكانية استقبال البيانات من الخارج أو استخدام القيم الافتراضية
  const stats = useMemo(() => propStats || {
    totalProperties: 15,
    totalArea: 37782.26,
    averageArea: 2518.82,
    beneficiaries: 3779
  }, [propStats]);

  // متغيرات حالة للعدادات
  const [countedStats, setCountedStats] = useState({
    totalProperties: 0,
    totalArea: 0,
    averageArea: 0,
    beneficiaries: 0
  });

  // متغير حالة لتتبع ما إذا كانت العدادات قد بدأت وانتهت
  const [hasCountingStarted, setHasCountingStarted] = useState(false);
  const [countingFinished, setCountingFinished] = useState(false);
  
  // مراجع للقسم وبطاقات الإحصائيات
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  // بيانات للرسومات البيانية المصغرة - تحسين باستخدام useMemo
  const chartData = useMemo(() => ({
    properties: [8, 10, 12, 13, 15],
    area: [25000, 28000, 31000, 35000, 37782],
    average: [2400, 2450, 2480, 2500, 2518],
    beneficiaries: [2200, 2600, 3100, 3500, 3779]
  }), []);

  // تنسيق الأرقام - تحسين باستخدام useCallback
  const formatNumber = useCallback((number, isArea = false) => {
    if (isArea) {
      // تنسيق العشري إلى رقمين فقط للمساحات
      return parseFloat(number.toFixed(2)).toLocaleString('ar-SA');
    }
    // تنسيق الأعداد الصحيحة
    return Math.round(number).toLocaleString('ar-SA');
  }, []);

  // دالة لبدء العدادات بطريقة متناسقة - تحسين باستخدام useCallback
  const startCounters = useCallback(() => {
    const duration = Math.min(window.innerWidth < 768 ? 1500 : 2000, 2000); // مدة أقصر للأجهزة المحمولة
    const framesPerSecond = 60;
    const totalFrames = duration / (1000 / framesPerSecond);
    let frame = 0;

    // تخزين القيمة الأصلية لكل عداد
    const initialValues = { ...countedStats };

    // تأخير ظهور البطاقات واحدة تلو الأخرى
    cardRefs.current.forEach((card, index) => {
      if (card) {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 150);
      }
    });

    // تحسين معادلة الحركة
    const easeOutCubic = progress => 1 - Math.pow(1 - progress, 3);

    // دالة التحديث التي ستستدعى في كل إطار
    const updateCounters = () => {
      frame++;
      
      // تحديث قيم العدادات مع استخدام منحنيات إيس أوت للحركة أكثر طبيعية
      const progress = frame / totalFrames;
      const easedProgress = easeOutCubic(progress);
      
      setCountedStats({
        totalProperties: Math.ceil(initialValues.totalProperties + (stats.totalProperties - initialValues.totalProperties) * easedProgress),
        totalArea: initialValues.totalArea + (stats.totalArea - initialValues.totalArea) * easedProgress,
        averageArea: initialValues.averageArea + (stats.averageArea - initialValues.averageArea) * easedProgress,
        beneficiaries: Math.ceil(initialValues.beneficiaries + (stats.beneficiaries - initialValues.beneficiaries) * easedProgress)
      });
      
      // استمرار العد إذا لم نصل للنهاية بعد
      if (frame < totalFrames) {
        // استخدام رمز التوقيت بدلاً من requestAnimationFrame للأداء الأفضل
        const nextFrameDelay = 1000 / framesPerSecond;
        setTimeout(updateCounters, nextFrameDelay);
      } else {
        // بعد انتهاء العد، نضيف تأثير الإتمام
        setCountingFinished(true);
      }
    };

    // بدء العد
    requestAnimationFrame(updateCounters);
  }, [countedStats, stats]);

  // دعم تقليل الحركة للمستخدمين الذين يفضلون ذلك
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion && !hasCountingStarted) {
      // تخطي العد وتعيين القيم النهائية مباشرة
      setCountedStats({
        totalProperties: stats.totalProperties,
        totalArea: stats.totalArea,
        averageArea: stats.averageArea,
        beneficiaries: stats.beneficiaries
      });
      
      setHasCountingStarted(true);
      setCountingFinished(true);
      
      // جعل البطاقات مرئية فورًا
      setTimeout(() => {
        cardRefs.current.forEach(card => {
          if (card) card.classList.add('visible');
        });
      }, 100);
    }
  }, [hasCountingStarted, stats]);

  // تأثير لمراقبة القسم عندما يظهر في نطاق الرؤية
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // تخطي المراقبة إذا كان المستخدم يفضل تقليل الحركة
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25 // يبدأ العد عندما يظهر 25% على الأقل من القسم
    };

    const handleIntersect = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasCountingStarted) {
        setHasCountingStarted(true);
        startCounters();
      }
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasCountingStarted, startCounters]);
  
  return (
    <section id="overview" ref={sectionRef} className="overview section" aria-label="نظرة عامة عن المشروع">
      <div className="container">
        <h2 className="section-title">نظرة عامة</h2>
        <p className="section-subtitle">إحصائيات مشروع تحويل رخص البناء من فندقي إلى سكني</p>
        
        <div className="stats-container" role="group" aria-label="إحصائيات المشروع">
          <div 
            ref={el => cardRefs.current[0] = el}
            className={`stat-card ${countingFinished ? 'count-complete' : ''}`}
            tabIndex="0"
            role="region"
            aria-label="إحصائية قطع الأراضي"
          >
            <div className="stat-icon-wrap">
              <div className="stat-icon">
                <i className="stat-icon-inner" aria-hidden="true">🏢</i>
              </div>
              <div className="stat-shape"></div>
            </div>
            <h3 className="stat-value counter-value">
              <span className="value">{formatNumber(countedStats.totalProperties)}</span>
            </h3>
            <p className="stat-label">قطعة أرض متاحة</p>
            <MiniChart type="bar" data={chartData.properties} color="rgba(86, 95, 88, 0.7)" />
          </div>
          
          <div 
            ref={el => cardRefs.current[1] = el}
            className={`stat-card ${countingFinished ? 'count-complete' : ''}`}
            tabIndex="0"
            role="region"
            aria-label="إحصائية المساحة الإجمالية"
          >
            <div className="stat-icon-wrap">
              <div className="stat-icon">
                <i className="stat-icon-inner" aria-hidden="true">📏</i>
              </div>
              <div className="stat-shape"></div>
            </div>
            <h3 className="stat-value counter-value">
              <span className="value">{formatNumber(countedStats.totalArea, true)}</span>
              <span className="stat-unit">م²</span>
            </h3>
            <p className="stat-label">المساحة الإجمالية</p>
            <MiniChart type="line" data={chartData.area} color="rgba(86, 95, 88, 0.7)" />
          </div>
          
          <div 
            ref={el => cardRefs.current[2] = el}
            className={`stat-card ${countingFinished ? 'count-complete' : ''}`}
            tabIndex="0"
            role="region"
            aria-label="إحصائية متوسط المساحة"
          >
            <div className="stat-icon-wrap">
              <div className="stat-icon">
                <i className="stat-icon-inner" aria-hidden="true">📊</i>
              </div>
              <div className="stat-shape"></div>
            </div>
            <h3 className="stat-value counter-value">
              <span className="value">{formatNumber(countedStats.averageArea, true)}</span>
              <span className="stat-unit">م²</span>
            </h3>
            <p className="stat-label">متوسط المساحة</p>
            <MiniChart type="bar" data={chartData.average} color="rgba(86, 95, 88, 0.7)" />
          </div>
          
          <div 
            ref={el => cardRefs.current[3] = el}
            className={`stat-card ${countingFinished ? 'count-complete' : ''}`}
            tabIndex="0"
            role="region"
            aria-label="إحصائية عدد المستفيدين"
          >
            <div className="stat-icon-wrap">
              <div className="stat-icon">
                <i className="stat-icon-inner" aria-hidden="true">👥</i>
              </div>
              <div className="stat-shape"></div>
            </div>
            <h3 className="stat-value counter-value">
              <span className="value">{formatNumber(countedStats.beneficiaries)}</span>
              <span className="stat-unit">+</span>
            </h3>
            <p className="stat-label">مستفيد متوقع</p>
            <MiniChart type="line" data={chartData.beneficiaries} color="rgba(86, 95, 88, 0.7)" />
          </div>
        </div>
        
        <div className="overview-info">
          <div className="info-marker">
            <span>ملاحظة</span>
          </div>
          <p>
            البيانات أعلاه تعكس قطع الأراضي المتاحة حالياً والمناسبة للتحويل من فندقي إلى سكني. 
            عدد المستفيدين متوقع بناءً على متوسط إشغال الوحدات السكنية في المنطقة <span className="masr-highlight">بمعدل ٢.٥ فرد للوحدة</span>.
          </p>
        </div>
        
        <div className="quick-actions" role="navigation" aria-label="روابط سريعة">
          <div 
            className="quick-action-btn" 
            onClick={() => document.getElementById('map-section-title').scrollIntoView({ behavior: 'smooth' })}
            tabIndex="0"
            role="button"
            aria-label="انتقل إلى قسم الخريطة"
            onKeyPress={(e) => e.key === 'Enter' && document.getElementById('map-section-title').scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="quick-action-icon" aria-hidden="true">🗺️</div>
            <span>استكشف الخريطة</span>
          </div>
          <div 
            className="quick-action-btn" 
            onClick={() => document.getElementById('statistics').scrollIntoView({ behavior: 'smooth' })}
            tabIndex="0"
            role="button"
            aria-label="انتقل إلى قسم تحليلات السوق"
            onKeyPress={(e) => e.key === 'Enter' && document.getElementById('statistics').scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="quick-action-icon" aria-hidden="true">📊</div>
            <span>تحليلات السوق</span>
          </div>
          <div 
            className="quick-action-btn" 
            onClick={() => document.getElementById('properties').scrollIntoView({ behavior: 'smooth' })}
            tabIndex="0"
            role="button"
            aria-label="انتقل إلى قسم عرض قطع الأراضي"
            onKeyPress={(e) => e.key === 'Enter' && document.getElementById('properties').scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="quick-action-icon" aria-hidden="true">🏢</div>
            <span>عرض قطع الأراضي</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;

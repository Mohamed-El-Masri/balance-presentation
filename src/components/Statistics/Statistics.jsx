import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
// Comentamos temporalmente la importación de iconos
// import { FaBuilding, FaHome, FaHotel, FaPercentage, FaUsers, FaChartLine, FaInfoCircle } from 'react-icons/fa';
import './StatisticsModule.css';
import statsData from '../../assets/statistics.json';
import { getChartOptions } from './ChartConfig';
import { formatNumber } from './StatisticsUtils';
// Ajustamos las importaciones que pueden depender de react-icons
// import ChartActions from './ChartActions';
// import ZoomedChart from './ZoomedChart';
// import StatCard from './StatCard';

// Componentes simples para reemplazar temporalmente
const SimpleIcon = ({ type }) => <span className={`simple-icon ${type}`}>{type.charAt(0).toUpperCase()}</span>;
const SimpleChartActions = ({ chartType, handleZoomChart, downloadChartImage }) => (
  <div className="stats-module__chart-actions">
    <button onClick={() => handleZoomChart(chartType)}>🔍</button>
    <button onClick={() => downloadChartImage(chartType)}>⬇️</button>
  </div>
);
const SimpleStatCard = ({ value, label, index, isPercentage }) => (
  <div className="stats-module__stat-item" style={{ "--stat-index": index || 0 }}>
    <div className="stats-module__stat-content">
      <span className="stats-module__stat-value">
        {isPercentage ? `${value}%` : formatNumber(value)}
      </span>
      <span className="stats-module__stat-label">{label}</span>
    </div>
  </div>
);

// Registramos los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// El componente Statistics
const Statistics = () => {
  // تعريف حالات المكون
  const [activeTab, setActiveTab] = useState('industrial');
  const [chartData, setChartData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [chartReady, setChartReady] = useState(false);
  const [highlightedYear, setHighlightedYear] = useState(null);
  const [tabIndicatorStyle, setTabIndicatorStyle] = useState({});
  const [zoomedChart, setZoomedChart] = useState(null);
  
  // تعريف المراجع
  const statsContentRef = useRef(null);
  const tabsRef = useRef(null);
  const chartRefs = useRef({
    line: null,
    bar: null
  });
  
  // التحقق من وضع السمة (داكن/فاتح)
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(isDark);
    };
    
    checkDarkMode(); // التحقق الأولي
    
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'data-theme') {
          checkDarkMode();
          break;
        }
      }
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    return () => observer.disconnect();
  }, []);
  
  // ضبط مؤشر التبويب النشط
  useEffect(() => {
    const updateTabIndicator = () => {
      if (!tabsRef.current) return;
      
      const tabs = tabsRef.current.querySelectorAll('.stats-module__tab');
      const activeTabElement = tabsRef.current.querySelector('.stats-module__tab.active');
      
      if (activeTabElement) {
        const tabRect = activeTabElement.getBoundingClientRect();
        const tabsRect = tabsRef.current.getBoundingClientRect();
        const offsetLeft = tabRect.left - tabsRect.left;
        
        setTabIndicatorStyle({
          width: `${tabRect.width}px`,
          transform: `translateX(${offsetLeft}px)`
        });
      }
    };
    
    updateTabIndicator();
    window.addEventListener('resize', updateTabIndicator);
    return () => window.removeEventListener('resize', updateTabIndicator);
  }, [activeTab]);
  
  // تحضير بيانات الرسم البياني
  const prepareChartData = useCallback((tabKey) => {
    if (!statsData[tabKey] || !statsData[tabKey].chartData) return null;
    
    const data = statsData[tabKey].chartData;
    const years = data.years || [];
    
    // ألوان مخصصة لكل نوع من الرسوم البيانية
    const tabColors = {
      industrial: {
        primary: isDarkMode ? 'rgba(86, 95, 88, 0.8)' : 'rgba(86, 95, 88, 0.8)',
        secondary: isDarkMode ? 'rgba(86, 95, 88, 0.15)' : 'rgba(86, 95, 88, 0.1)',
        highlight: isDarkMode ? 'rgba(86, 95, 88, 1)' : 'rgba(86, 95, 88, 1)',
        bar: {
          background: 'rgba(86, 95, 88, 0.7)',
          border: 'rgba(86, 95, 88, 1)',
          hover: 'rgba(86, 95, 88, 0.9)'
        }
      },
      residential: {
        primary: isDarkMode ? 'rgba(200, 176, 154, 0.8)' : 'rgba(200, 176, 154, 0.8)',
        secondary: isDarkMode ? 'rgba(200, 176, 154, 0.15)' : 'rgba(200, 176, 154, 0.1)',
        highlight: isDarkMode ? 'rgba(200, 176, 154, 1)' : 'rgba(200, 176, 154, 1)',
        bar: {
          background: 'rgba(200, 176, 154, 0.7)',
          border: 'rgba(200, 176, 154, 1)',
          hover: 'rgba(200, 176, 154, 0.9)'
        }
      },
      hotels: {
        primary: isDarkMode ? 'rgba(150, 70, 80, 0.8)' : 'rgba(150, 70, 80, 0.8)',
        secondary: isDarkMode ? 'rgba(150, 70, 80, 0.15)' : 'rgba(150, 70, 80, 0.1)',
        highlight: isDarkMode ? 'rgba(150, 70, 80, 1)' : 'rgba(150, 70, 80, 1)',
        bar: {
          background: 'rgba(150, 70, 80, 0.7)',
          border: 'rgba(150, 70, 80, 1)',
          hover: 'rgba(150, 70, 80, 0.9)'
        }
      }
    };
    
    const colors = tabColors[tabKey];
    
    // تحضير بيانات الرسم الخطي
    const lineChartData = {
      labels: years,
      datasets: [
        {
          label: 'نسبة الإشغال (%)',
          data: data.usage || [],
          borderColor: colors.primary,
          backgroundColor: colors.secondary,
          fill: true,
          tension: 0.4,
          borderWidth: isDarkMode ? 3 : 2,
          pointBackgroundColor: colors.highlight,
          pointRadius: 4,
          pointHoverRadius: 6,
          segment: {
            borderColor: (ctx) => {
              if (!ctx.p0.parsed || !ctx.p1.parsed) return colors.primary;
              
              const prev = ctx.p0.parsed.y;
              const curr = ctx.p1.parsed.y;
              
              if (tabKey === 'hotels') {
                return curr < prev 
                  ? isDarkMode ? 'rgba(255, 99, 132, 0.8)' : 'rgba(203, 80, 106, 0.8)'
                  : colors.primary;
              } else {
                return curr > prev 
                  ? isDarkMode ? 'rgba(75, 192, 192, 0.8)' : 'rgba(55, 162, 162, 0.8)'
                  : colors.primary;
              }
            }
          }
        }
      ]
    };
    
    // تحضير بيانات الرسم الشريطي
    const barLabels = {
      'industrial': 'المنشآت المستغلة',
      'residential': 'الوحدات السكنية',
      'hotels': 'الفنادق المستغلة'
    };
    
    const barChartData = {
      labels: years,
      datasets: [
        {
          label: barLabels[tabKey] || 'الوحدات المستغلة',
          data: data.land || [],
          backgroundColor: colors.bar.background,
          borderColor: colors.bar.border,
          borderWidth: 1,
          borderRadius: 6,
          hoverBackgroundColor: colors.bar.hover,
          barThickness: tabKey === 'industrial' ? 18 : 22
        }
      ]
    };
    
    return {
      line: lineChartData,
      bar: barChartData
    };
  }, [isDarkMode]);
  
  // تحسين تحميل وعرض الرسوم البيانية
  useEffect(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setChartReady(false);
    
    const prepareChartsWithDelay = async () => {
      try {
        // تحضير البيانات للرسوم البيانية
        const newChartData = prepareChartData(activeTab);
        
        // التأكد من أن البيانات جاهزة قبل عرضها
        if (!newChartData) {
          console.error('فشل تحميل بيانات الرسوم البيانية لـ', activeTab);
          setChartData(null);
          setChartReady(false);
          setIsAnimating(false);
          return;
        }
        
        // تحديث بيانات الرسم البياني
        setChartData(newChartData);
        
        // تأخير ظهور الرسم البياني للحصول على تأثير انتقالي أفضل
        setTimeout(() => {
          setChartReady(true);
          setIsAnimating(false);
        }, 300);
      } catch (error) {
        console.error('خطأ في تحضير الرسوم البيانية:', error);
        setChartData(null);
        setChartReady(false);
        setIsAnimating(false);
      }
    };
    
    // تأخير قصير قبل تحضير البيانات للسماح بإتمام التأثيرات الانتقالية
    const timer = setTimeout(() => {
      prepareChartsWithDelay();
    }, 400);
    
    return () => clearTimeout(timer);
  }, [activeTab, prepareChartData, isAnimating]);
  
  // التعامل مع تغيير التبويب
  const handleTabChange = (tab) => {
    if (tab === activeTab || isAnimating) return;
    
    setIsAnimating(true);
    
    // حفظ الحالة القديمة للرجوع إليها إذا حدثت مشكلة
    const previousTab = activeTab;
    
    // تأثير تلاشي محتوى التبويب الحالي
    if (statsContentRef.current) {
      statsContentRef.current.classList.add('stats-module__content--fadeout');
      statsContentRef.current.style.opacity = '0';
      statsContentRef.current.style.transform = 'translateY(20px)';
    }
    
    // تغيير التبويب بعد انتهاء التأثير
    setTimeout(() => {
      setActiveTab(tab);
      
      // تأخير قصير قبل ظهور المحتوى الجديد
      setTimeout(() => {
        if (statsContentRef.current) {
          statsContentRef.current.style.opacity = '1';
          statsContentRef.current.style.transform = 'translateY(0)';
          statsContentRef.current.classList.remove('stats-module__content--fadeout');
        }
        
        // تأخير إلغاء حالة التحريك
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }, 50);
    }, 300);
  };
  
  // تنزيل الرسم البياني كصورة
  const downloadChartImage = (chartType) => {
    const chart = chartRefs.current[chartType];
    if (!chart) return;
    
    const link = document.createElement('a');
    link.download = `${activeTab}-${chartType}-chart.png`;
    link.href = chart.toBase64Image('image/png', 1.0);
    link.click();
  };
  
  // تكبير الرسم البياني
  const handleZoomChart = (chartType) => {
    setZoomedChart(chartType);
    document.body.style.overflow = 'hidden';
  };
  
  // إغلاق الرسم البياني المكبر
  const closeZoomedChart = () => {
    setZoomedChart(null);
    document.body.style.overflow = '';
  };
  
  // التعامل مع النقر على نقاط البيانات
  const handleChartClick = (event, chartType) => {
    const chart = chartRefs.current[chartType];
    if (!chart) return;
    
    // تم تبسيط هذه الوظيفة لتجنب استخدام getElementsAtEvent
    // سيتم تمييز السنة من خلال دالة أخرى
    setHighlightedYear(null);
  };
  
  // إقران مراجع الرسوم البيانية
  const setChartRef = (ref, chartType) => {
    if (ref) {
      chartRefs.current[chartType] = ref;
    }
  };
  
  // استخراج البيانات المتعلقة بالتبويب النشط
  const stats = useMemo(() => {
    return statsData[activeTab] || {};
  }, [activeTab]);
  
  // تحديد اتجاه النمو استنادًا إلى البيانات
  const getTrend = (tabData) => {
    if (!tabData?.chartData?.usage) return null;
    
    const usageData = tabData.chartData.usage;
    if (usageData.length < 2) return null;
    
    const latest = usageData[usageData.length - 1];
    const previous = usageData[usageData.length - 2];
    const diff = latest - previous;
    
    return {
      direction: diff >= 0 ? 'positive' : 'negative',
      percentage: Math.abs(Math.round(diff))
    };
  };
  
  // استخراج اتجاه النمو للتبويب الحالي
  const currentTrend = useMemo(() => getTrend(statsData[activeTab]), [activeTab]);
  
  // تحسين تنسيق وعرض المكونات
  const renderTabContent = () => {
    if (!statsData[activeTab]) {
      return (
        <div className="stats-module__error">
          <span style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</span>
          <p>البيانات غير متوفرة</p>
        </div>
      );
    }
    
    return (
      <div 
        className="stats-module__content" 
        ref={statsContentRef}
        style={{
          opacity: 1,
          transform: 'translateY(0)',
          transition: 'opacity 0.4s ease-out, transform 0.4s ease-out'
        }}
      >
        {/* بطاقات الإحصاءات */}
        <div className="stats-module__stats-grid">
          {/* المنشآت الصناعية */}
          {activeTab === 'industrial' && (
            <>
              <SimpleStatCard
                value={stats.total}
                label="عدد المنشآت"
                index={0}
              />
              <SimpleStatCard
                value={stats.workers}
                label="عدد العمال"
                index={1}
              />
              <SimpleStatCard
                value={stats.warehouses}
                label="المستودعات"
                index={2}
              />
              <SimpleStatCard
                value={stats.occupancy}
                label="نسبة الإشغال"
                index={3}
                isPercentage
              />
            </>
          )}
          
          {/* السكن النموذجي */}
          {activeTab === 'residential' && (
            <>
              <SimpleStatCard
                value={stats.complexes}
                label="المجمعات السكنية"
                index={0}
              />
              <SimpleStatCard
                value={stats.capacity}
                label="السعة السكنية"
                index={1}
              />
              <SimpleStatCard
                value={stats.demand}
                label="مستوى الطلب"
                index={2}
              />
              <SimpleStatCard
                value={stats.occupancy}
                label="نسبة الإشغال"
                index={3}
                isPercentage
              />
            </>
          )}
          
          {/* الفنادق */}
          {activeTab === 'hotels' && (
            <>
              <SimpleStatCard
                value={stats.total}
                label="عدد الفنادق"
                index={0}
              />
              <SimpleStatCard
                value={stats.guests}
                label="عدد النزلاء"
                index={1}
              />
              <SimpleStatCard
                value={stats.rooms}
                label="الغرف المتاحة"
                index={2}
              />
              <SimpleStatCard
                value={stats.occupancy}
                label="نسبة الإشغال"
                index={3}
                isPercentage
              />
            </>
          )}
        </div>
        
        {/* محتوى التحليل ملخص */}
        <div className="stats-module__analysis">
          <h3>التحليل</h3>
          <p>
            {activeTab === 'industrial' && 'تظهر البيانات استقرارًا في معدلات الإشغال للمنشآت الصناعية مع وجود طلب مستمر على المساحات الصناعية في المنطقة.'}
            {activeTab === 'residential' && 'يوجد طلب متزايد على المجمعات السكنية مع ارتفاع في معدلات الإشغال خلال السنوات الأخيرة، مما يشير إلى فرصة استثمارية واعدة.'}
            {activeTab === 'hotels' && 'تعاني الفنادق من انخفاض في معدلات الإشغال مقارنة بالقطاعات الأخرى، مما يدعم توجه تحويل الرخص من فندقي إلى سكني.'}
          </p>
          
          {/* إضافة مؤشر الاتجاه مع أنيميشن متحرك */}
          {currentTrend && (
            <div className={`stats-module__trend ${currentTrend.direction}`} style={{
              animation: 'fadeInUp 0.5s forwards',
              animationDelay: '0.6s',
              opacity: 0
            }}>
              <span className="stats-module__trend-value">
                {currentTrend.direction === 'positive' ? '↗' : '↘'} {currentTrend.percentage}%
              </span>
              <span className="stats-module__trend-label">
                {currentTrend.direction === 'positive' ? 'نمو سنوي' : 'انخفاض سنوي'}
              </span>
            </div>
          )}
        </div>
        
        {/* الرسوم البيانية */}
        <div className="stats-module__charts">
          <div className="stats-module__chart-container">
            <h3 className="stats-module__chart-title">نسبة الإشغال عبر السنوات</h3>
            <div className="stats-module__chart-wrapper">
              {chartReady && chartData ? (
                <Line 
                  ref={(ref) => setChartRef(ref, 'line')}
                  data={chartData.line} 
                  options={{
                    ...getChartOptions(isDarkMode, 'line'),
                    animation: {
                      duration: 800,
                      easing: 'easeOutQuart'
                    },
                    transitions: {
                      active: {
                        animation: {
                          duration: 400
                        }
                      }
                    }
                  }}
                  onClick={(event) => handleChartClick(event, 'line')}
                />
              ) : (
                <div className="stats-module__chart-loading">
                  <div className="stats-module__loading-indicator"></div>
                  <span>جارٍ التحميل...</span>
                </div>
              )}
            </div>
            <SimpleChartActions 
              chartType="line" 
              handleZoomChart={handleZoomChart} 
              downloadChartImage={downloadChartImage} 
            />
          </div>
          
          <div className="stats-module__chart-container">
            <h3 className="stats-module__chart-title">
              {activeTab === 'industrial' 
                ? 'المنشآت المستغلة'
                : activeTab === 'residential'
                  ? 'الوحدات السكنية'
                  : 'الفنادق المستغلة'}
            </h3>
            <div className="stats-module__chart-wrapper">
              {chartReady && chartData ? (
                <Bar 
                  ref={(ref) => setChartRef(ref, 'bar')}
                  data={chartData.bar} 
                  options={{
                    ...getChartOptions(isDarkMode, 'bar'),
                    animation: {
                      duration: 1000,
                      delay: 200, // تأخير ظهور الرسم الثاني لإنشاء تأثير متسلسل
                      easing: 'easeOutQuart'
                    }
                  }}
                  onClick={(event) => handleChartClick(event, 'bar')}
                />
              ) : (
                <div className="stats-module__chart-loading">
                  <div className="stats-module__loading-indicator"></div>
                  <span>جارٍ التحميل...</span>
                </div>
              )}
            </div>
            <SimpleChartActions
              chartType="bar" 
              handleZoomChart={handleZoomChart} 
              downloadChartImage={downloadChartImage} 
            />
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <section id="statistics" className="statistics-section section">
      <div className="container">
        <h2 className="section-title">الإحصاءات والتحليلات</h2>
        <p className="section-subtitle">مؤشرات وتحليلات تفصيلية لمساعدتك في اتخاذ قرار الاستثمار</p>
        
        <div className="stats-module">
          <div className="stats-module__tabs" ref={tabsRef}>
            <button 
              className={`stats-module__tab ${activeTab === 'industrial' ? 'active' : ''}`} 
              onClick={() => handleTabChange('industrial')}
            >
              <span>🏭</span>
              <span>المنشآت الصناعية</span>
            </button>
            <button 
              className={`stats-module__tab ${activeTab === 'residential' ? 'active' : ''}`} 
              onClick={() => handleTabChange('residential')}
            >
              <span>🏠</span>
              <span>الوحدات السكنية</span>
            </button>
            <button 
              className={`stats-module__tab ${activeTab === 'hotels' ? 'active' : ''}`} 
              onClick={() => handleTabChange('hotels')}
            >
              <span>🏨</span>
              <span>الفنادق</span>
            </button>
            <div className="stats-module__tab-indicator" style={tabIndicatorStyle}></div>
          </div>
          
          {renderTabContent()}
          
          {/* Modal de zoom simplificado - Corregido */}
          {zoomedChart && chartData && (
            <div className="stats-module__zoom-overlay" onClick={closeZoomedChart}>
              <div className="stats-module__zoom-content" onClick={(e) => e.stopPropagation()}>
                <button className="stats-module__zoom-close" onClick={closeZoomedChart}>✖</button>
                <h3>
                  {zoomedChart === 'line' ? 'نسبة الإشغال عبر السنوات' : 
                   activeTab === 'industrial' ? 'المنشآت المستغلة' :
                   activeTab === 'residential' ? 'الوحدات السكنية' :
                   'الفنادق المستغلة'}
                </h3>
                <div className="stats-module__zoom-chart">
                  {zoomedChart === 'line' ? (
                    <Line 
                      data={chartData.line} 
                      options={getChartOptions(isDarkMode, 'line')}
                    />
                  ) : (
                    <Bar 
                      data={chartData.bar} 
                      options={getChartOptions(isDarkMode, 'bar')}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
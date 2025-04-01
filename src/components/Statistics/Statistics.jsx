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
import { FaBuilding, FaHome, FaHotel, FaPercentage, FaUsers, FaChartLine, FaInfoCircle } from 'react-icons/fa';
import './StatisticsModule.css';
import statsData from '../../assets/statistics.json';
import { getChartOptions } from './ChartConfig';
import { formatNumber } from './StatisticsUtils';
import ChartActions from './ChartActions';
import ZoomedChart from './ZoomedChart';
import StatCard from './StatCard';
import ExamplesSection from './ExamplesSection';
import statsDataDetailed from '../../assets/statistics-detailed.json';

// Registramos los componentes de Chart.jsالكود يتم تنفيذه قبل عرض أي رسوم بيانية
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
    // نقوم بالتحميل فقط عند التشغيل الأولي أو عند إعادة الدخول للصفحة
    // وليس عند التبديل بين التبويبات (لأننا نعالجها في handleTabChange)
    if (isAnimating && chartData) return;
    
    setIsAnimating(true);
    setChartReady(false);
    
    console.log("Preparing chart data for tab:", activeTab);
    
    const prepareInitialCharts = async () => {
      try {
        // تأكد من وجود بيانات للتبويب المختار
        if (!statsData[activeTab] || !statsData[activeTab].chartData) {
          console.error('بيانات الرسوم البيانية غير متوفرة للتبويب:', activeTab);
          setChartData(null);
          setChartReady(true);
          setIsAnimating(false);
          return;
        }
        
        // تحضير البيانات للرسوم البيانية
        const newChartData = prepareChartData(activeTab);
        console.log("Chart data prepared:", !!newChartData);
        setChartData(newChartData);
        
        // إظهار الرسم البياني بعد تحضير البيانات
        setTimeout(() => {
          setChartReady(true);
          setIsAnimating(false);
        }, 300);
      } catch (error) {
        console.error('خطأ في تحضير الرسوم البيانية:', error);
        setChartData(null);
        setChartReady(true);
        setIsAnimating(false);
      }
    };
    
    // تنفيذ مباشر بدون تأخير للتحميل الأولي
    prepareInitialCharts();
    
    return () => {}; // لا نحتاج إلى تنظيف هنا
  }, [/* فقط عند التركيب الأولي */]);
  
  // التعامل مع تغيير التبويب
  const handleTabChange = (tab) => {
    if (tab === activeTab || isAnimating) return;
    
    // تعيين حالة التحريك
    setIsAnimating(true);
    
    // إخفاء المحتوى الحالي
    if (statsContentRef.current) {
      statsContentRef.current.style.opacity = '0';
      statsContentRef.current.style.transform = 'translateY(20px)';
    }
    
    // تغيير التبويب بعد فترة قصيرة
    setTimeout(() => {
      // تغيير التبويب النشط
      setActiveTab(tab);
      
      // تأكيد أننا أعدنا تعيين حالة جاهزية الرسم البياني
      setChartReady(false);
      
      // تحضير البيانات فوراً بعد تغيير التبويب (مهم)
      if (statsData[tab]?.chartData) {
        const newChartData = prepareChartData(tab);
        setChartData(newChartData);
      }
      
      // إعادة عرض المحتوى 
      setTimeout(() => {
        if (statsContentRef.current) {
          statsContentRef.current.style.opacity = '1';
          statsContentRef.current.style.transform = 'translateY(0)';
          
          // تعيين الرسم البياني كجاهز بعد انتهاء انتقال المحتوى
          setTimeout(() => {
            setChartReady(true);
            setIsAnimating(false);
          }, 150);
        } else {
          setChartReady(true);
          setIsAnimating(false);
        }
      }, 50);
    }, 250);
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
    setHighlightedYear(null);
  };
  
  // تحسين إقران مراجع الرسوم البيانية لتصحيح المشكلة
  const setChartRef = (ref, chartType) => {
    if (ref) {
      chartRefs.current[chartType] = ref;
      console.log(`Chart reference set for: ${chartType}`);
    }
  };
  
  // استخراج البيانات المتعلقة بالتبويب النشط
  const stats = useMemo(() => {
    return statsData[activeTab] || {};
  }, [activeTab]);
  
  // استيراد الأمثلة من ملف البيانات المفصلة
  const examples = useMemo(() => {
    if (!statsDataDetailed[activeTab] || !statsDataDetailed[activeTab].examples) {
      return [];
    }
    return statsDataDetailed[activeTab].examples;
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
  
  // تحقق من عرض الرسوم البيانية عندما تكون جاهزة
  useEffect(() => {
    if (chartReady && chartData) {
      console.log("Charts should be visible now. Data and ready state confirmed.");
    }
  }, [chartReady, chartData]);
  
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
              <StatCard 
                value={stats.total}
                label="عدد المنشآت"
                index={0}
              />
              <StatCard 
                value={stats.workers}
                label="عدد العمال"
                index={1}
              />
              <StatCard 
                value={stats.warehouses}
                label="المستودعات"
                index={2}
              />
              <StatCard 
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
              <StatCard 
                value={stats.complexes}
                label="المجمعات السكنية"
                index={0}
              />
              <StatCard 
                value={stats.capacity}
                label="السعة السكنية"
                index={1}
              />
              <StatCard 
                value={stats.demand}
                label="مستوى الطلب"
                index={2}
              />
              <StatCard 
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
              <StatCard 
                value={stats.total}
                label="عدد الفنادق"
                index={0}
              />
              <StatCard 
                value={stats.guests}
                label="عدد النزلاء"
                index={1}
              />
              <StatCard 
                value={stats.rooms}
                label="الغرف المتاحة"
                index={2}
              />
              <StatCard 
                value={stats.occupancy}
                label="نسبة الإشغال"
                index={3}
                isPercentage
              />
            </>
          )}
        </div>
        <div className="stats-module__analysis">
          <h3>التحليل</h3>
          <p>
            {activeTab === 'industrial' && 'تظهر البيانات استقرارًا في معدلات الإشغال للمنشآت الصناعية مع وجود طلب مستمر على المساحات الصناعية في المنطقة.'}
            {activeTab === 'residential' && 'يوجد طلب متزايد على المجمعات السكنية مع ارتفاع في معدلات الإشغال خلال السنوات الأخيرة، مما يشير إلى فرصة استثمارية واعدة.'}
            {activeTab === 'hotels' && 'تعاني الفنادق من انخفاض في معدلات الإشغال مقارنة بالقطاعات الأخرى، مما يدعم توجه تحويل الرخص من فندقي إلى سكني.'}
          </p>
          {/* إضافة مؤشر الاتجاه مع أنيميشن متحرك */}
          {currentTrend && (
            <div className={`stats-module__trend stats-module__trend--${currentTrend.direction}`} style={{
              opacity: 0,
              animation: 'fadeIn 0.5s forwards',
              animationDelay: '0.6s',
            }}>
              <span className="stats-module__trend-label">
                {currentTrend.direction === 'positive' ? 'نمو سنوي' : 'انخفاض سنوي'}
              </span>
              <span className="stats-module__trend-value">
                {currentTrend.direction === 'positive' ? '↗' : '↘'} {currentTrend.percentage}%
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
            <ChartActions 
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
            <ChartActions 
              chartType="bar" 
              handleZoomChart={handleZoomChart} 
              downloadChartImage={downloadChartImage} 
            />
          </div>
        </div>
        {/* إضافة قسم الأمثلة */}
        <ExamplesSection activeTab={activeTab} examples={examples} />
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
              type="button"
            >
              <FaBuilding />
              <span>المنشآت الصناعية</span>
            </button>
            <button 
              className={`stats-module__tab ${activeTab === 'residential' ? 'active' : ''}`} 
              onClick={() => handleTabChange('residential')}
              type="button">
                 <FaHome />
              <span>الوحدات السكنية</span>
          
            </button>
            
             
            <button 
              className={`stats-module__tab ${activeTab === 'hotels' ? 'active' : ''}`} 
              onClick={() => handleTabChange('hotels')}
              type="button"
            >
              <FaHotel />
              <span>الفنادق</span>
            </button>
            <div className="stats-module__tab-indicator" style={tabIndicatorStyle}></div>
          </div>
          {renderTabContent()}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
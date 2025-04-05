import React, { useState, useEffect, useRef } from 'react';
import './StatisticsSection.css';
import StatHighlight from '../StatHighlight/StatHighlight';
import { Chart } from 'react-chartjs-2';
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
  Filler,
  ArcElement
} from 'chart.js';

// تسجيل مكونات Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const StatisticsSection = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const [chartVisible, setChartVisible] = useState(false);
  const [compareVisible, setCompareVisible] = useState(false);
  const [regionIndex, setRegionIndex] = useState(0);
  
  const sectionRef = useRef();
  const statsRef = useRef();
  const chartRef = useRef();
  const compareRef = useRef();
  const regionRefs = useRef([]);

  // بيانات إحصائيات المشاريع الصناعية
  const industrialStats = [
    { 
      icon: "fas fa-industry", 
      value: 4500, 
      description: "منشأة صناعية في منطقة الرياض" 
    },
    { 
      icon: "fas fa-hard-hat", 
      value: 450, 
      suffix: "ألف", 
      description: "عامل في القطاع الصناعي" 
    },
    { 
      icon: "fas fa-building", 
      value: 1220, 
      description: "مصنع في المدن الصناعية الثلاث" 
    },
    { 
      icon: "fas fa-bed", 
      value: 85, 
      suffix: "ألف", 
      description: "فجوة في السكن الجماعي للعمال" 
    }
  ];

  // بيانات المقارنة بين السكن الفندقي والسكن الجماعي
  const comparisonData = {
    past: [
      { label: "نسبة الإشغال", value: 35, max: 100 },
      { label: "العائد الاستثماري السنوي", value: 8.5, max: 20 },
      { label: "تكاليف التشغيل", value: 65, max: 100 }
    ],
    future: [
      { label: "نسبة الإشغال", value: 95, max: 100 },
      { label: "العائد الاستثماري السنوي", value: 18, max: 20 },
      { label: "تكاليف التشغيل", value: 35, max: 100 }
    ]
  };

  // بيانات المناطق الصناعية
  const regionData = [
    {
      name: "المدينة الصناعية الأولى",
      value: 66,
      year: 1973,
      icon: "fas fa-industry",
      workers: 2500,
      occupancy: 97
    },
    {
      name: "المدينة الصناعية الثانية",
      value: 1117,
      year: 1976,
      icon: "fas fa-industry",
      workers: 58000,
      occupancy: 94
    },
    {
      name: "المدينة الصناعية الثالثة",
      value: 37,
      year: 2010,
      icon: "fas fa-industry",
      workers: 4200,
      occupancy: 98
    },
    {
      name: "مدن صناعية أخرى",
      value: 3280,
      icon: "fas fa-map-marker-alt",
      workers: 385000,
      occupancy: 92
    }
  ];

  // بيانات الرسم البياني - مقارنة معدل الإشغال
  const occupancyChartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'السكن الجماعي للعمال',
        data: [92, 94, 95, 95, 96, 97],
        borderColor: '#65A30D',
        backgroundColor: 'rgba(77, 124, 15, 0.2)',
        fill: true,
        tension: 0.4,
        borderWidth: 3
      },
      {
        label: 'الفنادق في المناطق الصناعية',
        data: [42, 38, 35, 33, 36, 34],
        borderColor: '#E35A45',
        backgroundColor: 'rgba(227, 90, 69, 0.2)',
        fill: true,
        tension: 0.4,
        borderWidth: 3
      }
    ]
  };

  // إعدادات الرسم البياني
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'center',
        labels: {
          font: {
            size: 12,
            family: "'Tajawal', 'Arial', sans-serif"
          },
          color: '#555',
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        bodyFont: {
          family: "'Tajawal', 'Arial', sans-serif"
        },
        titleFont: {
          family: "'Tajawal', 'Arial', sans-serif"
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "'Tajawal', 'Arial', sans-serif"
          }
        },
        grid: {
          drawBorder: false
        }
      },
      x: {
        ticks: {
          font: {
            family: "'Tajawal', 'Arial', sans-serif"
          }
        },
        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  };

  // مراقبة ظهور القسم في الشاشة
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setTimeout(() => setStatsVisible(true), 300);
        setTimeout(() => setChartVisible(true), 800);
        setTimeout(() => setCompareVisible(true), 1300);
        regionData.forEach((_, index) => {
          setTimeout(() => {
            setRegionIndex(prev => Math.max(prev, index + 1));
          }, 1800 + (index * 200));
        });
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [regionData.length]);

  return (
    <section id="statistics" className="statistics-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">تحليل الوضع الحالي</span>
          <h2 className="section-title">الإحصائيات والمؤشرات الرئيسية</h2>
          <p className="section-description">
            إحصائيات تفصيلية تبين واقع القطاع الصناعي في منطقة الرياض وفجوة السكن الجماعي للعمال، وأثر تحويل المباني الفندقية إلى سكن للعمال.
          </p>
        </div>

        {/* صف الإحصائيات الرئيسية باستخدام StatHighlight */}
        <div className="stats-grid">
          {industrialStats.map((stat, index) => (
            <StatHighlight
              key={index}
              value={stat.value.toString()}
              suffix={stat.suffix || ""}
              label={stat.description}
              icon={stat.icon}
              theme={index % 2 === 0 ? "primary" : "secondary"}
              animationDelay={300 + (index * 200)}
              size="large"
            />
          ))}
        </div>

        {/* رسم بياني يوضح مقارنة معدلات الإشغال */}
        <div className={`chart-container ${chartVisible ? 'visible' : ''}`} ref={chartRef}>
          <div className="chart-header">
            <h3 className="chart-title">مقارنة معدلات الإشغال (2023)</h3>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#65A30D' }}></span>
                <span>السكن الجماعي للعمال</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#E35A45' }}></span>
                <span>الفنادق في المناطق الصناعية</span>
              </div>
            </div>
          </div>
          <div className="chart">
            <Chart type="line" data={occupancyChartData} options={chartOptions} />
          </div>
        </div>

        {/* قسم المقارنة بين الفنادق والسكن الجماعي */}
        <div className={`compare-section ${compareVisible ? 'visible' : ''}`} ref={compareRef}>
          <div className="compare-card past">
            <div className="compare-header">
              <h3>المباني الفندقية</h3>
            </div>
            <div className="compare-body">
              {comparisonData.past.map((item, index) => (
                <div className="compare-stat" key={index}>
                  <div className="compare-stat-label">{item.label}</div>
                  <div className="compare-stat-value">{item.value}{index === 1 ? '%' : ''}</div>
                  <div className="compare-progress">
                    <div 
                      className="compare-progress-bar" 
                      style={{ width: compareVisible ? `${(item.value / item.max) * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="compare-card future">
            <div className="compare-header">
              <h3>السكن الجماعي للعمال</h3>
            </div>
            <div className="compare-body">
              {comparisonData.future.map((item, index) => (
                <div className="compare-stat" key={index}>
                  <div className="compare-stat-label">{item.label}</div>
                  <div className="compare-stat-value">{item.value}{index === 1 ? '%' : ''}</div>
                  <div className="compare-progress">
                    <div 
                      className="compare-progress-bar" 
                      style={{ width: compareVisible ? `${(item.value / item.max) * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* نظرة على المدن الصناعية في منطقة الرياض */}
        <div className="regional-distribution">
          <h3>المدن الصناعية في منطقة الرياض</h3>
          <div className="region-grid">
            {regionData.map((region, index) => (
              <div 
                className={`region-card ${index < regionIndex ? 'animated' : ''}`} 
                key={index}
                ref={el => regionRefs.current[index] = el}
              >
                <div className="region-icon">
                  <i className={region.icon}></i>
                </div>
                <div className="region-name">{region.name}</div>
                <div className="region-value">{region.value}</div>
                
                <div className="region-stats">
                  {region.year && (
                    <div className="region-stat">
                      <div className="stat-icon"><i className="fas fa-calendar-alt"></i></div>
                      <div className="stat-text">تأسست عام {region.year}م</div>
                    </div>
                  )}
                  <div className="region-stat">
                    <div className="stat-icon"><i className="fas fa-user-hard-hat"></i></div>
                    <div className="stat-text">~{region.workers.toLocaleString('ar-SA')} عامل</div>
                  </div>
                  <div className="region-stat">
                    <div className="stat-icon"><i className="fas fa-percentage"></i></div>
                    <div className="stat-text">معدل الإشغال {region.occupancy}%</div>
                  </div>
                </div>
                
                <div className="region-bar" style={{ 
                  backgroundColor: 'rgba(200, 176, 154, 0.2)',
                  scaleX: index < regionIndex ? 1 : 0
                }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* رؤى وتحليلات البيانات */}
        <div className="data-insights">
          <div className={`insight-card ${statsVisible ? 'visible' : ''}`}>
            <div className="insight-header">
              <div className="insight-icon">
                <i className="fas fa-chart-pie"></i>
              </div>
              <h4 className="insight-title">الفجوة السكنية للعمال</h4>
            </div>
            <div className="insight-content">
              تشير الإحصاءات إلى وجود فجوة كبيرة تقدر بـ <strong>85,000 سرير</strong> في السكن الجماعي للعمال في المناطق الصناعية بالرياض. تحويل الرخص من فندقي إلى سكن جماعي يمكن أن يساهم بشكل كبير في سد هذه الفجوة وتلبية الطلب المتزايد.
            </div>
          </div>
          
          <div className={`insight-card ${statsVisible ? 'visible' : ''}`}>
            <div className="insight-header">
              <div className="insight-icon">
                <i className="fas fa-percentage"></i>
              </div>
              <h4 className="insight-title">الفرق في معدل الإشغال</h4>
            </div>
            <div className="insight-content">
              يصل الفرق في معدل الإشغال بين الفنادق والسكن الجماعي في المناطق الصناعية إلى <strong>60%</strong>، حيث أن معدل إشغال السكن الجماعي للعمال يتجاوز <strong>95%</strong> بينما لا تتعدى نسبة إشغال الفنادق <strong>35%</strong> في هذه المناطق.
            </div>
          </div>
          
          <div className={`insight-card ${statsVisible ? 'visible' : ''}`}>
            <div className="insight-header">
              <div className="insight-icon">
                <i className="fas fa-hand-holding-usd"></i>
              </div>
              <h4 className="insight-title">العائد الاستثماري</h4>
            </div>
            <div className="insight-content">
              يوفر تحويل الرخص من فندقي إلى سكن جماعي عائداً استثمارياً أعلى بنسبة <strong>9.5%</strong> في المتوسط، مع انخفاض في تكاليف التشغيل بنسبة <strong>30%</strong> وفترة استرداد رأس المال أقصر بـ <strong>4 سنوات</strong>.
            </div>
          </div>
        </div>

        {/* دعوة للعمل */}
        <div className="cta-container">
          <a href="#contact" className="cta-button">
            <i className="fas fa-arrow-left ml-2"></i>
            احصل على دراسة جدوى مفصلة
          </a>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;

import React, { useState, useEffect, useRef } from 'react';
import './StatisticsSection.css';
import StatHighlight from '../StatHighlight/StatHighlight';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  // إزالة PieElement لأنه غير موجود في مكتبة Chart.js
  ArcElement,
  LineController,
  BarController, 
  PieController,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

// تسجيل مكونات Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement, // هذا هو المكون المستخدم لمخططات الدائرة (Pie) و (Doughnut)
  LineController,
  BarController,
  PieController,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StatisticsSection = () => {
  // حالة إظهار العناصر
  const [statsVisible, setStatsVisible] = useState(false);
  const [chartVisible, setChartVisible] = useState(false);
  const [compareVisible, setCompareVisible] = useState(false);
  const [regionIndex, setRegionIndex] = useState(0);
  const [activeInsight, setActiveInsight] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState({ content: '', position: { x: 0, y: 0 } });
  
  // مراجع للعناصر
  const sectionRef = useRef();
  const statsRef = useRef();
  const chartRef = useRef();
  const compareRef = useRef();
  const regionRefs = useRef([]);
  const tooltipRef = useRef(null);

// تعديل بيانات إحصائيات المشاريع الصناعية
const industrialStats = [
  { 
    icon: "fas fa-industry", 
    value: 4500, 
    description: "منشأة صناعية في منطقة الرياض",
    additionalInfo: "وفقًا لإحصاءات الهيئة العامة للإحصاء، بلغ عدد المنشآت الصناعية في منطقة الرياض 4,500 منشأة صناعية متنوعة"
  },
  { 
    icon: "fas fa-hard-hat", 
    value: 3500,
    description: "عامل في القطاع الصناعي",
    additionalInfo: "يعمل في القطاع الصناعي في منطقة الرياض 3,500 عامل وموظف في مختلف التخصصات والمجالات"
  },
  { 
    icon: "fas fa-building", 
    value: 1220, 
    description: "مصنع في المدن الصناعية الثلاث",
    additionalInfo: "تضم المدن الصناعية الثلاث في منطقة الرياض (الأولى والثانية والثالثة) 1,220 مصنعًا متنوعًا"
  },
  { 
    icon: "fas fa-bed", 
    value: 85, 
    suffix: "ألف", 
    description: "فجوة في السكن الجماعي للعمال",
    additionalInfo: "هناك نقص كبير في السكن الجماعي للعمال يقدر بنحو 85 ألف سرير، مما يمثل فرصة استثمارية كبيرة"
  }
];

// تعديل بيانات المقارنة بين السكن الفندقي والسكن الجماعي
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
      occupancy: 97,
      additionalInfo: "تأسست المدينة الصناعية الأولى في الرياض عام 1973م وتعتبر من أقدم المدن الصناعية في المملكة"
    },
    {
      name: "المدينة الصناعية الثانية",
      value: 1117,
      year: 1976,
      icon: "fas fa-industry",
      workers: 1240, // تعديل لتوافق ملف statistics-detailed.json
      occupancy: 94,
      additionalInfo: "تضم المدينة الصناعية الثانية أكبر عدد من المصانع في منطقة الرياض بإجمالي 1117 مصنعًا"
    },
    {
      name: "المدينة الصناعية الثالثة",
      value: 37,
      year: 2010,
      icon: "fas fa-industry",
      workers: 4200,
      occupancy: 98,
      additionalInfo: "المدينة الصناعية الثالثة هي الأحدث في منطقة الرياض وتتميز بالمصانع ذات التقنية العالية"
    },
    {
      name: "مدن صناعية أخرى",
      value: 3280,
      icon: "fas fa-map-marker-alt",
      workers: 385000,
      occupancy: 92,
      additionalInfo: "تشمل مدينة سدير الصناعية ومدينة الخرج الصناعية وعدة مناطق صناعية أخرى في أنحاء المملكة"
    }
  ];

  // بيانات الرؤى والتحليلات
  const insightsData = [
    {
      id: "housing-gap",
      icon: "fas fa-chart-pie",
      title: "الفجوة السكنية للعمال",
      content: "تشير الإحصاءات إلى وجود فجوة كبيرة تقدر بـ <strong>85,000 سرير</strong> في السكن الجماعي للعمال في المناطق الصناعية بالرياض. تحويل الرخص من فندقي إلى سكن جماعي يمكن أن يساهم بشكل كبير في سد هذه الفجوة وتلبية الطلب المتزايد.",
      chartData: {
        type: "pie",
        labels: ["السكن المتوفر", "الفجوة السكنية"],
        datasets: [
          {
            data: [65, 35],
            backgroundColor: ["#65A30D", "#E35A45"]
          }
        ]
      }
    },
    {
      id: "occupancy-diff",
      icon: "fas fa-percentage",
      title: "الفرق في معدل الإشغال",
      content: "يصل الفرق في معدل الإشغال بين الفنادق والسكن الجماعي في المناطق الصناعية إلى <strong>60%</strong>، حيث أن معدل إشغال السكن الجماعي للعمال يتجاوز <strong>95%</strong> بينما لا تتعدى نسبة إشغال الفنادق <strong>35%</strong> في هذه المناطق.",
      chartData: {
        type: "bar",
        labels: ["السكن الجماعي للعمال", "الفنادق التقليدية"],
        datasets: [
          {
            data: [95, 35],
            backgroundColor: ["#65A30D", "#E35A45"]
          }
        ]
      }
    },
    {
      id: "roi",
      icon: "fas fa-hand-holding-usd",
      title: "العائد الاستثماري",
      content: "يوفر تحويل الرخص من فندقي إلى سكن جماعي عائداً استثمارياً أعلى بنسبة <strong>9.5%</strong> في المتوسط، مع انخفاض في تكاليف التشغيل بنسبة <strong>30%</strong> وفترة استرداد رأس المال أقصر بـ <strong>4 سنوات</strong>.",
      chartData: {
        type: "bar",
        labels: ["السكن الجماعي للعمال", "الفنادق التقليدية"],
        datasets: [
          {
            label: "العائد الاستثماري (%)",
            data: [18, 8.5],
            backgroundColor: ["#65A30D", "#E35A45"]
          }
        ]
      }
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

  // إعدادات الرسم البياني للرؤى
  const insightChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        bodyFont: {
          family: "'Tajawal', 'Arial', sans-serif"
        },
        titleFont: {
          family: "'Tajawal', 'Arial', sans-serif"
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

  // التعامل مع مؤشرات المعلومات الإضافية بتحسين التفاعلية
  const handleInfoHover = (e, content) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipData({
      content,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top - 5 // ضبط المسافة بين التلميح وزر المعلومات
      }
    });
    // تطبيق تأثير نبض على الزر عند التحويم عليه
    e.currentTarget.classList.add('tooltip-active');
    setShowTooltip(true);
  };

  const handleInfoLeave = (e) => {
    setShowTooltip(false);
    // إزالة التأثير عند مغادرة التحويم
    if (e.currentTarget) {
      e.currentTarget.classList.remove('tooltip-active');
    }
  };

  // إظهار وإخفاء تفاصيل الرؤى
  const toggleInsight = (insightId) => {
    setActiveInsight(activeInsight === insightId ? null : insightId);
  };

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

        {/* صف الإحصائيات الرئيسية - محسّن */}
        <div className="stats-grid">
          {industrialStats.map((stat, index) => (
            <div 
              className="stat-box-wrapper" 
              key={index}
              style={{ '--animation-delay': `${300 + (index * 150)}ms` }} // تطبيق تأخير متدرج للظهور
            >
              <StatHighlight
                key={index}
                value={stat.value.toString()}
                suffix={stat.suffix || ""}
                label={stat.description}
                icon={stat.icon}
                theme={index % 2 === 0 ? "primary" : "secondary"}
                animationDelay={450 + (index * 150)} // زيادة قليلة في التأخير لإظهار المحتوى بعد الحاوية
                size="large"
              />
              {stat.additionalInfo && (
                <div 
                  className="info-tooltip-trigger"
                  onMouseEnter={(e) => handleInfoHover(e, stat.additionalInfo)}
                  onMouseLeave={handleInfoLeave}
                  onClick={(e) => handleInfoHover(e, stat.additionalInfo)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleInfoHover(e, stat.additionalInfo);
                    }
                  }}
                  tabIndex="0"
                  role="button"
                  aria-label="عرض المزيد من المعلومات"
                  title="انقر لعرض المزيد من المعلومات"
                >
                  <i className="fas fa-info"></i>
                </div>
              )}
            </div>
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

        <div className="comparison-stats">
          <StatHighlight 
            value="95" 
            suffix="%" 
            label="نسبة إشغال المجمعات السكنية للعمال" 
            icon="fas fa-building"
            theme="success"
            description="تمثل معدل الإشغال المستدام للسكن الجماعي بسبب الطلب المرتفع من العمالة في المناطق الصناعية"
            animationDelay={300}
          />
          
          {/* ...باقي المكونات... */}
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
                    <div className="stat-icon"><i className="fas fa-hard-hat"></i></div>
                    <div className="stat-text">~{region.workers.toLocaleString('ar-SA')} عامل</div>
                  </div>
                  <div className="region-stat">
                    <div className="stat-icon"><i className="fas fa-percentage"></i></div>
                    <div className="stat-text">معدل الإشغال {region.occupancy}%</div>
                  </div>
                </div>
                
                <div className="region-bar" style={{ 
                  backgroundColor: 'rgba(200, 176, 154, 0.2)',
                  transform: index < regionIndex ? 'scaleX(1)' : 'scaleX(0)'
                }}></div>

                {region.additionalInfo && (
                  <div 
                    className="info-tooltip-trigger region-info"
                    onMouseEnter={(e) => handleInfoHover(e, region.additionalInfo)}
                    onMouseLeave={handleInfoLeave}
                    onClick={(e) => handleInfoHover(e, region.additionalInfo)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleInfoHover(e, region.additionalInfo);
                      }
                    }}
                    tabIndex="0"
                    role="button"
                    aria-label="عرض المزيد من المعلومات عن المنطقة"
                    title="انقر لعرض المزيد من المعلومات"
                  >
                    <i className="fas fa-info"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* رؤى وتحليلات البيانات - النسخة المحسنة */}
        <div className="enhanced-data-insights">
          <h3 className="insights-title">رؤى وتحليلات هامة</h3>
          <div className="insights-grid">
            {insightsData.map((insight) => (
              <div 
                key={insight.id} 
                className={`insight-card enhanced ${statsVisible ? 'visible' : ''} ${activeInsight === insight.id ? 'expanded' : ''}`}
                onClick={() => toggleInsight(insight.id)}
              >
                <div className="insight-header">
                  <div className="insight-icon">
                    <i className={insight.icon}></i>
                  </div>
                  <h4 className="insight-title">{insight.title}</h4>
                  <div className="insight-expand">
                    <i className={`fas fa-${activeInsight === insight.id ? 'minus' : 'plus'}`}></i>
                  </div>
                </div>
                <div className="insight-content" dangerouslySetInnerHTML={{ __html: insight.content }}></div>
                {activeInsight === insight.id && insight.chartData && (
                  <div className="insight-chart">
                    <Chart 
                      type={insight.chartData.type} 
                      data={{
                        labels: insight.chartData.labels,
                        datasets: insight.chartData.datasets
                      }} 
                      options={insightChartOptions} 
                      height={200}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* دعوة للعمل */}

      </div>

      {/* Tooltip للمعلومات الإضافية */}
      {showTooltip && (
        <div 
          className="custom-tooltip" 
          ref={tooltipRef}
          style={{
            position: 'fixed',
            top: `${tooltipData.position.y}px`,
            left: `${tooltipData.position.x}px`,
            transform: 'translate(-50%, -100%)'
          }}
          role="tooltip"
          aria-hidden="false"
        >
          <div className="tooltip-content">
            {tooltipData.content}
          </div>
          <div className="tooltip-arrow" aria-hidden="true"></div>
        </div>
      )}
    </section>
  );
};

export default StatisticsSection;

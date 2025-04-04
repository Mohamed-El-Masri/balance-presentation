import React, { useState, useEffect, useRef } from 'react';
import './StatisticsSection.css';
import CountUp from 'react-countup';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// تسجيل مكونات الرسم البياني
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StatisticsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // تنسيق الرسم البياني
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Cairo',
            size: 14
          }
        }
      },
      tooltip: {
        rtl: true,
        titleFont: {
          family: 'Cairo'
        },
        bodyFont: {
          family: 'Cairo'
        },
        callbacks: {
          label: function(context) {
            return `القيمة: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: 'Cairo',
            size: 12
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          font: {
            family: 'Cairo',
            size: 12
          }
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)'
        },
        beginAtZero: true
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 4,
        hoverRadius: 6
      }
    },
    animation: {
      duration: 2000
    }
  };

  // بيانات نمو المصانع
  const factoriesData = {
    labels: ['2016', '2018', '2020', '2022', '2023', '2025 (متوقع)', '2030 (متوقع)', '2035 (متوقع)'],
    datasets: [
      {
        label: 'عدد المصانع',
        data: [7206, 8500, 9500, 10518, 11549, 15000, 25000, 36000],
        borderColor: 'rgba(86, 95, 88, 0.8)',
        backgroundColor: 'rgba(86, 95, 88, 0.1)',
        fill: true,
        pointBackgroundColor: 'rgba(86, 95, 88, 1)',
        pointBorderColor: '#fff'
      },
      {
        label: 'الناتج المحلي (مليار دولار)',
        data: [70, 75, 88, 110, 140, 170, 200, 223],
        borderColor: 'rgba(200, 176, 154, 0.8)',
        backgroundColor: 'rgba(200, 176, 154, 0.1)',
        fill: true,
        pointBackgroundColor: 'rgba(200, 176, 154, 1)',
        pointBorderColor: '#fff'
      }
    ]
  };

  // بيانات مقارنة المناطق
  const regionData = {
    labels: ['الرياض', 'المنطقة الشرقية', 'مكة المكرمة', 'القصيم', 'المدينة المنورة', 'عسير', 'مناطق أخرى'],
    datasets: [
      {
        label: 'عدد المصانع',
        data: [4502, 2618, 2209, 546, 526, 401, 747],
        borderColor: 'rgba(200, 176, 154, 0.8)',
        backgroundColor: [
          'rgba(86, 95, 88, 0.8)',
          'rgba(200, 176, 154, 0.8)',
          'rgba(169, 177, 169, 0.8)',
          'rgba(86, 95, 88, 0.6)',
          'rgba(200, 176, 154, 0.6)',
          'rgba(169, 177, 169, 0.6)',
          'rgba(120, 120, 120, 0.6)'
        ],
        borderWidth: 1
      }
    ]
  };

  // تفعيل التأثيرات عند رؤية القسم
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1
      }
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

  return (
    <section className="statistics-section" id="statistics" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">إحصائيات التطور الصناعي</h2>
          <p className="section-description">
            شهد القطاع الصناعي في المملكة العربية السعودية نمواً متسارعاً منذ إطلاق رؤية 2030، مع زيادة عدد المصانع بأكثر من 60% وتوقعات بمواصلة النمو لتصل إلى 36 ألف مصنع بحلول عام 2035.
          </p>
         <span className="section-subtitle">النمو الصناعي في المملكة</span>
        </div>

        <div className={`stats-container ${isVisible ? 'visible' : ''}`}>
          <div className="stat-box">
            <i className="fas fa-industry stat-icon"></i>
            <div className="stat-value">
              {isVisible && <CountUp end={11549} duration={2.5} separator="," />}
              <span className="stat-label">مصنع</span>
            </div>
            <p className="stat-description">إجمالي عدد المصانع العاملة في المملكة</p>
          </div>

          <div className="stat-box">
            <i className="fas fa-chart-line stat-icon"></i>
            <div className="stat-value">
              <span className="percentage">+</span>
              {isVisible && <CountUp end={60} duration={2} />}
              <span className="percentage">%</span>
            </div>
            <p className="stat-description">نسبة النمو الصناعي منذ إطلاق رؤية 2030</p>
          </div>

          <div className="stat-box">
            <i className="fas fa-coins stat-icon"></i>
            <div className="stat-value">
              {isVisible && <CountUp end={400} duration={2.5} />}
              <span className="stat-label">مليار دولار</span>
            </div>
            <p className="stat-description">حجم الإستثمارات في القطاع الصناعي</p>
          </div>

          <div className="stat-box">
            <i className="fas fa-bullseye stat-icon"></i>
            <div className="stat-value">
              {isVisible && <CountUp end={36} duration={2} />}
              <span className="stat-label">ألف مصنع</span>
            </div>
            <p className="stat-description">المستهدف ضمن الإستراتيجية الصناعية 2035</p>
          </div>
        </div>

        <div className={`chart-container ${isVisible ? 'visible' : ''}`}>
          <div className="chart-header">
            <h3 className="chart-title">تطور عدد المصانع والناتج المحلي الصناعي</h3>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color" style={{ background: 'rgba(86, 95, 88, 0.8)' }}></div>
                <span>عدد المصانع</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: 'rgba(200, 176, 154, 0.8)' }}></div>
                <span>الناتج المحلي (مليار دولار)</span>
              </div>
            </div>
          </div>
          <div className="chart">
            <Line data={factoriesData} options={chartOptions} />
          </div>
        </div>

        <div className="data-insights">
          <div className={`insight-card ${isVisible ? 'visible' : ''}`}>
            <div className="insight-header">
              <div className="insight-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3 className="insight-title">التوزيع الجغرافي للمصانع</h3>
            </div>
            <p className="insight-content">
              تتصدر منطقة <strong>الرياض</strong> بـ 4,502 مصنع، تليها <strong>المنطقة الشرقية</strong> بـ 2,618 مصنع ومنطقة <strong>مكة المكرمة</strong> بـ 2,209 مصنع، مما يعكس تركز النشاط الصناعي في المناطق الحضرية الرئيسية.
            </p>
          </div>

          <div className={`insight-card ${isVisible ? 'visible' : ''}`}>
            <div className="insight-header">
              <div className="insight-icon">
                <i className="fas fa-hand-holding-usd"></i>
              </div>
              <h3 className="insight-title">حجم الاستثمارات والمشاريع</h3>
            </div>
            <p className="insight-content">
              بلغت الاستثمارات الصناعية ما يقارب <strong>400 مليار دولار</strong> في عام 2023، مع صدور 1,379 ترخيصاً صناعياً جديداً باستثمارات تتجاوز <strong>21.6 مليار دولار</strong>.
            </p>
          </div>

          <div className={`insight-card ${isVisible ? 'visible' : ''}`}>
            <div className="insight-header">
              <div className="insight-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3 className="insight-title">التوظيف والتوطين</h3>
            </div>
            <p className="insight-content">
              تستهدف الاستراتيجية الوطنية للصناعة رفع معدل التوطين من <strong>41%</strong> في عام 2020 إلى <strong>65%</strong> بحلول عام 2035، مع زيادة عدد الوظائف في القطاع بمقدار <strong>4 أضعاف</strong>.
            </p>
          </div>
        </div>

        <div className={`compare-section ${isVisible ? 'visible' : ''}`}>
          <div className="compare-card past">
            <div className="compare-header">
              <h3>قبل رؤية 2030</h3>
            </div>
            <div className="compare-body">
              <div className="compare-stat">
                <div className="compare-stat-label">عدد المصانع</div>
                <div className="compare-stat-value">7,206</div>
                <div className="compare-progress">
                  {/* تحسين طريقة عرض الشريط مع فئات مناسبة */}
                  <div 
                    className="compare-progress-bar" 
                    style={{ 
                      width: isVisible ? '30%' : '0%', 
                      transitionDelay: '0.3s'
                    }}
                  ></div>
                </div>
              </div>
              <div className="compare-stat">
                <div className="compare-stat-label">الناتج المحلي الصناعي</div>
                <div className="compare-stat-value">70 مليار دولار</div>
                <div className="compare-progress">
                  <div 
                    className="compare-progress-bar" 
                    style={{ 
                      width: isVisible ? '35%' : '0%',
                      transitionDelay: '0.5s'
                    }}
                  ></div>
                </div>
              </div>
              <div className="compare-stat">
                <div className="compare-stat-label">نسبة التوطين</div>
                <div className="compare-stat-value">25%</div>
                <div className="compare-progress">
                  <div 
                    className="compare-progress-bar" 
                    style={{ 
                      width: isVisible ? '25%' : '0%',
                      transitionDelay: '0.7s'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="compare-card future">
            <div className="compare-header">
              <h3>المستهدف 2035</h3>
            </div>
            <div className="compare-body">
              <div className="compare-stat">
                <div className="compare-stat-label">عدد المصانع</div>
                <div className="compare-stat-value">36,000</div>
                <div className="compare-progress">
                  <div 
                    className="compare-progress-bar" 
                    style={{ 
                      width: isVisible ? '90%' : '0%',
                      transitionDelay: '0.4s'
                    }}
                  ></div>
                </div>
              </div>
              <div className="compare-stat">
                <div className="compare-stat-label">الناتج المحلي الصناعي</div>
                <div className="compare-stat-value">223 مليار دولار</div>
                <div className="compare-progress">
                  <div 
                    className="compare-progress-bar" 
                    style={{ 
                      width: isVisible ? '85%' : '0%',
                      transitionDelay: '0.6s'
                    }}
                  ></div>
                </div>
              </div>
              <div className="compare-stat">
                <div className="compare-stat-label">نسبة التوطين</div>
                <div className="compare-stat-value">65%</div>
                <div className="compare-progress">
                  <div 
                    className="compare-progress-bar" 
                    style={{ 
                      width: isVisible ? '65%' : '0%',
                      transitionDelay: '0.8s'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="regional-distribution">
          <h3>التوزيع الجغرافي للمصانع حسب المناطق</h3>
          <div className="region-grid">
            <div className={`region-card ${isVisible ? 'animated' : ''}`} style={{ animationDelay: '0s' }}>
              <div className="region-icon"><i className="fas fa-city"></i></div>
              <div className="region-name">الرياض</div>
              <div className="region-value">4,502</div>
              <div className="region-bar" style={{ width: '100%', backgroundColor: 'rgba(86, 95, 88, 0.8)' }}></div>
            </div>
            <div className={`region-card ${isVisible ? 'animated' : ''}`} style={{ animationDelay: '0.1s' }}>
              <div className="region-icon"><i className="fas fa-industry"></i></div>
              <div className="region-name">المنطقة الشرقية</div>
              <div className="region-value">2,618</div>
              <div className="region-bar" style={{ width: '58%', backgroundColor: 'rgba(200, 176, 154, 0.8)' }}></div>
            </div>
            <div className={`region-card ${isVisible ? 'animated' : ''}`} style={{ animationDelay: '0.2s' }}>
              <div className="region-icon"><i className="fas fa-mosque"></i></div>
              <div className="region-name">مكة المكرمة</div>
              <div className="region-value">2,209</div>
              <div className="region-bar" style={{ width: '49%', backgroundColor: 'rgba(169, 177, 169, 0.8)' }}></div>
            </div>
            <div className={`region-card ${isVisible ? 'animated' : ''}`} style={{ animationDelay: '0.3s' }}>
              <div className="region-icon"><i className="fas fa-warehouse"></i></div>
              <div className="region-name">القصيم</div>
              <div className="region-value">546</div>
              <div className="region-bar" style={{ width: '12%', backgroundColor: 'rgba(86, 95, 88, 0.6)' }}></div>
            </div>
            <div className={`region-card ${isVisible ? 'animated' : ''}`} style={{ animationDelay: '0.4s' }}>
              <div className="region-icon"><i className="fas fa-landmark"></i></div>
              <div className="region-name">المدينة المنورة</div>
              <div className="region-value">526</div>
              <div className="region-bar" style={{ width: '11.7%', backgroundColor: 'rgba(200, 176, 154, 0.6)' }}></div>
            </div>
            {/* تصحيح الخطأ في بطاقة منطقة عسير */}
            <div className={`region-card ${isVisible ? 'animated' : ''}`} style={{ animationDelay: '0.5s' }}>
              <div className="region-icon"><i className="fas fa-mountain"></i></div>
              <div className="region-name">عسير</div>
              <div className="region-value">401</div>
              <div className="region-bar" style={{ width: '8.9%', backgroundColor: 'rgba(169, 177, 169, 0.6)' }}></div>
            </div>
          </div>
        </div>
    
      </div>
    </section>
  );
};

export default StatisticsSection;

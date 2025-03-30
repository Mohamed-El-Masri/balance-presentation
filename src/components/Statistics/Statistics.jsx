import { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import './Statistics.css';
import statsData from '../../assets/statistics.json';
import { defaultOptions } from './ChartConfig';  // استيراد التكوين الموحد

const Statistics = () => {
  const [activeTab, setActiveTab] = useState('industrial');
  const [chartData, setChartData] = useState(null);
  
  // إعداد بيانات الرسم البياني استنادًا إلى التبويب النشط
  useEffect(() => {
    prepareChartData(activeTab);
  }, [activeTab]);
  
  // تحضير بيانات الرسم البياني
  const prepareChartData = (tabKey) => {
    if (!statsData[tabKey] || !statsData[tabKey].chartData) return;
    
    const data = statsData[tabKey].chartData;
    const years = data.years || [];
    
    const lineChartData = {
      labels: years,
      datasets: [
        {
          label: 'نسبة الإشغال (%)',
          data: data.usage || [],
          borderColor: 'rgba(86, 95, 88, 0.8)',
          backgroundColor: 'rgba(86, 95, 88, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointBackgroundColor: 'rgba(86, 95, 88, 1)',
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    };
    
    const barChartData = {
      labels: years,
      datasets: [
        {
          label: 'قطع الأراضي المستغلة',
          data: data.land || [],
          backgroundColor: 'rgba(200, 176, 154, 0.7)',
          borderColor: 'rgba(200, 176, 154, 1)',
          borderWidth: 1,
          borderRadius: 6,
          hoverBackgroundColor: 'rgba(200, 176, 154, 0.9)'
        }
      ]
    };
    
    setChartData({
      line: lineChartData,
      bar: barChartData
    });
  };
  
  // عرض محتوى التبويب النشط
  const renderTabContent = () => {
    if (!statsData[activeTab]) {
      return <p className="error-text">البيانات غير متوفرة</p>;
    }
    
    const stats = statsData[activeTab];
    
    return (
      <div className="stats-content">
        <div className="stats-overview">
          <div className="stats-grid">
            {activeTab === 'industrial' && (
              <>
                <div className="stat-item">
                  <span className="stat-value">{stats.total}</span>
                  <span className="stat-label">عدد المنشآت</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{stats.warehouses}</span>
                  <span className="stat-label">المستودعات</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{stats.workers}</span>
                  <span className="stat-label">عدد العمال</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{stats.occupancy}%</span>
                  <span className="stat-label">نسبة الإشغال</span>
                </div>
              </>
            )}
            
            {activeTab === 'residential' && (
              <>
                <div className="stat-item">
                  <span className="stat-value">{stats.complexes}</span>
                  <span className="stat-label">المجمعات السكنية</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{stats.capacity}</span>
                  <span className="stat-label">السعة السكنية</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{stats.occupancy}%</span>
                  <span className="stat-label">نسبة الإشغال</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value highlight">{stats.demand}</span>
                  <span className="stat-label">مستوى الطلب</span>
                </div>
              </>
            )}
            
            {activeTab === 'hotels' && (
              <>
                <div className="stat-item">
                  <span className="stat-value">{stats.total}</span>
                  <span className="stat-label">عدد الفنادق</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{stats.averageRating}</span>
                  <span className="stat-label">متوسط التقييم</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{stats.occupancy}%</span>
                  <span className="stat-label">نسبة الإشغال</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value highlight">{stats.demand}</span>
                  <span className="stat-label">مستوى الطلب</span>
                </div>
              </>
            )}
          </div>
          
          <div className="stats-summary">
            <h3>التحليل</h3>
            <p>
              {activeTab === 'industrial' && 'تظهر البيانات استقرارًا في معدلات الإشغال للمنشآت الصناعية مع وجود طلب مستمر على المساحات الصناعية في المنطقة.'}
              {activeTab === 'residential' && 'يوجد طلب متزايد على المجمعات السكنية مع ارتفاع في معدلات الإشغال خلال السنوات الأخيرة، مما يشير إلى فرصة استثمارية واعدة.'}
              {activeTab === 'hotels' && 'تعاني الفنادق من انخفاض في معدلات الإشغال مقارنة بالقطاعات الأخرى، مما يدعم توجه تحويل الرخص من فندقي إلى سكني.'}
            </p>
            
            <h3>الاستنتاجات</h3>
            <ul>
              {activeTab === 'industrial' && (
                <>
                  <li>معدل نمو ثابت للمنشآت الصناعية بنسبة 8% سنويًا</li>
                  <li>زيادة الحاجة للسكن العمالي بالقرب من المنشآت</li>
                  <li>متوسط عدد العمال للمنشأة الواحدة 44 عامل</li>
                </>
              )}
              
              {activeTab === 'residential' && (
                <>
                  <li>ارتفاع الطلب على الوحدات السكنية بنسبة 12% سنويًا</li>
                  <li>متوسط سعر المتر للوحدات السكنية 3,200 ريال</li>
                  <li>أكثر من 85% من الوحدات السكنية مؤجرة بشكل كامل</li>
                </>
              )}
              
              {activeTab === 'hotels' && (
                <>
                  <li>انخفاض معدلات الإشغال في الفنادق بنسبة 15% خلال السنتين الماضيتين</li>
                  <li>تحويل الرخص يمكن أن يزيد العائد على الاستثمار بنسبة 22%</li>
                  <li>مناسبة للتحول للاستخدام السكني بسبب البنية التحتية المتوفرة</li>
                </>
              )}
            </ul>
          </div>
        </div>
        
        {chartData && (
          <div className="charts-container">
            <div className="chart-wrapper">
              <h3>نسبة الإشغال عبر السنوات</h3>
              <div className="chart-inner">
                <Line data={chartData.line} options={defaultOptions} />
              </div>
            </div>
            <div className="chart-wrapper">
              <h3>عدد الوحدات المستغلة</h3>
              <div className="chart-inner">
                <Bar data={chartData.bar} options={defaultOptions} />
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
        
        <div className="stats-tabs">
          <button 
            className={`stats-tab ${activeTab === 'industrial' ? 'active' : ''}`} 
            onClick={() => setActiveTab('industrial')}
          >
            المنشآت الصناعية
          </button>
          <button 
            className={`stats-tab ${activeTab === 'residential' ? 'active' : ''}`} 
            onClick={() => setActiveTab('residential')}
          >
            السكن النموذجي
          </button>
          <button 
            className={`stats-tab ${activeTab === 'hotels' ? 'active' : ''}`} 
            onClick={() => setActiveTab('hotels')}
          >
            الفنادق
          </button>
        </div>
        
        {renderTabContent()}
      </div>
    </section>
  );
};

export default Statistics;
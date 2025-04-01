import React from 'react';
// Eliminamos la importación de PropTypes
import { Line, Bar } from 'react-chartjs-2';
import { getChartOptions } from './ChartConfig';
import { FaTimes } from 'react-icons/fa';

const ZoomedChart = ({ zoomedChart, closeZoomedChart, chartData, activeTab, isDarkMode }) => {
  if (!zoomedChart || !chartData) return null;

  // تحديد العنوان المناسب حسب نوع الرسم البياني والتبويب النشط
  const getChartTitle = () => {
    if (zoomedChart === 'line') {
      return 'نسبة الإشغال عبر السنوات';
    } else {
      switch (activeTab) {
        case 'industrial':
          return 'المنشآت المستغلة';
        case 'residential':
          return 'الوحدات السكنية';
        case 'hotels':
          return 'الفنادق المستغلة';
        default:
          return 'الوحدات المستغلة';
      }
    }
  };

  // تحديد لون العنصر حسب التبويب النشط
  const getLegendColor = () => {
    switch (activeTab) {
      case 'hotels':
        return 'rgba(150, 70, 80, 0.8)';
      case 'residential':
        return 'rgba(200, 176, 154, 0.8)';
      default:
        return 'rgba(86, 95, 88, 0.8)';
    }
  };

  // تحديد وصف الرسم البياني حسب التبويب النشط
  const getChartDescription = () => {
    switch (activeTab) {
      case 'industrial':
        return 'البيانات توضح تطور نسب إشغال المنشآت الصناعية على مدار السنوات الماضية مع توقعات للمستقبل.';
      case 'residential':
        return 'البيانات توضح الارتفاع المستمر في نسب إشغال الوحدات السكنية، مما يبرز فرصة استثمارية واعدة.';
      case 'hotels':
        return 'البيانات توضح الانخفاض التدريجي في نسب إشغال الفنادق، مما يدعم توجه تحويل الرخص من فندقي إلى سكني.';
      default:
        return '';
    }
  };

  return (
    <div 
      className="stats-module__zoom-overlay" 
      onClick={closeZoomedChart}
      role="dialog"
      aria-modal="true"
      aria-labelledby="zoom-chart-title"
    >
      <div 
        className="stats-module__zoom-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="stats-module__zoom-close" 
          onClick={closeZoomedChart}
          aria-label="إغلاق"
          type="button"
        >
          <FaTimes />
        </button>
        
        <h3 className="stats-module__zoom-title" id="zoom-chart-title">
          {getChartTitle()}
        </h3>
        
        <div className="stats-module__zoom-chart">
          {zoomedChart === 'line' ? (
            <Line 
              data={chartData.line} 
              options={{
                ...getChartOptions(isDarkMode, 'line'),
                maintainAspectRatio: false,
                responsive: true
              }}
            />
          ) : (
            <Bar 
              data={chartData.bar} 
              options={{
                ...getChartOptions(isDarkMode, 'bar'),
                maintainAspectRatio: false,
                responsive: true
              }}
            />
          )}
        </div>
        
        <div className="stats-module__zoom-info">
          <div className="stats-module__zoom-legend">
            <span className="stats-module__zoom-legend-item">
              <span 
                className="stats-module__zoom-legend-color" 
                style={{ backgroundColor: getLegendColor() }}
              ></span>
              <span className="stats-module__zoom-legend-text">
                {zoomedChart === 'line' ? 'نسبة الإشغال' : 'الوحدات المستغلة'}
              </span>
            </span>
          </div>
          
          <p className="stats-module__zoom-description">
            {getChartDescription()}
          </p>
        </div>
      </div>
    </div>
  );
};

// Eliminamos la definición de PropTypes
// ZoomedChart.propTypes = {
//   zoomedChart: PropTypes.string,
//   closeZoomedChart: PropTypes.func.isRequired,
//   chartData: PropTypes.object,
//   activeTab: PropTypes.string.isRequired,
//   isDarkMode: PropTypes.bool
// };

export default ZoomedChart;

/**
 * إعدادات مبسطة للرسوم البيانية
 */
export const getChartOptions = (isDarkMode = false, chartType = 'line') => {
  // الألوان المناسبة حسب وضع العرض
  const textColor = isDarkMode ? '#e0e0e0' : '#333333';
  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  
  // إعدادات مبسطة لحل المشكلات
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: textColor,
          font: {
            family: 'Tajawal, Arial, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(30,30,30,0.8)' : 'rgba(255,255,255,0.9)',
        titleColor: textColor,
        bodyColor: textColor,
        padding: 10,
        cornerRadius: 8,
      }
    },
    scales: {
      x: {
        grid: {
          color: gridColor
        },
        ticks: {
          color: textColor
        }
      },
      y: {
        grid: {
          color: gridColor
        },
        ticks: {
          color: textColor
        }
      }
    }
  };
};

/**
 * دالة لإنشاء تدرجات لونية للرسوم البيانية
 * @param {string} color - اللون الأساسي بصيغة HEX أو RGB
 * @param {number} opacity - مستوى الشفافية (0-1)
 */
export const createGradient = (color, opacity = 0.1) => {
  return {
    backgroundColor: {
      type: 'linear',
      start: 'top',
      end: 'bottom',
      colors: [
        { offset: 0, color: color, opacity: opacity },
        { offset: 1, color: color, opacity: 0 }
      ]
    }
  };
};

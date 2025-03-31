/**
 * دالة إنشاء خيارات ضبط الرسوم البيانية
 * تختلف الإعدادات حسب نوع الرسم (خطي أو أعمدة) ووضع العرض (عادي أو داكن)
 * 
 * @param {boolean} isDarkMode - وضع الألوان الداكن
 * @param {string} chartType - نوع الرسم البياني: 'line', 'bar'
 * @returns {Object} - كائن خيارات الرسم البياني
 */
export const getChartOptions = (isDarkMode = false, chartType = 'line') => {
  // الألوان المناسبة حسب وضع العرض
  const colors = {
    text: isDarkMode ? '#e0e0e0' : '#333333',
    subtleText: isDarkMode ? '#aaaaaa' : '#666666',
    grid: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    tooltip: {
      background: isDarkMode ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.95)',
      border: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
    }
  };

  // الخيارات الأساسية المشتركة للرسوم البيانية
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    rtl: true,
    direction: 'rtl',
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        rtl: true,
        labels: {
          usePointStyle: true,
          pointStyleWidth: 10,
          padding: 20,
          color: colors.text,
          font: {
            family: 'Tajawal, Arial, sans-serif',
            size: 12,
          }
        }
      },
      tooltip: {
        rtl: true,
        textDirection: 'rtl',
        backgroundColor: colors.tooltip.background,
        titleColor: colors.text,
        bodyColor: colors.subtleText,
        padding: 12,
        cornerRadius: 8,
        boxPadding: 5,
        bodyFont: {
          family: 'Tajawal, Arial, sans-serif',
          size: 12
        },
        titleFont: {
          family: 'Tajawal, Arial, sans-serif',
          size: 13,
          weight: 'bold'
        },
        borderColor: colors.tooltip.border,
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            
            if (context.parsed.y !== null) {
              label += context.parsed.y;
              
              // إضافة علامة النسبة المئوية إذا كان الرسم خطي
              if (chartType === 'line') {
                label += '%';
              } else {
                label += ' وحدة';
              }
            }
            return label;
          },
          title: function(context) {
            return 'سنة ' + context[0].label;
          }
        }
      }
    },
    scales: {
      x: {
        position: 'bottom',
        grid: {
          drawBorder: false,
          color: colors.grid,
          lineWidth: 1,
          drawTicks: false,
          display: true
        },
        ticks: {
          color: colors.subtleText,
          padding: 10,
          font: {
            family: 'Tajawal, Arial, sans-serif',
            size: 11
          },
          maxRotation: 0,
          autoSkipPadding: 20
        },
        border: {
          display: false
        }
      },
      y: {
        position: 'right', // محاذاة المقياس على اليمين للتوافق مع RTL
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: colors.grid,
          lineWidth: 1,
          drawTicks: true,
          display: true
        },
        border: {
          display: false
        },
        ticks: {
          color: colors.subtleText,
          padding: 10,
          font: {
            family: 'Tajawal, Arial, sans-serif',
            size: 11
          },
          maxTicksLimit: 6,
          callback: function(value) {
            // إضافة علامة النسبة المئوية إذا كان الرسم خطي
            if (chartType === 'line') {
              return value + '%';
            }
            // للأعمدة نعرض الأرقام كما هي
            return value;
          }
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    elements: {
      // سيتم تخصيصه حسب نوع الرسم البياني
    },
    layout: {
      padding: {
        top: 10,
        right: 20,
        bottom: 10,
        left: 20
      }
    },
    locale: 'ar-SA'
  };
  
  // خيارات إضافية للرسم الخطي
  if (chartType === 'line') {
    baseOptions.elements = {
      line: {
        tension: 0.35,
        borderWidth: isDarkMode ? 3 : 2,
        fill: true,
        capBezierPoints: true
      },
      point: {
        radius: 4,
        hitRadius: 8,
        hoverRadius: 6,
        borderWidth: 2,
        hoverBorderWidth: 3
      }
    };
    
    // تعديل الهوامش للرسم الخطي
    baseOptions.scales.y.ticks.padding = 15;
    baseOptions.scales.x.ticks.padding = 8;
  }
  
  // خيارات إضافية للرسم الشريطي
  if (chartType === 'bar') {
    baseOptions.elements = {
      bar: {
        borderRadius: 6,
        borderSkipped: false,
        borderWidth: 1
      }
    };
    
    baseOptions.plugins.tooltip.callbacks.label = function(context) {
      let label = context.dataset.label || '';
      if (label) {
        label += ': ';
      }
      if (context.parsed.y !== null) {
        label += context.parsed.y + ' وحدة';
      }
      return label;
    };
    
    // إعدادات خاصة بالرسم الشريطي
    baseOptions.barPercentage = 0.7;
    baseOptions.categoryPercentage = 0.8;
  }
  
  return baseOptions;
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

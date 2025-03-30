import { Chart as ChartJS, registerables } from 'chart.js';

// تسجيل جميع مكونات Chart.js بما في ذلك plugin Filler
ChartJS.register(...registerables);

// تكوين عام للرسوم البيانية
const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        font: {
          family: 'Tajawal, Arial, sans-serif',
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      titleColor: '#565F58',
      bodyColor: '#565F58',
      bodyFont: {
        family: 'Tajawal, Arial, sans-serif',
        size: 12
      },
      titleFont: {
        family: 'Tajawal, Arial, sans-serif',
        size: 14,
        weight: 'bold'
      },
      padding: 12,
      boxPadding: 8,
      usePointStyle: true,
      borderColor: 'rgba(200, 176, 154, 0.3)',
      borderWidth: 1
    }
  }
};

export { defaultOptions };

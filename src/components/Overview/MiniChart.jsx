import { useEffect, useRef } from 'react';
import './MiniChart.css';

const MiniChart = ({ type, data, color }) => {
  const canvasRef = useRef(null);
  
  // دالة لتحليل اللون وتعديل الشفافية
  const parseColorWithOpacity = (color, opacity) => {
    // إذا كان اللون بصيغة rgba
    if (color && color.startsWith('rgba')) {
      // استخراج قيم RGB من اللون الأصلي
      const rgbMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d\.]+\)/);
      if (rgbMatch) {
        return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${opacity})`;
      }
    }
    
    // إذا كان اللون بصيغة hex أو غير معروف، استخدم اللون الافتراضي مع الشفافية المطلوبة
    return `rgba(200, 176, 154, ${opacity})`;
  };
  
  // رسم المخطط البياني الصغير
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    
    // ضبط دقة الرسم
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
    
    // تنظيف الكانفاس
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // تحديد نوع الرسم البياني
    switch (type) {
      case 'line':
        drawLineChart(ctx, data, color);
        break;
      case 'bar':
        drawBarChart(ctx, data, color);
        break;
      case 'pie':
        drawPieChart(ctx, data, color);
        break;
      default:
        drawLineChart(ctx, data, color);
    }
  }, [type, data, color]);
  
  // رسم مخطط خطي بسيط
  const drawLineChart = (ctx, data, color) => {
    const width = ctx.canvas.offsetWidth;
    const height = ctx.canvas.offsetHeight;
    
    // بيانات افتراضية إذا لم يتم توفير بيانات
    const points = data || [5, 8, 12, 7, 10, 15, 13];
    const max = Math.max(...points);
    
    // رسم المنحنى
    ctx.beginPath();
    ctx.moveTo(0, height - (points[0] / max) * height);
    
    points.forEach((point, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - (point / max) * height;
      ctx.lineTo(x, y);
    });
    
    // تعيين نمط الخط
    ctx.strokeStyle = color || 'rgba(200, 176, 154, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // إضافة تظليل للمنطقة تحت المنحنى
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    
    // تعبئة المنطقة تحت المنحنى بلون شفاف - تصحيح صيغة اللون هنا
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    // استخدام دالة تحليل اللون بدلاً من الإلحاق المباشر للسلسلة الحرفية
    gradient.addColorStop(0, parseColorWithOpacity(color, 0.2));
    gradient.addColorStop(1, parseColorWithOpacity(color, 0.05));
    
    ctx.fillStyle = gradient;
    ctx.fill();
  };
  
  // رسم مخطط شريطي بسيط
  const drawBarChart = (ctx, data, color) => {
    const width = ctx.canvas.offsetWidth;
    const height = ctx.canvas.offsetHeight;
    
    const values = data || [12, 19, 8, 15, 10];
    const max = Math.max(...values);
    const barWidth = width / values.length - 2;
    
    values.forEach((value, i) => {
      const barHeight = (value / max) * height;
      const x = (width / values.length) * i + 1;
      const y = height - barHeight;
      
      // استخدام اللون المقدم أو اللون الافتراضي
      ctx.fillStyle = color || 'rgba(200, 176, 154, 0.7)';
      ctx.fillRect(x, y, barWidth, barHeight);
    });
  };
  
  // رسم مخطط دائري بسيط
  const drawPieChart = (ctx, data, color) => {
    const width = ctx.canvas.offsetWidth;
    const height = ctx.canvas.offsetHeight;
    const radius = Math.min(width, height) / 2;
    const centerX = width / 2;
    const centerY = height / 2;
    
    const percentage = data || 75;
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (2 * Math.PI * percentage / 100);
    
    // رسم الدائرة الخلفية
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 2, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fill();
    
    // رسم شريحة النسبة
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius - 2, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = color || 'rgba(200, 176, 154, 0.7)';
    ctx.fill();
  };
  
  return (
    <div className="mini-chart-wrapper">
      <canvas 
        ref={canvasRef} 
        className="mini-chart" 
        width="100" 
        height="40"
        aria-label={`رسم بياني: ${type}`}
      />
    </div>
  );
};

export default MiniChart;

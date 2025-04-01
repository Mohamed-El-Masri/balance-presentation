import React, { useState, useEffect } from 'react';
import { formatNumber } from './StatisticsUtils';

const StatCard = ({ icon, value, label, index = 0, type = 'industrial', isPercentage = false }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

  // تنفيذ تأثير العداد
  useEffect(() => {
    // إعادة ضبط العداد عند تغيير القيمة
    setDisplayValue(0);
    
    // تأخير بدء الحركة للحصول على تأثير تسلسلي
    const timeoutId = setTimeout(() => {
      setIsAnimated(true);
      
      if (value !== undefined && value !== null) {
        const duration = 1000; // مدة الحركة بالمللي ثانية
        const startTime = Date.now();
        const targetValue = Number(value);
        
        const updateCounter = () => {
          const currentTime = Date.now();
          const elapsedTime = currentTime - startTime;
          
          if (elapsedTime < duration) {
            // حساب القيمة الحالية باستخدام منحنى تباطؤ
            const progress = Math.min(1, elapsedTime / duration);
            const easedProgress = 1 - Math.pow(1 - progress, 3); // تباطؤ أنعم
            const currentValue = Math.round(easedProgress * targetValue);
            setDisplayValue(currentValue);
            
            requestAnimationFrame(updateCounter);
          } else {
            // عند انتهاء الحركة نضع القيمة النهائية
            setDisplayValue(targetValue);
          }
        };
        
        requestAnimationFrame(updateCounter);
      }
    }, index * 150); // تأخير تسلسلي

    return () => clearTimeout(timeoutId);
  }, [value, index]);

  const displayText = isPercentage 
    ? `${formatNumber(displayValue)}%` 
    : formatNumber(displayValue);

  // تحسين عرض الأيقونة داخل البطاقة
  return (
    <div 
      className={`stats-module__stat-item ${type} ${isAnimated ? 'animated' : ''}`}
      style={{ "--stat-index": index }}
    >
      {/* تحسين عرض الأيقونة */}
      {icon && (
        <div className={`stats-module__stat-icon ${type}`}>
          {icon}
        </div>
      )}
      <div className="stats-module__stat-content">
        <span className="stats-module__stat-value">
          {displayText}
        </span>
        <span className="stats-module__stat-label">{label}</span>
      </div>
    </div>
  );
};

export default StatCard;

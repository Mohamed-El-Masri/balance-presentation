import React, { useState, useEffect, useRef } from 'react';
import './StatHighlight.css';

// مكون متعدد الاستخدامات لعرض الإحصائيات والأرقام بتأثيرات بصرية متقدمة
const StatHighlight = ({ 
  value,               // القيمة الرقمية للعرض
  suffix = '',         // لاحقة (مثل % أو +)
  prefix = '',         // سابقة (مثل نحو أو ~)
  label,               // وصف الرقم
  icon,                // أيقونة فونت أوسم (اختياري)
  theme = 'primary',   // النمط اللوني - primary, secondary, success, danger, info, warning
  animationDelay = 0,  // تأخير بدء الحركة بالمللي ثانية
  animationDuration = 2000, // مدة الحركة بالمللي ثانية
  description,         // وصف توضيحي اختياري
  size = 'medium',     // حجم المكون - small, medium, large
  hoverEffect = true,  // تأثير عند المرور بالمؤشر
  sourceInfo,          // معلومات مصدر البيانات (اختياري)
  className = '',      // أي أصناف إضافية
  comparison,          // قيمة مقارنة (اختياري) مثل { value: "15%", trend: "up", label: "عن العام السابق" }
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef(null);
  const countRef = useRef(null);

  // تحديد ما إذا كانت القيمة رقمية
  const isNumber = !isNaN(parseFloat(value)) && isFinite(value);
  const numericValue = isNumber ? parseFloat(value) : 0;
  const formattedValue = isNumber 
    ? Number(value).toLocaleString('ar-SA')
    : value;

  // مراقبة ظهور العنصر في الشاشة
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // تنفيذ حركة العداد عند ظهور العنصر
  useEffect(() => {
    if (isVisible && isNumber && !isAnimating) {
      setIsAnimating(true);
      
      const startTime = Date.now();
      const startValue = 0;
      const changeValue = numericValue;
      
      // تحديث قيمة العرض
      const updateCounterValue = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        
        if (elapsed < animationDuration) {
          // استخدام دالة easing لجعل الحركة أكثر طبيعية
          const progress = easeOutQuart(elapsed / animationDuration);
          const currentValue = startValue + changeValue * progress;
          
          // تنسيق طريقة عرض القيمة
          if (numericValue % 1 !== 0) {
            // للأرقام العشرية
            setDisplayValue(currentValue.toFixed(1));
          } else {
            // للأرقام الصحيحة
            setDisplayValue(Math.floor(currentValue).toLocaleString('ar-SA'));
          }
          
          requestAnimationFrame(updateCounterValue);
        } else {
          // عند انتهاء الحركة، استخدم القيمة النهائية الدقيقة
          setDisplayValue(formattedValue);
        }
      };
      
      // دالة easing للحصول على حركة سلسة عند نهاية العد
      function easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
      }
      
      // بدء الحركة بعد التأخير المحدد
      setTimeout(() => {
        requestAnimationFrame(updateCounterValue);
      }, animationDelay);
    } else if (!isNumber) {
      // إذا كانت القيمة ليست رقمية، عرضها كما هي
      setDisplayValue(value);
    }
  }, [isVisible, value, animationDelay, isNumber, formattedValue, numericValue, isAnimating, animationDuration]);

  // تحديد الأصناف بناءً على الخصائص المختلفة
  const statClass = `stat-highlight ${theme} ${size} ${className} ${hoverEffect ? 'hover-effect' : ''}`;

  // عرض اتجاه المقارنة
  const renderTrendIcon = () => {
    if (!comparison || !comparison.trend) return null;
    
    return (
      <span className={`trend-icon ${comparison.trend}`}>
        <i className={`fas fa-arrow-${comparison.trend === 'up' ? 'up' : 'down'}`}></i>
      </span>
    );
  };

  return (
    <div className={statClass} ref={ref}>
      <div className="stat-highlight-content">
        {icon && (
          <div className="stat-icon">
            <i className={icon}></i>
          </div>
        )}
        
        <div className="stat-value-container">
          <div className="stat-value">
            {prefix && <span className="stat-prefix">{prefix}</span>}
            <span ref={countRef} className="value">
              {isVisible ? displayValue : '0'}
            </span>
            {suffix && <span className="stat-suffix">{suffix}</span>}
            {renderTrendIcon()}
          </div>
          
          {label && <h4 className="stat-label">{label}</h4>}
          
          {comparison && comparison.label && (
            <div className="stat-comparison">
              <span className={`comparison-value ${comparison.trend}`}>
                {comparison.value}
              </span>
              <span className="comparison-label">{comparison.label}</span>
            </div>
          )}
        </div>
      </div>
      
      {description && (
        <div className="stat-description">
          <p>{description}</p>
        </div>
      )}
      
      {sourceInfo && (
        <div className="stat-source">
          <span className="source-label">المصدر:</span>
          <span className="source-value">{sourceInfo}</span>
        </div>
      )}
    </div>
  );
};

export default StatHighlight;

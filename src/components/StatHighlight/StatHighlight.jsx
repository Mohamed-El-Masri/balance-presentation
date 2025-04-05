import React, { useState, useEffect, useRef } from 'react';
import './StatHighlight.css';

const StatHighlight = ({
  value,               // القيمة الرقمية للعرض
  suffix = '',         // لاحقة (مثل % أو +)
  label,               // وصف الرقم
  icon,                // أيقونة فونت أوسم
  theme = 'primary',   // النمط اللوني
  animationDelay = 0,  // تأخير بدء الحركة بالمللي ثانية
  size = 'medium',     // small, medium, large
  description = '',    // وصف توضيحي إضافي
  className = '',      // أي أصناف إضافية
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState('0');
  const highlightRef = useRef(null);

  // مراقبة ظهور المكون في الشاشة
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // تأخير ليتوافق مع التأثيرات الأخرى
          setTimeout(() => {
            setIsVisible(true);
          }, animationDelay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (highlightRef.current) {
      observer.observe(highlightRef.current);
    }

    return () => {
      if (highlightRef.current) {
        observer.unobserve(highlightRef.current);
      }
    };
  }, [animationDelay]);

  // تأثير عد الرقم تصاعدياً
  useEffect(() => {
    if (isVisible) {
      // تحويل القيمة إلى رقم صحيح
      const finalValue = parseInt(value.replace(/,/g, ''));
      if (isNaN(finalValue)) {
        setDisplayValue(value); // إذا كانت القيمة ليست رقمية، نعرضها مباشرة
        return;
      }

      const duration = 1500; // مدة الانتقال بالمللي ثانية
      const frameRate = 1000 / 60; // 60 فريم/ثانية
      const totalFrames = Math.round(duration / frameRate);
      
      let currentFrame = 0;
      const valueIncrement = finalValue / totalFrames;
      
      const timer = setInterval(() => {
        currentFrame += 1;
        const currentValue = Math.min(Math.round(currentFrame * valueIncrement), finalValue);
        
        // تنسيق العدد مع فواصل الآلاف
        setDisplayValue(currentValue.toLocaleString('en-US')); // يستخدم نمط أرقام عالمي
        
        if (currentFrame >= totalFrames) {
          clearInterval(timer);
        }
      }, frameRate);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  return (
    <div 
      ref={highlightRef}
      className={`stat-highlight-component theme-${theme} size-${size} ${isVisible ? 'animated' : ''} ${className}`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="stat-highlight-inner">
        {icon && (
          <div className="stat-highlight-icon">
            <i className={icon}></i>
          </div>
        )}
        
        <div className="stat-highlight-value-wrapper">
          <div className="stat-highlight-value">
            {displayValue}
            {suffix && <span className="suffix">{suffix}</span>}
          </div>
        </div>
        
        {label && (
          <div className="stat-highlight-label">{label}</div>
        )}

        {description && (
          <div className="stat-highlight-description">{description}</div>
        )}
      </div>
    </div>
  );
};

export default StatHighlight;

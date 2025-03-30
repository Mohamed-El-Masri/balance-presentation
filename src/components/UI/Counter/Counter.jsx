import { useState, useEffect, useRef } from 'react';
import './Counter.css';

const Counter = ({ 
  end, 
  start = 0, 
  duration = 2000, 
  decimals = 0, 
  suffix = "", 
  prefix = "", 
  className = "" 
}) => {
  const [count, setCount] = useState(start);
  const [isComplete, setIsComplete] = useState(false);
  const countRef = useRef(null);
  const startTimeRef = useRef(null);
  const frameRef = useRef(null);

  // دالة تنسيق العدد
  const formatNumber = (num) => {
    const formatted = decimals > 0 
      ? num.toFixed(decimals) 
      : Math.round(num).toString();
      
    return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // دالة تحريك العداد
  const animateCount = (timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }
    
    const progress = timestamp - startTimeRef.current;
    const percentage = Math.min(progress / duration, 1);
    
    // دالة تدريج للحصول على حركة طبيعية (easing function)
    const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);
    const easedProgress = easeOutQuart(percentage);
    
    // حساب القيمة الحالية
    const currentValue = start + (end - start) * easedProgress;
    setCount(currentValue);
    
    // استمرار في التحريك أو اكتمال
    if (percentage < 1) {
      frameRef.current = requestAnimationFrame(animateCount);
    } else {
      setCount(end);
      setIsComplete(true);
    }
  };

  // تشغيل العداد عند تحميل المكون
  useEffect(() => {
    // تأخير بسيط قبل بدء العد
    const timer = setTimeout(() => {
      frameRef.current = requestAnimationFrame(animateCount);
    }, 300);
    
    return () => {
      clearTimeout(timer);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, start, duration]);

  return (
    <span 
      ref={countRef}
      className={`counter ${isComplete ? 'completed' : ''} ${className}`}
    >
      {prefix}
      <span className="counter-value">{formatNumber(count)}</span>
      {suffix}
    </span>
  );
};

export default Counter;

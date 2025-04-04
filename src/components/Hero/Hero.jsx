import { useEffect, useState, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Balance Real Estate Company';  // Removed the extra space at the end
  const typingSpeed = 100; // Slightly slower for better visibility
  const typingDelay = 800; // Start typing sooner
  
  // إضافة متغيرات حالة للعدادات
  const [plotCount, setPlotCount] = useState(0);
  const [occupancyRate, setOccupancyRate] = useState(0);
  const [workersCount, setWorkersCount] = useState(0);
  
  // القيم النهائية للعدادات
  const finalPlotCount = 15;
  const finalOccupancyRate = 87;
  const finalWorkersCount = 15390;
  
  // مرجع للتحقق من بدء تشغيل العدادات
  const countersStarted = useRef(false);

  // تفعيل تأثيرات الظهور بعد تحميل الصفحة
  useEffect(() => {
    setIsVisible(true);
    
    // إضافة مراقب التمرير لتأثيرات الشلل (Parallax)
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // تعديل الشفافية للموجة عند التمرير للأسفل
      const wave = document.querySelector('.wave');
      if (wave) {
        const opacity = Math.max(0.3, 1 - window.scrollY / 500);
        wave.style.opacity = opacity;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Fixed typing animation without undefined issues
    const startTypingTimeout = setTimeout(() => {
      // Reset typed text to make sure we start fresh
      setTypedText('');
      
      const textArray = fullText.split('');
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex < textArray.length) {
          // Add each character one by one
          setTypedText(prevText => textArray.slice(0, currentIndex + 1).join(''));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, typingSpeed);
      
      return () => clearInterval(typingInterval);
    }, typingDelay);

    // التأكد من أن المسافة بين الهيدر والمحتوى مناسبة
    const header = document.querySelector('.header');
    
    if (header && heroRef.current) {
      const headerHeight = header.offsetHeight;
      heroRef.current.style.paddingTop = `${headerHeight}px`;
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(startTypingTimeout);
    };
  }, []);

  // تفعيل العدادات عند ظهور القسم
  useEffect(() => {
    // لا نشغل العدادات إلا مرة واحدة وبعد أن يصبح المحتوى مرئيًا
    if (isVisible && !countersStarted.current) {
      countersStarted.current = true;
      
      // تأخير بدء العدادات للحصول على تأثير متسلسل
      setTimeout(() => {
        // عداد قطع الأراضي (أبطأ قليلاً)
        const plotDuration = 1500; // مدة العد
        const plotIncrement = finalPlotCount / (plotDuration / 50); // الزيادة في كل خطوة
        let plotCurrent = 0;
        
        const plotInterval = setInterval(() => {
          plotCurrent += plotIncrement;
          if (plotCurrent >= finalPlotCount) {
            setPlotCount(finalPlotCount);
            clearInterval(plotInterval);
          } else {
            setPlotCount(Math.floor(plotCurrent));
          }
        }, 50);
        
        // عداد نسبة الإشغال (متوسط السرعة)
        const occupancyDuration = 2000;
        const occupancyIncrement = finalOccupancyRate / (occupancyDuration / 30);
        let occupancyCurrent = 0;
        
        const occupancyInterval = setInterval(() => {
          occupancyCurrent += occupancyIncrement;
          if (occupancyCurrent >= finalOccupancyRate) {
            setOccupancyRate(finalOccupancyRate);
            clearInterval(occupancyInterval);
          } else {
            setOccupancyRate(Math.floor(occupancyCurrent));
          }
        }, 30);
        
        // عداد عدد العمال (أسرع في البداية ثم يبطئ)
        const workersDuration = 2500;
        let workersCurrent = 0;
        let step = 1;
        
        const workersInterval = setInterval(() => {
          // زيادة سرعة التغيير تدريجيًا ثم تقليلها قرب النهاية
          if (workersCurrent < finalWorkersCount / 3) {
            step = Math.min(15, step + 1);
          } else if (workersCurrent > finalWorkersCount * 0.8) {
            step = Math.max(1, step - 1);
          }
          
          workersCurrent += step;
          
          if (workersCurrent >= finalWorkersCount) {
            setWorkersCount(finalWorkersCount);
            clearInterval(workersInterval);
          } else {
            setWorkersCount(workersCurrent);
          }
        }, 10);
      }, 1800); // تأخير بدء العدادات بعد ظهور المحتوى
    }
  }, [isVisible]);

  // دالة لتنسيق العدد مع إضافة فواصل الآلاف للأرقام الكبيرة
  const formatNumber = (num) => {
    if (num >= 1000) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return num;
  };

  // حساب تأثير الشلل للخلفية وبعض العناصر
  const parallaxStyle = {
    backgroundPosition: `center ${50 + (scrollPosition * 0.05)}%`
  };
  
  // التمرير السلس للأسفل
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetTop = elementTop - headerHeight;
      
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="hero" ref={heroRef} className="hero" style={parallaxStyle}>
      {/* طبقة الأوفرلاي الرئيسية */}
      <div className="hero-overlay"></div>
      
      {/* جسيمات متحركة في الخلفية */}
      <div className="particles">
        {Array(15).fill().map((_, i) => (
          <span key={i} className="particle"></span>
        ))}
      </div>
      
      {/* شبكة هندسية وتأثير توهج */}
      <div className="grid-overlay"></div>
      <div className="glow-overlay"></div>
      
      {/* محتوى الهيرو الرئيسي - تم تبسيطه */}
      <div className={`hero-content ${isVisible ? 'visible' : ''} simplified`}>
        <div className="badge animate fade-in badge-container">
          <div className="badge-logo-container">
            <img src="https://modon.gov.sa/Style%20Library/ar-sa/Core%20Styles/images/logo.png" alt="شعار مدن" className="badge-logo" />
          </div>
          الهيئة السعودية للمدن الصناعية
        </div>
        
        <h1 className="animate fade-in">
          تحويل رخص البناء
          <span className="highlight">من فندقي إلى سكني</span>
        </h1>
        
        <div className="typed-container animate fade-in delay-1">
          <p className="typed-text">
            {/* Clean rendering of just the typed text */}
            {typedText}
            <span className="cursor" style={{ animation: 'blink 1s step-end infinite' }}>|</span>
          </p>
        </div>
        
        <p className="hero-subtitle animate fade-in delay-2">
          منصة تحليلية متكاملة لدراسة وتقييم المواقع المثالية للسكن في المناطق الصناعية
          <br />تساعد المستثمرين على اتخاذ القرارات الأمثل لتحويل المباني الفندقية إلى وحدات سكنية
        </p>
        
        {/* تم حذف hero-features */}
        {/* تم حذف أزرار hero-cta */}

        {/* <div className="metrics animate fade-in delay-3">
          <div className="metric">
            <span className="metric-number counter">
              <span className="value">{plotCount}</span>
            </span>
            <span className="metric-label">قطع أراضي</span>
          </div>
          <div className="metric">
            <span className="metric-number counter">
              <span className="value">{occupancyRate}</span>
              <span className="percent">%</span>
            </span>
            <span className="metric-label">نسبة الإشغال</span>
          </div>
          <div className="metric">
            <span className="metric-number counter">
              <span className="value">{formatNumber(workersCount)}</span>
              <span className="plus">+</span>
            </span>
            <span className="metric-label">عدد العمال</span>
          </div>
        </div> */}
      </div>
      
      {/* مؤشر التمرير للأسفل */}
      <div className="scroll-indicator" onClick={() => scrollToSection('overview')}>
        <span className="scroll-text">اكتشف المزيد</span>
        <div className="scroll-arrows">
          <span className="scroll-arrow"></span>
          <span className="scroll-arrow"></span>
        </div>
      </div>
      
      {/* موجة متحركة */}
      <div className="wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="wave-svg" preserveAspectRatio="none">
          <path
            fillOpacity="1"
            d="M0,96L48,106.7C96,117,192,139,288,138.7C384,139,480,117,576,112C672,107,768,117,864,138.7C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;

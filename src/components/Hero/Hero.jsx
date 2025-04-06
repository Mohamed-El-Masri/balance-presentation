import { useEffect, useState, useRef } from "react";
import "./Hero.css";

const Hero = () => {
  // حالات المكون
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [typedText, setTypedText] = useState("");

  // المراجع
  const heroRef = useRef(null);

  // النص الكامل للطباعة
  const fullText = "Balance Real Estate Company";
  const typingSpeed = 100;
  const typingDelay = 800;

  // تفعيل تأثيرات الظهور بعد تحميل الصفحة
  useEffect(() => {
    // تعيين المكون مرئياً
    setIsVisible(true);

    // مراقب التمرير للتأثيرات المتوازية
    const handleScroll = () => {
      setScrollPosition(window.scrollY);

      // تعديل شفافية الموجة عند التمرير
      const wave = document.querySelector(".wave");
      if (wave) {
        const opacity = Math.max(0.3, 1 - window.scrollY / 500);
        wave.style.opacity = opacity;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // تأثير الكتابة المتحركة
    const startTypingTimeout = setTimeout(() => {
      setTypedText("");

      const textArray = fullText.split("");
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < textArray.length) {
          setTypedText((prev) => textArray.slice(0, currentIndex + 1).join(""));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, typingSpeed);

      // تنظيف الفترة الزمنية عند الخروج
      return () => clearInterval(typingInterval);
    }, typingDelay);

    // ضبط المسافة بين الهيدر والمحتوى
    const header = document.querySelector(".header");
    if (header && heroRef.current) {
      const headerHeight = header.offsetHeight;
      heroRef.current.style.paddingTop = `${headerHeight}px`;
    }

    // تنظيف المستمعين عند الخروج
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(startTypingTimeout);
    };
  }, []);

  // دالة التمرير السلس للأسفل
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight =
        document.querySelector(".header")?.offsetHeight || 80;
      const elementTop =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetTop = elementTop - headerHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  // حساب تأثير الشلل للخلفية
  const parallaxStyle = {
    backgroundPosition: `center ${50 + scrollPosition * 0.05}%`,
  };

  return (
    <section
      id='hero'
      ref={heroRef}
      className='hero'
      style={parallaxStyle}>
      {/* طبقة الأوفرلاي الرئيسية */}
      <div className='hero-overlay'></div>

      {/* جسيمات متحركة في الخلفية */}
      <div className='particles'>
        {Array(15)
          .fill()
          .map((_, i) => (
            <span
              key={i}
              className='particle'></span>
          ))}
      </div>

      {/* شبكة هندسية وتأثير توهج */}
      <div className='grid-overlay'></div>
      <div className='glow-overlay'></div>

      {/* محتوى الهيرو الرئيسي */}
      <div className={`hero-content ${isVisible ? "visible" : ""} simplified`}>
        <div className='badge animate fade-in badge-container'>
          <div className='badge-logo-container'>
            <img
              src='https://modon.gov.sa/Style%20Library/ar-sa/Core%20Styles/images/logo.png'
              alt='شعار مدن'
              className='badge-logo'
            />
          </div>
          الهيئة السعودية للمدن الصناعية
        </div>

        <h1 className='animate fade-in'>
          تحويل رخص البناء
          <span className='highlight'>من فندقي إلى سكني جماعي</span>
        </h1>

        <div className='typed-container animate fade-in delay-1'>
          <p className='typed-text'>
            {typedText}
            <span
              className='cursor'
              style={{ animation: "blink 1s step-end infinite" }}>
              |
            </span>
          </p>
        </div>

        <p className='hero-subtitle animate fade-in delay-2'>
          رؤية استراتيجية مبتكرة تفتح آفاقاً جديدة للاستثمار وتعزز جودة الحياة
          في المناطق الصناعية
          <br />
          نقدم حلولاً متكاملة تحول التحديات السكنية إلى فرص استثمارية واعدة،
          وترتقي بمستوى المجتمعات العمرانية
          <br />
          نحو مستقبل يجمع بين الاستدامة الاقتصادية والرفاهية المجتمعية
        </p>
      </div>

      {/* مؤشر التمرير للأسفل */}
      <div
        className='scroll-indicator'
        onClick={() => scrollToSection("overview")}>
        <span className='scroll-text'>اكتشف المزيد</span>
        <div className='scroll-arrows'>
          <span className='scroll-arrow'></span>
          <span className='scroll-arrow'></span>
        </div>
      </div>

      {/* موجة متحركة */}
      <div className='wave'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
          className='wave-svg'
          preserveAspectRatio='none'>
          <path
            fillOpacity='1'
            d='M0,96L48,106.7C96,117,192,139,288,138.7C384,139,480,117,576,112C672,107,768,117,864,138.7C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;

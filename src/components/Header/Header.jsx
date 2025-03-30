import { useState, useEffect, useRef } from 'react';
import './Header.css';

const Header = ({ toggleTheme, currentTheme }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  // استخدام useRef لمنع إعادة الحسابات غير الضرورية
  const sectionsRef = useRef(['hero', 'overview', 'map', 'statistics', 'properties']);
  const scrollTimeoutRef = useRef(null);
  
  // تحديد القسم النشط بطريقة أكثر كفاءة
  const updateActiveSection = () => {
    // نقطة المرجع هي 20% من ارتفاع النافذة من الأعلى - هذا يساعد على تفعيل القسم مبكراً
    const viewportOffset = window.innerHeight * 0.2;
    const currentPosition = window.scrollY + viewportOffset;
    
    // الانتقال من الأسفل إلى الأعلى لضمان أننا نجد أول قسم مرئي
    for (let i = sectionsRef.current.length - 1; i >= 0; i--) {
      const sectionId = sectionsRef.current[i];
      const element = document.getElementById(sectionId);
      
      if (!element) continue;
      
      const offsetTop = element.offsetTop;
      const height = element.offsetHeight;
      
      // تفعيل القسم إذا كان المستخدم قد تمرر إليه
      if (currentPosition >= offsetTop && currentPosition <= offsetTop + height) {
        if (activeSection !== sectionId) {
          setActiveSection(sectionId);
        }
        return; // وجدنا القسم النشط، نخرج من الدالة
      }
    }
    
    // إذا وصلنا هنا ولم نجد قسم نشط، نعتبر القسم الأول نشطًا إذا كنا في بداية الصفحة
    if (window.scrollY < 100 && activeSection !== 'hero') {
      setActiveSection('hero');
    }
  };
  
  // معالج حدث التمرير
  const handleScroll = () => {
    // حساب نسبة التمرير للشريط التقدمي
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
    
    // تغيير مظهر الهيدر عند التمرير
    setIsScrolled(window.scrollY > 50);
    
    // تأخير تحديث القسم النشط لتحسين الأداء
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      updateActiveSection();
      scrollTimeoutRef.current = null;
    }, 50); // تأخير قصير للأداء الأفضل
  };

  // إضافة مستمعي الأحداث
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    // تحديث القسم النشط الأولي بعد تحميل الصفحة
    updateActiveSection();
    
    // إضافة مستمع لتغيير حجم النافذة لإعادة حساب الأقسام النشطة
    window.addEventListener('resize', updateActiveSection);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveSection);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []); // لاحظ: لا نضع updateActiveSection كتبعية لتجنب التحديثات الغير ضرورية

  // تبديل حالة القائمة المتنقلة
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
    // منع التمرير عند فتح القائمة
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // إغلاق القائمة عند الضغط على أحد الروابط
  const closeMenuOnClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      document.body.style.overflow = '';
    }
  };
  
  // التنقل السلس عند النقر
  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    closeMenuOnClick();
    
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;
    
    const headerOffset = 80; // ارتفاع الهيدر
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
    
    // تعيين القسم النشط بعد التمرير
    setActiveSection(targetId);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      <div className="container header-container">
        <div className="logos">
          <div className="logo-wrapper">
            <img src="https://modon.gov.sa/Style%20Library/ar-sa/Core%20Styles/images/logo.png" alt="شعار هيئة مدن" className="logo-img" />
          </div>
          <div className="logo-wrapper">
            <img src="https://almajdiahinvestment.sa/storage/r6KO9mDQNojA5Cwk1r18GE5vD13K3P-metabG9nby1oLnBuZw==-.png" alt="شعار الماجدة" className="logo-img" />
          </div>
          <div className="logo-wrapper">
            <img src="/src/assets/Balance - logo.png" alt="شعار شركة بالنس" className="logo-img" />
          </div>
        </div>
        
        <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <a 
                href="#hero" 
                onClick={(e) => smoothScroll(e, 'hero')}
                className={activeSection === 'hero' ? 'active' : ''}
              >
                الرئيسية
              </a>
            </li>
            <li>
              <a 
                href="#overview" 
                onClick={(e) => smoothScroll(e, 'overview')}
                className={activeSection === 'overview' ? 'active' : ''}
              >
                نظرة عامة
              </a>
            </li>
            <li>
              <a 
                href="#map" 
                onClick={(e) => smoothScroll(e, 'map')}
                className={activeSection === 'map' ? 'active' : ''}
              >
                الخريطة
              </a>
            </li>
            <li>
              <a 
                href="#statistics" 
                onClick={(e) => smoothScroll(e, 'statistics')}
                className={activeSection === 'statistics' ? 'active' : ''}
              >
                الإحصائيات
              </a>
            </li>
            <li>
              <a 
                href="#properties" 
                onClick={(e) => smoothScroll(e, 'properties')}
                className={activeSection === 'properties' ? 'active' : ''}
              >
                قطع الأراضي
              </a>
            </li>
          </ul>
          
          <button 
            className="theme-toggle" 
            onClick={toggleTheme} 
            title={currentTheme === 'light' ? 'تفعيل الوضع الداكن' : 'تفعيل الوضع الفاتح'}
            aria-label="تبديل الوضع المظلم"
          >
            {currentTheme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>

        {/* زر القائمة للموبايل */}
        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="قائمة متنقلة"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;

import { useState, useEffect, useRef } from 'react';
import './Header.css';
import balanceLogo from '/src/assets/logos/balance-logo.png';
import modonLogo from '/src/assets/logos/modon-logo.png';
import majdiahLogo from '/src/assets/logos/majdiah-logo.png';

const Header = ({ toggleTheme, currentTheme }) => {
  // حالات المكون
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  // مراجع الأقسام في الصفحة
  const sectionsRef = useRef([
    'hero', 
    'overview', 
    'map-section-title', 
    'statistics', 
    'properties',
    'comparison',
    'vision',
    'case-studies'
  ]);
  
  const scrollTimeoutRef = useRef(null);
  
  // تحديث القسم النشط بناء على موضع التمرير
  const updateActiveSection = () => {
    const viewportOffset = window.innerHeight * 0.2;
    const currentPosition = window.scrollY + viewportOffset;
    
    for (let i = sectionsRef.current.length - 1; i >= 0; i--) {
      const sectionId = sectionsRef.current[i];
      const element = document.getElementById(sectionId);
      
      if (!element) continue;
      
      const offsetTop = element.offsetTop;
      const height = element.offsetHeight;
      
      if (currentPosition >= offsetTop && currentPosition <= offsetTop + height) {
        if (activeSection !== sectionId) {
          setActiveSection(sectionId);
        }
        return;
      }
    }
    
    if (window.scrollY < 100 && activeSection !== 'hero') {
      setActiveSection('hero');
    }
  };
  
  // معالج حدث التمرير
  const handleScroll = () => {
    // حساب نسبة التمرير للشريط التقدمي
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    setScrollProgress(progress);
    
    // تغيير مظهر الهيدر عند التمرير
    setIsScrolled(window.scrollY > 50);
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      updateActiveSection();
      scrollTimeoutRef.current = null;
    }, 50);
  };

  // إضافة مستمعي الأحداث
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    // تحديث القسم النشط الأولي بعد تحميل الصفحة
    setTimeout(() => {
      updateActiveSection();
    }, 500);
    
    // إضافة مستمع لتغيير حجم النافذة
    window.addEventListener('resize', updateActiveSection);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveSection);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // تبديل حالة القائمة المتنقلة
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
    // منع التمرير عند فتح القائمة
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
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
    
    setActiveSection(targetId);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      <div className="container header-container">
        {/* شعارات الشركات */}
        <div className="logos">
          <div className="logo-wrapper">
            <img src={modonLogo} alt="شعار هيئة مدن" className="logo-img" />
          </div>
          <div className="logo-wrapper">
            <img src={majdiahLogo} alt="شعار الماجدة" className="logo-img" />
          </div>
          <div className="logo-wrapper">
            <img src={balanceLogo} alt="شعار شركة بالنس" className="logo-img" />
          </div>
        </div>
        
        {/* قائمة التنقل الرئيسية */}
        <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
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
                href="#map-section-title" 
                onClick={(e) => smoothScroll(e, 'map-section-title')}
                className={activeSection === 'map-section-title' ? 'active' : ''}
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
                العقارات
              </a>
            </li>
            <li>
              <a 
                href="#comparison" 
                onClick={(e) => smoothScroll(e, 'comparison')}
                className={activeSection === 'comparison' ? 'active' : ''}
              >
                المقارنة
              </a>
            </li>
            <li>
              <a 
                href="#vision" 
                onClick={(e) => smoothScroll(e, 'vision')}
                className={activeSection === 'vision' ? 'active' : ''}
              >
                رؤية 2030
              </a>
            </li>
            <li>
              <a 
                href="#case-studies" 
                onClick={(e) => smoothScroll(e, 'case-studies')}
                className={activeSection === 'case-studies' ? 'active' : ''}
              >
                دراسات حالة
              </a>
            </li>
          </ul>
          
          {/* زر تبديل الثيم */}
          <button 
            className="theme-toggle" 
            onClick={toggleTheme} 
            title={currentTheme === 'light' ? 'تفعيل الوضع الداكن' : 'تفعيل الوضع الفاتح'}
            aria-label="تبديل الوضع المظلم"
          >
            <i className={`fas ${currentTheme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
        </nav>

        {/* زر القائمة للموبايل */}
        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="قائمة متنقلة"
        >
          <span className="mobile-menu-bar"></span>
          <span className="mobile-menu-bar"></span>
          <span className="mobile-menu-bar"></span>
        </button>

        {/* قائمة الموبايل */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <a 
                href="#hero" 
                onClick={(e) => smoothScroll(e, 'hero')}
                className={`mobile-nav-link ${activeSection === 'hero' ? 'active' : ''}`}
              >
                الرئيسية
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="#overview" 
                onClick={(e) => smoothScroll(e, 'overview')}
                className={`mobile-nav-link ${activeSection === 'overview' ? 'active' : ''}`}
              >
                نظرة عامة
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="#map-section-title" 
                onClick={(e) => smoothScroll(e, 'map-section-title')}
                className={`mobile-nav-link ${activeSection === 'map-section-title' ? 'active' : ''}`}
              >
                الخريطة
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="#statistics" 
                onClick={(e) => smoothScroll(e, 'statistics')}
                className={`mobile-nav-link ${activeSection === 'statistics' ? 'active' : ''}`}
              >
                الإحصائيات
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="#properties" 
                onClick={(e) => smoothScroll(e, 'properties')}
                className={`mobile-nav-link ${activeSection === 'properties' ? 'active' : ''}`}
              >
                العقارات
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="#comparison" 
                onClick={(e) => smoothScroll(e, 'comparison')}
                className={`mobile-nav-link ${activeSection === 'comparison' ? 'active' : ''}`}
              >
                المقارنة
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="#vision" 
                onClick={(e) => smoothScroll(e, 'vision')}
                className={`mobile-nav-link ${activeSection === 'vision' ? 'active' : ''}`}
              >
                رؤية 2030
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="#case-studies" 
                onClick={(e) => smoothScroll(e, 'case-studies')}
                className={`mobile-nav-link ${activeSection === 'case-studies' ? 'active' : ''}`}
              >
                دراسات حالة
              </a>
            </li>
          </ul>
          
          {/* زر تبديل الثيم للموبايل */}
          <div className="mobile-theme-toggle">
            <button
              onClick={toggleTheme}
              className="mobile-theme-btn"
              title={currentTheme === 'light' ? 'تفعيل الوضع الداكن' : 'تفعيل الوضع الفاتح'}
            >
              <i className={`fas ${currentTheme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
              {currentTheme === 'light' ? ' الوضع الداكن' : ' الوضع الفاتح'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;







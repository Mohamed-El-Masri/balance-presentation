import React from 'react';
import './Footer.css';

const Footer = () => {
  // الحصول على السنة الحالية لحقوق النشر
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* معلومات الشركة */}
            <div className="footer-column company-info">
              <div className="footer-logo">
                <img src="/src/assets/logos/balance-logo.png" alt="شركة بالنس للتطوير العقاري" />
              </div>
              <p className="footer-slogan">
                نوازن بين الجودة والاستدامة لتطوير مجمعات سكنية متميزة
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="تويتر">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link" aria-label="لينكد إن">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="social-link" aria-label="انستقرام">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-link" aria-label="فيسبوك">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </div>
            </div>
            
            {/* روابط سريعة */}
            <div className="footer-column quick-links">
              <h3 className="footer-heading">روابط سريعة</h3>
              <ul className="footer-links">
                <li><a href="#overview">نبذة عن المشروع</a></li>
                <li><a href="#statistics">الإحصائيات</a></li>
                <li><a href="#map">خريطة الموقع</a></li>
                <li><a href="#properties">قطع الأراضي</a></li>
                <li><a href="#comparison">مقارنة المباني</a></li>
                <li><a href="#vision2030">رؤية 2030</a></li>
                <li><a href="#district">حي المصفاة</a></li>
                <li><a href="#case-studies">نماذج ناجحة</a></li>
              </ul>
            </div>
            
            {/* معلومات الاتصال */}
            <div className="footer-column contact-info">
              <h3 className="footer-heading">تواصل معنا</h3>
              <ul className="contact-details">
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>شارع احمد بن شبانة ، القيروان ، الرياض، المملكة العربية السعودية</span>
                </li>
                <li>
                  <i className="fas fa-phone-alt"></i>
                  <span dir="ltr">+966 92 003 1844</span>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <span>info@balance-re.sa</span>
                </li>
                <li>
                  <i className="fas fa-clock"></i>
                  <span>الأحد - الخميس: 8:00 صباحًا - 5:00 مساءً</span>
                </li>
              </ul>
            </div>
            
            {/* النشرة البريدية */}
            <div className="footer-column newsletter">
              <h3 className="footer-heading">النشرة البريدية</h3>
              <p>اشترك في نشرتنا البريدية للحصول على أحدث العروض والأخبار</p>
              <form className="newsletter-form">
                <button type="submit" className="subscribe-btn">اشتراك</button>
                <input type="email" placeholder="البريد الإلكتروني" required />
              </form>
            
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>© {currentYear} شركة بالنس للتطوير العقاري. جميع الحقوق محفوظة.</p>
          <p className="developer-credit">تطوير بواسطة <a href="#" target="_blank" rel="noopener noreferrer">فريق بالنس للتطوير</a></p>
        </div>
      </div>
      
      {/* زر العودة للأعلى */}
      <BackToTopButton />
    </footer>
  );
};

// مكون زر العودة للأعلى
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  // مراقبة التمرير لإظهار/إخفاء الزر
  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // التمرير لأعلى الصفحة
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      className={`back-to-top ${isVisible ? 'visible' : ''}`} 
      onClick={scrollToTop}
      aria-label="العودة إلى أعلى الصفحة"
    >
      <span className="back-to-top-icon">
        <i className="fas fa-chevron-up"></i>
      </span>
      <span className="back-to-top-text">للأعلى</span>
    </button>
  );
};

export default Footer;

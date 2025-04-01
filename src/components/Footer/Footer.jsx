import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>عن المشروع</h3>
            <p>
              منصة لتسهيل دراسة وتحليل مشروع تحويل رخص البناء من فندقي إلى سكني في المناطق الصناعية،
              وتوفير البيانات اللازمة للاستفادة من الفرص الاستثمارية المتاحة.
            </p>
          </div>
          
          <div className="footer-section links">
            <h3>روابط سريعة</h3>
            <ul>
              <li><a href="#hero">الرئيسية</a></li>
              <li><a href="#overview">نظرة عامة</a></li>
              <li><a href="#map">الخريطة</a></li>
              <li><a href="#statistics">الإحصائيات</a></li>
              <li><a href="#properties">قطع الأراضي</a></li>
            </ul>
          </div>
          
          <div className="footer-section contact">
            <h3>اتصل بنا</h3>
            <div className="contact-info">
              <p><i className="contact-icon">📧</i> Info@balance.sa</p>
              <p><i className="contact-icon">📞</i> +966 00 000 0000</p>
              <p><i className="contact-icon">📍</i> شارع احمد بن شبانة - القيروان -الرياض</p>
            </div>
            
            <div className="social-links">
              <a href="#" title="تويتر" className="social-link">𝕏</a>
              <a href="#" title="لينكدإن" className="social-link">in</a>
              <a href="#" title="فيسبوك" className="social-link">f</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="partners">
            <div className="partner-logo">
              <img src="https://modon.gov.sa/Style%20Library/ar-sa/Core%20Styles/images/logo.png" alt="هيئة مدن" className="partner-img" />
            </div>
            <div className="partner-logo">
              <img src="https://almajdiahinvestment.sa/storage/r6KO9mDQNojA5Cwk1r18GE5vD13K3P-metabG9nby1oLnBuZw==-.png" alt="الماجدة" className="partner-img" />
            </div>
            <div className="partner-logo">
              <img src="/src/assets/Balance - logo.png" alt="شركة بالنس" className="partner-img" />
            </div>
          </div>
          
          <div className="copyright">
            <p>جميع الحقوق محفوظة &copy; {currentYear}</p>
            <p>.Balance Real Estate Co</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

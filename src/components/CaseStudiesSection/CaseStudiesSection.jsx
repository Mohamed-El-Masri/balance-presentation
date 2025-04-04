import React, { useState, useEffect, useRef } from 'react';
import './CaseStudiesSection.css';

function CaseStudiesSection() {
  const [activeCase, setActiveCase] = useState('lam1');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // مراقبة ظهور القسم في الشاشة
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const handleCaseChange = (caseId) => {
    setActiveCase(caseId);
  };
  
  return (
    <section className={`case-studies-section ${isVisible ? 'visible' : ''}`} id="case-studies" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">نماذج ناجحة لمجمعات سكن العمال</h2>
        <p className="section-description">
          تعرض هذه النماذج مشاريع ناجحة لمجمعات سكنية للعمال والموظفين في مناطق صناعية مختلفة بالمملكة،
          وتوضح الإمكانات والعوائد الاستثمارية لهذا النوع من المشاريع.
        </p>
        
        <div className="cases-nav">
          <button 
            className={`case-btn ${activeCase === 'lam1' ? 'active' : ''}`} 
            onClick={() => handleCaseChange('lam1')}
          >
            <span className="case-btn-name">مجمع لام 1</span>
            <span className="case-btn-location">الرياض</span>
          </button>
          
          <button 
            className={`case-btn ${activeCase === 'lam2' ? 'active' : ''}`} 
            onClick={() => handleCaseChange('lam2')}
          >
            <span className="case-btn-name">مجمع لام 2</span>
            <span className="case-btn-location">جدة</span>
          </button>
          
          <button 
            className={`case-btn ${activeCase === 'fadhili' ? 'active' : ''}`} 
            onClick={() => handleCaseChange('fadhili')}
          >
            <span className="case-btn-name">مشروع إسكان الفاضلي</span>
            <span className="case-btn-location">المنطقة الشرقية</span>
          </button>
        </div>
        
        <div className="case-content">
          {activeCase === 'lam1' && (
            <div className="case-details">
              <div className="case-images">
                <div className="main-image">
                  <img src="/src/assets/caseStudy/09.jpg" alt="مجمع لام 1 السكني" />
                </div>
                <div className="gallery">
                  <img src="/src/assets/caseStudy/10.jpg" alt="مرافق مجمع لام 1" />
                  <img src="/src/assets/caseStudy/11.jpg" alt="غرف مجمع لام 1" />
                  <img src="/src/assets/caseStudy/01.jpg" alt="خدمات مجمع لام 1" />
                </div>
              </div>
              
              <div className="case-info">
                <h3>مجمع لام (1) السكني في الرياض</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">الموقع</span>
                    <span className="info-value">المدينة الصناعية الثانية، الرياض</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">المساحة الإجمالية</span>
                    <span className="info-value">68,192 متر مربع</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">مساحة سكن العمال</span>
                    <span className="info-value">29,567 متر مربع</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">مساحة سكن الموظفين</span>
                    <span className="info-value">9,230 متر مربع</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">عدد الغرف (العمال)</span>
                    <span className="info-value">1,270 غرفة</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">عدد الغرف (الموظفين)</span>
                    <span className="info-value">447 غرفة</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">نسبة الإشغال</span>
                    <span className="info-value highlight">95%</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">العائد الاستثماري</span>
                    <span className="info-value highlight">10.2% سنوياً</span>
                  </div>
                </div>
                
                <div className="facilities">
                  <h4>المرافق والخدمات</h4>
                  <ul className="facilities-list">
                    <li><i className="fas fa-check-circle"></i> جميع الغرف مؤثثة بالكامل</li>
                    <li><i className="fas fa-check-circle"></i> دورات مياه ومراوش بشكل مستقل في كل دور لسكن العمال</li>
                    <li><i className="fas fa-check-circle"></i> دورات مياه خاصة بكل غرفة (سكن الموظفين)</li>
                    <li><i className="fas fa-check-circle"></i> غرفة مستقلة لمكائن غسيل الملابس في كل دور</li>
                    <li><i className="fas fa-check-circle"></i> مطبخ مركزي لتقديم الوجبات اليومية</li>
                    <li><i className="fas fa-check-circle"></i> جامع 3 أدوار</li>
                    <li><i className="fas fa-check-circle"></i> خدمة الإنترنت</li>
                    <li><i className="fas fa-check-circle"></i> صالة رياضية وصالة ترفيه</li>
                    <li><i className="fas fa-check-circle"></i> ساحات خارجية للترفيه</li>
                    <li><i className="fas fa-check-circle"></i> معارض تجارية</li>
                    <li><i className="fas fa-check-circle"></i> عيادة طبية</li>
                    <li><i className="fas fa-check-circle"></i> ملاعب خارجية</li>
                    <li><i className="fas fa-check-circle"></i> حراسة أمنية 24 ساعة</li>
                  </ul>
                </div>
                
                <div className="success-indicators">
                  <h4>مؤشرات النجاح</h4>
                  <div className="indicator-cards">
                    <div className="indicator-card">
                      <div className="indicator-icon">
                        <i className="fas fa-briefcase"></i>
                      </div>
                      <div className="indicator-info">
                        <span className="indicator-value">+22%</span>
                        <span className="indicator-label">زيادة في إنتاجية العمال</span>
                      </div>
                    </div>
                    
                    <div className="indicator-card">
                      <div className="indicator-icon">
                        <i className="fas fa-user-check"></i>
                      </div>
                      <div className="indicator-info">
                        <span className="indicator-value">-34%</span>
                        <span className="indicator-label">انخفاض في معدل دوران الموظفين</span>
                      </div>
                    </div>
                    
                    <div className="indicator-card">
                      <div className="indicator-icon">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div className="indicator-info">
                        <span className="indicator-value">1.5 ساعة</span>
                        <span className="indicator-label">توفير في وقت التنقل اليومي</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeCase === 'lam2' && (
            <div className="case-details">
              <div className="case-images">
                <div className="main-image">
                  <img src="/src/assets/caseStudy/05.jpg" alt="مجمع لام 2 السكني" />
                </div>
                <div className="gallery">
                  <img src="/src/assets/caseStudy/06.jpg" alt="مرافق مجمع لام 2" />
                  <img src="/src/assets/caseStudy/07.jpg" alt="غرف مجمع لام 2" />
                  <img src="/src/assets/caseStudy/08.jpg" alt="خدمات مجمع لام 2" />
                </div>
              </div>
              
              <div className="case-info">
                <h3>مجمع لام (2) السكني في جدة</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">الموقع</span>
                    <span className="info-value">المدينة الصناعية الأولى، جدة</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">المساحة الإجمالية</span>
                    <span className="info-value">14,464 متر مربع</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">مسطحات البناء</span>
                    <span className="info-value">23,264 متر مربع</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">عدد المباني</span>
                    <span className="info-value">4 مباني سكنية</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">عدد الغرف</span>
                    <span className="info-value">612 غرفة</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">عدد الطوابق</span>
                    <span className="info-value">5 أدوار لكل مبنى</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">نسبة الإشغال</span>
                    <span className="info-value highlight">92%</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">العائد الاستثماري</span>
                    <span className="info-value highlight">9.8% سنوياً</span>
                  </div>
                </div>
                
                <div className="facilities">
                  <h4>المرافق والخدمات</h4>
                  <ul className="facilities-list">
                    <li><i className="fas fa-check-circle"></i> جميع الغرف مؤثثة بالكامل</li>
                    <li><i className="fas fa-check-circle"></i> دورات مياه ومراوش بشكل مستقل في كل دور</li>
                    <li><i className="fas fa-check-circle"></i> غرفة مخصصة لغسيل الملابس في كل دور</li>
                    <li><i className="fas fa-check-circle"></i> مطبخ مركزي بثلاثة طوابق (1,518 متر مربع)</li>
                    <li><i className="fas fa-check-circle"></i> مسجد بمساحة 228 متر مربع</li>
                    <li><i className="fas fa-check-circle"></i> خدمة الإنترنت</li>
                    <li><i className="fas fa-check-circle"></i> صالة رياضية وصالة ترفيه</li>
                    <li><i className="fas fa-check-circle"></i> عيادة طبية</li>
                    <li><i className="fas fa-check-circle"></i> حراسة أمنية 24 ساعة</li>
                    <li><i className="fas fa-check-circle"></i> خدمات الصيانة والنظافة</li>
                    <li><i className="fas fa-check-circle"></i> معارض تجارية</li>
                    <li><i className="fas fa-check-circle"></i> بوابات إلكترونية وأنظمة أمنية متطورة</li>
                  </ul>
                </div>
                
                <div className="success-indicators">
                  <h4>مؤشرات النجاح</h4>
                  <div className="indicator-cards">
                    <div className="indicator-card">
                      <div className="indicator-icon">
                        <i className="fas fa-industry"></i>
                      </div>
                      <div className="indicator-info">
                        <span className="indicator-value">+18%</span>
                        <span className="indicator-label">زيادة في الإنتاجية</span>
                      </div>
                    </div>
                    
                    <div className="indicator-card">
                      <div className="indicator-icon">
                        <i className="fas fa-hand-holding-usd"></i>
                      </div>
                      <div className="indicator-info">
                        <span className="indicator-value">-42%</span>
                        <span className="indicator-label">انخفاض تكاليف النقل</span>
                      </div>
                    </div>
                    
                    <div className="indicator-card">
                      <div className="indicator-icon">
                        <i className="fas fa-user-plus"></i>
                      </div>
                      <div className="indicator-info">
                        <span className="indicator-value">+29%</span>
                        <span className="indicator-label">ارتفاع في رضا الموظفين</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeCase === 'fadhili' && (
            <div className="case-details">
              <div className="case-images">
                <div className="main-image">
                  <img src="/src/assets/caseStudy/01.jpg" alt="مشروع إسكان الفاضلي" />
                </div>
                <div className="gallery">
                  <img src="/src/assets/caseStudy/02.jpg" alt="مرافق إسكان الفاضلي" />
                  <img src="/src/assets/caseStudy/03.jpg" alt="غرف إسكان الفاضلي" />
                  <img src="/src/assets/caseStudy/04.jpg" alt="خدمات إسكان الفاضلي" />
                </div>
              </div>
              
              <div className="case-info">
                <h3>مشروع إسكان الفاضلي</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">الموقع</span>
                    <span className="info-value">المنطقة الشرقية، المملكة العربية السعودية</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">المساحة الإجمالية</span>
                    <span className="info-value">~700,000 متر مربع</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">السعة الاستيعابية</span>
                    <span className="info-value">2,500 موظف</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">الشركة المستفيدة</span>
                    <span className="info-value">شركة أرامكو السعودية</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">الهدف</span>
                    <span className="info-value">إسكان للعاملين في إنتاج النفط والغاز</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">المناطق المخدومة</span>
                    <span className="info-value">الفاضلي، واسط، الخرسانية</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">نسبة الإشغال</span>
                    <span className="info-value highlight">98%</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">العائد الاستثماري</span>
                    <span className="info-value highlight">11.5% سنوياً</span>
                  </div>
                </div>
                
                <div className="facilities">
                  <h4>المرافق والخدمات</h4>
                  <ul className="facilities-list">
                    <li><i className="fas fa-check-circle"></i> وحدات سكنية فاخرة للموظفين</li>
                    <li><i className="fas fa-check-circle"></i> مركز رياضي متكامل</li>
                    <li><i className="fas fa-check-circle"></i> مركز تسوق ومطاعم</li>
                    <li><i className="fas fa-check-circle"></i> مركز ترفيهي</li>
                    <li><i className="fas fa-check-circle"></i> مسبح ومرافق استجمام</li>
                    <li><i className="fas fa-check-circle"></i> عيادة طبية متكاملة</li>
                    <li><i className="fas fa-check-circle"></i> مسجد</li>
                    <li><i className="fas fa-check-circle"></i> حدائق ومساحات خضراء</li>
                    <li><i className="fas fa-check-circle"></i> مواقف سيارات</li>
                    <li><i className="fas fa-check-circle"></i> نظام نقل داخلي</li>
                    <li><i className="fas fa-check-circle"></i> أنظمة أمنية متطورة</li>
                    <li><i className="fas fa-check-circle"></i> خدمات صيانة على مدار الساعة</li>
                  </ul>
                </div>
                
                <div className="success-indicators">
                  <h4>مؤشرات النجاح</h4>
                  <div className="indicator-cards">
                    <div className="indicator-card">
                      <div className="indicator-icon">
                        <i className="fas fa-chart-line"></i>
                      </div>
                      <div className="indicator-info">
                        <span className="indicator-value">+27%</span>
                        <span className="indicator-label">زيادة في كفاءة العمليات</span>
                      </div>
                    </div>
                    
                    <div className="indicator-card">
                      <div className="indicator-icon">
                        <i className="fas fa-leaf"></i>
                      </div>
                      <div className="indicator-info">
                        <span className="indicator-value">-48%</span>
                        <span className="indicator-label">انخفاض في البصمة الكربونية</span>
                      </div>
                    </div>
                    
                    <div className="indicator-card">
                      <div className="indicator-icon">
                        <i className="fas fa-user-tie"></i>
                      </div>
                      <div className="indicator-info">
                        <span className="indicator-value">+35%</span>
                        <span className="indicator-label">تحسن في استقطاب المواهب</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* قسم الخلاصة والدروس المستفادة - محسن */}
        <div className="conclusion-section">
          <div className="section-divider">
            <span className="divider-icon"><i className="fas fa-bookmark"></i></span>
          </div>
          
          <h3 className="conclusion-title">الخلاصة والدروس المستفادة</h3>
          
          <div className="conclusion-container">
            <div className="conclusion-highlight">
              <div className="quote-icon">
                <i className="fas fa-quote-right"></i>
              </div>
              <p className="highlight-text">
                أثبتت المجمعات السكنية للعمال والموظفين في المناطق الصناعية نجاحاً كبيراً من ناحية الجدوى الاقتصادية والأثر الاجتماعي والبيئي.
              </p>
            </div>
            
            <div className="lessons-container">
              <div className="lessons-grid">
                <div className="lesson-item">
                  <div className="lesson-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div className="lesson-content">
                    <h4>العائد الاستثماري</h4>
                    <p>تحقق المجمعات السكنية عائداً استثمارياً يتراوح بين 9-12% سنوياً، وهو أعلى من عائد الفنادق في المناطق الصناعية.</p>
                  </div>
                </div>
                
                <div className="lesson-item">
                  <div className="lesson-icon">
                    <i className="fas fa-percentage"></i>
                  </div>
                  <div className="lesson-content">
                    <h4>نسب الإشغال</h4>
                    <p>تمتاز المجمعات السكنية بنسب إشغال عالية (85-98%) مقارنة بالفنادق التي لا تتجاوز نسبة إشغالها 55% في المناطق الصناعية.</p>
                  </div>
                </div>
                
                <div className="lesson-item">
                  <div className="lesson-icon">
                    <i className="fas fa-hand-holding-usd"></i>
                  </div>
                  <div className="lesson-content">
                    <h4>تكاليف التشغيل</h4>
                    <p>تنخفض تكاليف تشغيل المجمعات السكنية بنسبة 30-40% مقارنة بالفنادق، مع زيادة في الإيرادات.</p>
                  </div>
                </div>
                
                <div className="lesson-item">
                  <div className="lesson-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="lesson-content">
                    <h4>الأثر الاجتماعي</h4>
                    <p>تسهم هذه المجمعات في تحسين جودة حياة العمال والموظفين وزيادة إنتاجيتهم وتقليل معدل دوران الموظفين.</p>
                  </div>
                </div>
                
                <div className="lesson-item">
                  <div className="lesson-icon">
                    <i className="fas fa-leaf"></i>
                  </div>
                  <div className="lesson-content">
                    <h4>الأثر البيئي</h4>
                    <p>تقليل التنقلات والازدحام المروري يؤدي إلى خفض الانبعاثات الكربونية بنسبة تصل إلى 45%.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* نبذة عن شركة بالنس للتطوير العقاري - محسن */}
        <div className="company-profile-section">
          <div className="company-profile-container">
            <div className="company-logo-container">
              <img src="/src/assets/logos/balance-logo.png" alt="شعار شركة بالنس للتطوير العقاري" className="company-logo" />
            </div>
            
            <div className="company-info">
              <h3>نبذة عن شركة بالنس للتطوير العقاري</h3>
              
              <div className="company-description">
                <p>
                  تأسست شركة بالنس للتطوير العقاري بهدف إحداث توازن حقيقي في سوق العقارات السكنية للعمال والموظفين في المناطق الصناعية بالمملكة العربية السعودية، حيث تقدم حلولاً عقارية مبتكرة تجمع بين الجودة العالية والاستدامة.
                </p>
                
                <div className="company-features">
                  <div className="feature">
                    <div className="feature-icon">
                      <i className="fas fa-medal"></i>
                    </div>
                    <div className="feature-text">
                      <h5>خبرة متميزة</h5>
                      <p>فريق متخصص بخبرة تزيد عن 15 عاماً في تطوير وإدارة المجمعات السكنية</p>
                    </div>
                  </div>
                  
                  <div className="feature">
                    <div className="feature-icon">
                      <i className="fas fa-project-diagram"></i>
                    </div>
                    <div className="feature-text">
                      <h5>مشاريع ناجحة</h5>
                      <p>نفخر بتطوير أكثر من 20 مشروعاً سكنياً ناجحاً في مختلف مناطق المملكة</p>
                    </div>
                  </div>
                  
                  <div className="feature">
                    <div className="feature-icon">
                      <i className="fas fa-handshake"></i>
                    </div>
                    <div className="feature-text">
                      <h5>شراكات استراتيجية</h5>
                      <p>شراكات قوية مع كبرى الشركات الصناعية ومؤسسة مدن الصناعية</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="company-vision">
                <h4>رؤيتنا</h4>
                <p>أن نكون الشريك الأول في تطوير وإدارة المجمعات السكنية للعاملين في القطاع الصناعي بالمملكة، مع الالتزام بأعلى معايير الجودة والاستدامة، ودعم رؤية المملكة 2030 في تحسين جودة الحياة وتنمية الاقتصاد.</p>
              </div>
              
              <div className="company-action">
               
                <div className="trusted-by">
                  <span>موثوق من قبل:</span>
                  <div className="partners-logos">
                   
                    <img src="/src/assets/logos/majdiah-logo.png" alt="شركة الماجدية للاستثمار" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesSection;

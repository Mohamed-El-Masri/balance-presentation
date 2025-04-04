import React, { useState, useEffect, useRef } from 'react';
import './ComparisonSection.css';

const ComparisonSection = () => {
  const [activeTab, setActiveTab] = useState('occupancy');
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const comparisonCardsRef = useRef(null);

  // بيانات المقارنة
  const comparisonData = {
    occupancy: {
      title: "معدل الإشغال",
      hotelPercent: 45,
      residentialPercent: 95,
      hotelDescription: "معدل إشغال منخفض في المناطق الصناعية",
      residentialDescription: "معدل إشغال مرتفع مع استقرار طويل الأمد",
      icon: "fas fa-chart-line",
      difference: "+50%",
      differenceText: "زيادة في نسبة الإشغال",
      color: "#4D7C0F"
    },
    operationalCosts: {
      title: "تكاليف التشغيل",
      hotelPercent: 85,
      residentialPercent: 40,
      hotelDescription: "تكاليف مرتفعة لخدمات فندقية متكاملة",
      residentialDescription: "تكاليف منخفضة وإدارة أكثر كفاءة",
      icon: "fas fa-hand-holding-usd",
      difference: "-45%",
      differenceText: "انخفاض في تكاليف التشغيل",
      color: "#4D7C0F"
    },
    roi: {
      title: "العائد على الاستثمار",
      hotelPercent: 35,
      residentialPercent: 75,
      hotelDescription: "عائد متذبذب يعتمد على موسمية السياحة",
      residentialDescription: "عائد مستقر مع عقود طويلة الأمد",
      icon: "fas fa-percentage",
      difference: "+40%",
      differenceText: "زيادة في العائد الاستثماري",
      color: "#4D7C0F"
    },
    environmentalImpact: {
      title: "الأثر البيئي",
      hotelPercent: 78,
      residentialPercent: 35,
      hotelDescription: "استهلاك عالٍ للموارد وإنتاج نفايات أكثر",
      residentialDescription: "أثر بيئي أقل واستهلاك أقل للطاقة والمياه",
      icon: "fas fa-leaf",
      difference: "-43%",
      differenceText: "انخفاض في الأثر البيئي",
      color: "#4D7C0F"
    },
    resilience: {
      title: "المرونة والاستدامة",
      hotelPercent: 38,
      residentialPercent: 88,
      hotelDescription: "تأثّر كبير بالأزمات وتقلبات السوق",
      residentialDescription: "استقرار أكبر ومقاومة للتقلبات الاقتصادية",
      icon: "fas fa-shield-alt",
      difference: "+50%",
      differenceText: "زيادة في المرونة والاستدامة",
      color: "#4D7C0F"
    }
  };

  // مراقبة ظهور القسم في الشاشة للتحريك
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
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

  // إضافة تأثير حركي عند تغيير التبويب
  useEffect(() => {
    if (comparisonCardsRef.current && isVisible) {
      // تطبيق تأثير حركي عند تغيير التبويب
      comparisonCardsRef.current.classList.add('tab-changing');
      setTimeout(() => {
        comparisonCardsRef.current.classList.remove('tab-changing');
      }, 500);
    }
  }, [activeTab, isVisible]);

  // التبديل بين علامات التبويب
  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  // البيانات النشطة
  const activeData = comparisonData[activeTab];

  return (
    <section id="comparison" ref={sectionRef} className={`comparison-section ${isVisible ? 'visible' : ''}`}>
      <div className="comparison-bg-pattern"></div>
      <div className="container">
        {/* ترويسة القسم */}
        <header className="section-header">
          <h2 className="section-title">مقارنة بين المباني الفندقية والسكنية</h2>
          <p className="section-description">
            اكتشف الفروق الجوهرية بين المباني الفندقية والسكنية في المناطق الصناعية،
            والتي توضح لماذا يُعد تحويل الرخصة من فندقي إلى سكني استثماراً مُجدياً.
          </p>
        </header>

        {/* شريط التبويب المحسن */}
        <div className="comparison-tabs-container">
          <div className="comparison-tabs">
            {Object.keys(comparisonData).map(tab => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => handleTabChange(tab)}
                aria-pressed={activeTab === tab}
              >
                <div className="tab-icon">
                  <i className={comparisonData[tab].icon}></i>
                </div>
                <span className="tab-text">{comparisonData[tab].title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="comparison-content">
          {/* عنوان المقارنة الحالية */}
          <h3 className="comparison-title">
            <span className="icon-wrapper">
              <i className={activeData.icon}></i>
            </span>
            <span className="title-text">{activeData.title}</span>
          </h3>

          {/* بطاقات المقارنة - أضفنا مرجع للتحريك */}
          <div className="comparison-cards-wrapper">
            <div className="comparison-cards" ref={comparisonCardsRef}>
              {/* بطاقة المباني الفندقية */}
              <div className="comparison-card hotel-card">
                <div className="card-header">
                  <h4>المباني الفندقية</h4>
                  <div className="card-header-icon">
                    <i className="fas fa-hotel"></i>
                  </div>
                </div>
                <div className="card-body">
                  <div className="percentage-visual">
                    <div className="percentage-label">
                      <span className="label-text">النسبة</span>
                      <span className="percentage-value">{activeData.hotelPercent}%</span>
                    </div>
                    <div className="percentage-bar">
                      <div 
                        className="percentage-fill" 
                        style={{ width: `${activeData.hotelPercent}%`, backgroundColor: '#E97A67' }}
                      ></div>
                    </div>
                  </div>
                  <p className="description">{activeData.hotelDescription}</p>
                  <div className="feature-list">
                    <div className="feature-item negative">
                      <i className="fas fa-times-circle"></i>
                      <span>إشغال متقلب وغير مستقر</span>
                    </div>
                    <div className="feature-item negative">
                      <i className="fas fa-times-circle"></i>
                      <span>تكاليف تشغيل وصيانة عالية</span>
                    </div>
                    <div className="feature-item negative">
                      <i className="fas fa-times-circle"></i>
                      <span>عدم ملاءمة للمناطق الصناعية</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* بطاقة النتائج والفروق */}
              <div className="comparison-card result-card">
                <div className="result-icon">
                  <i className={activeData.icon}></i>
                </div>
                <div className="result-difference">
                  <span className="difference-value" style={{ color: activeData.color }}>{activeData.difference}</span>
                  <span className="difference-text">{activeData.differenceText}</span>
                </div>
                <div className="divider"></div>
                <div className="result-conclusion">
                  <p>التحويل من فندقي إلى سكني يحقق أداءً أفضل بشكل ملحوظ في مناطق القطاع الصناعي</p>
                </div>

               
              </div>

              {/* بطاقة المباني السكنية */}
              <div className="comparison-card residential-card">
                <div className="card-header">
                  <h4>المباني السكنية</h4>
                  <div className="card-header-icon">
                    <i className="fas fa-building"></i>
                  </div>
                </div>
                <div className="card-body">
                  <div className="percentage-visual">
                    <div className="percentage-label">
                      <span className="label-text">النسبة</span>
                      <span className="percentage-value">{activeData.residentialPercent}%</span>
                    </div>
                    <div className="percentage-bar">
                      <div 
                        className="percentage-fill" 
                        style={{ width: `${activeData.residentialPercent}%`, backgroundColor: '#4D7C0F' }}
                      ></div>
                    </div>
                  </div>
                  <p className="description">{activeData.residentialDescription}</p>
                  <div className="feature-list">
                    <div className="feature-item positive">
                      <i className="fas fa-check-circle"></i>
                      <span>طلب مستمر من العاملين في المنطقة</span>
                    </div>
                    <div className="feature-item positive">
                      <i className="fas fa-check-circle"></i>
                      <span>تكاليف تشغيل أقل وإدارة أبسط</span>
                    </div>
                    <div className="feature-item positive">
                      <i className="fas fa-check-circle"></i>
                      <span>عقود طويلة الأجل مع الشركات</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* قسم للإحصائيات المتحركة - تحسين عرضها */}
          <div className="statistics-section">
            <h4 className="statistics-title">أرقام وإحصائيات</h4>
            <div className="comparison-stats">
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-arrow-circle-up"></i>
                </div>
                <div className="stat-value counter">95%</div>
                <div className="stat-label">معدل إشغال المجمعات السكنية</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-arrow-circle-down"></i>
                </div>
                <div className="stat-value counter">45%</div>
                <div className="stat-label">انخفاض في تكاليف التشغيل</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-chart-pie"></i>
                </div>
                <div className="stat-value counter">10.5%</div>
                <div className="stat-label">متوسط العائد السنوي</div>
              </div>
            </div>
          </div>

          {/* شرح مفصل للحالات الأنسب للتحويل - تحسين العرض والتفاعل */}
          <div className="conversion-cases">
            <h4 className="cases-title">الحالات المثالية لتحويل الرخصة</h4>
            <div className="cases-grid">
              <div className="case-item">
                <div className="case-icon">
                  <i className="fas fa-industry"></i>
                </div>
                <div className="Comparison-case-content">
                  <h5>القرب من المناطق الصناعية</h5>
                  <p>المباني القريبة من المصانع والشركات الكبرى تحقق أعلى معدلات الإشغال عند تحويلها إلى سكني.</p>
                </div>
                <span className="case-hover-icon"><i className="fas fa-plus"></i></span>
              </div>
              <div className="case-item">
                <div className="case-icon">
                  <i className="fas fa-hotel"></i>
                </div>
                <div className="Comparison-case-content">
                  <h5>فنادق ذات معدل إشغال منخفض</h5>
                  <p>الفنادق التي تعاني من انخفاض معدلات الإشغال في المناطق الصناعية ستستفيد بشكل كبير من التحويل.</p>
                </div>
                <span className="case-hover-icon"><i className="fas fa-plus"></i></span>
              </div>
              <div className="case-item">
                <div className="case-icon">
                  <i className="fas fa-building"></i>
                </div>
                <div className="Comparison-case-content">
                  <h5>المباني متعددة الطوابق</h5>
                  <p>المباني التي تتضمن عدة طوابق يمكن تحويلها إلى وحدات سكنية متكاملة للعمال والموظفين.</p>
                </div>
                <span className="case-hover-icon"><i className="fas fa-plus"></i></span>
              </div>
              <div className="case-item">
                <div className="case-icon">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <div className="Comparison-case-content">
                  <h5>المواقع الاستراتيجية</h5>
                  <p>المباني الواقعة على الطرق الرئيسية وقرب الخدمات العامة تكون مثالية للتحويل إلى مجمعات سكنية.</p>
                </div>
                <span className="case-hover-icon"><i className="fas fa-plus"></i></span>
              </div>
            </div>
          </div>

          {/* ملخص الخلاصة مع نص توجيهي */}
          <div className="comparison-summary">
            <div className="summary-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <div className="summary-content">
              <h4>الخلاصة</h4>
              <p>
                تُظهر المقارنة تفوقًا واضحًا للمباني السكنية على الفندقية في المناطق الصناعية من حيث معدلات الإشغال، والعائد على الاستثمار، وانخفاض تكاليف التشغيل، والمرونة والاستدامة البيئية.
                يعتبر تحويل الرخص من فندقي إلى سكني خيارًا استراتيجيًا سيحقق عوائد مالية أعلى ومستدامة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
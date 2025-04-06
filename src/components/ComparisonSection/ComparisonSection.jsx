import React, { useState, useEffect, useRef } from 'react';
import './ComparisonSection.css';
import StatHighlight from '../StatHighlight/StatHighlight';

const ComparisonSection = () => {
  const [activeTab, setActiveTab] = useState('targetAudience');
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const comparisonCardsRef = useRef(null);

  // بيانات المقارنة - تم تحديثها لتركز على الفرق بين الفنادق والسكن الجماعي للعمال
 // تعديل متغير comparisonData
const comparisonData = {
  targetAudience: {
    title: "الفئة المستهدفة",
    hotelPercent: 15,
    residentialPercent: 85, // تم تخفيضها من 95% للتوافق
    hotelDescription: "الفنادق تستهدف السياح والزوار المؤقتين، وهي فئة نادرة في المناطق الصناعية",
    residentialDescription: "السكن الجماعي مصمم خصيصاً لاحتياجات العمال والموظفين بالمناطق الصناعية",
    icon: "fas fa-users",
    difference: "+70%",
    differenceText: "زيادة في ملاءمة الفئة المستهدفة",
    color: "#4D7C0F"
  },
  occupancy: {
    title: "معدل الإشغال",
    hotelPercent: 35,
    residentialPercent: 95,
    hotelDescription: "معدل إشغال منخفض للفنادق في المناطق الصناعية لعدم وجود سياحة",
    residentialDescription: "إشغال شبه كامل للسكن الجماعي مع قوائم انتظار للعمال",
    icon: "fas fa-chart-line",
    difference: "+60%",
    differenceText: "زيادة في معدل الإشغال",
    color: "#4D7C0F"
  },
  operationalCosts: {
    title: "تكاليف التشغيل",
    hotelPercent: 65,
    residentialPercent: 35,
    hotelDescription: "تكاليف مرتفعة لخدمات فندقية غير ضرورية للعمال",
    residentialDescription: "تكاليف مخفضة تركز على احتياجات العمال الأساسية",
    icon: "fas fa-hand-holding-usd",
    difference: "-30%",
    differenceText: "انخفاض في تكاليف التشغيل",
    color: "#4D7C0F"
  },
  roi: {
    title: "العائد على الاستثمار",
    hotelPercent: 8.5,
    residentialPercent: 18,
    hotelDescription: "عائد منخفض بسبب قلة الإشغال وارتفاع التكاليف التشغيلية",
    residentialDescription: "عائد مستقر ومرتفع مع عقود طويلة الأمد للشركات والمصانع",
    icon: "fas fa-percentage",
    difference: "+9.5%",
    differenceText: "زيادة في العائد الاستثماري",
    color: "#4D7C0F"
  },
  proximity: {
    title: "القرب من مكان العمل",
    hotelPercent: 40,
    residentialPercent: 90,
    hotelDescription: "الفنادق غالباً ما تكون في مواقع بعيدة عن المناطق الصناعية",
    residentialDescription: "السكن الجماعي يوفر إقامة قريبة من المصانع مما يقلل وقت التنقل",
    icon: "fas fa-map-marker-alt",
    difference: "+50%",
    differenceText: "تحسين في القرب من أماكن العمل",
    color: "#4D7C0F"
  },
  workerPreference: {
    title: "تفضيلات العمال",
    hotelPercent: 15,
    residentialPercent: 85,
    hotelDescription: "العمال لا يفضلون الإقامة في الفنادق بسبب التكلفة والتصميم غير المناسب",
    residentialDescription: "العمال يفضلون السكن الجماعي المصمم خصيصاً لاحتياجاتهم",
    icon: "fas fa-thumbs-up",
    difference: "+70%",
    differenceText: "زيادة في رضا العاملين",
    color: "#4D7C0F"
  }
};
  // مراقبة ظهور القسم في الشاشة للتحريك
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVisible && comparisonCardsRef.current) {
      comparisonCardsRef.current.classList.add('tab-changing');
      setTimeout(() => {
        comparisonCardsRef.current.classList.remove('tab-changing');
      }, 600);
    }
  }, [activeTab, isVisible]);

  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  const activeData = comparisonData[activeTab];

  return (
    <section id="comparison" className={`comparison-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
      <div className="comparison-bg-pattern"></div>
      <div className="container">
        <header className="section-header">
          <h2 className="section-title">مقارنة بين الفنادق والسكن الجماعي للعمال</h2>
          <p className="section-description">
            تحليل مفصل يوضح لماذا تعتبر عملية تحويل الرخصة من فندقي إلى سكن جماعي للعمال استثماراً مُجدياً 
            في المناطق الصناعية، حيث أن احتياجات وتفضيلات العمال تختلف تماماً عن الفئة المستهدفة للفنادق التقليدية.
          </p>
        </header>

        <div className="comparison-tabs-container">
          <div className="comparison-tabs">
            {Object.keys(comparisonData).map(tab => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => handleTabChange(tab)}
                aria-label={`عرض تبويب ${comparisonData[tab].title}`}
              >
                <span className="tab-icon">
                  <i className={comparisonData[tab].icon}></i>
                </span>
                <span>{comparisonData[tab].title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="comparison-cards-wrapper" ref={comparisonCardsRef}>
          <div className="comparison-cards">
            <div className="comparison-card hotel-card">
              <div className="card-header">
                <div className="card-header-icon">
                  <i className="fas fa-hotel"></i>
                </div>
                <h4>المباني الفندقية</h4>
              </div>
              <div className="card-body">
                <div className="percentage-visual enhanced">
                  <div className="percentage-label">
                    <span className="label-text">معدل الملاءمة</span>
                    <div className="tooltip-info">
                      <i className="fas fa-info-circle"></i>
                      <span className="tooltip-text">يوضح مدى ملاءمة الفنادق للمناطق الصناعية من حيث النموذج التشغيلي</span>
                    </div>
                  </div>
                  <div className="percentage-bar">
                    <div 
                      className="percentage-fill" 
                      style={{width: isVisible ? `${activeData.hotelPercent}%` : '0%'}}
                    ></div>
                  </div>
                  <div className="percentage-value-container">
                    <div className="percentage-value">{activeData.hotelPercent}%</div>
                    <div className="percentage-metric">معدل الملاءمة</div>
                  </div>
                </div>
                <p className="description">
                  {activeData.hotelDescription}
                </p>
                <ul className="feature-list">
                  <li className="feature-item negative">
                    <i className="fas fa-times-circle"></i>
                    <span>لا تناسب احتياجات العمال في المناطق الصناعية</span>
                  </li>
                  <li className="feature-item negative">
                    <i className="fas fa-times-circle"></i>
                    <span>تكاليف إقامة مرتفعة لا تتناسب مع دخل العمال</span>
                  </li>
                  <li className="feature-item negative">
                    <i className="fas fa-times-circle"></i>
                    <span>عدم وجود الطلب السياحي في المناطق الصناعية</span>
                  </li>
                  <li className="feature-item negative">
                    <i className="fas fa-times-circle"></i>
                    <span>صعوبة استدامة التشغيل بسبب انخفاض معدلات الإشغال</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="comparison-card residential-card">
              <div className="card-header">
                <div className="card-header-icon">
                  <i className="fas fa-home"></i>
                </div>
                <h4>السكن الجماعي للعمال</h4>
              </div>
              <div className="card-body">
                <div className="percentage-visual enhanced">
                  <div className="percentage-label">
                    <span className="label-text">معدل الملاءمة</span>
                    <div className="tooltip-info">
                      <i className="fas fa-info-circle"></i>
                      <span className="tooltip-text">يوضح مدى ملاءمة السكن الجماعي للعمال في المناطق الصناعية</span>
                    </div>
                  </div>
                  <div className="percentage-bar">
                    <div 
                      className="percentage-fill" 
                      style={{width: isVisible ? `${activeData.residentialPercent}%` : '0%'}}
                    ></div>
                  </div>
                  <div className="percentage-value-container">
                    <div className="percentage-value">{activeData.residentialPercent}%</div>
                    <div className="percentage-metric">معدل الملاءمة</div>
                  </div>
                </div>
                <p className="description">
                  {activeData.residentialDescription}
                </p>
                <ul className="feature-list">
                  <li className="feature-item positive">
                    <i className="fas fa-check-circle"></i>
                    <span>مصممة خصيصاً لتلبية احتياجات العمال والموظفين</span>
                  </li>
                  <li className="feature-item positive">
                    <i className="fas fa-check-circle"></i>
                    <span>أسعار معقولة ومناسبة لدخل العاملين بالمناطق الصناعية</span>
                  </li>
                  <li className="feature-item positive">
                    <i className="fas fa-check-circle"></i>
                    <span>طلب مستمر ومستقر من الشركات والمصانع</span>
                  </li>
                  <li className="feature-item positive">
                    <i className="fas fa-check-circle"></i>
                    <span>عقود طويلة الأمد توفر استقرار الإيرادات</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="result-card">
              <div className="result-icon">
                <i className={activeData.icon}></i>
              </div>
              <div className="result-difference">
                <span className="difference-value" style={{ color: activeData.color }}>{activeData.difference}</span>
                <span className="difference-text">{activeData.differenceText}</span>
              </div>
              <div className="divider"></div>
              <p className="result-conclusion">
                تحويل الرخص من فندقي إلى سكن جماعي للعمال في المناطق الصناعية يمثل استثماراً استراتيجياً يلبي احتياج سوقي حقيقي ويحقق عوائد مستدامة.
              </p>
              
            </div>
          </div>
        </div>

        <div className="statistics-section">
          <h3 className="statistics-title">أرقام تؤكد الفرق</h3>
          <div className="comparison-stats">
            <StatHighlight 
              value="95" 
              suffix="%" 
              label="نسبة إشغال المجمعات السكنية للعمال" 
              icon="fas fa-building"
              theme="success"
              description="تمثل معدل الإشغال المستدام للسكن الجماعي بسبب الطلب المرتفع من العمالة في المناطق الصناعية"
              animationDelay={300}
            />
            
            <StatHighlight 
              value="35" 
              suffix="%" 
              label="نسبة إشغال الفنادق في المناطق الصناعية" 
              icon="fas fa-hotel"
              theme="danger"
              description="متوسط معدل الإشغال المنخفض للفنادق بسبب عدم ملاءمتها لاحتياجات المناطق الصناعية"
              animationDelay={600}
            />
            
            <StatHighlight 
              value="9.5" 
              suffix="%+" 
              label="زيادة في العائد الاستثماري بعد التحويل" 
              icon="fas fa-money-bill-wave"
              theme="secondary"
              description="النسبة المتوقعة لتحسن عائد الاستثمار بعد تحويل الرخصة من فندق إلى سكن جماعي للعمال"
              animationDelay={900}
            />
            
            <StatHighlight 
              value="1,450" 
              suffix="+" 
              label="عدد المصانع التي تحتاج لسكن عمال قريب" 
              icon="fas fa-industry"
              theme="primary"
              description="تقدير لعدد المنشآت الصناعية في منطقة الرياض التي تبحث عن حلول سكنية قريبة لموظفيها"
              animationDelay={1200}
            />
          </div>
        </div>

        <div className="conversion-metrics">
          <h3 className="metrics-title">مؤشرات أداء تحويل الرخص</h3>
          
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-header">
                <i className="fas fa-calendar-alt"></i>
                <h4>متوسط مدة استرجاع رأس المال</h4>
              </div>
              
              <div className="metric-comparison">
                <div className="metric-item hotel">
                  <div className="metric-value">7 : 9</div>
                  <div className="metric-unit">سنوات</div>
                  <div className="metric-label">الفنادق</div>
                </div>
                
                <div className="metric-vs">
                  <i className="fas fa-exchange-alt"></i>
                </div>
                
                <div className="metric-item residence">
                  <div className="metric-value">3 : 5</div>
                  <div className="metric-unit">سنوات</div>
                  <div className="metric-label">السكن الجماعي</div>
                </div>
              </div>
              
              <div className="metric-indicator">
                <div className="indicator-bar">
                  <div className="indicator-fill success" style={{width: '60%'}}></div>
                </div>
                <div className="indicator-text">تحسن بنسبة 45%</div>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-header">
                <i className="fas fa-chart-pie"></i>
                <h4>معدل الربح التشغيلي السنوي</h4>
              </div>
              
              <div className="metric-comparison">
                <div className="metric-item hotel">
                  <div className="metric-value">8 : 12</div>
                  <div className="metric-unit">%</div>
                  <div className="metric-label">الفنادق</div>
                </div>
                
                <div className="metric-vs">
                  <i className="fas fa-exchange-alt"></i>
                </div>
                
                <div className="metric-item residence">
                  <div className="metric-value">18 : 25</div>
                  <div className="metric-unit">%</div>
                  <div className="metric-label">السكن الجماعي</div>
                </div>
              </div>
              
              <div className="metric-indicator">
                <div className="indicator-bar">
                  <div className="indicator-fill success" style={{width: '70%'}}></div>
                </div>
                <div className="indicator-text">تحسن بنسبة 85%</div>
              </div>
            </div>
          </div>
        </div>

        {/* تصحيح هيكل قسم حالات التحويل */}
        <div className="conversion-cases">
          <h3 className="cases-title">حالات مناسبة للتحويل إلى سكن جماعي للعمال</h3>
          <div className="cases-grid">
            <div className="case-item">
              <div className="case-icon">
                <i className="fas fa-hotel"></i>
              </div>
              <div className="Comparison-case-content">
                <h5>فنادق بمعدل إشغال منخفض</h5>
                <p>الفنادق في المناطق الصناعية تعاني من انخفاض معدلات الإشغال لعدم وجود طلب حقيقي من سوق السياحة.</p>
              </div>
              <span className="case-hover-icon"><i className="fas fa-plus"></i></span>
            </div>
            
            <div className="case-item">
              <div className="case-icon">
                <i className="fas fa-building"></i>
              </div>
              <div className="Comparison-case-content">
                <h5>المباني متعددة الطوابق</h5>
                <p>مناسبة للتحويل إلى وحدات سكنية للعمال مع تقسيمات تلبي احتياجاتهم ومتطلبات الشركات.</p>
              </div>
              <span className="case-hover-icon"><i className="fas fa-plus"></i></span>
            </div>
          
            <div className="case-item">
              <div className="case-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="Comparison-case-content">
                <h5>المناطق ذات الكثافة العمالية</h5>
                <p>المناطق التي تضم أعداداً كبيرة من العمال تعاني من نقص شديد في خيارات السكن المناسبة والمخصصة لهم.</p>
              </div>
              <span className="case-hover-icon"><i className="fas fa-plus"></i></span>
            </div>
            
            <div className="case-item">
              <div className="case-icon">
                <i className="fas fa-hand-holding-usd"></i>
              </div>
              <div className="Comparison-case-content">
                <h5>فرص الاستثمار طويلة الأمد</h5>
                <p>السكن الجماعي للعمال يوفر فرصاً استثمارية مستدامة من خلال عقود طويلة الأجل مع الشركات والمصانع.</p>
              </div>
              <span className="case-hover-icon"><i className="fas fa-plus"></i></span>
            </div>
          </div>
        </div>

        <div className="comparison-summary">
          <div className="summary-icon">
            <i className="fas fa-lightbulb"></i>
          </div>
          <div className="summary-content">
            <h4>خلاصة المقارنة</h4>
            <p>
              تحويل المباني من فنادق إلى سكن جماعي للعمال في المناطق الصناعية ليس مجرد تغيير في نوع الرخصة، بل هو تحويل استراتيجي من نموذج أعمال غير ملائم للمنطقة (الفنادق في مناطق غير سياحية) إلى نموذج مطلوب بشدة ويلبي احتياجاً حقيقياً للعمال والشركات. العمال يبحثون عن سكن جماعي مناسب وليس فنادق، والاستثمار في هذا التحويل سيؤدي إلى زيادة كبيرة في العوائد المالية واستقرار النموذج التشغيلي.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
import { useState, useEffect, useRef } from 'react';
import './Properties.css';

const Properties = ({ properties }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const propertiesPerPage = 3;
  const sectionRef = useRef(null);
  const propertiesGridRef = useRef(null);
  
  // محاكاة التحميل
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // إعادة ضبط حالة تحميل الصورة عند تغيير العقار المحدد
  useEffect(() => {
    setImageLoaded(false);
  }, [selectedProperty]);
  
  // تأثير ظهور متدرج عند ظهور القسم في مجال الرؤية
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1
      }
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
  
  // حساب الصفحات
  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
  
  // التنقل بين الصفحات مع تأثير انتقال بدون عمل scroll
  const paginate = (pageNumber) => {
    if (pageNumber === currentPage) return;
    setIsPageChanging(true);
    
    // التأكد من أن المستخدم يبقى في نفس الموقع على الصفحة
    const currentScrollPosition = window.scrollY;
    
    setTimeout(() => {
      setCurrentPage(pageNumber);
      
      // إعادة التمرير إلى نفس الموقع بعد تغيير الصفحة
      window.scrollTo(0, currentScrollPosition);
      
      setTimeout(() => {
        setIsPageChanging(false);
      }, 500);
    }, 400);
  };
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };
  
  // حساب الإحصائيات
  const calculateStats = () => {
    const totalPlots = properties.length || 15; // إذا لم تتوفر بيانات، استخدم 15
    
    // حساب المساحة الإجمالية
    const totalArea = properties.length ? properties.reduce((sum, property) => {
      const area = parseFloat(property.property.area.replace(/,/g, ''));
      return sum + (isNaN(area) ? 0 : area);
    }, 0) : 37750; // إذا لم تتوفر بيانات، استخدم 37,750
    
    // تقدير عدد العمال - طاقة استيعابية (10 عمال لكل 100 متر مربع)
    const estimatedWorkers = Math.round(totalArea / 100 * 10);
    
    // تقدير عدد المستفيدين (العمال + العائلات والأفراد المرتبطين)
    const estimatedBeneficiaries = Math.round(estimatedWorkers * 3);
    
    return {
      totalPlots,
      totalArea: totalArea.toLocaleString('ar-SA'),
      estimatedWorkers: estimatedWorkers.toLocaleString('ar-SA'),
      estimatedBeneficiaries: estimatedBeneficiaries.toLocaleString('ar-SA')
    };
  };

  const stats = calculateStats();
  
  // عرض تفاصيل العقار
  const showPropertyDetails = (property) => {
    setSelectedProperty(property);
    document.body.style.overflow = 'hidden'; // منع التمرير خلف النافذة المنبثقة
  };

  // إغلاق نافذة التفاصيل
  const closePropertyDetails = () => {
    setSelectedProperty(null);
    setIsFullscreen(false);
    document.body.style.overflow = ''; // استعادة التمرير العادي
  };
  
  // الحصول على مسار صورة الوثيقة
  const getDocumentImagePath = (propertyId) => {
    const imgUrls = [
      "https://res.cloudinary.com/dk2cdwufj/image/upload/v1743509781/deed-1-thumb_dn7rmv.jpg",
      "https://res.cloudinary.com/dk2cdwufj/image/upload/v1743509783/deed-2-thumb_zhgyqk.jpg",
      "https://res.cloudinary.com/dk2cdwufj/image/upload/v1743509781/deed-3-thumb_ztlbht.jpg",
      "https://res.cloudinary.com/dk2cdwufj/image/upload/v1743509784/deed-4-thumb_mbtmfl.jpg",
      "https://res.cloudinary.com/dk2cdwufj/image/upload/v1743509786/deed-5-thumb_r358yx.jpg",
      "https://res.cloudinary.com/dk2cdwufj/image/upload/v1743509783/deed-6-thumb_vhw26k.jpg",
      "https://res.cloudinary.com/dk2cdwufj/image/upload/v1743509786/deed-7-thumb_m40rcz.jpg",
      "https://res.cloudinary.com/dk2cdwufj/image/upload/v1743509785/deed-8-thumb_b96krr.jpg",
      "https://res.cloudinary.com/dk2cdwufj/image/upload/v1743509785/deed-9-thumb_hicwlu.jpg",
      "https://res.cloudinary.com/dk2cdwufj/image/upload/v1743509788/deed-10-thumb_eszp1c.jpg",
      "https://res.cloudinary.com/dk2cdwufj/image/upload/v1743509786/deed-11-thumb_zqkaoq.jpg",
      "https://res.cloudinary.com/dk2cdwufj/image/upload/v1743509787/deed-12-thumb_jmvqib.jpg",
      "https://res.cloudinary.com/dk2cdwufj/image/upload/v1743509788/deed-13-thumb_cys6ty.jpg",
      "https://res.cloudinary.com/dk2cdwufj/image/upload/v1743509789/deed-14-thumb_n5mbwm.jpg",
      "https://res.cloudinary.com/dk2cdwufj/image/upload/v1743509789/deed-15-thumb_ausi3o.jpg"
    ];
    
    // استخراج الرقم من معرف العقار (على افتراض أن المعرف هو "deed-X")
    const idNumber = propertyId.replace(/\D/g, '');
    
    return `${imgUrls[idNumber % imgUrls.length]}`;
  };
  
  // تبديل حالة العرض بملء الشاشة
  const toggleFullscreen = (e) => {
    e.stopPropagation();
    setIsFullscreen(!isFullscreen);
  };

  // دالة للتعامل مع إمكانية الوصول باستخدام لوحة المفاتيح لبطاقات العقارات
  const handleCardKeyPress = (e, property) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showPropertyDetails(property);
    }
  };

  // دالة للحصول على تدرجات ألوان متحركة للعقارات
  const getAnimatedGradient = (index) => {
    const gradients = [
      'linear-gradient(120deg, rgba(86, 95, 88, 0.95), rgba(86, 95, 88, 0.8))',
      'linear-gradient(120deg, rgba(200, 176, 154, 0.95), rgba(200, 176, 154, 0.8))',
      'linear-gradient(120deg, rgba(86, 95, 88, 0.9), rgba(98, 110, 100, 0.8))'
    ];
    return gradients[index % gradients.length];
  };

  // مميزات الموقع
  const siteFeatures = [
    { id: 1, icon: "fas fa-industry", text: "بالقرب من المنطقة الصناعية الثانية بالرياض" },
    { id: 2, icon: "fas fa-road", text: "الأراضي واقعة على الدائري الثاني" },
    { id: 3, icon: "fas fa-hospital", text: "قرب الخدمات الأساسية من مستشفيات ومراكز تسوق" },
    { id: 4, icon: "fas fa-chart-line", text: "منطقة نمو اقتصادي وتطوير مستمر" },
    { id: 5, icon: "fas fa-home", text: "ارتفاع الطلب على السكن في المنطقة" },
    { id: 6, icon: "fas fa-money-bill-wave", text: "بيئة استثمارية واعدة ومستقرة" }
  ];

  // فوائد تحويل الرخصة
  const benefitCards = [
    {
      id: 1, 
      title: "رفع العائد الاستثماري", 
      icon: "fas fa-chart-pie",
      description: "المجمعات السكنية أكثر استدامة وربحية من الفنادق في المناطق الصناعية، مع معدل إشغال أعلى بكثير وتكاليف تشغيل أقل."
    },
    {
      id: 2, 
      title: "تحسين بيئة العمل", 
      icon: "fas fa-briefcase",
      description: "توفير سكن قريب للموظفين والعمال يؤدي إلى تحسين الاستقرار الوظيفي وزيادة الإنتاجية والرضا الوظيفي."
    },
    {
      id: 3, 
      title: "تقليل الازدحام المروري", 
      icon: "fas fa-car",
      description: "انتقال العمال للعيش داخل المجمع بالقرب من مقر عملهم يقلل من الازدحام المروري والتنقلات اليومية الطويلة."
    },
    {
      id: 4, 
      title: "تنشيط التجارة المحلية", 
      icon: "fas fa-store",
      description: "زيادة السكان المقيمين تحفز النشاط التجاري للمحلات التجارية في الحي وتساهم في تطوير المنطقة اقتصادياً."
    },
    {
      id: 5, 
      title: "الاستدامة البيئية", 
      icon: "fas fa-leaf",
      description: "تقليل التنقلات اليومية يساهم في تقليل الانبعاثات الكربونية والحفاظ على البيئة، متوافقاً مع أهداف رؤية 2030."
    },
    {
      id: 6, 
      title: "تحقيق مبدأ المدن الذكية", 
      icon: "fas fa-city",
      description: "إنشاء بيئة سكنية متكاملة بجوار المصانع يدعم مفهوم المدن الذكية والمستدامة ويحقق تكامل المرافق والخدمات."
    }
  ];

  return (
    <section id="properties" ref={sectionRef} className="section properties-section">
      <div className="container">
        {/* عنوان القسم والوصف */}
        <h2 className="section-title">قطع الأراضي المتاحة</h2>
        <p className="section-description">
          تتوفر 15 قطعة أرض في حي المصفاة بجنوب الرياض وبجوار المنطقة الصناعية الثانية، بمساحة إجمالية تقارب 37,750 متر مربع، مثالية لتطوير مجمعات سكنية عالية الجودة للعمال والموظفين.
        </p>
        
        {/* بطاقات الإحصائيات */}
        <div className="property-stats-row">
          <div className="property-stat-card">
            <div className="stat-card-icon">
              <i className="fas fa-map-marked-alt"></i>
            </div>
            <div className="stat-card-content">
              <h4>عدد قطع الأراضي</h4>
              <div className="stat-value">{stats.totalPlots}</div>
              <div className="stat-description">قطعة متاحة للتحويل</div>
            </div>
          </div>
          
          <div className="property-stat-card">
            <div className="stat-card-icon">
              <i className="fas fa-ruler-combined"></i>
            </div>
            <div className="stat-card-content">
              <h4>المساحة الإجمالية</h4>
              <div className="stat-value">{stats.totalArea}</div>
              <div className="stat-description">متر مربع</div>
            </div>
          </div>
          
          <div className="property-stat-card" title="عدد العمال والموظفين الذين يمكن استيعابهم في المجمعات السكنية">
            <div className="stat-card-icon">
              <i className="fas fa-hard-hat"></i>
            </div>
            <div className="stat-card-content">
              <h4>طاقة استيعابية</h4>
              <div className="stat-value">{stats.estimatedWorkers}</div>
              <div className="stat-description">عامل وموظف</div>
            </div>
          </div>
          
          <div className="property-stat-card" title="إجمالي المستفيدين بما يشمل العمال وعائلاتهم والخدمات المرتبطة">
            <div className="stat-card-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-card-content">
              <h4>المستفيدون المتوقعون</h4>
              <div className="stat-value">{stats.estimatedBeneficiaries}</div>
              <div className="stat-description">فرد مستفيد</div>
            </div>
          </div>
        </div>
        
        {/* مميزات الموقع */}
        <div className="site-features-section">
          <h3 className="features-title">مميزات الموقع</h3>
          <div className="features-container">
            {siteFeatures.map(feature => (
              <div className="feature-item" key={feature.id}>
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <p className="feature-text">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* قطع الأراضي المعروضة */}
        <h3 className="section-subtitle">القطع المتاحة للتحويل</h3>
        <div className={`properties-grid ${isPageChanging ? 'page-transitioning' : ''}`} ref={propertiesGridRef}>
          {loading || isPageChanging ? (
            // حالة التحميل - الهياكل العظمية
            Array(3).fill(0).map((_, index) => (
              <div key={`skeleton-${index}`} className="property-card skeleton-card">
                <div className="property-card-header skeleton"></div>
                <div className="property-card-content">
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line"></div>
                </div>
                <div className="property-card-footer">
                  <div className="skeleton-button"></div>
                </div>
                <div className="card-decoration"></div>
              </div>
            ))
          ) : currentProperties.length > 0 ? (
            // بطاقات العقارات
            currentProperties.map((property, index) => (
              <div 
                key={property.id} 
                className="property-card"
                onClick={() => showPropertyDetails(property)}
                onKeyPress={(e) => handleCardKeyPress(e, property)}
                tabIndex={0}
                role="button"
                aria-label={`عرض تفاصيل قطعة الأرض رقم ${property.property.plotNumber}`}
                style={{
                  '--card-animation-delay': `${index * 0.15}s`,
                  '--card-header-bg': getAnimatedGradient(index)
                }}
              >
                <div className="card-decoration"></div>
                <div className="property-card-header">
                  <div className="header-content">
                    <h3>قطعة رقم: {property.property.plotNumber}</h3>
                    <div className="property-meta">
                      <span className="property-area">{property.property.area} م²</span>
                      <span className="property-divider">|</span>
                      <span className="property-neighborhood">{property.property.neighborhood}</span>
                    </div>
                  </div>
                  <span className="id-badge">{property.id}</span>
                </div>
                
                <div className="property-card-footer">
                  <div className="property-quick-info">
                    <span className="info-pill">
                      <i className="fas fa-map-marker-alt"></i> {property.property.city}
                    </span>
                    <span className="info-pill">
                      <i className="fas fa-check-circle"></i> متاح للتحويل
                    </span>
                  </div>
                  <button className="btn btn-primary">
                    <i className="fas fa-file-alt"></i>
                    <span>عرض الوثيقة</span>
                  </button>
                </div>
                
                <div className="card-shine"></div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>لا توجد نتائج</p>
            </div>
          )}
        </div>
        
        {/* أزرار التنقل بين الصفحات */}
        {!loading && properties.length > propertiesPerPage && (
          <div className="pagination" data-current-page={currentPage} data-total-pages={totalPages}>
            <button 
              className="pagination-button" 
              onClick={prevPage} 
              disabled={currentPage === 1 || isPageChanging}
              aria-label="الصفحة السابقة"
            >
              {isPageChanging ? (
                <span className="pagination-loading"></span>
              ) : (
                <>السابق</>
              )}
            </button>
            
            <div className="pagination-numbers">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => paginate(index + 1)}
                  disabled={isPageChanging}
                  aria-label={`الصفحة ${index + 1}`}
                  aria-current={currentPage === index + 1 ? "page" : null}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <button 
              className="pagination-button" 
              onClick={nextPage} 
              disabled={currentPage === totalPages || isPageChanging}
              aria-label="الصفحة التالية"
            >
              {isPageChanging ? (
                <span className="pagination-loading"></span>
              ) : (
                <>التالي</>
              )}
            </button>
          </div>
        )}
        
        {/* فوائد تحويل الرخصة */}
        <div className="license-benefits-section">
          <h3 className="benefits-title">فوائد تحويل الرخصة من فندقي إلى سكني</h3>
          <div className="benefits-grid">
            {benefitCards.map(benefit => (
              <div className="benefit-card" key={benefit.id}>
                <div className="benefit-header">
                  <div className="benefit-icon">
                    <i className={benefit.icon}></i>
                  </div>
                  <h4 className="benefit-title">{benefit.title}</h4>
                </div>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* نافذة منبثقة لعرض صورة الوثيقة - تصحيح الأخطاء في هيكل الترميز */}
      {selectedProperty && (
        <div className={`property-modal ${isFullscreen ? 'fullscreen' : ''}`}>
          <div className="modal-overlay" onClick={closePropertyDetails}></div>
          <div className="modal-content document-modal-content">
            <button 
              className="close-button" 
              onClick={closePropertyDetails}
              aria-label="إغلاق"
            >×</button>
            
            <h2 className="modal-title">وثيقة قطعة الأرض رقم: {selectedProperty.property.plotNumber}</h2>
            
            <div className="modal-body document-modal-body">
              {!imageLoaded && (
                <div className="document-loading">
                  <div className="document-loading-spinner"></div>
                  <p>جاري تحميل الوثيقة...</p>
                </div>
              )}
              
              <div className={`document-container ${imageLoaded ? 'loaded' : ''}`}>
                <div className={`document-wrapper ${isFullscreen ? 'fullscreen' : ''}`}>
                  <img 
                    src={getDocumentImagePath(selectedProperty.id)} 
                    alt={`وثيقة قطعة الأرض ${selectedProperty.property.plotNumber}`}
                    className="document-image"
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/public/documents/deed-default-thumb.jpg';
                      setImageLoaded(true);
                    }}
                  />
                  
                  {/* تصحيح أخطاء أزرار التحكم في العرض بملء الشاشة */}
                  <div 
                    className="document-fullscreen-control" 
                    onClick={toggleFullscreen}
                    role="button"
                    aria-label={isFullscreen ? "الخروج من وضع ملء الشاشة" : "عرض بملء الشاشة"}
                    tabIndex={0}
                  >
                    <div className="fullscreen-icon">
                      {isFullscreen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path fill="currentColor" d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path fill="currentColor" d="M5,5H10V7H7V10H5V5M19,5V10H17V7H14V5H19M17,19H14V17H19V14H17V19M5,14H7V17H10V19H5V14Z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  <div className="document-controls">
                    <a 
                      href={getDocumentImagePath(selectedProperty.id)} 
                      download={`وثيقة-${selectedProperty.property.plotNumber}.jpg`}
                      className="document-control-button"
                      title="تحميل الوثيقة"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="تحميل الوثيقة"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                        <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div className="document-meta">
                  <p>رقم القطعة: <strong>{selectedProperty.property.plotNumber}</strong> | الحي: <strong>{selectedProperty.property.neighborhood}</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Properties;

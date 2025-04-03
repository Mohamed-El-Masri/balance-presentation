import React, { useState } from 'react';
import './PropertiesSection.css';
import propertyData from '../../assets/properties.json'; // Using the existing properties data

function PropertiesSection() {
  const [activeProperty, setActiveProperty] = useState(null);
  
  const handlePropertyClick = (property) => {
    setActiveProperty(activeProperty === property.property.propertyId ? null : property.property.propertyId);
  };
  
  const totalArea = propertyData.reduce((sum, item) => sum + item.property.area, 0);
  
  return (
    <section className="properties-section" id="properties">
      <div className="container">
        <h2 className="section-title">قطع الأراضي المتاحة</h2>
        <p className="section-description">
          تتوفر 15 قطعة أرض في حي المصفاة بجنوب الرياض وبجوار المنطقة الصناعية الثانية، 
          بمساحة إجمالية تقارب 37,750 متر مربع، مثالية لتطوير مجمعات سكنية عالية الجودة للعمال والموظفين.
        </p>
        
        <div className="properties-summary">
          <div className="summary-card">
            <div className="summary-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="summary-info">
              <h3>15</h3>
              <p>قطعة أرض</p>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon">
              <i className="fas fa-ruler-combined"></i>
            </div>
            <div className="summary-info">
              {/* <h3>{totalArea.toLocaleString()}</h3> */}
              <h3>37,782</h3>
              <p>متر مربع إجمالي</p>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon">
              <i className="fas fa-building"></i>
            </div>
            <div className="summary-info">
              <h3>~2,500</h3>
              <p>متر مربع متوسط المساحة</p>
            </div>
          </div>
        </div>
        
        <div className="properties-location">
          <h3>الموقع الاستراتيجي</h3>
          <div className="location-info">
            <div className="location-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14503.83397087812!2d46.76217011954689!3d24.619530190278436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2fa1af9e8ebf2d%3A0x948f2add633d4e0!2z2K3ZiiDYp9mE2YXYtdmB2KfYqdiMINin2YTYsdmK2KfYtg!5e0!3m2!1sar!2ssa!4v1634238136781!5m2!1sar!2ssa"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="موقع قطع الأراضي"
              ></iframe>
            </div>
            <div className="location-advantages">
              <h4>مميزات الموقع:</h4>
              <ul>
                <li>
                  <i className="fas fa-check-circle"></i>
                  بالقرب من المنطقة الصناعية الثانية بالرياض
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  سهولة الوصول للطرق الرئيسية
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  قرب الخدمات الأساسية من مستشفيات ومراكز تسوق
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  منطقة نمو اقتصادي وتطوير مستمر
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  ارتفاع الطلب على السكن في المنطقة
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  بيئة استثمارية واعدة ومستقرة
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="properties-list">
          <h3>تفاصيل قطع الأراضي</h3>
          <div className="property-cards">
            {propertyData.map((item, index) => (
              <div 
                key={item.property.propertyId} 
                className={`property-card ${activeProperty === item.property.propertyId ? 'active' : ''}`}
                onClick={() => handlePropertyClick(item)}
              >
                <div className="property-header">
                  <h4>قطعة رقم {item.property.propertyId}</h4>
                  <span className="expand-icon">
                    <i className={`fas fa-chevron-${activeProperty === item.property.propertyId ? 'up' : 'down'}`}></i>
                  </span>
                </div>
                
                <div className="property-content">
                  <div className="property-features">
                    <div className="property-feature">
                      <i className="fas fa-ruler-combined"></i>
                      <span>المساحة: {item.property.area} متر مربع</span>
                    </div>
                    
                    <div className="property-feature">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>الموقع: {item.property.city} - {item.property.neighborhood}</span>
                    </div>
                    
                    <div className="property-feature">
                      <i className="fas fa-road"></i>
                      <span>الطريق: {item.property.street || 'غير محدد'}</span>
                    </div>
                  </div>
                  
                  {activeProperty === item.property.propertyId && (
                    <div className="property-details">
                      <p>
                        قطعة أرض مميزة تقع في حي المصفاة بجنوب الرياض، مثالية لإقامة مجمع سكني 
                        للعمال والموظفين بالقرب من المنطقة الصناعية. الموقع الاستراتيجي يتيح 
                        سهولة الوصول للمصانع والشركات المحيطة.
                      </p>
                      <div className="property-potential">
                        <h5>الإمكانيات التطويرية:</h5>
                        <ul>
                          <li>إقامة مجمع سكني متكامل للعمال والموظفين</li>
                          <li>توفير ما يقارب 200-250 غرفة سكنية</li>
                          <li>إنشاء مرافق خدمية (مطعم، مغسلة، صالة ترفيهية)</li>
                          <li>عائد استثماري متوقع: 9-12% سنوياً</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="conversion-benefits">
          <h3>فوائد تحويل الرخصة من فندقي إلى سكني</h3>
          <div className="benefits-boxes">
            <div className="benefit-box">
              <div className="benefit-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h4>رفع العائد الاستثماري</h4>
              <p>
                المجمعات السكنية أكثر استدامة وربحية من الفنادق في المناطق الصناعية، 
                مع معدل إشغال أعلى بكثير وتكاليف تشغيل أقل.
              </p>
            </div>
            
            <div className="benefit-box">
              <div className="benefit-icon">
                <i className="fas fa-users"></i>
              </div>
              <h4>تحسين بيئة العمل</h4>
              <p>
                توفير سكن قريب للموظفين والعمال يؤدي إلى تحسين الاستقرار الوظيفي
                وزيادة الإنتاجية والرضا الوظيفي.
              </p>
            </div>
            
            <div className="benefit-box">
              <div className="benefit-icon">
                <i className="fas fa-car"></i>
              </div>
              <h4>تقليل الازدحام المروري</h4>
              <p>
                انتقال العمال للعيش داخل المجمع بالقرب من مقر عملهم يقلل 
                من الازدحام المروري والتنقلات اليومية الطويلة.
              </p>
            </div>
            
            <div className="benefit-box">
              <div className="benefit-icon">
                <i className="fas fa-store"></i>
              </div>
              <h4>تنشيط التجارة المحلية</h4>
              <p>
                زيادة السكان المقيمين تحفز النشاط التجاري للمحلات التجارية في الحي
                وتساهم في تطوير المنطقة اقتصادياً.
              </p>
            </div>
            
            <div className="benefit-box">
              <div className="benefit-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h4>الاستدامة البيئية</h4>
              <p>
                تقليل التنقلات اليومية يساهم في تقليل الانبعاثات الكربونية 
                والحفاظ على البيئة، متوافقاً مع أهداف رؤية 2030.
              </p>
            </div>
            
            <div className="benefit-box">
              <div className="benefit-icon">
                <i className="fas fa-city"></i>
              </div>
              <h4>تحقيق مبدأ المدن الذكية</h4>
              <p>
                إنشاء بيئة سكنية متكاملة بجوار المصانع يدعم مفهوم المدن الذكية والمستدامة
                ويحقق تكامل المرافق والخدمات.
              </p>
            </div>
          </div>
        </div>
        
        
      </div>
    </section>
  );
}

export default PropertiesSection;

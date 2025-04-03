import React, { useState } from 'react';
import './ComparisonSection.css';

function ComparisonSection() {
  const [activeTab, setActiveTab] = useState('financial');
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <section className="comparison-section" id="comparison">
      <div className="container">
        <h2 className="section-title">مقارنة بين المباني الفندقية والسكنية</h2>
        <p className="section-description">
          تحليل شامل للفروقات بين المباني الفندقية والمجمعات السكنية في المناطق الصناعية،
          يوضح المزايا المالية والتشغيلية والاجتماعية للتحويل من فندقي إلى سكني.
        </p>
        
        <div className="tabs-container">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'financial' ? 'active' : ''}`}
              onClick={() => handleTabChange('financial')}
            >
              <i className="fas fa-chart-line"></i>
              المزايا المالية
            </button>
            <button 
              className={`tab-btn ${activeTab === 'operational' ? 'active' : ''}`}
              onClick={() => handleTabChange('operational')}
            >
              <i className="fas fa-cogs"></i>
              الجوانب التشغيلية
            </button>
            <button 
              className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`}
              onClick={() => handleTabChange('social')}
            >
              <i className="fas fa-users"></i>
              التأثير الاجتماعي
            </button>
          </div>
          
          <div className="tabs-content">
            {activeTab === 'financial' && (
              <div className="tab-content">
                <div className="comparison-table-container">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        <th className="metric-header">معيار المقارنة</th>
                        <th>المباني الفندقية</th>
                        <th>المجمعات السكنية</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="metric-name">متوسط معدل الإشغال</td>
                        <td>40-55% <span className="trend negative">↓</span></td>
                        <td>85-95% <span className="trend positive">↑</span></td>
                      </tr>
                      <tr>
                        <td className="metric-name">معدل العائد على الاستثمار</td>
                        <td>4-6% سنوياً <span className="trend negative">↓</span></td>
                        <td>9-12% سنوياً <span className="trend positive">↑</span></td>
                      </tr>
                      <tr>
                        <td className="metric-name">تكاليف التشغيل</td>
                        <td>35-45% من الإيرادات <span className="trend negative">↑</span></td>
                        <td>15-25% من الإيرادات <span className="trend positive">↓</span></td>
                      </tr>
                      <tr>
                        <td className="metric-name">فترة استرداد رأس المال</td>
                        <td>12-15 سنة <span className="trend negative">↑</span></td>
                        <td>6-8 سنوات <span className="trend positive">↓</span></td>
                      </tr>
                      <tr>
                        <td className="metric-name">استقرار التدفقات النقدية</td>
                        <td>منخفض - متقلب <span className="trend negative">↓</span></td>
                        <td>مرتفع - مستقر <span className="trend positive">↑</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="financial-highlights">
                  <h4>إحصائيات واقعية من السوق المحلي</h4>
                  <div className="highlights-grid">
                    <div className="highlight-card">
                      <h5>معدل الإشغال الحالي للفنادق في المنطقة</h5>
                      <div className="highlight-value">42%</div>
                      <p>بسبب قلة الطلب على الغرف الفندقية في المناطق الصناعية</p>
                    </div>
                    
                    <div className="highlight-card">
                      <h5>معدل الإشغال للمجمعات السكنية للعمال</h5>
                      <div className="highlight-value">87%</div>
                      <p>نظراً للطلب المرتفع على السكن بالقرب من مواقع العمل</p>
                    </div>
                    
                    <div className="highlight-card">
                      <h5>فرق العائد الاستثماري</h5>
                      <div className="highlight-value">+6.4%</div>
                      <p>متوسط الفرق في العائد على الاستثمار لصالح المجمعات السكنية</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'operational' && (
              <div className="tab-content">
                <div className="comparison-table-container">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        <th className="metric-header">معيار المقارنة</th>
                        <th>المباني الفندقية</th>
                        <th>المجمعات السكنية</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="metric-name">حجم فريق العمل المطلوب</td>
                        <td>كبير (30-40 موظف لكل 100 غرفة) <span className="trend negative">↑</span></td>
                        <td>متوسط (10-15 موظف لكل 100 وحدة) <span className="trend positive">↓</span></td>
                      </tr>
                      <tr>
                        <td className="metric-name">تكاليف الصيانة</td>
                        <td>مرتفعة ودورية <span className="trend negative">↑</span></td>
                        <td>متوسطة وأقل تكراراً <span className="trend positive">↓</span></td>
                      </tr>
                      <tr>
                        <td className="metric-name">استهلاك الكهرباء والمياه</td>
                        <td>مرتفع <span className="trend negative">↑</span></td>
                        <td>معتدل <span className="trend positive">↓</span></td>
                      </tr>
                      <tr>
                        <td className="metric-name">نسبة دوران المستأجرين</td>
                        <td>مرتفعة جداً (يومية) <span className="trend negative">↑</span></td>
                        <td>منخفضة (تعاقدات طويلة) <span className="trend positive">↓</span></td>
                      </tr>
                      <tr>
                        <td className="metric-name">تكاليف التسويق</td>
                        <td>مرتفعة ومستمرة <span className="trend negative">↑</span></td>
                        <td>منخفضة (غالباً عقود مباشرة مع الشركات) <span className="trend positive">↓</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="operational-features">
                  <h4>تحديات تشغيلية تواجهها الفنادق في المناطق الصناعية</h4>
                  <div className="features-grid">
                    <div className="feature-item">
                      <div className="feature-icon">
                        <i className="fas fa-hand-holding-usd"></i>
                      </div>
                      <h5>تكاليف تشغيلية غير مبررة</h5>
                      <p>
                        الفنادق في المناطق الصناعية تعاني من تكاليف تشغيلية مرتفعة مقارنة 
                        بمعدلات الإشغال المنخفضة، مما يؤثر سلباً على الجدوى الاقتصادية للمشروع.
                      </p>
                    </div>
                    
                    <div className="feature-item">
                      <div className="feature-icon">
                        <i className="fas fa-search-location"></i>
                      </div>
                      <h5>عدم تناسب الخدمات مع احتياجات العمال</h5>
                      <p>
                        تقدم الفنادق خدمات غير ضرورية للعمال (مثل خدمة الغرف اليومية)، بينما تفتقر 
                        للخدمات الأساسية التي يحتاجونها مثل المطابخ المشتركة والمغاسل.
                      </p>
                    </div>
                    
                    <div className="feature-item">
                      <div className="feature-icon">
                        <i className="fas fa-calendar-alt"></i>
                      </div>
                      <h5>تحديات الحجوزات والإدارة</h5>
                      <p>
                        إدارة الفنادق تتطلب نظاماً معقداً للحجوزات والخدمة اليومية، بينما 
                        المجمعات السكنية تعتمد على عقود طويلة الأجل أسهل في الإدارة.
                      </p>
                    </div>
                    
                    <div className="feature-item">
                      <div className="feature-icon">
                        <i className="fas fa-bed"></i>
                      </div>
                      <h5>عدم مناسبة التصميم والتجهيزات</h5>
                      <p>
                        التصميم الداخلي للفنادق لا يناسب الإقامة طويلة الأجل للعمال، بينما المجمعات 
                        السكنية مصممة خصيصاً لتلبية احتياجاتهم اليومية.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'social' && (
              <div className="tab-content">
                <div className="social-impact-grid">
                  <div className="impact-card">
                    <div className="impact-header hotel">
                      <i className="fas fa-hotel"></i>
                      <h4>التأثير الاجتماعي للمباني الفندقية</h4>
                    </div>
                    <ul className="impact-list negative">
                      <li>
                        <i className="fas fa-times-circle"></i>
                        عدم توفير بيئة مستقرة للعمال يؤثر سلباً على انتماءهم للمنطقة
                      </li>
                      <li>
                        <i className="fas fa-times-circle"></i>
                        زيادة التنقلات اليومية بين مناطق السكن والعمل يسبب ازدحاماً مرورياً
                      </li>
                      <li>
                        <i className="fas fa-times-circle"></i>
                        ارتفاع تكاليف السكن يؤثر على المستوى المعيشي للعمال
                      </li>
                      <li>
                        <i className="fas fa-times-circle"></i>
                        عدم وجود مرافق اجتماعية وترفيهية مناسبة للعمال
                      </li>
                      <li>
                        <i className="fas fa-times-circle"></i>
                        افتقار الفنادق للخدمات المتخصصة التي تلبي احتياجات العمال
                      </li>
                    </ul>
                  </div>
                  
                  <div className="impact-card">
                    <div className="impact-header residential">
                      <i className="fas fa-home"></i>
                      <h4>التأثير الاجتماعي للمجمعات السكنية</h4>
                    </div>
                    <ul className="impact-list positive">
                      <li>
                        <i className="fas fa-check-circle"></i>
                        توفير استقرار سكني للعمال يعزز انتماءهم للمنطقة والشركة
                      </li>
                      <li>
                        <i className="fas fa-check-circle"></i>
                        تقليل التنقلات والازدحام المروري في المنطقة
                      </li>
                      <li>
                        <i className="fas fa-check-circle"></i>
                        توفير سكن بتكلفة معقولة يحسن المستوى المعيشي للعمال
                      </li>
                      <li>
                        <i className="fas fa-check-circle"></i>
                        إنشاء مرافق اجتماعية ورياضية تناسب احتياجات السكان
                      </li>
                      <li>
                        <i className="fas fa-check-circle"></i>
                        تطوير خدمات متخصصة (مطاعم، مغاسل، صالونات) تلبي احتياجاتهم
                      </li>
                      <li>
                        <i className="fas fa-check-circle"></i>
                        تعزيز التفاعل الاجتماعي الإيجابي بين العمال في بيئة مناسبة
                      </li>
                      <li>
                        <i className="fas fa-check-circle"></i>
                        زيادة الإنتاجية والرضا الوظيفي نتيجة توفر السكن الملائم
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="testimonial-section">
                  <h4>شهادات من الواقع</h4>
                  <div className="testimonials">
                    <div className="testimonial">
                      <div className="quote-mark">"</div>
                      <p className="quote-text">
                        التحول من الاقامة في فندق إلى سكني في مجمع متكامل بالقرب من مقر العمل 
                        حسن جودة حياتي وقلل من ساعات التنقل والإرهاق اليومي، مما انعكس إيجاباً على أدائي
                      </p>
                      <div className="testimonial-author">
                        <div className="author-avatar">AS</div>
                        <div className="author-info">
                          <h5>أحمد سعيد</h5>
                          <span>فني إنتاج - مصنع الرياض للألمنيوم</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="testimonial">
                      <div className="quote-mark">"</div>
                      <p className="quote-text">
                        لاحظنا تحسناً ملحوظاً في إنتاجية العمال وانخفاضاً في معدل الغياب بنسبة 32% 
                        بعد نقلهم للسكن في مجمع سكني قريب من المصنع، مع توفير 18% من تكاليف النقل
                      </p>
                      <div className="testimonial-author">
                        <div className="author-avatar">MK</div>
                        <div className="author-info">
                          <h5>محمد الخالدي</h5>
                          <span>مدير الموارد البشرية - شركة الصناعات الكيميائية</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="conversion-request">
          <h3>هل ترغب في تحويل رخصة بناء فندقي إلى سكني؟</h3>
          <p>
            فريق متخصص من خبراء التطوير العقاري على استعداد لمساعدتك في كافة مراحل التحويل، 
            بدءاً من الإجراءات الإدارية وحتى التنفيذ والتشغيل.
          </p>
          <button className="request-btn">تواصل معنا للاستشارة المجانية</button>
        </div>
      </div>
    </section>
  );
}

export default ComparisonSection;

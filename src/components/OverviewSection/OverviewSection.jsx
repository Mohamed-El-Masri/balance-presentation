import React from 'react';
import { useEffect, useState, useRef } from 'react';
import './OverviewSection.css';
import StatHighlight from '../StatHighlight/StatHighlight';

function OverviewSection() {
  return (
    <section className="overview-section" id="overview">
      <div className="container">
        <h2 className="section-title">نظرة عامة</h2>
        <div className="overview-content">
          <div className="overview-card problem">
            <div className="overview-icon">
              <i className="fas fa-hotel"></i>
            </div>
            <h3>تحدي الفئة المستهدفة للفنادق</h3>
            <p>
              الفنادق مصممة لاستقبال السياح والزوار المؤقتين وهي فئة غير متوفرة في المناطق الصناعية. 
              تتسم المنطقة بالمنشآت الصناعية والعمالية مما يجعل نموذج الأعمال الفندقي غير ملائم، حيث يبحث العمال 
              عن سكن جماعي مخصص وليس غرف فندقية باهظة الثمن. هذا التباين الجوهري في الفئة المستهدفة 
              يجعل الفنادق استثماراً غير مناسب في المناطق الصناعية.
            </p>
          </div>

          <div className="overview-card islamic">
            <div className="overview-icon">
              <i className="fas fa-chart-bar"></i>
            </div>
            <h3>المعطيات الإحصائية</h3>
            <p>
              بناءً على تقارير الهيئة العامة للإحصاء ووزارة الموارد البشرية لعام 2023، يبلغ عدد العاملين 
              في منطقة الرياض 4.3 مليون عامل، منهم حوالي 450 ألف في قطاع الصناعة وما يقارب 1.1 مليون في 
              قطاع التشييد والبناء. هذه الكثافة العمالية الهائلة تشكل طلباً حقيقياً على السكن الجماعي 
              وليس على الفنادق، مما يؤكد الحاجة لتحويل الرخص.
            </p>
          </div>

          <div className="overview-card solution">
            <div className="overview-icon">
              <i className="fas fa-exchange-alt"></i>
            </div>
            <h3>الحل المثالي</h3>
            <p>
              تحويل المباني من رخص فندقية إلى سكن جماعي للعمال في المناطق الصناعية يُعد 
              استجابة واقعية لمتطلبات السوق. هذا التحويل يستهدف الفئة الموجودة بالفعل في المنطقة، 
              ويلبي احتياجات المصانع والشركات، ويضمن معدلات إشغال عالية ومستدامة للمستثمرين.
            </p>
          </div>
        </div>

        <div className="benefits-grid">
          <div className="Overview-benefit-item">
            <div className="benefit-icon">
              <i className="fas fa-bullseye"></i>
            </div>
            <h4>استهداف الفئة الصحيحة</h4>
            <p>
              المناطق الصناعية تستقطب العمال وليس السياح، مما يجعل السكن الجماعي للعمال 
              هو النموذج المثالي للاستثمار العقاري في هذه المناطق، بدلاً من الفنادق التي 
              تستهدف فئة غير متواجدة.
            </p>
          </div>

          <div className="Overview-benefit-item">
            <div className="benefit-icon">
              <i className="fas fa-bed"></i>
            </div>
            <h4>معدلات إشغال مرتفعة</h4>
            <p>
              السكن الجماعي للعمال يحقق معدلات إشغال تصل إلى 95%، مقارنة بمعدلات 
              إشغال متدنية (35%) للفنادق في المناطق الصناعية، مما يعكس الطلب الحقيقي في السوق.
            </p>
          </div>

          <div className="Overview-benefit-item">
            <div className="benefit-icon">
              <i className="fas fa-sack-dollar"></i>
            </div>
            <h4>عائد استثماري مستدام</h4>
            <p>
              العقود طويلة الأمد مع الشركات والمصانع توفر استقراراً في الدخل وعائداً 
              استثمارياً أعلى بنسبة 55% مقارنة بالفنادق في المناطق غير السياحية.
            </p>
          </div>

          <div className="Overview-benefit-item">
            <div className="benefit-icon">
              <i className="fas fa-hard-hat"></i>
            </div>
            <h4>دعم قطاع الصناعة</h4>
            <p>
              توفير سكن جماعي ملائم للعمال بالقرب من المصانع يساهم في استقرار القوى العاملة، 
              ويرفع إنتاجية المصانع، ويدعم نمو القطاع الصناعي في المملكة.
            </p>
          </div>
        </div>

        {/* <div className="workforce-stats">
          <h3 className="workforce-title">
            <i className="fas fa-chart-line"></i> إحصائيات القوى العاملة والمنشآت الصناعية
          </h3>
           */}
          {/* <div className="stats-grid">
            <StatHighlight 
              value="4.3" 
              suffix=" مليون" 
              label="إجمالي القوى العاملة في منطقة الرياض" 
              icon="fas fa-users"
              theme="primary"
              size="large"
              description="المصدر: الهيئة العامة للإحصاء، تقرير سوق العمل 2023"
            />
            
            <div className="stats-group">
              <StatHighlight 
                value="450" 
                suffix=" ألف" 
                label="العاملين في القطاع الصناعي" 
                icon="fas fa-industry"
                theme="secondary"
                size="medium"
              />
              
              <StatHighlight 
                value="1.1" 
                suffix=" مليون" 
                label="العاملين في قطاع التشييد والبناء" 
                icon="fas fa-hard-hat"
                theme="secondary"
                size="medium"
              />
            </div>
            
            <div className="stats-group">
              <StatHighlight 
                value="65" 
                suffix="%" 
                label="نسبة العمال الذين يحتاجون لسكن قريب" 
                icon="fas fa-home"
                theme="success"
                size="medium"
              />
              
              <StatHighlight 
                value="78" 
                suffix="%" 
                label="نسبة المصانع الباحثة عن حلول سكنية" 
                icon="fas fa-search"
                theme="success"
                size="medium"
              />
            </div>
          </div> */}
{/*           
          <div className="stats-highlights">
            <div className="stat-highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-bed"></i>
              </div>
              <div className="highlight-content">
                <div className="highlight-number">85,000+</div>
                <div className="highlight-label">سرير</div>
                <div className="highlight-description">فجوة في السكن الجماعي للعمال</div>
              </div>
            </div>
            
            <div className="stat-highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-building"></i>
              </div>
              <div className="highlight-content">
                <div className="highlight-number">1,220</div>
                <div className="highlight-label">مصنع</div>
                <div className="highlight-description">في المدن الصناعية الثلاث بالرياض</div>
              </div>
            </div>
            
            <div className="stat-highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-percentage"></i>
              </div>
              <div className="highlight-content">
                <div className="highlight-number">8-12%</div>
                <div className="highlight-label">نمو سنوي</div>
                <div className="highlight-description">معدل نمو سوق سكن العمال المتوقع حتى 2030</div>
              </div>
            </div>
            
            <div className="stat-highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-money-bill-wave"></i>
              </div>
              <div className="highlight-content">
                <div className="highlight-number">3.5</div>
                <div className="highlight-label">مليار ريال</div>
                <div className="highlight-description">قيمة سوق سكن العمال في منطقة الرياض</div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="ov-district-showcase">
          <div className="ov-district-header">
            <h3>المدن الصناعية في منطقة الرياض</h3>
            <div className="ov-district-badge">
              <i className="fas fa-industry"></i>
              <span>بيانات وإحصاءات رسمية حتى عام 2023</span>
            </div>
          </div>
          
          <div className="ov-district-content">
            <div className="ov-district-description">
              <p>
                تضم منطقة الرياض ثلاث مدن صناعية رئيسية تحتوي على آلاف المصانع والمنشآت الصناعية، مما يجعلها من 
                أكبر التجمعات الصناعية في المملكة وأكثرها كثافة عمالية. هذه المدن تتطلب توفير سكن ملائم للعمال، 
                خاصة مع نقص الخيارات السكنية المناسبة في المناطق المحيطة.
              </p>
            </div>
            
            <div className="industrial-cities">
              <div className="industrial-city">
                <div className="city-icon"><i className="fas fa-industry"></i></div>
                <h4>المدينة الصناعية الأولى</h4>
                <div className="city-year">تأسست عام 1973م</div>
                <div className="city-stat">
                  <div className="stat-number">66</div>
                  <div className="stat-text">مصنعاً</div>
                </div>
                <p>تتميز بقربها من وسط مدينة الرياض وتضم عدداً من المصانع القديمة.</p>
              </div>
              
              <div className="industrial-city featured">
                <div className="city-icon"><i className="fas fa-industry"></i></div>
                <h4>المدينة الصناعية الثانية</h4>
                <div className="city-year">تأسست عام 1976م</div>
                <div className="city-stat">
                  <div className="stat-number">1,117</div>
                  <div className="stat-text">مصنعاً</div>
                </div>
                <p>الأكبر من حيث عدد المصانع والكثافة العمالية وتحتاج لأكثر من 60 ألف سرير.</p>
              </div>
              
              <div className="industrial-city">
                <div className="city-icon"><i className="fas fa-industry"></i></div>
                <h4>المدينة الصناعية الثالثة</h4>
                <div className="city-year">تأسست عام 2010م</div>
                <div className="city-stat">
                  <div className="stat-number">37</div>
                  <div className="stat-text">مصنعاً</div>
                </div>
                <p>الأحدث وتشهد نمواً متسارعاً مع خطط توسعية كبيرة خلال الخمس سنوات القادمة.</p>
              </div>
            </div>
            
            <div className="ov-district-services">
              <div className="ov-service-category">
                <h4><i className="fas fa-users"></i> القوى العاملة في الرياض</h4>
                <ul className="ov-service-list">
                  <li>إجمالي القوى العاملة في منطقة الرياض: 4.3 مليون عامل</li>
                  <li>العاملين في القطاع الصناعي: 400 - 450 ألف عامل</li>
                  <li>العاملين في قطاع التشييد والبناء: 900 ألف - 1.1 مليون عامل</li>
                  <li>نسبة العمالة التي تحتاج إلى سكن قريب من مواقع العمل: 65%</li>
                </ul>
              </div>
              
              <div className="ov-service-category">
                <h4><i className="fas fa-industry"></i> المنشآت الصناعية</h4>
                <ul className="ov-service-list">
                  <li>إجمالي عدد المصانع في المدن الصناعية الثلاث: 1,220 مصنعاً</li>
                  <li>إجمالي المنشآت الصناعية في منطقة الرياض: أكثر من 4,500 منشأة</li>
                  <li>متوسط عدد العمال في المصنع الواحد: 80-120 عاملاً</li>
                  <li>نسبة المصانع التي تبحث عن حلول سكنية للعمال: 78%</li>
                </ul>
              </div>
              
              <div className="ov-service-category">
                <h4><i className="fas fa-building"></i> الوضع السكني الحالي</h4>
                <ul className="ov-service-list">
                  <li>نقص في وحدات السكن الجماعي المناسبة للعمال</li>
                  <li>ارتفاع معدل إشغال السكن الجماعي القائم (95%)</li>
                  <li>انخفاض معدل إشغال الفنادق في المناطق الصناعية (35%)</li>
                  <li>فجوة مقدرة بحوالي 85,000 سرير في السكن الجماعي للعمال</li>
                </ul>
              </div>
              
              <div className="ov-service-category">
                <h4><i className="fas fa-chart-pie"></i> الفرص الاستثمارية</h4>
                <ul className="ov-service-list">
                  <li>عائد استثماري مرتفع للسكن الجماعي (15-20% سنوياً)</li>
                  <li>قيمة سوق سكن العمال في منطقة الرياض: 3.5 مليار ريال سعودي</li>
                  <li>معدل نمو سنوي متوقع: 8-12% حتى عام 2030</li>
                  <li>عقود طويلة الأجل وتكاليف تشغيل أقل بنسبة 45% من الفنادق</li>
                </ul>
              </div>
            </div>
            
            <div className="ov-district-cta">
              <a href="#comparison" className="ov-district-btn">
                <i className="fas fa-exchange-alt"></i>
                مقارنة بين الفنادق والسكن الجماعي للعمال
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OverviewSection;
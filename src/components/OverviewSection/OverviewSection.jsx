import React from 'react';
import './OverviewSection.css';

function OverviewSection() {
  return (
    <section className="overview-section" id="overview">
      <div className="container">
        <h2 className="section-title">نظرة عامة</h2>
        <div className="overview-content">
          <div className="overview-card problem">
            <div className="overview-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3>التحديات الحالية</h3>
            <p>
              يعد ارتفاع أسعار الغرف الفندقية وبُعدها عن المناطق الصناعية من أكثر 
              العقبات التي تواجه العمالة، مما يؤثر سلباً على الإنتاجية وراحة العمال. 
              كما يؤدي عدم توفر سكن للعمالة بالقرب من المناطق الصناعية إلى ازدحام 
              المرور والتأثير السلبي على البيئة.
            </p>
          </div>

          <div className="overview-card islamic">
            <div className="overview-icon">
              <i className="fas fa-star-and-crescent"></i>
            </div>
            <h3>المنظور الإسلامي</h3>
            <p>
              إن ديننا الحنيف يحثنا على التعامل الإنساني مع الأجير بأفضل معاملة، 
              ونحن مؤتمنون على صحتهم وأمنهم وسلامتهم. وسنعمل كل ما في وسعنا لتحقيق 
              ذلك، باعتبارهم ضيوفاً مساهمين في التنمية الوطنية والاقتصادية.
            </p>
          </div>

          <div className="overview-card solution">
            <div className="overview-icon">
              <i className="fas fa-home"></i>
            </div>
            <h3>الحلول المقترحة</h3>
            <p>
              يعتبر توفير سكن نموذجي للعمال داخل المناطق الصناعية عنصراً أساسياً 
              في تعزيز بيئة العمل وضمان راحة العاملين وتوفير الاستقرار الاجتماعي لهم. 
              إن إقامة مجمعات سكنية متكاملة يسهم في تحسين جودة حياة العمال وزيادة إنتاجيتهم.
            </p>
          </div>
        </div>

        <div className="benefits-grid">
          <div className="Overview-benefit-item">
            <div className="benefit-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h4>تحسين الإنتاجية</h4>
            <p>
              عندما يعيش العمال في بيئة مريحة وقريبة من مكان عملهم، يقل الوقت والجهد المبذول 
              في التنقل، مما يتيح لهم التركيز بشكل أفضل على مهامهم وزيادة إنتاجيتهم.
            </p>
          </div>

          <div className="Overview-benefit-item">
            <div className="benefit-icon">
              <i className="fas fa-heart"></i>
            </div>
            <h4>تحسين جودة الحياة</h4>
            <p>
              توفير مرافق سكنية مجهزة تلبي احتياجات العمال الأساسية يساهم في رفع مستوى راحتهم 
              ويقلل من التوتر والإجهاد الناتج عن بيئة السكن غير الملائمة.
            </p>
          </div>

          <div className="Overview-benefit-item">
            <div className="benefit-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h4>الامتثال للمعايير الصحية</h4>
            <p>
              تلتزم المجمعات السكنية النموذجية بمعايير الصحة والسلامة المعتمدة، مما 
              يقلل من المخاطر الصحية ويحسن رفاهية العمال.
            </p>
          </div>

          <div className="Overview-benefit-item">
            <div className="benefit-icon">
              <i className="fas fa-users"></i>
            </div>
            <h4>تقليل التأثيرات السلبية</h4>
            <p>
              باستضافة العمال داخل المناطق الصناعية، يتم تقليل التكدس السكاني في الأحياء 
              السكنية المجاورة، مما يقلل من التوترات الاجتماعية ويحافظ على هوية المجتمعات المحلية.
            </p>
          </div>
        </div>

        <div className="ov-district-showcase">
          <div className="ov-district-header">
            <h3>نبذة عن حي المصفاة</h3>
            <div className="ov-district-badge">
              <i className="fas fa-map-marker-alt"></i>
              <span>المنطقة الصناعية - جنوب الرياض</span>
            </div>
          </div>
          
          <div className="ov-district-content">
            <div className="ov-district-description">
              <p>
                حي المصفاة هو أحد الأحياء الواقعة في جنوب مدينة الرياض، ويتوسط أفضل أحياء جنوب الرياض والتابع 
                إلى بلدية العزيزية. يتميز بموقعه الاستراتيجي الذي يجعله محط اهتمام العديد من السكان والمستثمرين. 
                شهدت المنطقة تطوراً عمرانياً ملحوظاً في السنوات الأخيرة، مما أدى إلى زيادة الطلب على المجمعات السكنية فيها.
              </p>
            </div>
            
            <div className="ov-district-highlights">
              <div className="ov-district-highlight">
                <div className="ov-highlight-icon">
                  <i className="fas fa-industry"></i>
                </div>
                <h4>تطور صناعي</h4>
                <p>نمو صناعي ملحوظ وزيادة في أعداد العمال والموظفين في المنطقة.</p>
              </div>
              <div className="ov-district-highlight">
                <div className="ov-highlight-icon">
                  <i className="fas fa-map-signs"></i>
                </div>
                <h4>موقع استراتيجي</h4>
                <p>قرب من الطرق الرئيسية ومرافق الخدمات الأساسية.</p>
              </div>
              <div className="ov-district-highlight">
                <div className="ov-highlight-icon">
                  <i className="fas fa-building"></i>
                </div>
                <h4>تطور عمراني</h4>
                <p>تطور ملحوظ في البنية التحتية والمشاريع السكنية.</p>
              </div>
            </div>
            
            <div className="ov-district-services">
              <div className="ov-service-category">
                <h4><i className="fas fa-hospital"></i> الخدمات الطبية</h4>
                <ul className="ov-service-list">
                  <li>مستشفى رابية - حي طيبة</li>
                  <li>مركز العزيزية الطبي - حي العزيزية</li>
                  <li>المجمع العالمي الطبي - حي العزيزية</li>
                  <li>مركز طب الأسرة والمجتمع - حي الإسكان</li>
                </ul>
              </div>
              
              <div className="ov-service-category">
                <h4><i className="fas fa-tree"></i> الأماكن الترفيهية</h4>
                <ul className="ov-service-list">
                  <li>حديقة طيبة - تبعد 11.7 كم</li>
                  <li>حديقة إسكان - تبعد 8.7 كم</li>
                  <li>الحديقة الصناعية الجديدة - تبعد 6.7 كم</li>
                  <li>ملعب أطفال قبعة القش - يبعد 10.2 كم</li>
                </ul>
              </div>
              
              <div className="ov-service-category">
                <h4><i className="fas fa-utensils"></i> أشهر المطاعم</h4>
                <ul className="ov-service-list">
                  <li>مطعم المنصور</li>
                  <li>مطعم Multani Restaurant</li>
                  <li>مطاعم Sultan Indian restaurant</li>
                </ul>
              </div>
              
              <div className="ov-service-category">
                <h4><i className="fas fa-shopping-cart"></i> أماكن التسوق</h4>
                <ul className="ov-service-list">
                  <li>مركز جراح المصفاة للتسوق</li>
                  <li>مخابز المصفاة</li>
                  <li>متاجر ومستودعات فيلا السعودية</li>
                </ul>
              </div>
            </div>
            
           
          </div>
        </div>
      </div>
    </section>
  );
}

export default OverviewSection;

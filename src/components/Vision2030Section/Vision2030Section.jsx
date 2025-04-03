import React from 'react';
import './Vision2030Section.css';

function Vision2030Section() {
  return (
    <section className="vision-section" id="vision2030">
      <div className="container">
        <h2 className="section-title">التوافق مع رؤية 2030</h2>
        <p className="section-description">
          يتوافق مشروع تحويل رخص البناء من فندقي إلى سكني في المناطق الصناعية مع العديد من أهداف 
          رؤية المملكة 2030، ويساهم في تحقيق مستهدفاتها الاستراتيجية.
        </p>
        
        <div className="vision-logo-container">
          <img src="/src/assets/vision2030-logo.png" alt="شعار رؤية 2030" className="vision-logo" />
        </div>
        
        <div className="vision-goals-grid">
          <div className="vision-goal">
            <div className="goal-icon">
              <i className="fas fa-industry"></i>
            </div>
            <h3>تطوير القطاع الصناعي</h3>
            <p>
              يدعم المشروع هدف رؤية 2030 لتطوير البنية التحتية الصناعية ورفع مساهمة القطاع الصناعي 
              في الناتج المحلي الإجمالي عبر توفير بيئة عمل محفزة ومستدامة.
            </p>
            <div className="goal-metrics">
              <div className="metric">
                <span className="target">223</span>
                <span className="unit">مليار دولار</span>
                <span className="label">مستهدف الناتج الصناعي 2035</span>
              </div>
            </div>
          </div>
          
          <div className="vision-goal">
            <div className="goal-icon">
              <i className="fas fa-home"></i>
            </div>
            <h3>تحسين جودة الحياة</h3>
            <p>
              يساهم المشروع في تحسين جودة حياة العاملين في المدن الصناعية عبر توفير مساكن لائقة 
              بخدمات متكاملة، متوافقة مع برنامج جودة الحياة أحد برامج تحقيق الرؤية.
            </p>
            <div className="goal-metrics">
              <div className="metric">
                <span className="target">70%</span>
                <span className="label">نسبة تملك المساكن المستهدفة</span>
              </div>
            </div>
          </div>
          
          <div className="vision-goal">
            <div className="goal-icon">
              <i className="fas fa-tree"></i>
            </div>
            <h3>الاستدامة البيئية</h3>
            <p>
              تعزيز الاستدامة البيئية من خلال تقليل التنقلات والانبعاثات الكربونية، واعتماد تصاميم 
              موفرة للطاقة، مما يتوافق مع مبادرة السعودية الخضراء.
            </p>
            <div className="goal-metrics">
              <div className="metric">
                <span className="target">30%</span>
                <span className="label">تقليل مسافات التنقل اليومية</span>
              </div>
            </div>
          </div>
          
          <div className="vision-goal">
            <div className="goal-icon">
              <i className="fas fa-city"></i>
            </div>
            <h3>مدن ذكية ومستدامة</h3>
            <p>
              تعزيز مفهوم المدن الذكية والمستدامة من خلال التخطيط العمراني الحديث وتكامل 
              المرافق السكنية مع المناطق الصناعية لتحقيق التنمية المستدامة.
            </p>
            <div className="goal-metrics">
              <div className="metric">
                <span className="target">3</span>
                <span className="label">مدن سعودية بين أفضل 100 مدينة عالمياً</span>
              </div>
            </div>
          </div>
          
          <div className="vision-goal">
            <div className="goal-icon">
              <i className="fas fa-briefcase"></i>
            </div>
            <h3>توطين الوظائف وتنمية المهارات</h3>
            <p>
              دعم سياسات توطين الوظائف في القطاع الصناعي من خلال توفير بيئة عمل وسكن جاذبة
              للكوادر الوطنية وتحفيزهم على تطوير مهاراتهم.
            </p>
            <div className="goal-metrics">
              <div className="metric">
                <span className="target">65%</span>
                <span className="label">نسبة التوطين المستهدفة في القطاع الصناعي</span>
              </div>
            </div>
          </div>
          
          <div className="vision-goal">
            <div className="goal-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>تنويع الاقتصاد</h3>
            <p>
              المساهمة في تنويع الاقتصاد الوطني من خلال تعزيز القطاع الصناعي وتوفير فرص استثمارية 
              جديدة في قطاع التطوير العقاري الصناعي.
            </p>
            <div className="goal-metrics">
              <div className="metric">
                <span className="target">36,000</span>
                <span className="label">مصنع مستهدف بحلول 2035</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="gov-regulations">
          <h3>المبادرات الحكومية الداعمة</h3>
          <div className="regulation-cards">
            <div className="regulation-card">
              <div className="reg-icon">
                <i className="fas fa-building"></i>
              </div>
              <h4>برنامج تطوير الصناعة الوطنية والخدمات اللوجستية</h4>
              <p>
                يهدف البرنامج لتحويل المملكة إلى قوة صناعية رائدة، ويدعم تطوير البنية التحتية 
                اللازمة لتحقيق ذلك، بما فيها المجمعات السكنية للعاملين.
              </p>
            </div>
            
            <div className="regulation-card">
              <div className="reg-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h4>هيئة المدن الصناعية ومناطق التقنية (مدن)</h4>
              <p>
                تعمل الهيئة على تطوير المناطق الصناعية المتكاملة وتوفير البيئة المناسبة لجذب 
                الاستثمارات الصناعية، بما في ذلك المرافق السكنية والخدمية.
              </p>
            </div>
            
            <div className="regulation-card">
              <div className="reg-icon">
                <i className="fas fa-home"></i>
              </div>
              <h4>برنامج الإسكان</h4>
              <p>
                يسعى برنامج الإسكان لتوفير حلول سكنية متنوعة تلبي احتياجات مختلف شرائح المجتمع، 
                بما في ذلك العاملين في القطاعات الإنتاجية.
              </p>
            </div>
          </div>
        </div>
        
        <div className="key-performance-indicators">
          <h3>مؤشرات الأداء المتوقعة</h3>
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-icon"><i className="fas fa-users"></i></div>
              <div className="kpi-info">
                <span className="kpi-value">+25%</span>
                <span className="kpi-label">زيادة معدل الإنتاجية للعمال</span>
              </div>
            </div>
            
            <div className="kpi-card">
              <div className="kpi-icon"><i className="fas fa-car"></i></div>
              <div className="kpi-info">
                <span className="kpi-value">-42%</span>
                <span className="kpi-label">تخفيض في ساعات التنقل</span>
              </div>
            </div>
            
            <div className="kpi-card">
              <div className="kpi-icon"><i className="fas fa-building"></i></div>
              <div className="kpi-info">
                <span className="kpi-value">+20%</span>
                <span className="kpi-label">زيادة فرص العمل في المنطقة الصناعية</span>
              </div>
            </div>
            
            <div className="kpi-card">
              <div className="kpi-icon"><i className="fas fa-leaf"></i></div>
              <div className="kpi-info">
                <span className="kpi-value">-35%</span>
                <span className="kpi-label">انخفاض في الانبعاثات الكربونية</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Vision2030Section;

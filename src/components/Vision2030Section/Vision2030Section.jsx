import React from 'react';
import './Vision2030Section.css';

const Vision2030Section = () => {
  return (
    <section className="vision-section" id="vision">
      <div className="container">
        <h2 className="section-title">توافق المشروع مع رؤية 2030</h2>
        <p className="section-description">
          يتوافق مشروع تحويل رخص البناء من فندقي إلى سكني في المناطق الصناعية مع العديد من مستهدفات
          رؤية المملكة 2030، خاصة في مجالات تطوير البنية التحتية وتحسين جودة الحياة وتنويع الاقتصاد.
        </p>
        
        <div className="vision-logo-container">
          <img 
            src="/src/assets/2030Logo.png" 
            alt="شعار رؤية المملكة 2030" 
            className="vision-logo"
          />
        </div>
        
        <div className="vision-goals-grid">
          <div className="vision-goal">
            <div className="goal-icon">
              <i className="fas fa-home"></i>
            </div>
            <h3>تحسين جودة الحياة</h3>
            <p>
              يساهم توفير سكن ملائم للعمال والموظفين بالقرب من مواقع العمل في تحسين جودة حياتهم
              وتقليل وقت التنقل، مما يتوافق مع مستهدفات برنامج جودة الحياة في رؤية 2030.
            </p>
            <div className="goal-metrics">
              <div className="metric">
                <span className="target">70%</span>
                <span className="unit">بحلول 2030</span>
                <span className="label">نسبة تملك المساكن</span>
              </div>
            </div>
          </div>
          
          <div className="vision-goal">
            <div className="goal-icon">
              <i className="fas fa-industry"></i>
            </div>
            <h3>تطوير المدن الصناعية</h3>
            <p>
              يتماشى المشروع مع خطط تطوير المدن الصناعية ضمن الاستراتيجية الوطنية للصناعة،
              ويعزز استدامة هذه المدن من خلال توفير بنية تحتية سكنية متكاملة.
            </p>
            <div className="goal-metrics">
              <div className="metric">
                <span className="target">36,000</span>
                <span className="unit">بحلول 2035</span>
                <span className="label">عدد المصانع المستهدف</span>
              </div>
            </div>
          </div>
          
          <div className="vision-goal">
            <div className="goal-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <h3>الاستدامة البيئية</h3>
            <p>
              يسهم توفير السكن بالقرب من مواقع العمل في تقليل الانبعاثات الكربونية الناتجة
              عن وسائل النقل، مما يدعم مبادرات الاستدامة البيئية في رؤية 2030.
            </p>
            <div className="goal-metrics">
              <div className="metric">
                <span className="target">45%</span>
                <span className="unit">تخفيض</span>
                <span className="label">في الانبعاثات الكربونية</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="gov-regulations">
          <h3>اللوائح والتنظيمات الداعمة</h3>
          <div className="regulation-cards">
            <div className="regulation-card">
              <div className="reg-icon">
                <i className="fas fa-building"></i>
              </div>
              <h4>لائحة المباني السكنية للعمال</h4>
              <p>
                تنظم الاشتراطات الفنية والمعايير التصميمية لسكن العمال، وتشجع على توفير بيئة
                سكنية آمنة ومريحة تتوافق مع المعايير الدولية.
              </p>
            </div>
            
            <div className="regulation-card">
              <div className="reg-icon">
                <i className="fas fa-city"></i>
              </div>
              <h4>نظام التخطيط العمراني</h4>
              <p>
                يدعم تطوير المجمعات السكنية في المناطق الصناعية ويوفر إطاراً تنظيمياً لاستخدامات
                الأراضي بما يحقق التكامل بين السكن والعمل.
              </p>
            </div>
            
            <div className="regulation-card">
              <div className="reg-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h4>برنامج تطوير الصناعة الوطنية</h4>
              <p>
                يهدف إلى تعزيز القدرة التنافسية للصناعة الوطنية من خلال تطوير بيئة عمل متكاملة،
                بما في ذلك توفير المرافق السكنية المناسبة.
              </p>
            </div>
          </div>
        </div>
        
        <div className="key-performance-indicators">
          <h3>مؤشرات الأداء المتوقعة</h3>
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="kpi-info">
                <span className="kpi-value">+20%</span>
                <span className="kpi-label">زيادة في استقرار العمالة</span>
              </div>
            </div>
            
            <div className="kpi-card">
              <div className="kpi-icon">
                <i className="fas fa-chart-pie"></i>
              </div>
              <div className="kpi-info">
                <span className="kpi-value">+15%</span>
                <span className="kpi-label">تحسن في الإنتاجية</span>
              </div>
            </div>
            
            <div className="kpi-card">
              <div className="kpi-icon">
                <i className="fas fa-car"></i>
              </div>
              <div className="kpi-info">
                <span className="kpi-value">-30%</span>
                <span className="kpi-label">انخفاض في الازدحام المروري</span>
              </div>
            </div>
            
            <div className="kpi-card">
              <div className="kpi-icon">
                <i className="fas fa-heartbeat"></i>
              </div>
              <div className="kpi-info">
                <span className="kpi-value">+25%</span>
                <span className="kpi-label">تحسن في الصحة العامة للعمال</span>
              </div>
            </div>
            
            <div className="kpi-card">
              <div className="kpi-icon">
                <i className="fas fa-wallet"></i>
              </div>
              <div className="kpi-info">
                <span className="kpi-value">9-12%</span>
                <span className="kpi-label">معدل العائد على الاستثمار</span>
              </div>
            </div>
            
            <div className="kpi-card">
              <div className="kpi-icon">
                <i className="fas fa-store"></i>
              </div>
              <div className="kpi-info">
                <span className="kpi-value">+40%</span>
                <span className="kpi-label">زيادة في نشاط تجارة التجزئة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision2030Section;

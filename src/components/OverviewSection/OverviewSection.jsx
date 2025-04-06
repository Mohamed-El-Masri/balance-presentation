import React from "react";
import { useEffect, useState, useRef } from "react";
import "./OverviewSection.css";
import StatHighlight from "../StatHighlight/StatHighlight";

function OverviewSection() {
  return (
    <section
      className='overview-section'
      id='overview'>
      <div className='container'>
        <h2 className='section-title'>نظرة عامة</h2>
        <div className='overview-content'>
          <div className='overview-card problem'>
            <div className='overview-icon'>
              <i className='fas fa-hotel'></i>
            </div>
            <h3>التحديات</h3>
            <p>
              الفنادق مصممة لاستقبال السياح والزوار المؤقتين وهي فئة غير متوفرة
              في المناطق الصناعية. تتسم المنطقة بالمنشآت الصناعية والعمالية مما
              يجعل نموذج الأعمال الفندقي غير ملائم، حيث يبحث العمال عن سكن جماعي
              مخصص وليس غرف فندقية باهظة الثمن. هذا التباين الجوهري في الفئة
              المستهدفة يجعل الفنادق استثماراً غير مناسب في المناطق الصناعية.
            </p>
          </div>

          <div className='overview-card islamic'>
            <div className='overview-icon'>
              <i className='fas fa-chart-bar'></i>
            </div>
            <h3>المعطيات الإحصائية</h3>
            <p>
              بناءً على{" "}
              <a
                href='https://www.stats.gov.sa/statistics-tabs/-/categories/417515?tab=436312&category=417515'
                target='_blank'
                rel='noopener noreferrer'>
                <span className='stat-highlight stat-highlight-link'>
                تقارير الهيئة العامة للإحصاء
                </span>
              </a>{" "}
              ووزارة الموارد البشرية لعام 2024، يبلغ عدد العاملين في منطقة
              الرياض 
              <a
                href='https://www.stats.gov.sa/statistics-tabs/-/categories/417515?tab=436312&category=417515'
                target='_blank'
                rel='noopener noreferrer'>
               <span className='stat-highlight stat-highlight-link '>5.7 مليون</span> 
              </a>{" "}
              عامل،
              منهم حوالي{" "}
              <a
                href='https://ehsaeyat.com/post/hjm-laaml-fy-lqtaa-lsnaay-blsaawdy-2024/'
                target='_blank'
                rel='noopener noreferrer'>
                <span className='stat-highlight stat-highlight-link '>463 ألف</span>
              </a>{" "}
              في قطاع الصناعة وما يقارب{" "}
              <a
                href='https://www.argaam.com/ar/article/articledetail/id/1661611#:~:text=%D9%88%D8%B4%D9%83%D9%84%D8%AA%20%D8%A7%D9%84%D8%B9%D8%A7%D8%B5%D9%85%D8%A9%20%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%20%D8%A7%D9%84%D9%86%D8%B3%D8%A8%D8%A9%20%D8%A7%D9%84%D8%A3%D8%B9%D9%84%D9%89,%D8%A7%D9%84%D9%85%D9%83%D8%B1%D9%85%D8%A9%20%D8%A8%D9%80447.3%20%D8%A3%D9%84%D9%81%20%D9%85%D9%88%D8%B8%D9%81.'
                target='_blank'
                rel='noopener noreferrer'>
                <span className='stat-highlight stat-highlight-link '>1.2 مليون</span>
              </a>{" "}
              في قطاع التشييد والبناء. هذه الكثافة العمالية الهائلة تشكل طلباً
              حقيقياً على السكن الجماعي وليس على الفنادق، مما يؤكد الحاجة لتحويل
              الرخص.
            </p>
          </div>
          <div className='overview-card solution'>
            <div className='overview-icon'>
              <i className='fas fa-exchange-alt'></i>
            </div>
            <h3>الحل المثالي</h3>
            <p>
              تحويل رخص بناء الاراضي من رخص فندقية إلى سكن جماعي للعمال في المناطق
              الصناعية يُعد استجابة واقعية لمتطلبات السوق. هذا التحويل يستهدف
              الفئة الموجودة بالفعل في المنطقة، ويلبي احتياجات المصانع والشركات،
              ويضمن معدلات إشغال عالية ومستدامة للمستثمرين.
            </p>
          </div>
        </div>

        <div className='benefits-grid'>
          <div className='Overview-benefit-item'>
            <div className='benefit-icon'>
              <i className='fas fa-bullseye'></i>
            </div>
            <h4>استهداف الفئة الصحيحة</h4>
            <p>
              المناطق الصناعية تستقطب العمال وليس السياح، مما يجعل السكن الجماعي
              للعمال هو النموذج المثالي للاستثمار العقاري في هذه المناطق، بدلاً
              من الفنادق التي تستهدف فئة غير متواجدة.
            </p>
          </div>

          <div className='Overview-benefit-item'>
            <div className='benefit-icon'>
              <i className='fas fa-bed'></i>
            </div>
            <h4>معدلات إشغال مرتفعة</h4>
            <p>
              السكن الجماعي للعمال يحقق معدلات إشغال تصل إلى 95%، مقارنة بمعدلات
              إشغال متدنية (35%) للفنادق في المناطق الصناعية، مما يعكس الطلب
              الحقيقي في السوق.
            </p>
          </div>

          <div className='Overview-benefit-item'>
            <div className='benefit-icon'>
              <i className='fas fa-dollar-sign'></i>
            </div>
            <h4>عائد استثماري مستدام</h4>
            <p>
              العقود طويلة الأمد مع الشركات والمصانع توفر استقراراً في الدخل
              وعائداً استثمارياً سنوياً يصل إلى 18% مقارنة بنسبة 8.5% للفنادق في
              المناطق غير السياحية.
            </p>
          </div>

          <div className='Overview-benefit-item'>
            <div className='benefit-icon'>
              <i className='fas fa-hard-hat'></i>
            </div>
            <h4>دعم قطاع الصناعة</h4>
            <p>
              توفير سكن جماعي ملائم للعمال بالقرب من المصانع يساهم في استقرار
              القوى العاملة، ويرفع إنتاجية المصانع، ويدعم نمو القطاع الصناعي في
              المملكة.
            </p>
          </div>
        </div>

        <div className='ov-district-showcase'>
          <div className='ov-district-header'>
            <h3>المدن الصناعية في منطقة الرياض</h3>
            <div className='ov-district-badge'>
              <i className='fas fa-industry'></i>
              <span>بيانات وإحصاءات رسمية حتى عام 2023</span>
            </div>
          </div>

          <div className='ov-district-content'>
            <div className='ov-district-description'>
              <p>
                تضم منطقة الرياض ثلاث مدن صناعية رئيسية تحتوي على آلاف المصانع
                والمنشآت الصناعية، مما يجعلها من أكبر التجمعات الصناعية في
                المملكة وأكثرها كثافة عمالية. هذه المدن تتطلب توفير سكن ملائم
                للعمال، خاصة مع نقص الخيارات السكنية المناسبة في المناطق
                المحيطة.
              </p>
            </div>

            <div className='industrial-cities'>
              <div className='industrial-city'>
                <div className='city-icon'>
                  <i className='fas fa-industry'></i>
                </div>
                <h4>المدينة الصناعية الأولى</h4>
                <div className='city-year'>تأسست عام 1973م</div>
                <div className='city-stat'>
                  <div className='stat-number'>66</div>
                  <div className='stat-text'>مصنعاً</div>
                </div>
                <p>
                  تتميز بقربها من وسط مدينة الرياض وتضم عدداً من المصانع
                  القديمة.
                </p>
              </div>

              <div className='industrial-city featured'>
                <div className='city-icon'>
                  <i className='fas fa-industry'></i>
                </div>
                <h4>المدينة الصناعية الثانية</h4>
                <div className='city-year'>تأسست عام 1976م</div>
                <div className='city-stat'>
                  <div className='stat-number'>1,117</div>
                  <div className='stat-text'>مصنعاً</div>
                </div>
                <p>
                  الأكبر من حيث عدد المصانع والكثافة العمالية وتحتاج لأكثر من 60
                  ألف سرير.
                </p>
              </div>

              <div className='industrial-city'>
                <div className='city-icon'>
                  <i className='fas fa-industry'></i>
                </div>
                <h4>المدينة الصناعية الثالثة</h4>
                <div className='city-year'>تأسست عام 2010م</div>
                <div className='city-stat'>
                  <div className='stat-number'>37</div>
                  <div className='stat-text'>مصنعاً</div>
                </div>
                <p>
                  الأحدث وتشهد نمواً متسارعاً مع خطط توسعية كبيرة خلال الخمس
                  سنوات القادمة.
                </p>
              </div>
            </div>

            <div className='ov-district-services'>
              <div className='ov-service-category'>
                <h4>
                  <i className='fas fa-users'></i> القوى العاملة في الرياض
                </h4>
                <ul className='ov-service-list'>
               
                  <li>إجمالي القوى العاملة في منطقة الرياض:  <span className='stat-highlight '>5.7 مليون عامل</span></li>
                  <li>العاملين في القطاع الصناعي:  <span className='stat-highlight '>463 الف عامل</span></li>
                  <li>
                    العاملين في قطاع التشييد والبناء:  <span className='stat-highlight '>1.2 مليون عامل</span>
                  </li>
                  <li>
                    
                    نسبة العمالة التي تحتاج إلى سكن قريب من مواقع العمل: 65%
                  </li>
                </ul>
              </div>

              <div className='ov-service-category'>
                <h4>
                  <i className='fas fa-industry'></i> المنشآت الصناعية
                </h4>
                <ul className='ov-service-list'>
                  <li>
                    إجمالي عدد المصانع في المدن الصناعية الثلاث:  <a
                href='https://saudipedia.com/article/14802/%D8%A7%D9%82%D8%AA%D8%B5%D8%A7%D8%AF-%D9%88%D8%A3%D8%B9%D9%85%D8%A7%D9%84/%D8%B5%D9%86%D8%A7%D8%B9%D8%A9/%D9%82%D8%A7%D8%A6%D9%85%D8%A9-%D8%A7%D9%84%D9%85%D8%AF%D9%86-%D8%A7%D9%84%D8%B5%D9%86%D8%A7%D8%B9%D9%8A%D8%A9-%D9%81%D9%8A-%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6?utm_source=chatgpt.com'
                target='_blank'
                rel='noopener noreferrer'>
                <span className='stat-highlight stat-highlight-link'>
                1,220 مصنع
                </span>
              </a>{" "}
                  </li>
                  <li>إجمالي المنشآت الصناعية في منطقة الرياض:  <a
                href='https://www.argaam.com/ar/article/articledetail/id/1656349'
                target='_blank'
                rel='noopener noreferrer'>
                <span className='stat-highlight stat-highlight-link'>
                4,200+ منشأة
                </span>
              </a>{" "}</li>
                  <li>متوسط عدد العمال في المصنع الواحد:  <span className='stat-highlight '>
                80 - 135 عامل
                </span></li>
                  <li>نسبة المصانع التي تبحث عن حلول سكنية للعمال: 78%</li>
                </ul>
              </div>

              <div className='ov-service-category'>
                <h4>
                  <i className='fas fa-building'></i> الوضع السكني الحالي
                </h4>
                <ul className='ov-service-list'>
                  <li>نقص في وحدات السكن الجماعي المناسبة للعمال</li>
                  <li>ارتفاع معدل إشغال السكن الجماعي القائم (95%)</li>
                  <li>انخفاض معدل إشغال الفنادق في المناطق الصناعية (35%)</li>
                  <li>فجوة مقدرة بحوالي 85,000 سرير في السكن الجماعي للعمال</li>
                </ul>
              </div>

              <div className='ov-service-category'>
                <h4>
                  <i className='fas fa-chart-pie'></i> الفرص الاستثمارية
                </h4>
                <ul className='ov-service-list'>
                  <li>عائد استثماري مرتفع للسكن الجماعي (15-18% سنوياً)</li>
                  <li>
                    قيمة سوق سكن العمال في منطقة الرياض: 3.5 مليار ريال سعودي
                  </li>
                  <li>معدل نمو سنوي متوقع: 8-12% حتى عام 2030</li>
                  <li>
                    عقود طويلة الأجل وتكاليف تشغيل أقل بنسبة 30% من الفنادق
                  </li>
                </ul>
              </div>
            </div>

            <div className='ov-district-cta'>
              <a
                href='#comparison'
                className='ov-district-btn'>
                <i className='fas fa-exchange-alt'></i>
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

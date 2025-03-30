import { useState, useRef, useEffect } from 'react';
import './MapFilters.css';

/**
 * مكون فلترة الأماكن المحيطة للخريطة
 * يمكن المستخدم من البحث عن أنواع مختلفة من الأماكن وضبط نطاق البحث
 */
const MapFilters = ({ onFilterChange, isLoading, disabled = false }) => {
  // حالة تحكم الفلتر
  const [expanded, setExpanded] = useState(false);
  const [placeType, setPlaceType] = useState('');
  const [radius, setRadius] = useState(1000); // الشعاع الافتراضي هو 1 كم
  const filtersRef = useRef(null);

  // معالجة النقر خارج الفلاتر لإخفائها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target) && 
          !event.target.classList.contains('filter-toggle-btn')) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // تقديم التغييرات للكومبوننت الأب
  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        placeType,
        radius
      });
    }
    
    // عدم إغلاق الفلتر تلقائياً للشاشات الكبيرة
    if (window.innerWidth < 992) {
      setExpanded(false);
    }
  };

  // تنظيف الفلاتر
  const clearFilters = () => {
    setPlaceType('');
    setRadius(1000);
    
    if (onFilterChange) {
      onFilterChange(null); // إرسال null لإزالة جميع الفلاتر
    }
  };

  // أنواع الأماكن المتاحة
  const placeTypeOptions = [
    { value: '', label: 'جميع الأنواع' },
    { value: 'restaurant', label: 'مطاعم' },
    { value: 'hospital', label: 'مستشفيات' },
    { value: 'school', label: 'مدارس' },
    { value: 'mosque', label: 'مساجد' },
    { value: 'shopping_mall', label: 'مراكز تسوق' },
    { value: 'pharmacy', label: 'صيدليات' },
    { value: 'supermarket', label: 'أسواق تجارية' },
    { value: 'bank', label: 'بنوك' },
    { value: 'gym', label: 'نوادي رياضية' },
    { value: 'park', label: 'حدائق عامة' }
  ];

  return (
    <div className="map-filters-container">
      <button 
        className={`filter-toggle-btn ${expanded ? 'active' : ''}`}
        onClick={() => setExpanded(!expanded)}
        disabled={disabled}
        aria-expanded={expanded}
        aria-label="تصفية الأماكن المحيطة"
      >
        <i className="filter-icon">🔍</i>
        <span>تصفية الأماكن</span>
      </button>
      
      <div 
        className={`filters-panel ${expanded ? 'show' : ''}`}
        ref={filtersRef}
        role="dialog"
        aria-label="خيارات تصفية الأماكن المحيطة"
      >
        <div className="filters-header">
          <h4>تصفية الأماكن المحيطة</h4>
          <button 
            className="close-filters-btn"
            onClick={() => setExpanded(false)}
            aria-label="إغلاق"
          >
            ×
          </button>
        </div>
        
        <div className="filters-body">
          <div className="filter-group">
            <label htmlFor="place-type">نوع المكان</label>
            <select 
              id="place-type" 
              value={placeType}
              onChange={(e) => setPlaceType(e.target.value)}
              disabled={isLoading}
            >
              {placeTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="radius">النطاق (بالمتر)</label>
            <div className="range-with-value">
              <input 
                type="range" 
                id="radius" 
                min="100" 
                max="5000" 
                step="100"
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value))}
                disabled={isLoading}
              />
              <span className="range-value">{radius} متر</span>
            </div>
          </div>
        </div>
        
        <div className="filters-footer">
          <button 
            className="clear-btn"
            onClick={clearFilters}
            disabled={isLoading}
          >
            إعادة تعيين
          </button>
          <button 
            className="apply-btn"
            onClick={applyFilters}
            disabled={isLoading}
          >
            تطبيق
          </button>
        </div>
        
        {isLoading && (
          <div className="filters-loading">
            <div className="spinner-sm"></div>
            <span>جار البحث...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapFilters;

import { useState, useEffect } from 'react';
import './Properties.css';

const Properties = ({ properties }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const propertiesPerPage = 3;
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Reset image loaded state when changing selected property
  useEffect(() => {
    setImageLoaded(false);
  }, [selectedProperty]);
  
  // Calculate pagination
  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
  
  // Page navigation with transition effect
  const paginate = (pageNumber) => {
    if (pageNumber === currentPage) return;
    setIsPageChanging(true);
    
    // Short delay to show loading animation
    setTimeout(() => {
      setCurrentPage(pageNumber);
      
      // Allow time for rendering before removing loading state
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
    // استخراج الرقم من معرف العقار (على افتراض أن المعرف هو "deed-X")
    const idNumber = propertyId.replace(/\D/g, '');
    return `https://github.com/Mohamed-El-Masri/balance-presentation/blob/main/public/documents/deed-${idNumber}-thumb.jpg`;
  };
  
  // تبديل حالة العرض بملء الشاشة
  const toggleFullscreen = (e) => {
    e.stopPropagation();
    setIsFullscreen(!isFullscreen);
  };

  // Function to handle keyboard accessibility for property cards
  const handleCardKeyPress = (e, property) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showPropertyDetails(property);
    }
  };

  // Function to get animated background colors for properties
  const getAnimatedGradient = (index) => {
    const colors = [
      ['#557153', '#7D8F69'],
      ['#606C5D', '#7D8F69'],
      ['#4F6F52', '#739072']
    ];
    const colorPair = colors[index % colors.length];
    return `linear-gradient(120deg, ${colorPair[0]}, ${colorPair[1]})`;
  };

  return (
    <section id="properties" className="section properties-section">
      <div className="container">
        <h2 className="section-title">قطع الأراضي</h2>
        <p className="section-subtitle">استعرض قطع الأراضي المتاحة للتحويل من فندقي إلى سكني</p>
        
        <div className={`properties-grid ${isPageChanging ? 'page-transitioning' : ''}`}>
          {loading || isPageChanging ? (
            // Loading state
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
                  '--card-animation-delay': `${index * 0.1}s`,
                  '--card-header-bg': getAnimatedGradient(index)
                }}
              >
                <div className="card-decoration"></div>
                <div className="property-card-header" style={{ background: 'var(--card-header-bg)' }}>
                  <h3>قطعة رقم: {property.property.plotNumber}</h3>
                  <span className="id-badge">{property.id}</span>
                </div>
                
                <div className="property-card-content">
                  <div className="property-info-row">
                    <div className="info-item">
                      <span className="info-icon">📍</span>
                      <div className="info-text">
                        <span className="info-label">الحي</span>
                        <span className="info-value">{property.property.neighborhood}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="property-info-row">
                    <div className="info-item">
                      <span className="info-icon">🏙️</span>
                      <div className="info-text">
                        <span className="info-label">المدينة</span>
                        <span className="info-value">{property.property.city}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="property-info-row">
                    <div className="info-item">
                      <span className="info-icon">📏</span>
                      <div className="info-text">
                        <span className="info-label">المساحة</span>
                        <span className="info-value">{property.property.area} م²</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="property-card-footer">
                  <button className="btn btn-primary">عرض التفاصيل</button>
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
        
        {/* Pagination Controls */}
        {!loading && (
          <div className="pagination" data-current-page={currentPage} data-total-pages={totalPages}>
            <button 
              className="pagination-button" 
              onClick={prevPage} 
              disabled={currentPage === 1 || isPageChanging}
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
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <button 
              className="pagination-button" 
              onClick={nextPage} 
              disabled={currentPage === totalPages || isPageChanging}
            >
              {isPageChanging ? (
                <span className="pagination-loading"></span>
              ) : (
                <>التالي</>
              )}
            </button>
          </div>
        )}
      </div>
      
      {/* نافذة منبثقة لعرض صورة الوثيقة */}
      {selectedProperty && (
        <div className={`property-modal ${isFullscreen ? 'fullscreen' : ''}`}>
          <div className="modal-overlay" onClick={closePropertyDetails}></div>
          <div className="modal-content document-modal-content">
            <button className="close-button" onClick={closePropertyDetails}>×</button>
            
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
                  
                  {/* Center fullscreen control */}
                  <div className="document-fullscreen-control" onClick={toggleFullscreen}>
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

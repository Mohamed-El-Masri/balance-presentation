import { useState, useMemo } from 'react';
import './Properties.css';

const Properties = ({ properties }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    neighborhood: 'all',
    minArea: '',
    maxArea: '',
  });
  const [selectedProperty, setSelectedProperty] = useState(null);

  // استخراج الأحياء الفريدة للفلترة
  const neighborhoods = useMemo(() => {
    const uniqueNeighborhoods = [...new Set(properties.map(property => property.property.neighborhood))];
    return ['all', ...uniqueNeighborhoods];
  }, [properties]);

  // تطبيق الفلاتر والبحث
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const searchMatch = 
        property.property.plotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.property.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const neighborhoodMatch = filters.neighborhood === 'all' || 
        property.property.neighborhood === filters.neighborhood;
      
      const area = parseFloat(property.property.area.replace(/,/g, ''));
      const minAreaMatch = !filters.minArea || area >= parseFloat(filters.minArea);
      const maxAreaMatch = !filters.maxArea || area <= parseFloat(filters.maxArea);
      
      return searchMatch && neighborhoodMatch && minAreaMatch && maxAreaMatch;
    });
  }, [properties, searchTerm, filters]);

  // تحديث الفلاتر
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // عرض تفاصيل العقار
  const showPropertyDetails = (property) => {
    setSelectedProperty(property);
    document.body.style.overflow = 'hidden'; // منع التمرير خلف النافذة المنبثقة
  };

  // إغلاق نافذة التفاصيل
  const closePropertyDetails = () => {
    setSelectedProperty(null);
    document.body.style.overflow = ''; // استعادة التمرير العادي
  };

  // تحويل الإحداثيات إلى رابط Google Maps
  const getGoogleMapsLink = (coordinates) => {
    if (!coordinates) return '#';
    
    return `https://www.google.com/maps/search/?api=1&query=${coordinates.replace(/[°'"]/g, '').replace(/N/g, '').replace(/E/g, '')}`;
  };

  return (
    <section id="properties" className="section properties-section">
      <div className="container">
        <h2 className="section-title">قطع الأراضي</h2>
        <p className="section-subtitle">استعرض قطع الأراضي المتاحة للتحويل من فندقي إلى سكني</p>
        
        <div className="filters-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="ابحث عن رقم القطعة أو الحي..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-controls">
            <div className="filter-group">
              <label htmlFor="neighborhood">الحي:</label>
              <select 
                id="neighborhood" 
                name="neighborhood" 
                value={filters.neighborhood} 
                onChange={handleFilterChange}
              >
                {neighborhoods.map(neighborhood => (
                  <option key={neighborhood} value={neighborhood}>
                    {neighborhood === 'all' ? 'جميع الأحياء' : neighborhood}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="minArea">الحد الأدنى للمساحة (م²):</label>
              <input
                id="minArea"
                name="minArea"
                type="number"
                placeholder="الحد الأدنى"
                value={filters.minArea}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label htmlFor="maxArea">الحد الأقصى للمساحة (م²):</label>
              <input
                id="maxArea"
                name="maxArea"
                type="number"
                placeholder="الحد الأقصى"
                value={filters.maxArea}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
        
        <div className="results-info">
          <p>تم العثور على <strong>{filteredProperties.length}</strong> قطعة أرض</p>
        </div>
        
        <div className="properties-grid">
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <div 
                key={property.id} 
                className="property-card"
                onClick={() => showPropertyDetails(property)}
              >
                <div className="property-card-header">
                  <h3>قطعة رقم: {property.property.plotNumber}</h3>
                  <span className="id-badge">{property.id}</span>
                </div>
                
                <div className="property-card-content">
                  <div className="property-info-row">
                    <span className="info-label">الحي:</span>
                    <span className="info-value">{property.property.neighborhood}</span>
                  </div>
                  
                  <div className="property-info-row">
                    <span className="info-label">المدينة:</span>
                    <span className="info-value">{property.property.city}</span>
                  </div>
                  
                  <div className="property-info-row">
                    <span className="info-label">المساحة:</span>
                    <span className="info-value">{property.property.area} م²</span>
                  </div>
                  
                  <div className="property-info-row">
                    <span className="info-label">رقم المخطط:</span>
                    <span className="info-value">{property.property.planNumber}</span>
                  </div>
                </div>
                
                <div className="property-card-footer">
                  <button className="btn btn-secondary">عرض التفاصيل</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>لا توجد نتائج مطابقة للبحث</p>
            </div>
          )}
        </div>
      </div>
      
      {/* نافذة منبثقة لتفاصيل العقار */}
      {selectedProperty && (
        <div className="property-modal">
          <div className="modal-overlay" onClick={closePropertyDetails}></div>
          <div className="modal-content">
            <button className="close-button" onClick={closePropertyDetails}>×</button>
            
            <h2 className="modal-title">تفاصيل قطعة الأرض</h2>
            
            <div className="modal-body">
              <div className="detail-section">
                <h3>البيانات الأساسية</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">رقم القطعة:</span>
                    <span className="detail-value">{selectedProperty.property.plotNumber}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">رقم المخطط:</span>
                    <span className="detail-value">{selectedProperty.property.planNumber}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">المساحة:</span>
                    <span className="detail-value">{selectedProperty.property.area} م²</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">الحي:</span>
                    <span className="detail-value">{selectedProperty.property.neighborhood}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">المدينة:</span>
                    <span className="detail-value">{selectedProperty.property.city}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">نوع العقار:</span>
                    <span className="detail-value">{selectedProperty.property.propertyType}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h3>بيانات الوثيقة</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">رقم الوثيقة:</span>
                    <span className="detail-value">{selectedProperty.basicData.documentNumber}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">تاريخ الوثيقة:</span>
                    <span className="detail-value">{selectedProperty.basicData.documentDate}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">تاريخ الوثيقة السابقة:</span>
                    <span className="detail-value">{selectedProperty.basicData.previousDocumentDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section location-section">
                <h3>الموقع</h3>
                <p className="coordinates">{selectedProperty.property.coordinates}</p>
                <div className="map-actions">
                  <a 
                    href={getGoogleMapsLink(selectedProperty.property.coordinates)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    فتح في خرائط Google
                  </a>
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

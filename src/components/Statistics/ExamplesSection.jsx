import React from 'react';
import { FaBuilding, FaBed, FaUsers, FaPercentage, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import './ExamplesSection.css';

// مكون لعرض التفاصيل المشتركة لكل سجل
const DetailItem = ({ icon, label, value }) => (
  <div className="example-detail-item">
    <span className="example-detail-icon">{icon}</span>
    <span className="example-detail-label">{label}:</span>
    <span className="example-detail-value">{value}</span>
  </div>
);

// مكون لعرض أمثلة المنشآت الصناعية
const IndustrialExample = ({ example }) => (
  <div className="example-card industrial">
    <div className="example-header">
      <h4>{example.name}</h4>
      <span className="example-id">{example.id}</span>
    </div>
    <div className="example-details">
      <DetailItem 
        icon={<FaBuilding />} 
        label="المساحة" 
        value={`${example.area.toLocaleString()} م²`} 
      />
      <DetailItem 
        icon={<FaUsers />} 
        label="عدد العمال" 
        value={example.workers.toLocaleString()} 
      />
      <DetailItem 
        icon={<FaPercentage />} 
        label="نسبة الإشغال" 
        value={`${example.occupancyRate}%`} 
      />
      <DetailItem 
        icon={<FaMapMarkerAlt />} 
        label="الموقع" 
        value={example.location} 
      />
      <DetailItem 
        icon={<FaCalendarAlt />} 
        label="تأسيس" 
        value={example.established} 
      />
    </div>
    <div className="example-type-badge">{example.type}</div>
  </div>
);

// مكون لعرض أمثلة المجمعات السكنية
const ResidentialExample = ({ example }) => (
  <div className="example-card residential">
    <div className="example-header">
      <h4>{example.name}</h4>
      <span className="example-id">{example.id}</span>
    </div>
    <div className="example-details">
      <DetailItem 
        icon={<FaBuilding />} 
        label="المساحة" 
        value={`${example.area.toLocaleString()} م²`} 
      />
      <DetailItem 
        icon={<FaBed />} 
        label="الوحدات" 
        value={example.units} 
      />
      <DetailItem 
        icon={<FaPercentage />} 
        label="نسبة الإشغال" 
        value={`${example.occupancyRate}%`} 
      />
      <DetailItem 
        icon={<FaMapMarkerAlt />} 
        label="الموقع" 
        value={example.location} 
      />
    </div>
    
    <div className="example-room-types">
      {example.roomTypes.map((room, idx) => (
        <div key={idx} className="room-type-item">
          <span className="room-type">{room.type}</span>
          <span className="room-count">{room.count} وحدة</span>
          <span className="room-area">{room.area} م²</span>
        </div>
      ))}
    </div>
    
    <div className="example-amenities">
      {example.amenities.map((amenity, idx) => (
        <span key={idx} className="amenity-tag">{amenity}</span>
      ))}
    </div>
  </div>
);

// مكون لعرض أمثلة الفنادق
const HotelExample = ({ example }) => (
  <div className="example-card hotel">
    <div className="example-header">
      <h4>{example.name}</h4>
      <div className="hotel-stars">
        {[...Array(example.stars)].map((_, i) => <span key={i}>★</span>)}
        {[...Array(5 - example.stars)].map((_, i) => <span key={i + example.stars} className="empty-star">☆</span>)}
      </div>
      <span className="example-id">{example.id}</span>
    </div>
    <div className="example-details">
      <DetailItem 
        icon={<FaBed />} 
        label="عدد الغرف" 
        value={example.rooms} 
      />
      <DetailItem 
        icon={<FaPercentage />} 
        label="نسبة الإشغال" 
        value={`${example.occupancyRate}%`} 
      />
      <DetailItem 
        icon={<span>★</span>} 
        label="التقييم" 
        value={example.averageRating} 
      />
      <DetailItem 
        icon={<FaMapMarkerAlt />} 
        label="الموقع" 
        value={example.location} 
      />
    </div>
    
    <div className="example-facilities">
      {example.facilities.map((facility, idx) => (
        <span key={idx} className="facility-tag">{facility}</span>
      ))}
    </div>
    
    <div className="example-room-types hotel-rooms">
      {example.roomTypes.map((room, idx) => (
        <div key={idx} className="room-type-item">
          <span className="room-type">{room.type}</span>
          <span className="room-count">{room.count} غرفة</span>
          <span className="room-price">{room.price} ر.س</span>
        </div>
      ))}
    </div>
  </div>
);

// المكون الرئيسي
const ExamplesSection = ({ activeTab, examples }) => {
  if (!examples || examples.length === 0) {
    return <div className="examples-empty">لا توجد أمثلة متاحة</div>;
  }

  return (
    <div className="examples-section">
      <h3 className="examples-title">
        {activeTab === 'industrial' && 'نماذج من المنشآت الصناعية'}
        {activeTab === 'residential' && 'نماذج من المجمعات السكنية'}
        {activeTab === 'hotels' && 'نماذج من الفنادق'}
      </h3>
      
      <div className="examples-grid">
        {examples.map((example, index) => {
          if (activeTab === 'industrial') {
            return <IndustrialExample key={example.id || index} example={example} />;
          } else if (activeTab === 'residential') {
            return <ResidentialExample key={example.id || index} example={example} />;
          } else {
            return <HotelExample key={example.id || index} example={example} />;
          }
        })}
      </div>
    </div>
  );
};

export default ExamplesSection;

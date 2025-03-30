import { useRef, useEffect, useState } from 'react';
import NearbyPlaces from './NearbyPlaces';
import './PropertyPanel.css';

/**
 * لوحة تفاصيل العقار التي تظهر عند اختيار عقار على الخريطة
 */
const PropertyPanel = ({ property, onClose, nearbyPlaces, isLoadingPlaces, coordinates }) => {
  const panelRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const miniMapRef = useRef(null);
  const miniMapMarkerRef = useRef(null);
  
  // إنشاء خريطة مصغرة
  useEffect(() => {
    if (!property || !coordinates || mapInitialized) return;
    
    // تأكد من وجود خرائط جوجل قبل إنشاء الخريطة المصغرة
    if (window.google && window.google.maps && miniMapRef.current) {
      try {
        const miniMap = new window.google.maps.Map(miniMapRef.current, {
          center: coordinates,
          zoom: 16,
          mapTypeId: 'hybrid', // نوع الخريطة: هجينة (صناعية مع تسميات)
          disableDefaultUI: true, // إخفاء عناصر التحكم الافتراضية
          zoomControl: true, // إظهار تحكم التكبير فقط
          zoomControlOptions: {
            position: window.google.maps
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { withGoogleMaps } from './MapLoader';
import MapFilters from './MapFilters';
import PropertyPanel from './PropertyPanel';
import NearbyPlaces from './NearbyPlaces';
import './MapSection.css';

const MapSection = ({ properties }) => {
  // حالات خرائط جوجل
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const placesServiceRef = useRef(null);
  
  // حالات واجهة المستخدم
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // حالات البحث والفلاتر
  const [placesFilter, setPlacesFilter] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [searchingPlaces, setSearchingPlaces] = useState(false);
  
  // تهيئة الخريطة
  const initializeMap = useCallback(() => {
    setIsLoading(true);
    
    withGoogleMaps((maps) => {
      if (!mapContainerRef.current) return;
      
      try {
        // تكوين خريطة جديدة
        const mapOptions = {
          center: { lat: 24.493718, lng: 46.925376 }, // إحداثيات الرياض
          zoom: 13,
          mapTypeControl: true,
          mapTypeControlOptions: {
            position: maps.ControlPosition.TOP_LEFT,
          },
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          zoomControlOptions: {
            position: maps.ControlPosition.LEFT_BOTTOM,
          },
          styles: [ // استايل مخصص للخريطة لتحسين المظهر
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        };
        
        // إنشاء خريطة جديدة
        const map = new maps.Map(mapContainerRef.current, mapOptions);
        mapRef.current = map;
        
        // إنشاء خدمة الأماكن لاستخدامها لاحقًا
        placesServiceRef.current = new maps.places.PlacesService(map);
        
        // إضافة مربع البحث
        const searchBoxInput = document.createElement('input');
        searchBoxInput.placeholder = 'البحث عن موقع...';
        searchBoxInput.className = 'map-search-box';
        searchBoxInput.type = 'text';
        searchBoxInput.setAttribute('aria-label', 'البحث عن موقع');
        
        map.controls[maps.ControlPosition.TOP_CENTER].push(searchBoxInput);
        
        // تكوين مربع البحث
        try {
          const searchBox = new maps.places.SearchBox(searchBoxInput);
          
          // الاستماع إلى حدث البحث
          maps.event.addListener(searchBox, 'places_changed', () => {
            const places = searchBox.getPlaces();
            if (places && places.length > 0) {
              const place = places[0];
              if (!place.geometry || !place.geometry.location) return;
              
              map.setCenter(place.geometry.location);
              map.setZoom(15);
            }
          });
        } catch (error) {
          console.warn("SearchBox issue:", error);
        }
        
        // إضافة العلامات للعقارات
        addPropertyMarkers(maps, map);
        
        // إنشاء مستمع لإغلاق لوحة التفاصيل عند النقر على الخريطة
        maps.event.addListener(map, 'click', () => {
          setSelectedProperty(null);
        });
        
        setMapLoaded(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Map initialization error:", error);
        setError("حدث خطأ أثناء تحميل الخريطة");
        setIsLoading(false);
      }
    }).catch(err => {
      setError("تعذر تحميل خرائط Google");
      setIsLoading(false);
      console.error(err);
    });
  }, [properties]);
  
  // إضافة علامات العقارات
  const addPropertyMarkers = useCallback((maps, map) => {
    // تنظيف العلامات السابقة
    if (markersRef.current.length > 0) {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    }
    
    if (!properties || !properties.length) return;
    
    const bounds = new maps.LatLngBounds();
    let validCoordinatesFound = false;
    
    // إنشاء علامات للعقارات
    properties.forEach(property => {
      try {
        // تحويل الإحداثيات من تنسيق DMS إلى عشري
        const coordsString = property.property.coordinates;
        const latLng = convertDMSToDecimal(coordsString);
        
        if (!latLng) {
          console.warn(`Invalid coordinates for property ${property.id}: ${coordsString}`);
          return;
        }
        
        validCoordinatesFound = true;
        bounds.extend(latLng);
        
        // محاولة استخدام AdvancedMarkerElement إذا كان متاحًا
        let marker;
        try {
          // تحقق مما إذا كان AdvancedMarkerElement متاحًا
          if (maps.marker && maps.marker.AdvancedMarkerElement) {
            const pinElement = document.createElement('div');
            pinElement.className = 'custom-marker';
            pinElement.innerHTML = `<span>${property.property.plotNumber}</span>`;
            pinElement.setAttribute('aria-label', `قطعة أرض رقم ${property.property.plotNumber}`);
            pinElement.setAttribute('role', 'button');
            pinElement.setAttribute('tabindex', '0');
            
            marker = new maps.marker.AdvancedMarkerElement({
              map,
              position: latLng,
              content: pinElement,
              title: `قطعة رقم ${property.property.plotNumber}`
            });
            
            // إضافة مستمع حدث
            marker.addListener('click', () => {
              setSelectedProperty(property);
              
              // إذا تم تعيين فلتر، قم بالبحث عن الأماكن المحيطة
              if (placesFilter) {
                searchNearbyPlaces(latLng, placesFilter);
              }
            });
          } else {
            // استخدام Marker التقليدي إذا كان AdvancedMarkerElement غير متاح
            marker = new maps.Marker({
              position: latLng,
              map,
              title: `قطعة رقم ${property.property.plotNumber}`,
              label: {
                text: property.property.plotNumber,
                color: 'white',
                fontSize: '12px'
              }
            });
            
            // إضافة مستمع حدث
            marker.addListener('click', () => {
              setSelectedProperty(property);
              
              // إذا تم تعيين فلتر، قم بالبحث عن الأماكن المحيطة
              if (placesFilter) {
                searchNearbyPlaces(latLng, placesFilter);
              }
            });
          }
          
          // حفظ مرجع للعلامة مع بيانات العقار للاستخدام لاحقًا
          markersRef.current.push({
            marker,
            property
          });
        } catch (error) {
          console.warn("Marker creation error:", error);
          // استخدام علامة تقليدية كخطة بديلة
          marker = new maps.Marker({
            position: latLng,
            map,
            title: `قطعة رقم ${property.property.plotNumber}`
          });
          
          marker.addListener('click', () => {
            setSelectedProperty(property);
          });
          
          markersRef.current.push({
            marker,
            property
          });
        }
      } catch (error) {
        console.error("Error adding marker for property:", property.id, error);
      }
    });
    
    // تعيين حدود الخريطة لاحتواء جميع العلامات إذا وجدت
    if (validCoordinatesFound) {
      map.fitBounds(bounds);
      
      // تعديل مستوى التكبير إذا كان مفرطًا
      const zoomChangedListener = maps.event.addListener(map, 'idle', () => {
        if (map.getZoom() > 16) {
          map.setZoom(16);
        }
        maps.event.removeListener(zoomChangedListener);
      });
    }
  }, [properties]);
  
  // البحث عن الأماكن المحيطة بناءً على الفلتر
  const searchNearbyPlaces = useCallback((location, filter) => {
    if (!placesServiceRef.current || !mapRef.current || !filter) return;
    
    setSearchingPlaces(true);
    setNearbyPlaces([]);
    
    const request = {
      location: location,
      radius: filter.radius,
      type: filter.placeType || undefined
    };
    
    placesServiceRef.current.nearbySearch(request, (results, status, pagination) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setNearbyPlaces(results);
      } else {
        console.warn("Places search failed: ", status);
        setNearbyPlaces([]);
      }
      setSearchingPlaces(false);
    });
  }, []);
  
  // معالج تغيير فلتر الأماكن
  const handleFilterChange = useCallback((filterData) => {
    setPlacesFilter(filterData);
    
    // إذا كان هناك عقار محدد، قم بالبحث عن الأماكن المحيطة به
    if (filterData && selectedProperty) {
      const coordsString = selectedProperty.property.coordinates;
      const latLng = convertDMSToDecimal(coordsString);
      
      if (latLng) {
        searchNearbyPlaces(latLng, filterData);
      }
    } else {
      // إذا تم إلغاء الفلتر، امسح الأماكن المحيطة
      setNearbyPlaces([]);
    }
  }, [searchNearbyPlaces, selectedProperty]);
  
  // تحويل الإحداثيات من تنسيق DMS إلى عشري
  const convertDMSToDecimal = (dmsString) => {
    try {
      const regex = /(\d+)°(\d+)'([\d.]+)"([NS])\s+(\d+)°(\d+)'([\d.]+)"([EW])/;
      const match = dmsString.match(regex);
      
      if (!match) return null;
      
      const [, latDeg, latMin, latSec, latDir, lngDeg, lngMin, lngSec, lngDir] = match;
      
      let latitude = parseInt(latDeg) + parseInt(latMin) / 60 + parseFloat(latSec) / 3600;
      let longitude = parseInt(lngDeg) + parseInt(lngMin) / 60 + parseFloat(lngSec) / 3600;
      
      if (latDir === 'S') latitude *= -1;
      if (lngDir === 'W') longitude *= -1;
      
      return { lat: latitude, lng: longitude };
    } catch (error) {
      console.error("Error converting coordinates:", dmsString, error);
      return null;
    }
  };
  
  // حساب مراكز قطع الأراضي للاستخدام في التصفية
  const propertiesCenters = useMemo(() => {
    if (!properties) return [];
    
    return properties
      .map(property => {
        try {
          const latLng = convertDMSToDecimal(property.property.coordinates);
          if (latLng) {
            return {
              id: property.id,
              position: latLng,
              property
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      })
      .filter(item => item !== null);
  }, [properties]);
  
  // إدارة دورة حياة الخريطة
  useEffect(() => {
    initializeMap();
    
    // تنظيف عند إزالة المكون
    return () => {
      if (markersRef.current.length > 0) {
        markersRef.current.forEach(item => {
          if (item.marker && item.marker.setMap) {
            item.marker.setMap(null);
          }
        });
      }
    };
  }, [initializeMap]);
  
  return (
    <section id="map" className="map-section section">
      <div className="container">
        <h2 className="section-title">استكشف الموقع</h2>
        <p className="section-subtitle">اكتشف قطع الأراضي المتاحة للتحويل من فندقي إلى سكني</p>
        
        <div className="map-container" aria-label="خريطة تفاعلية للمواقع">
          {error ? (
            <div className="map-error" role="alert">
              <p>{error}</p>
              <button 
                onClick={() => { setError(null); initializeMap(); }}
                className="retry-button"
                aria-label="إعادة تحميل الخريطة"
              >
                إعادة المحاولة
              </button>
            </div>
          ) : (
            <>
              <div className="map" ref={mapContainerRef}></div>
              
              {/* فلتر الأماكن المحيطة */}
              {mapLoaded && (
                <MapFilters 
                  onFilterChange={handleFilterChange}
                  isLoading={searchingPlaces}
                  disabled={!mapLoaded || isLoading}
                />
              )}
              
              {/* لوحة معلومات العقار */}
              {mapLoaded && selectedProperty && (
                <PropertyPanel 
                  property={selectedProperty} 
                  onClose={() => setSelectedProperty(null)}
                  nearbyPlaces={nearbyPlaces}
                  isLoadingPlaces={searchingPlaces}
                  coordinates={convertDMSToDecimal(selectedProperty.property.coordinates)}
                />
              )}
              
              {/* مؤشر التحميل الرئيسي */}
              {isLoading && (
                <div className="map-loading-overlay">
                  <div className="spinner"></div>
                  <p>جاري تحميل الخريطة...</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MapSection;

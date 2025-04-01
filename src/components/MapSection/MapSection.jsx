import React, { useEffect, useRef, useState } from 'react';
import InsightsList from './InsightsList'; // Import the new component
import properties from '../../assets/properties.json'; // Import JSON data
import './MapSection.css'; // Import CSS for styling

const MAPS_API_KEY = 'AIzaSyBb7zIoQBrl3GWQ2E4DyJ677ZVDtkQu'; // Replace with your actual API key
const API_URL = 'https://areainsights.googleapis.com/v1:computeInsights';

function MapSection() {
    const mapContainerRef = useRef(null); // Reference to the map container
    const [insights, setInsights] = useState([]);
    const [filterType, setFilterType] = useState(''); // Add state for filter type
    const activeMarkerRef = useRef(null); // Reference to store the active marker
    const infoWindowRef = useRef(null); // Reference to store the InfoWindow
    const mapRef = useRef(null); // Reference to store the map instance
    const searchBoxRef = useRef(null); // Reference for the search box

    useEffect(() => {
        async function loadGoogleMapsAPI() {
            return new Promise((resolve, reject) => {
                if (window.google && window.google.maps) {
                    resolve(window.google);
                    return;
                }

                const existingScript = document.querySelector(`script[src="https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}"]`);
                if (existingScript) {
                    existingScript.onload = () => resolve(window.google);
                    existingScript.onerror = () => reject(new Error('Error loading Google Maps API'));
                    return;
                }

                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}`;
                script.async = true;
                script.defer = true;

                script.onload = () => {
                    if (window.google && window.google.maps) {
                        resolve(window.google);
                    } else {
                        reject(new Error('Google Maps API failed to load'));
                    }
                };

                script.onerror = () => reject(new Error('Error loading Google Maps API'));

                document.body.appendChild(script);
            });
        }

        async function fetchNearbyPlaces(lat, lng) {
            try {
                const response = await fetch(
                    'https://places.googleapis.com/v1/places:searchNearby',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Goog-Api-Key': MAPS_API_KEY,
                            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.types',
                        },
                        body: JSON.stringify({
                            includedTypes: [
                                'corporate_office',    // مكاتب شركات
                                'lodging',             // فنادق
                                'apartment_complex',   // مجمعات سكنية
                                'real_estate_agency'   // وكالات عقارات
                            ],
                            locationRestriction: {
                                circle: {
                                    center: { latitude: lat, longitude: lng },
                                    radius: 5000, // 10 km
                                },
                            },
                        }),
                    }
                );
                const data = await response.json();
                console.log('API Response:', data); // طباعة الاستجابة في الكونسول
                setInsights(data.places || []); // تحديث البيانات
            } catch (error) {
                console.error('Error fetching nearby places:', error);
            }
        }
        
        

        async function initializeMap() {
            try {
                const google = await loadGoogleMapsAPI();
                if (!mapContainerRef.current) {
                    console.error('Map container not found');
                    return;
                }

                // Determine if we're on mobile
                const isMobile = window.innerWidth <= 768;
                
                // Use zoom level 6 for mobile, otherwise use the original zoom
                const zoomLevel = isMobile ? 14.8: 16.7;
                
                const map = new google.maps.Map(mapContainerRef.current, {
                    center: { lat: 24.490472, lng: 46.921972 }, // Keep the same center
                    zoom: zoomLevel, // Apply responsive zoom
                });

                // Store the map instance in the ref
                mapRef.current = map;
                
                // Add resize event listener to adjust zoom when screen size changes
                window.addEventListener('resize', () => {
                    const currentIsMobile = window.innerWidth <= 768;
                    if (currentIsMobile && map.getZoom() > 10) {
                        // If we're now on mobile but zoom is still high
                        map.setZoom(14.8);
                    } else if (!currentIsMobile && map.getZoom() < 10) {
                        // If we're now on desktop but zoom is still low
                        map.setZoom(16.7);
                    }
                });

                // Initialize InfoWindow
                infoWindowRef.current = new google.maps.InfoWindow();

                // Add markers from JSON data
                properties.forEach((property) => {
                    const marker = new google.maps.Marker({
                        position: {
                            lat: property.property.latitude,
                            lng: property.property.longitude,
                        },
                        map,
                        title: property.property.propertyId,
                    });

                    // تحسين إنشاء محتوى نافذة المعلومات
                    marker.addListener('click', () => {
                        const content = document.createElement('div');
                        content.style.fontFamily = 'Arial, sans-serif';
                        content.style.textAlign = 'right';  // توجيه النص للعربية
                        content.style.padding = '12px';
                        content.style.borderRadius = '8px';
                        content.style.minHeight = '100%';
                        content.className = 'map-info-content';  // إضافة class للتحكم به من CSS
                        
                        // التحقق من الوضع الداكن وتطبيق الألوان المناسبة
                        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
                        if (isDarkMode) {
                            content.style.backgroundColor = '#252525';
                            content.style.color = '#e0e0e0';
                            content.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
                        } else {
                            content.style.backgroundColor = '#f9f9f9';
                            content.style.color = '#333';
                            content.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                        }
                    
                        const title = document.createElement('strong');
                        title.textContent = property.property.propertyId;
                        title.style.fontSize = '16px';
                        title.style.color = isDarkMode ? '#e0e0e0' : '#333';
                        title.style.display = 'block';
                        title.style.marginBottom = '10px';
                        content.appendChild(title);
                    
                        const details = document.createElement('div');
                        details.style.fontSize = '14px';
                        details.style.color = isDarkMode ? '#aaaaaa' : '#555';
                        details.style.marginBottom = '15px';
                        details.innerHTML = `
                            ${property.property.city}, ${property.property.neighborhood}<br />
                            المساحة: ${property.property.area} م²
                        `;
                        content.appendChild(details);
                    
                        const button = document.createElement('button');
                        button.textContent = 'عرض الأماكن القريبة';
                        button.className = 'btn btn-success map-info-button';
                        button.style.padding = '8px 16px';
                        button.style.fontSize = '14px';
                        button.style.border = 'none';
                        button.style.borderRadius = '6px';
                        button.style.cursor = 'pointer';
                        button.onclick = () => {
                            fetchNearbyPlaces(property.property.latitude, property.property.longitude);
                        };
                        content.appendChild(button);
                    
                        infoWindowRef.current.setContent(content);
                        infoWindowRef.current.open(map, marker);
                    });
                });

                // Add click listener to the map for creating new markers
                map.addListener('click', (event) => {
                    const { latLng } = event;

                    // Remove the previous active marker if it exists
                    if (activeMarkerRef.current) {
                        activeMarkerRef.current.setMap(null);
                    }

                    // Create a new marker at the clicked location
                    activeMarkerRef.current = new google.maps.Marker({
                        position: latLng,
                        map,
                        title: 'New Marker',
                    });

                    console.log('New marker set at:', latLng.toJSON());

                    // Fetch nearby places for the clicked location
                    fetchNearbyPlaces(latLng.lat(), latLng.lng());
                });

                // Add search box functionality
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = 'Search for a location...';
                input.style.position = 'absolute';
                input.style.top = '10px';
                input.style.left = '50%';
                input.style.transform = 'translateX(-50%)';
                input.style.padding = '8px';
                input.style.width = '300px';
                input.style.border = '1px solid #ccc';
                input.style.borderRadius = '5px';
                input.style.zIndex = '5';
                mapContainerRef.current.appendChild(input);

                const searchBox = new google.maps.places.SearchBox(input);
                searchBoxRef.current = searchBox;

                mapRef.current.addListener('bounds_changed', () => {
                    searchBox.setBounds(mapRef.current.getBounds());
                });

                searchBox.addListener('places_changed', () => {
                    const places = searchBox.getPlaces();
                    if (places.length === 0) return;

                    // Clear the previous active marker
                    if (activeMarkerRef.current) {
                        activeMarkerRef.current.setMap(null);
                    }

                    const place = places[0];
                    if (!place.geometry || !place.geometry.location) return;

                    // Center the map on the searched location
                    mapRef.current.setCenter(place.geometry.location);

                    // Create a marker for the searched location
                    activeMarkerRef.current = new google.maps.Marker({
                        position: place.geometry.location,
                        map: mapRef.current,
                        title: place.name,
                    });

                    console.log('Searched location:', place);
                });

                console.info('Google Map initialized successfully');
            } catch (error) {
                console.error('Error initializing Google Map:', error);
            }
        }

        initializeMap();
    }, []);

    function handleFilterChange(event) {
        setFilterType(event.target.value); // Update the filter type
    }

    const filteredInsights = insights.filter((insight) =>
        filterType ? insight.types.includes(filterType) : true
    ); // Apply filter to insights

    console.log('Insights State:', insights); // Log the insights state

    return (
        <section className="map-section"> {/* Use a section tag for consistency */}
            <div className="container"> {/* Add a container div for alignment */}
            <h2 className="section-title" id="map-section-title">خريطة الموقع</h2>
              <p className="section-subtitle">خريطة تفاعلية للمواقع والخدمات المحيطة بمشاريع التحويل السكني</p>
        
                <div className="map-section-content"> {/* Add a content wrapper for better layout */}
                    <div className="insights-list-wrapper fixed-width"> {/* Add a class for fixed width */}
                        <div className="filter-wrapper" style={{ marginBottom: '20px', textAlign: 'right' }}> {/* Add inline styles for better alignment */}
                            <label htmlFor="filter" style={{ marginRight: '10px', fontWeight: 'bold' }}>تصفية حسب النوع:</label> {/* Arabic label */}
                            <select
                                id="filter"
                                value={filterType}
                                onChange={handleFilterChange}
                                style={{
                                    padding: '8px',
                                    fontSize: '14px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                }} // Add custom styles for dropdown
                            >
                                <option value="">الكل</option>
                                <option value="corporate_office">مكاتب شركات</option>
                                <option value="lodging">فنادق</option>
                                <option value="apartment_complex">مجمعات سكنية</option>
                                <option value="real_estate_agency">وكالات عقارات</option>
                            </select>
                        </div>
                        <InsightsList 
                            insights={filteredInsights} 
                            onPlaceClick={(place) => {
                                console.log('Selected place:', place);
                                const { location } = place;

                                // Validate latitude and longitude before proceeding
                                if (mapRef.current && location?.latitude && location?.longitude) {
                                    // Center the map on the selected place
                                    mapRef.current.setCenter({ lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) });

                                    // Remove the previous active marker if it exists
                                    if (activeMarkerRef.current) {
                                        activeMarkerRef.current.setMap(null);
                                    }

                                    // Create a new marker at the selected place's location
                                    activeMarkerRef.current = new google.maps.Marker({
                                        position: { lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) },
                                        map: mapRef.current,
                                        title: place.displayName?.text || 'Selected Place',
                                    });

                                    console.log('Marker created at:', location);
                                } else {
                                    console.error('Invalid latitude or longitude:', place);
                                }
                            }} 
                        />
                    </div>
                    <div
                        ref={mapContainerRef}
                        className="map-container" // Add a class for styling
                        aria-label="Interactive map"
                    ></div>
                </div>
            </div>
        </section>
    );
}

export default MapSection;

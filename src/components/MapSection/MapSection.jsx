import React, { useEffect, useRef, useState } from 'react';
import InsightsList from './InsightsList'; // Import the new component
import properties from '../../assets/properties.json'; // Import JSON data
import './MapSection.css'; // Import CSS for styling

const MAPS_API_KEY = 'AIzaSyAl7W7vp4Jj09LEO3lKO-UBolbcDimAWbo'; // Replace with your actual API key
const API_URL = 'https://areainsights.googleapis.com/v1:computeInsights';

function MapSection() {
    const mapContainerRef = useRef(null); // Reference to the map container
    const [insights, setInsights] = useState([]);
    const [filterType, setFilterType] = useState(''); // Add state for filter type
    const activeMarkerRef = useRef(null); // Reference to store the active marker
    const infoWindowRef = useRef(null); // Reference to store the InfoWindow
    const mapRef = useRef(null); // Reference to store the map instance

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
                                    radius: 5000,
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

                const map = new google.maps.Map(mapContainerRef.current, {
                    center: { lat: 24.492583, lng: 46.926167 }, // Default center (Riyadh)
                    zoom: 12,
                });

                // Store the map instance in the ref
                mapRef.current = map;

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

                    // Add click listener to show tooltip
                    marker.addListener('click', () => {
                        const content = document.createElement('div');
                        content.style.fontFamily = 'Arial, sans-serif';
                        content.style.textAlign = 'left';
                        content.style.padding = '10px';
                        content.style.borderRadius = '8px';
                        content.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                        content.style.backgroundColor = '#f9f9f9';

                        const title = document.createElement('strong');
                        title.textContent = property.property.propertyId;
                        title.style.fontSize = '16px';
                        title.style.color = '#333';
                        content.appendChild(title);

                        const details = document.createElement('div');
                        details.style.marginTop = '8px';
                        details.style.fontSize = '14px';
                        details.style.color = '#555';
                        details.innerHTML = `
                            ${property.property.city}, ${property.property.neighborhood}<br />
                            Area: ${property.property.area} m²
                        `;
                        content.appendChild(details);

                        const button = document.createElement('button');
                        button.textContent = 'Get Nearby Places';
                        button.className = 'btn btn-success'; // Use Bootstrap classes for styling
                        button.style.marginTop = '12px';
                        button.style.padding = '8px 16px';
                        button.style.fontSize = '14px';
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
                <h2 className="section-title">استكشف الأماكن القريبة</h2> {/* Update title to Arabic */}
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

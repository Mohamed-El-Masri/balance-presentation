import React, { useEffect, useRef, useState } from 'react';
import InsightsList from './InsightsList'; // Import the new component
import properties from '../../assets/properties.json'; // Import JSON data
import './MapSection.css'; // Import CSS for styling

const MAPS_API_KEY = 'AIzaSyAl7W7vp4Jj09LEO3lKO-UBolbcDimAWbo'; // Replace with your actual API key
const API_URL = 'https://areainsights.googleapis.com/v1:computeInsights';

function MapSection() {
    const mapContainerRef = useRef(null); // Reference to the map container
    const [insights, setInsights] = useState([]);
    const activeMarkerRef = useRef(null); // Reference to store the active marker
    const infoWindowRef = useRef(null); // Reference to store the InfoWindow

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
                            includedTypes: ['restaurant', 'cafe'],
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
                console.log('API Response:', data); // Log the API response
                setInsights(data.places || []); // Update insights
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

    console.log('Insights State:', insights); // Log the insights state

    return (
        <section className="map-section"> {/* Use a section tag for consistency */}
            <div className="container"> {/* Add a container div for alignment */}
                <h2 className="section-title">Explore Nearby Places</h2> {/* Add a title for better context */}
                <div className="map-section-content"> {/* Add a content wrapper for better layout */}
                    <div className="insights-list-wrapper fixed-width"> {/* Add a class for fixed width */}
                        <InsightsList insights={insights} /> {/* Pass insights to the new component */}
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

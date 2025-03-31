import React, { useEffect, useRef, useState } from 'react';
import InsightsList from './InsightsList'; // Import the new component
import './MapSection.css'; // Import CSS for styling

const MAPS_API_KEY = 'AIzaSyAl7W7vp4Jj09LEO3lKO-UBolbcDimAWbo'; // Replace with your actual API key
const API_URL = 'https://areainsights.googleapis.com/v1:computeInsights';
 
function MapSection() {
    const mapContainerRef = useRef(null); // Reference to the map container
    const [insights, setInsights] = useState([]);

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
                    center: { lat: 37.7749, lng: -122.4194 }, // Default center (San Francisco)
                    zoom: 12,
                });

                let activeMarker = null; // Variable to store the active marker

                // Add click listener to the map
                map.addListener('click', (event) => {
                    const { latLng } = event;

                    // Remove the old marker if it exists
                    if (activeMarker) {
                        activeMarker.setMap(null);
                    }

                    // Create a new marker at the clicked location
                    activeMarker = new google.maps.Marker({
                        position: latLng,
                        map,
                        title: 'Selected Location',
                    });

                    console.log('Marker set at:', latLng.toJSON());

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

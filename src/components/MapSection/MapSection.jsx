import React, { useEffect, useRef, useState } from "react";
import InsightsList from "./InsightsList"; // Import the new component
import properties from "../../assets/properties.json"; // Import JSON data
import "./MapSection.css"; // Import CSS for styling

const MAPS_API_KEY = "AIzaSyBb7zIoQBrl3GWQ2E4DyJ677ZVDtkQu_sQ"; // Replace with your actual API key
const API_URL = "https://areainsights.googleapis.com/v1:computeInsights";

function MapSection() {
  const mapContainerRef = useRef(null); // Reference to the map container
  const [insights, setInsights] = useState([]);
  const [filterType, setFilterType] = useState(""); // Add state for filter type
  const activeMarkerRef = useRef(null); // Reference to store the active marker
  const infoWindowRef = useRef(null); // Reference to store the InfoWindow
  const mapRef = useRef(null); // Reference to store the map instance
  const searchBoxRef = useRef(null); // Reference for the search box
  const searchMarkersRef = useRef([]); // Reference to store markers from the search

  useEffect(() => {
    async function loadGoogleMapsAPI() {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps && window.google.maps.places) {
          resolve(window.google);
          return;
        }

        const existingScript = document.querySelector(
          `script[src="https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places&language=ar"]`
        );
        if (existingScript) {
          existingScript.onload = () => resolve(window.google);
          existingScript.onerror = () =>
            reject(new Error("Error loading Google Maps API"));
          return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places&language=ar`; // Arabic language support
        script.async = true;
        script.defer = true;

        script.onload = () => {
          if (
            window.google &&
            window.google.maps &&
            window.google.maps.places
          ) {
            resolve(window.google);
          } else {
            reject(new Error("Google Maps API failed to load"));
          }
        };

        script.onerror = () =>
          reject(new Error("Error loading Google Maps API"));

        document.body.appendChild(script);
      });
    }

    async function fetchNearbyPlaces(lat, lng) {
      try {
        const response = await fetch(
          "https://places.googleapis.com/v1/places:searchNearby",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": MAPS_API_KEY,
              "X-Goog-FieldMask":
                "places.displayName,places.formattedAddress,places.location,places.types",
            },
            body: JSON.stringify({
              includedTypes: [
                "corporate_office", // Corporate offices
                "lodging", // Hotels
                "apartment_complex", // Residential complexes
                "real_estate_agency", // Real estate agencies
              ],
              locationRestriction: {
                circle: {
                  center: { latitude: lat, longitude: lng },
                  radius: 5000, // 5 km radius
                },
              },
            }),
          }
        );
        const data = await response.json();
        console.log("API Response:", data); // Log API response for debugging
        setInsights(data.places || []); // Update insights state
      } catch (error) {
        console.error("Error fetching nearby places:", error);
      }
    }

    async function initializeMap() {
      try {
        const google = await loadGoogleMapsAPI();
        if (!mapContainerRef.current) {
          console.error("Map container not found");
          return;
        }

        // Determine if we're on mobile
        const isMobile = window.innerWidth <= 768;

        // Use zoom level 6 for mobile, otherwise use the original zoom
        const zoomLevel = isMobile ? 14.8 : 16.7;

        const map = new google.maps.Map(mapContainerRef.current, {
          center: { lat: 24.490472, lng: 46.921972 }, // Keep the same center
          zoom: zoomLevel, // Apply responsive zoom
        });

        // Store the map instance in the ref
        mapRef.current = map;

        // Add resize event listener to adjust zoom when screen size changes
        window.addEventListener("resize", () => {
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
          marker.addListener("click", () => {
            const content = document.createElement("div");
            content.style.fontFamily = "Arial, sans-serif";
            content.style.textAlign = "right"; // توجيه النص للعربية
            content.style.padding = "12px";
            content.style.borderRadius = "8px";
            content.style.minHeight = "100%";
            content.className = "map-info-content"; // إضافة class للتحكم به من CSS

            // التحقق من الوضع الداكن وتطبيق الألوان المناسبة
            const isDarkMode =
              document.documentElement.getAttribute("data-theme") === "dark";
            if (isDarkMode) {
              content.style.backgroundColor = "#252525";
              content.style.color = "#e0e0e0";
              content.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
            } else {
              content.style.backgroundColor = "#f9f9f9";
              content.style.color = "#333";
              content.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }

            const title = document.createElement("strong");
            title.textContent = property.property.propertyId;
            title.style.fontSize = "16px";
            title.style.color = isDarkMode ? "#e0e0e0" : "#333";
            title.style.display = "block";
            title.style.marginBottom = "10px";
            content.appendChild(title);

            const details = document.createElement("div");
            details.style.fontSize = "14px";
            details.style.color = isDarkMode ? "#aaaaaa" : "#555";
            details.style.marginBottom = "15px";
            details.innerHTML = `
                            ${property.property.city}, ${property.property.neighborhood}<br />
                            المساحة: ${property.property.area} م²
                        `;
            content.appendChild(details);

            const button = document.createElement("button");
            button.textContent = "عرض الأماكن القريبة";
            button.className = "btn btn-success map-info-button";
            button.style.padding = "8px 16px";
            button.style.fontSize = "14px";
            button.style.border = "none";
            button.style.borderRadius = "6px";
            button.style.cursor = "pointer";
            button.onclick = () => {
              fetchNearbyPlaces(
                property.property.latitude,
                property.property.longitude
              );
            };
            content.appendChild(button);

            infoWindowRef.current.setContent(content);
            infoWindowRef.current.open(map, marker);
          });
        });

        // Add click listener to the map for creating new markers
        map.addListener("click", (event) => {
          const { latLng } = event;

          // Remove the previous active marker if it exists
          if (activeMarkerRef.current) {
            activeMarkerRef.current.setMap(null);
          }

          // Create a new marker at the clicked location
          activeMarkerRef.current = new google.maps.Marker({
            position: latLng,
            map,
            title: "New Marker",
          });

          console.log("New marker set at:", latLng.toJSON());

          // Fetch nearby places for the clicked location
          fetchNearbyPlaces(latLng.lat(), latLng.lng());
        });

        // Add search box functionality
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "ابحث عن موقع..."; // Arabic placeholder for "Search for a location..."
        input.style.position = "absolute";
        input.style.top = "60px"; // Adjusted to align better with buttons and map layout
        input.style.left = "50%";
        input.style.transform = "translateX(-50%)";
        input.style.padding = "10px"; // Increased padding for comfort
        input.style.width = window.innerWidth <= 768 ? "90%" : "350px"; // Adjust width for responsiveness
        input.style.border = "1px solid #ccc";
        input.style.borderRadius = "8px"; // Rounded corners for a modern look
        input.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)"; // Subtle shadow for depth
        input.style.fontSize = "16px"; // Larger font size for readability
        input.style.zIndex = "5";
        mapContainerRef.current.appendChild(input);

        // Add resize event listener to adjust styles dynamically
        window.addEventListener("resize", () => {
          input.style.width = window.innerWidth <= 768 ? "90%" : "350px";
        });

        const searchBox = new google.maps.places.SearchBox(input);
        searchBoxRef.current = searchBox;

        mapRef.current.addListener("bounds_changed", () => {
          searchBox.setBounds(mapRef.current.getBounds());
        });

        searchBox.addListener("places_changed", () => {
          const places = searchBox.getPlaces();
          if (places.length === 0) return;

          // Remove all previous search markers
          searchMarkersRef.current.forEach((marker) => marker.setMap(null));
          searchMarkersRef.current = [];

          // Create markers for all search results
          const bounds = new google.maps.LatLngBounds();
          places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) return;

            const marker = new google.maps.Marker({
              position: place.geometry.location,
              map: mapRef.current,
              title: place.name,
              label: {
                text: place.name,
                color: "#5B5B5B", // Darker gray for better readability
                fontSize: "11px", // Slightly smaller, more professional size
                fontWeight: "500", // Medium weight instead of bold for cleaner look
                className: "custom-marker-label",
              },
              icon: {
                url: "/src/assets/mapmarker.png", // More modern Google-style icon
                scaledSize: new google.maps.Size(24, 36), // Proper sizing for the icon
                labelOrigin: new google.maps.Point(12, 42), // Better label positioning
              },
            });

            // Add animation for a more professional feel
            marker.setAnimation(google.maps.Animation.DROP);

            // Handle marker hover effects for better interactivity
            const originalIcon = marker.getIcon();
            marker.addListener("mouseover", () => {
              marker.setIcon({
                ...originalIcon,
                scaledSize: new google.maps.Size(26, 39), // Slightly larger on hover
              });
            });
            marker.addListener("mouseout", () => {
              marker.setIcon(originalIcon);
            });

            // Store the new marker in the searchMarkersRef
            searchMarkersRef.current.push(marker);

            // Add click listener to each marker
            marker.addListener("click", () => {
              if (infoWindowRef.current) {
                const content = document.createElement("div");
                content.style.fontFamily = "Arial, sans-serif";
                content.style.padding = "10px";

                const title = document.createElement("strong");
                title.textContent = place.name;
                title.style.display = "block";
                title.style.marginBottom = "8px";
                content.appendChild(title);

                const address = document.createElement("p");
                address.textContent =
                  place.formatted_address || "No address available";
                address.style.marginBottom = "10px";
                content.appendChild(address);

                const button = document.createElement("button");
                button.textContent = "عرض الأماكن القريبة"; // Arabic for "Show Nearby Places"
                button.style.padding = "10px 16px";
                button.style.fontSize = "14px";
                button.style.border = "none";
                button.style.borderRadius = "8px"; // Rounded corners for better UX
                button.style.backgroundColor = "#28a745";
                button.style.color = "#fff";
                button.style.cursor = "pointer";
                button.style.transition = "background-color 0.3s ease"; // Smooth hover effect
                button.onmouseover = () =>
                  (button.style.backgroundColor = "#218838"); // Darker green on hover
                button.onmouseout = () =>
                  (button.style.backgroundColor = "#28a745"); // Reset color on mouse out
                button.onclick = () => {
                  const location = place.geometry.location;
                  fetchNearbyPlaces(location.lat(), location.lng());
                };
                content.appendChild(button);

                infoWindowRef.current.setContent(content);
                infoWindowRef.current.open(mapRef.current, marker);
              }
            });

            // Extend the bounds to include this marker's location
            bounds.extend(place.geometry.location);
          });

          // Adjust the map to fit all markers
          mapRef.current.fitBounds(bounds);

          // Suggestion dropdown logic
          const suggestionContainer = document.createElement("div");
          suggestionContainer.style.position = "absolute";
          suggestionContainer.style.top = "75px"; // Below the search bar
          suggestionContainer.style.left = "50%";
          suggestionContainer.style.transform = "translateX(-50%)";
          suggestionContainer.style.width = "350px";
          suggestionContainer.style.backgroundColor = "#fff";
          suggestionContainer.style.border = "1px solid #ccc";
          suggestionContainer.style.borderRadius = "8px";
          suggestionContainer.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
          suggestionContainer.style.zIndex = "1000";
          suggestionContainer.style.maxHeight = "200px";
          suggestionContainer.style.overflowY = "auto";

          places.forEach((place) => {
            const suggestionItem = document.createElement("div");
            suggestionItem.textContent = place.name;
            suggestionItem.style.padding = "10px";
            suggestionItem.style.cursor = "pointer";
            suggestionItem.style.borderBottom = "1px solid #eee";
            suggestionItem.onmouseover = () =>
              (suggestionItem.style.backgroundColor = "#f9f9f9");
            suggestionItem.onmouseout = () =>
              (suggestionItem.style.backgroundColor = "#fff");
            suggestionItem.onclick = () => {
              mapRef.current.setCenter(place.geometry.location);
              mapRef.current.setZoom(16);
              suggestionContainer.remove();
            };
            suggestionContainer.appendChild(suggestionItem);
          });

          document.body.appendChild(suggestionContainer);

          // Remove suggestions when clicking outside
          document.addEventListener(
            "click",
            (event) => {
              if (!suggestionContainer.contains(event.target)) {
                suggestionContainer.remove();
              }
            },
            { once: true }
          );
        });
      } catch (error) {
        console.error("Error initializing Google Map:", error);
      }
    }

    initializeMap();
  }, []);

  function handleFilterChange(event) {
    const selectedFilter = event.target.value;
    setFilterType(selectedFilter); // Update the filter type

    if (selectedFilter === "lodging") {
      // If "فنادق" (hotels) is selected, highlight all nearby hotels
      const bounds = new google.maps.LatLngBounds();
      const hotelMarkers = [];

      insights.forEach((insight) => {
        if (insight.types.includes("lodging")) {
          const marker = new google.maps.Marker({
            position: {
              lat: insight.location.latitude,
              lng: insight.location.longitude,
            },
            map: mapRef.current,
            title: insight.displayName?.text || "Hotel",
          });

          hotelMarkers.push(marker);
          bounds.extend(marker.getPosition());
        }
      });

      // Adjust the map to fit all hotel markers
      if (hotelMarkers.length > 0) {
        mapRef.current.fitBounds(bounds);
      }
    }
  }

  function resetToJSONPlaces() {
    // Clear all search markers
    searchMarkersRef.current.forEach((marker) => marker.setMap(null));
    searchMarkersRef.current = [];

    // Clear active marker
    if (activeMarkerRef.current) {
      activeMarkerRef.current.setMap(null);
      activeMarkerRef.current = null;
    }

    // Reset map view and add markers from JSON data
    const bounds = new google.maps.LatLngBounds();
    properties.forEach((property) => {
      const marker = new google.maps.Marker({
        position: {
          lat: property.property.latitude,
          lng: property.property.longitude,
        },
        map: mapRef.current,
        title: property.property.propertyId,
      });

      bounds.extend(marker.getPosition());
    });

    // Adjust the map to fit all JSON markers
    mapRef.current.fitBounds(bounds);
  }

  const filteredInsights = insights.filter((insight) =>
    filterType ? insight.types.includes(filterType) : true
  ); // Apply filter to insights

  console.log("Insights State:", insights); // Log the insights state

  return (
    <section className='map-section'>
      {" "}
      {/* Use a section tag for consistency */}
      <div className='container'>
        {" "}
        {/* Add a container div for alignment */}
        <h2
          className='section-title'
          id='map-section-title'>
          خريطة الموقع
        </h2>
        <p className='section-subtitle'>
          خريطة تفاعلية للمواقع والخدمات المحيطة بمشاريع التحويل السكني
        </p>
        <div className='map-section-content'>
          {" "}
          {/* Add a content wrapper for better layout */}
          <div className='insights-list-wrapper fixed-width'>
            {" "}
            {/* Add a class for fixed width */}
            <div
              className='filter-wrapper'
              style={{ marginBottom: "20px", textAlign: "right" }}>
              <label
                htmlFor='filter'
                style={{
                  marginRight: "10px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#333",
                }}>
                تصفية حسب النوع:
              </label>
              <select
                id='filter'
                value={filterType}
                onChange={handleFilterChange}
                style={{
                  padding: "10px", // Increased padding for better usability
                  fontSize: "16px", // Larger font size for readability
                  borderRadius: "8px", // Rounded corners for a modern look
                  border: "1px solid #ccc",
                  outline: "none",
                  backgroundColor: "#f9f9f9", // Light background for better contrast
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                  cursor: "pointer", // Pointer cursor for better interactivity
                  transition: "all 0.3s ease", // Smooth transition for hover effects
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#e6e6e6")
                } // Hover effect
                onMouseOut={(e) => (e.target.style.backgroundColor = "#f9f9f9")} // Reset hover effect
              >
                <option value=''>الكل</option>
                <option value='corporate_office'>مكاتب شركات</option>
                <option value='lodging'>فنادق</option>
                <option value='apartment_complex'>مجمعات سكنية</option>
                <option value='real_estate_agency'>وكالات عقارات</option>
              </select>
            </div>
            <button
              onClick={resetToJSONPlaces}
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "var(--secondary-color, #C8B09A)", // Using theme variable
                color: "white",
                cursor: "pointer",
                marginBottom: "20px",
                marginTop: "20px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // width: "90%", // Take full width of parent
                maxWidth: "300px", // Limit max width for larger screens
                marginLeft: "auto",
                marginRight: "auto", // Center the button
                textAlign: "center",
                textDecoration: "none",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor =
                  "var(--primary-color, #565F58)"; // Primary color on hover
                e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
                e.target.style.transform = "translateY(-2px)"; // Subtle lift effect
               
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor =
                  "var(--secondary-color, #C8B09A)"; // Reset to secondary color
                e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                e.target.style.transform = "translateY(0)";
              }}>
              <span style={{ marginLeft: "8px", }}>↻</span> إعادة تعيين
            </button>
            
            <InsightsList
              insights={filteredInsights}
              onPlaceClick={(place) => {
                console.log("Selected place:", place);
                const { location } = place;

                // Validate latitude and longitude before proceeding
                if (
                  mapRef.current &&
                  location?.latitude &&
                  location?.longitude
                ) {
                  // Center the map on the selected place
                  mapRef.current.setCenter({
                    lat: parseFloat(location.latitude),
                    lng: parseFloat(location.longitude),
                  });

                  // Remove the previous active marker if it exists
                  if (activeMarkerRef.current) {
                    activeMarkerRef.current.setMap(null);
                  }

                  // Create a new marker at the selected place's location
                  activeMarkerRef.current = new google.maps.Marker({
                    position: {
                      lat: parseFloat(location.latitude),
                      lng: parseFloat(location.longitude),
                    },
                    map: mapRef.current,
                    title: place.displayName?.text || "Selected Place",
                  });

                  console.log("Marker created at:", location);
                } else {
                  console.error("Invalid latitude or longitude:", place);
                }
              }}
            />
          </div>
          <div
            ref={mapContainerRef}
            className='map-container' // Add a class for styling
            aria-label='Interactive map'></div>
        </div>
      </div>
    </section>
  );
}

export default MapSection;

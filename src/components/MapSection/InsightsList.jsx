import React, { useState } from 'react';

function InsightsList({ insights, onPlaceClick = () => {} }) {
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { label: 'All', value: 'all' },
        { label: 'Restaurants', value: 'restaurant' },
        { label: 'Cafes', value: 'cafe' },
    ];

    const filteredInsights = insights.filter((place) => {
        if (activeFilter === 'all') return true;
        return place.types?.includes(activeFilter);
    });

    if (insights.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '20px', color: '#555' }}>
                <p>No nearby places found. Click on the map to search.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>Nearby Places</h2>
            {/* <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '10px' }}>
                {filters.map((filter) => (
                    <button
                        key={filter.value}
                        className='btn btn-secondary'
                        onClick={() => setActiveFilter(filter.value)}
                        style={{
                            fontWeight: activeFilter === filter.value ? 'bold' : 'normal',
                        }}
                    >
                        {filter.label}
                    </button>
                ))}
            </div> */}
            <ul
                style={{
                    listStyleType: 'none',
                    padding: 0,
                    margin: 0,
                    maxHeight: '300px', // Limit the height of the list
                    overflowY: 'auto', // Enable vertical scrolling
                    border: '1px solid #ddd', // Optional: Add a border for the scrollable area
                    borderRadius: '4px', // Optional: Match the border radius
                }}
            >
                {filteredInsights.map((place, index) => (
                    <li
                        key={index}
                        style={{
                            padding: '15px',
                            marginBottom: '15px',
                            backgroundColor: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s, box-shadow 0.3s, opacity 0.5s',
                            cursor: 'pointer',
                            width: '100%',
                            maxWidth: '400px',
                            opacity: 0,
                            animation: 'fadeIn 0.5s ease-in-out forwards',
                            animationDelay: `${index * 0.1}s`, // Staggered animation
                        }}
                        onClick={() => onPlaceClick(place)} // Trigger callback on click
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        <strong style={{ color: '#333', fontSize: '18px', display: 'block', marginBottom: '8px' }}>
                            {typeof place.displayName === 'object' 
                                ? place.displayName.ar || place.displayName.text 
                                : place.displayName || 'اسم غير معروف'}
                        </strong>
                        <p style={{ margin: 0, color: '#777', fontSize: '14px' }}>
                            {typeof place.formattedAddress === 'object'
                                ? place.formattedAddress.ar || place.formattedAddress.text
                                : place.formattedAddress || 'عنوان غير معروف'}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Add keyframes for the fade-in animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
`;
document.head.appendChild(style);

export default InsightsList;

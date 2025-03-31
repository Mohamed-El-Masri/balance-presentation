import React, { useState, useEffect } from 'react';

function InsightsList({ insights, onPlaceClick = () => {} }) {
    const [activeFilter, setActiveFilter] = useState('all');
    const [animatedItems, setAnimatedItems] = useState({});

    // تطبيق تأثير ظهور العناصر تدريجياً
    useEffect(() => {
        const newAnimatedItems = {};
        insights.forEach((_, index) => {
            setTimeout(() => {
                newAnimatedItems[index] = true;
                setAnimatedItems({...newAnimatedItems});
            }, index * 100);
        });
    }, [insights]);

    const filteredInsights = insights.filter((place) => {
        if (activeFilter === 'all') return true;
        return place.types?.includes(activeFilter);
    });

    if (insights.length === 0) {
        return (
            <div className="no-insights-message">
                <p>لا توجد أماكن قريبة. انقر على الخريطة أو اختر قطعة أرض لعرض الأماكن القريبة</p>
            </div>
        );
    }

    return (
        <div className="insights-container">
            <h2>الأماكن القريبة</h2>
            <ul className="insights-list">
                {filteredInsights.map((place, index) => (
                    <li
                        key={index}
                        className={`insight-item ${animatedItems[index] ? 'animated' : ''}`}
                        onClick={() => onPlaceClick(place)}
                    >
                        <strong>
                            {typeof place.displayName === 'object' 
                                ? place.displayName.ar || place.displayName.text 
                                : place.displayName || 'اسم غير معروف'}
                        </strong>
                        <p>
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

export default InsightsList;

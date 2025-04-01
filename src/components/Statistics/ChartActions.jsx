import React from 'react';
// Eliminamos la importación de PropTypes
import { FaSearch, FaDownload } from 'react-icons/fa';

const ChartActions = ({ chartType, handleZoomChart, downloadChartImage }) => {
  return (
    <div className="stats-module__chart-actions">
      <button 
        className="stats-module__chart-action-btn" 
        title="تكبير الرسم البياني" 
        aria-label="تكبير الرسم البياني"
        onClick={() => handleZoomChart(chartType)}
        type="button"
      >
        <FaSearch />
      </button>
      <button 
        className="stats-module__chart-action-btn" 
        title="تنزيل كصورة" 
        aria-label="تنزيل كصورة"
        onClick={() => downloadChartImage(chartType)}
        type="button"
      >
        <FaDownload />
      </button>
    </div>
  );
};

// Eliminamos la definición de PropTypes
// ChartActions.propTypes = {
//   chartType: PropTypes.string.isRequired,
//   handleZoomChart: PropTypes.func.isRequired,
//   downloadChartImage: PropTypes.func.isRequired
// };

export default ChartActions;

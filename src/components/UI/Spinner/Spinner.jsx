import React from 'react';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="spinner-inner">
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div>
    </div>
  );
};

export default Spinner;

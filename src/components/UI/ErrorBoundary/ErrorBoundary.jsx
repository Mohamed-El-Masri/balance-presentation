import React, { Component } from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: ''
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      errorMessage: error.toString()
    };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <div className="error-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2>عذراً، حدث خطأ غير متوقع</h2>
            <p className="error-message">{this.state.errorMessage}</p>
            <button onClick={this.handleReload} className="error-button">
              <i className="fas fa-sync-alt"></i> إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import { Component } from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // تحديث الحالة لعرض واجهة الخطأ البديلة
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // يمكنك تسجيل الخطأ في خدمة تسجيل الأخطاء
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // هنا يمكنك إرسال الخطأ إلى خدمة تحليل الأخطاء مثل Sentry أو Google Analytics
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-container">
            <h2>عذراً، حدث خطأ ما</h2>
            <p>نعتذر عن هذا الخلل. يرجى تحديث الصفحة أو المحاولة لاحقاً.</p>
            <div className="error-actions">
              <button 
                className="retry-button"
                onClick={() => window.location.reload()}
              >
                تحديث الصفحة
              </button>
              <button 
                className="home-button"
                onClick={() => window.location.href = '/'}
              >
                العودة للرئيسية
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>تفاصيل الخطأ (للمطورين فقط)</summary>
                <p>{this.state.error.toString()}</p>
                <p>موقع الخطأ:</p>
                <pre>{this.state.errorInfo?.componentStack}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    // إذا لم يكن هناك خطأ، يتم عرض المحتوى الطبيعي
    return this.props.children;
  }
}

export default ErrorBoundary;

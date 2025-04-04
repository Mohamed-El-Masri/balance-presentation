import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// تعريف متغيرات بيئة التطبيق للوصول إليها من أي مكان
window.APP_CONFIG = {
  apiKey: 'AIzaSyBb7zIoQBrl3GWQ2E4DyJ677ZVDtkQu_sQ',
  baseURL: '',
  version: '1.0.0',
};

// معالجة الأخطاء العامة في التطبيق
window.onerror = (message, source, lineno, colno, error) => {
  console.error('خطأ غير معالج:', { message, source, lineno, colno });
  // يمكن إضافة كود لإرسال الأخطاء إلى نظام تتبع الأخطاء
  return false;
};

// Create a root for the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

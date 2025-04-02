import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

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

// تهيئة جذر التطبيق
const root = createRoot(document.getElementById('root'));

root.render(
  // <StrictMode>
    <App />
  // </StrictMode>,
);

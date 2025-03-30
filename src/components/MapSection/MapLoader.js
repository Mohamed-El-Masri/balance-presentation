// مساعد لتحميل Google Maps API مرة واحدة فقط وبكفاءة عالية
let googleMapsPromise = null;
let retryCount = 0;
const MAX_RETRIES = 3;

const MAPS_API_KEY = 'AIzaSyAl7W7vp4Jj09LEO3lKO-UBolbcDimAWbo';

/**
 * تحميل Google Maps API بأسلوب كفء، مع معالجة الفشل وإعادة المحاولة
 * @returns {Promise} وعد يحل عند تحميل الخريطة
 */
const loadGoogleMapsAPI = () => {
  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  googleMapsPromise = new Promise((resolve, reject) => {
    // تحقق إذا كان API قد تم تحميله بالفعل
    if (window.google && window.google.maps) {
      console.info("Google Maps API already loaded");
      return resolve(window.google.maps);
    }

    // تعريف دالة لإعادة المحاولة في حالة الفشل
    const retryLoading = () => {
      if (retryCount >= MAX_RETRIES) {
        reject(new Error(`Failed to load Google Maps API after ${MAX_RETRIES} attempts`));
        return;
      }
      
      retryCount++;
      console.info(`Retrying Google Maps API load (attempt ${retryCount} of ${MAX_RETRIES})`);
      // إزالة العنصر السكريبت القديم إن وجد
      const oldScript = document.getElementById('google-maps-api');
      if (oldScript) {
        document.body.removeChild(oldScript);
      }
      
      // محاولة تحميل جديدة بعد تأخير قصير
      setTimeout(() => loadScript(), 1000);
    };

    // تعريف callback للتحميل الناجح
    window.initGoogleMapsAPI = () => {
      console.info("Google Maps API loaded successfully");
      if (window.google && window.google.maps) {
        retryCount = 0; // إعادة تعيين عداد المحاولات
        resolve(window.google.maps);
      } else {
        retryLoading();
      }
    };

    // دالة لإنشاء السكريبت وتحميل API
    const loadScript = () => {
      const script = document.createElement('script');
      script.id = 'google-maps-api';
      script.async = true;
      script.defer = true;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places,drawing&callback=initGoogleMapsAPI&loading=async`;
      
      script.onerror = (error) => {
        console.error('Error loading Google Maps API:', error);
        retryLoading();
      };
      
      document.body.appendChild(script);
    };

    // بدء تحميل السكريبت
    loadScript();
  });

  return googleMapsPromise;
};

/**
 * دالة مساعدة تضمن وجود خرائط جوجل قبل تنفيذ الكود
 * @param {Function} callbackFn الدالة التي ستنفذ بعد تحميل الخرائط
 * @returns {Promise} نتيجة تنفيذ الدالة
 */
const withGoogleMaps = async (callbackFn) => {
  try {
    const maps = await loadGoogleMapsAPI();
    return callbackFn(maps);
  } catch (error) {
    console.error("Failed to load Google Maps:", error);
    throw error;
  }
};

/**
 * دالة لإعادة تعيين وعد تحميل الخرائط - مفيدة لاختبار إعادة التحميل
 */
const resetGoogleMapsPromise = () => {
  googleMapsPromise = null;
  retryCount = 0;
};

export { loadGoogleMapsAPI, withGoogleMaps, resetGoogleMapsPromise };

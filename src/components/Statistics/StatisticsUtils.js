/**
 * تنسيق الأرقام بإضافة فواصل بين الآلاف
 * @param {number} num - الرقم المراد تنسيقه
 * @returns {string} - الرقم المنسق
 */
export const formatNumber = (num) => {
  if (num === undefined || num === null) return '0';
  return new Intl.NumberFormat('ar-SA').format(num);
};

/**
 * تحديد اتجاه النمو (موجب/سالب) استناداً إلى بيانات الإشغال
 * @param {object} data - بيانات الإحصاءات
 * @returns {object|null} - معلومات الاتجاه
 */
export const getTrendDirection = (data) => {
  if (!data || !data.chartData || !data.chartData.usage) return null;
  
  const usageData = data.chartData.usage || [];
  
  if (usageData.length < 2) return null;
  
  const lastYear = usageData[usageData.length - 1];
  const previousYear = usageData[usageData.length - 2];
  const diff = lastYear - previousYear;
  
  return {
    direction: diff >= 0 ? 'positive' : 'negative',
    percentage: Math.abs(Math.round(diff))
  };
};

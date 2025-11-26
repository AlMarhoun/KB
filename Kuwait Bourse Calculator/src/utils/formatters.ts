/**
 * Utility functions for formatting numbers in Kuwait Bourse Calculator
 */

/**
 * Format number with locale-specific formatting
 * @param num - Number to format
 * @param locale - 'ar' for Arabic or 'en' for English
 * @param decimals - Number of decimal places (default: 3 for fils)
 */
export function formatNumber(
  num: number,
  locale: 'ar' | 'en' = 'en',
  decimals: number = 3
): string {
  const localeString = locale === 'ar' ? 'ar-KW' : 'en-US';
  return num.toLocaleString(localeString, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format currency in Kuwaiti Dinars
 * @param fils - Amount in fils
 * @param locale - 'ar' for Arabic or 'en' for English
 */
export function formatKD(fils: number, locale: 'ar' | 'en' = 'en'): string {
  const kd = fils / 1000;
  const localeString = locale === 'ar' ? 'ar-KW' : 'en-US';
  return kd.toLocaleString(localeString, {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}

/**
 * Format percentage
 * @param value - Decimal value (e.g., 0.08 for 8%)
 * @param locale - 'ar' for Arabic or 'en' for English
 */
export function formatPercent(
  value: number,
  locale: 'ar' | 'en' = 'en'
): string {
  const localeString = locale === 'ar' ? 'ar-KW' : 'en-US';
  return (value * 100).toLocaleString(localeString, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
}

/**
 * Parse input string to number, handling both Arabic and English numerals
 * @param value - Input string value
 */
export function parseInputNumber(value: string): number {
  // Replace Arabic numerals with English numerals
  const arabicToEnglish: { [key: string]: string } = {
    '٠': '0',
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
  };

  let normalized = value;
  Object.keys(arabicToEnglish).forEach((arabic) => {
    normalized = normalized.replace(
      new RegExp(arabic, 'g'),
      arabicToEnglish[arabic]
    );
  });

  return parseFloat(normalized) || 0;
}

/**
 * Validate number input
 * @param value - Input value
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 */
export function validateNumberInput(
  value: string,
  min?: number,
  max?: number
): boolean {
  const num = parseInputNumber(value);
  if (isNaN(num)) return false;
  if (min !== undefined && num < min) return false;
  if (max !== undefined && num > max) return false;
  return true;
}

/**
 * Format shares count (no decimals)
 * @param shares - Number of shares
 * @param locale - 'ar' for Arabic or 'en' for English
 */
export function formatShares(
  shares: number,
  locale: 'ar' | 'en' = 'en'
): string {
  const localeString = locale === 'ar' ? 'ar-KW' : 'en-US';
  return Math.floor(shares).toLocaleString(localeString);
}

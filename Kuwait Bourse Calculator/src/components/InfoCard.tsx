import { Info, X } from 'lucide-react';
import { useState } from 'react';

interface Props {
  theme: 'light' | 'dark';
  language: 'ar' | 'en';
  type: 'ex-price' | 'dividend';
}

export default function InfoCard({ theme, language, type }: Props) {
  const [isVisible, setIsVisible] = useState(true);

  const translations = {
    ar: {
      exPrice: {
        title: 'كيفية استخدام حاسبة التفسيخ',
        tips: [
          'أدخل سعر الإغلاق قبل التعديل',
          'أدخل نسبة أسهم المنحة إن وجدت (مثال: 8 لـ 8%)',
          'في حالة زيادة رأس المال، أدخل النسبة وسعر الاكتتاب',
          'شاهد السعر المعدل ونطاق 107 خطوة تلقائياً',
        ],
        example: 'مثال: سهم بسعر 775 فلس مع منحة 8% ← السعر بعد التفسيخ: 717.593 فلس',
      },
      dividend: {
        title: 'كيفية استخدام حاسبة التوزيعات',
        tips: [
          'أدخل عدد الأسهم المملوكة',
          'أدخل التوزيع النقدي لكل سهم بالفلس',
          'أدخل نسبة أسهم المنحة إن وجدت',
          'شاهد إجمالي النقد وأسهم المنحة والأسهم النهائية',
        ],
        example: 'مثال: 100,000 سهم × 12 فلس + منحة 8% ← نقد: 1,200 د.ك + 8,000 سهم منحة',
      },
      close: 'إخفاء',
    },
    en: {
      exPrice: {
        title: 'How to Use Ex-Price Calculator',
        tips: [
          'Enter the closing price before adjustment',
          'Enter bonus percentage if any (example: 8 for 8%)',
          'For capital increase, enter percentage and subscription price',
          'View adjusted ex-price and 107-step range automatically',
        ],
        example: 'Example: Stock at 775 fils with 8% bonus → Ex-Price: 717.593 fils',
      },
      dividend: {
        title: 'How to Use Dividend Calculator',
        tips: [
          'Enter the number of shares you own',
          'Enter cash dividend per share in fils',
          'Enter bonus percentage if any',
          'View total cash, bonus shares, and final shareholding',
        ],
        example: 'Example: 100,000 shares × 12 fils + 8% bonus → Cash: 1,200 KD + 8,000 bonus shares',
      },
      close: 'Hide',
    },
  };

  const t = translations[language];
  const content = t[type];

  if (!isVisible) return null;

  return (
    <div
      className={`relative backdrop-blur-xl rounded-2xl border shadow-xl p-5 mb-6 ${
        theme === 'dark'
          ? 'bg-blue-500/10 border-blue-500/20'
          : 'bg-blue-50 border-blue-200'
      }`}
    >
      <button
        onClick={() => setIsVisible(false)}
        className={`absolute top-4 ${
          language === 'ar' ? 'left-4' : 'right-4'
        } p-1 rounded-lg transition-colors ${
          theme === 'dark'
            ? 'hover:bg-slate-700 text-slate-400 hover:text-slate-200'
            : 'hover:bg-slate-200 text-slate-600 hover:text-slate-900'
        }`}
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-lg bg-blue-500/20 flex-shrink-0">
          <Info className="w-5 h-5 text-blue-500" />
        </div>
        <h3
          className={`font-semibold ${
            theme === 'dark' ? 'text-blue-300' : 'text-blue-900'
          } ${language === 'ar' ? 'pr-6' : 'pr-0'}`}
        >
          {content.title}
        </h3>
      </div>

      <ul className="space-y-2 mb-3 mr-11">
        {content.tips.map((tip, index) => (
          <li
            key={index}
            className={`text-sm flex items-start gap-2 ${
              theme === 'dark' ? 'text-blue-200' : 'text-blue-800'
            }`}
          >
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>

      <div
        className={`text-sm italic px-4 py-2 rounded-lg ${
          theme === 'dark' ? 'bg-blue-500/10 text-blue-300' : 'bg-blue-100 text-blue-800'
        }`}
      >
        {content.example}
      </div>
    </div>
  );
}

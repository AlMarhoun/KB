import { useState, useMemo } from 'react';
import { TrendingDown, TrendingUp, DollarSign } from 'lucide-react';

interface Props {
  theme: 'light' | 'dark';
  language: 'ar' | 'en';
}

export default function ExPriceCalculator({ theme, language }: Props) {
  const [closingPrice, setClosingPrice] = useState('775');
  const [bonusPercent, setBonusPercent] = useState('8');
  const [capitalIncreasePercent, setCapitalIncreasePercent] = useState('0');
  const [capitalReductionPercent, setCapitalReductionPercent] = useState('0');
  const [subscriptionPrice, setSubscriptionPrice] = useState('0');

  const translations = {
    ar: {
      title: 'حاسبة سعر التفسيخ',
      subtitle: 'احسب السعر المعدل بعد التوزيعات والتغييرات الرأسمالية',
      inputs: 'المدخلات',
      closingPrice: 'سعر الإغلاق (CP)',
      bonusPercent: 'نسبة أسهم المنحة (B%)',
      capitalIncrease: 'زيادة رأس المال (CI%)',
      capitalReduction: 'تخفيض رأس المال (CR%)',
      subscriptionPrice: 'سعر الاكتتاب (SP)',
      results: 'النتائج',
      adjustedPrice: 'السعر المعدل',
      priceRange: 'نطاق الأسعار',
      originalPrice: 'السعر الأصلي',
      adjustedExPrice: 'السعر المعدل',
      fils: 'فلس',
    },
    en: {
      title: 'Ex-Price Calculator',
      subtitle: 'Calculate adjusted price after distributions',
      inputs: 'Inputs',
      closingPrice: 'Closing Price (CP)',
      bonusPercent: 'Bonus % (B%)',
      capitalIncrease: 'Capital Increase (CI%)',
      capitalReduction: 'Capital Reduction (CR%)',
      subscriptionPrice: 'Subscription Price (SP)',
      results: 'Results',
      adjustedPrice: 'Adjusted Price',
      priceRange: 'Price Range',
      originalPrice: 'Original Price',
      adjustedExPrice: 'Adjusted Price',
      fils: 'fils',
    },
  };

  const t = translations[language];

  const mainExPrice = useMemo(() => {
    const cp = parseFloat(closingPrice) || 0;
    const B = parseFloat(bonusPercent) / 100 || 0;
    const CI = parseFloat(capitalIncreasePercent) / 100 || 0;
    const CR = parseFloat(capitalReductionPercent) / 100 || 0;
    const SP = parseFloat(subscriptionPrice) || 0;

    let price = cp;

    if (B > 0) {
      price = price / (1 + B);
    }

    if (CI > 0) {
      price = (price + (CI * SP)) / (1 + CI);
    }

    if (CR !== 0) {
      price = price * (1 + CR);
    }

    return price;
  }, [closingPrice, bonusPercent, capitalIncreasePercent, capitalReductionPercent, subscriptionPrice]);

  const priceTable = useMemo(() => {
    const cp = parseFloat(closingPrice) || 0;
    if (cp === 0) return [];

    const B = parseFloat(bonusPercent) / 100 || 0;
    const CI = parseFloat(capitalIncreasePercent) / 100 || 0;
    const CR = parseFloat(capitalReductionPercent) / 100 || 0;
    const SP = parseFloat(subscriptionPrice) || 0;

    const rows = [];
    for (let i = 0; i <= 107; i++) {
      const original = cp + i;
      let adjusted = original;

      if (B > 0) {
        adjusted = adjusted / (1 + B);
      }

      if (CI > 0) {
        adjusted = (adjusted + (CI * SP)) / (1 + CI);
      }

      if (CR !== 0) {
        adjusted = adjusted * (1 + CR);
      }

      rows.push({ original, adjusted });
    }
    return rows;
  }, [closingPrice, bonusPercent, capitalIncreasePercent, capitalReductionPercent, subscriptionPrice]);

  const cardClass = `backdrop-blur-xl rounded-2xl border shadow-xl ${
    theme === 'dark' ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/80 border-slate-200/50'
  }`;

  const inputClass = `w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
    theme === 'dark'
      ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-500'
      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
  }`;

  return (
    <div className="space-y-6">
      <div className={cardClass + ' p-6'}>
        <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {t.title}
        </h2>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>{t.subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className={cardClass + ' p-6 lg:col-span-1'}>
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t.inputs}
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                {t.closingPrice}
              </label>
              <input
                type="number"
                value={closingPrice}
                onChange={(e) => setClosingPrice(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                {t.bonusPercent}
              </label>
              <input
                type="number"
                value={bonusPercent}
                onChange={(e) => setBonusPercent(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                {t.capitalIncrease}
              </label>
              <input
                type="number"
                value={capitalIncreasePercent}
                onChange={(e) => setCapitalIncreasePercent(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                {t.capitalReduction}
              </label>
              <input
                type="number"
                value={capitalReductionPercent}
                onChange={(e) => setCapitalReductionPercent(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                {t.subscriptionPrice}
              </label>
              <input
                type="number"
                value={subscriptionPrice}
                onChange={(e) => setSubscriptionPrice(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className={cardClass + ' p-6'}>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {t.results}
              </h3>
            </div>

            <div className={`p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-600/10 border ${
              theme === 'dark' ? 'border-green-500/20' : 'border-green-500/30'
            }`}>
              <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                {t.adjustedPrice}
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                {mainExPrice.toFixed(3)} {t.fils}
              </div>
            </div>
          </div>

          <div className={cardClass + ' p-6'}>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-violet-500/10">
                <TrendingDown className="w-5 h-5 text-violet-500" />
              </div>
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {t.priceRange}
              </h3>
            </div>

            <div className="overflow-auto max-h-96 rounded-lg border" style={{ borderColor: theme === 'dark' ? 'rgb(51 65 85)' : 'rgb(226 232 240)' }}>
              <table className="w-full">
                <thead className={`sticky top-0 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <tr>
                    <th className={`px-4 py-3 text-left text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      {t.originalPrice}
                    </th>
                    <th className={`px-4 py-3 text-left text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      {t.adjustedExPrice}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {priceTable.map((row, i) => (
                    <tr
                      key={i}
                      className={`border-b ${
                        theme === 'dark'
                          ? 'hover:bg-slate-700/50 border-slate-700/50'
                          : 'hover:bg-slate-50 border-slate-200/50'
                      }`}
                    >
                      <td className={`px-4 py-2.5 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                        {row.original.toFixed(3)}
                      </td>
                      <td className={`px-4 py-2.5 font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                        {row.adjusted.toFixed(3)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

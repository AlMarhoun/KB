import { useState, useMemo } from 'react';
import { TrendingDown, TrendingUp, DollarSign, RotateCcw, Copy, Calculator } from 'lucide-react';
import HelpTooltip from './HelpTooltip';
import { toast } from 'sonner@2.0.3';

interface Props {
  theme: 'light' | 'dark';
  language: 'ar' | 'en';
}

type ExAdjustmentType = 'bonus' | 'capital-increase' | 'capital-reduction' | 'all' | '';

export default function ExPriceCalculator({ theme, language }: Props) {
  const [adjustmentType, setAdjustmentType] = useState<ExAdjustmentType>('');
  const [closingPrice, setClosingPrice] = useState('');
  const [bonusPercent, setBonusPercent] = useState('');
  const [capitalIncreasePercent, setCapitalIncreasePercent] = useState('');
  const [capitalReductionPercent, setCapitalReductionPercent] = useState('');
  const [subscriptionPrice, setSubscriptionPrice] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);

  const translations = {
    ar: {
      title: 'حاسبة سعر التفسيخ',
      subtitle: 'احسب السعر المعدل بعد التوزيعات والتغييرات الرأسمالية',
      adjustmentTypeLabel: 'نوع التفسيخ',
      adjustmentTypePlaceholder: 'اختر نوع التفسّيخ',
      adjustmentTypes: {
        bonus: 'تفسيخ منحة',
        capitalIncrease: 'تفسيخ زيادة رأس المال (اكتتاب)',
        capitalReduction: 'تفسيخ تخفيض رأس المال',
        all: 'جميع أنواع التفسيخ',
      },
      inputs: 'المدخلات',
      closingPrice: 'سعر الإغلاق (CP)',
      bonusPercent: 'نسبة أسهم المنحة (B%)',
      capitalIncrease: 'زيادة رأس المال (CI%)',
      capitalReduction: 'تخفيض رأس المال (CR%)',
      subscriptionPrice: 'سعر الاكتتاب (SP)',
      calculate: 'احسب',
      results: 'النتائج',
      adjustedPrice: 'السعر المعدل',
      priceRange: 'نطاق الأسعار',
      originalPrice: 'السعر الأصلي',
      adjustedExPrice: 'السعر المعدل',
      fils: 'فلس',
      resetInputs: 'مسح المدخلات',
      copyResult: 'نسخ النتيجة',
      copiedSuccess: 'تم النسخ بنجاح!',
      guidanceMessage: 'أدخل البيانات واضغط على "احسب" لعرض النتائج',
      helpClosingPrice: 'سعر إغلاق السهم (في تاريخ الحيازة) قبل التوزيعات أو التغييرات الرأسمالية',
      helpBonusPercent: 'نسبة أسهم المنحة المئوية التي سوف يتم توزيعها على المساهمين',
      helpCapitalIncrease: 'نسبة زيادة رأس المال المئوية عند اكتتاب أسهم جديدة',
      helpCapitalReduction: 'نسبة تخفيض رأس المال المئوية (أدخل قيمة موجبة)',
      helpSubscriptionPrice: 'سعر الاكتتاب للسهم الجديد عند زيادة رأس المال',
    },
    en: {
      title: 'Ex-Price Calculator',
      subtitle: 'Calculate adjusted price after distributions',
      adjustmentTypeLabel: 'Type of Ex-Adjustment',
      adjustmentTypePlaceholder: 'Select adjustment type',
      adjustmentTypes: {
        bonus: 'Bonus Ex-Date',
        capitalIncrease: 'Capital Increase (Subscription)',
        capitalReduction: 'Capital Reduction',
        all: 'All Types',
      },
      inputs: 'Inputs',
      closingPrice: 'Closing Price (CP)',
      bonusPercent: 'Bonus % (B%)',
      capitalIncrease: 'Capital Increase (CI%)',
      capitalReduction: 'Capital Reduction (CR%)',
      subscriptionPrice: 'Subscription Price (SP)',
      calculate: 'Calculate',
      results: 'Results',
      adjustedPrice: 'Adjusted Price',
      priceRange: 'Price Range',
      originalPrice: 'Original Price',
      adjustedExPrice: 'Adjusted Price',
      fils: 'fils',
      resetInputs: 'Reset Inputs',
      copyResult: 'Copy Result',
      copiedSuccess: 'Copied successfully!',
      guidanceMessage: 'Enter the data and click "Calculate" to view results',
      helpClosingPrice: 'The closing price of the share before distributions or capital changes',
      helpBonusPercent: 'The percentage of bonus shares being distributed to shareholders',
      helpCapitalIncrease: 'The percentage of capital increase when subscribing to new shares',
      helpCapitalReduction: 'The percentage of capital reduction (enter positive value)',
      helpSubscriptionPrice: 'The subscription price per new share when capital is increased',
    },
  };

  const t = translations[language];

  // Determine which fields are visible based on adjustment type
  const showBonus = adjustmentType === 'bonus' || adjustmentType === 'all';
  const showCapitalIncrease = adjustmentType === 'capital-increase' || adjustmentType === 'all';
  const showCapitalReduction = adjustmentType === 'capital-reduction' || adjustmentType === 'all';

  // Get effective values (0 if field is hidden or empty)
  const getEffectiveBonus = () => showBonus ? (parseFloat(bonusPercent) || 0) : 0;
  const getEffectiveCI = () => showCapitalIncrease ? (parseFloat(capitalIncreasePercent) || 0) : 0;
  const getEffectiveCR = () => showCapitalReduction ? (parseFloat(capitalReductionPercent) || 0) : 0;
  const getEffectiveSP = () => showCapitalIncrease ? (parseFloat(subscriptionPrice) || 0) : 0;

  const handleCalculate = () => {
    setIsCalculated(true);
  };

  const mainExPrice = useMemo(() => {
    if (!isCalculated) return 0;
    
    const cp = parseFloat(closingPrice) || 0;
    const B = getEffectiveBonus() / 100;
    const CI = getEffectiveCI() / 100;
    const CRinput = getEffectiveCR();
    const CR = -(CRinput / 100); // Convert positive input to negative decimal
    const SP = getEffectiveSP();

    let price = cp;

    if (B > 0) {
      price = price / (1 + B);
    }

    if (CI > 0) {
      price = (price + (CI * SP)) / (1 + CI);
    }

    if (CR !== 0) {
      price = price / (1 + CR); // Use division instead of multiplication
    }

    return price;
  }, [closingPrice, bonusPercent, capitalIncreasePercent, capitalReductionPercent, subscriptionPrice, adjustmentType, isCalculated]);

  const priceTable = useMemo(() => {
    if (!isCalculated) return [];
    
    const cp = parseFloat(closingPrice) || 0;
    if (cp === 0) return [];

    const B = getEffectiveBonus() / 100;
    const CI = getEffectiveCI() / 100;
    const CRinput = getEffectiveCR();
    const CR = -(CRinput / 100); // Convert positive input to negative decimal
    const SP = getEffectiveSP();

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
        adjusted = adjusted / (1 + CR); // Use division instead of multiplication
      }

      rows.push({ original, adjusted });
    }
    return rows;
  }, [closingPrice, bonusPercent, capitalIncreasePercent, capitalReductionPercent, subscriptionPrice, adjustmentType, isCalculated]);

  const handleReset = () => {
    setClosingPrice('');
    setBonusPercent('');
    setCapitalIncreasePercent('');
    setCapitalReductionPercent('');
    setSubscriptionPrice('');
    setIsCalculated(false);
    // Note: adjustmentType is NOT reset
  };

  const handleCopyResult = () => {
    if (!isCalculated) return;

    const cp = parseFloat(closingPrice) || 0;
    const B = getEffectiveBonus();
    const CI = getEffectiveCI();
    const CR = getEffectiveCR();
    const SP = getEffectiveSP();
    const price = mainExPrice.toFixed(3);

    let copyText = '';

    if (adjustmentType === 'bonus') {
      copyText = `حساب التفسّيخ بعد توزيع أسهم منحة مجانية:

سع�� الإغلاق: ${cp} فلس
نسبة المنحة: ${B}%

السعر المعدل بعد التفسّيخ: ${price} فلس

تم النسخ من موقع https://kb-almarhoun.vercel.app/`;
    } else if (adjustmentType === 'capital-increase') {
      copyText = `حساب التفسّيخ بعد زيادة رأس المال (اكتتاب):

سعر الإغلاق: ${cp} فلس
نسبة زيادة رأس المال: ${CI}%
سعر الاكتتاب: ${SP} فلس

السعر المعدل بعد التفسّيخ: ${price} فلس

تم النسخ من موقع https://kb-almarhoun.vercel.app/`;
    } else if (adjustmentType === 'capital-reduction') {
      copyText = `حساب التفسّيخ بعد تخفيض رأس المال:

سعر الإغلاق: ${cp} فلس
نسبة تخفيض رأس المال: ${CR}%

السعر المعدل بعد التفسّيخ: ${price} فلس

تم النسخ من موقع https://kb-almarhoun.vercel.app/`;
    } else {
      copyText = `حساب التفسّيخ بعد المنحة + زيادة رأس المال + تخفيض رأس المال:

سعر الإغلاق: ${cp} فلس
نسبة المنحة: ${B}%
نسبة زيادة رأس المال: ${CI}%
سعر الاكتتاب: ${SP} فلس
نسبة تخفيض رأس المال: ${CR}%

السعر المعدل بعد التفسّيخ: ${price} فلس

تم النسخ من موقع https://kb-almarhoun.vercel.app/`;
    }

    navigator.clipboard.writeText(copyText).then(() => {
      toast.success(t.copiedSuccess);
    });
  };

  const shouldShowGuidance = !adjustmentType || !isCalculated;

  const cardClass = `backdrop-blur-xl rounded-2xl border shadow-xl ${
    theme === 'dark' ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/80 border-slate-200/50'
  }`;

  const inputClass = `w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
    theme === 'dark'
      ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-500'
      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
  }`;

  const selectClass = `w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
    theme === 'dark'
      ? 'bg-slate-800/50 border-slate-700 text-white'
      : 'bg-white border-slate-200 text-slate-900'
  }`;

  const buttonClass = `px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
    theme === 'dark'
      ? 'bg-slate-700 hover:bg-slate-600 text-white'
      : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
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
            {/* Adjustment Type Dropdown */}
            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                {t.adjustmentTypeLabel}
              </label>
              <select
                value={adjustmentType}
                onChange={(e) => {
                  setAdjustmentType(e.target.value as ExAdjustmentType);
                  setIsCalculated(false);
                }}
                className={selectClass}
              >
                <option value="">{t.adjustmentTypePlaceholder}</option>
                <option value="bonus">{t.adjustmentTypes.bonus}</option>
                <option value="capital-increase">{t.adjustmentTypes.capitalIncrease}</option>
                <option value="capital-reduction">{t.adjustmentTypes.capitalReduction}</option>
                <option value="all">{t.adjustmentTypes.all}</option>
              </select>
            </div>

            {/* Show inputs only if type is selected */}
            {adjustmentType && (
              <>
                {/* Closing Price - Always visible when type selected */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className={`block text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      {t.closingPrice}
                    </label>
                    <HelpTooltip content={t.helpClosingPrice} theme={theme} />
                  </div>
                  <input
                    type="number"
                    value={closingPrice}
                    onChange={(e) => {
                      setClosingPrice(e.target.value);
                      setIsCalculated(false);
                    }}
                    className={inputClass}
                  />
                </div>

                {/* Bonus Percent - Conditional */}
                {showBonus && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <label className={`block text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {t.bonusPercent}
                      </label>
                      <HelpTooltip content={t.helpBonusPercent} theme={theme} />
                    </div>
                    <input
                      type="number"
                      value={bonusPercent}
                      onChange={(e) => {
                        setBonusPercent(e.target.value);
                        setIsCalculated(false);
                      }}
                      className={inputClass}
                    />
                  </div>
                )}

                {/* Capital Increase - Conditional */}
                {showCapitalIncrease && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <label className={`block text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {t.capitalIncrease}
                      </label>
                      <HelpTooltip content={t.helpCapitalIncrease} theme={theme} />
                    </div>
                    <input
                      type="number"
                      value={capitalIncreasePercent}
                      onChange={(e) => {
                        setCapitalIncreasePercent(e.target.value);
                        setIsCalculated(false);
                      }}
                      className={inputClass}
                    />
                  </div>
                )}

                {/* Subscription Price - Conditional */}
                {showCapitalIncrease && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <label className={`block text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {t.subscriptionPrice}
                      </label>
                      <HelpTooltip content={t.helpSubscriptionPrice} theme={theme} />
                    </div>
                    <input
                      type="number"
                      value={subscriptionPrice}
                      onChange={(e) => {
                        setSubscriptionPrice(e.target.value);
                        setIsCalculated(false);
                      }}
                      className={inputClass}
                    />
                  </div>
                )}

                {/* Capital Reduction - Conditional */}
                {showCapitalReduction && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <label className={`block text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {t.capitalReduction}
                      </label>
                      <HelpTooltip content={t.helpCapitalReduction} theme={theme} />
                    </div>
                    <input
                      type="number"
                      value={capitalReductionPercent}
                      onChange={(e) => {
                        setCapitalReductionPercent(e.target.value);
                        setIsCalculated(false);
                      }}
                      className={inputClass}
                    />
                  </div>
                )}

                {/* Calculate Button */}
                <button
                  onClick={handleCalculate}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:shadow-lg hover:shadow-blue-500/30'
                      : 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:shadow-lg hover:shadow-blue-500/30'
                  }`}
                >
                  {t.calculate}
                </button>

                {/* Reset Button */}
                <button onClick={handleReset} className={buttonClass}>
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.resetInputs}</span>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {shouldShowGuidance ? (
            <div className={cardClass + ' p-12 text-center'}>
              <Calculator className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-300'}`} />
              <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                {t.guidanceMessage}
              </p>
            </div>
          ) : (
            <>
              <div className={cardClass + ' p-6'}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {t.results}
                    </h3>
                  </div>
                  <button onClick={handleCopyResult} className={buttonClass}>
                    <Copy className="w-4 h-4" />
                    <span>{t.copyResult}</span>
                  </button>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

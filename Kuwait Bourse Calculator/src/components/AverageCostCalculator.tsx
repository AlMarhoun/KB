import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, RotateCcw, Copy } from 'lucide-react';
import HelpTooltip from './HelpTooltip';
import { toast } from 'sonner@2.0.3';

interface Props {
  theme: 'light' | 'dark';
  language: 'ar' | 'en';
}

export default function AverageCostCalculator({ theme, language }: Props) {
  const [currentQuantity, setCurrentQuantity] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [quantityToBuy, setQuantityToBuy] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);

  const translations = {
    ar: {
      title: 'حاسبة متوسط التكلفة',
      subtitle: 'احسب متوسط السعر الجديد بعد شراء أسهم إضافية',
      inputs: 'المدخلات',
      currentQuantity: 'الكمية الحالية',
      currentPrice: 'السعر الحالي (د.ك)',
      quantityToBuy: 'الكمية المراد شراؤها',
      purchasePrice: 'سعر الشراء (د.ك)',
      calculate: 'احسب',
      results: 'النتائج',
      totalQuantity: 'إجمالي الكمية',
      totalCost: 'إجمالي التكلفة',
      newAveragePrice: 'متوسط السعر الجديد',
      shares: 'سهم',
      kd: 'د.ك',
      resetInputs: 'مسح المدخلات',
      copyResult: 'نسخ النتيجة',
      copiedSuccess: 'تم النسخ بنجاح!',
      guidanceMessage: 'أدخل البيانات واضغط على "احسب" لعرض النتائج',
      helpCurrentQuantity: 'إجمالي عدد الأسهم التي تمتلكها حاليًا قبل الصفقة الجديدة',
      helpCurrentPrice: 'متوسط التكلفة الحالي للسهم الواحد لهذا السهم',
      helpQuantityToBuy: 'عدد الأسهم الإضافية التي تخطط لشرائها',
      helpPurchasePrice: 'السعر للسهم الواحد في هذه الصفقة الجديدة',
    },
    en: {
      title: 'Average Cost Calculator',
      subtitle: 'Calculate the new average price after buying additional shares',
      inputs: 'Inputs',
      currentQuantity: 'Current Quantity',
      currentPrice: 'Current Price (KD)',
      quantityToBuy: 'Quantity to Buy',
      purchasePrice: 'Purchase Price (KD)',
      calculate: 'Calculate',
      results: 'Results',
      totalQuantity: 'Total Quantity',
      totalCost: 'Total Cost',
      newAveragePrice: 'New Average Price',
      shares: 'shares',
      kd: 'KD',
      resetInputs: 'Reset Inputs',
      copyResult: 'Copy Result',
      copiedSuccess: 'Copied successfully!',
      guidanceMessage: 'Enter the data and click "Calculate" to view results',
      helpCurrentQuantity: 'Total number of shares you already own before this new trade',
      helpCurrentPrice: 'Your current average cost per share for this stock',
      helpQuantityToBuy: 'How many additional shares you plan to purchase',
      helpPurchasePrice: 'The price per share you expect to pay in this new transaction',
    },
  };

  const t = translations[language];

  const handleCalculate = () => {
    setIsCalculated(true);
  };

  const handleReset = () => {
    setCurrentQuantity('');
    setCurrentPrice('');
    setQuantityToBuy('');
    setPurchasePrice('');
    setIsCalculated(false);
  };

  const calculateResults = () => {
    if (!isCalculated) {
      return { totalQuantity: 0, totalCost: 0, newAveragePrice: 0, isValid: false };
    }

    const cq = parseFloat(currentQuantity) || 0;
    const cp = parseFloat(currentPrice) || 0;
    const qtb = parseFloat(quantityToBuy) || 0;
    const pp = parseFloat(purchasePrice) || 0;

    // Validate inputs
    if (cq < 0 || cp < 0 || qtb < 0 || pp < 0) {
      return { totalQuantity: 0, totalCost: 0, newAveragePrice: 0, isValid: false };
    }

    const totalQuantity = cq + qtb;
    const totalCost = (cq * cp) + (qtb * pp);
    const newAveragePrice = totalQuantity > 0 ? totalCost / totalQuantity : 0;

    return { totalQuantity, totalCost, newAveragePrice, isValid: true };
  };

  const results = calculateResults();

  const handleCopyResult = () => {
    if (!isCalculated || !results.isValid) {
      return;
    }

    const cq = parseFloat(currentQuantity) || 0;
    const cp = parseFloat(currentPrice) || 0;
    const qtb = parseFloat(quantityToBuy) || 0;
    const pp = parseFloat(purchasePrice) || 0;

    let copyText = 'نتائج حساب متوسط التكلفة:\n\n';

    if (cq > 0) {
      copyText += `الكمية الحالية: ${formatNum(cq, 0)} سهم\n`;
    }
    if (cp > 0) {
      copyText += `المتوسط الحالي: ${formatNum(cp)}\n`;
    }
    if (qtb > 0) {
      copyText += `الكمية المراد شراؤها: ${formatNum(qtb, 0)} سهم\n`;
    }
    if (pp > 0) {
      copyText += `سعر الشراء: ${formatNum(pp)}\n`;
    }

    copyText += '\n';

    if (results.totalQuantity > 0) {
      copyText += `إجمالي الكمية: ${formatNum(results.totalQuantity, 0)} سهم\n`;
    }
    if (results.totalCost > 0) {
      copyText += `إجمالي الكلفة: ${formatNum(results.totalCost)}\n`;
    }
    if (results.newAveragePrice > 0) {
      copyText += `المتوسط الجديد: ${formatNum(results.newAveragePrice)}\n`;
    }

    copyText += '\nتم النسخ من موقع https://kb-almarhoun.vercel.app/';

    navigator.clipboard.writeText(copyText).then(() => {
      toast.success(t.copiedSuccess);
    });
  };

  const formatNum = (n: number, decimals: number = 3) => {
    if (!isFinite(n)) return '0';
    return n.toLocaleString(language === 'ar' ? 'ar-KW' : 'en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const cardClass = `backdrop-blur-xl rounded-2xl border shadow-xl ${
    theme === 'dark' ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/80 border-slate-200/50'
  }`;

  const inputClass = `w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
    theme === 'dark'
      ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-500'
      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
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
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className={`block text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  {t.currentQuantity}
                </label>
                <HelpTooltip content={t.helpCurrentQuantity} theme={theme} />
              </div>
              <input
                type="number"
                value={currentQuantity}
                onChange={(e) => {
                  setCurrentQuantity(e.target.value);
                  setIsCalculated(false);
                }}
                className={inputClass}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className={`block text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  {t.currentPrice}
                </label>
                <HelpTooltip content={t.helpCurrentPrice} theme={theme} />
              </div>
              <input
                type="number"
                step="0.001"
                value={currentPrice}
                onChange={(e) => {
                  setCurrentPrice(e.target.value);
                  setIsCalculated(false);
                }}
                className={inputClass}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className={`block text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  {t.quantityToBuy}
                </label>
                <HelpTooltip content={t.helpQuantityToBuy} theme={theme} />
              </div>
              <input
                type="number"
                value={quantityToBuy}
                onChange={(e) => {
                  setQuantityToBuy(e.target.value);
                  setIsCalculated(false);
                }}
                className={inputClass}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className={`block text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  {t.purchasePrice}
                </label>
                <HelpTooltip content={t.helpPurchasePrice} theme={theme} />
              </div>
              <input
                type="number"
                step="0.001"
                value={purchasePrice}
                onChange={(e) => {
                  setPurchasePrice(e.target.value);
                  setIsCalculated(false);
                }}
                className={inputClass}
              />
            </div>

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
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {!isCalculated ? (
            <div className={cardClass + ' p-12 text-center'}>
              <Calculator className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-300'}`} />
              <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                {t.guidanceMessage}
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-end">
                <button onClick={handleCopyResult} className={buttonClass}>
                  <Copy className="w-4 h-4" />
                  <span>{t.copyResult}</span>
                </button>
              </div>

              <div className={cardClass + ' p-6'}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {t.results}
                  </h3>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className={`p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border ${
                    theme === 'dark' ? 'border-blue-500/20' : 'border-blue-500/30'
                  }`}>
                    <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                      {t.totalQuantity}
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                      {formatNum(results.totalQuantity, 0)}
                    </div>
                    <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                      {t.shares}
                    </div>
                  </div>

                  <div className={`p-5 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-600/10 border ${
                    theme === 'dark' ? 'border-violet-500/20' : 'border-violet-500/30'
                  }`}>
                    <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-violet-400' : 'text-violet-700'}`}>
                      {t.totalCost}
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                      {formatNum(results.totalCost)}
                    </div>
                    <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                      {t.kd}
                    </div>
                  </div>

                  <div className={`p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-600/10 border ${
                    theme === 'dark' ? 'border-green-500/20' : 'border-green-500/30'
                  }`}>
                    <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                      {t.newAveragePrice}
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                      {formatNum(results.newAveragePrice)}
                    </div>
                    <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                      {t.kd}
                    </div>
                  </div>
                </div>
              </div>

              <div className={cardClass + ' p-6'}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {language === 'ar' ? 'التفاصيل' : 'Breakdown'}
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className={`flex justify-between items-center p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-100'}`}>
                    <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                      {t.currentQuantity}
                    </span>
                    <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {formatNum(parseFloat(currentQuantity) || 0, 0)} {t.shares}
                    </span>
                  </div>

                  <div className={`flex justify-between items-center p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-100'}`}>
                    <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                      {t.currentPrice}
                    </span>
                    <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {formatNum(parseFloat(currentPrice) || 0)} {t.kd}
                    </span>
                  </div>

                  <div className={`flex justify-between items-center p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-100'}`}>
                    <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                      {t.quantityToBuy}
                    </span>
                    <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {formatNum(parseFloat(quantityToBuy) || 0, 0)} {t.shares}
                    </span>
                  </div>

                  <div className={`flex justify-between items-center p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-100'}`}>
                    <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                      {t.purchasePrice}
                    </span>
                    <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {formatNum(parseFloat(purchasePrice) || 0)} {t.kd}
                    </span>
                  </div>

                  <div className={`h-px ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} my-2`} />

                  <div className={`flex justify-between items-center p-4 rounded-lg bg-gradient-to-r ${
                    theme === 'dark' ? 'from-green-500/10 to-emerald-600/10' : 'from-green-50 to-emerald-50'
                  }`}>
                    <span className={`font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                      {t.newAveragePrice}
                    </span>
                    <span className={`font-bold text-lg ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                      {formatNum(results.newAveragePrice)} {t.kd}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

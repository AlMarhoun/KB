import { useState, useMemo } from 'react';
import { Wallet, Gift, PieChart, TrendingUp } from 'lucide-react';
import HelpTooltip from './HelpTooltip';

interface Props {
  theme: 'light' | 'dark';
  language: 'ar' | 'en';
}

export default function DividendCalculator({ theme, language }: Props) {
  const [numShares, setNumShares] = useState('100000');
  const [cashDividend, setCashDividend] = useState('12');
  const [bonusPercent, setBonusPercent] = useState('8');

  const translations = {
    ar: {
      title: 'حاسبة التوزيعات',
      subtitle: 'احسب التوزيعات النقدية وأسهم المنحة',
      inputs: 'المدخلات',
      numShares: 'عدد الأسهم (NS)',
      cashDividend: 'التوزيع النقدي (CD) - فلس',
      bonusPercent: 'نسبة المنحة (B%)',
      totalCashDividend: 'إجمالي التوزيعات',
      bonusShares: 'أسهم المنحة',
      finalShares: 'إجمالي الأسهم',
      kd: 'د.ك',
      shares: 'سهم',
      fils: 'فلس',
      breakdown: 'التفاصيل',
      yourShares: 'أسهمك الحالية',
      cashPerShare: 'نقد لكل سهم',
      bonusRate: 'نسبة المنحة',
      totalCash: 'إجمالي النقد',
      bonusSharesReceived: 'أسهم المنحة',
      finalPosition: 'المركز النهائي',
      helpNumShares: 'إجمالي عدد الأسهم التي تمتلكها في هذا السهم',
      helpCashDividend: 'مبلغ التوزيع النقدي لكل سهم بالفلس',
      helpBonusPercent: 'نسبة أسهم المنحة المئوية التي سيتم توزيعها',
    },
    en: {
      title: 'Dividend Calculator',
      subtitle: 'Calculate cash dividends and bonus shares',
      inputs: 'Inputs',
      numShares: 'Number of Shares (NS)',
      cashDividend: 'Cash Dividend (CD) - fils',
      bonusPercent: 'Bonus % (B%)',
      totalCashDividend: 'Total Cash',
      bonusShares: 'Bonus Shares',
      finalShares: 'Final Shares',
      kd: 'KD',
      shares: 'shares',
      fils: 'fils',
      breakdown: 'Breakdown',
      yourShares: 'Your Shares',
      cashPerShare: 'Cash per Share',
      bonusRate: 'Bonus Rate',
      totalCash: 'Total Cash',
      bonusSharesReceived: 'Bonus Shares',
      finalPosition: 'Final Position',
      helpNumShares: 'Total number of shares you own in this stock',
      helpCashDividend: 'The cash dividend amount per share in fils',
      helpBonusPercent: 'The percentage of bonus shares to be distributed',
    },
  };

  const t = translations[language];

  const calc = useMemo(() => {
    const NS = parseFloat(numShares) || 0;
    const CD = parseFloat(cashDividend) || 0;
    const B = parseFloat(bonusPercent) / 100 || 0;

    const totalCashFils = NS * CD;
    const totalCashKD = totalCashFils / 1000;
    const bonusShares = NS * B;
    const finalShares = NS + bonusShares;

    return { totalCashFils, totalCashKD, bonusShares, finalShares };
  }, [numShares, cashDividend, bonusPercent]);

  const formatNum = (n: number) => {
    if (!isFinite(n)) return '0';
    return n.toLocaleString(language === 'ar' ? 'ar-KW' : 'en-US');
  };

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
              <Wallet className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t.inputs}
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className={`block text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  {t.numShares}
                </label>
                <HelpTooltip content={t.helpNumShares} theme={theme} />
              </div>
              <input
                type="number"
                value={numShares}
                onChange={(e) => setNumShares(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className={`block text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  {t.cashDividend}
                </label>
                <HelpTooltip content={t.helpCashDividend} theme={theme} />
              </div>
              <input
                type="number"
                value={cashDividend}
                onChange={(e) => setCashDividend(e.target.value)}
                className={inputClass}
              />
            </div>

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
                onChange={(e) => setBonusPercent(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className={cardClass + ' p-5'}>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                  <Wallet className="w-4 h-4 text-white" />
                </div>
                <h4 className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.totalCashDividend}
                </h4>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                {formatNum(calc.totalCashKD)} {t.kd}
              </div>
              <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                ({formatNum(calc.totalCashFils)} {t.fils})
              </div>
            </div>

            <div className={cardClass + ' p-5'}>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
                  <Gift className="w-4 h-4 text-white" />
                </div>
                <h4 className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.bonusShares}
                </h4>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                {formatNum(calc.bonusShares)}
              </div>
              <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                {t.shares}
              </div>
            </div>

            <div className={cardClass + ' p-5'}>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <h4 className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.finalShares}
                </h4>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                {formatNum(calc.finalShares)}
              </div>
              <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                {t.shares}
              </div>
            </div>
          </div>

          <div className={cardClass + ' p-6'}>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <PieChart className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {t.breakdown}
              </h3>
            </div>

            <div className="space-y-3">
              <div className={`flex justify-between items-center p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-100'}`}>
                <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                  {t.yourShares}
                </span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {formatNum(parseFloat(numShares) || 0)} {t.shares}
                </span>
              </div>

              <div className={`flex justify-between items-center p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-100'}`}>
                <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                  {t.cashPerShare}
                </span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {cashDividend} {t.fils}
                </span>
              </div>

              <div className={`flex justify-between items-center p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-100'}`}>
                <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                  {t.bonusRate}
                </span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {bonusPercent}%
                </span>
              </div>

              <div className={`h-px ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} my-2`} />

              <div className={`flex justify-between items-center p-4 rounded-lg bg-gradient-to-r ${
                theme === 'dark' ? 'from-green-500/10 to-emerald-600/10' : 'from-green-50 to-emerald-50'
              }`}>
                <span className={`font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                  {t.totalCash}
                </span>
                <span className={`font-bold text-lg ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                  {formatNum(calc.totalCashKD)} {t.kd}
                </span>
              </div>

              <div className={`flex justify-between items-center p-4 rounded-lg bg-gradient-to-r ${
                theme === 'dark' ? 'from-violet-500/10 to-purple-600/10' : 'from-violet-50 to-purple-50'
              }`}>
                <span className={`font-semibold ${theme === 'dark' ? 'text-violet-400' : 'text-violet-700'}`}>
                  {t.bonusSharesReceived}
                </span>
                <span className={`font-bold text-lg ${theme === 'dark' ? 'text-violet-400' : 'text-violet-600'}`}>
                  {formatNum(calc.bonusShares)} {t.shares}
                </span>
              </div>

              <div className={`flex justify-between items-center p-4 rounded-lg bg-gradient-to-r ${
                theme === 'dark' ? 'from-blue-500/10 to-cyan-600/10' : 'from-blue-50 to-cyan-50'
              }`}>
                <span className={`font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                  {t.finalPosition}
                </span>
                <span className={`font-bold text-lg ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  {formatNum(calc.finalShares)} {t.shares}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

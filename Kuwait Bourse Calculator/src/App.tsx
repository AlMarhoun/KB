import { useState } from 'react';
import { Moon, Sun, Calculator, TrendingUp, Globe, Youtube, BarChart3, Home } from 'lucide-react';
import { Toaster } from 'sonner@2.0.3';
import ExPriceCalculator from './components/ExPriceCalculator';
import DividendCalculator from './components/DividendCalculator';
import AverageCostCalculator from './components/AverageCostCalculator';
import HomePage from './components/HomePage';
import logo from 'figma:asset/16eee7832794c6a37df4e9d945d102116cae8132.png';

type Theme = 'light' | 'dark';
type Language = 'ar' | 'en';
type Module = 'home' | 'ex-price' | 'dividend' | 'average-cost';

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('ar');
  const [activeModule, setActiveModule] = useState<Module>('home');

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const toggleLanguage = () => setLanguage(language === 'ar' ? 'en' : 'ar');

  const handleModuleClick = (module: Module) => {
    setActiveModule(module);
  };

  const translations = {
    ar: {
      title: 'حاسبة بورصة الكويت',
      subtitle: 'التفسيخات والتوزيعات',
      home: 'الرئيسية',
      exPrice: 'حاسبة التفسيخ مع نطاق',
      dividend: 'حاسبة التوزيعات',
      averageCost: 'حاسبة متوسط التكلفة',
    },
    en: {
      title: 'Kuwait Bourse Calculator',
      subtitle: 'Ex-Price & Dividends',
      home: 'Home',
      exPrice: 'Ex-Price Calculator',
      dividend: 'Dividend & Bonus Calculator',
      averageCost: 'Average Cost Calculator',
    },
  };

  const t = translations[language];

  // All navigation items - Home is treated the same as calculators
  const navigationItems = [
    { id: 'home' as const, icon: Home, label: t.home },
    { id: 'ex-price' as const, icon: TrendingUp, label: t.exPrice },
    { id: 'dividend' as const, icon: Calculator, label: t.dividend },
    { id: 'average-cost' as const, icon: BarChart3, label: t.averageCost },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100'
      }`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${
          theme === 'dark'
            ? 'bg-slate-900/80 border-slate-700/50'
            : 'bg-white/80 border-slate-200/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500/30 shadow-lg">
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1
                  className={`font-bold text-xl ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {t.title}
                </h1>
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {t.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className={`p-2.5 rounded-lg transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Globe className="w-5 h-5" />
              </button>

              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-lg transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation - Two Row Layout */}
          <div className="mt-6 space-y-3">
            {/* Top Row - Expanded Active Tab */}
            <div className="flex justify-center">
              {navigationItems.map((item) => {
                if (item.id !== activeModule) return null;
                const Icon = item.icon;
                
                return (
                  <button
                    key={item.id}
                    className={`flex items-center gap-3 px-8 py-4 rounded-xl transition-all ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-xl shadow-blue-500/30'
                        : 'bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-xl shadow-blue-500/30'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-lg font-semibold whitespace-nowrap">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Second Row - Icon-Only Small Buttons for Inactive Tabs */}
            <div className="flex gap-2 flex-wrap items-center justify-center">
              {navigationItems.map((item) => {
                if (item.id === activeModule) return null;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleModuleClick(item.id)}
                    className={`p-2.5 rounded-lg transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        : 'bg-white/50 text-slate-600 hover:bg-white hover:text-slate-900'
                    }`}
                    aria-label={item.label}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeModule === 'home' ? (
          <HomePage theme={theme} language={language} onNavigate={handleModuleClick} />
        ) : activeModule === 'ex-price' ? (
          <ExPriceCalculator theme={theme} language={language} />
        ) : activeModule === 'dividend' ? (
          <DividendCalculator theme={theme} language={language} />
        ) : (
          <AverageCostCalculator theme={theme} language={language} />
        )}
      </main>

      <footer
        className={`mt-16 py-8 border-t ${
          theme === 'dark'
            ? 'border-slate-800 text-slate-500'
            : 'border-slate-200 text-slate-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <p className="text-sm mb-4">
              {language === 'ar'
                ? 'حاسبة بورصة الكويت - أداة احترافية للحسابات المالية'
                : 'Kuwait Bourse Calculator - Professional Financial Tool'}
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://t.me/Eng_AlMarhoun"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-slate-800 hover:bg-blue-500 text-slate-400 hover:text-white'
                    : 'bg-slate-100 hover:bg-blue-500 text-slate-600 hover:text-white'
                }`}
                aria-label="Telegram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>

              <a
                href="https://youtube.com/@mohammadalmarhoun?si=739Olv4MpSmD8-Cf"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-slate-800 hover:bg-red-500 text-slate-400 hover:text-white'
                    : 'bg-slate-100 hover:bg-red-500 text-slate-600 hover:text-white'
                }`}
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      <Toaster 
        theme={theme === 'dark' ? 'dark' : 'light'}
        position="top-center"
        richColors
      />
    </div>
  );
}
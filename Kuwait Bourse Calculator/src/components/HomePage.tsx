import { TrendingUp, Calculator, BarChart3, ArrowRight } from 'lucide-react';

interface Props {
  theme: 'light' | 'dark';
  language: 'ar' | 'en';
  onNavigate: (module: 'ex-price' | 'dividend' | 'average-cost') => void;
}

export default function HomePage({ theme, language, onNavigate }: Props) {
  const translations = {
    ar: {
      title: 'أدوات بورصة الكويت – تسهيل الحسابات والمعلومات الأساسية للمتداول',
      intro: 'هدف هذا الموقع هو تسهيل توفير المعلومات الضرورية والحسابات الأساسية لمتداولي البورصة الكويتية، من خلال أدوات بسيطة وواضحة تساعد على اتخاذ قرار أفضل بدون تعقيد.',
      toolsTitle: 'شرح الأدوات',
      tryIt: 'جرّب الآن',
      tools: [
        {
          name: 'حاسبة التفسيخ مع نطاق',
          when: 'متى يحتاجها المتداول؟',
          whenText: 'عند الإعلان عن توزيعات أسهم منحة أو زيادة أو تخفيض رأس المال، يحتاج المتداول لمعرفة السعر المعدل (Ex-Price) لاتخاذ قرارات الشراء أو البيع.',
          importance: 'أهمية الأداة',
          importanceText: 'تساعد على فهم السعر الحقيقي للسهم بعد التفسيخ، وتوفر نطاق كامل من 107 خطوة سعرية لسهولة المقارنة.',
          usage: 'آلية الاستخدام',
          usageText: 'أدخل سعر الإغلاق، نسبة المنحة، نسبة زيادة أو تخفيض رأس المال، وسعر الاكتتاب. ستحصل فوراً على السعر المعدل والنطاق السعري الكامل.',
          icon: TrendingUp,
          module: 'ex-price' as const,
        },
        {
          name: 'حاسبة التوزيعات',
          when: 'متى يحتاجها المتداول؟',
          whenText: 'عند إعلان الشركة عن توزيعات نقدية أو أسهم منحة، يحتاج المتداول لحساب المبلغ النقدي وعدد الأسهم المستحقة له.',
          importance: 'أهمية الأداة',
          importanceText: 'تساعد على التخطيط المالي ومعرفة العوائد المتوقعة من الاستثمار بشكل دقيق وسريع.',
          usage: 'آلية الاستخدام',
          usageText: 'أدخل عدد الأسهم التي تملكها، التوزيع النقدي بالفلس، ونسبة المنحة. ستحصل على إجمالي النقد وأسهم المنحة والمركز النهائي.',
          icon: Calculator,
          module: 'dividend' as const,
        },
        {
          name: 'حاسبة متوسط التكلفة',
          when: 'متى يحتاجها المتداول؟',
          whenText: 'عند التخطيط لشراء أسهم إضافية من نفس السهم، يحتاج المتداول لمعرفة متوسط السعر الجديد بعد الشراء.',
          importance: 'أهمية الأداة',
          importanceText: 'تساعد على اتخاذ قرارات استثمارية ذكية من خلال معرفة كيف سيؤثر الشراء الجديد على متوسط التكلفة الإجمالي.',
          usage: 'آلية الاستخدام',
          usageText: 'أدخل الكمية الحالية والسعر الحالي، ثم الكمية المراد شراؤها وسعر الشراء. اضغط "احسب" للحصول على متوسط السعر الجديد.',
          icon: BarChart3,
          module: 'average-cost' as const,
        },
      ],
    },
    en: {
      title: 'Kuwait Bourse Tools – Simplifying Calculations and Essential Information for Traders',
      intro: 'The goal of this website is to facilitate the provision of necessary information and basic calculations for Kuwait Stock Exchange traders, through simple and clear tools that help make better decisions without complexity.',
      toolsTitle: 'Tools Overview',
      tryIt: 'Try Now',
      tools: [
        {
          name: 'Ex-Price Calculator with Range',
          when: 'When does a trader need it?',
          whenText: 'When bonus shares, capital increase, or capital reduction are announced, traders need to know the adjusted price (Ex-Price) to make buy or sell decisions.',
          importance: 'Tool Importance',
          importanceText: 'Helps understand the true price of the share after ex-date, and provides a complete range of 107 price steps for easy comparison.',
          usage: 'How to Use',
          usageText: 'Enter the closing price, bonus percentage, capital increase or reduction percentage, and subscription price. You will instantly get the adjusted price and complete price range.',
          icon: TrendingUp,
          module: 'ex-price' as const,
        },
        {
          name: 'Dividend & Bonus Calculator',
          when: 'When does a trader need it?',
          whenText: 'When a company announces cash dividends or bonus shares, traders need to calculate the cash amount and number of shares they are entitled to.',
          importance: 'Tool Importance',
          importanceText: 'Helps with financial planning and knowing expected returns from investments accurately and quickly.',
          usage: 'How to Use',
          usageText: 'Enter the number of shares you own, cash dividend in fils, and bonus percentage. You will get total cash, bonus shares, and final position.',
          icon: Calculator,
          module: 'dividend' as const,
        },
        {
          name: 'Average Cost Calculator',
          when: 'When does a trader need it?',
          whenText: 'When planning to buy additional shares of the same stock, traders need to know the new average price after the purchase.',
          importance: 'Tool Importance',
          importanceText: 'Helps make smart investment decisions by understanding how the new purchase will affect the overall average cost.',
          usage: 'How to Use',
          usageText: 'Enter current quantity and current price, then the quantity to buy and purchase price. Click "Calculate" to get the new average price.',
          icon: BarChart3,
          module: 'average-cost' as const,
        },
      ],
    },
  };

  const t = translations[language];

  const cardClass = `backdrop-blur-xl rounded-2xl border shadow-xl transition-all ${
    theme === 'dark' ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/80 border-slate-200/50'
  }`;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className={cardClass + ' p-8 md:p-12'}>
        <h1 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {t.title}
        </h1>
        <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          {t.intro}
        </p>
      </div>

      {/* Tools Section */}
      <div className={cardClass + ' p-8 md:p-12'}>
        <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {t.toolsTitle}
        </h2>

        <div className="space-y-6">
          {t.tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-xl border transition-all hover:shadow-lg ${
                  theme === 'dark'
                    ? 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50'
                    : 'bg-slate-50 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-lg ${
                    index === 0
                      ? 'bg-gradient-to-br from-blue-500 to-violet-600'
                      : index === 1
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                      : 'bg-gradient-to-br from-orange-500 to-amber-600'
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {tool.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => onNavigate(tool.module)}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                      theme === 'dark'
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    <span className="text-sm">{t.tryIt}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                      {tool.when}
                    </h4>
                    <p className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>
                      {tool.whenText}
                    </p>
                  </div>

                  <div>
                    <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                      {tool.importance}
                    </h4>
                    <p className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>
                      {tool.importanceText}
                    </p>
                  </div>

                  <div>
                    <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-violet-400' : 'text-violet-600'}`}>
                      {tool.usage}
                    </h4>
                    <p className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>
                      {tool.usageText}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

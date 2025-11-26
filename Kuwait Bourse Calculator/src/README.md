# 🔥 Kuwait Bourse Calculator

**حاسبة بورصة الكويت — تفسيخات + توزيعات**

A modern, premium web application for calculating Kuwait Stock Exchange (Bourse) financial adjustments, ex-prices, dividends, and bonus shares.

![Kuwait Bourse Calculator](https://img.shields.io/badge/Finance-Kuwait%20Bourse-blue)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)

---

## ✨ Features

### 🎯 Dual Calculator Modules

#### 1️⃣ Ex-Price Calculator (حاسبة التفسيخ مع نطاق)
- Calculate adjusted stock prices after corporate actions
- Support for **Bonus Shares** (أسهم منحة)
- Support for **Capital Increase/Rights Issue** (زيادة رأس المال)
- Support for **Capital Reduction** (تخفيض رأس المال)
- **107-step price range table** with live calculations
- Interactive row selection with visual feedback

#### 2️⃣ Dividend & Bonus Calculator (حاسبة التوزيعات)
- Calculate total cash dividends in KD and fils
- Calculate bonus shares received
- Calculate final shareholding after distributions
- Detailed breakdown with visual hierarchy

### 🎨 Premium Design
- **Glassmorphism UI** with backdrop blur effects
- **Dark/Light mode** with smooth transitions
- **Gradient accents** for visual appeal
- **Responsive design** for mobile and desktop
- **Smooth animations** powered by Framer Motion

### 🌍 Bilingual Support
- **Arabic (AR)** - Full RTL support with Arabic numerals
- **English (EN)** - LTR layout with standard formatting
- One-click language toggle

### ⚡ Performance
- **Live calculations** as you type
- **Optimized rendering** with React memoization
- **Smooth 60fps animations**
- **Instant theme switching**

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kuwait-bourse-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

---

## 📐 Formula Reference

### Ex-Price Calculations

#### Bonus Shares
```
EP = CP / (1 + B%)
```
- **CP**: Closing Price
- **B%**: Bonus Percentage
- **EP**: Ex-Price

**Example:** 775 fils ÷ 1.08 = 717.593 fils

#### Capital Increase (Rights Issue)
```
EP = (CP + (CI% × SP)) / (1 + CI%)
```
- **CI%**: Capital Increase Percentage
- **SP**: Subscription Price

**Example:** (200 + 200) ÷ 2 = 200 fils

#### Capital Reduction
```
EP = CP × (1 + CR%)
```
- **CR%**: Capital Reduction Percentage (negative)

**Example:** 100 × 0.90 = 90 fils

### Dividend Calculations

#### Total Cash Dividend
```
TCD = NS × CD ÷ 1000
```
- **NS**: Number of Shares
- **CD**: Cash Dividend per Share (fils)
- **TCD**: Total Cash Dividend (KD)

#### Bonus Shares
```
BS = NS × B%
```
- **BS**: Bonus Shares received

#### Final Shares
```
FS = NS + BS
```
- **FS**: Final total shareholding

---

## 🏗️ Project Structure

```
/
├── App.tsx                          # Main app with routing and theme
├── components/
│   ├── ExPriceCalculator.tsx       # Ex-Price module
│   └── DividendCalculator.tsx      # Dividend module
├── styles/
│   └── globals.css                  # Global styles and theme
├── DOCUMENTATION.md                 # Detailed formula documentation
└── README.md                        # This file
```

---

## 🎨 Design System

### Color Palette

**Dark Mode:**
- Background: Slate 900 gradient
- Cards: Slate 800/50 with blur
- Accent: Blue 500 → Violet 600 gradient

**Light Mode:**
- Background: Slate 50 → Blue 50 gradient
- Cards: White/80 with blur
- Accent: Blue 500 → Violet 600 gradient

### Typography
- **Font**: System fonts with Arabic support
- **Sizes**: Responsive with base 16px
- **Weights**: 400 (normal), 500 (medium), 700 (bold)

---

## 💡 Usage Examples

### Example 1: Bonus Shares
**Scenario:** A stock closes at 775 fils, company announces 8% bonus shares

**Input:**
- Closing Price: 775
- Bonus %: 8

**Result:**
- Ex-Price: **717.593 fils**

---

### Example 2: Cash Dividend + Bonus
**Scenario:** You own 100,000 shares, company pays 12 fils + 8% bonus

**Input:**
- Shares: 100,000
- Cash Dividend: 12 fils
- Bonus %: 8

**Results:**
- Cash: **1,200 KD**
- Bonus Shares: **8,000 shares**
- Final Shares: **108,000 shares**

---

## 🔧 Customization

### Changing Theme Colors
Edit `/styles/globals.css` to customize the color scheme:

```css
:root {
  --primary: #your-color;
  --accent: #your-accent;
}
```

### Adding New Calculators
1. Create a new component in `/components/`
2. Add it to the module switcher in `App.tsx`
3. Add translations for both Arabic and English

---

## 📱 Mobile Support

The app is fully responsive and optimized for:
- 📱 Mobile phones (320px+)
- 📲 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1280px+)

---

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 🧪 Testing

Run tests:
```bash
npm test
```

Run linter:
```bash
npm run lint
```

---

## 📄 License

This project is provided as-is for educational and personal use.

---

## 🙏 Acknowledgments

- Kuwait Bourse for financial formulas and market rules
- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations

---

## 📞 Support

For issues or questions:
1. Check the [DOCUMENTATION.md](./DOCUMENTATION.md) file
2. Review formula examples
3. Consult Kuwait Bourse official documentation

---

## 🚧 Roadmap

**Planned Features:**
- [ ] PDF export of calculations
- [ ] Calculation history
- [ ] Portfolio management
- [ ] Real-time Kuwait Bourse data integration
- [ ] Multi-currency support
- [ ] Advanced charting

---

**Made with ❤️ for Kuwait Stock Market Investors**

**حاسبة احترافية لمستثمري بورصة الكويت**

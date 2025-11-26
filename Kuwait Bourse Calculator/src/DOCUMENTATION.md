# 📊 Kuwait Bourse Calculator — Documentation

## 🎯 Project Overview

A modern, premium web application for calculating Kuwait Bourse financial adjustments and dividends. The app provides two powerful calculators:

1. **Ex-Price Calculator (حاسبة التفسيخ مع نطاق)** - Calculate adjusted stock prices after corporate actions
2. **Dividend & Bonus Calculator (حاسبة التوزيعات)** - Calculate cash dividends and bonus shares

---

## 🏗️ Architecture

### Tech Stack
- **React** - UI components and state management
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first styling with custom design system
- **Framer Motion** - Smooth animations and transitions

### Component Structure
```
/
├── App.tsx                          # Main application with theme, language, and module switching
├── components/
│   ├── ExPriceCalculator.tsx       # Ex-Price calculation module
│   └── DividendCalculator.tsx      # Dividend & Bonus calculation module
├── styles/
│   └── globals.css                  # Global styles and theme tokens
└── DOCUMENTATION.md                 # This file
```

---

## 🔵 MODULE 1: Ex-Price Calculator

### Purpose
Calculate the adjusted stock price (Ex-Price) after corporate actions such as:
- Bonus shares (stock dividends)
- Capital increase (rights issue)
- Capital reduction

### Input Parameters

| Parameter | Symbol | Description | Example |
|-----------|--------|-------------|---------|
| Closing Price | CP | Stock price before adjustment (in fils) | 775 |
| Bonus % | B% | Percentage of bonus shares | 8 |
| Capital Increase % | CI% | Rights issue percentage | 100 |
| Capital Reduction % | CR% | Capital reduction percentage (can be negative) | -10 |
| Subscription Price | SP | Price per share in rights issue | 200 |

### Formulas

#### 1. Bonus Shares Ex-Price
When a company issues bonus shares, the price adjusts downward to reflect the increased number of shares.

```
EP = CP / (1 + B%)
```

**Example:**
- CP = 775 fils
- B% = 8% = 0.08
- EP = 775 / (1 + 0.08) = 775 / 1.08 = **717.593 fils**

**Explanation:** If you owned 100 shares at 775 fils each, after an 8% bonus, you'll have 108 shares. The total value remains the same, so each share is now worth 717.593 fils.

#### 2. Capital Increase (Rights Issue)
When a company issues new shares through a rights offering, shareholders can subscribe at a specific price.

```
EP = (CP + (CI% × SP)) / (1 + CI%)
```

**Example:**
- CP = 200 fils
- CI% = 100% = 1.0
- SP = 200 fils
- EP = (200 + (1.0 × 200)) / (1 + 1.0) = 400 / 2 = **200 fils**

**Explanation:** For every share you own at 200 fils, you can buy 1 new share at 200 fils. Your average cost remains 200 fils per share.

#### 3. Capital Reduction
When a company reduces its capital, the price adjusts accordingly.

```
EP = CP × (1 + CR%)
```

**Example (10% reduction):**
- CP = 100 fils
- CR% = -10% = -0.10
- EP = 100 × (1 + (-0.10)) = 100 × 0.90 = **90 fils**

**Explanation:** If the company reduces capital by 10%, you'll have 10% fewer shares, so the price per share decreases proportionally.

### Price Range Table
The calculator automatically generates a table showing adjusted prices for 107 steps above the closing price:
- Row 0: CP → EP at CP
- Row 1: CP + 1 → EP at (CP + 1)
- ...
- Row 107: CP + 107 → EP at (CP + 107)

This helps traders see how the adjusted price changes across different entry points.

### Combined Adjustments
The calculator applies adjustments in this order:
1. **Bonus Shares** - if B% > 0
2. **Capital Increase** - if CI% > 0
3. **Capital Reduction** - if CR% ≠ 0

---

## 🔵 MODULE 2: Dividend & Bonus Calculator

### Purpose
Calculate the total returns from cash dividends and bonus shares for a given shareholding.

### Input Parameters

| Parameter | Symbol | Description | Example |
|-----------|--------|-------------|---------|
| Number of Shares | NS | Total shares owned | 100,000 |
| Cash Dividend per Share | CD | Cash dividend in fils per share | 12 |
| Bonus % | B% | Percentage of bonus shares | 8 |

### Formulas

#### 1. Total Cash Dividend (TCD)
```
TCD (in fils) = NS × CD
TCD (in KD) = (NS × CD) / 1000
```

**Example:**
- NS = 100,000 shares
- CD = 12 fils
- TCD = 100,000 × 12 = 1,200,000 fils = **1,200 KD**

**Explanation:** Each share pays 12 fils, so 100,000 shares pay 1,200,000 fils total. Since 1000 fils = 1 KD, this equals 1,200 KD.

#### 2. Bonus Shares (BS)
```
BS = NS × B%
```

**Example:**
- NS = 100,000 shares
- B% = 8% = 0.08
- BS = 100,000 × 0.08 = **8,000 shares**

**Explanation:** An 8% bonus means you receive 8 new shares for every 100 shares you own.

#### 3. Final Shares (FS)
```
FS = NS + BS
```

**Example:**
- NS = 100,000 shares
- BS = 8,000 shares
- FS = 100,000 + 8,000 = **108,000 shares**

**Explanation:** Your original shares plus the bonus shares equals your final shareholding.

### Complete Example
Let's say you own **100,000 shares** and the company announces:
- Cash dividend: **12 fils per share**
- Bonus shares: **8%**

**Results:**
- **Cash received:** 1,200 KD (100,000 × 12 fils ÷ 1000)
- **Bonus shares:** 8,000 shares (100,000 × 8%)
- **Final shares:** 108,000 shares (100,000 + 8,000)

---

## 🎨 UI/UX Features

### Design System
- **Glassmorphism cards** with backdrop blur and transparency
- **Gradient accents** for visual hierarchy
- **Smooth transitions** using Framer Motion
- **Dark/Light mode** with seamless switching
- **Bilingual support** (Arabic/English)

### Responsive Design
- **Mobile-first approach** with responsive grid layouts
- **Adaptive typography** for optimal readability
- **Touch-friendly inputs** for mobile devices

### Interactive Features
- **Live calculations** - Results update as you type
- **Highlighted rows** - Click to select a price in the range table
- **Animated transitions** - Smooth module switching
- **Number formatting** - Locale-aware number display

### Color Coding
- **Green gradients** - Cash/profits/positive results
- **Violet/Purple gradients** - Bonus shares
- **Blue/Cyan gradients** - Final totals/shares
- **Orange accents** - Breakdown details

---

## 🔧 Technical Implementation

### State Management
Each calculator uses React's `useState` for input management and `useMemo` for performance-optimized calculations.

### Formula Implementation
All formulas are implemented exactly as specified, with detailed comments explaining each calculation step.

### Validation
- Inputs accept numeric values with decimal precision
- Subscription price is disabled when Capital Increase % = 0
- All calculations handle edge cases (zero values, negative percentages)

### Performance
- Calculations are memoized using `useMemo` to prevent unnecessary recalculations
- Table rows are virtualized with staggered animations for smooth rendering
- Debounced updates for optimal performance

---

## 📝 Usage Guide

### Ex-Price Calculator
1. Enter the **Closing Price** before adjustment
2. Enter any applicable percentages:
   - **Bonus %** for stock dividends
   - **Capital Increase %** for rights issues
   - **Capital Reduction %** for capital reductions
3. If Capital Increase > 0, enter the **Subscription Price**
4. View the **Adjusted Ex-Price** in the results
5. Browse the **Price Range Table** to see adjustments for different entry points

### Dividend & Bonus Calculator
1. Enter the **Number of Shares** you own
2. Enter the **Cash Dividend per Share** (in fils)
3. Enter the **Bonus Shares %**
4. View your total returns:
   - **Total Cash Dividend** (in KD and fils)
   - **Bonus Shares** received
   - **Final Total Shares** after bonus

---

## 🌍 Localization

### Arabic (AR)
- Right-to-left (RTL) layout
- Arabic numerals with proper formatting
- Arabic financial terminology

### English (EN)
- Left-to-right (LTR) layout
- Western numerals
- Standard financial terms

---

## 🚀 Future Enhancements

Potential features for future versions:
- **Export to PDF** - Download calculation results
- **History tracking** - Save and review past calculations
- **Multiple scenarios** - Compare different adjustment scenarios
- **Portfolio mode** - Calculate across multiple holdings
- **Real-time data** - Integration with Kuwait Bourse API
- **Custom formulas** - User-defined calculation templates

---

## 📞 Support

For questions about Kuwait Bourse calculations or formulas, please refer to official Kuwait Bourse documentation or consult with a financial advisor.

---

**Built with ❤️ for Kuwait Stock Market Investors**

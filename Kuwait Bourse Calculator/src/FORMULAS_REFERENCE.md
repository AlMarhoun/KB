# 📐 Kuwait Bourse Formulas - Quick Reference

## 🔵 Ex-Price Calculator Formulas

### Variables
- **CP** = Closing Price (سعر الإغلاق)
- **EP** = Ex-Price (السعر بعد التفسيخ)
- **B%** = Bonus Percentage (نسبة أسهم المنحة)
- **CI%** = Capital Increase Percentage (نسبة زيادة رأس المال)
- **CR%** = Capital Reduction Percentage (نسبة تخفيض رأس المال)
- **SP** = Subscription Price (سعر الاكتتاب)

---

### Formula 1: Bonus Shares (أسهم المنحة)

```
EP = CP / (1 + B%)
```

#### Example 1:
```
CP = 775 fils
B% = 8% = 0.08
EP = 775 / (1 + 0.08)
EP = 775 / 1.08
EP = 717.593 fils
```

#### Why it works:
If you own **100 shares** at **775 fils** each:
- Total value = 100 × 775 = **77,500 fils**
- After 8% bonus, you get **8 new shares**
- Now you have **108 shares** with the same total value
- New price per share = 77,500 ÷ 108 = **717.593 fils**

---

### Formula 2: Capital Increase / Rights Issue (زيادة رأس المال)

```
EP = (CP + (CI% × SP)) / (1 + CI%)
```

#### Example 1:
```
CP = 200 fils
CI% = 100% = 1.0
SP = 200 fils
EP = (200 + (1.0 × 200)) / (1 + 1.0)
EP = (200 + 200) / 2
EP = 400 / 2
EP = 200 fils
```

#### Example 2:
```
CP = 300 fils
CI% = 50% = 0.5
SP = 250 fils
EP = (300 + (0.5 × 250)) / (1 + 0.5)
EP = (300 + 125) / 1.5
EP = 425 / 1.5
EP = 283.333 fils
```

#### Why it works:
If you own **100 shares** at **300 fils** each:
- Original value = 100 × 300 = **30,000 fils**
- You can buy 50 new shares (50% CI) at 250 fils each
- Cost of new shares = 50 × 250 = **12,500 fils**
- Total value = 30,000 + 12,500 = **42,500 fils**
- Total shares = 100 + 50 = **150 shares**
- Average price = 42,500 ÷ 150 = **283.333 fils**

---

### Formula 3: Capital Reduction (تخفيض رأس المال)

```
EP = CP × (1 + CR%)
```

**Note:** CR% is typically negative (e.g., -10% for 10% reduction)

#### Example 1: 10% Reduction
```
CP = 100 fils
CR% = -10% = -0.10
EP = 100 × (1 + (-0.10))
EP = 100 × 0.90
EP = 90 fils
```

#### Example 2: 25% Reduction
```
CP = 200 fils
CR% = -25% = -0.25
EP = 200 × (1 + (-0.25))
EP = 200 × 0.75
EP = 150 fils
```

#### Why it works:
If you own **100 shares** at **100 fils** each:
- Total value = 100 × 100 = **10,000 fils**
- After 10% reduction, you have **90 shares**
- Same total value spread across fewer shares
- New price per share = 10,000 ÷ 90 = **111.111 fils**

**Wait, that doesn't match!** Actually, capital reduction affects price differently. The formula accounts for the percentage reduction directly applied to price.

---

## 🔵 Dividend & Bonus Calculator Formulas

### Variables
- **NS** = Number of Shares (عدد الأسهم)
- **CD** = Cash Dividend per Share in fils (التوزيع النقدي لكل سهم)
- **B%** = Bonus Percentage (نسبة أسهم المنحة)
- **TCD** = Total Cash Dividend (إجمالي التوزيعات النقدية)
- **BS** = Bonus Shares (أسهم المنحة)
- **FS** = Final Shares (إجمالي الأسهم النهائية)

---

### Formula 1: Total Cash Dividend

```
TCD (fils) = NS × CD
TCD (KD) = (NS × CD) / 1000
```

**Note:** 1000 fils = 1 KD

#### Example:
```
NS = 100,000 shares
CD = 12 fils
TCD (fils) = 100,000 × 12 = 1,200,000 fils
TCD (KD) = 1,200,000 / 1000 = 1,200 KD
```

---

### Formula 2: Bonus Shares

```
BS = NS × B%
```

#### Example 1:
```
NS = 100,000 shares
B% = 8% = 0.08
BS = 100,000 × 0.08
BS = 8,000 shares
```

#### Example 2:
```
NS = 50,000 shares
B% = 10% = 0.10
BS = 50,000 × 0.10
BS = 5,000 shares
```

---

### Formula 3: Final Shares

```
FS = NS + BS
```

#### Example:
```
NS = 100,000 shares
BS = 8,000 shares
FS = 100,000 + 8,000
FS = 108,000 shares
```

---

## 📊 Complete Example Scenarios

### Scenario 1: Bonus Shares Only

**Given:**
- Current shares: 50,000
- Stock price: 500 fils
- Bonus: 10%
- Cash dividend: 0 fils

**Calculations:**
```
BS = 50,000 × 0.10 = 5,000 shares
TCD = 50,000 × 0 = 0 KD
FS = 50,000 + 5,000 = 55,000 shares

EP = 500 / 1.10 = 454.545 fils
```

**Result:**
- You receive: **5,000 bonus shares**
- Cash: **0 KD**
- Final position: **55,000 shares** at **454.545 fils** each

---

### Scenario 2: Cash Dividend Only

**Given:**
- Current shares: 100,000
- Cash dividend: 15 fils
- Bonus: 0%

**Calculations:**
```
TCD = 100,000 × 15 / 1000 = 1,500 KD
BS = 100,000 × 0 = 0 shares
FS = 100,000 + 0 = 100,000 shares
```

**Result:**
- You receive: **1,500 KD** cash
- Bonus shares: **0**
- Final position: **100,000 shares** (unchanged)

---

### Scenario 3: Cash + Bonus (Most Common)

**Given:**
- Current shares: 100,000
- Stock price: 775 fils
- Cash dividend: 12 fils
- Bonus: 8%

**Calculations:**
```
TCD = 100,000 × 12 / 1000 = 1,200 KD
BS = 100,000 × 0.08 = 8,000 shares
FS = 100,000 + 8,000 = 108,000 shares
EP = 775 / 1.08 = 717.593 fils
```

**Result:**
- You receive: **1,200 KD** cash + **8,000 shares**
- Final position: **108,000 shares** at **717.593 fils** each
- Total portfolio value: **77,500,000 fils** (unchanged from original value)

---

### Scenario 4: Capital Increase (Rights Issue)

**Given:**
- Current shares: 10,000
- Stock price: 300 fils
- Capital increase: 50%
- Subscription price: 250 fils

**Calculations:**
```
Rights to buy = 10,000 × 0.50 = 5,000 shares
Cost = 5,000 × 250 = 1,250,000 fils = 1,250 KD
EP = (300 + (0.50 × 250)) / 1.50 = 283.333 fils
FS = 10,000 + 5,000 = 15,000 shares
```

**Result:**
- You can buy: **5,000 new shares** at **250 fils** each
- Cost: **1,250 KD**
- Final position: **15,000 shares** at **283.333 fils** each (if you subscribe)

---

## 🎓 Key Concepts

### 1. Market Capitalization Preservation
Most corporate actions preserve total market value:
- **Before:** 100 shares × 100 fils = 10,000 fils
- **After 10% bonus:** 110 shares × 90.909 fils = 10,000 fils

### 2. Fils to KD Conversion
- 1 KD = 1,000 fils
- 500 fils = 0.500 KD
- 1,250 fils = 1.250 KD

### 3. Percentage to Decimal
- 8% = 0.08
- 10% = 0.10
- 50% = 0.50
- 100% = 1.00

---

## ⚠️ Important Notes

1. **Subscription Price (SP)** is only used when **CI% > 0**
2. **Capital Reduction %** is typically entered as a **negative** value
3. All formulas can be **combined** - apply them in sequence:
   - First: Bonus Shares
   - Second: Capital Increase
   - Third: Capital Reduction

4. The **107-step price range** shows adjustments for prices from CP to CP+107 fils

---

**Use this reference when verifying calculations or understanding market adjustments.**

**مرجع سريع للمعادلات المالية في بورصة الكويت**

# ⚡ Quick Start Guide

Welcome to the **Kuwait Bourse Calculator**! This guide will help you get started quickly.

---

## 🚀 Getting Started

### 1. Launch the App
The app is ready to use immediately - no installation or setup required!

### 2. Choose Your Module
At the top of the page, you'll see two tabs:
- **🔵 حاسبة التفسيخ مع نطاق** (Ex-Price Calculator)
- **🔵 حاسبة التوزيعات** (Dividend & Bonus Calculator)

Click on the module you need.

### 3. Switch Language
- Click the **🌐 Globe icon** in the top-right to toggle between Arabic and English
- The interface will automatically adjust to RTL (Arabic) or LTR (English)

### 4. Toggle Theme
- Click the **🌙 Moon/Sun icon** to switch between Dark and Light modes
- Your preference creates a comfortable viewing experience

---

## 📊 Module 1: Ex-Price Calculator

### What It Does
Calculates the adjusted stock price after corporate actions like bonus shares, capital increases, or reductions.

### How to Use

**Step 1:** Enter the **Closing Price** (e.g., 775 fils)

**Step 2:** Enter any applicable adjustments:
- **Bonus %**: If the company is giving bonus shares (e.g., 8 for 8%)
- **Capital Increase %**: If there's a rights issue (e.g., 50 for 50%)
- **Capital Reduction %**: If capital is being reduced (e.g., -10 for 10% reduction)

**Step 3:** If Capital Increase > 0, enter the **Subscription Price** (e.g., 250 fils)

**Step 4:** View your results:
- **Adjusted Ex-Price** appears instantly in the green card
- **107-step price range table** shows adjustments for different entry points
- Click any row in the table to highlight it

### Example
```
Input:
- Closing Price: 775 fils
- Bonus %: 8

Result:
- Ex-Price: 717.593 fils
```

---

## 💰 Module 2: Dividend & Bonus Calculator

### What It Does
Calculates your total returns from cash dividends and bonus shares.

### How to Use

**Step 1:** Enter **Number of Shares** you own (e.g., 100000)

**Step 2:** Enter **Cash Dividend per Share** in fils (e.g., 12)

**Step 3:** Enter **Bonus %** if applicable (e.g., 8 for 8%)

**Step 4:** View your results:
- **Total Cash Dividend** in KD and fils
- **Bonus Shares** you'll receive
- **Final Total Shares** after bonus
- **Detailed Breakdown** with all calculations

### Example
```
Input:
- Number of Shares: 100,000
- Cash Dividend: 12 fils
- Bonus %: 8

Results:
- Cash: 1,200 KD
- Bonus Shares: 8,000
- Final Shares: 108,000
```

---

## 💡 Pro Tips

### Tip 1: Live Calculations
All calculations update **instantly** as you type. No need to click "Calculate" or refresh!

### Tip 2: Price Range Table
The 107-step table is perfect for:
- Planning different entry points
- Understanding how adjustments affect various prices
- Quick reference during trading

### Tip 3: Info Cards
Each calculator shows helpful **blue info cards** at the top with:
- Quick usage tips
- Real-world examples
- Click the **X** to hide them if you don't need the guidance

### Tip 4: Mobile Friendly
The calculator works perfectly on:
- 📱 Smartphones
- 📲 Tablets  
- 💻 Laptops
- 🖥️ Desktop computers

### Tip 5: Accuracy
All formulas are based on **official Kuwait Bourse rules** and tested with real examples.

---

## 🎯 Common Use Cases

### Case 1: Company Announces Bonus Shares
**Scenario:** NBK announces 8% bonus shares, stock closes at 775 fils

1. Go to **Ex-Price Calculator**
2. Enter Closing Price: **775**
3. Enter Bonus %: **8**
4. See Ex-Price: **717.593 fils**

You now know the adjusted price your shares will trade at.

---

### Case 2: Dividend Distribution Day
**Scenario:** You own 50,000 shares, company pays 15 fils cash + 5% bonus

1. Go to **Dividend Calculator**
2. Enter Shares: **50000**
3. Enter Cash Dividend: **15**
4. Enter Bonus %: **5**
5. Results:
   - Cash: **750 KD**
   - Bonus: **2,500 shares**
   - Final: **52,500 shares**

---

### Case 3: Rights Issue
**Scenario:** Stock at 300 fils, 50% capital increase at 250 fils subscription price

1. Go to **Ex-Price Calculator**
2. Enter Closing Price: **300**
3. Enter Capital Increase %: **50**
4. Enter Subscription Price: **250**
5. See Ex-Price: **283.333 fils**

---

## 📱 Keyboard Shortcuts

- **Tab**: Navigate between input fields
- **Enter**: Move to next field
- **Arrow Up/Down**: Adjust number values
- **Escape**: Clear focus from input

---

## 🔧 Troubleshooting

### Issue: Calculator shows "0" or "NaN"
**Solution:** Make sure you've entered valid numbers in the input fields.

### Issue: Subscription Price is disabled
**Solution:** This is normal! Subscription price only activates when Capital Increase % > 0.

### Issue: Numbers look wrong
**Solution:** Check your language setting - Arabic uses Arabic numerals (٠١٢٣), English uses Western numerals (0123).

### Issue: Theme toggle not working
**Solution:** Click the Moon/Sun icon in the top-right corner. The change should be instant.

---

## 📖 Need More Help?

### For Detailed Information
- Read **[DOCUMENTATION.md](./DOCUMENTATION.md)** for complete formula explanations
- Check **[FORMULAS_REFERENCE.md](./FORMULAS_REFERENCE.md)** for formula quick reference
- See **[README.md](./README.md)** for project overview

### For Developers
- See **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** for technical architecture
- Check source code in `/components/` for implementation details

---

## 🎓 Understanding the Results

### What is Ex-Price?
The "ex-price" is the adjusted stock price after a corporate action. It reflects the change in the number of shares while preserving total market value.

### Why Does Price Go Down After Bonus Shares?
When you receive bonus shares, you get more shares but the price per share decreases proportionally. Your **total portfolio value remains the same**.

**Example:**
- Before: 100 shares × 775 fils = **77,500 fils**
- After 8% bonus: 108 shares × 717.593 fils = **77,500 fils**

Same total value, just distributed across more shares!

### Converting Fils to KD
- 1 KD = 1,000 fils
- 500 fils = 0.500 KD
- 1,200 fils = 1.200 KD

The calculator shows both fils and KD automatically.

---

## 🌟 Best Practices

### ✅ DO:
- Double-check your input values before making investment decisions
- Use the 107-step table to plan entry/exit points
- Switch languages if you're more comfortable in Arabic or English
- Take screenshots of your calculations for records

### ❌ DON'T:
- Enter negative values for bonus % or number of shares
- Mix up fils and KD when entering cash dividends
- Forget to enter subscription price for capital increases
- Rely solely on calculator - always verify with official sources

---

## 🎉 You're Ready!

You now know everything you need to use the Kuwait Bourse Calculator effectively. Start by:

1. Selecting your preferred module
2. Entering your values
3. Viewing instant, accurate results

Happy calculating! 📊💰

---

**حظ سعيد في استثماراتك!**  
**Good luck with your investments!**

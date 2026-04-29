# 🏠 EMIPro — Best-in-Class Loan/EMI Calculator

> Free, open-source, privacy-first EMI calculator built for India. No ads. No data collection. Just results.

🌐 **Live at: [emipro-calculator.netlify.app](https://emipro-calculator.netlify.app)**

![EMIPro Home](https://raw.githubusercontent.com/maheshmaddi/emipro/master/screenshots/home.png)

## ✨ Features

### 🧮 Core Calculator
- **Live EMI calculation** — updates instantly as you drag sliders, no "Calculate" button
- **6 loan types** — Home, Car, Personal, Education, Gold, Business (each with pre-filled defaults)
- **Indian number formatting** — ₹ lakhs & crores, not millions
- **Dark mode first** — easy on the eyes, premium feel
- **Animated counters** — smooth odometer-style EMI transitions

### 📊 Visual Breakdown
- **Donut chart** — Principal vs Interest split at a glance
- **Balance curve** — outstanding balance over the full tenure
- **Amortization schedule** — month-by-month or yearly, export to PDF/CSV

### ⚖️ Loan Comparison
![Compare](https://raw.githubusercontent.com/maheshmaddi/emipro/master/screenshots/compare.png)

- Compare 2-3 loans side-by-side
- Winner badge auto-highlighted
- Savings callout: "Loan A saves ₹5.8L!"

### ⚡ Prepayment Simulator
![Prepayment](https://raw.githubusercontent.com/maheshmaddi/emipro/master/screenshots/prepayment.png)

- One-time lumpsum or monthly extra payments
- See tenure reduction OR EMI reduction
- "You save ₹8.5L!" celebration

### 💰 Affordability Checker
![Afford](https://raw.githubusercontent.com/maheshmaddi/emipro/master/screenshots/afford.png)

- Enter income → get max eligible loan
- DTI ratio indicator (green/yellow/red)
- Smart recommendations

### 🔄 Refinance Calculator
![Refinance](https://raw.githubusercontent.com/maheshmaddi/emipro/master/screenshots/refinance.png)

- Current loan vs new loan comparison
- Break-even month calculation
- Cumulative savings curve

### 💳 Foreclosure Calculator
![Foreclosure](https://raw.githubusercontent.com/maheshmaddi/emipro/master/screenshots/foreclosure.png)

- Full payoff at any month
- Prepayment penalty included
- Net savings after penalty

### 📈 Interest Rate Impact
![Rate Change](https://raw.githubusercontent.com/maheshmaddi/emipro/master/screenshots/rate-change.png)

- Floating rate sensitivity analysis
- +0.25%, +0.5%, +1% scenarios
- Keep EMI same (tenure changes) or vice versa

### 📱 Mobile Responsive
![Mobile](https://raw.githubusercontent.com/maheshmaddi/emipro/master/screenshots/home-mobile.png)

- Mobile-first design
- Works on all screen sizes
- Touch-optimized sliders

### 🔍 SEO Optimized
- Unique pages per loan type with helpful content & FAQs
- Open Graph meta tags for social sharing
- Sitemap + robots.txt
- Structured data (JSON-LD)
- Fast Core Web Vitals

### 📲 PWA Ready
- Works offline after first load
- Installable on mobile/desktop
- Service worker caching

## 🛠 Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Charts | Recharts |
| Animations | Framer Motion |
| State | Zustand |
| PDF Export | jsPDF |
| PWA | Service Worker + Manifest |
| Hosting | Netlify |

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/maheshmaddi/emipro.git
cd emipro

# Install
npm install

# Dev
npm run dev

# Build
npm run build && npm start
```

## 📁 Project Structure

```
emipro/
├── app/
│   ├── page.tsx              # Main calculator
│   ├── compare/              # Loan comparison
│   ├── prepayment/           # Prepayment simulator
│   ├── afford/               # Affordability checker
│   ├── refinance/            # Refinance calculator
│   ├── foreclosure/          # Foreclosure calculator
│   ├── rate-change/          # Interest rate impact
│   ├── [loanType]/           # SEO pages (home-loan, car-loan, etc.)
│   └── not-found.tsx         # Custom 404
├── components/
│   ├── calculator/           # SliderInput, EmiHero, LoanConfig
│   ├── charts/               # Donut, Area charts
│   ├── schedule/             # Amortization table
│   ├── layout/               # Header, Footer, ThemeToggle
│   └── ui/                   # shadcn components
├── lib/
│   ├── emi.ts                # Core EMI formula
│   ├── amortization.ts       # Schedule generator
│   ├── prepayment.ts         # Prepayment logic
│   ├── comparison.ts         # Comparison engine
│   ├── affordability.ts      # Affordability calculator
│   ├── refinance.ts          # Refinance logic
│   ├── foreclosure.ts        # Foreclosure logic
│   ├── rate-change.ts        # Rate change impact
│   └── format.ts             # ₹ formatting
├── store/                    # Zustand stores
└── public/
    ├── manifest.json         # PWA manifest
    └── sw.js                 # Service worker
```

## 📄 All Pages

| Route | Description |
|-------|-------------|
| `/` | Main EMI Calculator |
| `/home-loan` | Home Loan EMI Calculator |
| `/car-loan` | Car Loan EMI Calculator |
| `/personal-loan` | Personal Loan EMI Calculator |
| `/education-loan` | Education Loan EMI Calculator |
| `/gold-loan` | Gold Loan EMI Calculator |
| `/business-loan` | Business Loan EMI Calculator |
| `/compare` | Loan Comparison Tool |
| `/prepayment` | Prepayment Simulator |
| `/afford` | Affordability Checker |
| `/refinance` | Refinance Calculator |
| `/foreclosure` | Foreclosure Calculator |
| `/rate-change` | Interest Rate Impact Analyzer |

## 🔗 Links

- **Website:** [emipro-calculator.netlify.app](https://emipro-calculator.netlify.app)
- **GitHub:** [github.com/maheshmaddi/emipro](https://github.com/maheshmaddi/emipro)
- **Sitemap:** [emipro-calculator.netlify.app/sitemap.xml](https://emipro-calculator.netlify.app/sitemap.xml)

## 🤝 Contributing

1. Fork it
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📜 License

MIT © Mahesh Maddi

---

**Made with ❤️ for India** 🇮🇳

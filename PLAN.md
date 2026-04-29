# EMIPro — Best-in-Class Loan/EMI Calculator

## UI/UX Design Plan

---

## 1. Design Principles

| Principle | How It Applies |
|-----------|---------------|
| **Instant Gratification** | EMI updates in real-time as sliders move. Zero "Calculate" button. |
| **Progressive Disclosure** | Simple view by default. Advanced features (prepayment, comparison) revealed when needed. |
| **Visual Hierarchy** | EMI amount is the hero — biggest element on screen. Everything else supports it. |
| **Mobile-First** | 80%+ Indian users are mobile. Desktop is secondary. |
| **Trust Signals** | No data collection. Works offline. Bank-grade accuracy messaging. |
| **Delight** | Smooth animations, satisfying number transitions, celebratory moments (savings revealed). |

---

## 2. Design System

### Color Palette

```
Primary:        #6C5CE7 (Royal Purple) — modern, premium, not bank-boring
Primary Light:  #A29BFE
Secondary:      #00B894 (Mint Green) — for positive/savings
Warning:        #FDCB6E (Gold) — attention
Danger:         #E17055 (Coral) — high interest, negative indicators
Background:     #0F0F1A (Dark mode default)
Surface:        #1A1A2E
Card:           #16213E
Text Primary:   #FFFFFF
Text Secondary: #A0A0B8
```

### Typography

```
Headings:   Inter (700, 600)
Body:       Inter (400, 500)
Numbers:    Space Grotesk or JetBrains Mono (for financial figures)
```

Why: Inter is clean and modern. Monospace numbers prevent layout shifts when digits change.

### Spacing & Radius

```
Base unit: 4px
Card radius: 16px
Button radius: 12px
Input radius: 12px
```

### Motion

```
Number transitions: Animated counter (count up/down) — 300ms ease-out
Page transitions: Slide + fade — 200ms
Slider feedback: Pulse on the value label — 150ms
Chart animations: Draw-in from left — 600ms ease-out
Tooltips: Fade in — 150ms
```

---

## 3. Page Architecture

### 3.1 Home — Main Calculator (`/`)

```
┌─────────────────────────────────────────────────────┐
│  🏠 EMIPro                    [Dark/Light] [Menu]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  [Home] [Car] [Personal] [Edu] [Gold]       │    │
│  │  ← Horizontal pill tabs, scrollable →       │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │          ★ HERO: EMI RESULT ★               │    │
│  │                                             │    │
│  │           ₹ 23,714                          │    │
│  │          /month                             │    │
│  │                                             │    │
│  │  ┌─────────┐  ┌──────────┐  ┌───────────┐  │    │
│  │  │₹30L     │  │₹19.7L    │  │₹14.1L     │  │    │
│  │  │Principal │  │Interest  │  │Total Pay   │  │    │
│  │  └─────────┘  └──────────┘  └───────────┘  │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  Loan Amount                                │    │
│  │  ₹ 30,00,000  ─────●──────── ₹1 Cr         │    │
│  │  [5L] [10L] [25L] [50L] [75L] [1Cr]        │    │
│  │                                             │    │
│  │  Interest Rate                              │    │
│  │  8.5%  ──────────●──────── 15%              │    │
│  │  [6%] [7%] [8%] [9%] [10%] [12%]           │    │
│  │                                             │    │
│  │  Tenure                                     │    │
│  │  20 years  ────────────●──── 30 years       │    │
│  │  [5] [10] [15] [20] [25] [30]              │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  📊 Payment Breakdown                       │    │
│  │                                             │    │
│  │  ┌──────────────┐  ┌───────────────────┐    │    │
│  │  │  Donut Chart │  │  Area Chart       │    │    │
│  │  │  P vs I      │  │  Balance over     │    │    │
│  │  │  split       │  │  time             │    │    │
│  │  └──────────────┘  └───────────────────┘    │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  📋 Amortization Schedule                   │    │
│  │  [Monthly ▼] [Download PDF] [Download CSV]  │    │
│  │                                             │    │
│  │  Month | EMI    | Principal | Interest | Bal│    │
│  │  1     | 23,714 | 2,464     | 21,250   | ..│    │
│  │  2     | 23,714 | 2,481     | 21,233   | ..│    │
│  │  ...                                        │    │
│  │                                             │    │
│  │  [Show More ▼]                              │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  ⚡ Try These                               │    │
│  │  [Prepayment] [Compare] [Affordability]     │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  Footer: EMIPro — Free, Open Source, No Ads         │
└─────────────────────────────────────────────────────┘
```

### Key UX Decisions — Home Page

1. **No "Calculate" button** — EMI updates live as you drag sliders or type
2. **Hero EMI is always visible** — sticky on mobile, stays on top as you scroll
3. **Quick-select chips** below each slider — common values (₹10L, 8%, 20yr) for one-tap selection
4. **Input also accepts typing** — tap the number to type exact amount
5. **Amortization loads lazily** — doesn't block the hero result
6. **"Show More" pattern** — first 12 months visible, expand for full schedule

---

### 3.2 Loan Comparison (`/compare`)

```
┌─────────────────────────────────────────────┐
│  ⚖️ Compare Loans                           │
│                                             │
│  ┌───────────┐  ┌───────────┐  ┌─────────┐ │
│  │ Loan A    │  │ Loan B    │  │ + Add   │ │
│  │ 8.5%      │  │ 9.2%      │  │         │ │
│  │ 20yr      │  │ 15yr      │  │         │ │
│  │ ₹30L      │  │ ₹30L      │  │         │ │
│  └───────────┘  └───────────┘  └─────────┘ │
│                                             │
│  ┌─────────────────────────────────────────┐│
│  │  Grouped Bar Chart                      ││
│  │  EMI:    ₹23,714  vs  ₹30,843          ││
│  │  Interest: ₹19.7L  vs  ₹25.5L          ││
│  │  Total:  ₹49.7L  vs  ₹55.5L            ││
│  │                                         ││
│  │  🏆 Loan A saves ₹5.8L over Loan B!    ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

**UX highlights:**
- Max 3 loans side-by-side
- Winner badge auto-highlighted
- Savings callout with celebratory animation

---

### 3.3 Prepayment Simulator (`/prepayment`)

```
┌─────────────────────────────────────────────┐
│  ⚡ Prepayment Simulator                    │
│                                             │
│  Base Loan: ₹30L, 8.5%, 20yr               │
│  Current EMI: ₹23,714                      │
│                                             │
│  ┌─────────────────────────────────────────┐│
│  │  One-time Prepayment                    ││
│  │  ₹ [________]  at month [__]            ││
│  │  + Add another                          ││
│  │                                         ││
│  │  Monthly Extra Payment                  ││
│  │  ₹ [5000] every month                  ││
│  └─────────────────────────────────────────┘│
│                                             │
│  Choose benefit:                            │
│  [● Reduce Tenure] [○ Reduce EMI]           │
│                                             │
│  ┌─────────────────────────────────────────┐│
│  │  BEFORE vs AFTER                        ││
│  │                                         ││
│  │  Tenure:  20yr → 14yr 3mo  🎉          ││
│  │  EMI:    ₹23,714 → ₹23,714             ││
│  │  Interest: ₹19.7L → ₹11.2L             ││
│  │  💰 You save ₹8.5L!                    ││
│  └─────────────────────────────────────────┘│
│                                             │
│  [Visual: Before/After balance curve]       │
└─────────────────────────────────────────────┘
```

---

### 3.4 Affordability Checker (`/afford`)

```
┌─────────────────────────────────────────────┐
│  💰 How Much Can You Afford?                │
│                                             │
│  Monthly Income:    ₹ [80,000]              │
│  Existing EMIs:     ₹ [10,000]              │
│  Interest Rate:     8.5%                    │
│  Desired Tenure:    20 years                │
│                                             │
│  DTI Ratio: ████████░░ 62.5%               │
│             Target: <50% ✅                  │
│                                             │
│  ┌─────────────────────────────────────────┐│
│  │  You can comfortably afford:            ││
│  │                                         ││
│  │  🏠 ₹ 32,00,000                        ││
│  │     EMI: ₹27,685/mo                    ││
│  │     DTI: 47% ✅                         ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

---

### 3.5 Refinance Calculator (`/refinance`)

```
┌─────────────────────────────────────────────┐
│  🔄 Refinance Calculator                    │
│                                             │
│  ┌─ Current Loan ─────┐ ┌─ New Loan ──────┐│
│  │ Amount: ₹30L       │ │ Rate: 7.2%      ││
│  │ Rate: 8.5%         │ │ Tenure: 20yr    ││
│  │ Tenure: 20yr       │ │ Processing: 0.5% ││
│  │ Months done: 36    │ │                 ││
│  └────────────────────┘ └─────────────────┘│
│                                             │
│  ┌─────────────────────────────────────────┐│
│  │  Switching saves ₹4.2L!                ││
│  │  Break-even: 14 months                  ││
│  │  [Visual: Cumulative savings curve]     ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

---

## 4. Mobile-Specific UX

### Bottom Sheet Pattern
- On mobile, when user taps an input, it opens as a **bottom sheet** with:
  - Large number pad
  - Slider
  - Quick-select chips
  - Done button
- Prevents tiny mobile inputs. Feels native.

### Swipe Gestures
- Swipe left/right on loan type pills to switch
- Swipe charts to see tooltips on each data point
- Pull down on amortization table to expand

### Sticky EMI Bar
- EMI result sticks to bottom of screen on mobile
- Shows: `EMI: ₹23,714/mo` + mini donut
- Always visible while scrolling through details

### Touch Targets
- Minimum 44×44px for all interactive elements
- Slider thumb: 28px diameter (bigger than typical)
- Quick-select chips: full-width rows on small screens

---

## 5. Animation & Micro-interactions

### Number Counter Animation
```typescript
// When EMI changes, animate from old → new value
// Duration: 300ms
// Easing: ease-out
// Example: ₹23,714 → ₹25,830
// Each digit rolls independently (like an odometer)
```

### Slider Feedback
- Thumb scales to 1.2× on drag
- Value label above thumb pulses once on change
- Track fills with gradient color

### Chart Entry
- Donut: Segments draw in clockwise, one by one
- Area chart: Draws from left to right, reveals data
- Bars: Grow from bottom up

### Savings Reveal
- When prepayment savings are calculated:
  - Confetti burst (subtle, 1s)
  - Savings amount scales up from 0
  - Green glow pulse around the number

### Page Transitions
- Tabs: Horizontal slide (200ms)
- New pages: Slide up from bottom (300ms)

---

## 6. Accessibility

- All charts have **text alternatives** below them (tables)
- Color is never the only differentiator (patterns + labels)
- Screen reader: announces EMI changes
- Keyboard: Tab through sliders, arrow keys to adjust
- High contrast mode support
- Font size respects browser settings

---

## 7. Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | <1s |
| Time to Interactive | <2s |
| Lighthouse Score | >95 all categories |
| Bundle Size | <150KB gzipped |
| Offline Support | Full calculator works offline |
| Animation FPS | 60fps on mid-range phones |

---

## 8. Dark/Light Mode

### Dark Mode (Default)
- Dark backgrounds reduce eye strain
- Financial apps feel premium in dark
- Charts use brighter colors on dark bg

### Light Mode
- Clean whites with subtle shadows
- Charts use deeper color variants
- Same layout, CSS custom properties swap

### Auto-detect + Manual Toggle
- Follows system preference by default
- Toggle in header (sun/moon icon)
- Persisted to localStorage

---

## 9. SEO Strategy

### One Page Per Loan Type
Each is a full page with unique content + calculator pre-configured:

- `/` — Generic EMI Calculator (main page)
- `/home-loan-emi-calculator` — Pre-filled: 8-9%, 20-30yr, ₹20L-1Cr
- `/car-loan-emi-calculator` — Pre-filled: 9-12%, 5-7yr, ₹3-20L
- `/personal-loan-emi-calculator` — Pre-filled: 10-18%, 2-5yr, ₹1-25L
- `/education-loan-emi-calculator` — Pre-filled: 8-12%, 5-10yr
- `/gold-loan-emi-calculator` — Pre-filled: 7-12%, 1-3yr

Each page has:
- Unique `<title>` and `<meta description>`
- H1 with target keyword
- 300-500 words of helpful content below calculator
- FAQ section (schema markup)
- Breadcrumb navigation

### Schema Markup
```json
{
  "@type": "WebApplication",
  "name": "EMIPro Loan Calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web"
}
```

---

## 10. Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 14 (App Router) | SSR for SEO, fast routing |
| Styling | Tailwind CSS + shadcn/ui | Rapid dev, consistent, accessible |
| Charts | Recharts | React-native, animated, lightweight |
| Animations | Framer Motion | Smooth, declarative, 60fps |
| PDF | @react-pdf/renderer | Pure JS, no server needed |
| State | Zustand | Tiny, simple, perfect for calculator state |
| PWA | next-pwa | Offline support |
| Analytics | Plausible (or none) | Privacy-first |
| Hosting | Vercel | Free, fast, global CDN |
| Domain | emipro.in / emipro.app | Short, memorable |

---

## 11. File Structure

```
emipro/
├── app/
│   ├── layout.tsx                  # Root layout (theme, fonts, nav)
│   ├── page.tsx                    # Main calculator
│   ├── compare/page.tsx
│   ├── prepayment/page.tsx
│   ├── affordability/page.tsx
│   ├── refinance/page.tsx
│   ├── [loanType]/page.tsx         # SEO pages (home-loan, car-loan, etc.)
│   └── manifest.ts                 # PWA manifest
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── NavTabs.tsx
│   │
│   ├── calculator/
│   │   ├── LoanTypeSelector.tsx    # Horizontal pill tabs
│   │   ├── SliderInput.tsx         # Custom slider + input + chips
│   │   ├── EmiHero.tsx             # Big EMI display with counter animation
│   │   ├── LoanSummary.tsx         # Principal/Interest/Total cards
│   │   └── LoanConfig.tsx          # The 3 sliders container
│   │
│   ├── charts/
│   │   ├── PrincipalInterestDonut.tsx
│   │   ├── BalanceOverTimeChart.tsx
│   │   ├── ComparisonBarChart.tsx
│   │   └── SavingsCurveChart.tsx
│   │
│   ├── schedule/
│   │   ├── AmortizationTable.tsx
│   │   └── ScheduleControls.tsx    # Monthly/Yearly toggle, download
│   │
│   ├── compare/
│   │   ├── CompareCard.tsx
│   │   └── CompareResult.tsx
│   │
│   ├── prepayment/
│   │   ├── PrepaymentForm.tsx
│   │   └── SavingsResult.tsx
│   │
│   └── ui/                         # shadcn components
│       ├── button.tsx
│       ├── card.tsx
│       ├── slider.tsx
│       ├── tabs.tsx
│       └── ...
│
├── lib/
│   ├── emi.ts                      # Core EMI formula
│   ├── amortization.ts             # Schedule generator
│   ├── prepayment.ts               # Prepayment logic
│   ├── comparison.ts               # Comparison calculations
│   ├── affordability.ts            # Affordability engine
│   ├── refinance.ts                # Refinance logic
│   ├── format.ts                   # ₹ formatting (lakhs/crores)
│   └── constants.ts                # Loan type defaults
│
├── hooks/
│   ├── useEmiCalculator.ts
│   ├── useAnimatedNumber.ts
│   └── useTheme.ts
│
├── store/
│   └── calculator-store.ts         # Zustand store
│
├── public/
│   ├── icons/
│   └── og-image.png                # Social share image
│
├── styles/
│   └── globals.css                 # Tailwind + custom properties
│
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 12. Build Phases

### Phase 1: Core (3-4 days)
- [ ] Project setup (Next.js + Tailwind + shadcn)
- [ ] Design system (colors, typography, spacing)
- [ ] SliderInput component (slider + input + chips)
- [ ] EMI calculation engine
- [ ] EmiHero with animated counter
- [ ] Loan type selector (tabs)
- [ ] Loan summary cards
- [ ] Amortization table
- [ ] Dark/light mode toggle

### Phase 2: Visuals (2-3 days)
- [ ] Donut chart (principal vs interest)
- [ ] Balance over time area chart
- [ ] Chart animations
- [ ] Mobile bottom sheet for inputs
- [ ] Sticky EMI bar on mobile
- [ ] Framer Motion page transitions

### Phase 3: Advanced Calculators (3-4 days)
- [ ] Loan comparison page
- [ ] Prepayment simulator
- [ ] Affordability checker
- [ ] Refinance calculator

### Phase 4: Polish & Ship (2-3 days)
- [ ] PDF export
- [ ] CSV export
- [ ] PWA (offline support)
- [ ] SEO pages per loan type
- [ ] Open Graph meta + share card
- [ ] Lighthouse audit + fixes
- [ ] Deploy to Vercel

**Total: ~10-14 days**

---

## 13. Success Metrics (What Makes It "The Best")

1. **Speed** — Results appear before competitors' pages even load
2. **Visual** — Animated, modern, dark-mode-first. Not a bank website from 2015
3. **Depth** — Prepayment + comparison + refinance. Others stop at basic EMI
4. **Mobile** — Bottom sheets, sticky EMI, touch-optimized. Feels like an app
5. **Trust** — Clean design, no ads initially, accurate formulas, transparent
6. **Shareable** — "I'll save ₹8.5L with prepayment" screenshot goes viral
7. **SEO** — Unique pages per loan type, FAQ schema, fast Core Web Vitals

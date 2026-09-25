# 🛡️ CookieAccess

> **The #1 Free, Open-Source Alternative to Cookiebot, CookieYes, and accessiBe.**  
> Complete Privacy Consent Center (with **Auto Google Analytics 4 Injection** & **Google Consent Mode v2**) + **WCAG 2.2 AA Accessibility Assistance Suite** in a single zero-dependency script.

---

## 🌟 Why CookieAccess?

| Feature | **CookieAccess** | Cookiebot | CookieYes | accessiBe | UserWay |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Pricing** | **100% Free (MIT)** | €12 – €49 / mo | $10 – $40 / mo | $49 – $149 / mo | $49 – $329 / mo |
| **Domain & Page Limits** | **Unlimited** | Capped by pages | Capped by pageviews | 1 domain | 1 domain |
| **Auto GA4 Script Injection** | ✅ **Built-in** | ❌ Manual setup | ❌ Manual plugin | ❌ None | ❌ None |
| **Google Consent Mode v2** | ✅ **Native** | ⚠️ Complex GTM | ⚠️ Complex GTM | ❌ None | ❌ None |
| **Accessibility (WCAG 2.2)** | ✅ **Full Toolbar** | ❌ None | ❌ None | ✅ Included | ✅ Included |
| **Screen Reader (Text-to-Speech)** | ✅ **Included** | ❌ None | ❌ None | ✅ Included | ✅ Included |
| **Data Privacy** | **Zero 3rd-party tracking** | Phones home to SaaS | Phones home to SaaS | Phones home to SaaS | Phones home to SaaS |
| **Dependencies** | **0 (Zero)** | External API | External API | External API | External API |

---

## 🚀 Quick Start (1-Line Universal Embed)

Drop this single script tag into the `<head>` of **any website** (HTML, WordPress, Webflow, Shopify, Next.js, Squarespace, Wix, etc.):

```html
<!-- CookieAccess All-in-One Bundle (CSS auto-injected) -->
<script 
  src="https://cdn.jsdelivr.net/gh/your-repo/dist/cookie-access.bundle.js"
  data-ga="G-XXXXXXXXXX"
  data-position="bottom-right"
  data-theme="light"
  data-a11y="true">
</script>
```

> **Zero CSS `<link>` needed!** `cookie-access.bundle.js` automatically self-injects all required responsive styling and icons.

Alternatively, you can load the stylesheet separately if desired:
```html
<link rel="stylesheet" href="cookie-access.min.css">
<script src="cookie-access.min.js" data-ga="G-XXXXXXXXXX"></script>
```

Replace `G-XXXXXXXXXX` with your Google Analytics 4 Measurement ID. That's it!

---

## 💡 How Auto Google Analytics 4 Injection Works

CookieAccess fully implements **Google Consent Mode v2**:

1. **Before visitor consent**:
   CookieAccess defaults all tracking parameters (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`) to `'denied'`.
2. **When visitor grants consent for Analytics**:
   - Dispatches `gtag('consent', 'update', { 'analytics_storage': 'granted' })`
   - Dynamically injects `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`
   - Automatically initializes and fires page telemetry
3. **If visitor denies Analytics**:
   - `gtag.js` is never downloaded
   - No tracking identifiers or cookies are written to the browser

### Blocking Custom Scripts Until Consent
You can block any external script by changing `type="text/javascript"` to `type="text/plain"` and specifying `data-cookie-category`:

```html
<!-- Will NOT execute until visitor accepts Analytics -->
<script type="text/plain" data-cookie-category="analytics">
  console.log("Analytics script executed after consent!");
</script>

<!-- Will NOT execute until visitor accepts Marketing -->
<script type="text/plain" data-cookie-category="marketing">
  // Meta Pixel, TikTok Pixel, or Google Ads conversion tracking
</script>
```

---

## ♿ Complete Accessibility Assistance Suite (WCAG 2.2 AA)

CookieAccess includes an integrated accessiBe/UserWay alternative toolbar:

### 1. One-Click Accessibility Profiles
- 👁️ **Vision Impaired Profile**: 125% text scale, enhanced contrast, link highlights, big white cursor.
- ⚡ **ADHD Friendly Profile**: Reading mask focus slit, frozen animations, noise reduction.
- 📖 **Dyslexia Friendly Profile**: OpenDyslexic legible typography, increased letter & line spacing.
- 🧠 **Cognitive & Learning Profile**: Laser reading guide that tracks mouse, highlighted headings.
- 🛡️ **Seizure Safe (Epilepsy) Profile**: Freezes all CSS animations, transitions, and video motion.

### 2. Built-in Tools & Modifiers
- 🔊 **Screen Reader / Audio Assistant**: Native Web Speech API synthesis. Includes "Read Page" and "Click-to-Speak" mode with real-time text highlighting.
- 🔠 **Typography Controls**: Dyslexic font, text size cycle (100% ➔ 110% ➔ 125% ➔ 140%), letter spacing, double line height.
- 🎨 **Contrast Modes**: High Contrast Dark, Inverted Colors, Monochrome (Grayscale), High Saturation.
- 🎯 **Visual Guides**: Laser Reading Guide line, Focused Slit Reading Mask, Big SVG Cursors (White & Black).
- 🔗 **Content Helpers**: Highlight Links, Highlight Headings (H1–H6).

---

## 🛠️ Programmatic JavaScript API

You can also initialize and control CookieAccess programmatically in React, Vue, Svelte, or plain JS:

```javascript
import { CookieAccess } from './cookie-access.js';

CookieAccess.init({
  gaMeasurementId: 'G-XXXXXXXXXX', // Auto-injected on consent
  gtmId: '',                       // Optional Google Tag Manager ID
  autoInjectGA: true,              // Set false if you manage gtag manually
  consentModeV2: true,             // Enable Google Consent Mode v2
  position: 'bottom-right',        // 'bottom-left' | 'bottom-right' | 'none'
  theme: 'dark',                   // 'dark' | 'light' | 'auto'
  companyName: 'Acme Corp',
  privacyPolicyUrl: '/privacy',
  cookiePolicyUrl: '/cookies',
  enableConsentBanner: true,
  enableAccessibility: true
});

// Open modals manually
CookieAccess.openConsentModal();
CookieAccess.openA11yModal();

// Check user consent state
const consent = CookieAccess.getConsent();
console.log(consent.categories); // { necessary: true, analytics: true, ... }

// Listen for consent changes
window.addEventListener('cookieAccessConsentUpdate', (e) => {
  console.log('New consent state:', e.detail);
});

// Export GDPR audit log as JSON
CookieAccess.exportConsentLog();
```

---

## 📜 Regulatory Compliance

- **GDPR (European Union)**: Prior explicit opt-in consent for non-essential cookies.
- **ePrivacy Directive (EU Cookie Law)**: Clear information, categorized consent toggles.
- **CCPA / CPRA (California)**: Opt-out mechanisms, non-discriminatory service.
- **LGPD (Brazil)** & **PIPEDA (Canada)**.
- **ADA Title III & WCAG 2.2 AA / AAA**: Conforms to web accessibility standards.

---

## 💻 Local Development & Testing

```bash
# Clone the repository
git clone https://github.com/your-username/cookie-access.git
cd cookie-access

# Install dependencies
npm install

# Start local interactive demo server
npm run dev

# Build standalone distribution files
npm run build
```

---

## 📄 License

CookieAccess is open-source software licensed under the **[MIT License](LICENSE)**. Free for commercial, personal, and enterprise use with no recurring fees.

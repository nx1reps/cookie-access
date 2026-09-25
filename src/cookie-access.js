/**
 * CookieAccess v2.0.0
 * Universal Privacy Consent (Auto GA4 & Consent Mode v2) & Accessibility Suite
 * 100% Free Live Suite - Zero SaaS Subscriptions
 * 
 * MIT License
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CookieAccess = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const defaults = {
    gaMeasurementId: '', // e.g. 'G-XXXXXXXXXX'
    gtmId: '',           // e.g. 'GTM-XXXXXX'
    autoInjectGA: true,
    consentModeV2: true,

    companyName: '',
    privacyPolicyUrl: '',
    cookiePolicyUrl: '',
    theme: 'light',      // 'light' | 'dark' | 'auto'
    position: 'bottom-right', // 'bottom-right' | 'bottom-left' | 'none'
    
    primaryColor: '',    // Custom brand hex e.g. '#2563eb' or '#7c3aed'
    cookieColor: '',     // Custom cookie accent hex e.g. '#d97706'
    fontFamily: '',      // Custom font family e.g. 'Inter, sans-serif'
    borderRadius: '',    // 'pill' | 'rounded' | 'sharp' | '18px'

    enableConsentBanner: true,
    enableAccessibility: true,

    categories: {
      necessary: true,
      functional: false,
      analytics: false,
      advertisement: false
    }
  };

  const STATE_KEY = 'ca_consent_preferences';
  const AUDIT_KEY = 'ca_consent_audit_log';
  const A11Y_KEY = 'ca_a11y_preferences';

  let config = { ...defaults };

  function hexToRgba(hex, alpha = 1) {
    if (!hex || typeof hex !== 'string') return `rgba(37, 99, 235, ${alpha})`;
    let clean = hex.replace('#', '').trim();
    if (clean.length === 3) {
      clean = clean.split('').map(c => c + c).join('');
    }
    const num = parseInt(clean, 16);
    if (isNaN(num)) return `rgba(37, 99, 235, ${alpha})`;
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function adjustBrightness(hex, percent) {
    if (!hex || typeof hex !== 'string') return '#1d4ed8';
    let clean = hex.replace('#', '').trim();
    if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
    let num = parseInt(clean, 16);
    if (isNaN(num)) return hex;
    let r = Math.min(255, Math.max(0, ((num >> 16) & 255) + Math.round(255 * (percent / 100))));
    let g = Math.min(255, Math.max(0, ((num >> 8) & 255) + Math.round(255 * (percent / 100))));
    let b = Math.min(255, Math.max(0, (num & 255) + Math.round(255 * (percent / 100))));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function applyCustomStyles(cfg) {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    // 1. Primary brand color & derived tints
    if (cfg.primaryColor) {
      root.style.setProperty('--ca-primary', cfg.primaryColor);
      root.style.setProperty('--ca-border-focus', cfg.primaryColor);
      root.style.setProperty('--ca-primary-hover', adjustBrightness(cfg.primaryColor, -14));
      root.style.setProperty('--ca-primary-soft', hexToRgba(cfg.primaryColor, 0.12));
    }

    // 2. Cookie Accent Color
    if (cfg.cookieColor) {
      root.style.setProperty('--ca-cookie', cfg.cookieColor);
      root.style.setProperty('--ca-cookie-bg', hexToRgba(cfg.cookieColor, 0.12));
    }

    // 3. Custom Font Family
    if (cfg.fontFamily) {
      const knownGoogleFonts = ['Inter', 'Outfit', 'Poppins', 'Roboto', 'Montserrat', 'Open Sans', 'Lato'];
      const matched = knownGoogleFonts.find(f => cfg.fontFamily.toLowerCase().includes(f.toLowerCase()));
      if (matched && !document.getElementById(`ca-gfont-${matched}`)) {
        const link = document.createElement('link');
        link.id = `ca-gfont-${matched}`;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${matched.replace(/\s+/g, '+')}:wght@400;500;600;700&display=swap`;
        document.head.appendChild(link);
      }
      root.style.setProperty('--ca-font', cfg.fontFamily);
    }

    // 4. Border Radius Presets or Custom CSS Value
    if (cfg.borderRadius) {
      const r = String(cfg.borderRadius).toLowerCase().trim();
      if (r === 'sharp' || r === '0' || r === 'none') {
        root.style.setProperty('--ca-radius-2xl', '4px');
        root.style.setProperty('--ca-radius-xl', '4px');
        root.style.setProperty('--ca-radius-lg', '4px');
        root.style.setProperty('--ca-radius-md', '2px');
        root.style.setProperty('--ca-radius-sm', '2px');
      } else if (r === 'rounded' || r === 'medium') {
        root.style.setProperty('--ca-radius-2xl', '14px');
        root.style.setProperty('--ca-radius-xl', '10px');
        root.style.setProperty('--ca-radius-lg', '8px');
        root.style.setProperty('--ca-radius-md', '6px');
        root.style.setProperty('--ca-radius-sm', '4px');
      } else if (r === 'pill' || r === 'smooth' || r === 'full') {
        root.style.setProperty('--ca-radius-2xl', '28px');
        root.style.setProperty('--ca-radius-xl', '20px');
        root.style.setProperty('--ca-radius-lg', '14px');
        root.style.setProperty('--ca-radius-md', '10px');
        root.style.setProperty('--ca-radius-sm', '6px');
      } else if (r.includes('px') || r.includes('rem')) {
        root.style.setProperty('--ca-radius-2xl', r);
      }
    }
  }
  let consentState = null;

  let a11yState = {
    dyslexicFont: false,
    textSize: 100,
    letterSpacing: false,
    lineHeight: false,
    contrast: 'normal', // 'normal', 'dark', 'invert', 'monochrome', 'saturate'
    highlightLinks: false,
    highlightHeadings: false,
    stopAnimations: false,
    bigCursor: 'none', // 'none', 'white', 'black'
    readingGuide: false,
    readingMask: false,
    speechActive: false
  };

  let activeSpeechUtterance = null;
  let clickToSpeakActive = false;
  let elements = {};

  // =========================================================================
  // GOOGLE CONSENT MODE V2 & AUTO GA4
  // =========================================================================

  function initGoogleConsentMode() {
    if (!config.consentModeV2) return;

    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }

    const saved = getSavedConsent();
    if (!saved) {
      window.gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'functionality_storage': 'granted',
        'personalization_storage': 'denied',
        'security_storage': 'granted',
        'wait_for_update': 500
      });
      window.dataLayer.push({ event: 'ca_consent_default_initialized' });
    } else {
      updateGoogleConsent(saved.categories);
    }
  }

  function updateGoogleConsent(categories) {
    if (!window.gtag) return;

    const consentPayload = {
      'analytics_storage': categories.analytics ? 'granted' : 'denied',
      'ad_storage': categories.advertisement ? 'granted' : 'denied',
      'ad_user_data': categories.advertisement ? 'granted' : 'denied',
      'ad_personalization': categories.advertisement ? 'granted' : 'denied',
      'personalization_storage': categories.functional ? 'granted' : 'denied',
      'functionality_storage': 'granted',
      'security_storage': 'granted'
    };

    window.gtag('consent', 'update', consentPayload);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'cookie_consent_updated',
      consent_categories: categories,
      consent_timestamp: new Date().toISOString()
    });

    if (categories.analytics && config.autoInjectGA && config.gaMeasurementId) {
      injectGoogleAnalyticsScript(config.gaMeasurementId);
    }

    if (categories.analytics && config.gtmId) {
      injectGoogleTagManager(config.gtmId);
    }

    unblockScripts(categories);
  }

  function injectGoogleAnalyticsScript(measurementId) {
    if (window._ca_ga_injected) return;
    window._ca_ga_injected = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.id = 'ca-ga4-script';
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      anonymize_ip: true,
      send_page_view: true
    });

    console.log(`[CookieAccess] Active Google Analytics 4 (${measurementId})`);
  }

  function injectGoogleTagManager(gtmId) {
    if (window._ca_gtm_injected) return;
    window._ca_gtm_injected = true;

    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',gtmId);

    console.log(`[CookieAccess] Active Google Tag Manager (${gtmId})`);
  }

  function unblockScripts(categories) {
    const blockedScripts = document.querySelectorAll('script[type="text/plain"][data-cookie-category]');
    blockedScripts.forEach(oldScript => {
      const cat = oldScript.getAttribute('data-cookie-category');
      if (categories[cat]) {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => {
          if (attr.name !== 'type' && attr.name !== 'data-cookie-category') {
            newScript.setAttribute(attr.name, attr.value);
          }
        });
        newScript.type = 'text/javascript';
        newScript.innerHTML = oldScript.innerHTML;
        oldScript.parentNode.replaceChild(newScript, oldScript);
        console.log(`[CookieAccess] Unblocked script category: ${cat}`);
      }
    });
  }

  // =========================================================================
  // STORAGE & AUDIT LOGS
  // =========================================================================

  function getSavedConsent() {
    try {
      const data = localStorage.getItem(STATE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(categories) {
    const consentRecord = {
      consentId: 'ca_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      categories: {
        necessary: true,
        functional: Boolean(categories.functional),
        analytics: Boolean(categories.analytics),
        advertisement: Boolean(categories.advertisement)
      },
      userAgent: navigator.userAgent
    };

    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(consentRecord));
      appendAuditLog(consentRecord);
    } catch (e) {}

    consentState = consentRecord;
    updateGoogleConsent(consentRecord.categories);

    window.dispatchEvent(new CustomEvent('cookieAccessConsentUpdate', {
      detail: consentRecord
    }));

    return consentRecord;
  }

  function appendAuditLog(record) {
    try {
      let logs = JSON.parse(localStorage.getItem(AUDIT_KEY) || '[]');
      logs.unshift(record);
      if (logs.length > 50) logs = logs.slice(0, 50);
      localStorage.setItem(AUDIT_KEY, JSON.stringify(logs));
    } catch (e) {}
  }

  // =========================================================================
  // DOM CREATION (UNIFIED SPLIT CIRCLE + FLUID CARDS MODAL)
  // =========================================================================

  function getSVG(name) {
    const svgs = {
      cookie: `<svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12c0 5.5 4.5 10 10 10 5.5 0 10-4.5 10-10 0-.5 0-1-.1-1.5-1.5.3-3-.7-3.3-2.2-.2-1.1.4-2.1 1.3-2.7-.8-1.5-2.2-2.6-3.9-2.9-.6-1.5-2.1-2.5-3.8-2.5-.4 0-.8.1-1.2.2C11 2.5 11.5 2 12 2zm-3 7c.8 0 1.5.7 1.5 1.5S9.8 12 9 12s-1.5-.7-1.5-1.5S8.2 9 9 9zm6 4c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5zm-5 3c.8 0 1.5.7 1.5 1.5S10.8 19 10 19s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5z"/></svg>`,
      a11y: `<svg viewBox="0 0 24 24"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/></svg>`,
      close: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
      reset: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,
      diamondLogo: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
      brandLogo: `<svg viewBox="0 0 24 24"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>`,
      arrowRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`
    };
    return svgs[name] || '';
  }

  function injectDOM() {
    // 1. Accessibility Overlays
    if (!document.getElementById('ca-reading-guide-line')) {
      const guideLine = document.createElement('div');
      guideLine.id = 'ca-reading-guide-line';
      document.body.appendChild(guideLine);

      const maskTop = document.createElement('div');
      maskTop.id = 'ca-reading-mask-top';
      document.body.appendChild(maskTop);

      const maskBottom = document.createElement('div');
      maskBottom.id = 'ca-reading-mask-bottom';
      document.body.appendChild(maskBottom);

      window.addEventListener('mousemove', function (e) {
        if (a11yState.readingGuide) {
          guideLine.style.top = (e.clientY - 2) + 'px';
        }
        if (a11yState.readingMask) {
          const slitHeight = 110;
          const topH = Math.max(0, e.clientY - (slitHeight / 2));
          const botY = e.clientY + (slitHeight / 2);
          maskTop.style.top = '0';
          maskTop.style.height = topH + 'px';
          maskBottom.style.top = botY + 'px';
          maskBottom.style.height = (window.innerHeight - botY) + 'px';
        }
      });
    }

    // 2. The Unified Split Circle (Half Cookie / Half Accessibility)
    if (config.position !== 'none' && !document.getElementById('ca-launcher')) {
      const launcher = document.createElement('div');
      launcher.id = 'ca-launcher';
      launcher.className = config.position === 'bottom-left' ? 'ca-pos-bottom-left' : 'ca-pos-bottom-right';

      launcher.innerHTML = `
        <div class="ca-split-circle" id="ca-split-circle" title="Cookie Preferences & Accessibility Assistant">
          <button class="ca-half-btn ca-half-cookie" id="ca-launcher-cookie" data-tooltip="Cookie & Privacy Preferences" aria-label="Privacy & Cookie Preferences">
            ${getSVG('cookie')}
          </button>
          <button class="ca-half-btn ca-half-a11y" id="ca-launcher-a11y" data-tooltip="Accessibility Assistant" aria-label="Accessibility Assistant">
            ${getSVG('a11y')}
          </button>
          <span class="ca-split-badge" id="ca-split-badge" style="display:none;">0</span>
        </div>
      `;
      document.body.appendChild(launcher);
    }

    // 2. Non-Invasive Bottom-Right Banner Card (Screenshot 1 & 3)
    if (config.enableConsentBanner && !document.getElementById('ca-banner-card')) {
      const bannerCard = document.createElement('div');
      bannerCard.id = 'ca-banner-card';
      bannerCard.className = 'ca-banner-card';
      bannerCard.setAttribute('role', 'region');
      bannerCard.setAttribute('aria-label', 'Cookie Consent Banner');

      bannerCard.innerHTML = `
        <div class="ca-banner-text">
          We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic.
        </div>
        <div class="ca-banner-actions">
          <button class="ca-banner-pill-btn ca-btn-accept" id="ca-banner-accept">Accept all</button>
          <button class="ca-banner-pill-btn ca-btn-reject" id="ca-banner-reject">Reject non-essential</button>
          <button class="ca-banner-text-btn" id="ca-banner-preferences">Preferences</button>
          <div class="ca-banner-logo" title="CookieAccess">
            ${getSVG('diamondLogo')}
          </div>
        </div>
      `;

      document.body.appendChild(bannerCard);
    }

    // 3. Customize Cookie Preferences Modal (Screenshot 2)
    if (config.enableConsentBanner && !document.getElementById('ca-modal-dialog')) {
      const modalBackdrop = document.createElement('div');
      modalBackdrop.id = 'ca-modal-dialog';
      modalBackdrop.className = 'ca-modal-backdrop';
      modalBackdrop.setAttribute('role', 'dialog');
      modalBackdrop.setAttribute('aria-modal', 'true');

      modalBackdrop.innerHTML = `
        <div class="ca-dialog-window" id="ca-dialog-window">
          <div class="ca-pref-header">
            <h2 class="ca-pref-title">Customize your cookie preferences</h2>
            <button class="ca-pref-close-btn" id="ca-modal-close-btn" aria-label="Close preferences">
              ${getSVG('close')}
            </button>
          </div>

          <div class="ca-pref-subtitle">
            We respect your right to privacy. You can choose not to allow some types of cookies. Your cookie preferences will apply across our website.
          </div>

          <div class="ca-pref-body">
            <!-- 1. Essential -->
            <div class="ca-pref-row">
              <div class="ca-pref-row-info">
                <div class="ca-pref-row-title">Essential</div>
                <div class="ca-pref-row-desc">
                  These cookies are necessary for the website to function properly and cannot be switched off. They help with things like logging in and setting your privacy preferences.
                </div>
              </div>
              <label class="ca-pill-toggle ca-disabled" title="Strictly Necessary - Always Active">
                <input type="checkbox" id="ca-toggle-necessary" checked disabled>
                <span class="ca-pill-track">
                  <span class="ca-pill-text-on">ON</span>
                  <span class="ca-pill-text-off">OFF</span>
                  <span class="ca-pill-thumb"></span>
                </span>
              </label>
            </div>

            <!-- 2. Analytics -->
            <div class="ca-pref-row">
              <div class="ca-pref-row-info">
                <div class="ca-pref-row-title">Analytics</div>
                <div class="ca-pref-row-desc">
                  These cookies help us improve the site by tracking which pages are most popular and how visitors move around the site.
                </div>
              </div>
              <label class="ca-pill-toggle" title="Toggle Analytics Cookies">
                <input type="checkbox" id="ca-toggle-analytics">
                <span class="ca-pill-track">
                  <span class="ca-pill-text-on">ON</span>
                  <span class="ca-pill-text-off">OFF</span>
                  <span class="ca-pill-thumb"></span>
                </span>
              </label>
            </div>

            <!-- 3. Marketing -->
            <div class="ca-pref-row">
              <div class="ca-pref-row-info">
                <div class="ca-pref-row-title">Marketing</div>
                <div class="ca-pref-row-desc">
                  These cookies are used by us and our advertising partners to show you relevant ads on this site and elsewhere, and to measure how those campaigns perform.
                </div>
              </div>
              <label class="ca-pill-toggle" title="Toggle Marketing Cookies">
                <input type="checkbox" id="ca-toggle-advertisement">
                <span class="ca-pill-track">
                  <span class="ca-pill-text-on">ON</span>
                  <span class="ca-pill-text-off">OFF</span>
                  <span class="ca-pill-thumb"></span>
                </span>
              </label>
            </div>
          </div>

          <div class="ca-pref-footer">
            <div class="ca-pref-footer-btns">
              <button class="ca-banner-pill-btn ca-btn-accept" id="ca-modal-save">Save and close</button>
              <button class="ca-banner-pill-btn ca-btn-reject" id="ca-modal-reject">Reject non-essential</button>
            </div>
            <a href="https://github.com/nx1reps/cookie-access" target="_blank" rel="noopener" class="ca-pref-free-link">
              Get this banner for free
            </a>
          </div>
        </div>
      `;
      document.body.appendChild(modalBackdrop);
    }

    // 4. Accessibility Side Drawer (accessiBe / UserWay / AccessiYes Screenshot 3)
    if (config.enableAccessibility && !document.getElementById('ca-a11y-drawer')) {
      const drawer = document.createElement('div');
      drawer.id = 'ca-a11y-drawer';
      drawer.setAttribute('role', 'region');
      drawer.setAttribute('aria-label', 'Accessibility menu');

      drawer.innerHTML = `
        <div class="ca-a11y-topbar">
          <div class="ca-a11y-topbar-title">
            <span style="font-size:18px;">♿</span>
            <span>Accessibility menu <span style="font-size:11.5px;font-weight:500;opacity:0.85;">(Option+A)</span></span>
          </div>
          <div class="ca-a11y-topbar-actions">
            <button class="ca-a11y-icon-btn" id="ca-a11y-reset-btn" title="Reset all adjustments">${getSVG('reset')}</button>
            <button class="ca-a11y-icon-btn" id="ca-a11y-close-btn" aria-label="Close accessibility panel">${getSVG('close')}</button>
          </div>
        </div>

        <div class="ca-a11y-scrollable">
          <!-- 1. Language Card -->
          <div class="ca-a11y-card-row" id="ca-lang-row">
            <div class="ca-a11y-card-row-left">
              <span class="ca-a11y-badge-icon">EN</span>
              <span>English (English)</span>
            </div>
            ${getSVG('arrowRight')}
          </div>

          <!-- 2. Accessibility Profiles Card -->
          <div class="ca-a11y-card-row ca-subtle-border" id="ca-profiles-trigger">
            <div class="ca-a11y-card-row-left">
              <span class="ca-a11y-badge-icon" style="font-size:13px;">♿</span>
              <span>Accessibility Profiles</span>
            </div>
            ${getSVG('arrowRight')}
          </div>

          <!-- Expandable Profiles Panel -->
          <div class="ca-profile-list" id="ca-profiles-panel" style="display:none;margin-bottom:14px;">
            <div class="ca-profile-row" data-profile="seizure">
              <div class="ca-profile-text">
                <span class="ca-profile-title">🛡️ Seizure Safe Profile</span>
                <span class="ca-profile-desc">Freezes motion & removes flashes</span>
              </div>
              <label class="ca-switch"><input type="checkbox" data-profile-switch="seizure"><span class="ca-slider"></span></label>
            </div>

            <div class="ca-profile-row" data-profile="vision">
              <div class="ca-profile-text">
                <span class="ca-profile-title">👁️ Vision Impaired Profile</span>
                <span class="ca-profile-desc">125% text scale, high contrast, link highlights</span>
              </div>
              <label class="ca-switch"><input type="checkbox" data-profile-switch="vision"><span class="ca-slider"></span></label>
            </div>

            <div class="ca-profile-row" data-profile="adhd">
              <div class="ca-profile-text">
                <span class="ca-profile-title">⚡ ADHD Friendly Profile</span>
                <span class="ca-profile-desc">Reading mask focus slit & stops animations</span>
              </div>
              <label class="ca-switch"><input type="checkbox" data-profile-switch="adhd"><span class="ca-slider"></span></label>
            </div>

            <div class="ca-profile-row" data-profile="dyslexia">
              <div class="ca-profile-text">
                <span class="ca-profile-title">📖 Dyslexia Friendly Profile</span>
                <span class="ca-profile-desc">Lexend font with increased letter spacing</span>
              </div>
              <label class="ca-switch"><input type="checkbox" data-profile-switch="dyslexia"><span class="ca-slider"></span></label>
            </div>

            <div class="ca-profile-row" data-profile="cognitive">
              <div class="ca-profile-text">
                <span class="ca-profile-title">🧠 Cognitive Focus Profile</span>
                <span class="ca-profile-desc">Reading guide line & highlighted headings</span>
              </div>
              <label class="ca-switch"><input type="checkbox" data-profile-switch="cognitive"><span class="ca-slider"></span></label>
            </div>
          </div>

          <!-- Section: Content adjustments -->
          <div class="ca-a11y-section-title">Content adjustments</div>

          <!-- Adjust Font Size & Highlight Title row -->
          <div class="ca-adjuster-card-row">
            <div class="ca-adjust-font-card">
              <div class="ca-card-label">
                <span style="font-size:15px;font-weight:700;letter-spacing:-0.5px;">TT</span>
                <span>Adjust Font Size</span>
              </div>
              <div class="ca-font-stepper">
                <button class="ca-step-btn" id="ca-font-dec" aria-label="Decrease font size">−</button>
                <span class="ca-step-val" id="ca-font-val">100%</span>
                <button class="ca-step-btn" id="ca-font-inc" aria-label="Increase font size">+</button>
              </div>
            </div>

            <div class="ca-tool-square-card" id="ca-tool-highlight-headings" title="Highlight Titles">
              <div style="font-size:15px;border:1.5px solid #64748b;border-radius:4px;padding:0 5px;font-weight:700;color:#334155;line-height:1.2;">T</div>
              <div class="ca-square-tool-title">Highlight Title</div>
            </div>
          </div>

          <!-- 3-Column Square Tools Grid (Screenshot 3) -->
          <div class="ca-square-tools-grid">
            <div class="ca-square-tool-btn" id="ca-tool-highlight-links" title="Highlight Links">
              <div class="ca-square-tool-icon">🔗</div>
              <div class="ca-square-tool-title">Highlight Links</div>
            </div>

            <div class="ca-square-tool-btn" id="ca-tool-dyslexic" title="Dyslexia Font">
              <div class="ca-square-tool-icon" style="font-weight:700;font-size:17px;font-family:sans-serif;">Df</div>
              <div class="ca-square-tool-title">Dyslexia Font</div>
            </div>

            <div class="ca-square-tool-btn" id="ca-tool-spacing" title="Text Spacing">
              <div class="ca-square-tool-icon" style="font-weight:700;font-size:13px;letter-spacing:1px;">A↔V</div>
              <div class="ca-square-tool-title">Text Spacing</div>
            </div>

            <div class="ca-square-tool-btn" id="ca-tool-line-height" title="Line Height">
              <div class="ca-square-tool-icon">↕</div>
              <div class="ca-square-tool-title">Line Height</div>
            </div>

            <div class="ca-square-tool-btn" id="ca-tool-contrast-dark" title="Dark Contrast">
              <div class="ca-square-tool-icon">🌓</div>
              <div class="ca-square-tool-title">Dark Contrast</div>
            </div>

            <div class="ca-square-tool-btn" id="ca-tool-contrast-invert" title="Invert Colors">
              <div class="ca-square-tool-icon">🔄</div>
              <div class="ca-square-tool-title">Invert Colors</div>
            </div>

            <div class="ca-square-tool-btn" id="ca-tool-monochrome" title="Monochrome">
              <div class="ca-square-tool-icon">⚪</div>
              <div class="ca-square-tool-title">Monochrome</div>
            </div>

            <div class="ca-square-tool-btn" id="ca-tool-cursor" title="Big Cursor">
              <div class="ca-square-tool-icon">👆</div>
              <div class="ca-square-tool-title" id="ca-status-cursor">Big Cursor</div>
            </div>

            <div class="ca-square-tool-btn" id="ca-tool-reading-guide" title="Reading Guide">
              <div class="ca-square-tool-icon">📏</div>
              <div class="ca-square-tool-title">Reading Guide</div>
            </div>

            <div class="ca-square-tool-btn" id="ca-tool-reading-mask" title="Reading Mask">
              <div class="ca-square-tool-icon">🕶️</div>
              <div class="ca-square-tool-title">Reading Mask</div>
            </div>

            <div class="ca-square-tool-btn" id="ca-tool-stop-animations" title="Stop Motion">
              <div class="ca-square-tool-icon">⏹️</div>
              <div class="ca-square-tool-title">Stop Motion</div>
            </div>

            <div class="ca-square-tool-btn" id="ca-tool-audio" title="Audio Screen Reader">
              <div class="ca-square-tool-icon">🔊</div>
              <div class="ca-square-tool-title" id="ca-audio-tool-text">Click to Read</div>
            </div>
          </div>
        </div>

        <div class="ca-a11y-footer" style="padding:14px 20px;border-top:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;gap:6px;font-size:12px;color:#64748b;font-weight:600;background:#ffffff;">
          <span style="color:#2563eb;font-size:15px;">♿</span>
          <span><strong style="color:#0f172a;">AccessiYes</strong> by CookieAccess</span>
        </div>
      `;
      document.body.appendChild(drawer);
    }

    cacheDOM();
    bindEvents();
    loadA11yState();
  }

  function cacheDOM() {
    elements = {
      launcherCookie: document.getElementById('ca-launcher-cookie'),
      launcherA11y: document.getElementById('ca-launcher-a11y'),
      splitBadge: document.getElementById('ca-split-badge'),
      bannerBackdrop: document.getElementById('ca-banner-backdrop'),
      bannerCard: document.getElementById('ca-banner-card'),
      bannerAccept: document.getElementById('ca-banner-accept'),
      bannerReject: document.getElementById('ca-banner-reject'),
      bannerPreferences: document.getElementById('ca-banner-preferences'),
      modalDialog: document.getElementById('ca-modal-dialog'),
      modalCloseBtn: document.getElementById('ca-modal-close-btn'),
      modalSave: document.getElementById('ca-modal-save'),
      modalReject: document.getElementById('ca-modal-reject'),
      toggleNecessary: document.getElementById('ca-toggle-necessary'),
      toggleAnalytics: document.getElementById('ca-toggle-analytics'),
      toggleAdvertisement: document.getElementById('ca-toggle-advertisement'),
      a11yDrawer: document.getElementById('ca-a11y-drawer'),
      a11yCloseBtn: document.getElementById('ca-a11y-close-btn'),
      a11yResetBtn: document.getElementById('ca-a11y-reset-btn'),
      profilesTrigger: document.getElementById('ca-profiles-trigger'),
      profilesPanel: document.getElementById('ca-profiles-panel'),
      fontDec: document.getElementById('ca-font-dec'),
      fontInc: document.getElementById('ca-font-inc'),
      fontVal: document.getElementById('ca-font-val'),
      readingGuideLine: document.getElementById('ca-reading-guide-line'),
      readingMaskTop: document.getElementById('ca-reading-mask-top'),
      readingMaskBottom: document.getElementById('ca-reading-mask-bottom')
    };
  }

  function bindEvents() {
    // Split launcher
    if (elements.launcherCookie) {
      elements.launcherCookie.addEventListener('click', () => {
        closeBannerCard();
        openPreferencesModal();
      });
    }
    if (elements.launcherA11y) {
      elements.launcherA11y.addEventListener('click', () => openA11yDrawer());
    }

    // Banner card actions (Screenshot 1 & 3)
    if (elements.bannerAccept) {
      elements.bannerAccept.addEventListener('click', () => {
        const choice = { necessary: true, functional: true, analytics: true, advertisement: true };
        saveConsent(choice);
        syncToggles(choice);
        closeBannerCard();
      });
    }
    if (elements.bannerReject) {
      elements.bannerReject.addEventListener('click', () => {
        const choice = { necessary: true, functional: false, analytics: false, advertisement: false };
        saveConsent(choice);
        syncToggles(choice);
        closeBannerCard();
      });
    }
    if (elements.bannerPreferences) {
      elements.bannerPreferences.addEventListener('click', () => {
        closeBannerCard();
        openPreferencesModal();
      });
    }

    // Preferences modal actions (Screenshot 2)
    if (elements.modalCloseBtn) {
      elements.modalCloseBtn.addEventListener('click', () => closePreferencesModal());
    }
    if (elements.modalDialog) {
      elements.modalDialog.addEventListener('click', (e) => {
        if (e.target === elements.modalDialog) closePreferencesModal();
      });
    }
    if (elements.modalSave) {
      elements.modalSave.addEventListener('click', () => {
        const choice = {
          necessary: true,
          functional: false,
          analytics: elements.toggleAnalytics ? elements.toggleAnalytics.checked : false,
          advertisement: elements.toggleAdvertisement ? elements.toggleAdvertisement.checked : false
        };
        saveConsent(choice);
        closePreferencesModal();
      });
    }
    if (elements.modalReject) {
      elements.modalReject.addEventListener('click', () => {
        const choice = { necessary: true, functional: false, analytics: false, advertisement: false };
        saveConsent(choice);
        syncToggles(choice);
        closePreferencesModal();
      });
    }

    // Accessibility drawer actions (Screenshot 3)
    if (elements.a11yCloseBtn) elements.a11yCloseBtn.addEventListener('click', () => closeA11yDrawer());
    if (elements.a11yResetBtn) elements.a11yResetBtn.addEventListener('click', () => resetA11ySettings());

    // Profiles expandable panel
    if (elements.profilesTrigger && elements.profilesPanel) {
      elements.profilesTrigger.addEventListener('click', () => {
        const isHidden = elements.profilesPanel.style.display === 'none';
        elements.profilesPanel.style.display = isHidden ? 'flex' : 'none';
      });
    }

    // Font size stepper
    const FONT_SIZES = [90, 100, 110, 120, 125, 130, 140];
    if (elements.fontDec) {
      elements.fontDec.addEventListener('click', () => {
        let idx = FONT_SIZES.indexOf(a11yState.textSize);
        if (idx === -1) idx = 1;
        if (idx > 0) {
          a11yState.textSize = FONT_SIZES[idx - 1];
          applyA11yState();
        }
      });
    }
    if (elements.fontInc) {
      elements.fontInc.addEventListener('click', () => {
        let idx = FONT_SIZES.indexOf(a11yState.textSize);
        if (idx === -1) idx = 1;
        if (idx < FONT_SIZES.length - 1) {
          a11yState.textSize = FONT_SIZES[idx + 1];
          applyA11yState();
        }
      });
    }

    // Keyboard shortcuts: Escape closes all, Option+A / Alt+A toggles accessibility
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closePreferencesModal();
        closeA11yDrawer();
        closeBannerCard();
      }
      if (e.altKey && (e.key === 'a' || e.key === 'A' || e.code === 'KeyA')) {
        e.preventDefault();
        if (elements.a11yDrawer && elements.a11yDrawer.classList.contains('ca-open')) {
          closeA11yDrawer();
        } else {
          openA11yDrawer();
        }
      }
    });

    setupA11yTools();
  }

  // =========================================================================
  // 100% WORKING ACCESSIBILITY TOOLS
  // =========================================================================

  function setupA11yTools() {
    // 1. Dyslexia Font (Swaps to Lexend)
    const btnDyslexic = document.getElementById('ca-tool-dyslexic');
    if (btnDyslexic) {
      btnDyslexic.addEventListener('click', () => {
        a11yState.dyslexicFont = !a11yState.dyslexicFont;
        applyA11yState();
      });
    }

    // 2. Bigger Text (Cycle 100% -> 110% -> 125% -> 140% -> 100%)
    const btnSize = document.getElementById('ca-tool-size');
    if (btnSize) {
      btnSize.addEventListener('click', () => {
        if (a11yState.textSize === 100) a11yState.textSize = 110;
        else if (a11yState.textSize === 110) a11yState.textSize = 125;
        else if (a11yState.textSize === 125) a11yState.textSize = 140;
        else a11yState.textSize = 100;
        applyA11yState();
      });
    }

    // 3. Spacing
    const btnSpacing = document.getElementById('ca-tool-spacing');
    if (btnSpacing) {
      btnSpacing.addEventListener('click', () => {
        a11yState.letterSpacing = !a11yState.letterSpacing;
        applyA11yState();
      });
    }

    // 4. Line height
    const btnLineHeight = document.getElementById('ca-tool-line-height');
    if (btnLineHeight) {
      btnLineHeight.addEventListener('click', () => {
        a11yState.lineHeight = !a11yState.lineHeight;
        applyA11yState();
      });
    }

    // 5. Highlight links & headings
    const btnLinks = document.getElementById('ca-tool-highlight-links');
    if (btnLinks) {
      btnLinks.addEventListener('click', () => {
        a11yState.highlightLinks = !a11yState.highlightLinks;
        applyA11yState();
      });
    }

    const btnHeadings = document.getElementById('ca-tool-highlight-headings');
    if (btnHeadings) {
      btnHeadings.addEventListener('click', () => {
        a11yState.highlightHeadings = !a11yState.highlightHeadings;
        applyA11yState();
      });
    }

    // 6. Contrast buttons
    const contrasts = [
      { id: 'ca-tool-contrast-dark', val: 'dark' },
      { id: 'ca-tool-contrast-invert', val: 'invert' },
      { id: 'ca-tool-monochrome', val: 'monochrome' },
      { id: 'ca-tool-saturation', val: 'saturate' }
    ];
    contrasts.forEach(c => {
      const btn = document.getElementById(c.id);
      if (btn) {
        btn.addEventListener('click', () => {
          a11yState.contrast = (a11yState.contrast === c.val) ? 'normal' : c.val;
          applyA11yState();
        });
      }
    });

    // 7. Stop motion
    const btnStopMotion = document.getElementById('ca-tool-stop-animations');
    if (btnStopMotion) {
      btnStopMotion.addEventListener('click', () => {
        a11yState.stopAnimations = !a11yState.stopAnimations;
        applyA11yState();
      });
    }

    // 8. Reading guide
    const btnGuide = document.getElementById('ca-tool-reading-guide');
    if (btnGuide) {
      btnGuide.addEventListener('click', () => {
        a11yState.readingGuide = !a11yState.readingGuide;
        applyA11yState();
      });
    }

    // 9. Reading mask
    const btnMask = document.getElementById('ca-tool-reading-mask');
    if (btnMask) {
      btnMask.addEventListener('click', () => {
        a11yState.readingMask = !a11yState.readingMask;
        applyA11yState();
      });
    }

    // 10. Big Cursor (none -> white -> black -> none)
    const btnCursor = document.getElementById('ca-tool-cursor');
    if (btnCursor) {
      btnCursor.addEventListener('click', () => {
        if (a11yState.bigCursor === 'none') a11yState.bigCursor = 'white';
        else if (a11yState.bigCursor === 'white') a11yState.bigCursor = 'black';
        else a11yState.bigCursor = 'none';
        applyA11yState();
      });
    }

    // 11. Profile switches
    document.querySelectorAll('[data-profile-switch]').forEach(sw => {
      sw.addEventListener('change', () => {
        const prof = sw.getAttribute('data-profile-switch');
        if (sw.checked) {
          applyProfile(prof);
        } else {
          resetA11ySettings();
        }
      });
    });

    // 12. Audio Reader / Click-to-Speak tool
    const btnAudio = document.getElementById('ca-tool-audio');
    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        clickToSpeakActive = !clickToSpeakActive;
        btnAudio.classList.toggle('ca-active', clickToSpeakActive);
        const audioText = document.getElementById('ca-audio-tool-text');
        if (clickToSpeakActive) {
          if (audioText) audioText.textContent = 'Speaking: On';
          document.body.style.cursor = 'help';
        } else {
          if (audioText) audioText.textContent = 'Click to Read';
          document.body.style.cursor = '';
          stopSpeech();
        }
      });
    }

    setupAudioTTS();
  }

  function applyProfile(profile) {
    resetA11ySettings(false);

    switch (profile) {
      case 'seizure':
        a11yState.stopAnimations = true;
        a11yState.contrast = 'monochrome';
        break;
      case 'vision':
        a11yState.textSize = 125;
        a11yState.contrast = 'dark';
        a11yState.highlightLinks = true;
        a11yState.bigCursor = 'white';
        break;
      case 'adhd':
        a11yState.readingMask = true;
        a11yState.stopAnimations = true;
        break;
      case 'dyslexia':
        a11yState.dyslexicFont = true;
        a11yState.letterSpacing = true;
        a11yState.lineHeight = true;
        break;
      case 'cognitive':
        a11yState.readingGuide = true;
        a11yState.highlightHeadings = true;
        break;
    }

    applyA11yState();
  }

  function applyA11yState() {
    const docEl = document.documentElement;

    // 1. Dyslexia Font
    docEl.classList.toggle('ca-dyslexic-font', a11yState.dyslexicFont);
    toggleCardActive('ca-tool-dyslexic', a11yState.dyslexicFont);

    // 2. Text Sizing (stepper)
    docEl.classList.remove('ca-text-90', 'ca-text-110', 'ca-text-120', 'ca-text-125', 'ca-text-130', 'ca-text-140');
    if (a11yState.textSize !== 100) docEl.classList.add(`ca-text-${a11yState.textSize}`);
    const fontValEl = document.getElementById('ca-font-val');
    if (fontValEl) fontValEl.textContent = `${a11yState.textSize}%`;

    // 3. Spacing & Line Height
    docEl.classList.toggle('ca-letter-spacing', a11yState.letterSpacing);
    toggleCardActive('ca-tool-spacing', a11yState.letterSpacing);

    docEl.classList.toggle('ca-line-height', a11yState.lineHeight);
    toggleCardActive('ca-tool-line-height', a11yState.lineHeight);

    // 4. Links & Headings
    docEl.classList.toggle('ca-highlight-links', a11yState.highlightLinks);
    toggleCardActive('ca-tool-highlight-links', a11yState.highlightLinks);

    docEl.classList.toggle('ca-highlight-headings', a11yState.highlightHeadings);
    toggleCardActive('ca-tool-highlight-headings', a11yState.highlightHeadings);

    // 5. Contrasts
    docEl.classList.remove('ca-contrast-dark', 'ca-contrast-invert', 'ca-contrast-monochrome', 'ca-high-saturation');
    toggleCardActive('ca-tool-contrast-dark', a11yState.contrast === 'dark');
    toggleCardActive('ca-tool-contrast-invert', a11yState.contrast === 'invert');
    toggleCardActive('ca-tool-monochrome', a11yState.contrast === 'monochrome');
    toggleCardActive('ca-tool-saturation', a11yState.contrast === 'saturate');

    if (a11yState.contrast === 'dark') docEl.classList.add('ca-contrast-dark');
    else if (a11yState.contrast === 'invert') docEl.classList.add('ca-contrast-invert');
    else if (a11yState.contrast === 'monochrome') docEl.classList.add('ca-contrast-monochrome');
    else if (a11yState.contrast === 'saturate') docEl.classList.add('ca-high-saturation');

    // 6. Stop Motion
    docEl.classList.toggle('ca-stop-animations', a11yState.stopAnimations);
    toggleCardActive('ca-tool-stop-animations', a11yState.stopAnimations);

    // 7. Big Cursor
    docEl.classList.remove('ca-big-cursor', 'ca-big-cursor-black');
    const cursorStatus = document.getElementById('ca-status-cursor');
    if (a11yState.bigCursor === 'white') {
      docEl.classList.add('ca-big-cursor');
      if (cursorStatus) cursorStatus.textContent = 'Big White';
      toggleCardActive('ca-tool-cursor', true);
    } else if (a11yState.bigCursor === 'black') {
      docEl.classList.add('ca-big-cursor-black');
      if (cursorStatus) cursorStatus.textContent = 'Big Black';
      toggleCardActive('ca-tool-cursor', true);
    } else {
      if (cursorStatus) cursorStatus.textContent = 'Default';
      toggleCardActive('ca-tool-cursor', false);
    }

    // 8. Reading Guide
    if (elements.readingGuideLine) {
      elements.readingGuideLine.style.display = a11yState.readingGuide ? 'block' : 'none';
      toggleCardActive('ca-tool-reading-guide', a11yState.readingGuide);
    }

    // 9. Reading Mask
    if (elements.readingMaskTop && elements.readingMaskBottom) {
      const showMask = a11yState.readingMask;
      elements.readingMaskTop.style.display = showMask ? 'block' : 'none';
      elements.readingMaskBottom.style.display = showMask ? 'block' : 'none';
      toggleCardActive('ca-tool-reading-mask', showMask);
    }

    // Count Active
    let count = 0;
    if (a11yState.dyslexicFont) count++;
    if (a11yState.textSize > 100) count++;
    if (a11yState.letterSpacing) count++;
    if (a11yState.lineHeight) count++;
    if (a11yState.contrast !== 'normal') count++;
    if (a11yState.highlightLinks) count++;
    if (a11yState.highlightHeadings) count++;
    if (a11yState.stopAnimations) count++;
    if (a11yState.readingGuide) count++;
    if (a11yState.readingMask) count++;
    if (a11yState.bigCursor !== 'none') count++;

    if (elements.splitBadge) {
      elements.splitBadge.style.display = count > 0 ? 'flex' : 'none';
      elements.splitBadge.textContent = count;
    }

    try {
      localStorage.setItem(A11Y_KEY, JSON.stringify(a11yState));
    } catch (e) {}
  }

  function toggleCardActive(cardId, isActive) {
    const card = document.getElementById(cardId);
    if (card) card.classList.toggle('ca-active', Boolean(isActive));
  }

  function resetA11ySettings(applyImmediately = true) {
    a11yState = {
      dyslexicFont: false,
      textSize: 100,
      letterSpacing: false,
      lineHeight: false,
      contrast: 'normal',
      highlightLinks: false,
      highlightHeadings: false,
      stopAnimations: false,
      bigCursor: 'none',
      readingGuide: false,
      readingMask: false,
      speechActive: false
    };

    stopSpeech();
    clickToSpeakActive = false;
    document.body.style.cursor = '';
    document.querySelectorAll('[data-profile-switch]').forEach(sw => sw.checked = false);

    if (applyImmediately) applyA11yState();
  }

  function loadA11yState() {
    try {
      const saved = localStorage.getItem(A11Y_KEY);
      if (saved) {
        a11yState = { ...a11yState, ...JSON.parse(saved) };
        applyA11yState();
      }
    } catch (e) {}
  }

  // =========================================================================
  // AUDIO SCREEN READER
  // =========================================================================

  function setupAudioTTS() {
    if (!('speechSynthesis' in window)) {
      if (elements.audioText) elements.audioText.textContent = 'Audio not supported in browser';
      return;
    }

    if (elements.audioReadBtn) {
      elements.audioReadBtn.addEventListener('click', () => {
        if (window.speechSynthesis.speaking) {
          stopSpeech();
        } else {
          readPage();
        }
      });
    }

    if (elements.audioClickBtn) {
      elements.audioClickBtn.addEventListener('click', () => {
        clickToSpeakActive = !clickToSpeakActive;
        elements.audioClickBtn.classList.toggle('ca-btn-primary', clickToSpeakActive);
        if (clickToSpeakActive) {
          elements.audioText.textContent = 'Click any paragraph to hear it read';
          document.body.style.cursor = 'help';
        } else {
          elements.audioText.textContent = 'Audio Reader: Ready';
          document.body.style.cursor = '';
        }
      });
    }

    document.addEventListener('click', (e) => {
      if (!clickToSpeakActive) return;
      if (e.target.closest('#ca-a11y-drawer') || e.target.closest('#ca-launcher') || e.target.closest('#ca-modal-dialog')) return;

      e.preventDefault();
      e.stopPropagation();

      const text = e.target.innerText ? e.target.innerText.trim() : '';
      if (text) {
        speakText(text, e.target);
      }
    });
  }

  function readPage() {
    const mainEl = document.querySelector('main') || document.querySelector('article') || document.body;
    const elementsToRead = mainEl.querySelectorAll('h1, h2, h3, h4, p, li');
    let texts = [];
    elementsToRead.forEach(el => {
      if (el.closest('#ca-launcher') || el.closest('#ca-modal-dialog') || el.closest('#ca-a11y-drawer')) return;
      const t = el.innerText.trim();
      if (t.length > 2) texts.push({ el, text: t });
    });

    if (texts.length === 0) return;

    let index = 0;
    function speakNext() {
      if (index >= texts.length) {
        stopSpeech();
        return;
      }
      const item = texts[index];
      item.el.classList.add('ca-speaking-highlight');
      item.el.scrollIntoView({ behavior: 'smooth', block: 'center' });

      activeSpeechUtterance = new SpeechSynthesisUtterance(item.text);
      activeSpeechUtterance.rate = 1.0;

      activeSpeechUtterance.onend = () => {
        item.el.classList.remove('ca-speaking-highlight');
        index++;
        speakNext();
      };

      activeSpeechUtterance.onerror = () => {
        item.el.classList.remove('ca-speaking-highlight');
        stopSpeech();
      };

      window.speechSynthesis.speak(activeSpeechUtterance);
    }

    if (elements.audioReadBtn) elements.audioReadBtn.textContent = 'Stop';
    if (elements.audioText) elements.audioText.textContent = 'Reading page aloud...';
    speakNext();
  }

  function speakText(text, targetEl) {
    stopSpeech();
    if (targetEl) targetEl.classList.add('ca-speaking-highlight');
    activeSpeechUtterance = new SpeechSynthesisUtterance(text);

    activeSpeechUtterance.onend = () => {
      if (targetEl) targetEl.classList.remove('ca-speaking-highlight');
    };
    activeSpeechUtterance.onerror = () => {
      if (targetEl) targetEl.classList.remove('ca-speaking-highlight');
    };

    if (elements.audioText) elements.audioText.textContent = `Speaking: "${text.substring(0, 25)}..."`;
    window.speechSynthesis.speak(activeSpeechUtterance);
  }

  function stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    document.querySelectorAll('.ca-speaking-highlight').forEach(el => el.classList.remove('ca-speaking-highlight'));
    if (elements.audioReadBtn) elements.audioReadBtn.textContent = 'Read Page';
    if (elements.audioText) elements.audioText.textContent = 'Audio Reader: Ready';
  }

  // =========================================================================
  // MODAL / BANNER / DRAWER CONTROLS
  // =========================================================================

  function openBannerCard() {
    if (elements.bannerCard) elements.bannerCard.classList.add('ca-active');
  }

  function closeBannerCard() {
    if (elements.bannerCard) elements.bannerCard.classList.remove('ca-active');
  }

  function openPreferencesModal() {
    if (elements.modalDialog) {
      const saved = getSavedConsent();
      if (saved) syncToggles(saved.categories);
      elements.modalDialog.classList.add('ca-active');
    }
  }

  function closePreferencesModal() {
    if (elements.modalDialog) elements.modalDialog.classList.remove('ca-active');
  }

  function openA11yDrawer() {
    if (elements.a11yDrawer) elements.a11yDrawer.classList.add('ca-open');
  }

  function closeA11yDrawer() {
    if (elements.a11yDrawer) elements.a11yDrawer.classList.remove('ca-open');
  }

  function syncToggles(categories) {
    if (elements.toggleAnalytics) elements.toggleAnalytics.checked = Boolean(categories.analytics);
    if (elements.toggleAdvertisement) elements.toggleAdvertisement.checked = Boolean(categories.advertisement);
  }

  // =========================================================================
  // INITIALIZATION API
  // =========================================================================

  function configure(options = {}) {
    config = { ...config, ...options };
    applyCustomStyles(config);

    if (config.theme === 'dark' || (config.theme === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('ca-theme-dark');
    } else if (config.theme === 'light') {
      document.documentElement.classList.remove('ca-theme-dark');
    }

    const launcher = document.getElementById('ca-launcher');
    if (launcher) {
      if (config.position === 'none') {
        launcher.style.display = 'none';
      } else {
        launcher.style.display = '';
        launcher.className = config.position === 'bottom-left' ? 'ca-pos-bottom-left' : 'ca-pos-bottom-right';
      }
    }
  }

  function init(options = {}) {
    config = { ...defaults, ...options };

    applyCustomStyles(config);

    if (config.theme === 'dark' || (config.theme === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('ca-theme-dark');
    } else if (config.theme === 'light') {
      document.documentElement.classList.remove('ca-theme-dark');
    }

    initGoogleConsentMode();

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        injectDOM();
        checkInitialState();
      });
    } else {
      injectDOM();
      checkInitialState();
    }
  }

  function checkInitialState() {
    const saved = getSavedConsent();
    if (!saved && config.enableConsentBanner) {
      setTimeout(() => {
        openBannerCard();
      }, 350);
    } else if (saved) {
      consentState = saved;
      syncToggles(saved.categories);
    }
  }

  function autoInitFromScriptTag() {
    const globalConfig = (typeof window !== 'undefined' && window.CookieAccessConfig) || {};
    const script = (typeof document !== 'undefined') && (document.currentScript || document.querySelector('script[src*="cookie-access"]'));
    const opts = { ...globalConfig };

    if (script) {
      const ga = script.getAttribute('data-ga') || script.getAttribute('data-ga-id');
      const gtm = script.getAttribute('data-gtm');
      const pos = script.getAttribute('data-position');
      const theme = script.getAttribute('data-theme');
      const a11y = script.getAttribute('data-a11y');
      const company = script.getAttribute('data-company') || script.getAttribute('data-company-name');
      const privacy = script.getAttribute('data-privacy-url') || script.getAttribute('data-privacy');
      const primary = script.getAttribute('data-primary-color') || script.getAttribute('data-color');
      const cookieCol = script.getAttribute('data-cookie-color');
      const font = script.getAttribute('data-font') || script.getAttribute('data-font-family');
      const radius = script.getAttribute('data-radius') || script.getAttribute('data-border-radius');

      if (ga) opts.gaMeasurementId = ga;
      if (gtm) opts.gtmId = gtm;
      if (pos) opts.position = pos;
      if (theme) opts.theme = theme;
      if (a11y === 'false') opts.enableAccessibility = false;
      if (company) opts.companyName = company;
      if (privacy) opts.privacyPolicyUrl = privacy;
      if (primary) opts.primaryColor = primary;
      if (cookieCol) opts.cookieColor = cookieCol;
      if (font) opts.fontFamily = font;
      if (radius) opts.borderRadius = radius;
    }

    init(opts);
  }

  autoInitFromScriptTag();

  return {
    init,
    configure,
    openBannerCard,
    closeBannerCard,
    openPreferencesModal,
    closePreferencesModal,
    openA11yDrawer,
    closeA11yDrawer,
    getConsent: () => getSavedConsent(),
    getConsentLog: () => JSON.parse(localStorage.getItem(AUDIT_KEY) || '[]'),
    getA11ySettings: () => ({ ...a11yState }),
    resetA11y: resetA11ySettings,
    applyProfile,
    exportConsentLog: () => {
      const logs = JSON.parse(localStorage.getItem(AUDIT_KEY) || '[]');
      const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cookie-access-audit-${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };
}));

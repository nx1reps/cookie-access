/**
 * CookieAccess v1.0.0
 * The Best Free & Open-Source Cookie Consent (with Auto GA4 & Consent Mode v2)
 * and Complete Accessibility Toolbar Suite (accessiBe / UserWay alternative).
 * 
 * MIT License - 100% Free & Open Source
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

  // Default Configuration
  const defaults = {
    // Analytics & Consent Mode
    gaMeasurementId: '', // e.g. 'G-XXXXXXXXXX'
    gtmId: '',           // e.g. 'GTM-XXXXXX'
    autoInjectGA: true,
    consentModeV2: true,

    // UI Options
    companyName: 'Our Website',
    privacyPolicyUrl: '#privacy',
    cookiePolicyUrl: '#cookies',
    theme: 'auto', // 'dark', 'light', 'auto'
    position: 'bottom-right', // 'bottom-left', 'bottom-right', 'none'
    bannerLayout: 'modal', // 'modal', 'bar'

    // Modules
    enableConsentBanner: true,
    enableAccessibility: true,

    // Default categories state (for unprompted state)
    categories: {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    }
  };

  // State Management
  const STATE_KEY = 'ca_consent_preferences';
  const AUDIT_KEY = 'ca_consent_audit_log';
  const A11Y_KEY = 'ca_a11y_preferences';

  let config = { ...defaults };
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

  // Speech Synthesis handles
  let activeSpeechUtterance = null;
  let clickToSpeakActive = false;

  // DOM Elements cache
  let elements = {};

  // Cookie Inventory for transparency details
  const cookieInventory = {
    necessary: [
      { name: 'ca_consent_preferences', provider: 'CookieAccess', purpose: 'Remembers user cookie consent choices', expiry: '1 year' },
      { name: 'ca_a11y_preferences', provider: 'CookieAccess', purpose: 'Preserves user accessibility settings across pages', expiry: '1 year' },
      { name: 'PHPSESSID / JSESSIONID', provider: 'First-party', purpose: 'Maintains user session security and authentication', expiry: 'Session' }
    ],
    analytics: [
      { name: '_ga', provider: 'Google Analytics', purpose: 'Distinguishes unique users and calculates visitor metrics', expiry: '2 years' },
      { name: '_ga_*', provider: 'Google Analytics', purpose: 'Maintains session state and telemetry', expiry: '2 years' },
      { name: '_gid', provider: 'Google Analytics', purpose: 'Counts and tracks pageviews anonymously', expiry: '24 hours' }
    ],
    marketing: [
      { name: '_fbp', provider: 'Meta Pixel', purpose: 'Used by Facebook to deliver behavioral advertising', expiry: '3 months' },
      { name: '_gcl_au', provider: 'Google Ads', purpose: 'Conversion tracking and ad efficiency attribution', expiry: '3 months' }
    ],
    preferences: [
      { name: 'user_lang', provider: 'First-party', purpose: 'Remembers selected language preference', expiry: '1 year' },
      { name: 'user_theme', provider: 'First-party', purpose: 'Preserves dark/light appearance setting', expiry: '1 year' }
    ]
  };

  // =========================================================================
  // GOOGLE CONSENT MODE V2 & AUTO GA4 ENGINE
  // =========================================================================

  function initGoogleConsentMode() {
    if (!config.consentModeV2) return;

    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }

    // Check if we have prior saved consent
    const saved = getSavedConsent();

    if (!saved) {
      // Default: All non-essential DENIED before choice (GDPR strict compliant)
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
      window.dataLayer.push({ event: 'ca_consent_default_set' });
    } else {
      updateGoogleConsent(saved.categories);
    }
  }

  function updateGoogleConsent(categories) {
    if (!window.gtag) return;

    const consentPayload = {
      'analytics_storage': categories.analytics ? 'granted' : 'denied',
      'ad_storage': categories.marketing ? 'granted' : 'denied',
      'ad_user_data': categories.marketing ? 'granted' : 'denied',
      'ad_personalization': categories.marketing ? 'granted' : 'denied',
      'personalization_storage': categories.preferences ? 'granted' : 'denied',
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

    // Auto-inject GA4 script if analytics accepted
    if (categories.analytics && config.autoInjectGA && config.gaMeasurementId) {
      injectGoogleAnalyticsScript(config.gaMeasurementId);
    }

    // Auto-inject GTM if configured
    if (categories.analytics && config.gtmId) {
      injectGoogleTagManager(config.gtmId);
    }

    // Unblock any blocked inline or external scripts
    unblockScripts(categories);
  }

  function injectGoogleAnalyticsScript(measurementId) {
    if (window._ca_ga_injected) return;
    window._ca_ga_injected = true;

    // Inject gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.id = 'ca-ga-script';
    document.head.appendChild(script);

    // Config GA4
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      anonymize_ip: true,
      send_page_view: true
    });

    console.log(`[CookieAccess] Successfully auto-injected Google Analytics 4 (${measurementId})`);
  }

  function injectGoogleTagManager(gtmId) {
    if (window._ca_gtm_injected) return;
    window._ca_gtm_injected = true;

    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',gtmId);

    console.log(`[CookieAccess] Successfully injected Google Tag Manager (${gtmId})`);
  }

  function unblockScripts(categories) {
    // Find all <script type="text/plain" data-cookie-category="...">
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
  // CONSENT STATE & AUDIT LOGGING
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
      consentId: 'ca_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36),
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      categories: {
        necessary: true,
        analytics: Boolean(categories.analytics),
        marketing: Boolean(categories.marketing),
        preferences: Boolean(categories.preferences)
      },
      userAgent: navigator.userAgent
    };

    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(consentRecord));
      appendAuditLog(consentRecord);
    } catch (e) {
      console.warn('[CookieAccess] localStorage unavailable');
    }

    consentState = consentRecord;
    updateGoogleConsent(consentRecord.categories);

    // Fire window event for developer integrations
    window.dispatchEvent(new CustomEvent('cookieAccessConsentUpdate', {
      detail: consentRecord
    }));

    return consentRecord;
  }

  function appendAuditLog(record) {
    try {
      let logs = JSON.parse(localStorage.getItem(AUDIT_KEY) || '[]');
      logs.unshift(record);
      if (logs.length > 50) logs = logs.slice(0, 50); // keep recent 50
      localStorage.setItem(AUDIT_KEY, JSON.stringify(logs));
    } catch (e) {}
  }

  // =========================================================================
  // UI CREATION & INJECTION
  // =========================================================================

  function createIcons() {
    return {
      cookie: `<svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12c0 5.5 4.5 10 10 10 5.5 0 10-4.5 10-10 0-.5 0-1-.1-1.5-1.5.3-3-.7-3.3-2.2-.2-1.1.4-2.1 1.3-2.7-.8-1.5-2.2-2.6-3.9-2.9-.6-1.5-2.1-2.5-3.8-2.5-.4 0-.8.1-1.2.2C11 2.5 11.5 2 12 2zm-3 7c.8 0 1.5.7 1.5 1.5S9.8 12 9 12s-1.5-.7-1.5-1.5S8.2 9 9 9zm6 4c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5zm-5 3c.8 0 1.5.7 1.5 1.5S10.8 19 10 19s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5z"/></svg>`,
      a11y: `<svg viewBox="0 0 24 24"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/></svg>`,
      close: `<svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
      check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
      font: `<svg viewBox="0 0 24 24"><path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"/></svg>`,
      contrast: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18V4c4.41 0 8 3.59 8 8s-3.59 8-8 8z"/></svg>`,
      speaker: `<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`,
      cursor: `<svg viewBox="0 0 24 24"><path d="M13.64 21.97l-3.32-6.57-4.14 4.14V2.73l14.28 14.28h-5.69l3.32 6.57-4.45 1.39z"/></svg>`,
      mask: `<svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`,
      guide: `<svg viewBox="0 0 24 24"><path d="M3 17h18v2H3zm0-7h18v4H3zm0-5h18v2H3z"/></svg>`,
      stop: `<svg viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>`,
      reset: `<svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>`
    };
  }

  function injectDOM() {
    const icons = createIcons();

    // 1. Reading Guide & Mask overlays
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

      // Track mouse position for guide and mask
      window.addEventListener('mousemove', function (e) {
        if (a11yState.readingGuide) {
          guideLine.style.top = (e.clientY - 3) + 'px';
        }
        if (a11yState.readingMask) {
          const slitHeight = 90;
          const topH = Math.max(0, e.clientY - (slitHeight / 2));
          const botY = e.clientY + (slitHeight / 2);
          maskTop.style.top = '0';
          maskTop.style.height = topH + 'px';
          maskBottom.style.top = botY + 'px';
          maskBottom.style.height = (window.innerHeight - botY) + 'px';
        }
      });
    }

    // 2. Floating Launcher Badge (if not position 'none')
    if (config.position !== 'none' && !document.getElementById('ca-launcher')) {
      const launcher = document.createElement('div');
      launcher.id = 'ca-launcher';
      launcher.className = config.position === 'bottom-left' ? 'ca-pos-bottom-left' : 'ca-pos-bottom-right';

      let launcherHTML = '';
      if (config.enableConsentBanner) {
        launcherHTML += `
          <button class="ca-launcher-btn" id="ca-open-consent-btn" aria-label="Open Cookie Privacy Preferences" title="Cookie & Privacy Settings">
            ${icons.cookie}
            <span>Cookies</span>
          </button>
        `;
      }
      if (config.enableConsentBanner && config.enableAccessibility) {
        launcherHTML += `<div class="ca-launcher-divider"></div>`;
      }
      if (config.enableAccessibility) {
        launcherHTML += `
          <button class="ca-launcher-btn" id="ca-open-a11y-btn" aria-label="Open Accessibility Options" title="Accessibility Assistant">
            ${icons.a11y}
            <span>Accessibility</span>
          </button>
        `;
      }
      launcher.innerHTML = launcherHTML;
      document.body.appendChild(launcher);
    }

    // 3. Cookie Consent Modal
    if (config.enableConsentBanner && !document.getElementById('ca-modal-consent')) {
      const consentWrapper = document.createElement('div');
      consentWrapper.id = 'ca-modal-consent';
      consentWrapper.className = 'ca-modal-overlay';
      consentWrapper.setAttribute('role', 'dialog');
      consentWrapper.setAttribute('aria-modal', 'true');
      consentWrapper.setAttribute('aria-labelledby', 'ca-consent-title');

      consentWrapper.innerHTML = `
        <div class="ca-modal-card">
          <div class="ca-card-header">
            <h2 class="ca-header-title" id="ca-consent-title">
              ${icons.cookie}
              <span>Privacy & Cookie Preferences</span>
            </h2>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="ca-header-badge"><span class="ca-badge-dot"></span> GDPR / CCPA</span>
              <button class="ca-close-btn" id="ca-close-consent-btn" aria-label="Close dialog">${icons.close}</button>
            </div>
          </div>
          
          <div class="ca-card-body">
            <p class="ca-lead-text">
              We respect your right to privacy. We use cookies and automated Google Analytics to enhance page performance, analyze anonymous traffic patterns, and provide personalized features.
            </p>
            <div class="ca-privacy-links">
              Learn more in our <a href="${config.cookiePolicyUrl}" target="_blank" rel="noopener">Cookie Policy</a> and <a href="${config.privacyPolicyUrl}" target="_blank" rel="noopener">Privacy Notice</a>.
            </div>

            <!-- Categories -->
            <div class="ca-category-list">
              <!-- Necessary -->
              <div class="ca-category-item">
                <div class="ca-category-head">
                  <div class="ca-category-info">
                    <div class="ca-category-title-row">
                      <span class="ca-category-name">Strictly Necessary Cookies</span>
                      <span class="ca-category-status ca-always-on">Always Active</span>
                    </div>
                    <p class="ca-category-desc">Essential for basic website navigation, secure authentication, and storing your consent preferences.</p>
                    <span class="ca-category-cookies-tag">${cookieInventory.necessary.length} cookies declared</span>
                  </div>
                  <label class="ca-switch" title="Strictly Necessary cookies are required">
                    <input type="checkbox" id="ca-cat-necessary" checked disabled>
                    <span class="ca-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Analytics (GA4) -->
              <div class="ca-category-item">
                <div class="ca-category-head">
                  <div class="ca-category-info">
                    <div class="ca-category-title-row">
                      <span class="ca-category-name">Analytics & Performance (GA4)</span>
                      <span class="ca-category-status" id="ca-status-analytics">Consent Required</span>
                    </div>
                    <p class="ca-category-desc">Enables Google Analytics 4 telemetry with Google Consent Mode v2 to count visits and traffic sources anonymously.</p>
                    <span class="ca-category-cookies-tag">${cookieInventory.analytics.length} cookies declared (Google Tag Manager / GA4)</span>
                  </div>
                  <label class="ca-switch">
                    <input type="checkbox" id="ca-cat-analytics">
                    <span class="ca-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Marketing -->
              <div class="ca-category-item">
                <div class="ca-category-head">
                  <div class="ca-category-info">
                    <div class="ca-category-title-row">
                      <span class="ca-category-name">Marketing & Targeting</span>
                      <span class="ca-category-status" id="ca-status-marketing">Consent Required</span>
                    </div>
                    <p class="ca-category-desc">Used to build a profile of your interests and show you relevant advertising across external services.</p>
                    <span class="ca-category-cookies-tag">${cookieInventory.marketing.length} cookies declared (Meta, Google Ads)</span>
                  </div>
                  <label class="ca-switch">
                    <input type="checkbox" id="ca-cat-marketing">
                    <span class="ca-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Preferences -->
              <div class="ca-category-item">
                <div class="ca-category-head">
                  <div class="ca-category-info">
                    <div class="ca-category-title-row">
                      <span class="ca-category-name">Personalization & Preferences</span>
                      <span class="ca-category-status" id="ca-status-preferences">Consent Required</span>
                    </div>
                    <p class="ca-category-desc">Allows the website to remember choices you make such as your preferred language, region, or accessibility settings.</p>
                    <span class="ca-category-cookies-tag">${cookieInventory.preferences.length} cookies declared</span>
                  </div>
                  <label class="ca-switch">
                    <input type="checkbox" id="ca-cat-preferences">
                    <span class="ca-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="ca-card-footer">
            <button class="ca-btn ca-btn-link" id="ca-btn-reject">Decline Non-Essential</button>
            <button class="ca-btn ca-btn-secondary" id="ca-btn-save">Save Selected</button>
            <button class="ca-btn ca-btn-primary" id="ca-btn-accept-all">Accept All Cookies</button>
          </div>
        </div>
      `;
      document.body.appendChild(consentWrapper);
    }

    // 4. Accessibility Toolbar Modal
    if (config.enableAccessibility && !document.getElementById('ca-a11y-modal')) {
      const a11yWrapper = document.createElement('div');
      a11yWrapper.id = 'ca-a11y-modal';
      a11yWrapper.className = 'ca-modal-overlay';
      a11yWrapper.setAttribute('role', 'dialog');
      a11yWrapper.setAttribute('aria-modal', 'true');
      a11yWrapper.setAttribute('aria-labelledby', 'ca-a11y-title');

      a11yWrapper.innerHTML = `
        <div class="ca-modal-card">
          <div class="ca-card-header">
            <h2 class="ca-header-title" id="ca-a11y-title">
              ${icons.a11y}
              <span>Accessibility Assistance Suite</span>
            </h2>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="ca-header-badge"><span class="ca-badge-dot" style="background:#10b981;box-shadow:0 0 8px #10b981"></span> WCAG 2.2 AA</span>
              <button class="ca-close-btn" id="ca-close-a11y-btn" aria-label="Close accessibility modal">${icons.close}</button>
            </div>
          </div>

          <div class="ca-card-body">
            <!-- Text to Speech Audio Player -->
            <div class="ca-tts-bar">
              <span style="font-size:20px;">🔊</span>
              <div class="ca-tts-status" id="ca-tts-status-text">Screen Reader / Audio Assistant: Ready</div>
              <button class="ca-btn ca-btn-secondary" style="padding:6px 12px;font-size:12px;" id="ca-btn-tts-toggle">
                ${icons.speaker} <span id="ca-tts-btn-label">Read Page</span>
              </button>
              <button class="ca-btn ca-btn-link" style="padding:6px 10px;font-size:12px;" id="ca-btn-tts-clickmode" title="Click any paragraph or title to read it aloud">
                Click-to-Speak
              </button>
            </div>

            <!-- Accessibility Profiles -->
            <div class="ca-a11y-section-title">Quick Accessibility Profiles</div>
            <div class="ca-a11y-profiles-grid">
              <div class="ca-profile-card" data-profile="vision">
                <div class="ca-profile-info">
                  <span class="ca-profile-icon">👁️</span>
                  <div>
                    <div class="ca-profile-name">Vision Impaired</div>
                    <div class="ca-profile-desc">Large text, high contrast & links</div>
                  </div>
                </div>
              </div>
              <div class="ca-profile-card" data-profile="adhd">
                <div class="ca-profile-info">
                  <span class="ca-profile-icon">⚡</span>
                  <div>
                    <div class="ca-profile-name">ADHD Friendly</div>
                    <div class="ca-profile-desc">Reading mask & stop animations</div>
                  </div>
                </div>
              </div>
              <div class="ca-profile-card" data-profile="dyslexia">
                <div class="ca-profile-info">
                  <span class="ca-profile-icon">📖</span>
                  <div>
                    <div class="ca-profile-name">Dyslexia Friendly</div>
                    <div class="ca-profile-desc">Enhanced typography & spacing</div>
                  </div>
                </div>
              </div>
              <div class="ca-profile-card" data-profile="cognitive">
                <div class="ca-profile-info">
                  <span class="ca-profile-icon">🧠</span>
                  <div>
                    <div class="ca-profile-name">Cognitive Focus</div>
                    <div class="ca-profile-desc">Reading guide & heading guides</div>
                  </div>
                </div>
              </div>
              <div class="ca-profile-card" data-profile="seizure">
                <div class="ca-profile-info">
                  <span class="ca-profile-icon">🛡️</span>
                  <div>
                    <div class="ca-profile-name">Seizure Safe</div>
                    <div class="ca-profile-desc">Freeze motion & low saturation</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Content Adjustments -->
            <div class="ca-a11y-section-title">Content & Typography Adjustments</div>
            <div class="ca-a11y-tools-grid">
              <button class="ca-tool-btn" id="ca-tool-dyslexic">
                <div class="ca-tool-icon">${icons.font}</div>
                <div class="ca-tool-label">Dyslexia Font</div>
                <div class="ca-tool-sub">Legible type</div>
              </button>
              <button class="ca-tool-btn" id="ca-tool-text-inc">
                <div class="ca-tool-icon" style="font-weight:700;font-size:18px;">A+</div>
                <div class="ca-tool-label">Bigger Text</div>
                <div class="ca-tool-sub" id="ca-text-size-label">100%</div>
              </button>
              <button class="ca-tool-btn" id="ca-tool-spacing">
                <div class="ca-tool-icon"><span style="letter-spacing:4px;font-weight:bold;">A B</span></div>
                <div class="ca-tool-label">Text Spacing</div>
                <div class="ca-tool-sub">Letter spacing</div>
              </button>
              <button class="ca-tool-btn" id="ca-tool-line-height">
                <div class="ca-tool-icon" style="font-size:18px;font-weight:bold;">↕</div>
                <div class="ca-tool-label">Line Height</div>
                <div class="ca-tool-sub">Double spacing</div>
              </button>
              <button class="ca-tool-btn" id="ca-tool-highlight-links">
                <div class="ca-tool-icon">🔗</div>
                <div class="ca-tool-label">Highlight Links</div>
                <div class="ca-tool-sub">High visibility</div>
              </button>
              <button class="ca-tool-btn" id="ca-tool-highlight-headings">
                <div class="ca-tool-icon">🏷️</div>
                <div class="ca-tool-label">Highlight Titles</div>
                <div class="ca-tool-sub">Outline H1-H6</div>
              </button>
            </div>

            <!-- Color & Contrast Adjustments -->
            <div class="ca-a11y-section-title">Color & Contrast Adjustments</div>
            <div class="ca-a11y-tools-grid">
              <button class="ca-tool-btn" id="ca-tool-contrast-dark">
                <div class="ca-tool-icon">${icons.contrast}</div>
                <div class="ca-tool-label">High Contrast</div>
                <div class="ca-tool-sub">Enhanced dark</div>
              </button>
              <button class="ca-tool-btn" id="ca-tool-contrast-invert">
                <div class="ca-tool-icon">🌗</div>
                <div class="ca-tool-label">Invert Colors</div>
                <div class="ca-tool-sub">Color reversal</div>
              </button>
              <button class="ca-tool-btn" id="ca-tool-monochrome">
                <div class="ca-tool-icon">⚪</div>
                <div class="ca-tool-label">Monochrome</div>
                <div class="ca-tool-sub">Black & white</div>
              </button>
              <button class="ca-tool-btn" id="ca-tool-saturation">
                <div class="ca-tool-icon">🎨</div>
                <div class="ca-tool-label">High Saturation</div>
                <div class="ca-tool-sub">Vivid colors</div>
              </button>
            </div>

            <!-- Orientation & Focus Helpers -->
            <div class="ca-a11y-section-title">Orientation, Focus & Motion</div>
            <div class="ca-a11y-tools-grid">
              <button class="ca-tool-btn" id="ca-tool-stop-animations">
                <div class="ca-tool-icon">${icons.stop}</div>
                <div class="ca-tool-label">Stop Motion</div>
                <div class="ca-tool-sub">Freeze animations</div>
              </button>
              <button class="ca-tool-btn" id="ca-tool-reading-guide">
                <div class="ca-tool-icon">${icons.guide}</div>
                <div class="ca-tool-label">Reading Guide</div>
                <div class="ca-tool-sub">Follow cursor</div>
              </button>
              <button class="ca-tool-btn" id="ca-tool-reading-mask">
                <div class="ca-tool-icon">${icons.mask}</div>
                <div class="ca-tool-label">Reading Mask</div>
                <div class="ca-tool-sub">Focus slit</div>
              </button>
              <button class="ca-tool-btn" id="ca-tool-cursor">
                <div class="ca-tool-icon">${icons.cursor}</div>
                <div class="ca-tool-label">Big Cursor</div>
                <div class="ca-tool-sub" id="ca-cursor-label">Standard</div>
              </button>
            </div>
          </div>

          <div class="ca-card-footer">
            <button class="ca-btn ca-btn-link" id="ca-btn-reset-a11y">
              ${icons.reset} <span>Reset All Adjustments</span>
            </button>
            <button class="ca-btn ca-btn-primary" id="ca-btn-close-a11y">Apply & Close</button>
          </div>
        </div>
      `;
      document.body.appendChild(a11yWrapper);
    }

    cacheElements();
    bindEvents();
    loadA11yState();
  }

  function cacheElements() {
    elements = {
      launcher: document.getElementById('ca-launcher'),
      openConsentBtn: document.getElementById('ca-open-consent-btn'),
      openA11yBtn: document.getElementById('ca-open-a11y-btn'),
      modalConsent: document.getElementById('ca-modal-consent'),
      closeConsentBtn: document.getElementById('ca-close-consent-btn'),
      modalA11y: document.getElementById('ca-a11y-modal'),
      closeA11yBtn: document.getElementById('ca-close-a11y-btn'),
      btnCloseA11y: document.getElementById('ca-btn-close-a11y'),
      catNecessary: document.getElementById('ca-cat-necessary'),
      catAnalytics: document.getElementById('ca-cat-analytics'),
      catMarketing: document.getElementById('ca-cat-marketing'),
      catPreferences: document.getElementById('ca-cat-preferences'),
      statusAnalytics: document.getElementById('ca-status-analytics'),
      statusMarketing: document.getElementById('ca-status-marketing'),
      statusPreferences: document.getElementById('ca-status-preferences'),
      btnAcceptAll: document.getElementById('ca-btn-accept-all'),
      btnReject: document.getElementById('ca-btn-reject'),
      btnSave: document.getElementById('ca-btn-save'),
      btnResetA11y: document.getElementById('ca-btn-reset-a11y'),
      readingGuideLine: document.getElementById('ca-reading-guide-line'),
      readingMaskTop: document.getElementById('ca-reading-mask-top'),
      readingMaskBottom: document.getElementById('ca-reading-mask-bottom'),
      ttsBtnToggle: document.getElementById('ca-btn-tts-toggle'),
      ttsBtnLabel: document.getElementById('ca-tts-btn-label'),
      ttsStatusText: document.getElementById('ca-tts-status-text'),
      ttsClickModeBtn: document.getElementById('ca-btn-tts-clickmode')
    };
  }

  function bindEvents() {
    // Launcher triggers
    if (elements.openConsentBtn) {
      elements.openConsentBtn.addEventListener('click', () => openConsentModal());
    }
    if (elements.openA11yBtn) {
      elements.openA11yBtn.addEventListener('click', () => openA11yModal());
    }

    // Modal Close triggers
    if (elements.closeConsentBtn) {
      elements.closeConsentBtn.addEventListener('click', () => closeConsentModal());
    }
    if (elements.modalConsent) {
      elements.modalConsent.addEventListener('click', (e) => {
        if (e.target === elements.modalConsent) closeConsentModal();
      });
    }

    if (elements.closeA11yBtn) {
      elements.closeA11yBtn.addEventListener('click', () => closeA11yModal());
    }
    if (elements.btnCloseA11y) {
      elements.btnCloseA11y.addEventListener('click', () => closeA11yModal());
    }
    if (elements.modalA11y) {
      elements.modalA11y.addEventListener('click', (e) => {
        if (e.target === elements.modalA11y) closeA11yModal();
      });
    }

    // Consent Action Buttons
    if (elements.btnAcceptAll) {
      elements.btnAcceptAll.addEventListener('click', () => {
        const choice = { necessary: true, analytics: true, marketing: true, preferences: true };
        saveConsent(choice);
        syncConsentCheckboxes(choice);
        closeConsentModal();
      });
    }

    if (elements.btnReject) {
      elements.btnReject.addEventListener('click', () => {
        const choice = { necessary: true, analytics: false, marketing: false, preferences: false };
        saveConsent(choice);
        syncConsentCheckboxes(choice);
        closeConsentModal();
      });
    }

    if (elements.btnSave) {
      elements.btnSave.addEventListener('click', () => {
        const choice = {
          necessary: true,
          analytics: elements.catAnalytics ? elements.catAnalytics.checked : false,
          marketing: elements.catMarketing ? elements.catMarketing.checked : false,
          preferences: elements.catPreferences ? elements.catPreferences.checked : false
        };
        saveConsent(choice);
        closeConsentModal();
      });
    }

    // Keyboard ESC to close modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeConsentModal();
        closeA11yModal();
      }
    });

    // Accessibility Tool Buttons
    setupA11yButtons();
  }

  // =========================================================================
  // ACCESSIBILITY LOGIC & CONTROLS
  // =========================================================================

  function setupA11yButtons() {
    // 1. Dyslexia Font
    const btnDyslexic = document.getElementById('ca-tool-dyslexic');
    if (btnDyslexic) {
      btnDyslexic.addEventListener('click', () => {
        a11yState.dyslexicFont = !a11yState.dyslexicFont;
        applyA11yState();
      });
    }

    // 2. Text Resizing (Cycle: 100% -> 110% -> 125% -> 140% -> 100%)
    const btnTextInc = document.getElementById('ca-tool-text-inc');
    if (btnTextInc) {
      btnTextInc.addEventListener('click', () => {
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

    // 4. Line Height
    const btnLineHeight = document.getElementById('ca-tool-line-height');
    if (btnLineHeight) {
      btnLineHeight.addEventListener('click', () => {
        a11yState.lineHeight = !a11yState.lineHeight;
        applyA11yState();
      });
    }

    // 5. Highlights
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

    // 6. Contrast options
    const contrastButtons = [
      { id: 'ca-tool-contrast-dark', value: 'dark' },
      { id: 'ca-tool-contrast-invert', value: 'invert' },
      { id: 'ca-tool-monochrome', value: 'monochrome' },
      { id: 'ca-tool-saturation', value: 'saturate' }
    ];

    contrastButtons.forEach(item => {
      const btn = document.getElementById(item.id);
      if (btn) {
        btn.addEventListener('click', () => {
          a11yState.contrast = (a11yState.contrast === item.value) ? 'normal' : item.value;
          applyA11yState();
        });
      }
    });

    // 7. Stop motion / animations
    const btnStopMotion = document.getElementById('ca-tool-stop-animations');
    if (btnStopMotion) {
      btnStopMotion.addEventListener('click', () => {
        a11yState.stopAnimations = !a11yState.stopAnimations;
        applyA11yState();
      });
    }

    // 8. Reading guide
    const btnReadingGuide = document.getElementById('ca-tool-reading-guide');
    if (btnReadingGuide) {
      btnReadingGuide.addEventListener('click', () => {
        a11yState.readingGuide = !a11yState.readingGuide;
        applyA11yState();
      });
    }

    // 9. Reading mask
    const btnReadingMask = document.getElementById('ca-tool-reading-mask');
    if (btnReadingMask) {
      btnReadingMask.addEventListener('click', () => {
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

    // 11. Profile Cards
    const profileCards = document.querySelectorAll('.ca-profile-card');
    profileCards.forEach(card => {
      card.addEventListener('click', () => {
        const prof = card.getAttribute('data-profile');
        applyProfile(prof);
      });
    });

    // 12. Reset All
    if (elements.btnResetA11y) {
      elements.btnResetA11y.addEventListener('click', () => {
        resetA11ySettings();
      });
    }

    // 13. TTS Controls
    setupTTS();
  }

  function applyProfile(profile) {
    // Reset base first
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

    switch (profile) {
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
      case 'seizure':
        a11yState.stopAnimations = true;
        a11yState.contrast = 'monochrome';
        break;
    }

    applyA11yState();
  }

  function applyA11yState() {
    const docEl = document.documentElement;

    // Dyslexia
    docEl.classList.toggle('ca-dyslexic-font', a11yState.dyslexicFont);
    toggleToolActive('ca-tool-dyslexic', a11yState.dyslexicFont);

    // Text Size
    docEl.classList.remove('ca-text-110', 'ca-text-125', 'ca-text-140');
    if (a11yState.textSize > 100) {
      docEl.classList.add(`ca-text-${a11yState.textSize}`);
    }
    const labelSize = document.getElementById('ca-text-size-label');
    if (labelSize) labelSize.textContent = `${a11yState.textSize}%`;
    toggleToolActive('ca-tool-text-inc', a11yState.textSize > 100);

    // Spacing
    docEl.classList.toggle('ca-letter-spacing', a11yState.letterSpacing);
    toggleToolActive('ca-tool-spacing', a11yState.letterSpacing);

    docEl.classList.toggle('ca-line-height', a11yState.lineHeight);
    toggleToolActive('ca-tool-line-height', a11yState.lineHeight);

    // Links & Headings
    docEl.classList.toggle('ca-highlight-links', a11yState.highlightLinks);
    toggleToolActive('ca-tool-highlight-links', a11yState.highlightLinks);

    docEl.classList.toggle('ca-highlight-headings', a11yState.highlightHeadings);
    toggleToolActive('ca-tool-highlight-headings', a11yState.highlightHeadings);

    // Contrasts
    docEl.classList.remove('ca-contrast-dark', 'ca-contrast-invert', 'ca-contrast-monochrome', 'ca-high-saturation');
    toggleToolActive('ca-tool-contrast-dark', a11yState.contrast === 'dark');
    toggleToolActive('ca-tool-contrast-invert', a11yState.contrast === 'invert');
    toggleToolActive('ca-tool-monochrome', a11yState.contrast === 'monochrome');
    toggleToolActive('ca-tool-saturation', a11yState.contrast === 'saturate');

    if (a11yState.contrast === 'dark') docEl.classList.add('ca-contrast-dark');
    else if (a11yState.contrast === 'invert') docEl.classList.add('ca-contrast-invert');
    else if (a11yState.contrast === 'monochrome') docEl.classList.add('ca-contrast-monochrome');
    else if (a11yState.contrast === 'saturate') docEl.classList.add('ca-high-saturation');

    // Motion
    docEl.classList.toggle('ca-stop-animations', a11yState.stopAnimations);
    toggleToolActive('ca-tool-stop-animations', a11yState.stopAnimations);

    // Cursor
    docEl.classList.remove('ca-big-cursor', 'ca-big-cursor-black');
    const labelCursor = document.getElementById('ca-cursor-label');
    if (a11yState.bigCursor === 'white') {
      docEl.classList.add('ca-big-cursor');
      if (labelCursor) labelCursor.textContent = 'Big White';
      toggleToolActive('ca-tool-cursor', true);
    } else if (a11yState.bigCursor === 'black') {
      docEl.classList.add('ca-big-cursor-black');
      if (labelCursor) labelCursor.textContent = 'Big Black';
      toggleToolActive('ca-tool-cursor', true);
    } else {
      if (labelCursor) labelCursor.textContent = 'Standard';
      toggleToolActive('ca-tool-cursor', false);
    }

    // Reading Guide
    if (elements.readingGuideLine) {
      elements.readingGuideLine.style.display = a11yState.readingGuide ? 'block' : 'none';
      toggleToolActive('ca-tool-reading-guide', a11yState.readingGuide);
    }

    // Reading Mask
    if (elements.readingMaskTop && elements.readingMaskBottom) {
      const showMask = a11yState.readingMask;
      elements.readingMaskTop.style.display = showMask ? 'block' : 'none';
      elements.readingMaskBottom.style.display = showMask ? 'block' : 'none';
      toggleToolActive('ca-tool-reading-mask', showMask);
    }

    // Save preferences
    try {
      localStorage.setItem(A11Y_KEY, JSON.stringify(a11yState));
    } catch (e) {}
  }

  function toggleToolActive(btnId, isActive) {
    const btn = document.getElementById(btnId);
    if (btn) btn.classList.toggle('ca-active', Boolean(isActive));
  }

  function resetA11ySettings() {
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
    if (elements.ttsClickModeBtn) elements.ttsClickModeBtn.classList.remove('ca-active');
    applyA11yState();
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
  // TEXT TO SPEECH (TTS) / SCREEN READER SIMULATION
  // =========================================================================

  function setupTTS() {
    if (!('speechSynthesis' in window)) {
      if (elements.ttsStatusText) elements.ttsStatusText.textContent = 'Speech synthesis not supported in this browser';
      return;
    }

    if (elements.ttsBtnToggle) {
      elements.ttsBtnToggle.addEventListener('click', () => {
        if (window.speechSynthesis.speaking) {
          stopSpeech();
        } else {
          readPageContent();
        }
      });
    }

    if (elements.ttsClickModeBtn) {
      elements.ttsClickModeBtn.addEventListener('click', () => {
        clickToSpeakActive = !clickToSpeakActive;
        elements.ttsClickModeBtn.classList.toggle('ca-active', clickToSpeakActive);
        if (clickToSpeakActive) {
          elements.ttsStatusText.textContent = 'Click any paragraph or title to hear it read aloud';
          document.body.style.cursor = 'help';
        } else {
          elements.ttsStatusText.textContent = 'Audio Assistant: Ready';
          document.body.style.cursor = '';
        }
      });
    }

    // Handle click-to-speak on page elements
    document.addEventListener('click', (e) => {
      if (!clickToSpeakActive) return;
      if (e.target.closest('#ca-a11y-modal') || e.target.closest('#ca-launcher') || e.target.closest('#ca-modal-consent')) return;

      e.preventDefault();
      e.stopPropagation();

      const text = e.target.innerText ? e.target.innerText.trim() : '';
      if (text) {
        speakText(text, e.target);
      }
    });
  }

  function readPageContent() {
    const mainEl = document.querySelector('main') || document.querySelector('article') || document.body;
    // Collect visible readable elements
    const elementsToRead = mainEl.querySelectorAll('h1, h2, h3, h4, p, li');
    let texts = [];
    elementsToRead.forEach(el => {
      // Don't read widget itself
      if (el.closest('#ca-launcher') || el.closest('#ca-modal-consent') || el.closest('#ca-a11y-modal')) return;
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
      activeSpeechUtterance.pitch = 1.0;

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

    if (elements.ttsBtnLabel) elements.ttsBtnLabel.textContent = 'Stop Reading';
    if (elements.ttsStatusText) elements.ttsStatusText.textContent = 'Reading page in progress...';
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

    if (elements.ttsStatusText) elements.ttsStatusText.textContent = `Reading: "${text.substring(0, 30)}..."`;
    window.speechSynthesis.speak(activeSpeechUtterance);
  }

  function stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    document.querySelectorAll('.ca-speaking-highlight').forEach(el => el.classList.remove('ca-speaking-highlight'));
    if (elements.ttsBtnLabel) elements.ttsBtnLabel.textContent = 'Read Page';
    if (elements.ttsStatusText) elements.ttsStatusText.textContent = 'Audio Assistant: Ready';
  }

  // =========================================================================
  // MODAL CONTROLS & CHECKBOX SYNC
  // =========================================================================

  function openConsentModal() {
    if (elements.modalConsent) {
      const saved = getSavedConsent();
      if (saved) {
        syncConsentCheckboxes(saved.categories);
      }
      elements.modalConsent.classList.add('ca-active');
      const focusTarget = elements.btnAcceptAll || elements.modalConsent.querySelector('button');
      if (focusTarget) focusTarget.focus();
    }
  }

  function closeConsentModal() {
    if (elements.modalConsent) {
      elements.modalConsent.classList.remove('ca-active');
    }
  }

  function openA11yModal() {
    if (elements.modalA11y) {
      elements.modalA11y.classList.add('ca-active');
      const focusTarget = elements.btnCloseA11y || elements.modalA11y.querySelector('button');
      if (focusTarget) focusTarget.focus();
    }
  }

  function closeA11yModal() {
    if (elements.modalA11y) {
      elements.modalA11y.classList.remove('ca-active');
    }
  }

  function syncConsentCheckboxes(categories) {
    if (elements.catAnalytics) elements.catAnalytics.checked = Boolean(categories.analytics);
    if (elements.catMarketing) elements.catMarketing.checked = Boolean(categories.marketing);
    if (elements.catPreferences) elements.catPreferences.checked = Boolean(categories.preferences);

    if (elements.statusAnalytics) {
      elements.statusAnalytics.textContent = categories.analytics ? 'Allowed' : 'Consent Required';
      elements.statusAnalytics.style.color = categories.analytics ? '#34d399' : '';
    }
    if (elements.statusMarketing) {
      elements.statusMarketing.textContent = categories.marketing ? 'Allowed' : 'Consent Required';
      elements.statusMarketing.style.color = categories.marketing ? '#34d399' : '';
    }
    if (elements.statusPreferences) {
      elements.statusPreferences.textContent = categories.preferences ? 'Allowed' : 'Consent Required';
      elements.statusPreferences.style.color = categories.preferences ? '#34d399' : '';
    }
  }

  // =========================================================================
  // PUBLIC INITIALIZATION API
  // =========================================================================

  function init(options = {}) {
    config = { ...defaults, ...options };

    // Set theme class if requested
    if (config.theme === 'light') {
      document.documentElement.classList.add('ca-theme-light');
    }

    // Google Consent Mode v2 setup
    initGoogleConsentMode();

    // Inject DOM on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        injectDOM();
        checkInitialPrompt();
      });
    } else {
      injectDOM();
      checkInitialPrompt();
    }

    console.log('[CookieAccess] Initialized with config:', config);
  }

  function checkInitialPrompt() {
    const saved = getSavedConsent();
    if (!saved && config.enableConsentBanner) {
      // First visit: automatically open the consent banner
      setTimeout(() => {
        openConsentModal();
      }, 400);
    } else if (saved) {
      consentState = saved;
      syncConsentCheckboxes(saved.categories);
    }
  }

  // Auto-init via script tag data attributes
  function autoInitFromScriptTag() {
    const script = document.currentScript || document.querySelector('script[src*="cookie-access"]');
    if (!script) return;

    const ga = script.getAttribute('data-ga') || script.getAttribute('data-ga-id');
    const gtm = script.getAttribute('data-gtm');
    const pos = script.getAttribute('data-position');
    const theme = script.getAttribute('data-theme');
    const a11y = script.getAttribute('data-a11y');

    const opts = {};
    if (ga) opts.gaMeasurementId = ga;
    if (gtm) opts.gtmId = gtm;
    if (pos) opts.position = pos;
    if (theme) opts.theme = theme;
    if (a11y === 'false') opts.enableAccessibility = false;

    init(opts);
  }

  autoInitFromScriptTag();

  // Return Public API
  return {
    init,
    openConsentModal,
    closeConsentModal,
    openA11yModal,
    closeA11yModal,
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
      a.download = `cookie-access-consent-audit-${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };
}));

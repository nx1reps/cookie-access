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

    companyName: 'Our Website',
    privacyPolicyUrl: '#privacy',
    cookiePolicyUrl: '#cookies',
    theme: 'light',
    position: 'bottom-right',
    
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
      close: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
      brandLogo: `<svg viewBox="0 0 24 24"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>`,
      search: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`
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

    // 3. Fluid Cards Consent Modal (No Dropdowns, Clean Fluid Rows)
    if (config.enableConsentBanner && !document.getElementById('ca-modal-dialog')) {
      const modalBackdrop = document.createElement('div');
      modalBackdrop.id = 'ca-modal-dialog';
      modalBackdrop.className = 'ca-modal-backdrop';
      modalBackdrop.setAttribute('role', 'dialog');
      modalBackdrop.setAttribute('aria-modal', 'true');

      modalBackdrop.innerHTML = `
        <div class="ca-dialog-window" id="ca-dialog-window">
          <!-- Clean Standard Header -->
          <div class="ca-clean-header">
            <div class="ca-header-left">
              <h2 style="font-size:17px;font-weight:700;color:var(--ca-text);margin:0;">Privacy &amp; Cookie Settings</h2>
              <div style="font-size:12px;color:var(--ca-text-muted);margin-top:2px;">Manage how cookies and telemetry are used on this site</div>
            </div>
            <button class="ca-close-icon-btn" id="ca-modal-close-btn" aria-label="Close modal">${getSVG('close')}</button>
          </div>

          <!-- Body with Fluid Cards (NO DROPDOWNS) -->
          <div class="ca-clean-body">
            <p>
              We value your privacy. We use essential cookies to maintain security and optional Google Analytics to enhance user experience. Adjust your permissions below:
            </p>

            <div class="ca-fluid-cards-list">
              <!-- 1. Strictly Necessary -->
              <div class="ca-fluid-card">
                <div class="ca-fluid-card-info">
                  <div class="ca-fluid-card-icon" style="color:#059669;">🛡️</div>
                  <div class="ca-fluid-card-text">
                    <div class="ca-fluid-card-title">
                      <span>Strictly Necessary</span>
                      <span class="ca-card-tag ca-tag-required">Always Active</span>
                    </div>
                    <div class="ca-fluid-card-desc">Essential for secure authentication, session tokens, and saving consent choices.</div>
                  </div>
                </div>
                <label class="ca-switch">
                  <input type="checkbox" id="ca-toggle-necessary" checked disabled>
                  <span class="ca-slider"></span>
                </label>
              </div>

              <!-- 2. Google Analytics 4 (GA4) -->
              <div class="ca-fluid-card">
                <div class="ca-fluid-card-info">
                  <div class="ca-fluid-card-icon" style="color:#2563eb;">📊</div>
                  <div class="ca-fluid-card-text">
                    <div class="ca-fluid-card-title">
                      <span>Google Analytics (GA4)</span>
                      <span class="ca-card-tag">Consent Mode v2</span>
                    </div>
                    <div class="ca-fluid-card-desc">Measures anonymous traffic trends, page views, and visitor performance telemetry.</div>
                  </div>
                </div>
                <label class="ca-switch">
                  <input type="checkbox" id="ca-toggle-analytics">
                  <span class="ca-slider"></span>
                </label>
              </div>

              <!-- 3. Functional & Preferences -->
              <div class="ca-fluid-card">
                <div class="ca-fluid-card-info">
                  <div class="ca-fluid-card-icon" style="color:#d97706;">⚙️</div>
                  <div class="ca-fluid-card-text">
                    <div class="ca-fluid-card-title">
                      <span>Functional & Preferences</span>
                      <span class="ca-card-tag">Personalization</span>
                    </div>
                    <div class="ca-fluid-card-desc">Remembers chosen UI language, appearance preferences, and site settings.</div>
                  </div>
                </div>
                <label class="ca-switch">
                  <input type="checkbox" id="ca-toggle-functional">
                  <span class="ca-slider"></span>
                </label>
              </div>

              <!-- 4. Marketing & Advertisement -->
              <div class="ca-fluid-card">
                <div class="ca-fluid-card-info">
                  <div class="ca-fluid-card-icon" style="color:#ec4899;">🎯</div>
                  <div class="ca-fluid-card-text">
                    <div class="ca-fluid-card-title">
                      <span>Targeting & Ads</span>
                      <span class="ca-card-tag">Optional</span>
                    </div>
                    <div class="ca-fluid-card-desc">Used to deliver relevant behavioral advertising campaigns across partner platforms.</div>
                  </div>
                </div>
                <label class="ca-switch">
                  <input type="checkbox" id="ca-toggle-advertisement">
                  <span class="ca-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <!-- Clean Footer Actions with Subtle Branding -->
          <div class="ca-clean-footer">
            <div class="ca-footer-brand-tag">
              <span style="display:inline-flex;align-items:center;gap:5px;font-size:11.5px;color:var(--ca-text-muted);">
                ${getSVG('brandLogo')}
                <span>Powered by <strong style="color:var(--ca-text);">CookieAccess</strong></span>
              </span>
            </div>
            <div class="ca-footer-actions-right">
              <button class="ca-btn ca-btn-outline" id="ca-modal-reject">Decline Non-Essential</button>
              <button class="ca-btn ca-btn-outline" id="ca-modal-save">Save Choices</button>
              <button class="ca-btn ca-btn-primary" id="ca-modal-accept">Accept All</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modalBackdrop);
    }

    // 4. Accessibility Side Drawer (accessiBe / UserWay Clone)
    if (config.enableAccessibility && !document.getElementById('ca-a11y-drawer')) {
      const drawer = document.createElement('div');
      drawer.id = 'ca-a11y-drawer';
      drawer.setAttribute('role', 'region');
      drawer.setAttribute('aria-label', 'Accessibility Assistant');

      drawer.innerHTML = `
        <div class="ca-a11y-topbar">
          <div class="ca-a11y-topbar-title">
            <span style="font-size:19px;">♿</span>
            <span style="font-size:16px;font-weight:700;color:var(--ca-text);">Accessibility Assistant</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;">
            <button class="ca-btn ca-btn-outline ca-btn-sm" id="ca-a11y-reset-btn" title="Reset all adjustments">Reset</button>
            <button class="ca-close-icon-btn" id="ca-a11y-close-btn" aria-label="Close accessibility panel">${getSVG('close')}</button>
          </div>
        </div>

        <div class="ca-a11y-scrollable">
          <!-- Audio Screen Reader (TTS) -->
          <div class="ca-audio-panel">
            <div class="ca-audio-status" id="ca-audio-status">
              <span>🔊</span>
              <span id="ca-audio-text">Audio Reader: Ready</span>
            </div>
            <div style="display:flex;gap:6px;">
              <button class="ca-btn ca-btn-primary ca-btn-sm" id="ca-audio-read-btn">Read Page</button>
              <button class="ca-btn ca-btn-outline ca-btn-sm" id="ca-audio-click-btn" title="Click any sentence to hear it read">Click-to-Speak</button>
            </div>
          </div>

          <!-- Section 1: Pre-set Profiles -->
          <div class="ca-section-heading">
            <span>ACCESSIBILITY PROFILES</span>
            <span style="font-weight:400;font-size:11px;color:var(--ca-text-muted);">One-Click Presets</span>
          </div>
          <div class="ca-profile-list">
            <div class="ca-profile-row" data-profile="seizure">
              <div class="ca-profile-text">
                <span class="ca-profile-title">🛡️ Seizure Safe Profile</span>
                <span class="ca-profile-desc">Freezes motion & removes flashes to prevent seizure triggers.</span>
              </div>
              <label class="ca-switch"><input type="checkbox" data-profile-switch="seizure"><span class="ca-slider"></span></label>
            </div>

            <div class="ca-profile-row" data-profile="vision">
              <div class="ca-profile-text">
                <span class="ca-profile-title">👁️ Vision Impaired Profile</span>
                <span class="ca-profile-desc">125% text scale, high dark contrast, and link highlights.</span>
              </div>
              <label class="ca-switch"><input type="checkbox" data-profile-switch="vision"><span class="ca-slider"></span></label>
            </div>

            <div class="ca-profile-row" data-profile="adhd">
              <div class="ca-profile-text">
                <span class="ca-profile-title">⚡ ADHD Friendly Profile</span>
                <span class="ca-profile-desc">Reading mask focus slit & stops background animations.</span>
              </div>
              <label class="ca-switch"><input type="checkbox" data-profile-switch="adhd"><span class="ca-slider"></span></label>
            </div>

            <div class="ca-profile-row" data-profile="dyslexia">
              <div class="ca-profile-text">
                <span class="ca-profile-title">📖 Dyslexia Friendly Profile</span>
                <span class="ca-profile-desc">Lexend readable font with increased letter spacing.</span>
              </div>
              <label class="ca-switch"><input type="checkbox" data-profile-switch="dyslexia"><span class="ca-slider"></span></label>
            </div>

            <div class="ca-profile-row" data-profile="cognitive">
              <div class="ca-profile-text">
                <span class="ca-profile-title">🧠 Cognitive Focus Profile</span>
                <span class="ca-profile-desc">Laser reading guide line & highlighted section titles.</span>
              </div>
              <label class="ca-switch"><input type="checkbox" data-profile-switch="cognitive"><span class="ca-slider"></span></label>
            </div>
          </div>

          <!-- Section 2: Content & Typography -->
          <div class="ca-section-heading">CONTENT & TYPOGRAPHY</div>
          <div class="ca-tools-grid">
            <div class="ca-tool-card" id="ca-tool-dyslexic">
              <div class="ca-tool-icon">📖</div>
              <div class="ca-tool-meta">
                <span class="ca-tool-name">Dyslexia Font</span>
                <span class="ca-tool-status">Lexend Typeface</span>
              </div>
            </div>

            <div class="ca-tool-card" id="ca-tool-size">
              <div class="ca-tool-icon" style="font-weight:800;">A+</div>
              <div class="ca-tool-meta">
                <span class="ca-tool-name">Bigger Text</span>
                <span class="ca-tool-status" id="ca-status-size">Default (100%)</span>
              </div>
            </div>

            <div class="ca-tool-card" id="ca-tool-spacing">
              <div class="ca-tool-icon">↔</div>
              <div class="ca-tool-meta">
                <span class="ca-tool-name">Text Spacing</span>
                <span class="ca-tool-status">Letter Spacing</span>
              </div>
            </div>

            <div class="ca-tool-card" id="ca-tool-line-height">
              <div class="ca-tool-icon">↕</div>
              <div class="ca-tool-meta">
                <span class="ca-tool-name">Line Height</span>
                <span class="ca-tool-status">Double Spacing</span>
              </div>
            </div>

            <div class="ca-tool-card" id="ca-tool-highlight-links">
              <div class="ca-tool-icon">🔗</div>
              <div class="ca-tool-meta">
                <span class="ca-tool-name">Highlight Links</span>
                <span class="ca-tool-status">High Visibility</span>
              </div>
            </div>

            <div class="ca-tool-card" id="ca-tool-highlight-headings">
              <div class="ca-tool-icon">🏷️</div>
              <div class="ca-tool-meta">
                <span class="ca-tool-name">Highlight Titles</span>
                <span class="ca-tool-status">Outline Headings</span>
              </div>
            </div>
          </div>

          <!-- Section 3: Color & Contrast -->
          <div class="ca-section-heading">COLOR & CONTRAST</div>
          <div class="ca-tools-grid">
            <div class="ca-tool-card" id="ca-tool-contrast-dark">
              <div class="ca-tool-icon">🌓</div>
              <div class="ca-tool-meta">
                <span class="ca-tool-name">Dark Contrast</span>
                <span class="ca-tool-status">High Contrast</span>
              </div>
            </div>

            <div class="ca-tool-card" id="ca-tool-contrast-invert">
              <div class="ca-tool-icon">🔄</div>
              <div class="ca-tool-meta">
                <span class="ca-tool-name">Invert Colors</span>
                <span class="ca-tool-status">Color Reversal</span>
              </div>
            </div>

            <div class="ca-tool-card" id="ca-tool-monochrome">
              <div class="ca-tool-icon">⚪</div>
              <div class="ca-tool-meta">
                <span class="ca-tool-name">Monochrome</span>
                <span class="ca-tool-status">Black & White</span>
              </div>
            </div>

            <div class="ca-tool-card" id="ca-tool-saturation">
              <div class="ca-tool-icon">🎨</div>
              <div class="ca-tool-meta">
                <span class="ca-tool-name">High Saturation</span>
                <span class="ca-tool-status">Vivid Colors</span>
              </div>
            </div>
          </div>

          <!-- Section 4: Orientation & Tools -->
          <div class="ca-section-heading">ORIENTATION & VISUAL AIDS</div>
          <div class="ca-tools-grid">
            <div class="ca-tool-card" id="ca-tool-stop-animations">
              <div class="ca-tool-icon">⏹️</div>
              <div class="ca-tool-meta">
                <span class="ca-tool-name">Stop Animations</span>
                <span class="ca-tool-status">Freeze Motion</span>
              </div>
            </div>

            <div class="ca-tool-card" id="ca-tool-reading-guide">
              <div class="ca-tool-icon">📏</div>
              <div class="ca-tool-meta">
                <span class="ca-tool-name">Reading Guide</span>
                <span class="ca-tool-status">Follow Cursor</span>
              </div>
            </div>

            <div class="ca-tool-card" id="ca-tool-reading-mask">
              <div class="ca-tool-icon">🕶️</div>
              <div class="ca-tool-meta">
                <span class="ca-tool-name">Reading Mask</span>
                <span class="ca-tool-status">Focus Slit</span>
              </div>
            </div>

            <div class="ca-tool-card" id="ca-tool-cursor">
              <div class="ca-tool-icon">👆</div>
              <div class="ca-tool-meta">
                <span class="ca-tool-name">Big Cursor</span>
                <span class="ca-tool-status" id="ca-status-cursor">Default</span>
              </div>
            </div>
          </div>
        </div>

        <div class="ca-a11y-footer">
          <span style="display:inline-flex;align-items:center;gap:5px;font-size:11.5px;color:var(--ca-text-muted);">
            ${getSVG('brandLogo')}
            <span>Powered by <strong style="color:var(--ca-text);">CookieAccess</strong></span>
          </span>
          <button class="ca-btn ca-btn-primary ca-btn-sm" id="ca-a11y-done-btn">Done</button>
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
      modalDialog: document.getElementById('ca-modal-dialog'),
      modalCloseBtn: document.getElementById('ca-modal-close-btn'),
      modalAccept: document.getElementById('ca-modal-accept'),
      modalReject: document.getElementById('ca-modal-reject'),
      modalSave: document.getElementById('ca-modal-save'),
      toggleNecessary: document.getElementById('ca-toggle-necessary'),
      toggleFunctional: document.getElementById('ca-toggle-functional'),
      toggleAnalytics: document.getElementById('ca-toggle-analytics'),
      toggleAdvertisement: document.getElementById('ca-toggle-advertisement'),
      a11yDrawer: document.getElementById('ca-a11y-drawer'),
      a11yCloseBtn: document.getElementById('ca-a11y-close-btn'),
      a11yDoneBtn: document.getElementById('ca-a11y-done-btn'),
      a11yResetBtn: document.getElementById('ca-a11y-reset-btn'),
      audioStatus: document.getElementById('ca-audio-status'),
      audioText: document.getElementById('ca-audio-text'),
      audioReadBtn: document.getElementById('ca-audio-read-btn'),
      audioClickBtn: document.getElementById('ca-audio-click-btn'),
      readingGuideLine: document.getElementById('ca-reading-guide-line'),
      readingMaskTop: document.getElementById('ca-reading-mask-top'),
      readingMaskBottom: document.getElementById('ca-reading-mask-bottom')
    };
  }

  function bindEvents() {
    if (elements.launcherCookie) {
      elements.launcherCookie.addEventListener('click', () => openPreferencesModal());
    }
    if (elements.launcherA11y) {
      elements.launcherA11y.addEventListener('click', () => openA11yDrawer());
    }

    if (elements.modalCloseBtn) {
      elements.modalCloseBtn.addEventListener('click', () => closePreferencesModal());
    }
    if (elements.modalDialog) {
      elements.modalDialog.addEventListener('click', (e) => {
        if (e.target === elements.modalDialog) closePreferencesModal();
      });
    }

    if (elements.modalAccept) {
      elements.modalAccept.addEventListener('click', () => {
        const choice = { necessary: true, functional: true, analytics: true, advertisement: true };
        saveConsent(choice);
        syncToggles(choice);
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

    if (elements.modalSave) {
      elements.modalSave.addEventListener('click', () => {
        const choice = {
          necessary: true,
          functional: elements.toggleFunctional ? elements.toggleFunctional.checked : false,
          analytics: elements.toggleAnalytics ? elements.toggleAnalytics.checked : false,
          advertisement: elements.toggleAdvertisement ? elements.toggleAdvertisement.checked : false
        };
        saveConsent(choice);
        closePreferencesModal();
      });
    }

    if (elements.a11yCloseBtn) elements.a11yCloseBtn.addEventListener('click', () => closeA11yDrawer());
    if (elements.a11yDoneBtn) elements.a11yDoneBtn.addEventListener('click', () => closeA11yDrawer());
    if (elements.a11yResetBtn) elements.a11yResetBtn.addEventListener('click', () => resetA11ySettings());

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closePreferencesModal();
        closeA11yDrawer();
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

    // 2. Text Sizing
    docEl.classList.remove('ca-text-110', 'ca-text-125', 'ca-text-140');
    if (a11yState.textSize > 100) docEl.classList.add(`ca-text-${a11yState.textSize}`);
    const sizeStatus = document.getElementById('ca-status-size');
    if (sizeStatus) sizeStatus.textContent = `${a11yState.textSize}%`;
    toggleCardActive('ca-tool-size', a11yState.textSize > 100);

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
  // MODAL / DRAWER CONTROLS
  // =========================================================================

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
    if (elements.toggleFunctional) elements.toggleFunctional.checked = Boolean(categories.functional);
    if (elements.toggleAnalytics) elements.toggleAnalytics.checked = Boolean(categories.analytics);
    if (elements.toggleAdvertisement) elements.toggleAdvertisement.checked = Boolean(categories.advertisement);
  }

  // =========================================================================
  // INITIALIZATION API
  // =========================================================================

  function init(options = {}) {
    config = { ...defaults, ...options };

    if (config.theme === 'dark') {
      document.documentElement.classList.add('ca-theme-dark');
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
        openPreferencesModal();
      }, 350);
    } else if (saved) {
      consentState = saved;
      syncToggles(saved.categories);
    }
  }

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

  return {
    init,
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

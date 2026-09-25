
(function() {
  if (typeof document !== 'undefined' && !document.getElementById('ca-embedded-styles')) {
    var style = document.createElement('style');
    style.id = 'ca-embedded-styles';
    style.textContent = "@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');:root,#ca-wrapper,#stcm-wrapper{--ca-font:var(--fontFamily,'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,sans-serif);--ca-font-dyslexic:'Lexend',-apple-system,sans-serif;--ca-mono:'JetBrains Mono',monospace;--ca-bg-modal:var(--backgroundColor,#ffffff);--ca-bg-header:var(--backgroundColor,#f8fafc);--ca-bg-card:var(--backgroundColor,#ffffff);--ca-bg-card-hover:#f1f5f9;--ca-bg-subtle:#f1f5f9;--ca-border:#e2e8f0;--ca-border-subtle:#cbd5e1;--ca-border-focus:var(--primaryColor,#2563eb);--ca-text:var(--textColor,#0f172a);--ca-text-secondary:var(--textColor,#475569);--ca-text-muted:#64748b;--ca-primary:var(--primaryColor,#2563eb);--ca-primary-hover:#1d4ed8;--ca-primary-soft:#eff6ff;--ca-cookie:var(--iconColor,#d97706);--ca-cookie-bg:var(--iconBackgroundColor,#fffbeb);--ca-success:#059669;--ca-warning:#d97706;--ca-radius-2xl:var(--borderRadius,24px);--ca-radius-xl:var(--borderRadius,18px);--ca-radius-lg:var(--borderRadius,14px);--ca-radius-md:var(--borderRadius,10px);--ca-radius-sm:var(--borderRadius,6px);--ca-shadow-modal:var(--boxShadow,0 25px 60px -15px rgba(15,23,42,0.25),0 0 0 1px rgba(0,0,0,0.06));--ca-shadow-pop:var(--boxShadow,0 12px 32px -6px rgba(0,0,0,0.2),0 0 0 1px rgba(0,0,0,0.08));--ca-backdrop-bg:var(--backdropBackgroundColor,rgba(15,23,42,0.35));--ca-backdrop-blur:var(--backdropBackgroundBlur,8px);--ca-z:2147483640;}.ca-theme-dark{--ca-bg-modal:#0f172a;--ca-bg-header:#1e293b;--ca-bg-card:#1e293b;--ca-bg-card-hover:#293548;--ca-bg-subtle:#1e293b;--ca-border:#334155;--ca-border-subtle:#475569;--ca-border-focus:#3b82f6;--ca-text:#f8fafc;--ca-text-secondary:#cbd5e1;--ca-text-muted:#94a3b8;--ca-primary:#3b82f6;--ca-primary-hover:#2563eb;--ca-primary-soft:#1e293b;--ca-cookie-bg:#292524;--ca-shadow-modal:0 30px 70px -15px rgba(0,0,0,0.8),0 0 0 1px rgba(255,255,255,0.1);}#ca-launcher,#ca-launcher *,#ca-modal-dialog,#ca-modal-dialog *,#ca-a11y-drawer,#ca-a11y-drawer *{box-sizing:border-box;font-family:var(--ca-font);}#ca-launcher{position:fixed;bottom:24px;z-index:var(--ca-z);font-family:var(--ca-font);}#ca-launcher.ca-pos-bottom-left{left:24px;}#ca-launcher.ca-pos-bottom-right{right:24px;}.ca-split-circle{width:54px;height:54px;border-radius:50%;background:var(--ca-bg-modal);box-shadow:var(--ca-shadow-pop);border:2.5px solid #ffffff;display:flex;overflow:hidden;cursor:pointer;position:relative;transition:transform 0.25s cubic-bezier(0.16,1,0.3,1),box-shadow 0.25s ease;user-select:none;}.ca-split-circle:hover{transform:scale(1.08) translateY(-2px);box-shadow:0 16px 36px -6px rgba(0,0,0,0.25),0 0 0 3px rgba(37,99,235,0.2);}.ca-half-btn{width:50%;height:100%;display:flex;align-items:center;justify-content:center;background:transparent;border:none;cursor:pointer;padding:0;transition:background-color 0.2s ease;position:relative;}.ca-half-cookie{background:var(--ca-cookie-bg);border-right:1px solid rgba(0,0,0,0.08);}.ca-half-cookie:hover{background:#fef3c7;}.ca-half-cookie svg{width:21px;height:21px;fill:var(--ca-cookie);transition:transform 0.2s ease;}.ca-half-cookie:hover svg{transform:scale(1.15) rotate(-10deg);}.ca-half-a11y{background:var(--ca-primary-soft);}.ca-half-a11y:hover{background:#dbeafe;}.ca-half-a11y svg{width:21px;height:21px;fill:var(--ca-primary);transition:transform 0.2s ease;}.ca-half-a11y:hover svg{transform:scale(1.15);}.ca-half-btn[data-tooltip]::before{content:attr(data-tooltip);position:absolute;bottom:calc(100% + 10px);background:#0f172a;color:#ffffff;font-size:11.5px;font-weight:600;padding:5px 10px;border-radius:6px;white-space:nowrap;pointer-events:none;opacity:0;visibility:hidden;transition:opacity 0.15s ease,transform 0.15s ease;box-shadow:0 4px 12px rgba(0,0,0,0.25);z-index:20;}.ca-half-cookie[data-tooltip]::before{right:-10px;}.ca-half-a11y[data-tooltip]::before{left:-10px;}.ca-half-btn:hover[data-tooltip]::before{opacity:1;visibility:visible;transform:translateY(-2px);}.ca-split-badge{position:absolute;top:-2px;right:-2px;background:#059669;color:#ffffff;font-size:10px;font-weight:700;width:17px;height:17px;border-radius:50%;border:2px solid #ffffff;display:flex;align-items:center;justify-content:center;}.ca-banner-backdrop{position:fixed;inset:0;z-index:2147483641;background:var(--ca-backdrop-bg,rgba(15,23,42,0.45));backdrop-filter:blur(14px) saturate(180%);-webkit-backdrop-filter:blur(14px) saturate(180%);opacity:0;visibility:hidden;pointer-events:none;transition:opacity 0.35s cubic-bezier(0.16,1,0.3,1),visibility 0.35s ease;}.ca-banner-backdrop.ca-open{opacity:1 !important;visibility:visible !important;pointer-events:auto !important;}.ca-banner-card{position:fixed;bottom:24px;right:24px;max-width:520px;width:calc(100% - 48px);background:rgba(255,255,255,0.90) !important;backdrop-filter:blur(24px) saturate(190%) !important;-webkit-backdrop-filter:blur(24px) saturate(190%) !important;border:1px solid rgba(255,255,255,0.8) !important;border-radius:24px;padding:24px 28px 20px;box-shadow:0 25px 60px -12px rgba(0,0,0,0.28),0 0 0 1px rgba(0,0,0,0.05) !important;z-index:2147483642;color:#1e293b;font-family:var(--ca-font);transform:translateY(24px) scale(0.96);opacity:0;visibility:hidden;pointer-events:none;transition:transform 0.35s cubic-bezier(0.16,1,0.3,1),opacity 0.3s ease,visibility 0.3s ease;}.ca-banner-card.ca-active{transform:translateY(0) scale(1) !important;opacity:1 !important;visibility:visible !important;pointer-events:auto !important;}.ca-banner-text{font-size:13.5px;line-height:1.55;color:#475569;font-weight:450;margin-bottom:20px;}.ca-banner-actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}.ca-banner-pill-btn{border-radius:9999px;font-size:13px;font-weight:600;padding:10px 22px;border:none;cursor:pointer;transition:all 0.18s ease;font-family:var(--ca-font);white-space:nowrap;}.ca-banner-pill-btn:hover{transform:translateY(-1px);opacity:0.95;box-shadow:0 4px 14px rgba(0,0,0,0.18);}.ca-btn-accept{background:var(--ca-primary,#1e293b);color:#ffffff;}.ca-btn-reject{background:#1e293b;color:#ffffff;}.ca-banner-text-btn{background:transparent;border:none;color:#64748b;font-size:13.5px;font-weight:600;padding:8px 12px;cursor:pointer;transition:color 0.18s ease;font-family:var(--ca-font);}.ca-banner-text-btn:hover{color:#0f172a;text-decoration:underline;}.ca-banner-logo{margin-left:auto;color:var(--ca-primary,#6366f1);display:flex;align-items:center;justify-content:center;}.ca-banner-logo svg{width:22px;height:22px;fill:currentColor;}.ca-modal-backdrop{position:fixed;inset:0;z-index:calc(var(--ca-z) + 10);background:rgba(15,23,42,0.55);backdrop-filter:blur(16px) saturate(180%);-webkit-backdrop-filter:blur(16px) saturate(180%);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;visibility:hidden;pointer-events:none;transition:opacity 0.3s cubic-bezier(0.16,1,0.3,1),visibility 0.3s;}.ca-modal-backdrop.ca-active{opacity:1 !important;visibility:visible !important;pointer-events:auto !important;}.ca-dialog-window{background:rgba(255,255,255,0.92) !important;backdrop-filter:blur(24px) saturate(190%) !important;-webkit-backdrop-filter:blur(24px) saturate(190%) !important;border:1px solid rgba(255,255,255,0.8) !important;border-radius:24px;box-shadow:0 30px 70px -15px rgba(0,0,0,0.35) !important;width:100%;max-width:580px;max-height:90vh;display:flex;flex-direction:column;color:#1e293b;font-family:var(--ca-font);padding:32px 32px 28px;transform:scale(0.96) translateY(14px);transition:transform 0.3s cubic-bezier(0.16,1,0.3,1);overflow-y:auto;}.ca-modal-backdrop.ca-active .ca-dialog-window{transform:scale(1) translateY(0);}.ca-pref-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}.ca-pref-title{font-size:21px;font-weight:700;color:#1e293b;margin:0;letter-spacing:-0.01em;}.ca-pref-close-btn{background:transparent;border:none;color:#64748b;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.15s ease;}.ca-pref-close-btn:hover{background:#f1f5f9;color:#0f172a;}.ca-pref-subtitle{font-size:13.5px;color:#64748b;line-height:1.55;margin-bottom:24px;}.ca-clean-body{padding:20px 28px;overflow-y:auto;font-size:14px;line-height:1.6;color:var(--ca-text-secondary);}.ca-clean-body p{margin-bottom:16px;}.ca-pref-body{display:flex;flex-direction:column;gap:22px;margin-bottom:28px;}.ca-pref-row{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;}.ca-pref-row-info{flex:1;}.ca-pref-row-title{font-size:15px;font-weight:700;color:#1e293b;margin-bottom:5px;}.ca-pref-row-desc{font-size:13px;color:#64748b;line-height:1.5;}.ca-pill-toggle{position:relative;display:inline-block;width:58px;height:30px;cursor:pointer;user-select:none;flex-shrink:0;margin-top:2px;}.ca-pill-toggle input{opacity:0;width:0;height:0;position:absolute;}.ca-pill-track{position:absolute;inset:0;background-color:transparent;border:2px solid #1e293b;border-radius:9999px;transition:all 0.25s cubic-bezier(0.16,1,0.3,1);display:flex;align-items:center;justify-content:space-between;padding:0 6px;box-sizing:border-box;}.ca-pill-thumb{position:absolute;top:3px;left:3px;width:20px;height:20px;background-color:#1e293b;border-radius:50%;transition:transform 0.25s cubic-bezier(0.16,1,0.3,1),background-color 0.25s ease;}.ca-pill-text-on,.ca-pill-text-off{font-size:9.5px;font-weight:800;letter-spacing:0.5px;text-transform:uppercase;transition:opacity 0.2s ease;line-height:1;}.ca-pill-text-on{color:#ffffff;opacity:0;margin-left:2px;}.ca-pill-text-off{color:#1e293b;opacity:1;margin-left:auto;margin-right:2px;}.ca-pill-toggle input:checked + .ca-pill-track{background-color:var(--ca-primary,#1e293b);border-color:var(--ca-primary,#1e293b);}.ca-pill-toggle input:checked + .ca-pill-track .ca-pill-thumb{transform:translateX(28px);background-color:#ffffff;}.ca-pill-toggle input:checked + .ca-pill-track .ca-pill-text-on{opacity:1;}.ca-pill-toggle input:checked + .ca-pill-track .ca-pill-text-off{opacity:0;}.ca-pill-toggle.ca-disabled{cursor:default;}.ca-pill-toggle input:disabled + .ca-pill-track{background-color:#94a3b8;border-color:#94a3b8;}.ca-pill-toggle input:disabled + .ca-pill-track .ca-pill-thumb{transform:translateX(28px);background-color:#ffffff;}.ca-pill-toggle input:disabled + .ca-pill-track .ca-pill-text-on{opacity:1;color:#ffffff;}.ca-pill-toggle input:disabled + .ca-pill-track .ca-pill-text-off{opacity:0;}.ca-pref-footer{display:flex;align-items:center;justify-content:flex-end;padding-top:10px;flex-wrap:wrap;gap:12px;}.ca-pref-footer-btns{display:flex;align-items:center;gap:10px;}#ca-a11y-drawer{position:fixed;top:0;left:0;bottom:0;width:380px;max-width:92vw;background:#ffffff;border-right:1px solid #e2e8f0;box-shadow:10px 0 45px rgba(0,0,0,0.2);z-index:2147483646;font-family:var(--ca-font);color:#1e293b;display:flex;flex-direction:column;transform:translateX(-100%);pointer-events:none;transition:transform 0.32s cubic-bezier(0.16,1,0.3,1);}#ca-a11y-drawer.ca-open{transform:translateX(0);pointer-events:auto;}.ca-a11y-topbar{padding:16px 20px;background:var(--ca-primary,#2563eb);color:#ffffff;display:flex;align-items:center;justify-content:space-between;}.ca-a11y-topbar-title{font-size:15px;font-weight:700;display:flex;align-items:center;gap:8px;color:#ffffff;}.ca-a11y-topbar-actions{display:flex;align-items:center;gap:8px;}.ca-a11y-icon-btn{background:rgba(255,255,255,0.2);border:none;color:#ffffff;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background-color 0.15s ease;}.ca-a11y-icon-btn:hover{background:rgba(255,255,255,0.35);}.ca-a11y-scrollable{flex:1;overflow-y:auto;padding:18px 20px;}.ca-a11y-card-row{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;background:#ffffff;border:1.5px solid var(--ca-primary,#2563eb);border-radius:12px;font-size:13.5px;font-weight:600;color:#1e293b;cursor:pointer;margin-bottom:10px;transition:background-color 0.15s ease;}.ca-a11y-card-row.ca-subtle-border{border-color:#e2e8f0;}.ca-a11y-card-row:hover{background:#f8fafc;}.ca-a11y-card-row-left{display:flex;align-items:center;gap:10px;}.ca-a11y-badge-icon{font-size:11px;font-weight:700;background:#f1f5f9;border-radius:6px;padding:3px 6px;color:#475569;}.ca-a11y-section-title{font-size:13px;font-weight:700;color:#475569;margin:18px 0 10px;}.ca-adjuster-card-row{display:flex;gap:10px;margin-bottom:12px;}.ca-adjust-font-card{flex:1.4;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:8px;}.ca-card-label{font-size:12px;font-weight:600;color:#1e293b;display:flex;align-items:center;gap:6px;}.ca-font-stepper{display:flex;align-items:center;justify-content:space-between;background:#f1f5f9;border-radius:9999px;padding:3px 6px;}.ca-step-btn{width:24px;height:24px;border-radius:50%;background:var(--ca-primary,#2563eb);color:#ffffff;border:none;font-size:15px;font-weight:700;display:flex;align-items:center;justify-content:center;cursor:pointer;line-height:1;}.ca-step-btn:hover{filter:brightness(0.9);}.ca-step-val{font-size:12px;font-weight:700;color:#1e293b;}.ca-tool-square-card{flex:1;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:12px 10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;cursor:pointer;transition:all 0.15s ease;text-align:center;}.ca-tool-square-card:hover{background:#f8fafc;border-color:#cbd5e1;}.ca-tool-square-card.ca-active{background:#eff6ff;border-color:var(--ca-primary,#2563eb);}.ca-square-tools-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;}.ca-square-tool-btn{background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:14px 10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;cursor:pointer;transition:all 0.15s ease;user-select:none;}.ca-square-tool-btn:hover{background:#f8fafc;border-color:#cbd5e1;}.ca-square-tool-btn.ca-active{background:#eff6ff;border-color:var(--ca-primary,#2563eb);}.ca-square-tool-icon{font-size:20px;line-height:1;}.ca-square-tool-title{font-size:11px;font-weight:600;color:#1e293b;text-align:center;}.ca-audio-panel{background:var(--ca-primary-soft);border:1px solid rgba(37,99,235,0.2);border-radius:var(--ca-radius-lg);padding:14px 16px;margin-bottom:22px;display:flex;align-items:center;justify-content:space-between;gap:12px;}.ca-audio-status{font-size:13px;font-weight:700;color:var(--ca-primary);display:flex;align-items:center;gap:8px;}.ca-section-heading{font-size:11.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:var(--ca-text-muted);margin:20px 0 12px;display:flex;align-items:center;justify-content:space-between;}.ca-profile-list{display:flex;flex-direction:column;gap:8px;margin-bottom:22px;}.ca-profile-row{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--ca-bg-card);border:1px solid var(--ca-border);border-radius:var(--ca-radius-md);transition:all 0.2s;}.ca-profile-row:hover{background:var(--ca-bg-card-hover);}.ca-profile-text{display:flex;flex-direction:column;gap:2px;}.ca-profile-title{font-size:13.5px;font-weight:700;color:var(--ca-text);}.ca-profile-desc{font-size:11.5px;color:var(--ca-text-muted);}.ca-tools-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:20px;}.ca-tool-card{display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--ca-bg-card);border:1px solid var(--ca-border);border-radius:var(--ca-radius-md);cursor:pointer;transition:all 0.15s;text-align:left;user-select:none;}.ca-tool-card:hover{background:var(--ca-bg-card-hover);border-color:var(--ca-border-subtle);transform:translateY(-1px);}.ca-tool-card.ca-active{background:var(--ca-primary-soft);border-color:var(--ca-primary);}.ca-tool-icon{font-size:18px;width:24px;text-align:center;}.ca-tool-meta{display:flex;flex-direction:column;}.ca-tool-name{font-size:13px;font-weight:700;color:var(--ca-text);}.ca-tool-status{font-size:10.5px;color:var(--ca-text-muted);}.ca-tool-card.ca-active .ca-tool-name{color:var(--ca-primary);}.ca-a11y-footer{padding:16px 22px;background:var(--ca-bg-header);border-top:1px solid var(--ca-border);display:flex;align-items:center;justify-content:space-between;}html.ca-dyslexic-font *:not(#ca-a11y-drawer):not(#ca-a11y-drawer *):not(#ca-modal-dialog):not(#ca-modal-dialog *):not(#ca-banner-card):not(#ca-banner-card *):not(#ca-launcher):not(#ca-launcher *){font-family:'Lexend','OpenDyslexic',sans-serif !important;letter-spacing:0.04em !important;word-spacing:0.08em !important;}html.ca-text-90 body{zoom:0.9 !important;-moz-transform:scale(0.9) !important;-moz-transform-origin:top left !important;}html.ca-text-110 body{zoom:1.1 !important;-moz-transform:scale(1.1) !important;-moz-transform-origin:top left !important;}html.ca-text-120 body{zoom:1.2 !important;-moz-transform:scale(1.2) !important;-moz-transform-origin:top left !important;}html.ca-text-125 body{zoom:1.25 !important;-moz-transform:scale(1.25) !important;-moz-transform-origin:top left !important;}html.ca-text-130 body{zoom:1.3 !important;-moz-transform:scale(1.3) !important;-moz-transform-origin:top left !important;}html.ca-text-140 body{zoom:1.4 !important;-moz-transform:scale(1.4) !important;-moz-transform-origin:top left !important;}html.ca-letter-spacing *:not(#ca-a11y-drawer):not(#ca-a11y-drawer *):not(#ca-modal-dialog):not(#ca-modal-dialog *):not(#ca-banner-card):not(#ca-banner-card *):not(#ca-launcher):not(#ca-launcher *){letter-spacing:0.18em !important;word-spacing:0.28em !important;}html.ca-line-height *:not(#ca-a11y-drawer):not(#ca-a11y-drawer *):not(#ca-modal-dialog):not(#ca-modal-dialog *):not(#ca-banner-card):not(#ca-banner-card *):not(#ca-launcher):not(#ca-launcher *){line-height:2.3 !important;}html.ca-contrast-dark{background-color:#0b0f19 !important;color:#f8fafc !important;}html.ca-contrast-dark *:not(#ca-a11y-drawer):not(#ca-a11y-drawer *):not(#ca-modal-dialog):not(#ca-modal-dialog *):not(#ca-banner-card):not(#ca-banner-card *):not(#ca-launcher):not(#ca-launcher *):not(#ca-reading-guide-line):not(#ca-reading-mask-top):not(#ca-reading-mask-bottom){background-color:#0f172a !important;color:#f1f5f9 !important;border-color:#334155 !important;box-shadow:none !important;text-shadow:none !important;-webkit-text-fill-color:#f1f5f9 !important;background-image:none !important;}html.ca-contrast-dark a:not(#ca-a11y-drawer a):not(#ca-modal-dialog a):not(#ca-banner-card a):not(#ca-launcher a){color:#60a5fa !important;-webkit-text-fill-color:#60a5fa !important;}html.ca-contrast-dark h1:not(#ca-a11y-drawer h1):not(#ca-modal-dialog h1):not(#ca-banner-card h1),html.ca-contrast-dark h2:not(#ca-a11y-drawer h2):not(#ca-modal-dialog h2):not(#ca-banner-card h2),html.ca-contrast-dark h3:not(#ca-a11y-drawer h3):not(#ca-modal-dialog h3):not(#ca-banner-card h3),html.ca-contrast-dark h4:not(#ca-a11y-drawer h4):not(#ca-modal-dialog h4):not(#ca-banner-card h4),html.ca-contrast-dark h5,html.ca-contrast-dark h6{color:#38bdf8 !important;-webkit-text-fill-color:#38bdf8 !important;}html.ca-contrast-dark button:not(#ca-a11y-drawer button):not(#ca-modal-dialog button):not(#ca-banner-card button):not(#ca-launcher button),html.ca-contrast-dark input:not(#ca-a11y-drawer input):not(#ca-modal-dialog input):not(#ca-banner-card input),html.ca-contrast-dark select:not(#ca-a11y-drawer select):not(#ca-modal-dialog select),html.ca-contrast-dark textarea:not(#ca-a11y-drawer textarea):not(#ca-modal-dialog textarea){background-color:#1e293b !important;color:#f8fafc !important;border-color:#475569 !important;-webkit-text-fill-color:#f8fafc !important;}html.ca-contrast-dark [class*=\"glow\"],html.ca-contrast-dark [class*=\"blob\"],html.ca-contrast-dark [class*=\"gradient-bg\"],html.ca-contrast-dark [class*=\"bg-decoration\"]{opacity:0 !important;}html.ca-contrast-dark img:not(#ca-a11y-drawer img):not(#ca-modal-dialog img):not(#ca-banner-card img):not(#ca-launcher img){filter:brightness(0.8) contrast(1.1) !important;}html.ca-contrast-invert{filter:invert(100%) hue-rotate(180deg) !important;}html.ca-contrast-invert img,html.ca-contrast-invert video,html.ca-contrast-invert picture,html.ca-contrast-invert canvas,html.ca-contrast-invert iframe,html.ca-contrast-invert svg,html.ca-contrast-invert [style*=\"background-image\"],html.ca-contrast-invert #ca-reading-guide-line,html.ca-contrast-invert #ca-reading-mask-top,html.ca-contrast-invert #ca-reading-mask-bottom,html.ca-contrast-invert #ca-modal-dialog,html.ca-contrast-invert #ca-a11y-drawer,html.ca-contrast-invert #ca-launcher,html.ca-contrast-invert #ca-banner-card,html.ca-contrast-invert #ca-banner-backdrop{filter:invert(100%) hue-rotate(180deg) !important;}html.ca-contrast-monochrome{filter:grayscale(100%) !important;}html.ca-contrast-monochrome #ca-a11y-drawer,html.ca-contrast-monochrome #ca-modal-dialog,html.ca-contrast-monochrome #ca-banner-card,html.ca-contrast-monochrome #ca-launcher{filter:grayscale(0%) !important;}html.ca-high-saturation{filter:saturate(250%) !important;}html.ca-high-saturation #ca-a11y-drawer,html.ca-high-saturation #ca-modal-dialog,html.ca-high-saturation #ca-banner-card,html.ca-high-saturation #ca-launcher{filter:saturate(100%) !important;}html.ca-highlight-links a:not(#ca-a11y-drawer a):not(#ca-modal-dialog a):not(#ca-banner-card a):not(#ca-launcher a),html.ca-highlight-links [role=\"link\"]:not(#ca-a11y-drawer [role=\"link\"]):not(#ca-modal-dialog [role=\"link\"]){text-decoration:underline !important;text-decoration-thickness:3px !important;text-underline-offset:3px !important;background-color:#fef08a !important;color:#000000 !important;-webkit-text-fill-color:#000000 !important;font-weight:700 !important;outline:3px solid #ca8a04 !important;outline-offset:2px !important;border-radius:3px !important;padding:2px 4px !important;background-image:none !important;}html.ca-highlight-headings h1:not(#ca-a11y-drawer h1):not(#ca-modal-dialog h1):not(#ca-banner-card h1),html.ca-highlight-headings h2:not(#ca-a11y-drawer h2):not(#ca-modal-dialog h2):not(#ca-banner-card h2),html.ca-highlight-headings h3:not(#ca-a11y-drawer h3):not(#ca-modal-dialog h3):not(#ca-banner-card h3),html.ca-highlight-headings h4:not(#ca-a11y-drawer h4):not(#ca-modal-dialog h4):not(#ca-banner-card h4),html.ca-highlight-headings h5:not(#ca-a11y-drawer h5):not(#ca-modal-dialog h5),html.ca-highlight-headings h6:not(#ca-a11y-drawer h6):not(#ca-modal-dialog h6),html.ca-highlight-headings [role=\"heading\"]:not(#ca-a11y-drawer [role=\"heading\"]):not(#ca-modal-dialog [role=\"heading\"]){outline:3px solid #2563eb !important;outline-offset:6px !important;background-color:rgba(37,99,235,0.18) !important;border-radius:4px !important;padding:4px !important;}html.ca-stop-animations,html.ca-stop-animations *,html.ca-stop-animations *::before,html.ca-stop-animations *::after{animation:none !important;animation-duration:0.001ms !important;animation-delay:0ms !important;animation-iteration-count:1 !important;animation-play-state:paused !important;transition:none !important;transition-duration:0.001ms !important;transition-delay:0ms !important;scroll-behavior:auto !important;}html.ca-stop-animations video,html.ca-stop-animations [class*=\"animation\"],html.ca-stop-animations [class*=\"animate\"],html.ca-stop-animations [class*=\"motion\"],html.ca-stop-animations marquee{animation-play-state:paused !important;}html.ca-big-cursor,html.ca-big-cursor *,html.ca-big-cursor *::before,html.ca-big-cursor *::after{cursor:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpolygon points='4,4 4,40 14,30 22,48 28,45 20,28 32,28' fill='%23ffffff' stroke='%23000000' stroke-width='3' stroke-linejoin='round'/%3E%3C/svg%3E\") 4 4,auto !important;}html.ca-big-cursor-black,html.ca-big-cursor-black *,html.ca-big-cursor-black *::before,html.ca-big-cursor-black *::after{cursor:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpolygon points='4,4 4,40 14,30 22,48 28,45 20,28 32,28' fill='%23000000' stroke='%23ffffff' stroke-width='3' stroke-linejoin='round'/%3E%3C/svg%3E\") 4 4,auto !important;}#ca-reading-guide-line{position:fixed !important;left:0 !important;width:100vw !important;height:8px !important;background:#2563eb !important;box-shadow:0 0 20px rgba(37,99,235,1),0 0 8px rgba(37,99,235,0.85) !important;border-top:2px solid #93c5fd !important;border-bottom:2px solid #1d4ed8 !important;pointer-events:none !important;z-index:2147483647 !important;display:none;top:50%;}#ca-reading-mask-top,#ca-reading-mask-bottom{position:fixed !important;left:0 !important;width:100vw !important;background:rgba(0,0,0,0.82) !important;pointer-events:none !important;z-index:2147483646 !important;display:none;}.ca-speaking-highlight{background:#fde047 !important;color:#0f172a !important;border-radius:4px;box-shadow:0 0 0 3px #eab308 !important;-webkit-text-fill-color:#0f172a !important;}#ca-a11y-drawer,#ca-modal-dialog,#ca-banner-card,#ca-launcher{font-family:var(--ca-font) !important;filter:none !important;}#ca-a11y-drawer *,#ca-modal-dialog *,#ca-banner-card *,#ca-launcher *{letter-spacing:normal !important;word-spacing:normal !important;line-height:normal !important;font-family:var(--ca-font) !important;-webkit-text-fill-color:unset !important;background-image:unset;text-shadow:unset !important;}#ca-a11y-drawer a,#ca-modal-dialog a,#ca-banner-card a,#ca-launcher a{text-decoration:none !important;background-color:transparent !important;color:inherit !important;font-weight:inherit !important;outline:none !important;padding:0 !important;}#ca-a11y-drawer h1,#ca-a11y-drawer h2,#ca-a11y-drawer h3,#ca-a11y-drawer h4,#ca-modal-dialog h1,#ca-modal-dialog h2,#ca-modal-dialog h3,#ca-modal-dialog h4,#ca-banner-card h1,#ca-banner-card h2,#ca-banner-card h3,#ca-banner-card h4{outline:none !important;background-color:transparent !important;color:var(--ca-text-title) !important;}html.ca-contrast-dark #ca-a11y-drawer,html.ca-contrast-dark #ca-modal-dialog .ca-dialog-window,html.ca-contrast-dark #ca-banner-card{background-color:#ffffff !important;color:#0f172a !important;border-color:#e2e8f0 !important;}html.ca-contrast-dark #ca-a11y-drawer *,html.ca-contrast-dark #ca-modal-dialog *,html.ca-contrast-dark #ca-banner-card *{background-color:inherit !important;color:inherit !important;border-color:inherit !important;box-shadow:unset;-webkit-text-fill-color:inherit !important;background-image:unset !important;}html.ca-contrast-dark .ca-a11y-topbar{background:linear-gradient(135deg,#1e40af 0%,#2563eb 100%) !important;color:#ffffff !important;}html.ca-contrast-dark .ca-a11y-topbar *{color:#ffffff !important;-webkit-text-fill-color:#ffffff !important;}html.ca-contrast-dark .ca-square-tool-btn,html.ca-contrast-dark .ca-tool-square-card{background-color:#f8fafc !important;color:#334155 !important;border-color:#e2e8f0 !important;}html.ca-contrast-dark .ca-square-tool-btn.ca-active,html.ca-contrast-dark .ca-tool-square-card.ca-active{background-color:#eff6ff !important;border-color:#2563eb !important;}html.ca-contrast-dark .ca-section-title,html.ca-contrast-dark .ca-a11y-section-title{color:#334155 !important;-webkit-text-fill-color:#334155 !important;}html.ca-contrast-dark .ca-btn{background-color:var(--ca-primary) !important;color:#ffffff !important;}html.ca-contrast-dark .ca-clean-header,html.ca-contrast-dark .ca-clean-body,html.ca-contrast-dark .ca-clean-footer,html.ca-contrast-dark .ca-a11y-footer{background-color:#ffffff !important;}html.ca-contrast-dark #ca-banner-backdrop{background-color:rgba(0,0,0,0.2) !important;}@media (max-width:640px){#ca-launcher{bottom:16px;}#ca-launcher.ca-pos-bottom-right{right:16px;}#ca-launcher.ca-pos-bottom-left{left:16px;}.ca-split-circle{width:48px;height:48px;}.ca-dialog-window{border-radius:var(--ca-radius-lg);max-height:94vh;}.ca-clean-header{padding:16px 20px;}.ca-clean-body{padding:16px 20px;}.ca-fluid-card{padding:12px 14px;}.ca-clean-footer{padding:14px 20px;flex-direction:column-reverse;}.ca-footer-actions-right{width:100%;flex-direction:column;}.ca-footer-actions-right .ca-btn{width:100%;}.ca-tools-grid{grid-template-columns:1fr;}#ca-a11y-drawer{width:100vw;}}";
    document.head.appendChild(style);
  }
})();

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
    
    backdrop: {
      show: true,
      blur: '8px',
      background: 'rgba(0, 0, 0, 0.3)'
    },

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

  function normalizeConfig(options = {}) {
    const res = { ...options };

    // Support prompt.position or icon.position ("bottomRight" -> "bottom-right")
    const pos = (res.prompt && res.prompt.position) || (res.icon && res.icon.position) || res.position;
    if (pos) {
      const p = String(pos).toLowerCase();
      if (p.includes('left')) res.position = 'bottom-left';
      else if (p.includes('right')) res.position = 'bottom-right';
      else if (p === 'none') res.position = 'none';
    }

    // Support backdrop object or boolean
    if (typeof res.backdrop === 'boolean') {
      res.backdrop = { show: res.backdrop, blur: '8px', background: 'rgba(0, 0, 0, 0.3)' };
    } else if (res.backdrop && typeof res.backdrop === 'object') {
      res.backdrop = {
        show: res.backdrop.show !== false,
        blur: res.backdrop.blur || '8px',
        background: res.backdrop.background || 'rgba(0, 0, 0, 0.3)'
      };
    }

    // Support consentTypes array format (Silktide / Standard format)
    if (Array.isArray(res.consentTypes)) {
      res.categories = { ...defaults.categories };
      res.consentTypes.forEach(ct => {
        const id = String(ct.id || '').toLowerCase();
        if (id === 'essential' || id === 'necessary') res.categories.necessary = true;
        else if (id === 'analytics') res.categories.analytics = Boolean(ct.defaultValue);
        else if (id === 'marketing' || id === 'advertisement') res.categories.advertisement = Boolean(ct.defaultValue);
        else if (id === 'functional') res.categories.functional = Boolean(ct.defaultValue);
      });
    }

    return res;
  }

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

    // 5. Backdrop Blur & Background
    if (cfg.backdrop) {
      const show = typeof cfg.backdrop === 'boolean' ? cfg.backdrop : (cfg.backdrop.show !== false);
      if (show) {
        const blur = (typeof cfg.backdrop === 'object' && cfg.backdrop.blur) ? cfg.backdrop.blur : '8px';
        const bg = (typeof cfg.backdrop === 'object' && cfg.backdrop.background) ? cfg.backdrop.background : 'rgba(0, 0, 0, 0.3)';
        root.style.setProperty('--ca-backdrop-blur', blur);
        root.style.setProperty('--backdropBackgroundBlur', blur);
        root.style.setProperty('--ca-backdrop-bg', bg);
        root.style.setProperty('--backdropBackgroundColor', bg);
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
      brandLogo: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>`,
      arrowRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`
    };
    return svgs[name] || '';
  }

  function injectDOM() {
    // 0. Ensure Google Lexend Font is loaded for Dyslexia accessibility
    if (!document.getElementById('ca-lexend-font')) {
      const link = document.createElement('link');
      link.id = 'ca-lexend-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(link);
    }

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
          const g = document.getElementById('ca-reading-guide-line');
          if (g) g.style.top = (e.clientY - 4) + 'px';
        }
        if (a11yState.readingMask) {
          const mTop = document.getElementById('ca-reading-mask-top');
          const mBot = document.getElementById('ca-reading-mask-bottom');
          if (mTop && mBot) {
            const slitHeight = 120;
            const topH = Math.max(0, e.clientY - (slitHeight / 2));
            const botY = e.clientY + (slitHeight / 2);
            mTop.style.top = '0';
            mTop.style.height = topH + 'px';
            mBot.style.top = botY + 'px';
            mBot.style.height = Math.max(0, window.innerHeight - botY) + 'px';
          }
        }
      });
    }

    // 2. The Unified Split Circle (Half Cookie / Half Accessibility)
    if (config.position !== 'none' && !document.getElementById('ca-launcher')) {
      const launcher = document.createElement('div');
      launcher.id = 'ca-launcher';
      launcher.className = config.position === 'bottom-left' ? 'ca-pos-bottom-left' : 'ca-pos-bottom-right';

      launcher.innerHTML = `
        <div class="ca-split-circle" id="ca-split-circle" title="Cookie Preferences & AccessiAccess">
          <button class="ca-half-btn ca-half-cookie" id="ca-launcher-cookie" data-tooltip="Cookie & Privacy Preferences" aria-label="Privacy & Cookie Preferences">
            ${getSVG('cookie')}
          </button>
          <button class="ca-half-btn ca-half-a11y" id="ca-launcher-a11y" data-tooltip="AccessiAccess" aria-label="AccessiAccess">
            ${getSVG('a11y')}
          </button>
          <span class="ca-split-badge" id="ca-split-badge" style="display:none;">0</span>
        </div>
      `;
      document.body.appendChild(launcher);
    }

    // 2. Blurred Backdrop for Banner Card (Frosted glass blur)
    if (config.enableConsentBanner && !document.getElementById('ca-banner-backdrop')) {
      const bannerBackdrop = document.createElement('div');
      bannerBackdrop.id = 'ca-banner-backdrop';
      bannerBackdrop.className = 'ca-banner-backdrop';
      document.body.appendChild(bannerBackdrop);
    }

    // 2. Non-Invasive Bottom-Right Banner Card (Screenshot 1 & 3)
    if (config.enableConsentBanner && !document.getElementById('ca-banner-card')) {
      const bannerCard = document.createElement('div');
      bannerCard.id = 'ca-banner-card';
      bannerCard.className = 'ca-banner-card';
      bannerCard.setAttribute('role', 'region');
      bannerCard.setAttribute('aria-label', 'Cookie Consent Banner');

      const bannerText = (config.text && config.text.prompt && config.text.prompt.description) 
        ? config.text.prompt.description 
        : 'We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic.';
      const acceptText = (config.text && config.text.prompt && config.text.prompt.acceptAllButtonText) || 'Accept all';
      const rejectText = (config.text && config.text.prompt && config.text.prompt.rejectNonEssentialButtonText) || 'Reject non-essential';
      const prefText = (config.text && config.text.prompt && config.text.prompt.preferencesButtonText) || 'Preferences';

      bannerCard.innerHTML = `
        <div class="ca-banner-text">
          ${bannerText}
        </div>
        <div class="ca-banner-actions">
          <button class="ca-banner-pill-btn ca-btn-accept" id="ca-banner-accept">${escapeHTML(acceptText)}</button>
          <button class="ca-banner-pill-btn ca-btn-reject" id="ca-banner-reject">${escapeHTML(rejectText)}</button>
          <button class="ca-banner-text-btn" id="ca-banner-preferences">${escapeHTML(prefText)}</button>
          <div class="ca-banner-logo" title="CookieAccess">
            ${getSVG('brandLogo')}
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

      const prefTitle = (config.text && config.text.preferences && config.text.preferences.title) || 'Customize your cookie preferences';
      const prefDesc = (config.text && config.text.preferences && config.text.preferences.description) 
        ? config.text.preferences.description 
        : 'We respect your right to privacy. You can choose not to allow some types of cookies. Your cookie preferences will apply across our website.';
      const saveText = (config.text && config.text.preferences && config.text.preferences.saveButtonText) || 'Save and close';

      modalBackdrop.innerHTML = `
        <div class="ca-dialog-window" id="ca-dialog-window">
          <div class="ca-pref-header">
            <h2 class="ca-pref-title">${escapeHTML(prefTitle)}</h2>
            <button class="ca-pref-close-btn" id="ca-modal-close-btn" aria-label="Close preferences">
              ${getSVG('close')}
            </button>
          </div>

          <div class="ca-pref-subtitle">
            ${prefDesc}
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
              <button class="ca-banner-pill-btn ca-btn-accept" id="ca-modal-save">${escapeHTML(saveText)}</button>
              <button class="ca-banner-pill-btn ca-btn-reject" id="ca-modal-reject">Reject non-essential</button>
            </div>
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
      drawer.setAttribute('aria-label', 'AccessiAccess');

      drawer.innerHTML = `
        <div class="ca-a11y-topbar">
          <div class="ca-a11y-topbar-title">
            <span style="font-size:18px;">♿</span>
            <span>AccessiAccess <span style="font-size:11.5px;font-weight:500;opacity:0.85;">(Option+A)</span></span>
          </div>
          <div class="ca-a11y-topbar-actions">
            <button class="ca-a11y-icon-btn" id="ca-a11y-reset-btn" title="Reset all adjustments">${getSVG('reset')}</button>
            <button class="ca-a11y-icon-btn" id="ca-a11y-close-btn" aria-label="Close AccessiAccess panel">${getSVG('close')}</button>
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
              <span>AccessiAccess Profiles</span>
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

          <!-- Section: AccessiAccess Adjustments -->
          <div class="ca-a11y-section-title">AccessiAccess Adjustments</div>

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

            <div class="ca-square-tool-btn" id="ca-tool-saturation" title="High Saturation">
              <div class="ca-square-tool-icon">🌈</div>
              <div class="ca-square-tool-title">High Saturation</div>
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
          <span><strong style="color:#0f172a;">AccessiAccess</strong> by CookieAccess</span>
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
    if (elements.bannerBackdrop) {
      elements.bannerBackdrop.addEventListener('click', () => {
        closeBannerCard();
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

    // 2. Bigger Text — the font card itself is clickable too (cycles sizes)
    const fontCard = document.querySelector('.ca-adjust-font-card');
    if (fontCard) {
      fontCard.addEventListener('click', (e) => {
        // Don't cycle if they clicked the +/- stepper buttons (those have their own handlers)
        if (e.target.closest('#ca-font-dec') || e.target.closest('#ca-font-inc')) return;
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
          speakText('AccessiAccess voice enabled. Click any text to read aloud.');
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
    if (a11yState.textSize !== 100) {
      docEl.classList.add(`ca-text-${a11yState.textSize}`);
      if (document.body) {
        document.body.style.zoom = (a11yState.textSize / 100);
      }
    } else {
      if (document.body) {
        document.body.style.zoom = '';
      }
    }
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

    // 6. Stop Motion — also pause/resume all <video> elements
    docEl.classList.toggle('ca-stop-animations', a11yState.stopAnimations);
    toggleCardActive('ca-tool-stop-animations', a11yState.stopAnimations);
    try {
      document.querySelectorAll('video').forEach(function(v) {
        if (a11yState.stopAnimations) { v.pause(); } else { /* leave as-is */ }
      });
    } catch (e) {}

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

    // 8. Reading Guide — force inline styles so no host CSS can override
    const guideEl = document.getElementById('ca-reading-guide-line');
    if (guideEl) {
      if (a11yState.readingGuide) {
        guideEl.style.cssText = 'display:block !important; position:fixed !important; left:0 !important; width:100vw !important; height:8px !important; background:#2563eb !important; box-shadow:0 0 20px rgba(37,99,235,1),0 0 8px rgba(37,99,235,0.85) !important; border-top:2px solid #93c5fd !important; border-bottom:2px solid #1d4ed8 !important; pointer-events:none !important; z-index:2147483647 !important; top:' + (window.innerHeight / 2) + 'px;';
      } else {
        guideEl.style.display = 'none';
      }
      toggleCardActive('ca-tool-reading-guide', a11yState.readingGuide);
    }

    // 9. Reading Mask — force inline styles so no host CSS can override
    const maskTopEl = document.getElementById('ca-reading-mask-top');
    const maskBotEl = document.getElementById('ca-reading-mask-bottom');
    if (maskTopEl && maskBotEl) {
      const showMask = a11yState.readingMask;
      if (showMask) {
        const slitHeight = 120;
        const mid = window.innerHeight / 2;
        const topH = Math.max(0, mid - (slitHeight / 2));
        const botY = mid + (slitHeight / 2);
        maskTopEl.style.cssText = 'display:block !important; position:fixed !important; left:0 !important; width:100vw !important; background:rgba(0,0,0,0.82) !important; pointer-events:none !important; z-index:2147483646 !important; top:0; height:' + topH + 'px;';
        maskBotEl.style.cssText = 'display:block !important; position:fixed !important; left:0 !important; width:100vw !important; background:rgba(0,0,0,0.82) !important; pointer-events:none !important; z-index:2147483646 !important; top:' + botY + 'px; height:' + Math.max(0, window.innerHeight - botY) + 'px;';
      } else {
        maskTopEl.style.display = 'none';
        maskBotEl.style.display = 'none';
      }
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
    const card = document.getElementById('ca-banner-card') || elements.bannerCard;
    const backdrop = document.getElementById('ca-banner-backdrop') || elements.bannerBackdrop;
    if (card) card.classList.add('ca-active');
    if (backdrop) backdrop.classList.add('ca-open');
  }

  function closeBannerCard() {
    const card = document.getElementById('ca-banner-card') || elements.bannerCard;
    const backdrop = document.getElementById('ca-banner-backdrop') || elements.bannerBackdrop;
    if (card) card.classList.remove('ca-active');
    if (backdrop) backdrop.classList.remove('ca-open');
  }

  function openPreferencesModal() {
    const modal = document.getElementById('ca-modal-dialog') || elements.modalDialog;
    if (modal) {
      const saved = getSavedConsent();
      if (saved) syncToggles(saved.categories);
      modal.classList.add('ca-active');
    }
  }

  function closePreferencesModal() {
    const modal = document.getElementById('ca-modal-dialog') || elements.modalDialog;
    if (modal) modal.classList.remove('ca-active');
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
    config = normalizeConfig({ ...config, ...options });
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
    config = normalizeConfig({ ...defaults, ...options });

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
    getA11yState: () => ({ ...a11yState }),
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

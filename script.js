
// ========================================
// Theme System (multiple themes)
// - stores: principal_theme = 'system' | 'dark' | 'light' | 'paper' | 'oled' | 'apple-dark' | 'graphite'
// - applies via: <html data-theme="..."> (or no attr for system)
// ========================================
(function initTheme() {
    const THEME_KEY = 'principal_theme';
    // Keep the list tight (less overwhelming). You can re-add others later.
    const THEMES = [
        { id: 'system', label: 'System', icon: 'fas fa-circle-half-stroke' },
        { id: 'dark', label: 'Dark', icon: 'fas fa-moon' },
        { id: 'oled', label: 'OLED Black', icon: 'fas fa-circle' },
        { id: 'light', label: 'Light', icon: 'fas fa-sun' },
        { id: 'apple-dark', label: 'Apple Dark', icon: 'fab fa-apple' },
        { id: 'paper', label: 'Paper', icon: 'fas fa-book-open' }
    ];

    // User settings (site-wide)
    const SETTINGS = {
        fontScale: { key: 'principal_font_scale', default: 'md', values: ['sm', 'md', 'lg', 'xl'] },
        codeScale: { key: 'principal_code_scale', default: 'md', values: ['sm', 'md', 'lg'] },
        readingWidth: { key: 'principal_reading_width', default: 'normal', values: ['narrow', 'normal', 'wide'] },
        motion: { key: 'principal_motion', default: 'system', values: ['system', 'reduce'] },
        codeWrap: { key: 'principal_code_wrap', default: 'off', values: ['off', 'on'] },
    };

    const readSetting = (k, def) => {
        try {
            const v = localStorage.getItem(k);
            return v ?? def;
        } catch {
            return def;
        }
    };

    const writeSetting = (k, v) => {
        try { localStorage.setItem(k, v); } catch { }
    };

    const applySettingAttrs = () => {
        const root = document.documentElement;

        const fontScale = readSetting(SETTINGS.fontScale.key, SETTINGS.fontScale.default);
        const codeScale = readSetting(SETTINGS.codeScale.key, SETTINGS.codeScale.default);
        const readingWidth = readSetting(SETTINGS.readingWidth.key, SETTINGS.readingWidth.default);
        const motion = readSetting(SETTINGS.motion.key, SETTINGS.motion.default);
        const codeWrap = readSetting(SETTINGS.codeWrap.key, SETTINGS.codeWrap.default);

        // Only set if within allowed values (prevents injection)
        if (SETTINGS.fontScale.values.includes(fontScale)) root.setAttribute('data-font-scale', fontScale);
        if (SETTINGS.codeScale.values.includes(codeScale)) root.setAttribute('data-code-scale', codeScale);
        if (SETTINGS.readingWidth.values.includes(readingWidth)) root.setAttribute('data-reading-width', readingWidth);
        if (SETTINGS.codeWrap.values.includes(codeWrap)) root.setAttribute('data-code-wrap', codeWrap);

        // motion: system means remove, reduce means set
        if (motion === 'reduce') root.setAttribute('data-motion', 'reduce');
        else root.removeAttribute('data-motion');
    };

    const getSavedTheme = () => localStorage.getItem(THEME_KEY) || 'system';
    const setThemeAttr = (themeId) => {
        const root = document.documentElement;
        if (!themeId || themeId === 'system') root.removeAttribute('data-theme');
        else root.setAttribute('data-theme', themeId);

        // Also keep highlight.js theme in sync
        ensureHljsTheme(resolveActualTheme());
    };

    const HLJS_THEME_ID = 'hljs-theme';
    const HLJS_THEMES = {
        dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css',
        light: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css',
    };

    const resolveHljsMode = (themeId) => {
        // Light-ish themes should use light syntax colors
        return (themeId === 'light' || themeId === 'paper') ? 'light' : 'dark';
    };

    const ensureHljsTheme = (themeId) => {
        if (!document || !document.head) return;

        const mode = resolveHljsMode(themeId || resolveActualTheme());
        const href = HLJS_THEMES[mode];
        if (!href) return;

        let link = document.getElementById(HLJS_THEME_ID);
        if (!link) {
            link = document.createElement('link');
            link.id = HLJS_THEME_ID;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }

        if (link.getAttribute('href') !== href) link.setAttribute('href', href);
    };

    // Apply ASAP (before DOMContentLoaded) to reduce flash.
    // NOTE: ensureHljsTheme() needs resolveActualTheme() so we should not call it
    // before resolveActualTheme is defined.
    const initialTheme = getSavedTheme();
    const root = document.documentElement;
    if (!initialTheme || initialTheme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', initialTheme);

    // Apply user settings ASAP too
    applySettingAttrs();

    const resolveActualTheme = () => {
        const selected = getSavedTheme();
        if (selected !== 'system') return selected;
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        return prefersLight ? 'light' : 'dark';
    };

    const updateToggleIcon = () => {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;
        const icon = btn.querySelector('i');
        if (!icon) return;
        const selected = getSavedTheme();
        const meta = THEMES.find(t => t.id === selected) || THEMES[0];
        icon.className = meta.icon;
        btn.title = `Theme: ${meta.label}`;
        btn.setAttribute('aria-label', `Theme: ${meta.label}`);
    };

    const ensureThemeMenu = () => {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;
        if (document.getElementById('theme-menu')) return;

        const menu = document.createElement('div');
        menu.id = 'theme-menu';
        menu.className = 'theme-menu';
        menu.setAttribute('role', 'menu');
        menu.innerHTML = `
            <div class="theme-menu-title">Theme</div>
            ${THEMES.map(t => `
                <button class="theme-option" type="button" data-theme="${t.id}">
                    <span class="theme-option-left">
                        <i class="${t.icon}"></i>
                        <span>${t.label}</span>
                    </span>
                    <span class="theme-check" aria-hidden="true">✓</span>
                </button>
            `).join('')}
        `;

        // Attach near navbar (works across pages)
        document.body.appendChild(menu);

        const closeMenu = () => menu.classList.remove('open');
        const openMenu = () => {
            // Position under the button
            const r = btn.getBoundingClientRect();
            const top = Math.round(r.bottom + 10 + window.scrollY);
            const right = Math.round(window.innerWidth - r.right - 8);
            menu.style.top = `${top}px`;
            menu.style.right = `${right}px`;

            // mark active option
            const selected = getSavedTheme();
            menu.querySelectorAll('.theme-option').forEach(opt => {
                const isActive = opt.dataset.theme === selected;
                opt.classList.toggle('active', isActive);
            });

            menu.classList.add('open');
        };

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (menu.classList.contains('open')) closeMenu();
            else openMenu();
        });

        menu.addEventListener('click', (e) => {
            const target = e.target.closest('.theme-option');
            if (!target) return;
            const themeId = target.dataset.theme;
            localStorage.setItem(THEME_KEY, themeId);
            setThemeAttr(themeId);
            updateToggleIcon();
            closeMenu();
        });

        document.addEventListener('click', () => closeMenu());
        window.addEventListener('resize', () => closeMenu());
        window.addEventListener('scroll', () => closeMenu(), { passive: true });

        // If system theme changes and user selected system, update visuals.
        if (window.matchMedia) {
            const mq = window.matchMedia('(prefers-color-scheme: light)');
            const onChange = () => {
                if (getSavedTheme() === 'system') {
                    setThemeAttr('system');
                    updateToggleIcon();
                }
            };
            // Safari uses addListener
            if (mq.addEventListener) mq.addEventListener('change', onChange);
            else if (mq.addListener) mq.addListener(onChange);
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        // Backward compat: migrate old value ('dark'|'light') if present.
        const old = localStorage.getItem(THEME_KEY);
        if (old === 'dark' || old === 'light') {
            // keep
        } else if (!old) {
            // default to system for new behavior
            localStorage.setItem(THEME_KEY, 'system');
        }

        // Remove any old class-based theme usage
        document.body.classList.remove('light-mode');

        // Ensure syntax theme is correct after DOM is ready
        ensureHljsTheme(resolveActualTheme());

        updateToggleIcon();
        ensureThemeMenu();

        // Settings panel
        (function initSettingsPanel() {
            if (document.getElementById('settings-fab')) return;

            const fab = document.createElement('button');
            fab.id = 'settings-fab';
            fab.className = 'settings-fab';
            fab.type = 'button';
            fab.title = 'Settings';
            fab.setAttribute('aria-label', 'Settings');
            fab.innerHTML = '<i class="fas fa-sliders"></i>';

            const panel = document.createElement('div');
            panel.id = 'settings-panel';
            panel.className = 'settings-panel';
            panel.innerHTML = `
              <div class="settings-title">
                <h4>Settings</h4>
                <button class="settings-close" type="button" aria-label="Close">Esc</button>
              </div>

              <div class="setting-group" data-setting="fontScale">
                <div class="setting-label">Font Size</div>
                <div class="pill-row">
                  <button class="pill" type="button" data-value="sm">Sm</button>
                  <button class="pill" type="button" data-value="md">Md</button>
                  <button class="pill" type="button" data-value="lg">Lg</button>
                  <button class="pill" type="button" data-value="xl">Xl</button>
                </div>
              </div>

              <div class="setting-group" data-setting="readingWidth">
                <div class="setting-label">Reading Width</div>
                <div class="pill-row">
                  <button class="pill" type="button" data-value="narrow">Narrow</button>
                  <button class="pill" type="button" data-value="normal">Normal</button>
                  <button class="pill" type="button" data-value="wide">Wide</button>
                </div>
              </div>

              <div class="setting-group" data-setting="codeScale">
                <div class="setting-label">Code Size</div>
                <div class="pill-row">
                  <button class="pill" type="button" data-value="sm">Sm</button>
                  <button class="pill" type="button" data-value="md">Md</button>
                  <button class="pill" type="button" data-value="lg">Lg</button>
                </div>
              </div>

              <div class="setting-group" data-setting="codeWrap">
                <div class="setting-label">Code Wrap</div>
                <div class="pill-row">
                  <button class="pill" type="button" data-value="off">Off</button>
                  <button class="pill" type="button" data-value="on">On</button>
                </div>
              </div>

              <div class="setting-group" data-setting="motion">
                <div class="setting-label">Motion</div>
                <div class="pill-row">
                  <button class="pill" type="button" data-value="system">System</button>
                  <button class="pill" type="button" data-value="reduce">Reduce</button>
                </div>
              </div>
            `;

            const close = () => panel.classList.remove('open');
            const open = () => {
                syncPills();
                panel.classList.add('open');
            };

            const syncPills = () => {
                const mapping = {
                    fontScale: SETTINGS.fontScale,
                    codeScale: SETTINGS.codeScale,
                    readingWidth: SETTINGS.readingWidth,
                    motion: SETTINGS.motion,
                    codeWrap: SETTINGS.codeWrap,
                };
                panel.querySelectorAll('[data-setting]').forEach(group => {
                    const name = group.getAttribute('data-setting');
                    const meta = mapping[name];
                    if (!meta) return;
                    const active = readSetting(meta.key, meta.default);
                    group.querySelectorAll('.pill').forEach(p => {
                        p.classList.toggle('active', p.dataset.value === active);
                    });
                });
            };

            document.body.appendChild(fab);
            document.body.appendChild(panel);

            fab.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (panel.classList.contains('open')) close();
                else open();
            });

            panel.querySelector('.settings-close')?.addEventListener('click', (e) => {
                e.preventDefault();
                close();
            });

            panel.addEventListener('click', (e) => {
                const pill = e.target.closest('.pill');
                if (!pill) return;
                const group = pill.closest('[data-setting]');
                if (!group) return;

                const name = group.getAttribute('data-setting');
                const value = pill.dataset.value;

                if (name === 'fontScale') writeSetting(SETTINGS.fontScale.key, value);
                if (name === 'codeScale') writeSetting(SETTINGS.codeScale.key, value);
                if (name === 'readingWidth') writeSetting(SETTINGS.readingWidth.key, value);
                if (name === 'motion') writeSetting(SETTINGS.motion.key, value);
                if (name === 'codeWrap') writeSetting(SETTINGS.codeWrap.key, value);

                applySettingAttrs();
                syncPills();
            });

            // Close on outside click
            document.addEventListener('click', () => close());
            // Close on escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') close();
            });
        })();

        // expose for debugging
        window.__principalTheme = {
            get: getSavedTheme,
            set: (t) => { localStorage.setItem(THEME_KEY, t); setThemeAttr(t); updateToggleIcon(); },
            actual: resolveActualTheme,
            list: () => THEMES.map(t => t.id)
        };

        window.__principalSettings = {
            apply: applySettingAttrs,
            get: () => ({
                fontScale: readSetting(SETTINGS.fontScale.key, SETTINGS.fontScale.default),
                codeScale: readSetting(SETTINGS.codeScale.key, SETTINGS.codeScale.default),
                readingWidth: readSetting(SETTINGS.readingWidth.key, SETTINGS.readingWidth.default),
                motion: readSetting(SETTINGS.motion.key, SETTINGS.motion.default),
                codeWrap: readSetting(SETTINGS.codeWrap.key, SETTINGS.codeWrap.default),
            })
        };
    });
})();

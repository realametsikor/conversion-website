/* Reusable ad component - injects real ads into placeholder containers
   Usage: Add <script src="/components/ads.js"></script> before </body>

   Ad types by position class:
   - .ad-banner-top / .ad-between-sections: 728x90 banner ad (iframe)
   - .ad-inline / .ad-native (fallback): Native content widget
   - .ad-sidebar-slot: 160x600 sidebar ad (iframe)
   - .ad-in-feed: In-feed native ad (blends with content grids)
   - .ad-responsive: Auto-sizes (728x90 desktop / 300x250 mobile)
   - .ad-post-action: Shown after user completes an action
   - .ad-social-bar / data-social-bar: Social bar (loaded once globally)
*/
(function () {
    'use strict';

    /* ── Ad configuration ─────────────────────────────────────── */
    var ADS = {
        native: {
            containerId: 'container-9db21a06b90a8899fe94021a2b27023f',
            scriptSrc: 'https://pl28817528.effectivegatecpm.com/9db21a06b90a8899fe94021a2b27023f/invoke.js'
        },
        banner: {
            key: 'a1702819e0322a14efc53c7493ded2d6',
            scriptSrc: 'https://www.highperformanceformat.com/a1702819e0322a14efc53c7493ded2d6/invoke.js',
            width: 728,
            height: 90
        },
        sidebar: {
            key: 'df3cd1cc2d629e3ce9352e7e5c0c195f',
            scriptSrc: 'https://www.highperformanceformat.com/df3cd1cc2d629e3ce9352e7e5c0c195f/invoke.js',
            width: 160,
            height: 600
        },
        socialBar: {
            scriptSrc: 'https://pl28824927.effectivegatecpm.com/79/3d/f7/793df707f3d8d6151d45e96bc3569418.js'
        }
    };

    /* ── Helpers ────────────────────────────────────────────────── */

    /* Lazy-load an ad only when its container scrolls into view */
    function lazyLoad(el, initFn) {
        if (!('IntersectionObserver' in window)) {
            initFn(el);
            return;
        }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    observer.unobserve(el);
                    initFn(el);
                }
            });
        }, { rootMargin: '200px' });
        observer.observe(el);
    }

    /* Append a script tag asynchronously */
    function loadScript(src, parent) {
        var s = document.createElement('script');
        s.async = true;
        s.setAttribute('data-cfasync', 'false');
        s.src = src;
        (parent || document.body).appendChild(s);
    }

    /* Add professional "Advertisement" disclosure label */
    function addDisclosure(el) {
        if (el.querySelector('.ad-disclosure')) return;
        var label = document.createElement('span');
        label.className = 'ad-disclosure';
        label.textContent = 'Advertisement';
        el.insertBefore(label, el.firstChild);
    }

    /* Mark element as loaded (removes placeholder styling) */
    function markLoaded(el) {
        el.classList.add('ad-loaded');
        addDisclosure(el);
    }

    /* Detect mobile viewport */
    function isMobile() {
        return window.innerWidth < 768;
    }

    /* ── Banner ad (728x90 iframe) ────────────────────────────── */
    function initBannerAd(el) {
        el.innerHTML = '';
        markLoaded(el);
        var optScript = document.createElement('script');
        optScript.textContent = "atOptions = { 'key' : '" + ADS.banner.key + "', 'format' : 'iframe', 'height' : " + ADS.banner.height + ", 'width' : " + ADS.banner.width + ", 'params' : {} };";
        el.appendChild(optScript);
        loadScript(ADS.banner.scriptSrc, el);
    }

    /* ── Native content widget ────────────────────────────────── */
    var nativeCount = 0;
    function initNativeAd(el) {
        el.innerHTML = '';
        markLoaded(el);
        nativeCount++;
        if (nativeCount <= 1) {
            var div = document.createElement('div');
            div.id = ADS.native.containerId;
            el.appendChild(div);
            loadScript(ADS.native.scriptSrc, el);
        } else {
            /* Additional native positions fall back to banner format */
            initBannerAd(el);
        }
    }

    /* ── Sidebar 160x600 ad ────────────────────────────────────── */
    function initSidebarAd(el) {
        el.innerHTML = '';
        markLoaded(el);
        var optScript = document.createElement('script');
        optScript.textContent = "atOptions = { 'key' : '" + ADS.sidebar.key + "', 'format' : 'iframe', 'height' : " + ADS.sidebar.height + ", 'width' : " + ADS.sidebar.width + ", 'params' : {} };";
        el.appendChild(optScript);
        loadScript(ADS.sidebar.scriptSrc, el);
    }

    /* ── Responsive ad (auto-sizes: 728x90 on desktop, 300x250 on mobile) ── */
    function initResponsiveAd(el) {
        el.innerHTML = '';
        markLoaded(el);
        if (isMobile()) {
            /* Mobile: use native content widget for better RPM */
            initNativeAd(el);
        } else {
            /* Desktop: use banner */
            initBannerAd(el);
        }
    }

    /* ── In-feed ad (blends with content) ──────────────────────── */
    function initInFeedAd(el) {
        el.innerHTML = '';
        markLoaded(el);
        /* Use native ad for in-feed since it blends better with content */
        var div = document.createElement('div');
        div.id = ADS.native.containerId + '-feed-' + Math.random().toString(36).substr(2, 6);
        el.appendChild(div);
        /* Fall back to banner if native already used */
        if (nativeCount > 0) {
            initBannerAd(el);
        } else {
            nativeCount++;
            div.id = ADS.native.containerId;
            loadScript(ADS.native.scriptSrc, el);
        }
    }

    /* ── Social bar (global, once) ─────────────────────────────── */
    var socialBarLoaded = false;
    function initSocialBar() {
        if (socialBarLoaded) return;
        socialBarLoaded = true;
        loadScript(ADS.socialBar.scriptSrc);
    }

    /* ── Bootstrap all ads on the page ─────────────────────────── */
    function bootstrap() {
        var processed = [];

        /* Banner top ads → 728x90 */
        var bannerTops = document.querySelectorAll('.ad-banner-top');
        for (var i = 0; i < bannerTops.length; i++) {
            processed.push(bannerTops[i]);
            (function (el) { lazyLoad(el, initBannerAd); })(bannerTops[i]);
        }

        /* Between-sections ads → 728x90 */
        var betweens = document.querySelectorAll('.ad-between-sections');
        for (var j = 0; j < betweens.length; j++) {
            processed.push(betweens[j]);
            (function (el) { lazyLoad(el, initBannerAd); })(betweens[j]);
        }

        /* Inline ads → native content widget */
        var inlines = document.querySelectorAll('.ad-inline');
        for (var k = 0; k < inlines.length; k++) {
            processed.push(inlines[k]);
            (function (el) { lazyLoad(el, initNativeAd); })(inlines[k]);
        }

        /* Responsive ads → auto-size based on viewport */
        var responsives = document.querySelectorAll('.ad-responsive');
        for (var r = 0; r < responsives.length; r++) {
            processed.push(responsives[r]);
            (function (el) { lazyLoad(el, initResponsiveAd); })(responsives[r]);
        }

        /* In-feed ads → blends with content grids */
        var infeeds = document.querySelectorAll('.ad-in-feed');
        for (var f = 0; f < infeeds.length; f++) {
            processed.push(infeeds[f]);
            (function (el) { lazyLoad(el, initInFeedAd); })(infeeds[f]);
        }

        /* Post-action ads → shown after tool use */
        var postActions = document.querySelectorAll('.ad-post-action');
        for (var p = 0; p < postActions.length; p++) {
            processed.push(postActions[p]);
            (function (el) { lazyLoad(el, initResponsiveAd); })(postActions[p]);
        }

        /* Any remaining .ad-native elements not yet handled */
        var natives = document.querySelectorAll('.ad-native');
        for (var l = 0; l < natives.length; l++) {
            var already = false;
            for (var m = 0; m < processed.length; m++) {
                if (processed[m] === natives[l]) { already = true; break; }
            }
            if (!already) {
                (function (el) { lazyLoad(el, initNativeAd); })(natives[l]);
            }
        }

        /* Sidebar ads → 160x600 */
        var sidebars = document.querySelectorAll('.ad-sidebar-slot');
        for (var n = 0; n < sidebars.length; n++) {
            (function (el) { lazyLoad(el, initSidebarAd); })(sidebars[n]);
        }

        /* Social bar — load globally */
        if (document.querySelector('.ad-social-bar') || document.body.hasAttribute('data-social-bar')) {
            initSocialBar();
        }
    }

    /* Run after DOM is ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootstrap);
    } else {
        bootstrap();
    }
})();

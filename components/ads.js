/* Reusable ad component - injects real ads into placeholder containers
   Usage: Add <script src="/components/ads.js"></script> before </body>

   Ad types:
   - .ad-native: Native banner ad (responsive)
   - .ad-sidebar-slot: 160x600 sidebar banner
   - .ad-social-bar: Social bar (loaded once globally)
*/
(function () {
    'use strict';

    /* ── Ad configuration ─────────────────────────────────────── */
    var ADS = {
        native: {
            containerId: 'container-2a4349586e480674cd450313a03915c0',
            scriptSrc: 'https://pl28824919.effectivegatecpm.com/2a4349586e480674cd450313a03915c0/invoke.js'
        },
        sidebar: {
            key: '4874a5a48bb5b62ee0dca15658a996eb',
            scriptSrc: 'https://www.highperformanceformat.com/4874a5a48bb5b62ee0dca15658a996eb/invoke.js',
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

    /* ── Native banner ad ──────────────────────────────────────── */
    var nativeCounter = 0;
    function initNativeAd(el) {
        nativeCounter++;
        var uniqueId = ADS.native.containerId + '-' + nativeCounter;
        var div = document.createElement('div');
        div.id = uniqueId;
        el.innerHTML = '';
        el.appendChild(div);

        var s = document.createElement('script');
        s.async = true;
        s.setAttribute('data-cfasync', 'false');
        s.src = ADS.native.scriptSrc;
        el.appendChild(s);
    }

    /* ── Sidebar 160x600 ad ────────────────────────────────────── */
    function initSidebarAd(el) {
        el.innerHTML = '';
        var optScript = document.createElement('script');
        optScript.textContent = "atOptions = { 'key' : '" + ADS.sidebar.key + "', 'format' : 'iframe', 'height' : " + ADS.sidebar.height + ", 'width' : " + ADS.sidebar.width + ", 'params' : {} };";
        el.appendChild(optScript);
        loadScript(ADS.sidebar.scriptSrc, el);
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
        /* Native banner ads */
        var natives = document.querySelectorAll('.ad-native');
        for (var i = 0; i < natives.length; i++) {
            (function (el) {
                lazyLoad(el, initNativeAd);
            })(natives[i]);
        }

        /* Sidebar ads */
        var sidebars = document.querySelectorAll('.ad-sidebar-slot');
        for (var j = 0; j < sidebars.length; j++) {
            (function (el) {
                lazyLoad(el, initSidebarAd);
            })(sidebars[j]);
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

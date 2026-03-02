/* app.js - Engagement features: favorites, history, dark mode, search autocomplete, PWA, cookie notice, analytics */
(function () {
    'use strict';

    /* ── Tool registry (for autocomplete & linking) ─────────────── */
    var TOOLS = [
        { name: 'PDF to Word', path: '/file-tools/pdf-to-word', cat: 'File Tools' },
        { name: 'Word to PDF', path: '/file-tools/word-to-pdf', cat: 'File Tools' },
        { name: 'Merge PDF', path: '/file-tools/merge-pdf', cat: 'File Tools' },
        { name: 'Split PDF', path: '/file-tools/split-pdf', cat: 'File Tools' },
        { name: 'Compress PDF', path: '/file-tools/compress-pdf', cat: 'File Tools' },
        { name: 'PDF to JPG', path: '/file-tools/pdf-to-jpg', cat: 'File Tools' },
        { name: 'JPG to PDF', path: '/file-tools/jpg-to-pdf', cat: 'File Tools' },
        { name: 'PDF to Excel', path: '/file-tools/pdf-to-excel', cat: 'File Tools' },
        { name: 'Excel to PDF', path: '/file-tools/excel-to-pdf', cat: 'File Tools' },
        { name: 'PDF to PowerPoint', path: '/file-tools/pdf-to-powerpoint', cat: 'File Tools' },
        { name: 'PowerPoint to PDF', path: '/file-tools/powerpoint-to-pdf', cat: 'File Tools' },
        { name: 'Extract Text from PDF', path: '/file-tools/extract-text-from-pdf', cat: 'File Tools' },
        { name: 'Unlock PDF', path: '/file-tools/unlock-pdf', cat: 'File Tools' },
        { name: 'Redact PDF', path: '/file-tools/redact-pdf', cat: 'File Tools' },
        { name: 'Reorder PDF Pages', path: '/file-tools/reorder-pdf-pages', cat: 'File Tools' },
        { name: 'Add Page Numbers PDF', path: '/file-tools/add-page-numbers-pdf', cat: 'File Tools' },
        { name: 'MP4 to MP3', path: '/file-tools/mp4-to-mp3', cat: 'File Tools' },
        { name: 'Merge Audio', path: '/file-tools/merge-audio', cat: 'File Tools' },
        { name: 'Audio Cutter', path: '/file-tools/audio-cutter', cat: 'File Tools' },
        { name: 'Video Trimmer', path: '/file-tools/video-trimmer', cat: 'File Tools' },
        { name: 'Screen Recorder', path: '/file-tools/screen-recorder', cat: 'File Tools' },
        { name: 'Screenshot to PDF', path: '/file-tools/screenshot-to-pdf', cat: 'File Tools' },
        { name: 'Add Subtitles to Video', path: '/file-tools/add-subtitles-to-video', cat: 'File Tools' },
        { name: 'HTML to PDF', path: '/file-tools/html-to-pdf', cat: 'File Tools' },
        { name: 'TXT to PDF', path: '/file-tools/txt-to-pdf', cat: 'File Tools' },
        { name: 'CSV to Excel', path: '/file-tools/csv-to-excel', cat: 'File Tools' },
        { name: 'DOCX to TXT', path: '/file-tools/docx-to-txt', cat: 'File Tools' },
        { name: 'EPUB to PDF', path: '/file-tools/epub-to-pdf', cat: 'File Tools' },
        { name: 'File Metadata Remover', path: '/file-tools/file-metadata-remover', cat: 'File Tools' },
        { name: 'File Checksum Generator', path: '/file-tools/file-checksum-generator', cat: 'File Tools' },
        { name: 'Subtitle Editor', path: '/file-tools/subtitle-editor', cat: 'File Tools' },
        { name: 'JPG to PNG', path: '/file-tools/jpg-to-png', cat: 'File Tools' },
        { name: 'Image Compressor', path: '/image-tools/image-compressor', cat: 'Image Tools' },
        { name: 'Background Remover', path: '/image-tools/background-remover', cat: 'Image Tools' },
        { name: 'Blur Background', path: '/image-tools/blur-background', cat: 'Image Tools' },
        { name: 'Resize Image', path: '/image-tools/resize-image', cat: 'Image Tools' },
        { name: 'HEIC to JPG', path: '/image-tools/heic-to-jpg', cat: 'Image Tools' },
        { name: 'QR Code Generator', path: '/image-tools/qr-code-generator', cat: 'Image Tools' },
        { name: 'Barcode Generator', path: '/image-tools/barcode-generator', cat: 'Image Tools' },
        { name: 'Signature Generator', path: '/image-tools/signature-generator', cat: 'Image Tools' },
        { name: 'Collage Maker', path: '/image-tools/collage-maker', cat: 'Image Tools' },
        { name: 'Screenshot Mockup Generator', path: '/image-tools/screenshot-mockup-generator', cat: 'Image Tools' },
        { name: 'Favicon Generator', path: '/image-tools/favicon-generator', cat: 'Image Tools' },
        { name: 'YouTube Thumbnail Maker', path: '/image-tools/youtube-thumbnail-maker', cat: 'Image Tools' },
        { name: 'YouTube Banner Maker', path: '/image-tools/youtube-banner-maker', cat: 'Image Tools' },
        { name: 'Photo Filters Editor', path: '/image-tools/photo-filters-editor', cat: 'Image Tools' },
        { name: 'Color Palette Extractor', path: '/image-tools/color-palette-extractor', cat: 'Image Tools' },
        { name: 'Meme Generator', path: '/image-tools/meme-generator', cat: 'Image Tools' },
        { name: 'PNG to SVG', path: '/image-tools/png-to-svg', cat: 'Image Tools' },
        { name: 'SVG to PNG', path: '/image-tools/svg-to-png', cat: 'Image Tools' },
        { name: 'Image Format Detector', path: '/image-tools/image-format-detector', cat: 'Image Tools' },
        { name: 'Base64 to Image', path: '/image-tools/base64-to-image', cat: 'Image Tools' },
        { name: 'Image to Base64', path: '/image-tools/image-to-base64', cat: 'Image Tools' },
        { name: 'Remove EXIF Metadata', path: '/image-tools/remove-exif-metadata', cat: 'Image Tools' },
        { name: 'Profile Picture Maker', path: '/image-tools/profile-picture-maker', cat: 'Image Tools' },
        { name: 'HEX RGB Converter', path: '/image-tools/hex-rgb-converter', cat: 'Image Tools' },
        { name: 'Face Cropper', path: '/image-tools/face-cropper', cat: 'Image Tools' },
        { name: 'ID Photo Resizer', path: '/image-tools/id-photo-resizer', cat: 'Image Tools' },
        { name: 'Instagram DP Resizer', path: '/image-tools/instagram-dp-resizer', cat: 'Image Tools' },
        { name: 'Instagram Grid Splitter', path: '/image-tools/instagram-grid-splitter', cat: 'Image Tools' },
        { name: 'GIF Compressor', path: '/image-tools/gif-compressor', cat: 'Image Tools' },
        { name: 'WhatsApp Image Compressor', path: '/image-tools/whatsapp-image-compressor', cat: 'Image Tools' },
        { name: 'Whiteboard Sketch Converter', path: '/image-tools/whiteboard-sketch-converter', cat: 'Image Tools' },
        { name: 'GPA Calculator', path: '/calculators/gpa-calculator', cat: 'Calculators' },
        { name: 'Loan Calculator', path: '/calculators/loan-calculator', cat: 'Calculators' },
        { name: 'Age Calculator', path: '/calculators/age-calculator', cat: 'Calculators' },
        { name: 'Date Difference Calculator', path: '/calculators/date-difference-calculator', cat: 'Calculators' },
        { name: 'Time Zone Converter', path: '/calculators/time-zone-converter', cat: 'Calculators' },
        { name: 'Speed Converter', path: '/calculators/speed-converter', cat: 'Calculators' },
        { name: 'Weight Converter', path: '/calculators/weight-converter', cat: 'Calculators' },
        { name: 'Height Converter', path: '/calculators/height-converter', cat: 'Calculators' },
        { name: 'Percentage Calculator', path: '/calculators/percentage-calculator', cat: 'Calculators' },
        { name: 'Discount Calculator', path: '/calculators/discount-calculator', cat: 'Calculators' },
        { name: 'VAT Tax Calculator', path: '/calculators/vat-tax-calculator', cat: 'Calculators' },
        { name: 'Commission Calculator', path: '/calculators/commission-calculator', cat: 'Calculators' },
        { name: 'Markup Calculator', path: '/calculators/markup-calculator', cat: 'Calculators' },
        { name: 'Break Even Calculator', path: '/calculators/break-even-calculator', cat: 'Calculators' },
        { name: 'Savings Goal Calculator', path: '/calculators/savings-goal-calculator', cat: 'Calculators' },
        { name: 'Retirement Savings Calculator', path: '/calculators/retirement-savings-calculator', cat: 'Calculators' },
        { name: 'Fuel Cost Calculator', path: '/calculators/fuel-cost-calculator', cat: 'Calculators' },
        { name: 'Data Usage Calculator', path: '/calculators/data-usage-calculator', cat: 'Calculators' },
        { name: 'Random Number Generator', path: '/calculators/random-number-generator', cat: 'Calculators' },
        { name: 'Grade Calculator', path: '/calculators/grade-calculator', cat: 'Calculators' },
        { name: 'GPA to Percentage Converter', path: '/calculators/gpa-to-percentage-converter', cat: 'Calculators' },
        { name: 'Pregnancy Due Date Calculator', path: '/calculators/pregnancy-due-date-calculator', cat: 'Calculators' },
        { name: 'Text Summarizer', path: '/ai-tools/text-summarizer', cat: 'AI Tools' },
        { name: 'Resume Bullet Generator', path: '/ai-tools/resume-bullet-generator', cat: 'AI Tools' },
        { name: 'Email Writer', path: '/ai-tools/email-writer', cat: 'AI Tools' },
        { name: 'Caption Generator', path: '/ai-tools/caption-generator', cat: 'AI Tools' },
        { name: 'Bio Generator', path: '/ai-tools/bio-generator', cat: 'AI Tools' },
        { name: 'Headline Rewriter', path: '/ai-tools/headline-rewriter', cat: 'AI Tools' },
        { name: 'Essay Outline Generator', path: '/ai-tools/essay-outline-generator', cat: 'AI Tools' },
        { name: 'Notes Summarizer', path: '/ai-tools/notes-summarizer', cat: 'AI Tools' },
        { name: 'Hashtag Generator', path: '/ai-tools/hashtag-generator', cat: 'AI Tools' },
        { name: 'Quiz Generator', path: '/ai-tools/quiz-generator', cat: 'AI Tools' },
        { name: 'Prompt Improver', path: '/ai-tools/prompt-improver', cat: 'AI Tools' },
        { name: 'Plagiarism Checker', path: '/ai-tools/plagiarism-checker', cat: 'AI Tools' },
        { name: 'Grammar Checker', path: '/ai-tools/grammar-checker', cat: 'AI Tools' },
        { name: 'Paraphrasing Tool', path: '/ai-tools/paraphrasing-tool', cat: 'AI Tools' },
        { name: 'Regex Generator', path: '/ai-tools/regex-generator', cat: 'AI Tools' },
        { name: 'Speech to Text', path: '/ai-tools/speech-to-text', cat: 'AI Tools' },
        { name: 'Text to Speech', path: '/ai-tools/text-to-speech', cat: 'AI Tools' },
        { name: 'JSON Formatter', path: '/ai-tools/json-formatter', cat: 'AI Tools' },
        { name: 'Fake Data Generator', path: '/ai-tools/fake-data-generator', cat: 'AI Tools' },
        { name: 'Title Case Formatter', path: '/ai-tools/title-case-formatter', cat: 'AI Tools' },
        { name: 'Tweet Generator', path: '/ai-tools/tweet-generator', cat: 'AI Tools' },
        { name: 'Username Generator', path: '/ai-tools/username-generator', cat: 'AI Tools' },
        { name: 'Idea Generator', path: '/ai-tools/idea-generator', cat: 'AI Tools' },
        { name: 'Citation Generator', path: '/student-tools/citation-generator', cat: 'Student Tools' },
        { name: 'Flashcard Maker', path: '/student-tools/flashcard-maker', cat: 'Student Tools' },
        { name: 'Study Timer', path: '/student-tools/study-timer', cat: 'Student Tools' },
        { name: 'Read Time Estimator', path: '/student-tools/read-time-estimator', cat: 'Student Tools' }
    ];

    /* ── LocalStorage helpers ─────────────────────────────────────── */
    function getStore(key) {
        try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
    }
    function setStore(key, val) {
        try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
    }

    /* ── Favorites ────────────────────────────────────────────────── */
    function isFavorite(path) {
        return getStore('tn_favorites').indexOf(path) !== -1;
    }
    function toggleFavorite(path) {
        var favs = getStore('tn_favorites');
        var idx = favs.indexOf(path);
        if (idx === -1) { favs.unshift(path); } else { favs.splice(idx, 1); }
        setStore('tn_favorites', favs.slice(0, 50));
        return idx === -1;
    }

    function injectFavoriteButtons() {
        var toolCards = document.querySelectorAll('.tool-card[href]');
        toolCards.forEach(function (card) {
            var path = card.getAttribute('href');
            if (!path) return;
            var star = document.createElement('button');
            star.className = 'fav-btn' + (isFavorite(path) ? ' fav-active' : '');
            star.innerHTML = '&#9733;';
            star.setAttribute('aria-label', 'Toggle favorite');
            star.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var added = toggleFavorite(path);
                star.classList.toggle('fav-active', added);
            });
            card.style.position = 'relative';
            card.appendChild(star);
        });
    }

    /* ── Recently Used / History ──────────────────────────────────── */
    function recordToolUsage() {
        var path = window.location.pathname.replace(/\/$/, '');
        var match = TOOLS.find(function (t) { return t.path === path; });
        if (!match) return;
        var history = getStore('tn_history');
        history = history.filter(function (h) { return h.path !== path; });
        history.unshift({ path: path, name: match.name, time: Date.now() });
        setStore('tn_history', history.slice(0, 20));
    }

    function injectRecentlyUsed() {
        var container = document.querySelector('.recently-used-slot');
        if (!container) return;
        var history = getStore('tn_history');
        if (history.length === 0) return;
        var html = '<div class="section"><div class="container"><div class="section-title"><h2>Recently Used</h2><p>Pick up where you left off.</p></div><div class="grid-4">';
        history.slice(0, 4).forEach(function (h) {
            html += '<a href="' + h.path + '" class="card tool-card"><div class="card-icon">&#128337;</div><div><h3>' + h.name + '</h3><p>Used recently</p></div></a>';
        });
        html += '</div></div></div>';
        container.innerHTML = html;
    }

    /* ── Search Autocomplete ──────────────────────────────────────── */
    function initAutocomplete() {
        var inputs = document.querySelectorAll('.hero-search input, #nav-search, #tools-search');
        inputs.forEach(function (input) {
            var wrapper = document.createElement('div');
            wrapper.className = 'autocomplete-wrap';
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);

            var dropdown = document.createElement('div');
            dropdown.className = 'autocomplete-dropdown';
            wrapper.appendChild(dropdown);

            var debounceTimer;
            input.addEventListener('input', function () {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(function () {
                    var q = input.value.toLowerCase().trim();
                    dropdown.innerHTML = '';
                    if (q.length < 2) { dropdown.style.display = 'none'; return; }
                    var matches = TOOLS.filter(function (t) {
                        return t.name.toLowerCase().indexOf(q) !== -1 || t.cat.toLowerCase().indexOf(q) !== -1;
                    }).slice(0, 8);
                    if (matches.length === 0) { dropdown.style.display = 'none'; return; }
                    matches.forEach(function (m) {
                        var item = document.createElement('a');
                        item.href = m.path;
                        item.className = 'autocomplete-item';
                        item.innerHTML = '<strong>' + m.name + '</strong><span>' + m.cat + '</span>';
                        dropdown.appendChild(item);
                    });
                    dropdown.style.display = 'block';
                }, 150);
            });

            input.addEventListener('blur', function () {
                setTimeout(function () { dropdown.style.display = 'none'; }, 200);
            });
            input.addEventListener('focus', function () {
                if (dropdown.children.length > 0 && input.value.trim().length >= 2) {
                    dropdown.style.display = 'block';
                }
            });
        });
    }

    /* ── Dark Mode ────────────────────────────────────────────────── */
    function initDarkMode() {
        var stored = localStorage.getItem('tn_dark');
        var isDark = stored === 'true';
        if (isDark) document.documentElement.classList.add('dark');

        var btn = document.createElement('button');
        btn.className = 'dark-toggle';
        btn.setAttribute('aria-label', 'Toggle dark mode');
        btn.innerHTML = isDark ? '&#9728;' : '&#9790;';
        btn.addEventListener('click', function () {
            var active = document.documentElement.classList.toggle('dark');
            localStorage.setItem('tn_dark', active);
            btn.innerHTML = active ? '&#9728;' : '&#9790;';
        });
        document.body.appendChild(btn);
    }

    /* ── PWA Install ──────────────────────────────────────────────── */
    function initPWA() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(function () {});
        }
        var deferredPrompt;
        window.addEventListener('beforeinstallprompt', function (e) {
            e.preventDefault();
            deferredPrompt = e;
            var installBtn = document.createElement('button');
            installBtn.className = 'btn btn-accent pwa-install';
            installBtn.textContent = 'Install App';
            installBtn.addEventListener('click', function () {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then(function () {
                    deferredPrompt = null;
                    installBtn.remove();
                });
            });
            var hero = document.querySelector('.hero .container');
            if (hero) hero.appendChild(installBtn);
        });
    }

    /* ── Cookie Notice ────────────────────────────────────────────── */
    function initCookieNotice() {
        if (localStorage.getItem('tn_cookies') === 'accepted') return;
        var bar = document.createElement('div');
        bar.className = 'cookie-bar';
        bar.innerHTML = '<p>We use cookies to improve your experience. By using this site, you agree to our <a href="/privacy-policy">Privacy Policy</a>.</p><button class="btn btn-primary btn-sm" id="cookie-accept">Accept</button>';
        document.body.appendChild(bar);
        document.getElementById('cookie-accept').addEventListener('click', function () {
            localStorage.setItem('tn_cookies', 'accepted');
            bar.classList.add('cookie-hidden');
            setTimeout(function () { bar.remove(); }, 300);
        });
    }

    /* ── Analytics / Event Tracking ───────────────────────────────── */
    function trackEvent(category, action, label) {
        if (window.gtag) {
            window.gtag('event', action, { event_category: category, event_label: label });
        }
    }

    function initAnalytics() {
        /* Track tool usage */
        document.addEventListener('click', function (e) {
            var btn = e.target.closest('.btn');
            if (btn) {
                trackEvent('button', 'click', btn.textContent.trim().substring(0, 50));
            }
            var toolCard = e.target.closest('.tool-card');
            if (toolCard) {
                trackEvent('tool', 'navigate', toolCard.getAttribute('href') || '');
            }
        });

        /* Track tool conversions (download buttons) */
        document.addEventListener('click', function (e) {
            var dl = e.target.closest('[download]');
            if (dl) {
                trackEvent('conversion', 'download', dl.download || dl.textContent.trim());
            }
        });
    }

    /* ── Popular Tools Section (dynamic) ──────────────────────────── */
    function injectPopularTools() {
        var slot = document.querySelector('.popular-tools-slot');
        if (!slot) return;
        var popular = [
            TOOLS.find(function(t){return t.path==='/file-tools/pdf-to-word';}),
            TOOLS.find(function(t){return t.path==='/image-tools/image-compressor';}),
            TOOLS.find(function(t){return t.path==='/calculators/percentage-calculator';}),
            TOOLS.find(function(t){return t.path==='/file-tools/compress-pdf';}),
            TOOLS.find(function(t){return t.path==='/ai-tools/text-summarizer';}),
            TOOLS.find(function(t){return t.path==='/image-tools/qr-code-generator';})
        ].filter(Boolean);
        if (popular.length === 0) return;
        var html = '';
        popular.forEach(function(t) {
            html += '<a href="'+t.path+'" class="related-link">'+t.name+'</a>';
        });
        slot.innerHTML = '<h3>Popular Tools</h3>' + html;
    }

    /* ── Bootstrap ────────────────────────────────────────────────── */
    function init() {
        initDarkMode();
        initCookieNotice();
        initAutocomplete();
        initPWA();
        initAnalytics();
        injectFavoriteButtons();
        recordToolUsage();
        injectRecentlyUsed();
        injectPopularTools();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* Export for external use */
    window.ToolsNest = { TOOLS: TOOLS, trackEvent: trackEvent, toggleFavorite: toggleFavorite };
})();

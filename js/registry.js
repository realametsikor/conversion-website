/* registry.js - Central tool & blog registry for category pages and homepage */
(function () {
    'use strict';

    var TOOLS = [
        /* ── File Tools ─────────────────────────────────────── */
        { name: 'PDF to Word', path: '/file-tools/pdf-to-word', cat: 'File Tools', icon: '&#128196;', desc: 'Convert PDF to editable Word documents.' },
        { name: 'Word to PDF', path: '/file-tools/word-to-pdf', cat: 'File Tools', icon: '&#128196;', desc: 'Convert Word documents to PDF format.' },
        { name: 'Merge PDF', path: '/file-tools/merge-pdf', cat: 'File Tools', icon: '&#128196;', desc: 'Combine multiple PDFs into one file.' },
        { name: 'Split PDF', path: '/file-tools/split-pdf', cat: 'File Tools', icon: '&#128196;', desc: 'Extract pages or split into multiple files.' },
        { name: 'Compress PDF', path: '/file-tools/compress-pdf', cat: 'File Tools', icon: '&#128196;', desc: 'Reduce PDF file size while maintaining quality.' },
        { name: 'PDF to JPG', path: '/file-tools/pdf-to-jpg', cat: 'File Tools', icon: '&#128196;', desc: 'Convert PDF pages to high-quality JPG images.' },
        { name: 'JPG to PDF', path: '/file-tools/jpg-to-pdf', cat: 'File Tools', icon: '&#128196;', desc: 'Convert JPG images to PDF format.' },
        { name: 'PDF to Excel', path: '/file-tools/pdf-to-excel', cat: 'File Tools', icon: '&#128196;', desc: 'Convert PDF tables and data to Excel spreadsheets.' },
        { name: 'Excel to PDF', path: '/file-tools/excel-to-pdf', cat: 'File Tools', icon: '&#128196;', desc: 'Convert Excel spreadsheets to PDF format.' },
        { name: 'PDF to PowerPoint', path: '/file-tools/pdf-to-powerpoint', cat: 'File Tools', icon: '&#128196;', desc: 'Convert PDF files to editable PowerPoint presentations.' },
        { name: 'PowerPoint to PDF', path: '/file-tools/powerpoint-to-pdf', cat: 'File Tools', icon: '&#128196;', desc: 'Convert PowerPoint presentations to PDF format.' },
        { name: 'Extract Text from PDF', path: '/file-tools/extract-text-from-pdf', cat: 'File Tools', icon: '&#128196;', desc: 'Extract text from any PDF including scanned documents.' },
        { name: 'Unlock PDF', path: '/file-tools/unlock-pdf', cat: 'File Tools', icon: '&#128274;', desc: 'Remove password protection and restrictions from PDFs.' },
        { name: 'Redact PDF', path: '/file-tools/redact-pdf', cat: 'File Tools', icon: '&#128196;', desc: 'Permanently redact sensitive information from PDFs.' },
        { name: 'Reorder PDF Pages', path: '/file-tools/reorder-pdf-pages', cat: 'File Tools', icon: '&#128196;', desc: 'Rearrange pages in your PDF by drag and drop.' },
        { name: 'Add Page Numbers PDF', path: '/file-tools/add-page-numbers-pdf', cat: 'File Tools', icon: '&#128196;', desc: 'Add page numbers to your PDF documents.' },
        { name: 'MP4 to MP3', path: '/file-tools/mp4-to-mp3', cat: 'File Tools', icon: '&#127925;', desc: 'Extract audio from video files.' },
        { name: 'Merge Audio', path: '/file-tools/merge-audio', cat: 'File Tools', icon: '&#127925;', desc: 'Combine multiple audio files into a single track.' },
        { name: 'Audio Cutter', path: '/file-tools/audio-cutter', cat: 'File Tools', icon: '&#127925;', desc: 'Cut and trim audio files with waveform visualization.' },
        { name: 'Video Trimmer', path: '/file-tools/video-trimmer', cat: 'File Tools', icon: '&#127916;', desc: 'Trim and cut video files to exact length.' },
        { name: 'Screen Recorder', path: '/file-tools/screen-recorder', cat: 'File Tools', icon: '&#128187;', desc: 'Record your screen directly from the browser.' },
        { name: 'Screenshot to PDF', path: '/file-tools/screenshot-to-pdf', cat: 'File Tools', icon: '&#128248;', desc: 'Convert screenshots and images into PDF documents.' },
        { name: 'Add Subtitles to Video', path: '/file-tools/add-subtitles-to-video', cat: 'File Tools', icon: '&#127916;', desc: 'Burn subtitles into video files permanently.' },
        { name: 'HTML to PDF', path: '/file-tools/html-to-pdf', cat: 'File Tools', icon: '&#128196;', desc: 'Convert HTML files and code to PDF documents.' },
        { name: 'TXT to PDF', path: '/file-tools/txt-to-pdf', cat: 'File Tools', icon: '&#128196;', desc: 'Convert plain text files to PDF format.' },
        { name: 'CSV to Excel', path: '/file-tools/csv-to-excel', cat: 'File Tools', icon: '&#128196;', desc: 'Convert CSV files to Excel spreadsheets.' },
        { name: 'DOCX to TXT', path: '/file-tools/docx-to-txt', cat: 'File Tools', icon: '&#128196;', desc: 'Convert Word documents to plain text files.' },
        { name: 'EPUB to PDF', path: '/file-tools/epub-to-pdf', cat: 'File Tools', icon: '&#128196;', desc: 'Convert EPUB ebooks to PDF format.' },
        { name: 'File Metadata Remover', path: '/file-tools/file-metadata-remover', cat: 'File Tools', icon: '&#128274;', desc: 'Remove EXIF and metadata from your files.' },
        { name: 'File Checksum Generator', path: '/file-tools/file-checksum-generator', cat: 'File Tools', icon: '&#128274;', desc: 'Generate MD5, SHA-1, SHA-256 checksums for any file.' },
        { name: 'Subtitle Editor', path: '/file-tools/subtitle-editor', cat: 'File Tools', icon: '&#128221;', desc: 'Create and edit .srt subtitle files.' },
        { name: 'JPG to PNG', path: '/file-tools/jpg-to-png', cat: 'File Tools', icon: '&#128247;', desc: 'Convert JPG images to PNG format.' },

        /* ── Image Tools ────────────────────────────────────── */
        { name: 'Image Compressor', path: '/image-tools/image-compressor', cat: 'Image Tools', icon: '&#128247;', desc: 'Reduce image file size without losing quality.' },
        { name: 'Background Remover', path: '/image-tools/background-remover', cat: 'Image Tools', icon: '&#9986;', desc: 'Automatically remove image backgrounds with AI.' },
        { name: 'Blur Background', path: '/image-tools/blur-background', cat: 'Image Tools', icon: '&#127912;', desc: 'Blur the background of any image.' },
        { name: 'Resize Image', path: '/image-tools/resize-image', cat: 'Image Tools', icon: '&#128247;', desc: 'Change image dimensions quickly.' },
        { name: 'HEIC to JPG', path: '/image-tools/heic-to-jpg', cat: 'Image Tools', icon: '&#128247;', desc: 'Convert iPhone HEIC photos to JPG format.' },
        { name: 'QR Code Generator', path: '/image-tools/qr-code-generator', cat: 'Image Tools', icon: '&#128178;', desc: 'Create custom QR codes for URLs, text, and Wi-Fi.' },
        { name: 'Barcode Generator', path: '/image-tools/barcode-generator', cat: 'Image Tools', icon: '&#128178;', desc: 'Generate Code 128 barcodes instantly.' },
        { name: 'Signature Generator', path: '/image-tools/signature-generator', cat: 'Image Tools', icon: '&#9999;', desc: 'Draw or type your digital signature.' },
        { name: 'Collage Maker', path: '/image-tools/collage-maker', cat: 'Image Tools', icon: '&#128444;', desc: 'Create photo collages with grid layouts.' },
        { name: 'Screenshot Mockup Generator', path: '/image-tools/screenshot-mockup-generator', cat: 'Image Tools', icon: '&#128187;', desc: 'Place screenshots in device frames.' },
        { name: 'Favicon Generator', path: '/image-tools/favicon-generator', cat: 'Image Tools', icon: '&#127760;', desc: 'Generate favicon icons for your website.' },
        { name: 'YouTube Thumbnail Maker', path: '/image-tools/youtube-thumbnail-maker', cat: 'Image Tools', icon: '&#127916;', desc: 'Create custom YouTube thumbnails at 1280x720.' },
        { name: 'YouTube Banner Maker', path: '/image-tools/youtube-banner-maker', cat: 'Image Tools', icon: '&#127916;', desc: 'Design YouTube channel art at 2560x1440.' },
        { name: 'Photo Filters Editor', path: '/image-tools/photo-filters-editor', cat: 'Image Tools', icon: '&#127912;', desc: 'Apply filters and effects to your photos.' },
        { name: 'Color Palette Extractor', path: '/image-tools/color-palette-extractor', cat: 'Image Tools', icon: '&#127912;', desc: 'Extract dominant colors from any image.' },
        { name: 'Meme Generator', path: '/image-tools/meme-generator', cat: 'Image Tools', icon: '&#128514;', desc: 'Create memes with custom text and templates.' },
        { name: 'PNG to SVG', path: '/image-tools/png-to-svg', cat: 'Image Tools', icon: '&#128260;', desc: 'Convert raster images to SVG vector format.' },
        { name: 'SVG to PNG', path: '/image-tools/svg-to-png', cat: 'Image Tools', icon: '&#128260;', desc: 'Convert SVG vector files to PNG images.' },
        { name: 'Image Format Detector', path: '/image-tools/image-format-detector', cat: 'Image Tools', icon: '&#128270;', desc: 'Detect the true format of any image file.' },
        { name: 'Base64 to Image', path: '/image-tools/base64-to-image', cat: 'Image Tools', icon: '&#128260;', desc: 'Decode Base64 strings back into images.' },
        { name: 'Image to Base64', path: '/image-tools/image-to-base64', cat: 'Image Tools', icon: '&#128260;', desc: 'Convert any image to a Base64 encoded string.' },
        { name: 'Remove EXIF Metadata', path: '/image-tools/remove-exif-metadata', cat: 'Image Tools', icon: '&#128274;', desc: 'Strip metadata from photos for privacy.' },
        { name: 'Profile Picture Maker', path: '/image-tools/profile-picture-maker', cat: 'Image Tools', icon: '&#128100;', desc: 'Crop and resize photos for profile pictures.' },
        { name: 'HEX RGB Converter', path: '/image-tools/hex-rgb-converter', cat: 'Image Tools', icon: '&#127752;', desc: 'Convert between HEX, RGB, and HSL formats.' },
        { name: 'Face Cropper', path: '/image-tools/face-cropper', cat: 'Image Tools', icon: '&#128248;', desc: 'Crop photos to passport and ID dimensions.' },
        { name: 'ID Photo Resizer', path: '/image-tools/id-photo-resizer', cat: 'Image Tools', icon: '&#128179;', desc: 'Resize photos to standard ID and passport sizes.' },
        { name: 'Instagram DP Resizer', path: '/image-tools/instagram-dp-resizer', cat: 'Image Tools', icon: '&#128247;', desc: 'Resize photos to Instagram profile picture size.' },
        { name: 'Instagram Grid Splitter', path: '/image-tools/instagram-grid-splitter', cat: 'Image Tools', icon: '&#128444;', desc: 'Split images into grid pieces for Instagram.' },
        { name: 'GIF Compressor', path: '/image-tools/gif-compressor', cat: 'Image Tools', icon: '&#127910;', desc: 'Reduce GIF file size by scaling and reducing colors.' },
        { name: 'WhatsApp Image Compressor', path: '/image-tools/whatsapp-image-compressor', cat: 'Image Tools', icon: '&#128172;', desc: 'Compress images for WhatsApp sharing.' },
        { name: 'Whiteboard Sketch Converter', path: '/image-tools/whiteboard-sketch-converter', cat: 'Image Tools', icon: '&#128221;', desc: 'Clean up whiteboard photos instantly.' },

        /* ── Calculators ────────────────────────────────────── */
        { name: 'GPA Calculator', path: '/calculators/gpa-calculator', cat: 'Calculators', icon: '&#129518;', desc: 'Calculate your college or high school GPA.' },
        { name: 'Loan Calculator', path: '/calculators/loan-calculator', cat: 'Calculators', icon: '&#129518;', desc: 'Estimate monthly payments and total interest.' },
        { name: 'Age Calculator', path: '/calculators/age-calculator', cat: 'Calculators', icon: '&#128197;', desc: 'Calculate your exact age in years, months, and days.' },
        { name: 'Date Difference Calculator', path: '/calculators/date-difference-calculator', cat: 'Calculators', icon: '&#128198;', desc: 'Find the exact difference between two dates.' },
        { name: 'Time Zone Converter', path: '/calculators/time-zone-converter', cat: 'Calculators', icon: '&#127760;', desc: 'Convert time between any world time zones.' },
        { name: 'Speed Converter', path: '/calculators/speed-converter', cat: 'Calculators', icon: '&#128168;', desc: 'Convert between mph, km/h, knots, m/s, and more.' },
        { name: 'Weight Converter', path: '/calculators/weight-converter', cat: 'Calculators', icon: '&#9878;', desc: 'Convert between kg, lbs, oz, stones, and more.' },
        { name: 'Height Converter', path: '/calculators/height-converter', cat: 'Calculators', icon: '&#128207;', desc: 'Convert between cm, feet, inches, and meters.' },
        { name: 'Percentage Calculator', path: '/calculators/percentage-calculator', cat: 'Calculators', icon: '&#128290;', desc: 'Calculate percentages, percentage change, and more.' },
        { name: 'Discount Calculator', path: '/calculators/discount-calculator', cat: 'Calculators', icon: '&#127991;', desc: 'Calculate discount savings and final price.' },
        { name: 'VAT Tax Calculator', path: '/calculators/vat-tax-calculator', cat: 'Calculators', icon: '&#128179;', desc: 'Add or remove VAT/tax from any price.' },
        { name: 'Commission Calculator', path: '/calculators/commission-calculator', cat: 'Calculators', icon: '&#129297;', desc: 'Calculate flat or tiered sales commission.' },
        { name: 'Markup Calculator', path: '/calculators/markup-calculator', cat: 'Calculators', icon: '&#128176;', desc: 'Calculate markup percentage and selling price.' },
        { name: 'Break Even Calculator', path: '/calculators/break-even-calculator', cat: 'Calculators', icon: '&#128200;', desc: 'Calculate your break-even point in units and revenue.' },
        { name: 'Savings Goal Calculator', path: '/calculators/savings-goal-calculator', cat: 'Calculators', icon: '&#127919;', desc: 'Find out how long to reach your savings goal.' },
        { name: 'Retirement Savings Calculator', path: '/calculators/retirement-savings-calculator', cat: 'Calculators', icon: '&#127958;', desc: 'Project your retirement savings and income.' },
        { name: 'Fuel Cost Calculator', path: '/calculators/fuel-cost-calculator', cat: 'Calculators', icon: '&#9981;', desc: 'Estimate fuel costs for any trip distance.' },
        { name: 'Data Usage Calculator', path: '/calculators/data-usage-calculator', cat: 'Calculators', icon: '&#128246;', desc: 'Estimate your monthly internet data consumption.' },
        { name: 'Random Number Generator', path: '/calculators/random-number-generator', cat: 'Calculators', icon: '&#127922;', desc: 'Generate random numbers with custom ranges.' },
        { name: 'Grade Calculator', path: '/calculators/grade-calculator', cat: 'Calculators', icon: '&#127891;', desc: 'Calculate your weighted or unweighted course grade.' },
        { name: 'GPA to Percentage Converter', path: '/calculators/gpa-to-percentage-converter', cat: 'Calculators', icon: '&#128218;', desc: 'Convert between GPA and percentage across scales.' },
        { name: 'Pregnancy Due Date Calculator', path: '/calculators/pregnancy-due-date-calculator', cat: 'Calculators', icon: '&#128118;', desc: 'Estimate your due date and track milestones.' },

        /* ── AI Tools ───────────────────────────────────────── */
        { name: 'Text Summarizer', path: '/ai-tools/text-summarizer', cat: 'AI Tools', icon: '&#129302;', desc: 'Summarize long text into key points with AI.' },
        { name: 'Resume Bullet Generator', path: '/ai-tools/resume-bullet-generator', cat: 'AI Tools', icon: '&#128188;', desc: 'Transform job duties into achievement-oriented bullet points.' },
        { name: 'Email Writer', path: '/ai-tools/email-writer', cat: 'AI Tools', icon: '&#9993;', desc: 'Craft professional emails for any situation instantly.' },
        { name: 'Caption Generator', path: '/ai-tools/caption-generator', cat: 'AI Tools', icon: '&#128242;', desc: 'Generate engaging social media captions for any platform.' },
        { name: 'Bio Generator', path: '/ai-tools/bio-generator', cat: 'AI Tools', icon: '&#128100;', desc: 'Create polished bios for any platform in seconds.' },
        { name: 'Headline Rewriter', path: '/ai-tools/headline-rewriter', cat: 'AI Tools', icon: '&#128240;', desc: 'Rewrite headlines in 8 high-converting styles.' },
        { name: 'Essay Outline Generator', path: '/ai-tools/essay-outline-generator', cat: 'AI Tools', icon: '&#128221;', desc: 'Create structured essay outlines with thesis and body.' },
        { name: 'Notes Summarizer', path: '/ai-tools/notes-summarizer', cat: 'AI Tools', icon: '&#128466;', desc: 'Turn messy notes into organized summaries.' },
        { name: 'Hashtag Generator', path: '/ai-tools/hashtag-generator', cat: 'AI Tools', icon: '&#128203;', desc: 'Generate targeted hashtags for any social platform.' },
        { name: 'Quiz Generator', path: '/ai-tools/quiz-generator', cat: 'AI Tools', icon: '&#10067;', desc: 'Create quizzes from any text with multiple question types.' },
        { name: 'Prompt Improver', path: '/ai-tools/prompt-improver', cat: 'AI Tools', icon: '&#10024;', desc: 'Transform basic AI prompts into effective, detailed prompts.' },
        { name: 'Plagiarism Checker', path: '/ai-tools/plagiarism-checker', cat: 'AI Tools', icon: '&#128269;', desc: 'Check text for originality with style analysis.' },
        { name: 'Grammar Checker', path: '/ai-tools/grammar-checker', cat: 'AI Tools', icon: '&#9989;', desc: 'Fix grammar, spelling, and style errors in your writing.' },
        { name: 'Paraphrasing Tool', path: '/ai-tools/paraphrasing-tool', cat: 'AI Tools', icon: '&#128221;', desc: 'Rewrite text instantly with multiple paraphrasing modes.' },
        { name: 'Regex Generator', path: '/ai-tools/regex-generator', cat: 'AI Tools', icon: '&#128270;', desc: 'Generate and test regular expressions from common patterns.' },
        { name: 'Speech to Text', path: '/ai-tools/speech-to-text', cat: 'AI Tools', icon: '&#127908;', desc: 'Transcribe speech to text in real time.' },
        { name: 'Text to Speech', path: '/ai-tools/text-to-speech', cat: 'AI Tools', icon: '&#128264;', desc: 'Convert text to audio with adjustable voice, speed, and pitch.' },
        { name: 'JSON Formatter', path: '/ai-tools/json-formatter', cat: 'AI Tools', icon: '&#128196;', desc: 'Beautify, minify, and validate JSON data instantly.' },
        { name: 'Fake Data Generator', path: '/ai-tools/fake-data-generator', cat: 'AI Tools', icon: '&#128202;', desc: 'Generate realistic mock data for testing and development.' },
        { name: 'Title Case Formatter', path: '/ai-tools/title-case-formatter', cat: 'AI Tools', icon: '&#128221;', desc: 'Convert text to title case, sentence case, and more.' },
        { name: 'Tweet Generator', path: '/ai-tools/tweet-generator', cat: 'AI Tools', icon: '&#128172;', desc: 'Create engaging, viral-ready tweets for any topic and tone.' },
        { name: 'Username Generator', path: '/ai-tools/username-generator', cat: 'AI Tools', icon: '&#128100;', desc: 'Generate creative, unique usernames for any platform.' },
        { name: 'Idea Generator', path: '/ai-tools/idea-generator', cat: 'AI Tools', icon: '&#128161;', desc: 'Brainstorm creative ideas for business, content, and projects.' },
        { name: 'Cover Letter Generator', path: '/ai-tools/cover-letter-generator', cat: 'AI Tools', icon: '&#128221;', desc: 'Generate a professional cover letter with AI.' },
        { name: 'Word Counter', path: '/ai-tools/word-counter', cat: 'AI Tools', icon: '&#128290;', desc: 'Count words, characters, and reading time live.' },

        /* ── Student Tools ──────────────────────────────────── */
        { name: 'Citation Generator', path: '/student-tools/citation-generator', cat: 'Student Tools', icon: '&#128218;', desc: 'Create APA, MLA, Chicago, and Harvard citations instantly.' },
        { name: 'Flashcard Maker', path: '/student-tools/flashcard-maker', cat: 'Student Tools', icon: '&#127183;', desc: 'Create, study, and export flashcards with flip animation.' },
        { name: 'Study Timer', path: '/student-tools/study-timer', cat: 'Student Tools', icon: '&#9201;', desc: 'Stay focused with the Pomodoro technique timer.' },
        { name: 'Read Time Estimator', path: '/student-tools/read-time-estimator', cat: 'Student Tools', icon: '&#128337;', desc: 'Calculate reading time, word count, and reading level.' }
    ];

    /* ── Blog posts (for homepage featured section) ──────── */
    var BLOGS = [
        { title: 'How to Compress Images Without Losing Quality', path: '/blog/compress-images-without-losing-quality', desc: 'Reduce image file sizes by up to 80% with zero visible quality loss.' },
        { title: '15 Best Free Image Creation and Editing Tools Online in 2026', path: '/blog/best-free-image-creation-tools-online', desc: 'Discover 15 free online image tools for content creators and designers.' },
        { title: '60+ New Free Online Tools Just Added to ToolsNest in 2026', path: '/blog/new-free-online-tools-2026', desc: 'Discover 60+ brand-new free tools for productivity and content creation.' },
        { title: 'Best Free AI Writing Tools for Content Creation in 2026', path: '/blog/best-free-ai-writing-tools', desc: '10 free AI writing tools for bios, captions, emails, resumes, and more.' },
        { title: '22 Free Online Calculators for Finance, Academics & Everyday Use', path: '/blog/free-online-calculators-guide', desc: 'Explore 22 free online calculators for loans, GPA, taxes, and more.' },
        { title: 'Best Free File Conversion and PDF Tools Online in 2026', path: '/blog/best-free-file-conversion-tools', desc: 'Convert PDFs, Excel, Word, PowerPoint, and images with 19 free tools.' }
    ];

    /* ── API ─────────────────────────────────────────────── */
    function getByCategory(cat) {
        return TOOLS.filter(function (t) { return t.cat === cat; });
    }

    function renderTools(containerId, tools) {
        var container = document.getElementById(containerId);
        if (!container || !tools || tools.length === 0) return;
        var html = '';
        tools.forEach(function (t) {
            html += '<a href="' + t.path + '" class="card tool-card">'
                + '<div class="card-icon">' + t.icon + '</div>'
                + '<div><h3>' + t.name + '</h3><p>' + t.desc + '</p></div>'
                + '</a>';
        });
        container.innerHTML = html;
    }

    function getFeaturedBlogs() {
        return BLOGS.slice(0, 3);
    }

    function renderBlogs(containerId, blogs) {
        var container = document.getElementById(containerId);
        if (!container || !blogs || blogs.length === 0) return;
        var html = '';
        blogs.forEach(function (b) {
            html += '<a href="' + b.path + '" class="card" style="color: var(--text-main);">'
                + '<h3>' + b.title + '</h3>'
                + '<p class="mt-1">' + b.desc + '</p>'
                + '<span class="mt-2" style="display:inline-block; font-size:0.9rem; font-weight:600; color: var(--primary);">Read More &rarr;</span>'
                + '</a>';
        });
        container.innerHTML = html;
    }

    window.REGISTRY = {
        TOOLS: TOOLS,
        BLOGS: BLOGS,
        getByCategory: getByCategory,
        renderTools: renderTools,
        getFeaturedBlogs: getFeaturedBlogs,
        renderBlogs: renderBlogs
    };
})();

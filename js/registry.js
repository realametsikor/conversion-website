# /* ============================================================
ToolsNest Registry — registry.js

HOW TO ADD A NEW TOOL:

1. Add an entry to the TOOLS array below
1. That’s it. It will automatically appear on:
- Its category page (/calculators, /image-tools, etc.)
- The /all-tools page
- The search autocomplete
- The homepage “Popular Tools” section (if featured: true)

HOW TO ADD A NEW BLOG POST:

1. Add an entry to the BLOGS array below
1. That’s it. It will automatically appear on:
- The /blog listing page
- The homepage “From the Blog” section (if featured: true)

TOOL FIELDS:

- name       (required) Display name
- path       (required) URL path e.g. ‘/calculators/bmi-calculator’
- cat        (required) ‘File Tools’ | ‘Image Tools’ | ‘Calculators’ | ‘AI Tools’ | ‘Student Tools’
- icon       (required) Emoji icon
- desc       (required) Short description (1 sentence)
- featured   (optional) true = show on homepage Popular Tools

BLOG FIELDS:

- title      (required) Blog post title
- path       (required) URL path e.g. ‘/blog/my-post’
- desc       (required) Short description shown in listing
- featured   (optional) true = show on homepage From the Blog section
  ============================================================ */

var REGISTRY = (function () {

```
/* ── TOOLS ─────────────────────────────────────────────── */
var TOOLS = [

    /* FILE TOOLS */
    { name: 'PDF to Word',             path: '/file-tools/pdf-to-word',           cat: 'File Tools',  icon: '📄', desc: 'Convert PDF files to editable Word documents.', featured: true },
    { name: 'Word to PDF',             path: '/file-tools/word-to-pdf',           cat: 'File Tools',  icon: '📄', desc: 'Convert Word documents to PDF format.' },
    { name: 'Merge PDF',               path: '/file-tools/merge-pdf',             cat: 'File Tools',  icon: '📄', desc: 'Combine multiple PDFs into a single file.', featured: true },
    { name: 'Split PDF',               path: '/file-tools/split-pdf',             cat: 'File Tools',  icon: '📄', desc: 'Split a PDF into separate pages or sections.' },
    { name: 'Compress PDF',            path: '/file-tools/compress-pdf',          cat: 'File Tools',  icon: '📄', desc: 'Reduce PDF file size without losing quality.' },
    { name: 'PDF Compressor',          path: '/file-tools/pdf-compressor',        cat: 'File Tools',  icon: '📄', desc: 'Compress PDF files instantly in your browser. No upload needed.', featured: true },
    { name: 'PDF to JPG',              path: '/file-tools/pdf-to-jpg',            cat: 'File Tools',  icon: '📄', desc: 'Convert PDF pages to JPG images.' },
    { name: 'JPG to PDF',              path: '/file-tools/jpg-to-pdf',            cat: 'File Tools',  icon: '📄', desc: 'Convert JPG images to a PDF file.' },
    { name: 'PDF to Excel',            path: '/file-tools/pdf-to-excel',          cat: 'File Tools',  icon: '📄', desc: 'Convert PDF tables to Excel spreadsheets.' },
    { name: 'Excel to PDF',            path: '/file-tools/excel-to-pdf',          cat: 'File Tools',  icon: '📄', desc: 'Convert Excel files to PDF format.' },
    { name: 'PDF to PowerPoint',       path: '/file-tools/pdf-to-powerpoint',     cat: 'File Tools',  icon: '📄', desc: 'Convert PDF files to editable PowerPoint presentations.' },
    { name: 'PowerPoint to PDF',       path: '/file-tools/powerpoint-to-pdf',     cat: 'File Tools',  icon: '📄', desc: 'Convert PowerPoint files to PDF format.' },
    { name: 'Extract Text from PDF',   path: '/file-tools/extract-text-from-pdf', cat: 'File Tools',  icon: '📄', desc: 'Extract all text from a PDF file instantly.' },
    { name: 'Unlock PDF',              path: '/file-tools/unlock-pdf',            cat: 'File Tools',  icon: '📄', desc: 'Remove password protection from PDF files.' },
    { name: 'Redact PDF',              path: '/file-tools/redact-pdf',            cat: 'File Tools',  icon: '📄', desc: 'Permanently redact sensitive text from PDFs.' },
    { name: 'Reorder PDF Pages',       path: '/file-tools/reorder-pdf-pages',     cat: 'File Tools',  icon: '📄', desc: 'Drag and drop to reorder pages in a PDF.' },
    { name: 'Add Page Numbers PDF',    path: '/file-tools/add-page-numbers-pdf',  cat: 'File Tools',  icon: '📄', desc: 'Add page numbers to any PDF file.' },
    { name: 'MP4 to MP3',              path: '/file-tools/mp4-to-mp3',            cat: 'File Tools',  icon: '🎵', desc: 'Extract audio from MP4 video files.' },
    { name: 'Merge Audio',             path: '/file-tools/merge-audio',           cat: 'File Tools',  icon: '🎵', desc: 'Combine multiple audio files into one.' },
    { name: 'Audio Cutter',            path: '/file-tools/audio-cutter',          cat: 'File Tools',  icon: '🎵', desc: 'Trim and cut audio files online for free.' },
    { name: 'Video Trimmer',           path: '/file-tools/video-trimmer',         cat: 'File Tools',  icon: '🎬', desc: 'Trim video files to the exact clip you need.' },
    { name: 'Screen Recorder',         path: '/file-tools/screen-recorder',       cat: 'File Tools',  icon: '🎬', desc: 'Record your screen directly in the browser.' },
    { name: 'JPG to PNG',              path: '/file-tools/jpg-to-png',            cat: 'File Tools',  icon: '🖼️', desc: 'Convert JPG images to PNG format instantly.', featured: true },
    { name: 'HTML to PDF',             path: '/file-tools/html-to-pdf',           cat: 'File Tools',  icon: '📄', desc: 'Convert HTML pages to PDF documents.' },
    { name: 'TXT to PDF',              path: '/file-tools/txt-to-pdf',            cat: 'File Tools',  icon: '📄', desc: 'Convert plain text files to PDF format.' },
    { name: 'CSV to Excel',            path: '/file-tools/csv-to-excel',          cat: 'File Tools',  icon: '📊', desc: 'Convert CSV files to Excel spreadsheets.' },

    /* IMAGE TOOLS */
    { name: 'Image Compressor',            path: '/image-tools/image-compressor',           cat: 'Image Tools', icon: '🖼️', desc: 'Reduce image file size without visible quality loss.', featured: true },
    { name: 'Image to Text (OCR)',          path: '/image-tools/image-to-text',              cat: 'Image Tools', icon: '🔤', desc: 'Extract text from any image, photo, or screenshot instantly.', featured: true },
    { name: 'Background Remover',           path: '/image-tools/background-remover',         cat: 'Image Tools', icon: '✂️', desc: 'Remove image backgrounds automatically with AI.' },
    { name: 'Resize Image',                 path: '/image-tools/resize-image',               cat: 'Image Tools', icon: '🖼️', desc: 'Change image dimensions to any width or height.' },
    { name: 'HEIC to JPG',                  path: '/image-tools/heic-to-jpg',                cat: 'Image Tools', icon: '🖼️', desc: 'Convert iPhone HEIC photos to JPG format.' },
    { name: 'QR Code Generator',            path: '/image-tools/qr-code-generator',          cat: 'Image Tools', icon: '📱', desc: 'Create custom QR codes for URLs, text, Wi-Fi, and more.' },
    { name: 'Barcode Generator',            path: '/image-tools/barcode-generator',          cat: 'Image Tools', icon: '📊', desc: 'Generate barcodes in multiple formats for free.' },
    { name: 'Signature Generator',          path: '/image-tools/signature-generator',        cat: 'Image Tools', icon: '✍️', desc: 'Draw a digital signature and download as PNG.' },
    { name: 'Collage Maker',                path: '/image-tools/collage-maker',              cat: 'Image Tools', icon: '🖼️', desc: 'Combine multiple photos into beautiful grid collages.' },
    { name: 'Screenshot Mockup Generator',  path: '/image-tools/screenshot-mockup-generator',cat: 'Image Tools', icon: '💻', desc: 'Place screenshots inside device frames.' },
    { name: 'Favicon Generator',            path: '/image-tools/favicon-generator',          cat: 'Image Tools', icon: '⭐', desc: 'Convert any image into a website favicon.' },
    { name: 'YouTube Thumbnail Maker',      path: '/image-tools/youtube-thumbnail-maker',    cat: 'Image Tools', icon: '▶️', desc: 'Design eye-catching 1280×720 YouTube thumbnails.' },
    { name: 'Meme Generator',               path: '/image-tools/meme-generator',             cat: 'Image Tools', icon: '😂', desc: 'Create memes with custom text and templates.' },
    { name: 'Profile Picture Maker',        path: '/image-tools/profile-picture-maker',      cat: 'Image Tools', icon: '👤', desc: 'Crop and resize photos for profile pictures.' },
    { name: 'HEX RGB Converter',            path: '/image-tools/hex-rgb-converter',          cat: 'Image Tools', icon: '🎨', desc: 'Convert between HEX and RGB color codes.' },
    { name: 'Color Palette Extractor',      path: '/image-tools/color-palette-extractor',    cat: 'Image Tools', icon: '🎨', desc: 'Extract a color palette from any image.' },
    { name: 'GIF Compressor',               path: '/image-tools/gif-compressor',             cat: 'Image Tools', icon: '🖼️', desc: 'Reduce GIF file size without losing too much quality.' },
    { name: 'Instagram DP Resizer',         path: '/image-tools/instagram-dp-resizer',       cat: 'Image Tools', icon: '📸', desc: 'Resize profile photos for Instagram.' },

    /* CALCULATORS */
    { name: 'BMI Calculator',              path: '/calculators/bmi-calculator',             cat: 'Calculators', icon: '⚖️',  desc: 'Calculate your Body Mass Index with metric or imperial units.', featured: true },
    { name: 'GPA Calculator',              path: '/calculators/gpa-calculator',             cat: 'Calculators', icon: '🎓', desc: 'Calculate your college or high school GPA instantly.' },
    { name: 'Loan Calculator',             path: '/calculators/loan-calculator',            cat: 'Calculators', icon: '💰', desc: 'Estimate monthly payments and total interest.', featured: true },
    { name: 'Age Calculator',              path: '/calculators/age-calculator',             cat: 'Calculators', icon: '📅', desc: 'Calculate your exact age in years, months, and days.' },
    { name: 'Date Difference Calculator',  path: '/calculators/date-difference-calculator', cat: 'Calculators', icon: '📆', desc: 'Find the exact difference between two dates.' },
    { name: 'Percentage Calculator',       path: '/calculators/percentage-calculator',      cat: 'Calculators', icon: '🔢', desc: 'Calculate percentages, percentage change, and more.' },
    { name: 'Grade Calculator',            path: '/calculators/grade-calculator',           cat: 'Calculators', icon: '🎓', desc: 'Calculate your weighted or unweighted course grade.' },
    { name: 'Fuel Cost Calculator',        path: '/calculators/fuel-cost-calculator',       cat: 'Calculators', icon: '⛽', desc: 'Estimate fuel costs for any trip distance.' },
    { name: 'Savings Goal Calculator',     path: '/calculators/savings-goal-calculator',    cat: 'Calculators', icon: '🏦', desc: 'Find out how long to reach your savings goal.' },
    { name: 'Break Even Calculator',       path: '/calculators/break-even-calculator',      cat: 'Calculators', icon: '📈', desc: 'Calculate your break-even point in units and revenue.' },
    { name: 'Markup Calculator',           path: '/calculators/markup-calculator',          cat: 'Calculators', icon: '💵', desc: 'Calculate markup percentage and selling price.' },
    { name: 'Discount Calculator',         path: '/calculators/discount-calculator',        cat: 'Calculators', icon: '🏷️', desc: 'Calculate discount savings and final price.' },
    { name: 'Commission Calculator',       path: '/calculators/commission-calculator',      cat: 'Calculators', icon: '💼', desc: 'Calculate flat or tiered sales commission.' },
    { name: 'Retirement Savings Calc',     path: '/calculators/retirement-savings-calculator', cat: 'Calculators', icon: '🏠', desc: 'Project your retirement savings and income.' },
    { name: 'Pregnancy Due Date Calc',     path: '/calculators/pregnancy-due-date-calculator', cat: 'Calculators', icon: '👶', desc: 'Estimate your due date and track milestones.' },
    { name: 'GPA to Percentage',           path: '/calculators/gpa-to-percentage-converter', cat: 'Calculators', icon: '🎓', desc: 'Convert between GPA and percentage across scales.' },
    { name: 'Random Number Generator',     path: '/calculators/random-number-generator',   cat: 'Calculators', icon: '🎲', desc: 'Generate random numbers with custom ranges.' },

    /* AI TOOLS */
    { name: 'Word Counter',            path: '/ai-tools/word-counter',            cat: 'AI Tools', icon: '🔢', desc: 'Count words, characters, sentences, and paragraphs instantly.', featured: true },
    { name: 'Cover Letter Generator',  path: '/ai-tools/cover-letter-generator',  cat: 'AI Tools', icon: '📝', desc: 'Generate a professional cover letter in seconds with AI.', featured: true },
    { name: 'Text Summarizer',         path: '/ai-tools/text-summarizer',         cat: 'AI Tools', icon: '📋', desc: 'Summarize long text into key points instantly.' },
    { name: 'Resume Bullet Generator', path: '/ai-tools/resume-bullet-generator', cat: 'AI Tools', icon: '📄', desc: 'Generate strong resume bullet points from your experience.' },
    { name: 'Email Writer',            path: '/ai-tools/email-writer',            cat: 'AI Tools', icon: '✉️',  desc: 'Write professional emails in seconds with AI.' },
    { name: 'Caption Generator',       path: '/ai-tools/caption-generator',       cat: 'AI Tools', icon: '💬', desc: 'Generate engaging social media captions instantly.' },
    { name: 'Bio Generator',           path: '/ai-tools/bio-generator',           cat: 'AI Tools', icon: '👤', desc: 'Create a professional bio for LinkedIn or social media.' },
    { name: 'Grammar Checker',         path: '/ai-tools/grammar-checker',         cat: 'AI Tools', icon: '✅', desc: 'Check and fix grammar, spelling, and style errors.' },
    { name: 'Paraphrasing Tool',       path: '/ai-tools/paraphrasing-tool',       cat: 'AI Tools', icon: '🔄', desc: 'Rewrite text in different styles and tones.' },
    { name: 'Plagiarism Checker',      path: '/ai-tools/plagiarism-checker',      cat: 'AI Tools', icon: '🔍', desc: 'Check text for potential plagiarism issues.' },
    { name: 'Hashtag Generator',       path: '/ai-tools/hashtag-generator',       cat: 'AI Tools', icon: '#️⃣', desc: 'Generate relevant hashtags for any topic.' },
    { name: 'Essay Outline Generator', path: '/ai-tools/essay-outline-generator', cat: 'AI Tools', icon: '📑', desc: 'Create structured essay outlines in seconds.' },
    { name: 'Headline Rewriter',       path: '/ai-tools/headline-rewriter',       cat: 'AI Tools', icon: '📰', desc: 'Rewrite headlines to be more compelling.' },
    { name: 'Quiz Generator',          path: '/ai-tools/quiz-generator',          cat: 'AI Tools', icon: '❓', desc: 'Generate quiz questions from any text.' },
    { name: 'Prompt Improver',         path: '/ai-tools/prompt-improver',         cat: 'AI Tools', icon: '🤖', desc: 'Improve your AI prompts for better results.' },
    { name: 'Notes Summarizer',        path: '/ai-tools/notes-summarizer',        cat: 'AI Tools', icon: '📒', desc: 'Summarize class notes or meeting notes instantly.' },
    { name: 'Speech to Text',          path: '/ai-tools/speech-to-text',          cat: 'AI Tools', icon: '🎙️', desc: 'Convert spoken words to text in real time.' },
    { name: 'Text to Speech',          path: '/ai-tools/text-to-speech',          cat: 'AI Tools', icon: '🔊', desc: 'Convert any text to natural-sounding audio.' },
    { name: 'Tweet Generator',         path: '/ai-tools/tweet-generator',         cat: 'AI Tools', icon: '🐦', desc: 'Generate engaging tweets for any topic.' },
    { name: 'Username Generator',      path: '/ai-tools/username-generator',      cat: 'AI Tools', icon: '👤', desc: 'Generate creative usernames for any platform.' },
    { name: 'Idea Generator',          path: '/ai-tools/idea-generator',          cat: 'AI Tools', icon: '💡', desc: 'Generate creative ideas for any project or topic.' },
    { name: 'JSON Formatter',          path: '/ai-tools/json-formatter',          cat: 'AI Tools', icon: '💻', desc: 'Format and validate JSON data instantly.' },
    { name: 'Regex Generator',         path: '/ai-tools/regex-generator',         cat: 'AI Tools', icon: '💻', desc: 'Generate regular expressions from plain English.' },
    { name: 'Title Case Formatter',    path: '/ai-tools/title-case-formatter',    cat: 'AI Tools', icon: '🔤', desc: 'Convert text to proper title case formatting.' },
    { name: 'Fake Data Generator',     path: '/ai-tools/fake-data-generator',     cat: 'AI Tools', icon: '🎲', desc: 'Generate realistic fake data for testing.' },

    /* STUDENT TOOLS */
    { name: 'Citation Generator',  path: '/student-tools/citation-generator',  cat: 'Student Tools', icon: '📚', desc: 'Generate citations in APA, MLA, Chicago, and more.' },
    { name: 'Flashcard Maker',     path: '/student-tools/flashcard-maker',     cat: 'Student Tools', icon: '🃏', desc: 'Create digital flashcards for studying.' },
    { name: 'Study Timer',         path: '/student-tools/study-timer',         cat: 'Student Tools', icon: '⏱️', desc: 'Pomodoro-style study timer to boost focus.' },
    { name: 'Read Time Estimator', path: '/student-tools/read-time-estimator', cat: 'Student Tools', icon: '📖', desc: 'Estimate how long it takes to read any content.' }
];

/* ── BLOGS ─────────────────────────────────────────────── */
var BLOGS = [
    { title: 'How to Compress Images Without Losing Quality', path: '/blog/compress-images-without-losing-quality', desc: 'Reduce image file sizes by up to 80% with zero visible quality loss — free, browser-based, no sign-up required.', featured: true },
    { title: '15 Best Free Image Creation and Editing Tools Online in 2026', path: '/blog/best-free-image-creation-tools-online', desc: 'Discover 15 free online image tools for content creators. Create QR codes, YouTube thumbnails, collages, and more.' },
    { title: '60+ New Free Online Tools Just Added to ToolsNest in 2026', path: '/blog/new-free-online-tools-2026', desc: 'Discover 60+ brand-new free tools — AI writing assistants, PDF converters, calculators, file management tools, and more.' },
    { title: 'Best Free AI Writing Tools for Content Creation in 2026', path: '/blog/best-free-ai-writing-tools', desc: '10 free AI writing tools for bios, captions, emails, resumes, and more. Generate professional content instantly.' },
    { title: '22 Free Online Calculators for Finance, Academics & Everyday Use', path: '/blog/free-online-calculators-guide', desc: 'Explore 22 free online calculators for loans, GPA, taxes, unit conversions, and more.' },
    { title: 'Best Free File Conversion and PDF Tools Online in 2026', path: '/blog/best-free-file-conversion-tools', desc: 'Convert PDFs, Excel, Word, PowerPoint, and images with 19 free tools. No signup, no uploads.' },
    { title: 'How to Check for Plagiarism Online for Free', path: '/blog/check-plagiarism-online-free', desc: 'Verify your writing is original with a free plagiarism checker. Learn what to look for and how to improve your score.' },
    { title: 'How to Generate Citations in APA, MLA & Chicago for Free', path: '/blog/free-citation-generator-guide', desc: 'Format your references correctly in APA, MLA, Chicago, or Harvard style using a free citation generator.' },
    { title: 'How to Use the Pomodoro Technique to Study Effectively', path: '/blog/pomodoro-study-timer-technique', desc: 'Boost focus and beat procrastination with the Pomodoro technique and a free online study timer.' },
    { title: 'How to Paraphrase Text Online for Free', path: '/blog/paraphrase-text-online-free', desc: 'Rewrite text in your own words with five paraphrasing modes. Tips for effective paraphrasing in academic writing.' },
    { title: 'Best Free Online Grammar Checker Tools in 2026', path: '/blog/best-free-grammar-checker', desc: 'Find and fix spelling, grammar, and style errors instantly with a free online grammar checker.' },
    { title: 'How to Convert PDF to Word for Free', path: '/blog/convert-pdf-to-word-free', desc: 'Step-by-step guide to converting PDF files to editable Word documents with tips for keeping formatting intact.', featured: true },
    { title: 'How to Convert Word to PDF for Free', path: '/blog/convert-word-to-pdf-free', desc: 'Convert Word documents to PDF in seconds with free online tools. No software needed.' },
    { title: 'How to Compress Images for Your Website', path: '/blog/compress-images-for-website', desc: 'Optimize images for faster load times and better SEO. Covers formats, compression, and best practices.' },
    { title: 'How to Create the Perfect Profile Picture for Free', path: '/blog/create-perfect-profile-picture', desc: 'Create a professional profile picture for LinkedIn, social media, and resumes using free online tools.', featured: true },
    { title: 'How to Compress a PDF for Email', path: '/blog/how-to-compress-pdf-for-email', desc: 'Reduce PDF file size to fit email attachment limits without losing quality.' },
    { title: 'Best Free QR Code Generators Online in 2026', path: '/blog/best-free-qr-code-generators', desc: 'Create QR codes for URLs, Wi-Fi, text, and more. Compare the best free QR code generators.' },
    { title: 'How to Remove Image Background for Free', path: '/blog/how-to-remove-image-background-free', desc: 'Remove backgrounds from photos using AI-powered tools. Get transparent PNGs instantly.' },
    { title: 'How to Make YouTube Thumbnails for Free', path: '/blog/how-to-make-youtube-thumbnails-free', desc: 'Design eye-catching YouTube thumbnails with free tools. Pro tips included.' },
    { title: 'Best Free Instagram Tools for Content Creators in 2026', path: '/blog/best-free-instagram-tools', desc: 'Resize profile pictures, split grid posts, generate captions and hashtags.' },
    { title: 'How to Extract Audio from Video Files', path: '/blog/how-to-extract-audio-from-video', desc: 'Convert MP4 to MP3, trim audio, and extract sound from any video file.' },
    { title: 'How to Redact a PDF for Privacy and Security', path: '/blog/how-to-redact-pdf-for-privacy', desc: 'Permanently remove sensitive information from PDF documents before sharing.' },
    { title: 'Best Free AI Text Tools for Students in 2026', path: '/blog/best-ai-text-tools-for-students', desc: 'Summarize, check grammar, paraphrase with free AI tools.' },
    { title: 'Best Free Unit Converters Online', path: '/blog/best-free-unit-converters-online', desc: 'Convert weight, height, speed, and more with free online converters.' },
    { title: 'How to Calculate Your Retirement Savings Goal', path: '/blog/retirement-savings-calculator-guide', desc: 'Use a free retirement savings calculator to estimate how much you need.' },
    { title: 'How to Write a Better Resume with Free AI Tools', path: '/blog/free-ai-resume-writing-tips', desc: 'Use free AI tools to write stronger resume bullet points, professional bios, and cover letter content.' }
];

/* ── PUBLIC API ─────────────────────────────────────────── */
return {
    tools: TOOLS,
    blogs: BLOGS,

    getByCategory: function (cat) {
        return TOOLS.filter(function (t) { return t.cat === cat; });
    },

    getFeaturedTools: function () {
        return TOOLS.filter(function (t) { return t.featured; });
    },

    getFeaturedBlogs: function () {
        return BLOGS.filter(function (b) { return b.featured; });
    },

    /* Render tool cards into a container element */
    renderTools: function (containerId, tools) {
        var container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = (tools || TOOLS).map(function (t) {
            return '<a href="' + t.path + '" class="card tool-card">' +
                '<div class="card-icon">' + t.icon + '</div>' +
                '<div><h3>' + t.name + '</h3><p>' + t.desc + '</p></div>' +
                '</a>';
        }).join('');
    },

    /* Render blog cards into a container element */
    renderBlogs: function (containerId, blogs) {
        var container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = (blogs || BLOGS).map(function (b) {
            return '<a href="' + b.path + '" class="card" style="color:var(--text-main);">' +
                '<h3>' + b.title + '</h3>' +
                '<p class="mt-1">' + b.desc + '</p>' +
                '<span class="mt-2" style="display:inline-block;font-size:0.9rem;font-weight:600;color:var(--primary);">Read More &rarr;</span>' +
                '</a>';
        }).join('');
    }
};
```

})();

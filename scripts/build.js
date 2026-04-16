#!/usr/bin/env node
/**

- ToolsNest Static Pre-renderer
- ==============================
- Injects tool cards, blog posts, header, and footer directly into HTML files
- so Googlebot sees fully-rendered content without JavaScript execution.
- 
- Usage:
- node scripts/build.js
- 
- What it does:
- 1. Reads TOOLS and BLOGS data defined in this file (mirror of your registry)
- 1. Walks every .html file in the project
- 1. Injects static HTML into placeholder elements
- 1. Writes modified files to /dist/ (deploy this folder, not root)
   */

const fs   = require(‘fs’);
const path = require(‘path’);

// — CONFIGURATION ————————————————————

const SRC_DIR  = path.resolve(__dirname, ‘..’);   // repo root
const DIST_DIR = path.resolve(__dirname, ‘../dist’);

// Folders to copy as-is (not processed for HTML injection)
const STATIC_DIRS = [‘css’, ‘js’, ‘icons’, ‘assets’, ‘components’];

// HTML files/folders to skip entirely
const SKIP_PATHS = [‘dist’, ‘node_modules’, ‘.git’, ‘scripts’];

// — TOOLS REGISTRY ———————————————————–
// Mirror of your js/registry.js tool data.
// Keep this in sync when you add new tools.

const TOOLS = {
‘file-tools’: [
{ slug: ‘pdf-to-word’,      icon: ‘📄’, name: ‘PDF to Word’,         desc: ‘Convert PDF files to editable Word documents.’ },
{ slug: ‘word-to-pdf’,      icon: ‘📝’, name: ‘Word to PDF’,         desc: ‘Convert Word documents to PDF format instantly.’ },
{ slug: ‘merge-pdf’,        icon: ‘📑’, name: ‘Merge PDF’,           desc: ‘Combine multiple PDFs into a single file.’ },
{ slug: ‘split-pdf’,        icon: ‘✂️’,  name: ‘Split PDF’,          desc: ‘Split a PDF into individual pages or sections.’ },
{ slug: ‘compress-pdf’,     icon: ‘🗜️’, name: ‘Compress PDF’,        desc: ‘Reduce PDF file size without losing quality.’ },
{ slug: ‘pdf-compressor’,   icon: ‘📄’, name: ‘PDF Compressor’,      desc: ‘Compress PDF files instantly. No upload needed.’ },
{ slug: ‘jpg-to-png’,       icon: ‘🖼️’, name: ‘JPG to PNG’,         desc: ‘Convert JPG images to PNG format.’ },
{ slug: ‘png-to-jpg’,       icon: ‘🖼️’, name: ‘PNG to JPG’,         desc: ‘Convert PNG images to JPG format.’ },
{ slug: ‘heic-to-jpg’,      icon: ‘📷’, name: ‘HEIC to JPG’,         desc: ‘Convert iPhone HEIC photos to JPG.’ },
{ slug: ‘excel-to-pdf’,     icon: ‘📊’, name: ‘Excel to PDF’,        desc: ‘Convert Excel spreadsheets to PDF.’ },
{ slug: ‘mp4-to-mp3’,       icon: ‘🎵’, name: ‘MP4 to MP3’,          desc: ‘Extract audio from video files.’ },
],
‘image-tools’: [
{ slug: ‘image-compressor’,      icon: ‘🖼️’, name: ‘Compress Image’,     desc: ‘Reduce image file size without losing quality.’ },
{ slug: ‘image-resizer’,         icon: ‘📐’, name: ‘Resize Image’,        desc: ‘Resize images to any dimension instantly.’ },
{ slug: ‘image-to-text’,         icon: ‘🔤’, name: ‘Image to Text (OCR)’, desc: ‘Extract text from any image or screenshot.’ },
{ slug: ‘qr-code-generator’,     icon: ‘📱’, name: ‘QR Code Generator’,   desc: ‘Create QR codes for URLs, Wi-Fi, and more.’ },
{ slug: ‘background-remover’,    icon: ‘✂️’, name: ‘Background Remover’,  desc: ‘Remove image backgrounds with AI.’ },
{ slug: ‘youtube-thumbnail-maker’, icon: ‘▶️’, name: ‘YouTube Thumbnail’, desc: ‘Design 1280×720 thumbnails for free.’ },
{ slug: ‘favicon-generator’,     icon: ‘⭐’, name: ‘Favicon Generator’,   desc: ‘Convert any image into a website favicon.’ },
{ slug: ‘collage-maker’,         icon: ‘🖼️’, name: ‘Photo Collage Maker’, desc: ‘Combine multiple images into a collage.’ },
],
‘calculators’: [
{ slug: ‘bmi-calculator’,        icon: ‘⚖️’, name: ‘BMI Calculator’,      desc: ‘Calculate your Body Mass Index instantly.’ },
{ slug: ‘loan-calculator’,       icon: ‘💰’, name: ‘Loan Calculator’,      desc: ‘Estimate monthly payments and total interest.’ },
{ slug: ‘gpa-calculator’,        icon: ‘🎓’, name: ‘GPA Calculator’,       desc: ‘Calculate your GPA quickly and accurately.’ },
{ slug: ‘percentage-calculator’, icon: ‘🔢’, name: ‘Percentage Calculator’,desc: ‘Calculate percentages and percentage change.’ },
{ slug: ‘retirement-calculator’, icon: ‘🏖️’, name: ‘Retirement Calculator’,desc: ‘Estimate your retirement savings goal.’ },
{ slug: ‘tax-calculator’,        icon: ‘🧾’, name: ‘Tax Calculator’,       desc: ‘Estimate your income tax quickly.’ },
{ slug: ‘unit-converter’,        icon: ‘📏’, name: ‘Unit Converter’,       desc: ‘Convert weight, height, speed, and more.’ },
],
‘ai-tools’: [
{ slug: ‘text-summarizer’,       icon: ‘🤖’, name: ‘Text Summarizer’,      desc: ‘Summarize long articles into key points.’ },
{ slug: ‘resume-bullet-generator’,icon: ‘💼’, name: ‘Resume Bullet Generator’, desc: ‘Turn job duties into powerful resume bullets.’ },
{ slug: ‘email-writer’,          icon: ‘✉️’, name: ‘Email Writer’,          desc: ‘Craft professional emails for any situation.’ },
{ slug: ‘caption-generator’,     icon: ‘📲’, name: ‘Caption Generator’,     desc: ‘Generate social media captions instantly.’ },
{ slug: ‘cover-letter-generator’,icon: ‘📝’, name: ‘Cover Letter Generator’,desc: ‘Generate a professional cover letter with AI.’ },
{ slug: ‘bio-generator’,         icon: ‘👤’, name: ‘Bio Generator’,         desc: ‘Create polished professional bios in seconds.’ },
{ slug: ‘grammar-checker’,       icon: ‘✅’, name: ‘Grammar Checker’,       desc: ‘Fix grammar, spelling, and style errors.’ },
{ slug: ‘paraphrasing-tool’,     icon: ‘📝’, name: ‘Paraphrasing Tool’,     desc: ‘Rewrite text instantly with multiple modes.’ },
{ slug: ‘plagiarism-checker’,    icon: ‘🔍’, name: ‘Plagiarism Checker’,    desc: ‘Check your text for originality.’ },
{ slug: ‘word-counter’,          icon: ‘🔢’, name: ‘Word Counter’,          desc: ‘Count words, characters, and reading time.’ },
{ slug: ‘text-to-speech’,        icon: ‘🔈’, name: ‘Text to Speech’,        desc: ‘Convert text to audio with adjustable voice.’ },
{ slug: ‘hashtag-generator’,     icon: ‘📋’, name: ‘Hashtag Generator’,     desc: ‘Generate targeted hashtags for any platform.’ },
],
‘student-tools’: [
{ slug: ‘citation-generator’,    icon: ‘📚’, name: ‘Citation Generator’,    desc: ‘Generate APA, MLA, and Chicago citations.’ },
{ slug: ‘flashcard-maker’,       icon: ‘🗂️’, name: ‘Flashcard Maker’,       desc: ‘Create digital flashcards for active recall.’ },
{ slug: ‘pomodoro-timer’,        icon: ‘⏱️’, name: ‘Pomodoro Timer’,        desc: ‘Study smarter with the Pomodoro technique.’ },
{ slug: ‘essay-outline-generator’,icon: ‘📝’, name: ‘Essay Outline Generator’,desc: ‘Create structured essay outlines instantly.’ },
{ slug: ‘quiz-generator’,        icon: ‘❓’, name: ‘Quiz Generator’,        desc: ‘Create interactive quizzes from any text.’ },
],
};

// — BLOG REGISTRY ————————————————————

const BLOGS = [
{ slug: ‘compress-images-without-losing-quality’, title: ‘How to Compress Images Without Losing Quality’,     date: ‘March 5, 2026’,    category: ‘Image Tools’ },
{ slug: ‘best-free-image-creation-tools-online’,  title: ‘15 Best Free Image Creation and Editing Tools Online in 2026’, date: ‘Feb 28, 2026’, category: ‘Image Tools’ },
{ slug: ‘new-free-online-tools-2026’,             title: ‘60+ New Free Online Tools Just Added to ToolsNest in 2026’, date: ‘Feb 20, 2026’, category: ‘News’ },
{ slug: ‘best-free-ai-writing-tools’,             title: ‘Best Free AI Writing Tools for Content Creation in 2026’, date: ‘Feb 15, 2026’, category: ‘AI Tools’ },
{ slug: ‘free-online-calculators-guide’,          title: ‘22 Free Online Calculators for Finance, Academics & Everyday Use’, date: ‘Feb 10, 2026’, category: ‘Calculators’ },
{ slug: ‘best-free-file-conversion-tools’,        title: ‘Best Free File Conversion and PDF Tools Online in 2026’, date: ‘Feb 5, 2026’, category: ‘File Tools’ },
{ slug: ‘check-plagiarism-online-free’,           title: ‘How to Check for Plagiarism Online for Free’,      date: ‘Jan 30, 2026’,   category: ‘AI Tools’ },
{ slug: ‘free-citation-generator-guide’,          title: ‘How to Generate Citations in APA, MLA & Chicago for Free’, date: ‘Jan 25, 2026’, category: ‘Student Tools’ },
{ slug: ‘convert-pdf-to-word-free’,               title: ‘How to Convert PDF to Word for Free’,              date: ‘Jan 20, 2026’,   category: ‘File Tools’ },
{ slug: ‘best-free-pdf-tools-online’,             title: ‘Best Free PDF Tools Online in 2026’,               date: ‘Jan 15, 2026’,   category: ‘File Tools’ },
{ slug: ‘resize-images-online’,                   title: ‘How to Resize Images Online Without Losing Quality’, date: ‘Jan 10, 2026’, category: ‘Image Tools’ },
{ slug: ‘compress-pdf-without-losing-quality’,    title: ‘How to Compress a PDF Without Losing Quality’,     date: ‘Jan 5, 2026’,    category: ‘File Tools’ },
];

// — HTML GENERATORS –––––––––––––––––––––––––––––

function toolCard(tool, category) {
return `<a href="/${category}/${tool.slug}" class="ptool-card">

  <div class="ptool-icon" aria-hidden="true">${tool.icon}</div>
  <div class="ptool-info">
    <h3>${tool.name}</h3>
    <p>${tool.desc}</p>
  </div>
  <span class="ptool-arrow" aria-hidden="true">→</span>
</a>`;
}

function blogCard(blog) {
return `<a href="/blog/${blog.slug}" class="blog-card">

  <div class="blog-card-meta">
    <span class="blog-cat">${blog.category}</span>
    <span class="blog-date">${blog.date}</span>
  </div>
  <h3 class="blog-card-title">${blog.title}</h3>
  <span class="blog-read-more">Read More →</span>
</a>`;
}

function staticHeader() {
return `<header class="site-header" role="banner">

  <div class="container header-inner">
    <a href="/" class="logo" aria-label="ToolsNest home">
      <span class="logo-icon" aria-hidden="true">🪺</span>
      <span class="logo-text">ToolsNest</span>
    </a>
    <nav class="main-nav" aria-label="Main navigation">
      <a href="/file-tools">File Tools</a>
      <a href="/image-tools">Image Tools</a>
      <a href="/calculators">Calculators</a>
      <a href="/ai-tools">AI Tools</a>
      <a href="/student-tools">Student Tools</a>
      <a href="/all-tools">All Tools</a>
      <a href="/blog">Blog</a>
    </nav>
    <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
  </div>
</header>`;
}

function staticFooter() {
const year = new Date().getFullYear();
return `<footer class="site-footer" role="contentinfo">

  <div class="container footer-inner">
    <div class="footer-brand">
      <a href="/" class="logo" aria-label="ToolsNest home">
        <span class="logo-icon" aria-hidden="true">🪺</span>
        <span class="logo-text">ToolsNest</span>
      </a>
      <p>100+ free online tools. No signup, no limits.</p>
    </div>
    <nav class="footer-nav" aria-label="Footer navigation">
      <div class="footer-col">
        <h4>Tools</h4>
        <a href="/file-tools">File Tools</a>
        <a href="/image-tools">Image Tools</a>
        <a href="/calculators">Calculators</a>
        <a href="/ai-tools">AI Tools</a>
        <a href="/student-tools">Student Tools</a>
        <a href="/all-tools">All Tools</a>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="/blog">Blog</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>
    </nav>
  </div>
  <div class="footer-bottom">
    <p>© ${year} ToolsNest · Free Online Tools · <a href="/sitemap-index.xml">Sitemap</a></p>
  </div>
</footer>`;
}

// — INJECTION HELPERS ––––––––––––––––––––––––––––

/**

- Detect which category page this HTML file belongs to (if any).
- Returns category key like ‘file-tools’, or null.
  */
  function detectCategory(relPath) {
  for (const cat of Object.keys(TOOLS)) {
  if (relPath.startsWith(cat + path.sep) || relPath.startsWith(cat + ‘/’)) {
  // Only inject on the category index (e.g. file-tools/index.html)
  const parts = relPath.replace(/\/g, ‘/’).split(’/’);
  if (parts.length === 2 && parts[1] === ‘index.html’) return cat;
  }
  }
  return null;
  }

/**

- Apply all static injections to an HTML string.
  */
  function processHTML(html, relPath) {

// 1. Replace <script src="/components/header.js"> with static header
//    Remove the script tag - static HTML is already in place, no need for JS to re-render it
html = html.replace(
/<script\s+src=”/components/header.js”[^>]*></script>/i,
staticHeader()
);

// 2. Replace <script src="/components/footer.js"> with static footer
//    Remove the script tag - static HTML is already in place, no need for JS to re-render it
html = html.replace(
/<script\s+src=”/components/footer.js”[^>]*></script>/i,
staticFooter()
);

// 3. Remove registry.js script tag - tool/blog cards are already injected statically.
//    Leaving it in causes registry.js to append a second set of cards on top.
html = html.replace(
/<script[^>]+src=”[^”]*registry.js”[^>]*></script>/i,
‘’
);

// 4. Inject blog cards on homepage
if (relPath === ‘index.html’) {
const featuredBlogs = BLOGS.slice(0, 3);
const blogHTML = featuredBlogs.map(blogCard).join(’\n’);
// Replace the empty blog grid div
html = html.replace(
/(<div[^>]+id=“homepage-blog-grid”[^>]*>)(\s*</div>)/i,
`$1\n${blogHTML}\n</div>`
);
}

// 5. Inject blog listing on /blog/index.html
if (relPath === path.join(‘blog’, ‘index.html’) || relPath === ‘blog/index.html’) {
const allBlogHTML = BLOGS.map(blogCard).join(’\n’);
// Try replacing an existing empty blog-grid div first
const replaced = html.replace(
/(<div[^>]+id=“blog-grid”[^>]*>)(\s*</div>)/i,
`$1\n${allBlogHTML}\n</div>`
);
if (replaced !== html) {
html = replaced;
} else {
// Fallback: insert a static grid right after <h1>Blog</h1>
// but ONLY if the page doesn’t already have statically-rendered cards
if (!html.includes(‘class=“blog-card”’)) {
html = html.replace(
/(<h1[^>]*>[^<]*Blog[^<]*</h1>)/i,
`$1\n<div class="blog-grid-static">\n${allBlogHTML}\n</div>`
);
}
}
}

// 5. Inject tool cards on category index pages
const cat = detectCategory(relPath);
if (cat && TOOLS[cat]) {
const cardsHTML = TOOLS[cat].map(t => toolCard(t, cat)).join(’\n’);
// Try to inject into a div with id matching the category or a tools-grid class
const injected = html.replace(
/(<div[^>]+(?:id=“tools-grid”|class=”[^”]*tools-grid[^”]*”)[^>]*>)(\s*</div>)/i,
`$1\n${cardsHTML}\n</div>`
);
if (injected !== html) {
html = injected;
} else {
// Fallback: insert after the page <h1>
html = html.replace(
/(<h1[^>]*>.*?</h1>)/is,
`$1\n<div class="tools-grid-static">\n${cardsHTML}\n</div>`
);
}
}

return html;
}

// — FILE SYSTEM HELPERS ——————————————————

function ensureDir(dir) {
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
ensureDir(dest);
for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
const srcPath  = path.join(src, entry.name);
const destPath = path.join(dest, entry.name);
if (entry.isDirectory()) {
copyDir(srcPath, destPath);
} else {
fs.copyFileSync(srcPath, destPath);
}
}
}

function walkHTML(dir, base, results = []) {
for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
if (SKIP_PATHS.includes(entry.name)) continue;
const full = path.join(dir, entry.name);
if (entry.isDirectory()) {
walkHTML(full, base, results);
} else if (entry.name.endsWith(’.html’)) {
results.push(path.relative(base, full));
}
}
return results;
}

// — MAIN BUILD —————————————————————

function build() {
console.log(‘🔨 ToolsNest build started…\n’);

// Clean dist
if (fs.existsSync(DIST_DIR)) fs.rmSync(DIST_DIR, { recursive: true });
ensureDir(DIST_DIR);

// Copy static asset directories
for (const dir of STATIC_DIRS) {
const src = path.join(SRC_DIR, dir);
if (fs.existsSync(src)) {
copyDir(src, path.join(DIST_DIR, dir));
console.log(`  ✓ Copied /${dir}`);
}
}

// Copy root-level non-HTML files (robots.txt, manifest.json, sitemap, sw.js, etc.)
for (const entry of fs.readdirSync(SRC_DIR, { withFileTypes: true })) {
if (entry.isFile() && !entry.name.endsWith(’.html’) && !SKIP_PATHS.includes(entry.name)) {
fs.copyFileSync(path.join(SRC_DIR, entry.name), path.join(DIST_DIR, entry.name));
}
}
console.log(’  ✓ Copied root static files\n’);

// Process all HTML files
const htmlFiles = walkHTML(SRC_DIR, SRC_DIR);
let count = 0;

for (const relPath of htmlFiles) {
const srcFile  = path.join(SRC_DIR, relPath);
const destFile = path.join(DIST_DIR, relPath);
ensureDir(path.dirname(destFile));

const original  = fs.readFileSync(srcFile, 'utf8');
const processed = processHTML(original, relPath.replace(/\\/g, '/'));
fs.writeFileSync(destFile, processed, 'utf8');
count++;

}

console.log(`  ✓ Pre-rendered ${count} HTML files\n`);
console.log(‘✅ Build complete → /dist\n’);
console.log(’   Deploy the /dist folder to your hosting provider.’);
}

build();
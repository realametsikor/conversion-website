#!/usr/bin/env node
/**
 * ToolsNest Static Pre-renderer - PREMIUM ULTRA-MODERN EDITION
 * =============================================================
 * Injects tool cards and blog posts as static HTML for SEO using Lucide SVGs.
 * Usage: node scripts/build.js
 */

const fs   = require('fs');
const path = require('path');

const SRC_DIR  = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(__dirname, '../dist');

const STATIC_DIRS = ['css', 'js', 'icons', 'assets', 'components'];
const SKIP_PATHS  = ['dist', 'node_modules', '.git', 'scripts'];

// ─── TOOLS (Now using Lucide icon names instead of Emojis) ────────────────────

const TOOLS = {
  'file-tools': [
    { slug: 'pdf-to-word',             icon: 'file-text',      name: 'PDF to Word',            desc: 'Convert PDF files to editable Word documents.' },
    { slug: 'word-to-pdf',             icon: 'file-check',     name: 'Word to PDF',            desc: 'Convert Word documents to PDF format instantly.' },
    { slug: 'merge-pdf',               icon: 'files',          name: 'Merge PDF',              desc: 'Combine multiple PDFs into a single file.' },
    { slug: 'split-pdf',               icon: 'split-square-vertical', name: 'Split PDF',       desc: 'Split a PDF into individual pages or sections.' },
    { slug: 'compress-pdf',            icon: 'file-archive',   name: 'Compress PDF',           desc: 'Reduce PDF file size without losing quality.' },
    { slug: 'pdf-compressor',          icon: 'file-archive',   name: 'PDF Compressor',         desc: 'Compress PDF files instantly. No upload needed.' },
    { slug: 'jpg-to-png',              icon: 'image-play',     name: 'JPG to PNG',             desc: 'Convert JPG images to PNG format.' },
    { slug: 'png-to-jpg',              icon: 'image-plus',     name: 'PNG to JPG',             desc: 'Convert PNG images to JPG format.' },
    { slug: 'heic-to-jpg',             icon: 'smartphone',     name: 'HEIC to JPG',            desc: 'Convert iPhone HEIC photos to JPG.' },
    { slug: 'excel-to-pdf',            icon: 'table',          name: 'Excel to PDF',           desc: 'Convert Excel spreadsheets to PDF.' },
    { slug: 'mp4-to-mp3',              icon: 'music',          name: 'MP4 to MP3',             desc: 'Extract audio from video files.' },
  ],
  'image-tools': [
    { slug: 'image-compressor',        icon: 'minimize',       name: 'Compress Image',         desc: 'Reduce image file size without losing quality.' },
    { slug: 'image-resizer',           icon: 'scaling',        name: 'Resize Image',           desc: 'Resize images to any dimension instantly.' },
    { slug: 'image-to-text',           icon: 'scan-text',      name: 'Image to Text (OCR)',    desc: 'Extract text from any image or screenshot.' },
    { slug: 'qr-code-generator',       icon: 'qr-code',        name: 'QR Code Generator',      desc: 'Create QR codes for URLs, Wi-Fi, and more.' },
    { slug: 'background-remover',      icon: 'eraser',         name: 'Background Remover',     desc: 'Remove image backgrounds with AI.' },
    { slug: 'youtube-thumbnail-maker', icon: 'youtube',        name: 'YouTube Thumbnail',      desc: 'Design 1280x720 thumbnails for free.' },
    { slug: 'favicon-generator',       icon: 'globe',          name: 'Favicon Generator',      desc: 'Convert any image into a website favicon.' },
    { slug: 'collage-maker',           icon: 'layout',         name: 'Photo Collage Maker',    desc: 'Combine multiple images into a collage.' },
  ],
  'calculators': [
    { slug: 'bmi-calculator',          icon: 'scale',          name: 'BMI Calculator',         desc: 'Calculate your Body Mass Index instantly.' },
    { slug: 'loan-calculator',         icon: 'circle-dollar-sign', name: 'Loan Calculator',    desc: 'Estimate monthly payments and total interest.' },
    { slug: 'gpa-calculator',          icon: 'graduation-cap', name: 'GPA Calculator',         desc: 'Calculate your GPA quickly and accurately.' },
    { slug: 'percentage-calculator',   icon: 'percent',        name: 'Percentage Calculator',  desc: 'Calculate percentages and percentage change.' },
    { slug: 'retirement-calculator',   icon: 'piggy-bank',     name: 'Retirement Calculator',  desc: 'Estimate your retirement savings goal.' },
    { slug: 'tax-calculator',          icon: 'receipt',        name: 'Tax Calculator',         desc: 'Estimate your income tax quickly.' },
    { slug: 'unit-converter',          icon: 'ruler',          name: 'Unit Converter',         desc: 'Convert weight, height, speed, and more.' },
  ],
  'ai-tools': [
    { slug: 'text-summarizer',         icon: 'bot',            name: 'Text Summarizer',        desc: 'Summarize long articles into key points.' },
    { slug: 'resume-bullet-generator', icon: 'briefcase',      name: 'Resume Bullet Gen',      desc: 'Turn job duties into powerful resume bullets.' },
    { slug: 'email-writer',            icon: 'mail',           name: 'Email Writer',           desc: 'Craft professional emails for any situation.' },
    { slug: 'caption-generator',       icon: 'smartphone',     name: 'Caption Generator',      desc: 'Generate social media captions instantly.' },
    { slug: 'cover-letter-generator',  icon: 'pen-tool',       name: 'Cover Letter Gen',       desc: 'Generate a professional cover letter with AI.' },
    { slug: 'bio-generator',           icon: 'user',           name: 'Bio Generator',          desc: 'Create polished professional bios in seconds.' },
    { slug: 'grammar-checker',         icon: 'spell-check',    name: 'Grammar Checker',        desc: 'Fix grammar, spelling, and style errors.' },
    { slug: 'paraphrasing-tool',       icon: 'refresh-cw',     name: 'Paraphrasing Tool',      desc: 'Rewrite text instantly with multiple modes.' },
    { slug: 'plagiarism-checker',      icon: 'file-search',    name: 'Plagiarism Checker',     desc: 'Check your text for originality.' },
    { slug: 'word-counter',            icon: 'bar-chart-2',    name: 'Word Counter',           desc: 'Count words, characters, and reading time.' },
    { slug: 'text-to-speech',          icon: 'volume-2',       name: 'Text to Speech',         desc: 'Convert text to audio with adjustable voice.' },
    { slug: 'hashtag-generator',       icon: 'hash',           name: 'Hashtag Generator',      desc: 'Generate targeted hashtags for any platform.' },
  ],
  'student-tools': [
    { slug: 'citation-generator',      icon: 'book-text',      name: 'Citation Generator',     desc: 'Generate APA, MLA, and Chicago citations.' },
    { slug: 'flashcard-maker',         icon: 'layers',         name: 'Flashcard Maker',        desc: 'Create digital flashcards for active recall.' },
    { slug: 'pomodoro-timer',          icon: 'timer',          name: 'Pomodoro Timer',         desc: 'Study smarter with the Pomodoro technique.' },
    { slug: 'essay-outline-generator', icon: 'list-tree',      name: 'Essay Outline Gen',      desc: 'Create structured essay outlines instantly.' },
    { slug: 'quiz-generator',          icon: 'help-circle',    name: 'Quiz Generator',         desc: 'Create interactive quizzes from any text.' },
  ],
};

const CATEGORY_COLORS = {
  'file-tools': 'ptool-icon--blue',
  'image-tools': 'ptool-icon--pink',
  'calculators': 'ptool-icon--green',
  'ai-tools': 'ptool-icon--purple',
  'student-tools': 'ptool-icon--amber'
};

// ─── BLOGS ────────────────────────────────────────────────────────────────────

const BLOGS = [
  { slug: 'compress-images-without-losing-quality', title: 'How to Compress Images Without Losing Quality',                date: 'March 5, 2026',  category: 'Image Tools'   },
  { slug: 'best-free-image-creation-tools-online',  title: '15 Best Free Image Creation and Editing Tools Online in 2026', date: 'Feb 28, 2026',   category: 'Image Tools'   },
  { slug: 'new-free-online-tools-2026',             title: '60+ New Free Online Tools Just Added to ToolsNest in 2026',    date: 'Feb 20, 2026',   category: 'News'          },
  { slug: 'best-free-ai-writing-tools',             title: 'Best Free AI Writing Tools for Content Creation in 2026',      date: 'Feb 15, 2026',   category: 'AI Tools'      },
  { slug: 'free-online-calculators-guide',          title: '22 Free Online Calculators for Finance, Academics & Everyday Use', date: 'Feb 10, 2026', category: 'Calculators' },
  { slug: 'best-free-file-conversion-tools',        title: 'Best Free File Conversion and PDF Tools Online in 2026',       date: 'Feb 5, 2026',    category: 'File Tools'    },
];

// ─── HTML GENERATORS (Now generating the modern structure) ───────────────────

function toolCard(tool, category) {
  const colorClass = CATEGORY_COLORS[category] || 'ptool-icon--blue';
  return [
    '<a href="/' + category + '/' + tool.slug + '" class="ptool-card">',
    '  <div class="ptool-icon ' + colorClass + '" aria-hidden="true"><i data-lucide="' + tool.icon + '" width="22" height="22"></i></div>',
    '  <div class="ptool-info"><h3>' + tool.name + '</h3><p>' + tool.desc + '</p></div>',
    '  <span class="ptool-arrow" aria-hidden="true"><i data-lucide="arrow-right" width="20" height="20"></i></span>',
    '</a>',
  ].join('\n');
}

function blogCard(blog) {
  return [
    '<a href="/blog/' + blog.slug + '" class="blog-card">',
    '  <div class="blog-card-meta">',
    '    <span class="blog-cat">' + blog.category + '</span>',
    '    <span class="blog-date">' + blog.date + '</span>',
    '  </div>',
    '  <h3 class="blog-card-title">' + blog.title + '</h3>',
    '  <span class="blog-read-more" style="display:flex;align-items:center;gap:0.25rem;">Read More <i data-lucide="arrow-right" width="16" height="16"></i></span>',
    '</a>',
  ].join('\n');
}

// ─── INJECTION ────────────────────────────────────────────────────────────────

function detectCategory(relPath) {
  var norm = relPath.replace(/\\/g, '/');
  var cats = Object.keys(TOOLS);
  for (var i = 0; i < cats.length; i++) {
    if (norm === cats[i] + '/index.html') return cats[i];
  }
  return null;
}

function processHTML(html, relPath) {
  var norm = relPath.replace(/\\/g, '/');

  // ── Homepage blog grid ──
  if (norm === 'index.html') {
    var blogHTML = BLOGS.slice(0, 3).map(blogCard).join('\n');
    var before = html;
    html = html.replace(/(<div[^>]+id="homepage-blog-grid"[^>]*>)([\s\S]*?)(<\/div>)/, '$1\n' + blogHTML + '\n$3');
    if (html === before) html = html.replace(/(<div[^>]+class="grid-3"[^>]*>)([\s\S]*?)(<\/div>)/, '$1\n' + blogHTML + '\n$3');
  }

  // ── Blog listing page ──
  if (norm === 'blog/index.html') {
    var allBlogHTML = BLOGS.map(blogCard).join('\n');
    var before2 = html;
    html = html.replace(/(<div[^>]+id="blog-grid"[^>]*>)([\s\S]*?)(<\/div>)/, '$1\n' + allBlogHTML + '\n$3');
    if (html === before2) html = html.replace(/(<h1[^>]*>[\s\S]*?<\/h1>)/, '$1\n<div class="blog-listing-static">\n' + allBlogHTML + '\n</div>');
  }

  // ── Category tool grids ──
  var cat = detectCategory(norm);
  if (cat && TOOLS[cat]) {
    var cardsHTML = TOOLS[cat].map(function(t) { return toolCard(t, cat); }).join('\n');
    var before3 = html;
    
    // First target tools-grid-static or tools-grid
    html = html.replace(
      /(<div[^>]+(?:id="tools-grid"|class="[^"]*tools-grid-static[^"]*"|class="[^"]*tools-grid[^"]*")[^>]*>)([\s\S]*?)(<\/div>)/,
      '$1\n' + cardsHTML + '\n$3'
    );

    if (html === before3) {
      html = html.replace(/(<h1[^>]*>[\s\S]*?<\/h1>)/, '$1\n<div class="tools-grid-static">\n' + cardsHTML + '\n</div>');
    }
  }

  return html;
}

// ─── FILE SYSTEM & BUILD ──────────────────────────────────────────────────────

function ensureDir(dir) { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); }

function copyDir(src, dest) {
  ensureDir(dest);
  var entries = fs.readdirSync(src, { withFileTypes: true });
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var srcPath  = path.join(src, entry.name);
    var destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

function walkHTML(dir, base, results) {
  if (!results) results = [];
  var entries = fs.readdirSync(dir, { withFileTypes: true });
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    if (SKIP_PATHS.indexOf(entry.name) !== -1) continue;
    var full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHTML(full, base, results);
    else if (entry.name.endsWith('.html')) results.push(path.relative(base, full));
  }
  return results;
}

function build() {
  console.log('ToolsNest Modern Build started...\n');
  if (fs.existsSync(DIST_DIR)) fs.rmSync(DIST_DIR, { recursive: true });
  ensureDir(DIST_DIR);

  for (var i = 0; i < STATIC_DIRS.length; i++) {
    var src = path.join(SRC_DIR, STATIC_DIRS[i]);
    if (fs.existsSync(src)) {
      copyDir(src, path.join(DIST_DIR, STATIC_DIRS[i]));
      console.log('Copied /' + STATIC_DIRS[i]);
    }
  }

  var rootEntries = fs.readdirSync(SRC_DIR, { withFileTypes: true });
  for (var j = 0; j < rootEntries.length; j++) {
    var e = rootEntries[j];
    if (e.isFile() && !e.name.endsWith('.html') && SKIP_PATHS.indexOf(e.name) === -1) {
      fs.copyFileSync(path.join(SRC_DIR, e.name), path.join(DIST_DIR, e.name));
    }
  }
  console.log('Copied root static files\n');

  var htmlFiles = walkHTML(SRC_DIR, SRC_DIR);
  var count = 0;

  for (var k = 0; k < htmlFiles.length; k++) {
    var relPath  = htmlFiles[k];
    var srcFile  = path.join(SRC_DIR, relPath);
    var destFile = path.join(DIST_DIR, relPath);
    ensureDir(path.dirname(destFile));

    var original  = fs.readFileSync(srcFile, 'utf8');
    var processed = processHTML(original, relPath);
    
    // Safety check to ensure script tags for icons are present
    if (processed.includes('data-lucide=') && !processed.includes('lucide.createIcons()')) {
        processed = processed.replace('</body>', '<script>if(typeof lucide !== "undefined"){lucide.createIcons();}</script>\n</body>');
    }
    
    fs.writeFileSync(destFile, processed, 'utf8');
    count++;
  }

  console.log('Pre-rendered ' + count + ' HTML files with Premium UI\n');
  console.log('Build complete -> /dist');
}

build();

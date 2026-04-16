#!/usr/bin/env node
/**
 * ToolsNest Static Pre-renderer
 * ==============================
 * Injects tool cards and blog posts as static HTML for SEO.
 * Does NOT touch your header or footer - those stay as-is.
 * Usage: node scripts/build.js
 */

const fs   = require('fs');
const path = require('path');

const SRC_DIR  = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(__dirname, '../dist');

const STATIC_DIRS = ['css', 'js', 'icons', 'assets', 'components'];
const SKIP_PATHS  = ['dist', 'node_modules', '.git', 'scripts'];

// ─── TOOLS ────────────────────────────────────────────────────────────────────

const TOOLS = {
  'file-tools': [
    { slug: 'pdf-to-word',             icon: '📄', name: 'PDF to Word',            desc: 'Convert PDF files to editable Word documents.' },
    { slug: 'word-to-pdf',             icon: '📝', name: 'Word to PDF',            desc: 'Convert Word documents to PDF format instantly.' },
    { slug: 'merge-pdf',               icon: '📑', name: 'Merge PDF',              desc: 'Combine multiple PDFs into a single file.' },
    { slug: 'split-pdf',               icon: '✂️',  name: 'Split PDF',             desc: 'Split a PDF into individual pages or sections.' },
    { slug: 'compress-pdf',            icon: '🗜️', name: 'Compress PDF',           desc: 'Reduce PDF file size without losing quality.' },
    { slug: 'pdf-compressor',          icon: '📄', name: 'PDF Compressor',         desc: 'Compress PDF files instantly. No upload needed.' },
    { slug: 'jpg-to-png',              icon: '🖼️', name: 'JPG to PNG',            desc: 'Convert JPG images to PNG format.' },
    { slug: 'png-to-jpg',              icon: '🖼️', name: 'PNG to JPG',            desc: 'Convert PNG images to JPG format.' },
    { slug: 'heic-to-jpg',             icon: '📷', name: 'HEIC to JPG',            desc: 'Convert iPhone HEIC photos to JPG.' },
    { slug: 'excel-to-pdf',            icon: '📊', name: 'Excel to PDF',           desc: 'Convert Excel spreadsheets to PDF.' },
    { slug: 'mp4-to-mp3',              icon: '🎵', name: 'MP4 to MP3',             desc: 'Extract audio from video files.' },
  ],
  'image-tools': [
    { slug: 'image-compressor',        icon: '🖼️', name: 'Compress Image',         desc: 'Reduce image file size without losing quality.' },
    { slug: 'image-resizer',           icon: '📐', name: 'Resize Image',           desc: 'Resize images to any dimension instantly.' },
    { slug: 'image-to-text',           icon: '🔤', name: 'Image to Text (OCR)',    desc: 'Extract text from any image or screenshot.' },
    { slug: 'qr-code-generator',       icon: '📱', name: 'QR Code Generator',      desc: 'Create QR codes for URLs, Wi-Fi, and more.' },
    { slug: 'background-remover',      icon: '✂️', name: 'Background Remover',     desc: 'Remove image backgrounds with AI.' },
    { slug: 'youtube-thumbnail-maker', icon: '▶️', name: 'YouTube Thumbnail',      desc: 'Design 1280x720 thumbnails for free.' },
    { slug: 'favicon-generator',       icon: '⭐', name: 'Favicon Generator',      desc: 'Convert any image into a website favicon.' },
    { slug: 'collage-maker',           icon: '🖼️', name: 'Photo Collage Maker',   desc: 'Combine multiple images into a collage.' },
  ],
  'calculators': [
    { slug: 'bmi-calculator',          icon: '⚖️', name: 'BMI Calculator',         desc: 'Calculate your Body Mass Index instantly.' },
    { slug: 'loan-calculator',         icon: '💰', name: 'Loan Calculator',         desc: 'Estimate monthly payments and total interest.' },
    { slug: 'gpa-calculator',          icon: '🎓', name: 'GPA Calculator',          desc: 'Calculate your GPA quickly and accurately.' },
    { slug: 'percentage-calculator',   icon: '🔢', name: 'Percentage Calculator',   desc: 'Calculate percentages and percentage change.' },
    { slug: 'retirement-calculator',   icon: '🏖️', name: 'Retirement Calculator',  desc: 'Estimate your retirement savings goal.' },
    { slug: 'tax-calculator',          icon: '🧾', name: 'Tax Calculator',          desc: 'Estimate your income tax quickly.' },
    { slug: 'unit-converter',          icon: '📏', name: 'Unit Converter',          desc: 'Convert weight, height, speed, and more.' },
  ],
  'ai-tools': [
    { slug: 'text-summarizer',         icon: '🤖', name: 'Text Summarizer',         desc: 'Summarize long articles into key points.' },
    { slug: 'resume-bullet-generator', icon: '💼', name: 'Resume Bullet Generator', desc: 'Turn job duties into powerful resume bullets.' },
    { slug: 'email-writer',            icon: '✉️', name: 'Email Writer',            desc: 'Craft professional emails for any situation.' },
    { slug: 'caption-generator',       icon: '📲', name: 'Caption Generator',       desc: 'Generate social media captions instantly.' },
    { slug: 'cover-letter-generator',  icon: '📝', name: 'Cover Letter Generator',  desc: 'Generate a professional cover letter with AI.' },
    { slug: 'bio-generator',           icon: '👤', name: 'Bio Generator',           desc: 'Create polished professional bios in seconds.' },
    { slug: 'grammar-checker',         icon: '✅', name: 'Grammar Checker',         desc: 'Fix grammar, spelling, and style errors.' },
    { slug: 'paraphrasing-tool',       icon: '📝', name: 'Paraphrasing Tool',       desc: 'Rewrite text instantly with multiple modes.' },
    { slug: 'plagiarism-checker',      icon: '🔍', name: 'Plagiarism Checker',      desc: 'Check your text for originality.' },
    { slug: 'word-counter',            icon: '🔢', name: 'Word Counter',            desc: 'Count words, characters, and reading time.' },
    { slug: 'text-to-speech',          icon: '🔈', name: 'Text to Speech',          desc: 'Convert text to audio with adjustable voice.' },
    { slug: 'hashtag-generator',       icon: '📋', name: 'Hashtag Generator',       desc: 'Generate targeted hashtags for any platform.' },
  ],
  'student-tools': [
    { slug: 'citation-generator',      icon: '📚', name: 'Citation Generator',      desc: 'Generate APA, MLA, and Chicago citations.' },
    { slug: 'flashcard-maker',         icon: '🗂️', name: 'Flashcard Maker',         desc: 'Create digital flashcards for active recall.' },
    { slug: 'pomodoro-timer',          icon: '⏱️', name: 'Pomodoro Timer',          desc: 'Study smarter with the Pomodoro technique.' },
    { slug: 'essay-outline-generator', icon: '📝', name: 'Essay Outline Generator', desc: 'Create structured essay outlines instantly.' },
    { slug: 'quiz-generator',          icon: '❓', name: 'Quiz Generator',          desc: 'Create interactive quizzes from any text.' },
  ],
};

// ─── BLOGS ────────────────────────────────────────────────────────────────────

const BLOGS = [
  { slug: 'compress-images-without-losing-quality', title: 'How to Compress Images Without Losing Quality',                date: 'March 5, 2026',  category: 'Image Tools'   },
  { slug: 'best-free-image-creation-tools-online',  title: '15 Best Free Image Creation and Editing Tools Online in 2026', date: 'Feb 28, 2026',   category: 'Image Tools'   },
  { slug: 'new-free-online-tools-2026',             title: '60+ New Free Online Tools Just Added to ToolsNest in 2026',    date: 'Feb 20, 2026',   category: 'News'          },
  { slug: 'best-free-ai-writing-tools',             title: 'Best Free AI Writing Tools for Content Creation in 2026',      date: 'Feb 15, 2026',   category: 'AI Tools'      },
  { slug: 'free-online-calculators-guide',          title: '22 Free Online Calculators for Finance, Academics & Everyday Use', date: 'Feb 10, 2026', category: 'Calculators' },
  { slug: 'best-free-file-conversion-tools',        title: 'Best Free File Conversion and PDF Tools Online in 2026',       date: 'Feb 5, 2026',    category: 'File Tools'    },
  { slug: 'check-plagiarism-online-free',           title: 'How to Check for Plagiarism Online for Free',                  date: 'Jan 30, 2026',   category: 'AI Tools'      },
  { slug: 'free-citation-generator-guide',          title: 'How to Generate Citations in APA, MLA & Chicago for Free',    date: 'Jan 25, 2026',   category: 'Student Tools' },
  { slug: 'convert-pdf-to-word-free',               title: 'How to Convert PDF to Word for Free',                         date: 'Jan 20, 2026',   category: 'File Tools'    },
  { slug: 'best-free-pdf-tools-online',             title: 'Best Free PDF Tools Online in 2026',                          date: 'Jan 15, 2026',   category: 'File Tools'    },
  { slug: 'resize-images-online',                   title: 'How to Resize Images Online Without Losing Quality',          date: 'Jan 10, 2026',   category: 'Image Tools'   },
  { slug: 'compress-pdf-without-losing-quality',    title: 'How to Compress a PDF Without Losing Quality',               date: 'Jan 5, 2026',    category: 'File Tools'    },
];

// ─── HTML GENERATORS ──────────────────────────────────────────────────────────

function toolCard(tool, category) {
  return [
    '<a href="/' + category + '/' + tool.slug + '" class="ptool-card">',
    '  <div class="ptool-icon" aria-hidden="true">' + tool.icon + '</div>',
    '  <div class="ptool-info"><h3>' + tool.name + '</h3><p>' + tool.desc + '</p></div>',
    '  <span class="ptool-arrow" aria-hidden="true">&rarr;</span>',
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
    '  <span class="blog-read-more">Read More &rarr;</span>',
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

  // ── Homepage blog grid ───────────────────────────────────────────────────
  if (norm === 'index.html') {
    var blogHTML = BLOGS.slice(0, 3).map(blogCard).join('\n');

    // Try id="homepage-blog-grid" first
    var before = html;
    html = html.replace(
      /(<div[^>]+id="homepage-blog-grid"[^>]*>)([\s\S]*?)(<\/div>)/,
      '$1\n' + blogHTML + '\n$3'
    );

    // Fallback: class="grid-3"
    if (html === before) {
      html = html.replace(
        /(<div[^>]+class="grid-3"[^>]*>)([\s\S]*?)(<\/div>)/,
        '$1\n' + blogHTML + '\n$3'
      );
    }
  }

  // ── Blog listing page ─────────────────────────────────────────────────────
  if (norm === 'blog/index.html') {
    var allBlogHTML = BLOGS.map(blogCard).join('\n');

    var before2 = html;
    html = html.replace(
      /(<div[^>]+id="blog-grid"[^>]*>)([\s\S]*?)(<\/div>)/,
      '$1\n' + allBlogHTML + '\n$3'
    );

    // Fallback: insert after <h1>
    if (html === before2) {
      html = html.replace(
        /(<h1[^>]*>[\s\S]*?<\/h1>)/,
        '$1\n<div class="blog-listing-static">\n' + allBlogHTML + '\n</div>'
      );
    }
  }

  // ── Category tool grids ───────────────────────────────────────────────────
  var cat = detectCategory(norm);
  if (cat && TOOLS[cat]) {
    var cardsHTML = TOOLS[cat].map(function(t) { return toolCard(t, cat); }).join('\n');

    var before3 = html;
    html = html.replace(
      /(<div[^>]+(?:id="tools-grid"|class="[^"]*tools-grid[^"]*")[^>]*>)([\s\S]*?)(<\/div>)/,
      '$1\n' + cardsHTML + '\n$3'
    );

    // Fallback: insert after <h1>
    if (html === before3) {
      html = html.replace(
        /(<h1[^>]*>[\s\S]*?<\/h1>)/,
        '$1\n<div class="tools-grid-static">\n' + cardsHTML + '\n</div>'
      );
    }
  }

  return html;
}

// ─── FILE SYSTEM ──────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  ensureDir(dest);
  var entries = fs.readdirSync(src, { withFileTypes: true });
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var srcPath  = path.join(src, entry.name);
    var destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function walkHTML(dir, base, results) {
  if (!results) results = [];
  var entries = fs.readdirSync(dir, { withFileTypes: true });
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    if (SKIP_PATHS.indexOf(entry.name) !== -1) continue;
    var full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHTML(full, base, results);
    } else if (entry.name.endsWith('.html')) {
      results.push(path.relative(base, full));
    }
  }
  return results;
}

// ─── BUILD ────────────────────────────────────────────────────────────────────

function build() {
  console.log('ToolsNest build started...\n');

  if (fs.existsSync(DIST_DIR)) fs.rmSync(DIST_DIR, { recursive: true });
  ensureDir(DIST_DIR);

  // Copy static asset folders
  for (var i = 0; i < STATIC_DIRS.length; i++) {
    var src = path.join(SRC_DIR, STATIC_DIRS[i]);
    if (fs.existsSync(src)) {
      copyDir(src, path.join(DIST_DIR, STATIC_DIRS[i]));
      console.log('Copied /' + STATIC_DIRS[i]);
    }
  }

  // Copy root non-HTML files (robots.txt, sitemap, manifest, etc.)
  var rootEntries = fs.readdirSync(SRC_DIR, { withFileTypes: true });
  for (var j = 0; j < rootEntries.length; j++) {
    var e = rootEntries[j];
    if (e.isFile() && !e.name.endsWith('.html') && SKIP_PATHS.indexOf(e.name) === -1) {
      fs.copyFileSync(path.join(SRC_DIR, e.name), path.join(DIST_DIR, e.name));
    }
  }
  console.log('Copied root static files\n');

  // Process all HTML files
  var htmlFiles = walkHTML(SRC_DIR, SRC_DIR);
  var count = 0;

  for (var k = 0; k < htmlFiles.length; k++) {
    var relPath  = htmlFiles[k];
    var srcFile  = path.join(SRC_DIR, relPath);
    var destFile = path.join(DIST_DIR, relPath);
    ensureDir(path.dirname(destFile));

    var original  = fs.readFileSync(srcFile, 'utf8');
    var processed = processHTML(original, relPath);
    fs.writeFileSync(destFile, processed, 'utf8');
    count++;
  }

  console.log('Pre-rendered ' + count + ' HTML files\n');
  console.log('Build complete -> /dist');
}

build();
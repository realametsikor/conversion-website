#!/usr/bin/env node
/**
 * Pinterest Pin Image Generator for ToolNest
 * Generates 1000x1500 vertical images (Pinterest ratio) for all tools and blog posts.
 * 3 variants per page with SEO-friendly filenames and alt text.
 */

const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'pins');
const SITE_URL = 'www.usetoolnest.com';

// Brand colors
const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1d4ed8',
  accent: '#10B981',
  accentDark: '#059669',
  white: '#FFFFFF',
  offWhite: '#F9FAFB',
  lightBlue: '#EFF6FF',
  darkText: '#111827',
  mutedText: '#6B7280',
  border: '#E5E7EB',
  darkBg: '#0f172a',
  darkCard: '#1e293b',
};

// Category icons (emoji-style unicode chars mapped to drawing)
const CATEGORY_ICONS = {
  'file-tools': { symbol: '\u{1F4C4}', color: '#3B82F6' },
  'image-tools': { symbol: '\u{1F5BC}', color: '#8B5CF6' },
  'calculators': { symbol: '\u{1F5A9}', color: '#F59E0B' },
  'ai-tools': { symbol: '\u{1F916}', color: '#10B981' },
  'student-tools': { symbol: '\u{1F393}', color: '#EF4444' },
  'blog': { symbol: '\u{1F4DD}', color: '#6366F1' },
};

// All tools data
const TOOLS = [
  // FILE TOOLS
  { title: 'PDF to Word', subtitle: 'Convert PDF to DOCX Instantly', category: 'file-tools', slug: 'pdf-to-word' },
  { title: 'Word to PDF', subtitle: 'Convert DOCX to PDF for Free', category: 'file-tools', slug: 'word-to-pdf' },
  { title: 'Merge PDF', subtitle: 'Combine PDF Files Online', category: 'file-tools', slug: 'merge-pdf' },
  { title: 'Split PDF', subtitle: 'Split PDF Pages Instantly', category: 'file-tools', slug: 'split-pdf' },
  { title: 'Compress PDF', subtitle: 'Reduce PDF File Size Free', category: 'file-tools', slug: 'compress-pdf' },
  { title: 'PDF to JPG', subtitle: 'Convert PDF Pages to Images', category: 'file-tools', slug: 'pdf-to-jpg' },
  { title: 'JPG to PDF', subtitle: 'Convert Images to PDF Free', category: 'file-tools', slug: 'jpg-to-pdf' },
  { title: 'PDF to Excel', subtitle: 'Extract Tables from PDF', category: 'file-tools', slug: 'pdf-to-excel' },
  { title: 'Excel to PDF', subtitle: 'Convert Spreadsheets to PDF', category: 'file-tools', slug: 'excel-to-pdf' },
  { title: 'PDF to PowerPoint', subtitle: 'Convert PDF to PPTX Free', category: 'file-tools', slug: 'pdf-to-powerpoint' },
  { title: 'PowerPoint to PDF', subtitle: 'Convert PPTX to PDF Instantly', category: 'file-tools', slug: 'powerpoint-to-pdf' },
  { title: 'Extract Text from PDF', subtitle: 'OCR & Text Extraction Free', category: 'file-tools', slug: 'extract-text-from-pdf' },
  { title: 'Unlock PDF', subtitle: 'Remove PDF Password Free', category: 'file-tools', slug: 'unlock-pdf' },
  { title: 'Redact PDF', subtitle: 'Black Out Sensitive Info', category: 'file-tools', slug: 'redact-pdf' },
  { title: 'Reorder PDF Pages', subtitle: 'Rearrange PDF Pages Free', category: 'file-tools', slug: 'reorder-pdf-pages' },
  { title: 'Add Page Numbers PDF', subtitle: 'Number Your PDF Pages', category: 'file-tools', slug: 'add-page-numbers-pdf' },
  { title: 'MP4 to MP3', subtitle: 'Extract Audio from Video', category: 'file-tools', slug: 'mp4-to-mp3' },
  { title: 'Merge Audio', subtitle: 'Combine Audio Files Free', category: 'file-tools', slug: 'merge-audio' },
  { title: 'Audio Cutter', subtitle: 'Trim Audio Files Online', category: 'file-tools', slug: 'audio-cutter' },
  { title: 'Video Trimmer', subtitle: 'Cut Videos Online Free', category: 'file-tools', slug: 'video-trimmer' },
  { title: 'Screen Recorder', subtitle: 'Record Your Screen Free', category: 'file-tools', slug: 'screen-recorder' },
  { title: 'Screenshot to PDF', subtitle: 'Convert Screenshots to PDF', category: 'file-tools', slug: 'screenshot-to-pdf' },
  { title: 'Add Subtitles to Video', subtitle: 'Burn Subtitles into Video', category: 'file-tools', slug: 'add-subtitles-to-video' },
  { title: 'HTML to PDF', subtitle: 'Convert Webpages to PDF', category: 'file-tools', slug: 'html-to-pdf' },
  { title: 'TXT to PDF', subtitle: 'Convert Text Files to PDF', category: 'file-tools', slug: 'txt-to-pdf' },
  { title: 'CSV to Excel', subtitle: 'Convert CSV to XLSX Free', category: 'file-tools', slug: 'csv-to-excel' },
  { title: 'DOCX to TXT', subtitle: 'Extract Text from Word', category: 'file-tools', slug: 'docx-to-txt' },
  { title: 'EPUB to PDF', subtitle: 'Convert eBooks to PDF', category: 'file-tools', slug: 'epub-to-pdf' },
  { title: 'File Metadata Remover', subtitle: 'Strip File Metadata Free', category: 'file-tools', slug: 'file-metadata-remover' },
  { title: 'File Checksum Generator', subtitle: 'Verify File Integrity', category: 'file-tools', slug: 'file-checksum-generator' },
  { title: 'Subtitle Editor', subtitle: 'Edit SRT Files Online', category: 'file-tools', slug: 'subtitle-editor' },
  { title: 'JPG to PNG', subtitle: 'Convert JPG to PNG Free', category: 'file-tools', slug: 'jpg-to-png' },
  { title: 'Batch File Renamer', subtitle: 'Rename Multiple Files Fast', category: 'file-tools', slug: 'batch-file-renamer' },

  // IMAGE TOOLS
  { title: 'Compress Image', subtitle: 'Reduce Image Size Instantly', category: 'image-tools', slug: 'compress-image' },
  { title: 'Resize Image', subtitle: 'Resize Photos Online Free', category: 'image-tools', slug: 'resize-image' },
  { title: 'HEIC to JPG', subtitle: 'Convert HEIC to JPG Free', category: 'image-tools', slug: 'heic-to-jpg' },
  { title: 'Meme Generator', subtitle: 'Create Memes Instantly', category: 'image-tools', slug: 'meme-generator' },
  { title: 'Profile Picture Maker', subtitle: 'Create Perfect Profile Pics', category: 'image-tools', slug: 'profile-picture-maker' },
  { title: 'Image to Base64', subtitle: 'Encode Images to Base64', category: 'image-tools', slug: 'image-to-base64' },
  { title: 'Base64 to Image', subtitle: 'Decode Base64 to Image', category: 'image-tools', slug: 'base64-to-image' },
  { title: 'Blur Background', subtitle: 'Blur Photo Backgrounds Free', category: 'image-tools', slug: 'blur-background' },
  { title: 'Face Cropper', subtitle: 'Auto-Crop Faces from Photos', category: 'image-tools', slug: 'face-cropper' },
  { title: 'ID Photo Resizer', subtitle: 'Resize ID & Passport Photos', category: 'image-tools', slug: 'id-photo-resizer' },
  { title: 'Instagram Grid Splitter', subtitle: 'Split Photos for IG Grid', category: 'image-tools', slug: 'instagram-grid-splitter' },
  { title: 'Thumbnail Text Adder', subtitle: 'Add Text to Thumbnails', category: 'image-tools', slug: 'thumbnail-text-adder' },
  { title: 'Color Palette Extractor', subtitle: 'Extract Colors from Images', category: 'image-tools', slug: 'color-palette-extractor' },
  { title: 'HEX RGB Converter', subtitle: 'Convert Color Codes Free', category: 'image-tools', slug: 'hex-rgb-converter' },
  { title: 'Image Format Detector', subtitle: 'Detect Image File Format', category: 'image-tools', slug: 'image-format-detector' },
  { title: 'GIF Compressor', subtitle: 'Reduce GIF File Size', category: 'image-tools', slug: 'gif-compressor' },
  { title: 'AI Background Remover', subtitle: 'Remove Background with AI', category: 'image-tools', slug: 'ai-background-remover' },
  { title: 'YouTube Thumbnail Maker', subtitle: 'Create YT Thumbnails Free', category: 'image-tools', slug: 'youtube-thumbnail-maker' },
  { title: 'YouTube Banner Maker', subtitle: 'Design Channel Art Free', category: 'image-tools', slug: 'youtube-banner-maker' },
  { title: 'Instagram DP Resizer', subtitle: 'Resize IG Profile Picture', category: 'image-tools', slug: 'instagram-dp-resizer' },
  { title: 'WhatsApp Image Compressor', subtitle: 'Compress Images for WhatsApp', category: 'image-tools', slug: 'whatsapp-image-compressor' },
  { title: 'Screenshot Mockup Generator', subtitle: 'Create Device Mockups', category: 'image-tools', slug: 'screenshot-mockup-generator' },
  { title: 'Collage Maker', subtitle: 'Create Photo Collages Free', category: 'image-tools', slug: 'collage-maker' },
  { title: 'Favicon Generator', subtitle: 'Generate Favicons Instantly', category: 'image-tools', slug: 'favicon-generator' },
  { title: 'SVG to PNG', subtitle: 'Convert SVG to PNG Free', category: 'image-tools', slug: 'svg-to-png' },
  { title: 'PNG to SVG', subtitle: 'Vectorize Images to SVG', category: 'image-tools', slug: 'png-to-svg' },
  { title: 'Photo Filters Editor', subtitle: 'Apply Filters to Photos', category: 'image-tools', slug: 'photo-filters-editor' },
  { title: 'Remove EXIF Metadata', subtitle: 'Strip Photo Metadata Free', category: 'image-tools', slug: 'remove-exif-metadata' },
  { title: 'QR Code Generator', subtitle: 'Create QR Codes Instantly', category: 'image-tools', slug: 'qr-code-generator' },
  { title: 'Barcode Generator', subtitle: 'Generate Barcodes Online', category: 'image-tools', slug: 'barcode-generator' },
  { title: 'Signature Generator', subtitle: 'Create Digital Signatures', category: 'image-tools', slug: 'signature-generator' },
  { title: 'Whiteboard Sketch Converter', subtitle: 'Clean Up Whiteboard Photos', category: 'image-tools', slug: 'whiteboard-sketch-converter' },

  // CALCULATORS
  { title: 'GPA Calculator', subtitle: 'Calculate Your GPA Instantly', category: 'calculators', slug: 'gpa-calculator' },
  { title: 'Loan Calculator', subtitle: 'Calculate Loan Payments Free', category: 'calculators', slug: 'loan-calculator' },
  { title: 'Age Calculator', subtitle: 'Calculate Exact Age Online', category: 'calculators', slug: 'age-calculator' },
  { title: 'Date Difference Calculator', subtitle: 'Calculate Days Between Dates', category: 'calculators', slug: 'date-difference-calculator' },
  { title: 'Percentage Calculator', subtitle: 'Calculate Percentages Fast', category: 'calculators', slug: 'percentage-calculator' },
  { title: 'Grade Calculator', subtitle: 'Calculate Grades Instantly', category: 'calculators', slug: 'grade-calculator' },
  { title: 'Time Zone Converter', subtitle: 'Convert Time Zones Free', category: 'calculators', slug: 'time-zone-converter' },
  { title: 'Fuel Cost Calculator', subtitle: 'Calculate Fuel Expenses', category: 'calculators', slug: 'fuel-cost-calculator' },
  { title: 'Data Usage Calculator', subtitle: 'Track Data Usage Online', category: 'calculators', slug: 'data-usage-calculator' },
  { title: 'Savings Goal Calculator', subtitle: 'Plan Your Savings Goals', category: 'calculators', slug: 'savings-goal-calculator' },
  { title: 'Break Even Calculator', subtitle: 'Find Your Break Even Point', category: 'calculators', slug: 'break-even-calculator' },
  { title: 'Markup Calculator', subtitle: 'Calculate Markup & Margin', category: 'calculators', slug: 'markup-calculator' },
  { title: 'VAT/Tax Calculator', subtitle: 'Calculate Tax Amounts Free', category: 'calculators', slug: 'vat-tax-calculator' },
  { title: 'Commission Calculator', subtitle: 'Calculate Sales Commission', category: 'calculators', slug: 'commission-calculator' },
  { title: 'Discount Calculator', subtitle: 'Calculate Sale Discounts', category: 'calculators', slug: 'discount-calculator' },
  { title: 'Weight Converter', subtitle: 'Convert Weight Units Free', category: 'calculators', slug: 'weight-converter' },
  { title: 'Speed Converter', subtitle: 'Convert Speed Units Online', category: 'calculators', slug: 'speed-converter' },
  { title: 'Height Converter', subtitle: 'Convert Height Units Free', category: 'calculators', slug: 'height-converter' },
  { title: 'Random Number Generator', subtitle: 'Generate Random Numbers', category: 'calculators', slug: 'random-number-generator' },
  { title: 'GPA to Percentage', subtitle: 'Convert GPA to Percentage', category: 'calculators', slug: 'gpa-to-percentage-converter' },
  { title: 'Pregnancy Due Date', subtitle: 'Calculate Your Due Date', category: 'calculators', slug: 'pregnancy-due-date-calculator' },
  { title: 'Retirement Savings', subtitle: 'Plan Your Retirement Fund', category: 'calculators', slug: 'retirement-savings-calculator' },

  // AI TOOLS
  { title: 'Text Summarizer', subtitle: 'Summarize Text with AI Free', category: 'ai-tools', slug: 'text-summarizer' },
  { title: 'Resume Bullet Generator', subtitle: 'Generate Resume Bullets', category: 'ai-tools', slug: 'resume-bullet-generator' },
  { title: 'Email Writer', subtitle: 'Write Emails with AI Free', category: 'ai-tools', slug: 'email-writer' },
  { title: 'Caption Generator', subtitle: 'Generate Captions with AI', category: 'ai-tools', slug: 'caption-generator' },
  { title: 'Bio Generator', subtitle: 'Create Your Bio with AI', category: 'ai-tools', slug: 'bio-generator' },
  { title: 'Headline Rewriter', subtitle: 'Rewrite Headlines with AI', category: 'ai-tools', slug: 'headline-rewriter' },
  { title: 'Essay Outline Generator', subtitle: 'Create Essay Outlines Free', category: 'ai-tools', slug: 'essay-outline-generator' },
  { title: 'Notes Summarizer', subtitle: 'Summarize Notes Instantly', category: 'ai-tools', slug: 'notes-summarizer' },
  { title: 'Hashtag Generator', subtitle: 'Generate Trending Hashtags', category: 'ai-tools', slug: 'hashtag-generator' },
  { title: 'Quiz Generator', subtitle: 'Generate Quizzes with AI', category: 'ai-tools', slug: 'quiz-generator' },
  { title: 'Prompt Improver', subtitle: 'Improve AI Prompts Free', category: 'ai-tools', slug: 'prompt-improver' },
  { title: 'Plagiarism Checker', subtitle: 'Check for Plagiarism Free', category: 'ai-tools', slug: 'plagiarism-checker' },
  { title: 'Grammar Checker', subtitle: 'Fix Grammar Errors Free', category: 'ai-tools', slug: 'grammar-checker' },
  { title: 'Paraphrasing Tool', subtitle: 'Paraphrase Text with AI', category: 'ai-tools', slug: 'paraphrasing-tool' },
  { title: 'Regex Generator', subtitle: 'Generate Regex Patterns', category: 'ai-tools', slug: 'regex-generator' },
  { title: 'Speech to Text', subtitle: 'Convert Speech to Text Free', category: 'ai-tools', slug: 'speech-to-text' },
  { title: 'Text to Speech', subtitle: 'Convert Text to Audio Free', category: 'ai-tools', slug: 'text-to-speech' },
  { title: 'JSON Formatter', subtitle: 'Format JSON Online Free', category: 'ai-tools', slug: 'json-formatter' },
  { title: 'Fake Data Generator', subtitle: 'Generate Test Data Free', category: 'ai-tools', slug: 'fake-data-generator' },
  { title: 'Title Case Formatter', subtitle: 'Format Title Case Free', category: 'ai-tools', slug: 'title-case-formatter' },
  { title: 'Tweet Generator', subtitle: 'Generate Tweets with AI', category: 'ai-tools', slug: 'tweet-generator' },
  { title: 'Username Generator', subtitle: 'Generate Unique Usernames', category: 'ai-tools', slug: 'username-generator' },
  { title: 'Idea Generator', subtitle: 'Generate Ideas with AI', category: 'ai-tools', slug: 'idea-generator' },

  // STUDENT TOOLS
  { title: 'Citation Generator', subtitle: 'Generate APA MLA Citations', category: 'student-tools', slug: 'citation-generator' },
  { title: 'Flashcard Maker', subtitle: 'Create Flashcards Online', category: 'student-tools', slug: 'flashcard-maker' },
  { title: 'Study Timer', subtitle: 'Pomodoro Study Timer Free', category: 'student-tools', slug: 'study-timer' },
  { title: 'Read Time Estimator', subtitle: 'Estimate Reading Time Free', category: 'student-tools', slug: 'read-time-estimator' },
];

// Blog posts
const BLOGS = [
  { title: 'Best Free AI Text Tools for Students', subtitle: 'Top AI Tools for Students in 2026', slug: 'best-ai-text-tools-students' },
  { title: 'Best Free AI Summarizer Tools', subtitle: 'Summarize Anything with AI', slug: 'best-ai-summarizer-tools' },
  { title: 'Best Free AI Writing Tools', subtitle: 'AI-Powered Content Creation', slug: 'best-ai-writing-tools' },
  { title: 'Best Free File Conversion Tools', subtitle: 'Convert Any File Format Free', slug: 'best-file-conversion-tools' },
  { title: 'Best Free Grammar Checkers', subtitle: 'Fix Grammar Errors Instantly', slug: 'best-grammar-checker-tools' },
  { title: '15 Best Image Editing Tools', subtitle: 'Create & Edit Images Free', slug: 'best-image-editing-tools' },
  { title: 'Best Free Instagram Tools', subtitle: 'Tools for Content Creators', slug: 'best-instagram-tools' },
  { title: 'Best Free PDF Tools Guide', subtitle: 'The Ultimate PDF Toolkit', slug: 'best-pdf-tools-guide' },
  { title: 'Best Percentage Calculators', subtitle: 'Calculate Percentages Free', slug: 'best-percentage-calculators' },
  { title: 'Best Free QR Code Generators', subtitle: 'Create QR Codes Instantly', slug: 'best-qr-code-generators' },
  { title: 'Best Free Unit Converters', subtitle: 'Convert Any Unit Online', slug: 'best-unit-converters' },
  { title: 'Best Free Video Editing Tools', subtitle: 'Edit Videos Online Free', slug: 'best-video-editing-tools' },
  { title: 'Best Tools for Remote Workers', subtitle: '10 Free Productivity Tools', slug: 'best-tools-remote-workers' },
  { title: 'How to Calculate Your GPA', subtitle: 'Step-by-Step GPA Guide', slug: 'how-to-calculate-gpa' },
  { title: 'How to Check for Plagiarism', subtitle: 'Free Plagiarism Detection', slug: 'how-to-check-plagiarism' },
  { title: 'How to Compress Images', subtitle: 'Optimize Images for Web', slug: 'how-to-compress-images' },
  { title: 'How to Compress a PDF', subtitle: 'Reduce PDF Size Free', slug: 'how-to-compress-pdf' },
  { title: 'How to Convert Excel to PDF', subtitle: 'XLSX to PDF in Seconds', slug: 'how-to-convert-excel-to-pdf' },
  { title: 'How to Convert HEIC to JPG', subtitle: 'iPhone Photos to JPG Free', slug: 'how-to-convert-heic-to-jpg' },
  { title: 'How to Convert JPG to PNG', subtitle: 'Image Format Conversion', slug: 'how-to-convert-jpg-to-png' },
  { title: 'How to Convert MP4 to MP3', subtitle: 'Extract Audio from Video', slug: 'how-to-convert-mp4-to-mp3' },
  { title: 'How to Convert PDF to Word', subtitle: 'PDF to DOCX Made Easy', slug: 'how-to-convert-pdf-to-word' },
  { title: 'How to Convert Speech to Text', subtitle: 'Free Speech Recognition', slug: 'how-to-convert-speech-to-text' },
  { title: 'How to Convert Text to Speech', subtitle: 'Read Text Aloud Free', slug: 'how-to-convert-text-to-speech' },
  { title: 'How to Convert Word to PDF', subtitle: 'DOCX to PDF Instantly', slug: 'how-to-convert-word-to-pdf' },
  { title: 'Create the Perfect Profile Pic', subtitle: 'Free Profile Picture Guide', slug: 'how-to-create-profile-picture' },
  { title: 'How to Estimate Read Time', subtitle: 'Content Read Time Guide', slug: 'how-to-estimate-read-time' },
  { title: 'Write a Better Resume with AI', subtitle: 'AI-Powered Resume Tips', slug: 'how-to-write-resume-with-ai' },
  { title: 'How to Generate Citations', subtitle: 'APA MLA Chicago Free', slug: 'how-to-generate-citations' },
  { title: '22 Free Online Calculators', subtitle: 'Finance Academics & More', slug: 'free-online-calculators' },
  { title: '5 Free Tools Every Student Needs', subtitle: 'Essential Student Toolkit', slug: 'free-tools-for-students' },
  { title: 'Compress PDF for Email', subtitle: 'Quick & Free Methods', slug: 'compress-pdf-for-email' },
  { title: 'Extract Audio from Video', subtitle: 'Free Audio Extraction Guide', slug: 'extract-audio-from-video' },
  { title: 'Generate Citations for Free', subtitle: 'Citation Tools Guide 2026', slug: 'generate-citations-free' },
  { title: 'Make YouTube Thumbnails Free', subtitle: 'Design Stunning Thumbnails', slug: 'make-youtube-thumbnails' },
  { title: 'How to Redact a PDF', subtitle: 'Protect Sensitive Info', slug: 'how-to-redact-pdf' },
  { title: 'Remove Image Background Free', subtitle: 'Complete Background Guide', slug: 'remove-image-background' },
  { title: 'JPG vs PNG: Which to Use?', subtitle: 'Image Format Comparison', slug: 'jpg-vs-png-comparison' },
  { title: 'Make Flashcards Online Free', subtitle: 'Study Smarter Not Harder', slug: 'make-flashcards-online' },
  { title: 'How to Merge PDF Files', subtitle: 'Combine PDFs in Seconds', slug: 'how-to-merge-pdf' },
  { title: '60+ New Free Tools on ToolsNest', subtitle: 'Latest Tools Added in 2026', slug: 'new-tools-added-2026' },
  { title: 'How to Paraphrase Text Free', subtitle: 'Rewrite Content with AI', slug: 'how-to-paraphrase-text' },
  { title: 'Pomodoro Technique Guide', subtitle: 'Study Effectively with Timers', slug: 'pomodoro-technique-guide' },
  { title: 'Reduce Image File Size', subtitle: 'Without Losing Quality', slug: 'reduce-image-file-size' },
  { title: 'Resize Images Online', subtitle: 'Without Losing Quality', slug: 'resize-images-online' },
  { title: 'Calculate Retirement Savings', subtitle: 'Plan Your Future Today', slug: 'calculate-retirement-savings' },
  { title: 'How to Split PDF Pages', subtitle: 'Separate PDF Pages Free', slug: 'how-to-split-pdf' },
  { title: 'Calculate Student Loan Payments', subtitle: 'Complete Loan Guide', slug: 'calculate-student-loan-payments' },
  { title: 'Summarize Articles with AI', subtitle: 'Instant AI Summarization', slug: 'summarize-articles-with-ai' },
];

// ─── Drawing helpers ───────────────────────────────────────────

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx, text, maxWidth, fontSize) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  ctx.font = `bold ${fontSize}px sans-serif`;
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function drawLogo(ctx, x, y, size) {
  const r = size * 0.15;
  roundRect(ctx, x, y, size, size, r);
  ctx.fillStyle = COLORS.primary;
  ctx.fill();
  ctx.font = `bold ${size * 0.45}px sans-serif`;
  ctx.fillStyle = COLORS.white;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('TN', x + size / 2, y + size / 2 + 2);
}

function drawIconCircle(ctx, cx, cy, radius, color, symbol) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = color + '18';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.7, 0, Math.PI * 2);
  ctx.fillStyle = color + '30';
  ctx.fill();
  ctx.font = `${radius * 0.8}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(symbol, cx, cy);
}

function drawWatermark(ctx, W, H) {
  ctx.font = 'bold 28px sans-serif';
  ctx.fillStyle = COLORS.mutedText + '90';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText(SITE_URL, W / 2, H - 40);
}

function drawDecoCircles(ctx, W, H, color) {
  ctx.globalAlpha = 0.06;
  ctx.beginPath();
  ctx.arc(-60, -60, 280, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(W + 40, H + 40, 220, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

// ─── Variant 1: Clean Card ────────────────────────────────────

function drawVariant1(ctx, W, H, item, catInfo) {
  // Background
  ctx.fillStyle = COLORS.offWhite;
  ctx.fillRect(0, 0, W, H);

  drawDecoCircles(ctx, W, H, catInfo.color);

  // Top color bar
  const barH = 12;
  ctx.fillStyle = catInfo.color;
  ctx.fillRect(0, 0, W, barH);

  // Icon area
  drawIconCircle(ctx, W / 2, 340, 140, catInfo.color, catInfo.symbol);

  // Category pill
  const catLabel = (item.category || 'blog').replace(/-/g, ' ').toUpperCase();
  ctx.font = 'bold 24px sans-serif';
  const pillW = ctx.measureText(catLabel).width + 40;
  roundRect(ctx, (W - pillW) / 2, 520, pillW, 48, 24);
  ctx.fillStyle = catInfo.color + '20';
  ctx.fill();
  ctx.fillStyle = catInfo.color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(catLabel, W / 2, 544);

  // Title
  const titleLines = wrapText(ctx, item.title, W - 120, 64);
  ctx.font = 'bold 64px sans-serif';
  ctx.fillStyle = COLORS.darkText;
  ctx.textAlign = 'center';
  let titleY = 640;
  for (const line of titleLines) {
    ctx.fillText(line, W / 2, titleY);
    titleY += 80;
  }

  // Subtitle
  ctx.font = '36px sans-serif';
  ctx.fillStyle = COLORS.mutedText;
  ctx.fillText(item.subtitle, W / 2, titleY + 30);

  // Divider
  ctx.fillStyle = catInfo.color;
  roundRect(ctx, (W - 80) / 2, titleY + 80, 80, 6, 3);
  ctx.fill();

  // CTA
  const ctaY = titleY + 140;
  roundRect(ctx, (W - 400) / 2, ctaY, 400, 72, 36);
  ctx.fillStyle = catInfo.color;
  ctx.fill();
  ctx.font = 'bold 30px sans-serif';
  ctx.fillStyle = COLORS.white;
  ctx.fillText('Try It Free \u2192', W / 2, ctaY + 36);

  // Logo bottom
  drawLogo(ctx, (W - 56) / 2, H - 160, 56);

  drawWatermark(ctx, W, H);
}

// ─── Variant 2: Bold Split ────────────────────────────────────

function drawVariant2(ctx, W, H, item, catInfo) {
  // Top colored section
  const splitY = 600;
  ctx.fillStyle = catInfo.color;
  ctx.fillRect(0, 0, W, splitY);

  // Decorative shapes
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = COLORS.white;
  ctx.beginPath();
  ctx.arc(W - 80, 120, 200, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(100, splitY - 60, 150, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Logo top-left
  drawLogo(ctx, 60, 50, 64);

  // "FREE" badge
  ctx.font = 'bold 24px sans-serif';
  ctx.fillStyle = COLORS.white + 'CC';
  ctx.textAlign = 'right';
  ctx.fillText('100% FREE', W - 60, 90);

  // Icon
  ctx.font = `120px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(catInfo.symbol, W / 2, 280);

  // Title on color
  const titleLines = wrapText(ctx, item.title, W - 120, 68);
  ctx.font = 'bold 68px sans-serif';
  ctx.fillStyle = COLORS.white;
  ctx.textAlign = 'center';
  let titleY = 420;
  for (const line of titleLines) {
    ctx.fillText(line, W / 2, titleY);
    titleY += 84;
  }

  // Bottom white section
  ctx.fillStyle = COLORS.white;
  ctx.fillRect(0, splitY, W, H - splitY);

  // Subtitle
  ctx.font = '38px sans-serif';
  ctx.fillStyle = COLORS.darkText;
  ctx.textAlign = 'center';
  ctx.fillText(item.subtitle, W / 2, splitY + 100);

  // Feature bullets
  const features = ['No signup required', 'Works in browser', '100% free'];
  ctx.font = '28px sans-serif';
  ctx.fillStyle = COLORS.mutedText;
  let fy = splitY + 180;
  for (const f of features) {
    ctx.fillStyle = catInfo.color;
    ctx.fillText('\u2713', W / 2 - 150, fy);
    ctx.fillStyle = COLORS.mutedText;
    ctx.textAlign = 'left';
    ctx.fillText(f, W / 2 - 120, fy);
    ctx.textAlign = 'center';
    fy += 50;
  }

  // CTA
  roundRect(ctx, (W - 420) / 2, splitY + 380, 420, 72, 36);
  ctx.fillStyle = catInfo.color;
  ctx.fill();
  ctx.font = 'bold 30px sans-serif';
  ctx.fillStyle = COLORS.white;
  ctx.textAlign = 'center';
  ctx.fillText('Use It Now \u2192', W / 2, splitY + 416);

  drawWatermark(ctx, W, H);
}

// ─── Variant 3: Gradient Modern ───────────────────────────────

function drawVariant3(ctx, W, H, item, catInfo) {
  // Gradient background
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, COLORS.darkBg);
  grad.addColorStop(1, COLORS.darkCard);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Colored accent shapes
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = catInfo.color;
  ctx.beginPath();
  ctx.arc(W + 50, 200, 350, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(-100, H - 100, 300, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Top bar accent
  const accentGrad = ctx.createLinearGradient(0, 0, W, 0);
  accentGrad.addColorStop(0, catInfo.color);
  accentGrad.addColorStop(1, catInfo.color + '40');
  ctx.fillStyle = accentGrad;
  ctx.fillRect(0, 0, W, 8);

  // Logo + brand
  drawLogo(ctx, 60, 55, 60);
  ctx.font = 'bold 32px sans-serif';
  ctx.fillStyle = COLORS.white;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('ToolsNest', 135, 85);

  // Category tag
  const catLabel = (item.category || 'blog').replace(/-/g, ' ').toUpperCase();
  ctx.font = 'bold 22px sans-serif';
  ctx.fillStyle = catInfo.color;
  ctx.textAlign = 'center';
  ctx.fillText(catLabel, W / 2, 200);

  // Divider line under category
  ctx.fillStyle = catInfo.color;
  ctx.fillRect((W - 60) / 2, 220, 60, 4);

  // Icon
  ctx.font = `140px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(catInfo.symbol, W / 2, 400);

  // Title
  const titleLines = wrapText(ctx, item.title, W - 120, 62);
  ctx.font = 'bold 62px sans-serif';
  ctx.fillStyle = COLORS.white;
  ctx.textAlign = 'center';
  let titleY = 580;
  for (const line of titleLines) {
    ctx.fillText(line, W / 2, titleY);
    titleY += 78;
  }

  // Subtitle
  ctx.font = '36px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(item.subtitle, W / 2, titleY + 30);

  // Glowing CTA button
  const ctaY = titleY + 110;
  ctx.shadowColor = catInfo.color;
  ctx.shadowBlur = 30;
  roundRect(ctx, (W - 400) / 2, ctaY, 400, 72, 36);
  ctx.fillStyle = catInfo.color;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.font = 'bold 30px sans-serif';
  ctx.fillStyle = COLORS.white;
  ctx.fillText('Try Free Online \u2192', W / 2, ctaY + 36);

  // Bottom features row
  const fy = ctaY + 140;
  ctx.font = '24px sans-serif';
  ctx.fillStyle = '#64748b';
  const feats = ['\u26A1 Fast', '\u{1F512} Private', '\u{1F4B0} Free'];
  const spacing = W / (feats.length + 1);
  feats.forEach((f, i) => {
    ctx.fillText(f, spacing * (i + 1), fy);
  });

  drawWatermark(ctx, W, H);
}

// ─── Main generation ──────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generatePin(item, variant, isBlog = false) {
  const W = 1000;
  const H = 1500;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  const catKey = isBlog ? 'blog' : (item.category || 'file-tools');
  const catInfo = CATEGORY_ICONS[catKey] || CATEGORY_ICONS['file-tools'];

  if (variant === 1) drawVariant1(ctx, W, H, item, catInfo);
  else if (variant === 2) drawVariant2(ctx, W, H, item, catInfo);
  else drawVariant3(ctx, W, H, item, catInfo);

  return canvas.toBuffer('image/png');
}

function generateAltText(item, variant, isBlog) {
  const type = isBlog ? 'blog post' : 'tool';
  return `Pinterest pin for ToolsNest ${type}: ${item.title} - ${item.subtitle}. Free online tool at ${SITE_URL}. Variant ${variant}.`;
}

function run() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const manifest = [];
  let totalCount = 0;

  // Generate for tools
  for (const tool of TOOLS) {
    for (let v = 1; v <= 3; v++) {
      const filename = `${slugify(tool.title)}-pin-${v}.png`;
      const filepath = path.join(OUTPUT_DIR, filename);
      const buf = generatePin(tool, v, false);
      fs.writeFileSync(filepath, buf);
      manifest.push({
        type: 'tool',
        title: tool.title,
        subtitle: tool.subtitle,
        category: tool.category,
        slug: tool.slug,
        variant: v,
        filename,
        path: `assets/pins/${filename}`,
        alt: generateAltText(tool, v, false),
      });
      totalCount++;
    }
  }

  // Generate for blogs
  for (const blog of BLOGS) {
    for (let v = 1; v <= 3; v++) {
      const filename = `${slugify(blog.title)}-pin-${v}.png`;
      const filepath = path.join(OUTPUT_DIR, filename);
      const buf = generatePin(blog, v, true);
      fs.writeFileSync(filepath, buf);
      manifest.push({
        type: 'blog',
        title: blog.title,
        subtitle: blog.subtitle,
        slug: blog.slug,
        variant: v,
        filename,
        path: `assets/pins/${filename}`,
        alt: generateAltText(blog, v, true),
      });
      totalCount++;
    }
  }

  // Write manifest JSON
  const manifestPath = path.join(OUTPUT_DIR, 'pin-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`Generated ${totalCount} Pinterest pin images.`);
  console.log(`Tools: ${TOOLS.length} x 3 = ${TOOLS.length * 3}`);
  console.log(`Blogs: ${BLOGS.length} x 3 = ${BLOGS.length * 3}`);
  console.log(`Manifest: ${manifestPath}`);
}

run();

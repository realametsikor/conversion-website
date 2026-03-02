#!/usr/bin/env node
/**
 * SEO Landing Page Generator for ToolsNest
 * Generates 1000+ unique landing pages targeting long-tail keywords
 * Each page links to existing tools with unique content, FAQs, schema markup
 */

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.usetoolnest.com';
const OUTPUT_DIR = path.join(__dirname, '..', 'pages');
const TODAY = new Date().toISOString().split('T')[0];

// ─── Utility helpers ───────────────────────────────────────────────

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ─── HTML Template Engine ──────────────────────────────────────────

function buildPage({ slug, title, metaDescription, breadcrumbCategory, breadcrumbCategoryUrl, breadcrumbName, h1, introParagraph, ctaText, ctaUrl, howToSteps, faqs, relatedLinks, schemaFAQ, schemaHowTo }) {
  const canonicalUrl = `${DOMAIN}/pages/${slug}/`;
  const faqHtml = faqs.map(f => `
                    <div class="faq-item">
                        <h3>${f.q}</h3>
                        <p>${f.p}</p>
                    </div>`).join('');

  const stepsHtml = howToSteps.map(s => `<li>${s}</li>`).join('\n                        ');

  const relatedHtml = relatedLinks.map(r => `<a href="${r.url}" class="related-link">${r.label}</a>`).join('\n                            ');

  const schemaFAQJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.p }
    }))
  });

  const schemaBreadcrumb = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": DOMAIN },
      { "@type": "ListItem", "position": 2, "name": breadcrumbCategory, "item": `${DOMAIN}${breadcrumbCategoryUrl}` },
      { "@type": "ListItem", "position": 3, "name": breadcrumbName }
    ]
  });

  const schemaHowToJson = schemaHowTo ? JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": h1,
    "step": howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "text": s.replace(/<[^>]+>/g, '')
    }))
  }) : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | ToolsNest</title>
    <meta name="description" content="${metaDescription}">
    <link rel="canonical" href="${canonicalUrl}">
    <meta property="og:title" content="${title} | ToolsNest">
    <meta property="og:description" content="${metaDescription}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:site_name" content="ToolsNest">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${title} | ToolsNest">
    <meta name="twitter:description" content="${metaDescription}">
    <link rel="stylesheet" href="/css/style.css">
    <script type="application/ld+json">
    ${schemaBreadcrumb}
    </script>
    <script type="application/ld+json">
    ${schemaFAQJson}
    </script>${schemaHowToJson ? `
    <script type="application/ld+json">
    ${schemaHowToJson}
    </script>` : ''}
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#2563EB">
</head>
<body data-social-bar>
    <script src="/components/header.js"></script>

    <main class="container">
        <nav class="breadcrumb mt-3">
            <a href="/">Home</a> &gt; <a href="${breadcrumbCategoryUrl}">${breadcrumbCategory}</a> &gt; ${breadcrumbName}
        </nav>

        <div class="tool-layout">
            <div>
                <h1 class="text-center mb-2">${h1}</h1>
                <p class="text-center mb-3">${introParagraph}</p>

                <div class="tool-workspace" style="text-align:center;padding:2.5rem 2rem;">
                    <div style="font-size:3rem;margin-bottom:1rem;">&#9889;</div>
                    <h3 style="margin-bottom:1rem;">Ready to get started?</h3>
                    <p class="text-muted" style="margin-bottom:1.5rem;max-width:480px;margin-left:auto;margin-right:auto;">${introParagraph.split('.')[0]}.</p>
                    <a href="${ctaUrl}" class="btn btn-primary" style="font-size:1.1rem;padding:1rem 2.5rem;">${ctaText}</a>
                </div>

                <div class="ad-placeholder ad-between-sections ad-native">Ad Placeholder</div>

                <section class="mb-4">
                    <h2 class="mb-2">How It Works</h2>
                    <ol style="margin-left:1.5rem;line-height:2;">
                        ${stepsHtml}
                    </ol>
                </section>

                <div class="ad-placeholder ad-between-sections ad-native">Ad Placeholder</div>

                <section class="mb-4">
                    <h2 class="mb-2">Frequently Asked Questions</h2>${faqHtml}
                </section>

                <div class="ad-placeholder ad-between-sections ad-native">Ad Placeholder</div>

                <div class="ad-placeholder ad-responsive ad-mobile-only ad-native">Ad</div>
            </div>

            <aside>
                <div class="ad-placeholder ad-sidebar-placeholder ad-sidebar-slot">Ad Placeholder</div>
                <div class="related-tools">
                    <h3>Related Tools</h3>
                    ${relatedHtml}
                    <a href="/all-tools" class="related-link">See All Tools</a>
                </div>
                <div class="ad-placeholder ad-sidebar-placeholder ad-sidebar-slot" style="margin-top:1.5rem;">Ad Sidebar</div>
            </aside>
        </div>
    </main>

    <script src="/components/footer.js"></script>
    <script defer src="/js/app.js"></script>
    <script async src="/components/ads.js"></script>
</body>
</html>`;
}

// ─── Page Data Generators ──────────────────────────────────────────

const allPages = [];

// ─────────────────────────────────────────────────────────────────
// 1. COMPRESS IMAGE TO SPECIFIC SIZE (10kb–1000kb, step 10kb)
// ─────────────────────────────────────────────────────────────────
for (let kb = 10; kb <= 1000; kb += 10) {
  const sizeLabel = kb >= 1000 ? '1MB' : `${kb}KB`;
  const slug = `compress-image-to-${kb}kb`;
  allPages.push(buildPage({
    slug,
    title: `Compress Image to ${sizeLabel} Online Free`,
    metaDescription: `Compress any image to ${sizeLabel} or less instantly in your browser. Reduce JPG, PNG, and WebP file sizes to exactly ${sizeLabel} without losing quality. Free, fast, no upload required.`,
    breadcrumbCategory: 'Image Tools',
    breadcrumbCategoryUrl: '/image-tools',
    breadcrumbName: `Compress to ${sizeLabel}`,
    h1: `Compress Image to ${sizeLabel}`,
    introParagraph: `Need your image under ${sizeLabel}? Our free browser-based compressor reduces JPG, PNG, and WebP images to ${sizeLabel} or smaller while preserving visual quality. No server uploads, no sign-ups — your files stay on your device.`,
    ctaText: `Compress Image Now`,
    ctaUrl: '/image-tools/image-compressor/',
    howToSteps: [
      `Click the button above to open the <a href="/image-tools/image-compressor/">Image Compressor</a> tool.`,
      `Upload your image by clicking "Select Image" or dragging the file into the workspace.`,
      `The tool automatically compresses your image. Check the output file size.`,
      `If the result is above ${sizeLabel}, try reducing the image dimensions first with our <a href="/image-tools/resize-image/">Resize Image</a> tool, then compress again.`,
      `Download the compressed image to your device.`
    ],
    faqs: [
      { q: `How do I compress an image to exactly ${sizeLabel}?`, p: `Upload your image to our compressor. It applies optimized JPEG encoding to shrink file size. If the output exceeds ${sizeLabel}, resize the image to smaller dimensions first, then compress again. Combining resizing and compression gives precise control over the final file size.` },
      { q: `Will compressing to ${sizeLabel} ruin image quality?`, p: `The compressor uses a balanced quality setting that keeps images looking sharp for most uses including web pages, social media, and email. At ${sizeLabel}, most photos remain visually clear with no noticeable artifacts.` },
      { q: `What image formats can I compress to ${sizeLabel}?`, p: `You can upload JPG, PNG, and WebP images. The tool outputs compressed JPEG files which offer the best balance of quality and small file size.` },
      { q: `Is it safe to compress images in my browser?`, p: `Yes. The entire compression process runs locally in your browser using the HTML5 Canvas API. Your images are never uploaded to any server, ensuring complete privacy and security.` },
      { q: `Can I compress multiple images to ${sizeLabel}?`, p: `Yes. After downloading a compressed image, simply upload the next one. Each image is processed independently in your browser.` }
    ],
    relatedLinks: [
      { url: '/image-tools/image-compressor/', label: 'Image Compressor' },
      { url: '/image-tools/resize-image/', label: 'Resize Image' },
      { url: '/image-tools/gif-compressor/', label: 'GIF Compressor' },
      { url: '/file-tools/compress-pdf/', label: 'Compress PDF' }
    ],
    schemaHowTo: true
  }));
}

// ─────────────────────────────────────────────────────────────────
// 2. COMPRESS FORMAT-SPECIFIC IMAGE TO SIZE
// ─────────────────────────────────────────────────────────────────
const imageFormats = [
  { name: 'PNG', slug: 'png', ext: 'PNG' },
  { name: 'JPG', slug: 'jpg', ext: 'JPG' },
  { name: 'JPEG', slug: 'jpeg', ext: 'JPEG' },
  { name: 'WebP', slug: 'webp', ext: 'WebP' }
];
const formatSizes = [20, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000];

for (const fmt of imageFormats) {
  for (const kb of formatSizes) {
    const sizeLabel = kb >= 1000 ? '1MB' : `${kb}KB`;
    const slug = `compress-${fmt.slug}-to-${kb}kb`;
    allPages.push(buildPage({
      slug,
      title: `Compress ${fmt.name} to ${sizeLabel} Online Free`,
      metaDescription: `Reduce ${fmt.name} image file size to ${sizeLabel} or less online. Free browser-based ${fmt.name} compressor with no quality loss. No signup needed.`,
      breadcrumbCategory: 'Image Tools',
      breadcrumbCategoryUrl: '/image-tools',
      breadcrumbName: `Compress ${fmt.name} to ${sizeLabel}`,
      h1: `Compress ${fmt.name} to ${sizeLabel}`,
      introParagraph: `Reduce your ${fmt.name} image to ${sizeLabel} or below with our free online compressor. The tool processes ${fmt.ext} files directly in your browser — no uploads, no waiting, no quality trade-offs.`,
      ctaText: `Compress ${fmt.name} Now`,
      ctaUrl: '/image-tools/image-compressor/',
      howToSteps: [
        `Open the <a href="/image-tools/image-compressor/">Image Compressor</a> by clicking the button above.`,
        `Select your ${fmt.name} file or drag and drop it into the upload area.`,
        `The compressor will process your ${fmt.ext} image and display original vs. compressed sizes.`,
        `If the result exceeds ${sizeLabel}, use our <a href="/image-tools/resize-image/">Resize Image</a> tool to reduce dimensions first.`,
        `Click "Download Compressed Image" to save the optimized file.`
      ],
      faqs: [
        { q: `Can I compress a ${fmt.name} file to under ${sizeLabel}?`, p: `Yes. Upload your ${fmt.name} to our compressor and it will reduce the file size using optimized encoding. For large images, combine with our resize tool to reach exactly ${sizeLabel}.` },
        { q: `Does the compressor support ${fmt.name} format?`, p: `Absolutely. The compressor accepts ${fmt.ext} files along with other common formats. The output is a highly optimized JPEG that achieves the smallest possible size.` },
        { q: `Is ${fmt.name} compression lossless?`, p: `The compression uses a high-quality lossy JPEG encoding for maximum size reduction. For typical use cases like web, email, and social media, the visual difference is negligible.` },
        { q: `How much can a ${fmt.name} image be compressed?`, p: `Depending on the original content, typical reductions range from 40% to 80%. ${fmt.name === 'PNG' ? 'PNG files often see dramatic reductions since they start as lossless.' : 'JPEG-based files still achieve significant savings through re-encoding at optimized quality levels.'}` }
      ],
      relatedLinks: [
        { url: '/image-tools/image-compressor/', label: 'Image Compressor' },
        { url: '/image-tools/resize-image/', label: 'Resize Image' },
        { url: '/file-tools/jpg-to-png/', label: 'JPG to PNG' },
        { url: '/image-tools/heic-to-jpg/', label: 'HEIC to JPG' }
      ],
      schemaHowTo: true
    }));
  }
}

// ─────────────────────────────────────────────────────────────────
// 3. COMPRESS IMAGE FOR PLATFORM / PURPOSE
// ─────────────────────────────────────────────────────────────────
const platforms = [
  { name: 'WhatsApp', slug: 'whatsapp', desc: 'WhatsApp profile pictures and status updates', sizeHint: 'under 100KB', toolUrl: '/image-tools/whatsapp-image-compressor/' },
  { name: 'Instagram', slug: 'instagram', desc: 'Instagram posts, stories, and reels', sizeHint: 'under 1MB for fast uploads', toolUrl: '/image-tools/image-compressor/' },
  { name: 'Email', slug: 'email', desc: 'email attachments that stay under size limits', sizeHint: 'under 200KB for fast delivery', toolUrl: '/image-tools/image-compressor/' },
  { name: 'Web', slug: 'web', desc: 'websites and blogs with faster page load times', sizeHint: 'under 150KB for optimal performance', toolUrl: '/image-tools/image-compressor/' },
  { name: 'Facebook', slug: 'facebook', desc: 'Facebook posts, profile pictures, and cover photos', sizeHint: 'under 500KB', toolUrl: '/image-tools/image-compressor/' },
  { name: 'Twitter', slug: 'twitter', desc: 'Twitter posts and profile images', sizeHint: 'under 500KB', toolUrl: '/image-tools/image-compressor/' },
  { name: 'LinkedIn', slug: 'linkedin', desc: 'LinkedIn profile photos and post images', sizeHint: 'under 400KB', toolUrl: '/image-tools/image-compressor/' },
  { name: 'Discord', slug: 'discord', desc: 'Discord servers, avatars, and shared images', sizeHint: 'under 8MB (free) or 50MB (Nitro)', toolUrl: '/image-tools/image-compressor/' },
  { name: 'Telegram', slug: 'telegram', desc: 'Telegram chats and channels', sizeHint: 'under 500KB for quick sending', toolUrl: '/image-tools/image-compressor/' },
  { name: 'TikTok', slug: 'tiktok', desc: 'TikTok profile and thumbnail images', sizeHint: 'under 500KB', toolUrl: '/image-tools/image-compressor/' },
  { name: 'Pinterest', slug: 'pinterest', desc: 'Pinterest pins and boards', sizeHint: 'under 500KB', toolUrl: '/image-tools/image-compressor/' },
  { name: 'YouTube Thumbnail', slug: 'youtube-thumbnail', desc: 'YouTube video thumbnails optimized for click-through', sizeHint: 'under 2MB at 1280x720', toolUrl: '/image-tools/image-compressor/' },
  { name: 'Passport Photo', slug: 'passport-photo', desc: 'passport and visa application photos', sizeHint: 'between 20KB and 200KB', toolUrl: '/image-tools/image-compressor/' },
  { name: 'Website Banner', slug: 'website-banner', desc: 'website hero banners and header images', sizeHint: 'under 300KB for fast loading', toolUrl: '/image-tools/image-compressor/' },
  { name: 'Snapchat', slug: 'snapchat', desc: 'Snapchat stories and profile pictures', sizeHint: 'under 500KB', toolUrl: '/image-tools/image-compressor/' }
];

for (const plat of platforms) {
  const slug = `compress-image-for-${plat.slug}`;
  allPages.push(buildPage({
    slug,
    title: `Compress Image for ${plat.name} - Free Online`,
    metaDescription: `Compress images for ${plat.name} to the perfect file size. Optimize your photos for ${plat.desc}. Free, instant, browser-based.`,
    breadcrumbCategory: 'Image Tools',
    breadcrumbCategoryUrl: '/image-tools',
    breadcrumbName: `Compress for ${plat.name}`,
    h1: `Compress Image for ${plat.name}`,
    introParagraph: `Optimize your images for ${plat.name} with our free compressor. Get your photos to ${plat.sizeHint} — the ideal range for ${plat.desc}. Processing happens entirely in your browser for maximum privacy.`,
    ctaText: `Compress for ${plat.name}`,
    ctaUrl: plat.toolUrl,
    howToSteps: [
      `Click the button above to open the image compressor.`,
      `Upload or drag and drop the image you want to optimize for ${plat.name}.`,
      `The tool automatically compresses your image to a smaller file size.`,
      `For ${plat.name}, aim for ${plat.sizeHint}. Use our <a href="/image-tools/resize-image/">Resize Image</a> tool if you also need specific dimensions.`,
      `Download the optimized image and use it on ${plat.name}.`
    ],
    faqs: [
      { q: `What is the ideal image size for ${plat.name}?`, p: `For ${plat.name}, images should be ${plat.sizeHint}. This ensures fast loading, quick uploads, and the best visual experience on the platform.` },
      { q: `Will compressing reduce image quality on ${plat.name}?`, p: `Our compressor uses balanced settings that maintain sharp visual quality while reducing file size. The difference is imperceptible on ${plat.name}'s display.` },
      { q: `What formats does ${plat.name} support?`, p: `${plat.name} generally supports JPG, PNG, and WebP. Our compressor outputs optimized JPEG which is universally supported and offers the best compression ratio.` },
      { q: `Can I compress multiple images for ${plat.name}?`, p: `Yes, simply upload and compress images one at a time. Each processed image can be downloaded immediately before uploading the next.` }
    ],
    relatedLinks: [
      { url: '/image-tools/image-compressor/', label: 'Image Compressor' },
      { url: '/image-tools/resize-image/', label: 'Resize Image' },
      { url: '/image-tools/profile-picture-maker/', label: 'Profile Picture Maker' },
      { url: '/image-tools/instagram-dp-resizer/', label: 'Instagram DP Resizer' }
    ],
    schemaHowTo: true
  }));
}

// ─────────────────────────────────────────────────────────────────
// 4. REDUCE PDF TO SPECIFIC SIZE (MB)
// ─────────────────────────────────────────────────────────────────
for (let mb = 1; mb <= 50; mb++) {
  const slug = `reduce-pdf-to-${mb}mb`;
  allPages.push(buildPage({
    slug,
    title: `Reduce PDF to ${mb}MB Online Free`,
    metaDescription: `Compress your PDF to ${mb}MB or less online for free. Reduce PDF file size to under ${mb} megabytes while keeping quality. No installation required.`,
    breadcrumbCategory: 'File Tools',
    breadcrumbCategoryUrl: '/file-tools',
    breadcrumbName: `Reduce PDF to ${mb}MB`,
    h1: `Reduce PDF to ${mb}MB`,
    introParagraph: `Need your PDF under ${mb}MB? Use our free PDF compressor to shrink any PDF file to ${mb} megabytes or less. Choose from three compression levels to balance quality and file size. Perfect for ${mb <= 5 ? 'email attachments, form submissions, and online uploads' : mb <= 20 ? 'sharing documents and uploading to portals' : 'large documents that still need significant size reduction'}.`,
    ctaText: 'Compress PDF Now',
    ctaUrl: '/file-tools/compress-pdf/',
    howToSteps: [
      `Click the button above to open the <a href="/file-tools/compress-pdf/">PDF Compressor</a>.`,
      `Upload your PDF file (up to 100MB supported).`,
      `Select a compression level: ${mb <= 5 ? 'try "High" for maximum reduction' : mb <= 15 ? 'try "Medium" for a good balance' : '"Low" may suffice for modest reduction'}.`,
      `Click "Compress PDF" and wait for processing.`,
      `Download the compressed PDF. If it's still above ${mb}MB, try a higher compression level.`
    ],
    faqs: [
      { q: `How do I reduce a PDF to under ${mb}MB?`, p: `Upload your PDF to our compressor and select the appropriate compression level. For reaching ${mb}MB, ${mb <= 5 ? 'use "High" compression which can reduce file size by 70-80%' : mb <= 15 ? '"Medium" compression typically reduces files by 40-60%' : '"Low" or "Medium" compression should achieve the reduction you need'}.` },
      { q: `Will reducing to ${mb}MB affect document quality?`, p: `The compressor offers three levels. Low compression preserves nearly identical quality with 10-20% reduction. Medium is recommended for most uses with 40-60% reduction. High achieves maximum compression with minor visual changes to embedded images.` },
      { q: `What if my PDF is already under ${mb}MB?`, p: `If your PDF is already under ${mb}MB, you can still compress it further or simply use it as-is. The tool will show you the original and compressed sizes for comparison.` },
      { q: `Is the PDF compression secure?`, p: `Yes. Your files are processed securely and never stored permanently on any server. Privacy and security are top priorities.` },
      { q: `Can I compress a scanned PDF to ${mb}MB?`, p: `Scanned PDFs contain images, so they typically see the largest compression gains. Our tool is particularly effective at reducing scanned document sizes to ${mb}MB and below.` }
    ],
    relatedLinks: [
      { url: '/file-tools/compress-pdf/', label: 'Compress PDF' },
      { url: '/file-tools/merge-pdf/', label: 'Merge PDF' },
      { url: '/file-tools/split-pdf/', label: 'Split PDF' },
      { url: '/file-tools/pdf-to-word/', label: 'PDF to Word' }
    ],
    schemaHowTo: true
  }));
}

// ─────────────────────────────────────────────────────────────────
// 5. REDUCE PDF TO SPECIFIC KB SIZES
// ─────────────────────────────────────────────────────────────────
for (let kb = 100; kb <= 900; kb += 100) {
  const slug = `reduce-pdf-to-${kb}kb`;
  allPages.push(buildPage({
    slug,
    title: `Reduce PDF to ${kb}KB Online Free`,
    metaDescription: `Compress your PDF file to ${kb}KB or smaller. Free online PDF compressor to reduce PDF size to under ${kb} kilobytes. Fast and secure.`,
    breadcrumbCategory: 'File Tools',
    breadcrumbCategoryUrl: '/file-tools',
    breadcrumbName: `Reduce PDF to ${kb}KB`,
    h1: `Reduce PDF to ${kb}KB`,
    introParagraph: `Shrink your PDF to ${kb}KB or less using our free online compressor. This file size is ideal for ${kb <= 300 ? 'email attachments and online form submissions where strict size limits apply' : 'sharing documents via chat, email, or upload portals with moderate size restrictions'}.`,
    ctaText: 'Compress PDF Now',
    ctaUrl: '/file-tools/compress-pdf/',
    howToSteps: [
      `Open the <a href="/file-tools/compress-pdf/">PDF Compressor</a> by clicking the button above.`,
      `Upload your PDF file by clicking "Select PDF File" or dragging it in.`,
      `Select "High" compression for maximum size reduction to reach ${kb}KB.`,
      `Click "Compress PDF" and wait for the process to complete.`,
      `Download the compressed PDF and verify the file size.`
    ],
    faqs: [
      { q: `Can I compress a PDF to ${kb}KB?`, p: `Yes. Using our high compression setting, most PDFs can be reduced to ${kb}KB or smaller. The amount of reduction depends on the original content — documents with many images see the most dramatic shrinkage.` },
      { q: `What types of PDFs compress best to ${kb}KB?`, p: `Image-heavy PDFs and scanned documents compress most effectively. Text-only PDFs are already quite small and may already be under ${kb}KB.` },
      { q: `Will text in my PDF remain readable at ${kb}KB?`, p: `Yes. Text content is preserved perfectly. Only embedded images are re-encoded at lower quality. The text remains sharp and fully searchable.` },
      { q: `Is there a limit on how many PDFs I can compress?`, p: `No. You can compress as many PDFs as you need, one at a time. There are no daily limits or account requirements.` }
    ],
    relatedLinks: [
      { url: '/file-tools/compress-pdf/', label: 'Compress PDF' },
      { url: '/file-tools/split-pdf/', label: 'Split PDF' },
      { url: '/file-tools/pdf-to-word/', label: 'PDF to Word' },
      { url: '/image-tools/image-compressor/', label: 'Image Compressor' }
    ],
    schemaHowTo: true
  }));
}

// ─────────────────────────────────────────────────────────────────
// 6. COMPRESS PDF FOR PURPOSE
// ─────────────────────────────────────────────────────────────────
const pdfPurposes = [
  { name: 'Email', slug: 'email', desc: 'email attachments within 10-25MB limits', tip: 'Most email services limit attachments to 25MB. Use Medium or High compression to ensure your PDF fits.' },
  { name: 'Upload', slug: 'upload', desc: 'uploading to websites, portals, and forms', tip: 'Many upload forms have strict size limits (1-10MB). Use High compression for the smallest possible file.' },
  { name: 'Web', slug: 'web', desc: 'embedding on websites and fast page loading', tip: 'Web PDFs should be under 1-2MB for fast download times. High compression is recommended.' },
  { name: 'Printing', slug: 'printing', desc: 'printing with maintained visual quality', tip: 'For printing, use Low compression to maintain the highest quality while still reducing file size.' },
  { name: 'Sharing', slug: 'sharing', desc: 'sharing via messaging apps and cloud storage', tip: 'Medium compression provides the ideal balance for shared documents — small enough to send quickly, high enough quality to read clearly.' }
];

for (const purpose of pdfPurposes) {
  const slug = `compress-pdf-for-${purpose.slug}`;
  allPages.push(buildPage({
    slug,
    title: `Compress PDF for ${purpose.name} - Free Online Tool`,
    metaDescription: `Reduce PDF file size for ${purpose.name.toLowerCase()}. Compress PDFs optimized for ${purpose.desc}. Free, fast, and secure online PDF compressor.`,
    breadcrumbCategory: 'File Tools',
    breadcrumbCategoryUrl: '/file-tools',
    breadcrumbName: `Compress PDF for ${purpose.name}`,
    h1: `Compress PDF for ${purpose.name}`,
    introParagraph: `Optimize your PDF for ${purpose.desc} with our free compressor. ${purpose.tip} Processing is fast, secure, and happens right in your browser.`,
    ctaText: `Compress PDF for ${purpose.name}`,
    ctaUrl: '/file-tools/compress-pdf/',
    howToSteps: [
      `Open the <a href="/file-tools/compress-pdf/">PDF Compressor</a> using the button above.`,
      `Upload the PDF you need to optimize for ${purpose.name.toLowerCase()}.`,
      `${purpose.tip}`,
      `Click "Compress PDF" and wait for the process to complete.`,
      `Download the compressed PDF, ready for ${purpose.name.toLowerCase()}.`
    ],
    faqs: [
      { q: `What is the best PDF size for ${purpose.name.toLowerCase()}?`, p: `${purpose.tip} Our compressor lets you choose the compression level that matches your ${purpose.name.toLowerCase()} requirements perfectly.` },
      { q: `Will the compressed PDF work for ${purpose.name.toLowerCase()}?`, p: `Yes. The compressed PDF maintains full compatibility. All text, images, and formatting are preserved — only the file size is reduced.` },
      { q: `How much can I reduce my PDF for ${purpose.name.toLowerCase()}?`, p: `Typical reductions range from 10-80% depending on compression level and original content. Image-heavy PDFs see the largest reductions.` },
      { q: `Is the compression secure for sensitive documents?`, p: `Yes. Your files are never permanently stored on any server. The compression process prioritizes your privacy and security.` }
    ],
    relatedLinks: [
      { url: '/file-tools/compress-pdf/', label: 'Compress PDF' },
      { url: '/file-tools/merge-pdf/', label: 'Merge PDF' },
      { url: '/file-tools/unlock-pdf/', label: 'Unlock PDF' },
      { url: '/file-tools/pdf-to-word/', label: 'PDF to Word' }
    ],
    schemaHowTo: true
  }));
}

// shrink pdf online free
allPages.push(buildPage({
  slug: 'shrink-pdf-online-free',
  title: 'Shrink PDF Online Free - Reduce PDF Size Instantly',
  metaDescription: 'Shrink any PDF file online for free. Reduce PDF size by up to 80% with our fast, secure, browser-based compressor. No registration required.',
  breadcrumbCategory: 'File Tools',
  breadcrumbCategoryUrl: '/file-tools',
  breadcrumbName: 'Shrink PDF Online Free',
  h1: 'Shrink PDF Online Free',
  introParagraph: 'Shrink your PDF files instantly with our free online tool. Reduce PDF file size by up to 80% without losing quality. No software installation, no sign-up, no limits — just fast, secure PDF compression right in your browser.',
  ctaText: 'Shrink PDF Now',
  ctaUrl: '/file-tools/compress-pdf/',
  howToSteps: [
    'Click the button above to open the <a href="/file-tools/compress-pdf/">PDF Compressor</a>.',
    'Upload your PDF by clicking "Select PDF File" or drag and drop.',
    'Choose your compression level: Low, Medium, or High.',
    'Click "Compress PDF" and wait a few seconds.',
    'Download your shrunken PDF file instantly.'
  ],
  faqs: [
    { q: 'Is this PDF shrinker really free?', p: 'Yes, completely free with no hidden charges, watermarks, or limits. Use it as many times as you need.' },
    { q: 'How much can I shrink a PDF?', p: 'Depending on the content and compression level, you can reduce file size by 10-80%. Image-heavy PDFs shrink the most.' },
    { q: 'Do I need to install any software?', p: 'No. The tool works entirely in your web browser. No downloads, no plugins, no installation required.' },
    { q: 'Is my PDF safe during the shrinking process?', p: 'Absolutely. Your file is processed securely and never stored permanently. Privacy is guaranteed.' },
    { q: 'Can I shrink password-protected PDFs?', p: 'Password-protected PDFs need to be unlocked first. Use our <a href="/file-tools/unlock-pdf/">Unlock PDF</a> tool before compressing.' }
  ],
  relatedLinks: [
    { url: '/file-tools/compress-pdf/', label: 'Compress PDF' },
    { url: '/file-tools/merge-pdf/', label: 'Merge PDF' },
    { url: '/file-tools/split-pdf/', label: 'Split PDF' },
    { url: '/file-tools/unlock-pdf/', label: 'Unlock PDF' }
  ],
  schemaHowTo: true
}));

// ─────────────────────────────────────────────────────────────────
// 7. FORMAT CONVERSIONS
// ─────────────────────────────────────────────────────────────────
const conversions = [
  { from: 'PNG', to: 'JPG', slug: 'png-to-jpg', toolUrl: '/file-tools/jpg-to-png/', toolName: 'JPG to PNG Converter', category: 'Image Tools', categoryUrl: '/image-tools' },
  { from: 'JPG', to: 'PNG', slug: 'jpg-to-png', toolUrl: '/file-tools/jpg-to-png/', toolName: 'JPG to PNG Converter', category: 'File Tools', categoryUrl: '/file-tools' },
  { from: 'WebP', to: 'JPG', slug: 'webp-to-jpg', toolUrl: '/image-tools/image-compressor/', toolName: 'Image Compressor', category: 'Image Tools', categoryUrl: '/image-tools' },
  { from: 'WebP', to: 'PNG', slug: 'webp-to-png', toolUrl: '/image-tools/image-compressor/', toolName: 'Image Compressor', category: 'Image Tools', categoryUrl: '/image-tools' },
  { from: 'HEIC', to: 'JPG', slug: 'heic-to-jpg', toolUrl: '/image-tools/heic-to-jpg/', toolName: 'HEIC to JPG Converter', category: 'Image Tools', categoryUrl: '/image-tools' },
  { from: 'HEIC', to: 'PNG', slug: 'heic-to-png', toolUrl: '/image-tools/heic-to-jpg/', toolName: 'HEIC to JPG Converter', category: 'Image Tools', categoryUrl: '/image-tools' },
  { from: 'PDF', to: 'Word', slug: 'pdf-to-docx', toolUrl: '/file-tools/pdf-to-word/', toolName: 'PDF to Word Converter', category: 'File Tools', categoryUrl: '/file-tools' },
  { from: 'PDF', to: 'DOCX', slug: 'pdf-to-word', toolUrl: '/file-tools/pdf-to-word/', toolName: 'PDF to Word Converter', category: 'File Tools', categoryUrl: '/file-tools' },
  { from: 'Word', to: 'PDF', slug: 'docx-to-pdf', toolUrl: '/file-tools/word-to-pdf/', toolName: 'Word to PDF Converter', category: 'File Tools', categoryUrl: '/file-tools' },
  { from: 'DOCX', to: 'PDF', slug: 'word-to-pdf', toolUrl: '/file-tools/word-to-pdf/', toolName: 'Word to PDF Converter', category: 'File Tools', categoryUrl: '/file-tools' },
  { from: 'JPG', to: 'PDF', slug: 'jpg-to-pdf', toolUrl: '/file-tools/jpg-to-pdf/', toolName: 'JPG to PDF Converter', category: 'File Tools', categoryUrl: '/file-tools' },
  { from: 'PDF', to: 'JPG', slug: 'pdf-to-jpg', toolUrl: '/file-tools/pdf-to-jpg/', toolName: 'PDF to JPG Converter', category: 'File Tools', categoryUrl: '/file-tools' },
  { from: 'PDF', to: 'Excel', slug: 'pdf-to-excel', toolUrl: '/file-tools/pdf-to-excel/', toolName: 'PDF to Excel Converter', category: 'File Tools', categoryUrl: '/file-tools' },
  { from: 'Excel', to: 'PDF', slug: 'excel-to-pdf', toolUrl: '/file-tools/excel-to-pdf/', toolName: 'Excel to PDF Converter', category: 'File Tools', categoryUrl: '/file-tools' },
  { from: 'PowerPoint', to: 'PDF', slug: 'powerpoint-to-pdf', toolUrl: '/file-tools/powerpoint-to-pdf/', toolName: 'PowerPoint to PDF Converter', category: 'File Tools', categoryUrl: '/file-tools' },
  { from: 'PDF', to: 'PowerPoint', slug: 'pdf-to-powerpoint', toolUrl: '/file-tools/pdf-to-powerpoint/', toolName: 'PDF to PowerPoint Converter', category: 'File Tools', categoryUrl: '/file-tools' },
  { from: 'PNG', to: 'SVG', slug: 'png-to-svg', toolUrl: '/image-tools/png-to-svg/', toolName: 'PNG to SVG Converter', category: 'Image Tools', categoryUrl: '/image-tools' },
  { from: 'SVG', to: 'PNG', slug: 'svg-to-png', toolUrl: '/image-tools/svg-to-png/', toolName: 'SVG to PNG Converter', category: 'Image Tools', categoryUrl: '/image-tools' },
  { from: 'CSV', to: 'Excel', slug: 'csv-to-excel', toolUrl: '/file-tools/csv-to-excel/', toolName: 'CSV to Excel Converter', category: 'File Tools', categoryUrl: '/file-tools' },
  { from: 'Image', to: 'Base64', slug: 'image-to-base64', toolUrl: '/image-tools/image-to-base64/', toolName: 'Image to Base64 Converter', category: 'Image Tools', categoryUrl: '/image-tools' },
  { from: 'Base64', to: 'Image', slug: 'base64-to-image', toolUrl: '/image-tools/base64-to-image/', toolName: 'Base64 to Image Converter', category: 'Image Tools', categoryUrl: '/image-tools' },
  { from: 'EPUB', to: 'PDF', slug: 'epub-to-pdf', toolUrl: '/file-tools/epub-to-pdf/', toolName: 'EPUB to PDF Converter', category: 'File Tools', categoryUrl: '/file-tools' },
  { from: 'HTML', to: 'PDF', slug: 'html-to-pdf', toolUrl: '/file-tools/html-to-pdf/', toolName: 'HTML to PDF Converter', category: 'File Tools', categoryUrl: '/file-tools' },
  { from: 'DOCX', to: 'TXT', slug: 'docx-to-txt', toolUrl: '/file-tools/docx-to-txt/', toolName: 'DOCX to TXT Converter', category: 'File Tools', categoryUrl: '/file-tools' },
  { from: 'MP4', to: 'MP3', slug: 'mp4-to-mp3', toolUrl: '/file-tools/mp4-to-mp3/', toolName: 'MP4 to MP3 Converter', category: 'File Tools', categoryUrl: '/file-tools' }
];

const conversionVariations = [
  { suffix: 'converter-online-free', titleSuffix: 'Converter Online Free', descPrefix: 'Free online' },
  { suffix: 'converter', titleSuffix: 'Converter', descPrefix: 'Convert files with our' },
  { suffix: 'online', titleSuffix: 'Online', descPrefix: 'Convert online using our' },
  { suffix: 'free', titleSuffix: 'Free', descPrefix: 'Free' },
  { suffix: 'converter-no-signup', titleSuffix: 'Converter - No Sign Up', descPrefix: 'No registration' }
];

for (const conv of conversions) {
  // Base conversion page
  const baseSlug = `convert-${conv.slug}`;
  allPages.push(buildPage({
    slug: baseSlug,
    title: `Convert ${conv.from} to ${conv.to} Online Free`,
    metaDescription: `Convert ${conv.from} to ${conv.to} online for free. Fast, easy ${conv.from} to ${conv.to} conversion in your browser. No installation, no sign-up required.`,
    breadcrumbCategory: conv.category,
    breadcrumbCategoryUrl: conv.categoryUrl,
    breadcrumbName: `${conv.from} to ${conv.to}`,
    h1: `Convert ${conv.from} to ${conv.to} Online`,
    introParagraph: `Convert your ${conv.from} files to ${conv.to} format instantly using our free online converter. No software installation needed — the conversion happens right in your browser, keeping your files private and secure.`,
    ctaText: `Convert ${conv.from} to ${conv.to}`,
    ctaUrl: conv.toolUrl,
    howToSteps: [
      `Click the button above to open the <a href="${conv.toolUrl}">${conv.toolName}</a>.`,
      `Upload your ${conv.from} file by clicking the upload button or dragging it in.`,
      `The tool will process and convert your file to ${conv.to} format.`,
      `Download the converted ${conv.to} file to your device.`
    ],
    faqs: [
      { q: `How do I convert ${conv.from} to ${conv.to}?`, p: `Upload your ${conv.from} file to our converter, and it will be automatically processed and converted to ${conv.to} format. Click download to save the result.` },
      { q: `Is the ${conv.from} to ${conv.to} converter free?`, p: `Yes, completely free with no limits. Convert as many files as you need without creating an account or paying anything.` },
      { q: `Will converting from ${conv.from} to ${conv.to} lose quality?`, p: `Our converter preserves the maximum possible quality during conversion. The output ${conv.to} file will be as close to the original as the format allows.` },
      { q: `Is it safe to convert ${conv.from} files online?`, p: `Yes. Your files are processed in your browser and are never uploaded to or stored on any server. Your data remains completely private.` },
      { q: `What is the maximum file size for ${conv.from} to ${conv.to} conversion?`, p: `Our converter handles files up to 100MB. For most documents, images, and media files, this is more than sufficient.` }
    ],
    relatedLinks: [
      { url: conv.toolUrl, label: conv.toolName },
      { url: '/image-tools/image-compressor/', label: 'Image Compressor' },
      { url: '/file-tools/compress-pdf/', label: 'Compress PDF' },
      { url: '/file-tools/merge-pdf/', label: 'Merge PDF' }
    ],
    schemaHowTo: true
  }));

  // Variation pages
  for (const variation of conversionVariations) {
    const varSlug = `${conv.slug}-${variation.suffix}`;
    allPages.push(buildPage({
      slug: varSlug,
      title: `${conv.from} to ${conv.to} ${variation.titleSuffix}`,
      metaDescription: `${variation.descPrefix} ${conv.from} to ${conv.to} converter. Transform your ${conv.from} files to ${conv.to} format in seconds. No software needed, works in any browser.`,
      breadcrumbCategory: conv.category,
      breadcrumbCategoryUrl: conv.categoryUrl,
      breadcrumbName: `${conv.from} to ${conv.to} ${variation.titleSuffix}`,
      h1: `${conv.from} to ${conv.to} ${variation.titleSuffix}`,
      introParagraph: `Looking for a reliable ${conv.from} to ${conv.to} converter? Our free browser-based tool converts your ${conv.from} files to ${conv.to} format in seconds. No downloads, no registration, no hassle — just fast, accurate conversions.`,
      ctaText: `Convert ${conv.from} to ${conv.to} Now`,
      ctaUrl: conv.toolUrl,
      howToSteps: [
        `Open the <a href="${conv.toolUrl}">${conv.toolName}</a> by clicking the button above.`,
        `Select your ${conv.from} file to begin the conversion.`,
        `The tool automatically converts your file from ${conv.from} to ${conv.to}.`,
        `Click download to save the ${conv.to} file to your device.`
      ],
      faqs: [
        { q: `Is this ${conv.from} to ${conv.to} converter really free?`, p: `Yes. This is a 100% free tool with no hidden costs, no watermarks, and no sign-up required. Use it as many times as you like.` },
        { q: `How fast is the ${conv.from} to ${conv.to} conversion?`, p: `Most conversions complete within seconds. Larger files may take slightly longer, but the process is highly optimized for speed.` },
        { q: `Can I convert ${conv.from} to ${conv.to} on mobile?`, p: `Yes. Our converter works on any device with a modern web browser — desktop, tablet, or mobile phone. No app installation needed.` },
        { q: `Do I need to create an account?`, p: `No. The converter is completely accessible without registration. Just upload your file and convert.` }
      ],
      relatedLinks: [
        { url: conv.toolUrl, label: conv.toolName },
        { url: '/all-tools/', label: 'All Tools' },
        { url: '/file-tools/', label: 'File Tools' },
        { url: '/image-tools/', label: 'Image Tools' }
      ],
      schemaHowTo: true
    }));
  }
}

// ─────────────────────────────────────────────────────────────────
// 8. PERCENTAGE CALCULATOR: "What is X% of Y"
// ─────────────────────────────────────────────────────────────────
const percentValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 33, 35, 40, 45, 50, 60, 70, 75, 80, 90, 100];
const ofValues = [50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 750, 800, 900, 1000, 1200, 1500, 2000, 2500, 3000, 5000, 10000];

for (const pct of percentValues) {
  for (const val of ofValues) {
    const result = ((pct / 100) * val);
    const resultStr = Number.isInteger(result) ? result.toString() : result.toFixed(2);
    const slug = `what-is-${pct}-percent-of-${val}`;
    allPages.push(buildPage({
      slug,
      title: `What is ${pct}% of ${val.toLocaleString()}? Answer: ${resultStr}`,
      metaDescription: `${pct}% of ${val.toLocaleString()} is ${resultStr}. Calculate ${pct} percent of ${val.toLocaleString()} instantly with our free percentage calculator. See the formula and learn how.`,
      breadcrumbCategory: 'Calculators',
      breadcrumbCategoryUrl: '/calculators',
      breadcrumbName: `${pct}% of ${val.toLocaleString()}`,
      h1: `What is ${pct}% of ${val.toLocaleString()}?`,
      introParagraph: `<strong>${pct}% of ${val.toLocaleString()} is ${resultStr}.</strong> This is calculated by multiplying ${val.toLocaleString()} by ${pct}/100 = ${(pct/100)}. Use our free percentage calculator below for more calculations like this.`,
      ctaText: 'Open Percentage Calculator',
      ctaUrl: '/calculators/percentage-calculator/',
      howToSteps: [
        `To calculate ${pct}% of ${val.toLocaleString()}, use the formula: (${pct} / 100) &times; ${val.toLocaleString()}.`,
        `${pct} &divide; 100 = ${(pct/100)}.`,
        `${(pct/100)} &times; ${val.toLocaleString()} = <strong>${resultStr}</strong>.`,
        `For more calculations, open our <a href="/calculators/percentage-calculator/">Percentage Calculator</a>.`
      ],
      faqs: [
        { q: `What is ${pct}% of ${val.toLocaleString()}?`, p: `${pct}% of ${val.toLocaleString()} is ${resultStr}. The formula is (${pct}/100) &times; ${val.toLocaleString()} = ${resultStr}.` },
        { q: `How do you calculate ${pct} percent of a number?`, p: `To find ${pct}% of any number, multiply the number by ${(pct/100)}. For example, ${pct}% of ${val.toLocaleString()} = ${val.toLocaleString()} &times; ${(pct/100)} = ${resultStr}.` },
        { q: `What is the formula for percentages?`, p: `The percentage formula is: Result = (Percentage / 100) &times; Total. So ${pct}% of ${val.toLocaleString()} = (${pct} / 100) &times; ${val.toLocaleString()} = ${resultStr}.` },
        { q: `Can I calculate other percentages?`, p: `Yes! Use our <a href="/calculators/percentage-calculator/">Percentage Calculator</a> to calculate any percentage of any number instantly.` }
      ],
      relatedLinks: [
        { url: '/calculators/percentage-calculator/', label: 'Percentage Calculator' },
        { url: '/calculators/discount-calculator/', label: 'Discount Calculator' },
        { url: '/calculators/grade-calculator/', label: 'Grade Calculator' },
        { url: '/calculators/gpa-calculator/', label: 'GPA Calculator' }
      ],
      schemaHowTo: true
    }));
  }
}

// ─────────────────────────────────────────────────────────────────
// 9. AGE CALCULATOR FROM BIRTH YEAR
// ─────────────────────────────────────────────────────────────────
const currentYear = 2026;
for (let year = 1940; year <= 2025; year++) {
  const age = currentYear - year;
  const slug = `age-if-born-in-${year}`;
  allPages.push(buildPage({
    slug,
    title: `How Old Am I if Born in ${year}? Age: ${age} or ${age - 1}`,
    metaDescription: `If you were born in ${year}, you are ${age - 1} or ${age} years old in ${currentYear}. Calculate your exact age in years, months, and days with our free age calculator.`,
    breadcrumbCategory: 'Calculators',
    breadcrumbCategoryUrl: '/calculators',
    breadcrumbName: `Born in ${year}`,
    h1: `How Old Am I if Born in ${year}?`,
    introParagraph: `If you were born in ${year}, you are <strong>${age - 1} or ${age} years old</strong> in ${currentYear}, depending on whether your birthday has occurred yet this year. Use our free age calculator for your exact age down to the day.`,
    ctaText: 'Calculate Exact Age',
    ctaUrl: '/calculators/age-calculator/',
    howToSteps: [
      `Open the <a href="/calculators/age-calculator/">Age Calculator</a> by clicking the button above.`,
      `Enter your date of birth (any date in ${year}).`,
      `The calculator instantly shows your exact age in years, months, and days.`,
      `See your next birthday countdown and total days lived.`
    ],
    faqs: [
      { q: `How old am I if I was born in ${year}?`, p: `In ${currentYear}, someone born in ${year} is ${age - 1} or ${age} years old. The exact age depends on whether your birthday has passed in the current year. Use our age calculator for a precise result.` },
      { q: `What generation is someone born in ${year}?`, p: `${year < 1946 ? 'People born before 1946 are part of the Silent Generation.' : year < 1965 ? 'People born between 1946-1964 are Baby Boomers.' : year < 1981 ? 'People born between 1965-1980 are Generation X.' : year < 1997 ? 'People born between 1981-1996 are Millennials (Generation Y).' : year < 2013 ? 'People born between 1997-2012 are Generation Z.' : 'People born after 2012 are Generation Alpha.'}` },
      { q: `How many days old am I if born in ${year}?`, p: `Someone born on January 1, ${year} has lived approximately ${Math.floor((currentYear - year) * 365.25)} days. For an exact count based on your specific birthday, use our <a href="/calculators/age-calculator/">Age Calculator</a>.` },
      { q: `What is my retirement age if born in ${year}?`, p: `Retirement age varies by country. In the US, the full retirement age for someone born in ${year} is ${year <= 1954 ? '66' : year <= 1959 ? '66 and ' + ((year - 1954) * 2) + ' months' : '67'}. Use our <a href="/calculators/retirement-savings-calculator/">Retirement Savings Calculator</a> for planning.` }
    ],
    relatedLinks: [
      { url: '/calculators/age-calculator/', label: 'Age Calculator' },
      { url: '/calculators/date-difference-calculator/', label: 'Date Difference Calculator' },
      { url: '/calculators/retirement-savings-calculator/', label: 'Retirement Calculator' },
      { url: '/calculators/pregnancy-due-date-calculator/', label: 'Due Date Calculator' }
    ],
    schemaHowTo: true
  }));
}

// ─────────────────────────────────────────────────────────────────
// 10. DATE DIFFERENCE VARIATIONS
// ─────────────────────────────────────────────────────────────────
const dateDiffVariations = [
  { slug: 'days-between-two-dates', h1: 'Days Between Two Dates Calculator', desc: 'Calculate the exact number of days between any two dates.' },
  { slug: 'weeks-between-two-dates', h1: 'Weeks Between Two Dates', desc: 'Find out how many weeks are between two dates instantly.' },
  { slug: 'months-between-two-dates', h1: 'Months Between Two Dates', desc: 'Calculate the exact number of months between any two dates.' },
  { slug: 'years-between-two-dates', h1: 'Years Between Two Dates', desc: 'Determine how many years separate two specific dates.' },
  { slug: 'business-days-between-two-dates', h1: 'Business Days Between Two Dates', desc: 'Count working days (excluding weekends) between two dates.' },
  { slug: 'hours-between-two-dates', h1: 'Hours Between Two Dates', desc: 'Calculate the total hours between any two dates and times.' },
  { slug: 'how-many-days-until-christmas', h1: 'How Many Days Until Christmas?', desc: 'Find out exactly how many days remain until Christmas Day.' },
  { slug: 'how-many-days-until-new-year', h1: 'How Many Days Until New Year?', desc: 'Count down the days until January 1st of the next year.' },
  { slug: 'how-many-days-since-date', h1: 'How Many Days Since a Date?', desc: 'Calculate how many days have passed since any date in the past.' },
  { slug: 'date-calculator-add-subtract-days', h1: 'Date Calculator - Add or Subtract Days', desc: 'Add or subtract days from any date to find the resulting date.' }
];

for (const dd of dateDiffVariations) {
  allPages.push(buildPage({
    slug: dd.slug,
    title: `${dd.h1} - Free Online Tool`,
    metaDescription: `${dd.desc} Free, instant, no sign-up. Use our date difference calculator for accurate results.`,
    breadcrumbCategory: 'Calculators',
    breadcrumbCategoryUrl: '/calculators',
    breadcrumbName: dd.h1,
    h1: dd.h1,
    introParagraph: `${dd.desc} Our free date calculator provides instant, accurate results. Whether you need to plan events, track deadlines, or satisfy curiosity, this tool gives you the answer in seconds.`,
    ctaText: 'Calculate Date Difference',
    ctaUrl: '/calculators/date-difference-calculator/',
    howToSteps: [
      'Click the button above to open the <a href="/calculators/date-difference-calculator/">Date Difference Calculator</a>.',
      'Enter the first date (start date).',
      'Enter the second date (end date).',
      'View the result showing the exact difference in various units.'
    ],
    faqs: [
      { q: `How do I ${dd.h1.toLowerCase().replace(' calculator', '').replace(' -', '')}?`, p: `Use our Date Difference Calculator. Enter two dates and the tool instantly calculates the difference in days, weeks, months, and years.` },
      { q: 'Does the calculator account for leap years?', p: 'Yes. The calculator correctly handles leap years, giving you an accurate count for any date range.' },
      { q: 'Can I calculate dates in the past and future?', p: 'Absolutely. Enter any two dates — past, present, or future — and get the exact difference.' },
      { q: 'Is the date difference calculator free?', p: 'Yes, completely free with no limits or sign-up required.' }
    ],
    relatedLinks: [
      { url: '/calculators/date-difference-calculator/', label: 'Date Difference Calculator' },
      { url: '/calculators/age-calculator/', label: 'Age Calculator' },
      { url: '/calculators/time-zone-converter/', label: 'Time Zone Converter' },
      { url: '/calculators/pregnancy-due-date-calculator/', label: 'Due Date Calculator' }
    ],
    schemaHowTo: true
  }));
}

// ─────────────────────────────────────────────────────────────────
// 11. DISCOUNT CALCULATOR: "X% off Y"
// ─────────────────────────────────────────────────────────────────
const discountPercents = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80, 90];
const priceValues = [10, 20, 25, 30, 40, 50, 60, 75, 80, 100, 120, 150, 200, 250, 300, 400, 500, 750, 1000];

for (const disc of discountPercents) {
  for (const price of priceValues) {
    const savings = ((disc / 100) * price);
    const finalPrice = price - savings;
    const savingsStr = Number.isInteger(savings) ? savings.toString() : savings.toFixed(2);
    const finalStr = Number.isInteger(finalPrice) ? finalPrice.toString() : finalPrice.toFixed(2);
    const slug = `${disc}-percent-off-${price}`;
    allPages.push(buildPage({
      slug,
      title: `${disc}% Off $${price} - You Save $${savingsStr}, Pay $${finalStr}`,
      metaDescription: `${disc}% off $${price} is $${savingsStr} savings. You pay $${finalStr}. Calculate any discount instantly with our free discount calculator.`,
      breadcrumbCategory: 'Calculators',
      breadcrumbCategoryUrl: '/calculators',
      breadcrumbName: `${disc}% Off $${price}`,
      h1: `${disc}% Off $${price}`,
      introParagraph: `With a <strong>${disc}% discount on $${price}</strong>, you save <strong>$${savingsStr}</strong> and pay only <strong>$${finalStr}</strong>. Use our discount calculator below for more discount calculations.`,
      ctaText: 'Open Discount Calculator',
      ctaUrl: '/calculators/discount-calculator/',
      howToSteps: [
        `To calculate ${disc}% off $${price}: multiply $${price} by ${disc}/100 = $${savingsStr} savings.`,
        `Subtract the savings: $${price} - $${savingsStr} = <strong>$${finalStr}</strong> final price.`,
        `For more calculations, use our <a href="/calculators/discount-calculator/">Discount Calculator</a>.`,
        `You can also stack multiple discounts using the calculator's advanced mode.`
      ],
      faqs: [
        { q: `How much is ${disc}% off $${price}?`, p: `${disc}% off $${price} is $${savingsStr}. The final price after the discount is $${finalStr}.` },
        { q: `How do I calculate ${disc}% off a price?`, p: `Multiply the original price by ${disc}/100 (or ${(disc/100)}) to find the savings amount. Then subtract from the original price. For $${price}: $${price} &times; ${(disc/100)} = $${savingsStr} savings.` },
        { q: `What is the formula for calculating discounts?`, p: `Discount Amount = Original Price &times; (Discount Percentage / 100). Final Price = Original Price - Discount Amount. So ${disc}% off $${price} = $${price} - ($${price} &times; ${(disc/100)}) = $${finalStr}.` },
        { q: 'Can I calculate other discounts?', p: `Yes! Use our <a href="/calculators/discount-calculator/">Discount Calculator</a> to calculate any percentage off any price, including stacked and sequential discounts.` }
      ],
      relatedLinks: [
        { url: '/calculators/discount-calculator/', label: 'Discount Calculator' },
        { url: '/calculators/percentage-calculator/', label: 'Percentage Calculator' },
        { url: '/calculators/vat-tax-calculator/', label: 'VAT/Tax Calculator' },
        { url: '/calculators/savings-goal-calculator/', label: 'Savings Goal Calculator' }
      ],
      schemaHowTo: true
    }));
  }
}

// ─── Write all pages to disk ───────────────────────────────────────

console.log(`Generating ${allPages.length} SEO landing pages...`);

ensureDir(OUTPUT_DIR);

const sitemapEntries = [];

for (let i = 0; i < allPages.length; i++) {
  const html = allPages[i];
  // Extract slug from canonical URL
  const match = html.match(/rel="canonical" href="[^"]+\/pages\/([^/]+)\//);
  if (!match) continue;
  const slug = match[1];
  const pageDir = path.join(OUTPUT_DIR, slug);
  ensureDir(pageDir);
  fs.writeFileSync(path.join(pageDir, 'index.html'), html, 'utf8');
  sitemapEntries.push(`  <url>\n    <loc>${DOMAIN}/pages/${slug}/</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`);
}

console.log(`Generated ${sitemapEntries.length} pages in /pages/`);

// ─── Generate sitemap fragment ─────────────────────────────────────

const sitemapFragment = sitemapEntries.join('\n');
fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-seo-pages.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapFragment}\n</urlset>`, 'utf8');
console.log(`Sitemap fragment written to /pages/sitemap-seo-pages.xml`);

// ─── Merge into main sitemap ───────────────────────────────────────

const mainSitemapPath = path.join(__dirname, '..', 'sitemap.xml');
let mainSitemap = fs.readFileSync(mainSitemapPath, 'utf8');

// Remove any previously injected SEO pages
mainSitemap = mainSitemap.replace(/\n  <!-- SEO LANDING PAGES START -->[\s\S]*?<!-- SEO LANDING PAGES END -->\n/g, '');

// Inject before closing tag
const injection = `\n  <!-- SEO LANDING PAGES START -->\n${sitemapFragment}\n  <!-- SEO LANDING PAGES END -->\n`;
mainSitemap = mainSitemap.replace('</urlset>', `${injection}</urlset>`);
fs.writeFileSync(mainSitemapPath, mainSitemap, 'utf8');
console.log('Main sitemap.xml updated with SEO landing pages.');

console.log('\nDone! Summary:');
console.log(`  Total pages: ${sitemapEntries.length}`);
console.log(`  Output directory: /pages/`);
console.log(`  Sitemap entries added to: /sitemap.xml`);

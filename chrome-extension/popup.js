(() => {
  "use strict";

  const BASE = "https://usetoolnest.com";

  // ── Tool database ──────────────────────────────────────────────────
  const TOOLS = [
    // File Tools
    { name: "PDF to Word",        desc: "Convert PDF to editable Word",       path: "/file-tools/pdf-to-word",        cat: "file",   icon: "📄", bg: "bg-blue" },
    { name: "Word to PDF",        desc: "Convert Word documents to PDF",      path: "/file-tools/word-to-pdf",        cat: "file",   icon: "📝", bg: "bg-blue" },
    { name: "Merge PDF",          desc: "Combine multiple PDFs into one",     path: "/file-tools/merge-pdf",          cat: "file",   icon: "📎", bg: "bg-blue" },
    { name: "Split PDF",          desc: "Extract or split PDF pages",         path: "/file-tools/split-pdf",          cat: "file",   icon: "✂️", bg: "bg-blue" },
    { name: "Compress PDF",       desc: "Reduce PDF file size",               path: "/file-tools/compress-pdf",       cat: "file",   icon: "🗜️", bg: "bg-blue" },
    { name: "PDF to JPG",         desc: "Convert PDF pages to JPG images",    path: "/file-tools/pdf-to-jpg",         cat: "file",   icon: "🖼️", bg: "bg-blue" },
    { name: "JPG to PDF",         desc: "Convert JPG images to PDF",          path: "/file-tools/jpg-to-pdf",         cat: "file",   icon: "📷", bg: "bg-blue" },
    { name: "PDF to Excel",       desc: "Convert PDF tables to Excel",        path: "/file-tools/pdf-to-excel",       cat: "file",   icon: "📊", bg: "bg-blue" },
    { name: "Excel to PDF",       desc: "Convert Excel to PDF format",        path: "/file-tools/excel-to-pdf",       cat: "file",   icon: "📈", bg: "bg-blue" },
    { name: "MP4 to MP3",         desc: "Extract audio from video",           path: "/file-tools/mp4-to-mp3",         cat: "file",   icon: "🎵", bg: "bg-blue" },
    { name: "Extract Text from PDF", desc: "Extract text from any PDF",       path: "/file-tools/extract-text-from-pdf", cat: "file", icon: "📃", bg: "bg-blue" },
    { name: "Unlock PDF",         desc: "Remove PDF password protection",     path: "/file-tools/unlock-pdf",         cat: "file",   icon: "🔓", bg: "bg-blue" },
    { name: "CSV to Excel",       desc: "Convert CSV files to Excel",         path: "/file-tools/csv-to-excel",       cat: "file",   icon: "📋", bg: "bg-blue" },
    { name: "HTML to PDF",        desc: "Convert HTML to PDF documents",      path: "/file-tools/html-to-pdf",        cat: "file",   icon: "🌐", bg: "bg-blue" },
    { name: "Video Trimmer",      desc: "Trim and cut video files",           path: "/file-tools/video-trimmer",      cat: "file",   icon: "🎬", bg: "bg-blue" },
    { name: "Screen Recorder",    desc: "Record your screen in browser",      path: "/file-tools/screen-recorder",    cat: "file",   icon: "🖥️", bg: "bg-blue" },

    // Image Tools
    { name: "Compress Image",     desc: "Reduce image size, keep quality",    path: "/image-tools/image-compressor",  cat: "image",  icon: "🗜️", bg: "bg-green" },
    { name: "Resize Image",       desc: "Change image dimensions",            path: "/image-tools/resize-image",      cat: "image",  icon: "📐", bg: "bg-green" },
    { name: "HEIC to JPG",        desc: "Convert iPhone HEIC to JPG",         path: "/image-tools/heic-to-jpg",       cat: "image",  icon: "📱", bg: "bg-green" },
    { name: "Background Remover", desc: "AI-powered background removal",      path: "/image-tools/background-remover",cat: "image",  icon: "✨", bg: "bg-green" },
    { name: "Meme Generator",     desc: "Create memes with custom text",      path: "/image-tools/meme-generator",    cat: "image",  icon: "😂", bg: "bg-green" },
    { name: "QR Code Generator",  desc: "Create QR codes for URLs & text",    path: "/image-tools/qr-code-generator", cat: "image",  icon: "📲", bg: "bg-green" },
    { name: "JPG to PNG",         desc: "Convert JPG images to PNG",          path: "/file-tools/jpg-to-png",         cat: "image",  icon: "🔄", bg: "bg-green" },
    { name: "SVG to PNG",         desc: "Convert SVG vectors to PNG",         path: "/image-tools/svg-to-png",        cat: "image",  icon: "🎨", bg: "bg-green" },
    { name: "Profile Picture Maker", desc: "Crop & resize profile photos",    path: "/image-tools/profile-picture-maker", cat: "image", icon: "👤", bg: "bg-green" },
    { name: "Favicon Generator",  desc: "Generate website favicons",          path: "/image-tools/favicon-generator", cat: "image",  icon: "⭐", bg: "bg-green" },
    { name: "Collage Maker",      desc: "Create photo collages",              path: "/image-tools/collage-maker",     cat: "image",  icon: "🖼️", bg: "bg-green" },
    { name: "Photo Filters",      desc: "Apply filters and effects",          path: "/image-tools/photo-filters-editor", cat: "image", icon: "🎭", bg: "bg-green" },
    { name: "Color Palette Extractor", desc: "Extract colors from images",    path: "/image-tools/color-palette-extractor", cat: "image", icon: "🎨", bg: "bg-green" },
    { name: "YouTube Thumbnail Maker", desc: "Create YouTube thumbnails",     path: "/image-tools/youtube-thumbnail-maker", cat: "image", icon: "▶️", bg: "bg-green" },

    // Calculators
    { name: "GPA Calculator",     desc: "Calculate college or school GPA",    path: "/calculators/gpa-calculator",    cat: "calc",   icon: "🎓", bg: "bg-purple" },
    { name: "Loan Calculator",    desc: "Estimate payments and interest",     path: "/calculators/loan-calculator",   cat: "calc",   icon: "💰", bg: "bg-purple" },
    { name: "Age Calculator",     desc: "Calculate exact age",                path: "/calculators/age-calculator",    cat: "calc",   icon: "🎂", bg: "bg-purple" },
    { name: "Percentage Calculator", desc: "Calculate percentages easily",    path: "/calculators/percentage-calculator", cat: "calc", icon: "%",  bg: "bg-purple" },
    { name: "Time Zone Converter", desc: "Convert time between zones",        path: "/calculators/time-zone-converter", cat: "calc",  icon: "🌍", bg: "bg-purple" },
    { name: "Discount Calculator", desc: "Calculate savings & final price",   path: "/calculators/discount-calculator", cat: "calc",  icon: "🏷️", bg: "bg-purple" },
    { name: "VAT/Tax Calculator",  desc: "Add or remove VAT/tax",            path: "/calculators/vat-tax-calculator", cat: "calc",   icon: "🧾", bg: "bg-purple" },
    { name: "Weight Converter",   desc: "Convert kg, lbs, oz & more",        path: "/calculators/weight-converter",  cat: "calc",   icon: "⚖️", bg: "bg-purple" },
    { name: "Fuel Cost Calculator", desc: "Estimate trip fuel costs",         path: "/calculators/fuel-cost-calculator", cat: "calc", icon: "⛽", bg: "bg-purple" },
    { name: "Date Difference",    desc: "Find exact date difference",         path: "/calculators/date-difference-calculator", cat: "calc", icon: "📅", bg: "bg-purple" },

    // AI Tools
    { name: "Text Summarizer",    desc: "Summarize articles & essays",        path: "/ai-tools/text-summarizer",      cat: "ai",     icon: "📝", bg: "bg-orange" },
    { name: "Email Writer",       desc: "Craft professional emails",          path: "/ai-tools/email-writer",         cat: "ai",     icon: "✉️", bg: "bg-orange" },
    { name: "Resume Bullet Generator", desc: "Achievement-oriented bullets",  path: "/ai-tools/resume-bullet-generator", cat: "ai",  icon: "💼", bg: "bg-orange" },
    { name: "Caption Generator",  desc: "Social media captions",              path: "/ai-tools/caption-generator",    cat: "ai",     icon: "💬", bg: "bg-orange" },
    { name: "Grammar Checker",    desc: "Fix grammar & spelling errors",      path: "/ai-tools/grammar-checker",      cat: "ai",     icon: "✅", bg: "bg-orange" },
    { name: "Paraphrasing Tool",  desc: "Rewrite text instantly",             path: "/ai-tools/paraphrasing-tool",    cat: "ai",     icon: "🔁", bg: "bg-orange" },
    { name: "JSON Formatter",     desc: "Beautify & validate JSON",           path: "/ai-tools/json-formatter",       cat: "ai",     icon: "{ }", bg: "bg-orange" },
    { name: "Regex Generator",    desc: "Generate & test regex patterns",     path: "/ai-tools/regex-generator",      cat: "ai",     icon: "🔍", bg: "bg-orange" },
    { name: "Plagiarism Checker", desc: "Check text originality",             path: "/ai-tools/plagiarism-checker",   cat: "ai",     icon: "🔎", bg: "bg-orange" },
    { name: "Bio Generator",     desc: "Create professional bios",            path: "/ai-tools/bio-generator",        cat: "ai",     icon: "👔", bg: "bg-orange" },

    // Student Tools
    { name: "Citation Generator", desc: "APA, MLA, Chicago citations",        path: "/student-tools/citation-generator", cat: "student", icon: "📚", bg: "bg-pink" },
    { name: "Study Timer",        desc: "Pomodoro technique timer",            path: "/student-tools/study-timer",     cat: "student", icon: "⏱️", bg: "bg-pink" },
    { name: "Flashcard Maker",    desc: "Create & study flashcards",           path: "/student-tools/flashcard-maker", cat: "student", icon: "🃏", bg: "bg-pink" },
    { name: "Read Time Estimator", desc: "Calculate reading time",             path: "/student-tools/read-time-estimator", cat: "student", icon: "📖", bg: "bg-pink" },
  ];

  const CATEGORIES = [
    { id: "all",     label: "All" },
    { id: "file",    label: "File" },
    { id: "image",   label: "Image" },
    { id: "calc",    label: "Calculators" },
    { id: "ai",      label: "AI" },
    { id: "student", label: "Student" },
  ];

  // Popular tools shown by default (indices)
  const POPULAR = [0, 16, 4, 19, 30, 40, 6, 20, 44, 33, 41, 50];

  // ── DOM refs ───────────────────────────────────────────────────────
  const searchInput   = document.getElementById("searchInput");
  const categoriesEl  = document.getElementById("categories");
  const toolList      = document.getElementById("toolList");
  const sectionTitle  = document.getElementById("sectionTitle");
  const emptyState    = document.getElementById("emptyState");
  const toolsSection  = document.getElementById("toolsSection");

  let activeCat = "all";

  // ── Render categories ──────────────────────────────────────────────
  function renderCategories() {
    categoriesEl.innerHTML = "";
    CATEGORIES.forEach(c => {
      const btn = document.createElement("button");
      btn.className = "cat-btn" + (c.id === activeCat ? " active" : "");
      btn.textContent = c.label;
      btn.addEventListener("click", () => {
        activeCat = c.id;
        searchInput.value = "";
        renderCategories();
        renderTools();
      });
      categoriesEl.appendChild(btn);
    });
  }

  // ── Render tool list ───────────────────────────────────────────────
  function renderTools() {
    const query = searchInput.value.trim().toLowerCase();
    let filtered;

    if (query) {
      sectionTitle.textContent = "Search Results";
      filtered = TOOLS.filter(t =>
        t.name.toLowerCase().includes(query) ||
        t.desc.toLowerCase().includes(query)
      );
    } else if (activeCat === "all") {
      sectionTitle.textContent = "Popular Tools";
      filtered = POPULAR.map(i => TOOLS[i]).filter(Boolean);
    } else {
      const catLabel = CATEGORIES.find(c => c.id === activeCat)?.label || "Tools";
      sectionTitle.textContent = catLabel;
      filtered = TOOLS.filter(t => t.cat === activeCat);
    }

    // Apply category filter to search too
    if (query && activeCat !== "all") {
      filtered = filtered.filter(t => t.cat === activeCat);
    }

    toolList.innerHTML = "";

    if (filtered.length === 0) {
      toolsSection.style.display = "none";
      emptyState.style.display = "block";
      return;
    }

    toolsSection.style.display = "block";
    emptyState.style.display = "none";

    filtered.forEach(tool => {
      const a = document.createElement("a");
      a.className = "tool-item";
      a.href = BASE + tool.path;
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML = `
        <div class="tool-icon ${tool.bg}">${tool.icon}</div>
        <div>
          <div class="tool-name">${tool.name}</div>
          <div class="tool-desc">${tool.desc}</div>
        </div>
      `;
      toolList.appendChild(a);
    });
  }

  // ── Events ─────────────────────────────────────────────────────────
  searchInput.addEventListener("input", renderTools);

  // ── Init ───────────────────────────────────────────────────────────
  renderCategories();
  renderTools();
})();

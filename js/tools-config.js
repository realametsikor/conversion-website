/**
 * tools-config.js
 * Centralized configuration for all platform tools.
 * Add new tools here to automatically generate their pages.
 */
const toolsConfig = {
    // --- IMAGE TOOLS ---
    "resize-image": {
        id: "resize-image",
        name: "Resize Image",
        category: "Image Tools",
        categoryPath: "/image-tools",
        seoTitle: "Free Resize Image Online - Fast & Secure",
        seoDesc: "Change the dimensions of your images quickly right in your browser.",
        icon: "🖼️",
        instructions: [
            "Upload your JPG, PNG, or WebP file.",
            "Enter your desired width or height.",
            "Click resize to instantly download your new image."
        ],
        script: "/js/resize-image.js",
        workspaceHtml: `
            <div id="drop-zone" style="text-align: center;">
                <input type="file" id="file-input" accept="image/*" style="display: none;">
                <label for="file-input" class="btn btn-primary" style="margin-bottom: 1.5rem;">Select Image</label>
                
                <div id="resize-controls" style="display: none; margin-top: 1rem;">
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 1rem;">
                        <div>
                            <label style="display:block; font-size:0.875rem;">Width (px)</label>
                            <input type="number" id="resize-width" style="padding: 0.5rem; width: 100px;">
                        </div>
                        <div>
                            <label style="display:block; font-size:0.875rem;">Height (px)</label>
                            <input type="number" id="resize-height" style="padding: 0.5rem; width: 100px;">
                        </div>
                    </div>
                    <button id="apply-resize" class="btn btn-accent">Download Resized Image</button>
                </div>
            </div>
        `
    },
    "image-compressor": {
        id: "image-compressor",
        name: "Compress Image",
        category: "Image Tools",
        categoryPath: "/image-tools",
        seoTitle: "Free Image Compressor Online - Fast & Secure",
        seoDesc: "Compress JPG, PNG, and WebP images quickly without losing quality.",
        icon: "🖼️",
        instructions: [
            "Upload your JPG, PNG, or WebP file using the button above.",
            "Wait for the client-side processor to reduce the file size.",
            "Click download to save your optimized image."
        ],
        script: "/js/image-compressor.js",
        workspaceHtml: `
            <div id="drop-zone" style="text-align: center;">
                <div class="card-icon" style="font-size: 3rem;">🖼️</div>
                <h3>Drag & Drop your Image here</h3>
                <p>or</p>
                <input type="file" id="file-input" accept="image/png, image/jpeg, image/webp" style="display: none;">
                <label for="file-input" class="btn btn-primary" style="margin-top: 1rem;">Select Image</label>
                <div id="output-area" style="display: none; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border);"></div>
            </div>
        `
    },
    "jpg-to-png": {
        id: "jpg-to-png",
        name: "JPG to PNG Converter",
        category: "Image Tools",
        categoryPath: "/image-tools",
        seoTitle: "Free JPG to PNG Converter Online - Fast & Secure",
        seoDesc: "Convert JPG images to PNG format instantly right in your browser.",
        icon: "🖼️",
        instructions: [
            "Upload your JPG image.",
            "Our client-side tool instantly converts the format.",
            "Download your new PNG file."
        ],
        script: "/js/jpg-to-png.js",
        workspaceHtml: `
            <div id="drop-zone" style="text-align: center;">
                <div class="card-icon" style="font-size: 3rem;">🖼️</div>
                <h3>Choose a JPG Image</h3>
                <input type="file" id="file-input" accept="image/jpeg, image/jpg" style="display: none;">
                <label for="file-input" class="btn btn-primary" style="margin-top: 1rem; padding: 1rem 2rem;">Select JPG File</label>
                <div id="output-area" style="display: none; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border);"></div>
            </div>
        `
    },

    // --- FILE TOOLS ---
    "pdf-to-word": {
        id: "pdf-to-word",
        name: "PDF to Word Converter",
        category: "File Tools",
        categoryPath: "/file-tools",
        seoTitle: "Free PDF to Word Converter Online - Fast & Secure",
        seoDesc: "Turn your PDF files into easy-to-edit Word documents.",
        icon: "📄",
        instructions: [
            "Click the Select PDF File button or drag and drop your file into the box.",
            "Wait a few seconds while our tool converts your PDF to DOCX format.",
            "Click the download button to save your new editable Word document."
        ],
        script: "/js/pdf-to-word.js",
        workspaceHtml: `
            <div id="drop-zone" style="text-align: center;">
                <div class="card-icon" style="font-size: 3rem;">📄</div>
                <h3>Choose a PDF file</h3>
                <p style="margin-bottom: 1.5rem;">or drag & drop it here</p>
                <input type="file" id="file-input" accept="application/pdf" style="display: none;">
                <label for="file-input" class="btn btn-primary" style="font-size: 1.1rem; padding: 1rem 2rem;">Select PDF File</label>
                <div id="output-area" style="display: none; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border);"></div>
            </div>
        `
    },
    "word-to-pdf": {
        id: "word-to-pdf",
        name: "Word to PDF Converter",
        category: "File Tools",
        categoryPath: "/file-tools",
        seoTitle: "Free Word to PDF Converter Online - Fast & Secure",
        seoDesc: "Turn your DOCX files into secure PDF documents instantly.",
        icon: "📄",
        instructions: [
            "Select your Word document.",
            "Wait while we convert it to PDF format.",
            "Download your new PDF."
        ],
        script: "/js/mock-file-tool.js",
        workspaceHtml: `
            <div id="drop-zone" style="text-align: center;">
                <div class="card-icon" style="font-size: 3rem;">📄</div>
                <h3>Choose a Word file</h3>
                <input type="file" id="file-input" accept=".doc,.docx" style="display: none;">
                <label for="file-input" class="btn btn-primary" style="margin-top: 1rem; padding: 1rem 2rem;">Select Word File</label>
                <div id="output-area" style="display: none; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border);"></div>
            </div>
        `
    },
    "merge-pdf": {
        id: "merge-pdf",
        name: "Merge PDF",
        category: "File Tools",
        categoryPath: "/file-tools",
        seoTitle: "Free Merge PDF Files Online - Fast & Secure",
        seoDesc: "Combine multiple PDF files into a single document easily.",
        icon: "📄",
        instructions: [
            "Select multiple PDF files.",
            "Arrange them in your desired order.",
            "Click merge and download your single PDF."
        ],
        script: "/js/mock-file-tool.js",
        workspaceHtml: `
            <div id="drop-zone" style="text-align: center;">
                <div class="card-icon" style="font-size: 3rem;">📄</div>
                <h3>Choose PDF files to merge</h3>
                <input type="file" id="file-input" accept="application/pdf" multiple style="display: none;">
                <label for="file-input" class="btn btn-primary" style="margin-top: 1rem; padding: 1rem 2rem;">Select PDF Files</label>
                <div id="output-area" style="display: none; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border);"></div>
            </div>
        `
    },
    "split-pdf": {
        id: "split-pdf",
        name: "Split PDF",
        category: "File Tools",
        categoryPath: "/file-tools",
        seoTitle: "Free Split PDF Online - Fast & Secure",
        seoDesc: "Extract pages from your PDF or split it into multiple separate files.",
        icon: "📄",
        instructions: [
            "Upload your PDF file.",
            "Select the pages you want to extract or split.",
            "Download your new PDF files."
        ],
        script: "/js/mock-file-tool.js",
        workspaceHtml: `
            <div id="drop-zone" style="text-align: center;">
                <div class="card-icon" style="font-size: 3rem;">✂️</div>
                <h3>Choose a PDF to split</h3>
                <input type="file" id="file-input" accept="application/pdf" style="display: none;">
                <label for="file-input" class="btn btn-primary" style="margin-top: 1rem; padding: 1rem 2rem;">Select PDF File</label>
                <div id="output-area" style="display: none; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border);"></div>
            </div>
        `
    },
    "compress-pdf": {
        id: "compress-pdf",
        name: "Compress PDF",
        category: "File Tools",
        categoryPath: "/file-tools",
        seoTitle: "Free Compress PDF Online - Fast & Secure",
        seoDesc: "Reduce the file size of your PDF documents while maintaining quality.",
        icon: "📄",
        instructions: [
            "Upload your heavy PDF.",
            "Wait for our tool to shrink the file size.",
            "Download your compressed PDF."
        ],
        script: "/js/mock-file-tool.js",
        workspaceHtml: `
            <div id="drop-zone" style="text-align: center;">
                <div class="card-icon" style="font-size: 3rem;">🗜️</div>
                <h3>Choose a PDF to compress</h3>
                <input type="file" id="file-input" accept="application/pdf" style="display: none;">
                <label for="file-input" class="btn btn-primary" style="margin-top: 1rem; padding: 1rem 2rem;">Select PDF File</label>
                <div id="output-area" style="display: none; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border);"></div>
            </div>
        `
    },
    "mp4-to-mp3": {
        id: "mp4-to-mp3",
        name: "MP4 to MP3 Converter",
        category: "File Tools",
        categoryPath: "/file-tools",
        seoTitle: "Free MP4 to MP3 Converter Online - Fast & Secure",
        seoDesc: "Extract high-quality audio from your video files instantly.",
        icon: "🎵",
        instructions: [
            "Select your MP4 video file.",
            "Wait while the audio is extracted.",
            "Download your MP3 audio file."
        ],
        script: "/js/mock-file-tool.js",
        workspaceHtml: `
            <div id="drop-zone" style="text-align: center;">
                <div class="card-icon" style="font-size: 3rem;">🎥</div>
                <h3>Choose an MP4 Video</h3>
                <input type="file" id="file-input" accept="video/mp4" style="display: none;">
                <label for="file-input" class="btn btn-primary" style="margin-top: 1rem; padding: 1rem 2rem;">Select MP4 File</label>
                <div id="output-area" style="display: none; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border);"></div>
            </div>
        `
    },

    // --- CALCULATORS ---
    "gpa-calculator": {
        id: "gpa-calculator",
        name: "GPA Calculator",
        category: "Calculators",
        categoryPath: "/calculators",
        seoTitle: "Free GPA Calculator Online - Fast & Secure",
        seoDesc: "Calculate your college or high school GPA instantly and for free.",
        icon: "🧮",
        instructions: [
            "Enter your courses along with their corresponding credit hours.",
            "Select the letter grade you received for each course.",
            "Click 'Calculate GPA' to see your result instantly."
        ],
        script: "/js/gpa-calculator.js",
        workspaceHtml: `
            <div style="text-align: left; padding: 0;">
                <div id="course-list">
                    <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                        <input type="text" placeholder="Course Name" style="flex: 2; padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <input type="number" class="credit" placeholder="Credits" style="flex: 1; padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <select class="grade" style="flex: 1; padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
                            <option value="">Grade</option>
                            <option value="4.0">A</option><option value="3.0">B</option><option value="2.0">C</option><option value="1.0">D</option><option value="0.0">F</option>
                        </select>
                    </div>
                    <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                        <input type="text" placeholder="Course Name" style="flex: 2; padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <input type="number" class="credit" placeholder="Credits" style="flex: 1; padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <select class="grade" style="flex: 1; padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
                            <option value="">Grade</option>
                            <option value="4.0">A</option><option value="3.0">B</option><option value="2.0">C</option><option value="1.0">D</option><option value="0.0">F</option>
                        </select>
                    </div>
                </div>
                <div style="margin-top: 1.5rem; text-align: center;">
                    <button id="calc-btn" class="btn btn-primary" style="width: 100%; font-size: 1.1rem; padding: 1rem;">Calculate GPA</button>
                    <h2 id="gpa-result" style="margin-top: 1.5rem; color: var(--primary);">Your GPA: 0.00</h2>
                </div>
            </div>
        `
    },
    "loan-calculator": {
        id: "loan-calculator",
        name: "Loan Calculator",
        category: "Calculators",
        categoryPath: "/calculators",
        seoTitle: "Free Loan & Mortgage Calculator Online - Fast & Secure",
        seoDesc: "Estimate your monthly payments and total interest instantly.",
        icon: "🧮",
        instructions: [
            "Enter the total amount you plan to borrow.",
            "Enter the annual interest rate provided by your lender.",
            "Enter the number of years you have to pay back the loan.",
            "Click calculate to see your estimated monthly payments and total costs."
        ],
        script: "/js/loan-calculator.js",
        workspaceHtml: `
            <div style="text-align: left; padding: 0;">
                <form id="loan-form">
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; font-weight: 500; margin-bottom: 0.5rem;">Loan Amount ($)</label>
                        <input type="number" id="amount" placeholder="e.g., 50000" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; font-weight: 500; margin-bottom: 0.5rem;">Annual Interest Rate (%)</label>
                        <input type="number" id="interest" step="0.01" placeholder="e.g., 5.5" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; font-weight: 500; margin-bottom: 0.5rem;">Loan Term (Years)</label>
                        <input type="number" id="years" placeholder="e.g., 15" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; font-size: 1.1rem; padding: 1rem;">Calculate Payments</button>
                </form>
                <div id="results" style="display: none; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border);">
                    <h3 style="margin-bottom: 1rem;">Results</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div style="background: var(--bg-color); padding: 1rem; border-radius: var(--radius);">
                            <p style="margin-bottom: 0; font-size: 0.875rem;">Monthly Payment</p>
                            <strong id="monthly-payment" style="font-size: 1.5rem; color: var(--primary);">-</strong>
                        </div>
                        <div style="background: var(--bg-color); padding: 1rem; border-radius: var(--radius);">
                            <p style="margin-bottom: 0; font-size: 0.875rem;">Total Interest</p>
                            <strong id="total-interest" style="font-size: 1.5rem; color: var(--accent);">-</strong>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // --- STUDENT TOOLS ---
    "study-timer": {
        id: "study-timer",
        name: "Study Timer",
        category: "Student Tools",
        categoryPath: "/student-tools",
        seoTitle: "Free Study Timer Online - Focus & Break Cycles",
        seoDesc: "Run focused study sessions with quick start timers and break reminders.",
        icon: "⏱️",
        instructions: [
            "Pick a focus length and break length.",
            "Start the timer to begin a study session.",
            "Pause or reset anytime and track your completed rounds."
        ],
        script: "/js/study-timer.js",
        workspaceHtml: `
            <div style="text-align: center;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem;">
                    <div>
                        <label style="display:block; font-weight: 600; margin-bottom: 0.5rem;">Focus (minutes)</label>
                        <input id="focus-minutes" type="number" min="5" max="120" value="25" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
                    </div>
                    <div>
                        <label style="display:block; font-weight: 600; margin-bottom: 0.5rem;">Break (minutes)</label>
                        <input id="break-minutes" type="number" min="5" max="60" value="5" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
                    </div>
                </div>
                <div style="margin-top: 1.5rem;">
                    <h2 id="timer-display" style="font-size: 2.5rem; margin-bottom: 1rem;">25:00</h2>
                    <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
                        <button id="timer-start" class="btn btn-primary">Start</button>
                        <button id="timer-pause" class="btn btn-ghost">Pause</button>
                        <button id="timer-reset" class="btn btn-ghost">Reset</button>
                    </div>
                    <p id="timer-status" style="margin-top: 1rem; color: var(--muted);">Ready to focus.</p>
                </div>
            </div>
        `
    },

    // --- AI TOOLS ---
    "text-summarizer": {
        id: "text-summarizer",
        name: "AI Text Summarizer",
        category: "AI Tools",
        categoryPath: "/ai-tools",
        seoTitle: "Free AI Text Summarizer Online - Instant Key Points",
        seoDesc: "Generate a short, readable summary from long text in seconds.",
        icon: "🤖",
        instructions: [
            "Paste or type your text into the box.",
            "Choose how many sentences you want in the summary.",
            "Click summarize to generate concise key points."
        ],
        script: "/js/text-summarizer.js",
        workspaceHtml: `
            <div style="display: grid; gap: 1rem;">
                <label style="font-weight: 600;">Paste your text</label>
                <textarea id="summary-input" rows="8" placeholder="Add your text here..." style="width: 100%; padding: 1rem; border-radius: var(--radius); border: 1px solid var(--border); font-family: inherit;"></textarea>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
                    <label style="font-weight: 600;">Summary length</label>
                    <select id="summary-length" style="padding: 0.6rem 0.8rem; border-radius: 999px; border: 1px solid var(--border);">
                        <option value="2">2 sentences</option>
                        <option value="3" selected>3 sentences</option>
                        <option value="4">4 sentences</option>
                    </select>
                    <button id="summary-btn" class="btn btn-primary">Summarize</button>
                </div>
                <div id="summary-output" class="highlight-box">Your summary will appear here.</div>
            </div>
        `
    }
};

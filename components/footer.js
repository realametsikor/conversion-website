/* Reusable footer component - ultra-modern premium update */
function renderFooter() {
    var footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4 style="display: flex; align-items: center; gap: 0.5rem; font-size: 1.25rem; color: var(--primary); font-weight: 800; letter-spacing: -0.02em;">
                        <i data-lucide="layers" width="24" height="24"></i> ToolsNest
                    </h4>
                    <p>Free online tools for files, images, calculations, and more. Fast, secure, and no signup required.</p>
                    <p style="margin-top:1.25rem; font-size:0.85rem; display: flex; align-items: center; gap: 0.4rem; color: var(--text-muted); font-weight: 500;">
                        <i data-lucide="shield-check" width="16" height="16" color="var(--accent)"></i> 
                        100% Client-Side Processing.
                    </p>
                </div>
                <div class="footer-col">
                    <h4>Categories</h4>
                    <a href="/file-tools">File Tools</a>
                    <a href="/image-tools">Image Tools</a>
                    <a href="/calculators">Calculators</a>
                    <a href="/ai-tools">AI Tools</a>
                    <a href="/student-tools">Student Tools</a>
                    <a href="/all-tools">All Tools</a>
                </div>
                <div class="footer-col">
                    <h4>Popular Tools</h4>
                    <a href="/file-tools/pdf-to-word">PDF to Word</a>
                    <a href="/image-tools/image-compressor">Compress Image</a>
                    <a href="/calculators/percentage-calculator">Percentage Calculator</a>
                    <a href="/file-tools/compress-pdf">Compress PDF</a>
                    <a href="/ai-tools/text-summarizer">Text Summarizer</a>
                    <a href="/image-tools/qr-code-generator">QR Code Generator</a>
                    <a href="/file-tools/jpg-to-png">JPG to PNG</a>
                    <a href="/calculators/loan-calculator">Loan Calculator</a>
                </div>
                <div class="footer-col">
                    <h4>Company</h4>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/blog">Blog</a>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                </div>
            </div>
            <div class="footer-bottom" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
                <div>
                    &copy; ${new Date().getFullYear()} ToolsNest. All rights reserved.
                </div>
                <div style="display: flex; gap: 1.5rem; align-items: center;">
                    <a href="/privacy-policy" style="color:var(--text-muted); text-decoration: none; transition: color 0.2s;">Privacy</a> 
                    <a href="/terms" style="color:var(--text-muted); text-decoration: none; transition: color 0.2s;">Terms</a>
                    <span style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.8rem; margin-left: 0.5rem; padding-left: 1.5rem; border-left: 1px solid var(--border);">
                        Made with <i data-lucide="heart" width="14" height="14" color="#ef4444" fill="#ef4444"></i>
                    </span>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(footer);
    
    // Initialize Lucide icons specifically for the newly injected footer elements
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
renderFooter();

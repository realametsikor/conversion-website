/* Reusable footer component - enhanced with internal linking */
function renderFooter() {
    var footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>ToolsNest</h4>
                    <p>Free online tools for files, images, calculations, and more. Fast, secure, and no signup required.</p>
                    <p style="margin-top:1rem;font-size:0.8rem;">Process everything in your browser. Your files never leave your device.</p>
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
            <div class="footer-bottom">
                &copy; ${new Date().getFullYear()} ToolsNest. All rights reserved. | <a href="/privacy-policy" style="color:var(--text-muted);">Privacy</a> | <a href="/terms" style="color:var(--text-muted);">Terms</a>
            </div>
        </div>
    `;
    document.body.appendChild(footer);
}
renderFooter();

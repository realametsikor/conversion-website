/* Reusable footer component */
function renderFooter() {
    var footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>ToolsNest</h4>
                    <p>Free online tools for files, images, calculations, and more. Fast, secure, and no signup required.</p>
                </div>
                <div class="footer-col">
                    <h4>Categories</h4>
                    <a href="/file-tools">File Tools</a>
                    <a href="/image-tools">Image Tools</a>
                    <a href="/calculators">Calculators</a>
                    <a href="/ai-tools">AI Tools</a>
                    <a href="/student-tools">Student Tools</a>
                </div>
                <div class="footer-col">
                    <h4>Popular Tools</h4>
                    <a href="/file-tools/pdf-to-word">PDF to Word</a>
                    <a href="/image-tools/image-compressor">Compress Image</a>
                    <a href="/calculators/loan-calculator">Loan Calculator</a>
                    <a href="/file-tools/jpg-to-png">JPG to PNG</a>
                </div>
                <div class="footer-col">
                    <h4>Company</h4>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                </div>
            </div>
            <div class="footer-bottom">
                &copy; ${new Date().getFullYear()} ToolsNest. All rights reserved.
            </div>
        </div>
    `;
    document.body.appendChild(footer);
}
renderFooter();

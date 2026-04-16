/* Reusable header component - single bar with smart back arrow */
function renderHeader() {
    const header = document.createElement('header');
    header.className = 'header';
    
    // Check if the user is on the homepage
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
    
    // Create the back arrow HTML conditionally
    const backArrowHTML = isHomePage 
        ? '' // Don't show the back arrow on the homepage
        : `<a href="/" aria-label="Go back to home" style="color: var(--text-muted); display: flex; align-items: center; transition: color 0.2s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">
                <i data-lucide="arrow-left" width="22" height="22"></i>
           </a>`;

    header.innerHTML = `
        <div class="container" style="display: flex; align-items: center; justify-content: space-between;">
            <div class="logo" style="display: flex; align-items: center; gap: 1rem;">
                ${backArrowHTML}
                <a href="/" style="display: flex; align-items: center; gap: 0.5rem;">
                    <i data-lucide="layers" color="var(--primary)" width="26" height="26"></i> ToolsNest
                </a>
            </div>
            <nav class="nav-links">
                <a href="/file-tools">File Tools</a>
                <a href="/image-tools">Image Tools</a>
                <a href="/calculators">Calculators</a>
                <a href="/ai-tools">AI Tools</a>
                <a href="/student-tools">Student Tools</a>
                <a href="/all-tools">All Tools</a>
                <a href="/blog">Blog</a>
            </nav>
            <div class="search-nav" style="position: relative;">
                <i data-lucide="search" width="16" height="16" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none;"></i>
                <input type="text" placeholder="Search tools..." id="nav-search" style="padding-left: 2.5rem;">
            </div>
            <button class="mobile-menu-btn" aria-label="Toggle menu" style="display: flex; align-items: center; justify-content: center;">
                <i data-lucide="menu" width="24" height="24"></i>
            </button>
        </div>
    `;
    
    document.body.insertBefore(header, document.body.firstChild);

    /* Mobile menu toggle */
    const btn = header.querySelector('.mobile-menu-btn');
    const nav = header.querySelector('.nav-links');
    if (btn && nav) {
        btn.addEventListener('click', function () {
            nav.classList.toggle('active');
            
            // Swap Lucide icons based on menu state
            if (nav.classList.contains('active')) {
                btn.innerHTML = '<i data-lucide="x" width="24" height="24"></i>';
            } else {
                btn.innerHTML = '<i data-lucide="menu" width="24" height="24"></i>';
            }
            
            // Re-initialize the specific newly injected icon
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    }

    /* Sticky shadow on scroll */
    window.addEventListener('scroll', function () {
        header.style.boxShadow = window.scrollY > 10
            ? '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)'
            : 'none';
        header.style.borderColor = window.scrollY > 10 
            ? 'transparent' 
            : 'var(--border)';
    });

    /* Search redirect */
    var searchInput = header.querySelector('#nav-search');
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                var q = searchInput.value.trim();
                if (q) window.location.href = '/all-tools?q=' + encodeURIComponent(q);
            }
        });
    }
    
    // Initialize icons for the newly injected header elements
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
renderHeader();

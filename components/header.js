/* Reusable header component - injects sticky header into any page */
function renderHeader() {
    const header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = `
        <div class="container">
            <div class="logo"><a href="/">ToolsNest</a></div>
            <nav class="nav-links">
                <a href="/file-tools">File Tools</a>
                <a href="/image-tools">Image Tools</a>
                <a href="/calculators">Calculators</a>
                <a href="/ai-tools">AI Tools</a>
                <a href="/all-tools">All Tools</a>
                <a href="/blog">Blog</a>
            </nav>
            <div class="search-nav">
                <input type="text" placeholder="Search tools..." id="nav-search">
            </div>
            <button class="mobile-menu-btn" aria-label="Toggle menu">&#9776;</button>
        </div>
    `;
    document.body.insertBefore(header, document.body.firstChild);

    /* Mobile menu toggle */
    const btn = header.querySelector('.mobile-menu-btn');
    const nav = header.querySelector('.nav-links');
    if (btn && nav) {
        btn.addEventListener('click', function () {
            nav.classList.toggle('active');
            btn.innerHTML = nav.classList.contains('active') ? '&#10005;' : '&#9776;';
        });
    }

    /* Sticky shadow on scroll */
    window.addEventListener('scroll', function () {
        header.style.boxShadow = window.scrollY > 10
            ? '0 4px 6px -1px rgba(0,0,0,0.05)'
            : 'none';
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
}
renderHeader();

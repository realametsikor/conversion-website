document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBILE NAVIGATION MENU ---
    const initMobileMenu = () => {
        const headerContainer = document.querySelector('.header .container');
        const navLinks = document.querySelector('.nav-links');
        
        if (!headerContainer || !navLinks) return;

        const mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = '☰'; 
        mobileBtn.setAttribute('aria-label', 'Toggle mobile menu');
        
        headerContainer.appendChild(mobileBtn);

        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    };

    // --- 2. STICKY HEADER ENHANCEMENT ---
    const initStickyHeader = () => {
        const header = document.querySelector('.header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    };

    // --- 3. GLOBAL SEARCH FUNCTIONALITY ---
    const initSearch = () => {
        const searchInputs = document.querySelectorAll('input[placeholder*="Search"], input[placeholder*="What do you want to do"]');
        
        searchInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const query = input.value.trim().toLowerCase();
                    
                    if (query) {
                        alert(`Search triggered for: "${query}". \nThis will route to your search results page once built.`);
                        input.value = ''; 
                    }
                }
            });
        });
    };

    initMobileMenu();
    initStickyHeader();
    initSearch();
});

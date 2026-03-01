/* main.js - Global search functionality for all pages */
document.addEventListener('DOMContentLoaded', function () {
    /* Hero search on homepage */
    var heroSearch = document.querySelector('.hero-search input');
    if (heroSearch) {
        heroSearch.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                var q = heroSearch.value.trim();
                if (q) window.location.href = '/all-tools?q=' + encodeURIComponent(q);
            }
        });
        var heroBtn = document.querySelector('.hero-search .btn');
        if (heroBtn) {
            heroBtn.addEventListener('click', function () {
                var q = heroSearch.value.trim();
                if (q) window.location.href = '/all-tools?q=' + encodeURIComponent(q);
            });
        }
    }
});

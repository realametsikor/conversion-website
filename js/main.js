document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav-links');
    const toggle = document.querySelector('.mobile-toggle');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            toggle.setAttribute('aria-expanded', nav.classList.contains('active'));
        });
    }

    const searchForms = document.querySelectorAll('[data-search-form]');
    searchForms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const input = form.querySelector('input');
            if (!input) return;
            const query = input.value.trim();
            if (!query) return;
            window.location.href = `/all-tools.html?q=${encodeURIComponent(query)}`;
        });
    });
});

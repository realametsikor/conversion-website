document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.blog-faq-q').forEach(function(btn) {
    btn.addEventListener('click', function() {
      this.closest('.blog-faq-item').classList.toggle('open');
    });
  });
});

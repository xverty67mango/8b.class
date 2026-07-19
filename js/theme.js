// ============================================================
// СМЕНА ТЕМЫ
// ============================================================
(function() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    toggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
})();
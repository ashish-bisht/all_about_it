
// ========================================
// Theme Toggle (Light/Dark Mode)
// ========================================
(function initTheme() {
    const savedTheme = localStorage.getItem('principal_theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    // Wait for DOM to attach listener
    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        // Update icon based on current mode
        const updateIcon = () => {
            const icon = toggle.querySelector('i');
            if (document.body.classList.contains('light-mode')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        };
        updateIcon();

        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('principal_theme', isLight ? 'light' : 'dark');
            updateIcon();
        });
    });
})();

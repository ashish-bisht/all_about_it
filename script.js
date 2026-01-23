
// Simple Logic to track Done status across pages
document.addEventListener('DOMContentLoaded', () => {
    const solved = JSON.parse(localStorage.getItem('principal_solved') || '[]');

    // Update Checkboxes
    document.querySelectorAll('.q-check').forEach(box => {
        const id = box.dataset.id;
        if (solved.includes(id)) {
            box.checked = true;
            box.closest('.flashcard').classList.add('done');
        }

        box.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            const qId = e.target.dataset.id;
            let currentSolved = JSON.parse(localStorage.getItem('principal_solved') || '[]');

            if (isChecked) {
                if (!currentSolved.includes(qId)) currentSolved.push(qId);
                e.target.closest('.flashcard').classList.add('done');
            } else {
                currentSolved = currentSolved.filter(x => x !== qId);
                e.target.closest('.flashcard').classList.remove('done');
            }

            localStorage.setItem('principal_solved', JSON.stringify(currentSolved));
            updateProgress();
        });
    });

    updateProgress();
});

function updateProgress() {
    const total = document.querySelectorAll('.q-check').length;
    if (total === 0) return;
    const checked = document.querySelectorAll('.q-check:checked').length;
    const pct = Math.round((checked / total) * 100);

    const bar = document.getElementById('progress-fill');
    const txt = document.getElementById('progress-text');
    if (bar) bar.style.width = pct + "%";
    if (txt) txt.innerText = checked + "/" + total + " Done";
}

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

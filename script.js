
// Simple Logic to track Done status across pages
document.addEventListener('DOMContentLoaded', () => {
    const solved = JSON.parse(localStorage.getItem('principal_solved') || '[]');
    
    // Update Checkboxes
    document.querySelectorAll('.q-check').forEach(box => {
        const id = box.dataset.id;
        if(solved.includes(id)) {
            box.checked = true;
            box.closest('.flashcard').classList.add('done');
        }
        
        box.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            const qId = e.target.dataset.id;
            let currentSolved = JSON.parse(localStorage.getItem('principal_solved') || '[]');
            
            if(isChecked) {
                if(!currentSolved.includes(qId)) currentSolved.push(qId);
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
    if(total === 0) return;
    const checked = document.querySelectorAll('.q-check:checked').length;
    const pct = Math.round((checked/total)*100);
    
    const bar = document.getElementById('progress-fill');
    const txt = document.getElementById('progress-text');
    if(bar) bar.style.width = pct + "%";
    if(txt) txt.innerText = checked + "/" + total + " Done";
}

// ============================================================
// ПОИСК ПО СЛОВАРЮ
// ============================================================
(function() {
    const searchInput = document.getElementById('tagSearchDict');
    const searchBtn = document.getElementById('searchDictBtn');
    const resetBtn = document.getElementById('resetDictBtn');

    if (!searchInput) {
        console.log('Поиск в словаре не найден');
        return;
    }

    const terms = document.querySelectorAll('.term');
    const definitions = document.querySelectorAll('.definition');

    function filterDictionary() {
        const query = searchInput.value.toLowerCase().trim();

        terms.forEach((term, index) => {
            const termText = term.textContent.toLowerCase();
            const defText = definitions[index] ? definitions[index].textContent.toLowerCase() : '';

            if (query === '' || termText.includes(query) || defText.includes(query)) {
                term.style.display = 'block';
                if (definitions[index]) definitions[index].style.display = 'block';
            } else {
                term.style.display = 'none';
                if (definitions[index]) definitions[index].style.display = 'none';
            }
        });
    }

    if (tagSearchDict) searchBtn.addEventListener('click', filterDictionary);
    searchInput.addEventListener('keyup', e => { if (e.key === 'Enter') filterDictionary(); });

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            searchInput.value = '';
            terms.forEach((term, index) => {
                term.style.display = 'block';
                if (definitions[index]) definitions[index].style.display = 'block';
            });
        });
    }

    console.log('Поиск в словаре инициализирован');
})();
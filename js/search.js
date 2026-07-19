// ============================================================
// ПОИСК ПО ТЕГАМ (Fuse.js + синонимы)
// ============================================================
(function() {
    // ===== ПОДКЛЮЧАЕМ Fuse.js =====
    if (typeof Fuse === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fuse.js/7.0.0/fuse.min.js';
        document.head.appendChild(script);
    }

    // ===== СИНОНИМЫ =====
    const synonyms = {
        'лера': ['дера', 'лкра', 'оера'],
        'ксюша': ['ксбша', 'кчюша', 'ксюща', 'Ксюша', 'Ксюща', 'Кчюша', 'Ксбша', 'ксша'],
        'даша': ['баша', 'даща', 'дашуля'],
        'рома': ['пома', 'роса', 'Пома'],
        'дима': ['дтма', 'лима', 'Дтма'],
        'платон': ['Платон', 'платн', 'плата'],
        'дюгудюжник': ['дуюгужник', 'дюгждниу', 'дюгуждник'],
        'маша': ['иаша', 'маща', 'Маща', 'мага'],
        'панорама': ['панорамы', 'паронамы', 'паронама', 'панор'],
        'ваня': ['Фокин', 'фока', 'ыаня'],
        'витя': ['ыитя', 'витч', 'виья'],
        'соня': ['чоня', 'моня', 'согя', 'сонч'],
        'алена': ['алёна', 'адена', 'адёна', 'влена', 'влёна'],
        'вита': ['ыита', 'виьа', 'Вита'],
        'герман': ['германия', 'греман', 'ерман'],
        'яна': ['яеа', 'чна', 'буяна'],
        'егор': ['кгор', 'ешор', 'егр'],
        'ирина': ['николаевна', 'иринка', 'директор'],
        'оксана': ['валентиновна', 'оксанка', 'русичка'],
        'ольга': ['михайловна', 'учительница'],
        'географиня': ['географичка', 'богиня'],
        'артем': ['сокол', 'сахаров', 'соколов', 'тема']
    };

    const searchInput = document.getElementById('tagSearch');
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');

    if (!searchInput) {
        console.log('Поиск не найден');
        return;
    }

    const cards = document.querySelectorAll('.card');
    if (cards.length === 0) {
        console.warn('Карточки .card не найдены');
        return;
    }

    // ===== ПОДГОТОВКА ДАННЫХ ДЛЯ FUSE =====
    let cardsData = [];
    cards.forEach(card => {
        const tags = (card.getAttribute('data-tags') || '').toLowerCase();
        cardsData.push({
            element: card,
            tags: tags
        });
    });

    // ===== НАСТРОЙКА FUSE =====
    const fuse = new Fuse(cardsData, {
        keys: ['tags'],
        threshold: 0.2,
        ignoreLocation: true,
        minMatchCharLength: 2
    });

    // ===== ФУНКЦИЯ ПОИСКА =====
    function filterCards() {
        const query = searchInput.value.trim(); // Убираем пробелы по краям

        // Если запрос пустой или только пробелы — показываем всё
        if (query === '') {
            cardsData.forEach(item => {
                item.element.style.display = 'block';
            });
            if (window.pckry) {
                window.pckry.reloadItems();
                window.pckry.layout();
            }
            return;
        }

        const queryWords = query.toLowerCase().split(/\s+/);

        // Расширяем запрос через синонимы
        let expandedWords = [];
        queryWords.forEach(word => {
            expandedWords.push(word);
            if (synonyms[word]) {
                expandedWords = expandedWords.concat(synonyms[word]);
            }
        });
        expandedWords = [...new Set(expandedWords)];

        // Ищем через Fuse.js по каждому слову отдельно
        let foundElements = new Set();
        expandedWords.forEach(word => {
            const results = fuse.search(word);
            results.forEach(result => {
                foundElements.add(result.item.element);
            });
        });

        // Применяем фильтр
        cardsData.forEach(item => {
            item.element.style.display = foundElements.has(item.element) ? 'block' : 'none';
        });

        if (window.pckry) {
            window.pckry.reloadItems();
            window.pckry.layout();
        }
    }

    // ===== БЛОКИРОВКА КНОПКИ, ЕСЛИ ПОЛЕ ПУСТОЕ =====
    function updateSearchButton() {
        const value = searchInput.value.trim();
        if (searchBtn) {
            searchBtn.disabled = value === '';
            searchBtn.style.opacity = value === '' ? '0.5' : '1';
            searchBtn.style.cursor = value === '' ? 'not-allowed' : 'pointer';
        }
    }

    // Проверяем при загрузке
    updateSearchButton();

    // Проверяем при вводе текста
    searchInput.addEventListener('input', updateSearchButton);

    // ===== СОБЫТИЯ =====
    if (searchBtn) {
        searchBtn.addEventListener('click', filterCards);
    }

    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Если поле не пустое — выполняем поиск
            if (searchInput.value.trim() !== '') {
                filterCards();
            }
        }
    });

    if (resetBtn) {
    resetBtn.addEventListener('click', function() {
        location.reload(); // Перезагружаем страницу
    });
}

    console.log('Поиск инициализирован успешно (Fuse.js + синонимы)');
})();
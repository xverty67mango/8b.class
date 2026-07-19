// ============================================================
// MASONRY ДЛЯ ТЕЛЕФОНА (лента на весь экран)
// ============================================================
(function() {
    // Проверяем, что это телефон (ширина <= 768px)
    if (window.innerWidth > 768) {
        return; // Не запускаем на ПК
    }

    const grid = document.querySelector('.gallery');
    if (!grid) {
        console.warn('Контейнер .gallery не найден');
        return;
    }

    // === ПРИНУДИТЕЛЬНО ДЕЛАЕМ ЛЕНТУ ===
    // Убираем все стили, которые могут мешать
    grid.style.display = 'flex';
    grid.style.flexDirection = 'column';
    grid.style.alignItems = 'center';
    grid.style.width = '100%';
    grid.style.padding = '0 10px';
    grid.style.boxSizing = 'border-box';
    grid.style.gap = '16px';

    // Применяем стили к каждой карточке
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.width = '100%';
        card.style.maxWidth = '100%';
        card.style.margin = '0';
        card.style.padding = '12px';
        card.style.boxSizing = 'border-box';
    });

    // Картинки и видео внутри карточек
    const media = document.querySelectorAll('.card img, .card video');
    media.forEach(el => {
        el.style.width = '100%';
        el.style.height = 'auto';
        el.style.display = 'block';
        el.style.borderRadius = '12px';
    });

    console.log('Masonry-мобилка: лента на весь экран');
})();
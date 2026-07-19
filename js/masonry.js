// ============================================================
// PACKERY (кирпичная сетка)
// ============================================================
(function() {
    // Проверяем, загружена ли библиотека Packery
    if (typeof Packery === 'undefined') {
        console.warn('Packery не загружен, пропускаем инициализацию');
        return;
    }

    const grid = document.querySelector('.gallery');
    if (!grid) {
        console.warn('Контейнер .gallery не найден');
        return;
    }

    // Сохраняем экземпляр в глобальную переменную, чтобы другие скрипты могли его использовать
    window.pckry = new Packery(grid, {
        itemSelector: '.card',
        columnWidth: 280,
        gutter: 20,
        fitWidth: true,
        horizontalOrder: true
    });

    // Перестраиваем после загрузки видео
    document.querySelectorAll('.card video').forEach(video => {
        video.addEventListener('loadedmetadata', function() {
            if (window.pckry) {
                window.pckry.reloadItems();
                window.pckry.layout();
            }
        });
    });

    // Перестраиваем после полной загрузки страницы
    window.addEventListener('load', function() {
        if (window.pckry) {
            window.pckry.reloadItems();
            window.pckry.layout();
        }
    });

    console.log('Packery инициализирован успешно');
})();
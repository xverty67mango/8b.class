(function() {
    if (window.innerWidth <= 768) {
        const grid = document.querySelector('.gallery');
        if (grid) {
            const msnry = new Masonry(grid, {
                itemSelector: '.card',
                columnWidth: function() {
                    // Вычисляем ширину колонки: 50% от ширины контейнера минус половина отступа
                    const containerWidth = grid.offsetWidth;
                    const gutter = 12; // Расстояние между колонками
                    return (containerWidth - gutter) / 2;
                },
                gutter: 12
            });
        }
    }
})();
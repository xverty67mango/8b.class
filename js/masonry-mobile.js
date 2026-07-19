(function() {
    if (window.innerWidth <= 768) {
        const grid = document.querySelector('.gallery');
        if (grid) {
            const msnry = new Masonry(grid, {
                itemSelector: '.card',
                columnWidth: '50%',
                gutter: 12
            });
        }
    }
})();
// ============================================================
// ЛАЙТБОКС
// ============================================================
(function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    // Открытие лайтбокса
    window.openLightbox = function(src) {
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    // Закрытие лайтбокса
    window.closeLightbox = function() {
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    // Делегирование: клик по любой картинке в галерее
    document.addEventListener('click', function(e) {
        const img = e.target.closest('.card img, [data-lightbox]');
        if (img) {
            e.preventDefault();
            window.openLightbox(img.src);
        }
    });

    // Закрытие по фону
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                window.closeLightbox();
            }
        });
    }

    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            window.closeLightbox();
        }
    });
})();
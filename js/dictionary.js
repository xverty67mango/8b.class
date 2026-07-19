// ============================================================
// РЕНДЕРИНГ СЛОВАРЯ
// ============================================================
(function() {
    const container = document.querySelector('.dictionary-list');
    if (!container) {
        console.log('Словарь не найден');
        return;
    }

    // Очищаем контейнер (на случай, если там уже есть статика)
    container.innerHTML = '';

    dictionaryData.forEach(item => {
        // === ТЕРМИН (dt) ===
        const dt = document.createElement('dt');
        dt.className = 'term';
        dt.textContent = item.term;
        container.appendChild(dt);

        // === ОПИСАНИЕ (dd) ===
        const dd = document.createElement('dd');
        dd.className = 'definition';

        // Текст описания (с поддержкой HTML)
        const textSpan = document.createElement('span');
        textSpan.innerHTML = item.definition;
        dd.appendChild(textSpan);

        // === АУДИО (если есть) ===
        if (item.audio) {
            const br = document.createElement('br');
            dd.appendChild(br);

            const audio = document.createElement('audio');
            audio.controls = true;
            audio.className = 'audio-mini';
            audio.setAttribute('playsinline', '');
            audio.setAttribute('controlsList', 'nodownload');
            audio.style.width = '100%';
            audio.style.maxWidth = '300px';

            const source = document.createElement('source');
            source.src = item.audio;
            source.type = 'audio/mpeg';
            audio.appendChild(source);
            dd.appendChild(audio);
        }

        // === КАРТИНКИ (если есть) ===
        if (item.images && item.images.length > 0) {
            item.images.forEach(src => {
                const br = document.createElement('br');
                dd.appendChild(br);

                const img = document.createElement('img');
                img.src = src;
                img.alt = item.term;
                img.className = 'inline-media';
                img.setAttribute('data-lightbox', '');
                dd.appendChild(img);
            });
        }

        // === ВИДЕО (если есть) ===
        if (item.videos && item.videos.length > 0) {
            item.videos.forEach(src => {
                const br = document.createElement('br');
                dd.appendChild(br);

                const video = document.createElement('video');
                video.controls = true;
                video.style.width = '100%';
                video.style.maxWidth = '400px';
                video.style.borderRadius = '12px';
                video.style.marginTop = '10px';

                const source = document.createElement('source');
                source.src = src;
                source.type = 'video/mp4';
                video.appendChild(source);
                dd.appendChild(video);
            });
        }

        container.appendChild(dd);
    });

    console.log('Словарь отрендерен');
})();
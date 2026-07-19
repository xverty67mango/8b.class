console.log("gallery подключился");
const gallery = document.querySelector(".gallery");

media.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.tags = item.tags;

    if (item.type === "image") {
        card.innerHTML = `
            <img src="${item.src}" alt="фото" data-lightbox>
        `;
    } else {
        card.innerHTML = `
            <video controls>
                <source src="${item.src}" type="video/mp4">
            </video>
        `;
    }

    gallery.appendChild(card);
    console.log("Создана карточка", item.src);
});
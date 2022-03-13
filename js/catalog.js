//прописываем главную картинку и картинки thumb к каждому товару
let allProductsImages = document.querySelectorAll('.product-images');
allProductsImages.forEach(function(item) {
    item.children[0].insertAdjacentHTML('afterbegin', `<img src="./img/${item.dataset.id}/1_thumb.jpg" alt="RenBut-${item.dataset.id}">`);
    for (let i = 1; i <= 5; i++) {
        item.children[1].insertAdjacentHTML('beforeend', `<div><img src="./img/${item.dataset.id}/${i}_thumb.jpg" alt="RenBut-${item.dataset.id}-${i}"></div>`);
    }
});

//делаем thumb кликабельными
let allProductsImagesThumbs = document.querySelectorAll('.product-img-thumbs');
allProductsImagesThumbs.forEach(item => {
    item.addEventListener('click', event => {
        item.parentElement.children[0].innerHTML = `<img src="${event.path[0].src}">`;
    });
});
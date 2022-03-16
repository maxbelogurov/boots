let productSizesList = {
    '13-1476-P':  [19, 20, 21, 22, 23, 24],
    '13-1476-Z': [19, 21, 22, 23, 24],
    '13-1447-G': [18, 19, 20, 21, 23],
    '13-1429-SP': [21, 22, 24],
    '13-1423-CG': [20, 21, 22, 23, 24],
    '13-1498-C': [20, 21, 22, 23, 24, 25],
    '13-068-C': [18, 19, 20, 21],
    '13-068-Z': [18, 19, 20, 21, 22, 23],
    '13-1476-GK': [19, 20, 21, 22, 23, 24],
    '13-1442-BA': [18, 19, 20, 21, 22, 23],
    '13-1498-Z': [20, 21, 22, 23, 24],
    '13-1498-SJ': [20, 21, 22, 23, 24, 25],
    '23-3346-P': [26, 27, 28],
    '23-3346-B': [26, 27, 28, 29],
    '23-3237-SPR': [26, 27, 29, 30],
    '23-3236-CP': [26, 27, 28, 29, 30],
    '23-3236-J': [26, 27, 29, 30],
    '23-3236-O': [27, 28, 29, 30],
    '23-3346-GD': [26, 27, 28, 29, 30],
    '23-3346-G': [26, 28, 29],
    '23-3225-PR': [26, 27, 29, 30],
    '23-3225-PZ': [27]
}
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
//делаем слайдшоу в модалке к каждому товару
let productImagesArr = [];
let slideNum;
let nowSlide = document.querySelector('.slide-image');
const prevSlideBtn = document.querySelector('.slide-arrow_prev');
const nextSlideBtn = document.querySelector('.slide-arrow_next');
const images = [];
function preloadImages(arr) { // предзагрузка изображений
    for (let i = 0; i < arr.length; i++) {
        images[i] = new Image();
        images[i].src = arr[i];
    }
};
function writeProductImage(id) { //вставка в массив для пролистывания и отпрвку на предзагрузку
    for(let i = 1; i < 6; i++) {
        productImagesArr.push(`./img/${id}/${i}.jpg`);
    }
    preloadImages(productImagesArr);
}

let prodictImg = document.querySelectorAll('.product-img');
prodictImg.forEach(item => {
    item.addEventListener('click', e => {
        let elementId = e.target.parentElement.parentElement.dataset.id; //определяем id товара через клик по картинки
        productImagesArr = []; //обнуляем массив
        writeProductImage(elementId); //добавляем в массив новые изображения
        nowSlide.innerHTML = `<img src="./img/${elementId}/1.jpg" alt="RenBut-${elementId}">`;// вставляем первое изображение для пролистывания
        slideNum = 0;
    });
});
function prevOrNextSlide(direcrion) {
    if (slideNum === 4 & direcrion === 'next') { slideNum = 0 };
    if (slideNum === 0 & direcrion === 'prev') { slideNum = 4 };
    if (direcrion === 'next') { slideNum++; }
    if (direcrion === 'prev') { slideNum--; }
    return `<img src="${productImagesArr[slideNum]}">`;
}
prevSlideBtn.addEventListener('click', () => { nowSlide.innerHTML = prevOrNextSlide('prev') });
nextSlideBtn.addEventListener('click', () => { nowSlide.innerHTML = prevOrNextSlide('next') });


//проходимся по массиву {артикул:размеры}, сверяем с товаром и вставояем в существующий товар нужные размеры
let productsCard = document.querySelectorAll('.product')
let sizesCard = document.querySelectorAll('.product-size')
productsCard.forEach(function(item, index) {
    for (const key in productSizesList) {
        if(key === item.dataset.id) {
            for (let i = 0; i < productSizesList[key].length; i++) {
                sizesCard[index].insertAdjacentHTML('beforeend', `<div>${productSizesList[key][i]}</div>`)
            }
        }
    }
})
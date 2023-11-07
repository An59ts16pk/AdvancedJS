"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. 
На странице должны отображаться товары, под каждым товаром должен быть список 
отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно
добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.

Каждый отзыв должен иметь уникальное числовое id.

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не 
делать, пока рано.
*/

const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: 1,
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: 2,
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: 3,
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: 4,
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

const reviewsObj = initialData[initialData.length - 1].reviews;
let lastReviewsID = reviewsObj[reviewsObj.length - 1].id;

const appContainer = document.getElementById("app");
const divEl = document.createElement("div");

initialData.forEach((item) => {
    const spanEl = document.createElement("span");
    spanEl.className = "product";

    const inputEl = document.createElement("input");
    inputEl.id = item.product;
    inputEl.type = "radio";
    inputEl.name = "choice";

    const h3El = document.createElement("h3");
    h3El.textContent = item.product;

    const h4El = document.createElement("h4");
    h4El.textContent = "Отзывы о товаре:";

    const ulEl = document.createElement("ul");
    ulEl.className = "listReviews";
    ulEl.id = item.product;
    item.reviews.forEach((txt) => {
        const liEl = document.createElement("li");
        liEl.textContent = txt.text;
        liEl.className = "rev";
        ulEl.append(liEl);
    });

    spanEl.appendChild(inputEl);
    spanEl.appendChild(h3El);
    divEl.appendChild(spanEl);
    divEl.appendChild(h4El);
    divEl.appendChild(ulEl);
});
appContainer.appendChild(divEl);

const addContainer = document.getElementById("add");
const divRevEl = document.createElement("div");
divRevEl.className = "revAdd";

const h2El = document.createElement("h2");
h2El.className = "reviewHeading";
h2El.textContent = "Написать отзыв:";

const infoEl = document.createElement("span");
infoEl.textContent = "Чтобы оставить отзыв, надо выбрать продукт.";

const taEl = document.createElement("textarea");
taEl.className = "textarea";

const infEl = document.createElement("span");
infEl.textContent = "Текст должен иметь не менее 50 знаков, но не более 500";

const btnEl = document.createElement("button");
btnEl.type = "button";
btnEl.className = "checkBtn";
btnEl.textContent = "Оставить отзыв";

const spanErrorEl = document.createElement("span");
spanErrorEl.className = "spanError";
spanErrorEl.textContent = "";

divRevEl.appendChild(h2El);
divRevEl.appendChild(infoEl);
divRevEl.appendChild(taEl);
divRevEl.appendChild(infEl);
divRevEl.appendChild(btnEl);
divRevEl.appendChild(spanErrorEl);

addContainer.appendChild(divRevEl);

renderReviews();

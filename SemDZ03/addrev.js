"use strict";

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

startInitialData(initialData);

const productErrorEl = document.querySelector(".product__error");
const reviewErrorEl = document.querySelector(".review__error");

const btnRevEl = document.querySelector(".addButton");
btnRevEl.addEventListener("click", () => {
    productErrorEl.textContent = "";
    reviewErrorEl.textContent = "";

    const productName = getProductName();
    const reviewText = getReviewText();

    if (productName && reviewText) {
        let newRevID = getReviewMaxID();
        const revObject = {
            id: ++newRevID,
            text: reviewText,
        };
        addReviewInLocalStorage(productName, revObject);
    }
    resetForm();
});

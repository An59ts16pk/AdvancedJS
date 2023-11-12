"use strict";

renderListProducts();

const btnRevShowEl = document.querySelectorAll("#show");

btnRevShowEl.forEach((elem) =>
    elem.addEventListener("click", () => {
        const keyProdEl = elem.previousElementSibling.textContent;
        const listRevProd = JSON.parse(localStorage.getItem(keyProdEl));

        const parentEl = elem.parentElement;
        const ulboxEl = parentEl.nextElementSibling;

        renderListReviews(listRevProd, ulboxEl);

        elem.value = "показываются";
        elem.setAttribute("disabled", true);
        elem.nextElementSibling.value = "скрыть отзывы";
        elem.nextElementSibling.removeAttribute("disabled");

        deleteReview(keyProdEl);
    })
);

const btnRevHideEl = document.querySelectorAll("#hide");

btnRevHideEl.forEach((elem) =>
    elem.addEventListener("click", () => {
        const parentEl = elem.parentElement;
        const ulboxEl = parentEl.nextElementSibling;
        ulboxEl.innerHTML = "";

        elem.value = "скрываются";
        elem.setAttribute("disabled", true);
        elem.previousElementSibling.value = "показать отзывы";
        elem.previousElementSibling.removeAttribute("disabled");
    })
);

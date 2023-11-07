"use strict";

function renderReviews() {
    const btnRevEl = document.querySelector(".checkBtn");
    btnRevEl.addEventListener("click", () => {
        spanErrorEl.textContent = "";
        const productName = getProductName();
        const reviewText = getReviewText();

        if (reviewText) {
            saveNewReview(productName, reviewText);

            const newLi = document.createElement("li");
            newLi.className = "rev";
            newLi.id = productName;
            newLi.textContent = reviewText;
            const findRev = document.querySelectorAll(".listReviews");
            findRev.forEach((item) => {
                if (item.id === productName) {
                    item.append(newLi);
                }
            });
        }

        const txtArea = document.querySelector(".textarea");
        txtArea.value = "";
        getListRev();
    });
}

function getReviewText() {
    const textArea = document.querySelector(".textarea").value;
    try {
        if (textArea.length < 50) {
            throw new Error("Комментарий слишком короткий");
        } else if (textArea.length > 500) {
            throw new Error("Комментарий слишком длинный");
        } else {
            return textArea;
        }
    } catch (error) {
        spanErrorEl.textContent = error.message;
    }
}

function getProductName() {
    const selectedProduct = document.querySelector(
        'input[name="choice"]:checked'
    );
    try {
        let checkedProduct;
        if (selectedProduct) {
            checkedProduct = selectedProduct.id;
            return checkedProduct;
        } else {
            throw new Error("Вы не выбрали товар для отзыва!");
        }
    } catch (error) {
        spanErrorEl.textContent = error.message;
    }
}

function saveNewReview(prodName, revText) {
    for (const item of initialData) {
        if (item.product === prodName) {
            const newRev = {
                id: +lastReviewsID,
                text: revText,
            };
            newRev.id = ++lastReviewsID;
            newRev.text = revText;
            item.reviews.push(newRev);
        }
    }
}

function getListRev() {
    initialData.forEach((item) => {
        console.log(item.reviews);
    });
}

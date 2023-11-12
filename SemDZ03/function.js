"use strict";

// ----- addrev.js --------------------------------------------------------------
function startInitialData(arrObject) {
    //localStorage.clear();

    for (const item of arrObject) {
        localStorage.setItem(item.product, JSON.stringify(item.reviews));
    }
}

function resetForm() {
    const prodName = document.querySelector(`[name="productname"]`);
    prodName.value = "";

    const textArea = document.querySelector(".form__textarea");
    textArea.value = "";
}

function getProductName() {
    const productName = document.querySelector(".form__product").value;
    try {
        if (productName.length === 0) {
            throw new Error("Ошибка! Не введено название продукта!");
        } else if (productName.length < 5) {
            throw new Error("Ошибка! Название продукта очень короткое");
        } else {
            return productName;
        }
    } catch (error) {
        productErrorEl.textContent = error.message;
    }
}

function getReviewText() {
    const textArea = document.querySelector(".form__textarea").value;
    try {
        if (textArea.length < 20) {
            throw new Error("Ошибка! Комментарий слишком короткий");
        } else if (textArea.length > 200) {
            throw new Error("Ошибка! Комментарий слишком длинный");
        } else {
            return textArea;
        }
    } catch (error) {
        reviewErrorEl.textContent = error.message;
    }
}

function getReviewMaxID() {
    let maxID = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const valueKey = JSON.parse(localStorage.getItem(key));
            for (const obj of valueKey) {
                if (maxID < +obj.id) {
                    maxID = +obj.id;
                }
            }
        }
    }
    return maxID;
}

function findKeyLocalStorage(pName) {
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            if (key === pName) {
                return pName;
            }
        }
    }
}

function addReviewInLocalStorage(pName, revObj) {
    if (!findKeyLocalStorage(pName)) {
        localStorage.setItem(pName, JSON.stringify([revObj]));
    } else {
        const arrGetValueByKey = JSON.parse(localStorage.getItem(pName));
        arrGetValueByKey.push(revObj);
        localStorage.setItem(pName, JSON.stringify(arrGetValueByKey));
    }
}

// --- viewrev.js -------------------------------------------------------------------------
function renderListProducts() {
    const boxRevEl = document.querySelector(".boxreviews");

    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const divElem = `<div class="boxreviews__product" id="${key}">
                <span class="boxreviews__span">${key}</span>
                <input type="submit" value="показать отзывы" id="show" class="boxreviews__button">
                <input type="submit" value="скрыть отзывы" id="hide" class="boxreviews__button">
            </div><ul class="boxreviews__ulbox"></ul>`;
            boxRevEl.innerHTML += divElem;
        }
    }
}

function renderListReviews(lstRevProd, ulboxEl) {
    for (const review of lstRevProd) {
        const liEl = `<li class="boxreviews__lirev" id="${review.id}">
        <span class="boxreviews__lispan">${review.text}</span>
        <input type="submit" value="удалить" id="${review.id}" class="boxreviews__delbtn">
        </li>`;
        ulboxEl.innerHTML += liEl;
    }
}

function deleteReview(nameProduct) {
    const delRevEl = document.querySelectorAll(".boxreviews__delbtn");

    delRevEl.forEach((rev) =>
        rev.addEventListener("click", () => {
            const reviewsProduct = JSON.parse(
                localStorage.getItem(nameProduct)
            );

            if (reviewsProduct.length > 1) {
                let newReviewsProduct = reviewsProduct.filter(
                    (elem) => elem.id !== +rev.id
                );
                localStorage.setItem(
                    nameProduct,
                    JSON.stringify(newReviewsProduct)
                );
                const elLi = document.getElementById(rev.id);
                elLi.remove();
            } else {
                const elLi = document.getElementById(rev.id);
                elLi.remove();
                localStorage.removeItem(nameProduct);
                const delProdEl = document.getElementById(nameProduct);
                delProdEl.remove();
            }
        })
    );
}

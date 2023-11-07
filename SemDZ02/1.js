"use strict";

/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books, которое должно хранить 
книги, переданные при создании объекта.
2. Реализуйте геттер-функцию allBooks, которая возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/

class Library {
    #books = [];

    constructor(arrBooks) {
        this.checkDuplicateBook(arrBooks);
        this.#books = arrBooks;
    }

    get allBooks() {
        return this.#books;
    }

    checkDuplicateBook(inputArray) {
        try {
            if (inputArray.length === 0) {
                throw new Error("Входной список книг пуст!");
            } else {
                const inputArrayTitles = inputArray.map((obj) => obj.title);
                let hasDuplicate = inputArrayTitles.some(
                    (title) =>
                        inputArrayTitles.indexOf(title) !==
                        inputArrayTitles.lastIndexOf(title)
                );
                if (hasDuplicate) {
                    throw new Error(
                        "Ошибка!!! Входной массив содержит дубликаты книг."
                    );
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    hasBook(name) {
        const titlesBooks = this.#books.map((obj) => obj.title);
        if (titlesBooks.includes(name)) {
            return true;
        } else {
            return false;
        }
    }

    addBook(title, author) {
        try {
            if (this.hasBook(title)) {
                throw new Error(
                    "Ошибка! Книга с таким названием уже есть в библиотеке"
                );
            }
            const newBook = new Object();
            newBook.title = title;
            newBook.author = author;
            this.#books.push(newBook);
            console.log(`\nКнига: '${title}' - добавлена успешно`);
        } catch (error) {
            console.error(error);
        }
    }

    removeBook(title) {
        try {
            if (!this.hasBook(title)) {
                throw new Error(
                    "Ошибка! Книги с таким названием в библиотеке нет"
                );
            }
            const index = this.#books.findIndex(
                (object) => object.title === title
            );
            this.#books.splice(index, 1);
            console.log(`\nКнига по названию: '${title}' - удалена успешно`);
        } catch (error) {
            console.error(error);
        }
    }

    printLibrary() {
        console.log("\n    Список книг библиотеки:");
        for (const book of this.#books) {
            console.log(
                `Название книги: '${book.title}' - автор: '${book.author}'`
            );
        }
    }
}

const books = [
    { title: "Barnyard", author: "George Orwell" },
    { title: "1984", author: "George Orwell" },
    { title: "Prince and the pauper", author: "Mark Twain" },
    { title: "Adventures of Tom Sawyer", author: "Mark Twain" },
    { title: "Brave New World", author: "Aldous Huxley" },
    { title: "Fahrenheit 451", author: "Ray Bradbury" },
];

const library = new Library(books);
console.log(library.allBooks);
console.log(library.hasBook("Brave New World"));

library.addBook("123", "George Orwell");
console.log(library.allBooks);

library.addBook("The Adventures of Huckleberry Finn", "Mark Twain");
console.log(library.allBooks);

library.removeBook("123");
console.log(library.allBooks);

library.printLibrary();

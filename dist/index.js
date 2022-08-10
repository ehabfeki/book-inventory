"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
let books = require('../data/books.json').books;
const bookSchema = require('../src/schemas/book.json');
const ajv_1 = __importDefault(require("ajv"));
const app = express_1.default();
const port = 8080; // default port to listen
const avjValidator = new ajv_1.default();
const jsonBodyParser = body_parser_1.default.json({ type: 'application/*+json' });
// define a route handler for the default home page
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("welcome to our book inventory");
});
app.get("/books", (req, res) => {
    res.send(JSON.stringify(books, null, 4));
});
app.put("/books", (req, res) => {
    if (req.body instanceof Array) {
        const givenBooks = req.body;
        const invalidValues = givenBooks.some((book) => {
            return !avjValidator.validate(bookSchema, book);
        });
        if (invalidValues) {
            res.status(500);
            res.send("At least one member is not a valid book");
        }
        else {
            books = books.concat(givenBooks);
            res.send(givenBooks.map((book) => { return book.title; }).join(',') + ' were added to the book inventory');
        }
    }
    else {
        const book = req.body;
        const isValid = avjValidator.validate(bookSchema, book);
        if (isValid) {
            res.status(200);
            res.send(`${book.title} was added to the inventory `);
        }
        else {
            res.status(500);
            console.log(avjValidator.errors[0].message);
            res.send((book.title ? `${book.title} is not valid book ` : ' book object is not well formated => ') + avjValidator.errors[0].message);
        }
    }
});
app.use(jsonBodyParser);
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
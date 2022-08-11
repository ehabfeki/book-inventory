import express from 'express'
import {Book} from './Book';
import bodyParser from 'body-parser'
let books: Book[] = require('../data/books.json').books;
const bookSchema = require('../src/schemas/book.json')
import ajv from "ajv";
import { error } from 'console';

const app = express();
const port = 8080; // default port to listen
const avjValidator = new ajv();
const  jsonBodyParser = bodyParser.json({ type: 'application/*+json' });
// define a route handler for the default home page

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("welcome to our book inventory");
});
app.get("/books", (req, res) => {
    res.send(JSON.stringify(books, null, 4));
})


app.put("/books",(req,res) =>{

    if(req.body instanceof  Array) {
        const givenBooks : Book[] = req.body;
        const  invalidValues = givenBooks.some((book) => {
            return !avjValidator.validate(bookSchema, book)
        });
        if(invalidValues) {
            res.status(500);
            res.send("At least one member is not a valid book");
        }
        else {
            books = books.concat(givenBooks);
            res.send(givenBooks.map((book) =>{return book.title}).join(',') + ' were added to the book inventory');
        }
    } else {
        const  book : Book = req.body;
        const isValid: boolean = avjValidator.validate(bookSchema,book) ;
        if(isValid) {
            res.status(200);
            res.send(`${book.title} was added to the inventory `)
        }else  {
            res.status(500);
            console.log(avjValidator.errors[0].message)
            res.send( (book.title ?`${book.title} is not valid book ` : ' book object is not well formated => ') + avjValidator.errors[0].message) ;
        }
    }

})

app.put('/books/:isbn', (req, res) => {

    // fethc book match by `isbn`
    const found = books.find( (book) => {
        return book.isbn === req.params.isbn;
    });

    // check if book found
    if (found) {
        const updated = {
            isbn: found.isbn,
            title: req.body.title,
            copies: req.body.copies,
            subtitle: req.body.subtitle,
            author: req.body.author,
            published: req.body.published,
            publisher: req.body.publisher,
            pages: req.body.pages,
            description: req.body.description,
            website: req.body.website,
        };

        // find index of found object from array of data
        const targetIndex = books.indexOf(found);

        // replace object from data list with `updated` object
        books.splice(targetIndex, 1, updated);

        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});

app.use(jsonBodyParser);

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
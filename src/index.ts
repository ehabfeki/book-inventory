import express from 'express'
import {Book} from './Book';
import bodyParser from 'body-parser'
let books: Book[] = require('../data/books.json').books;
const bookSchema = require('../src/schemas/book.json')
import ajv from "ajv";

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

app.use(jsonBodyParser);

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
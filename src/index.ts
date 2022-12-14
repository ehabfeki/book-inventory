import express from 'express';
import { Book } from './Book';
import bodyParser from 'body-parser';
let books: Book[] = require('../data/books.json').books;
const bookSchema = require('../src/schemas/book.json');
import ajv from 'ajv';

const app = express();
// port can be ENV_VAR
const port = 8080; // default port to listen
const avjValidator = new ajv();
const jsonBodyParser = bodyParser.json({ type: 'application/*+json' });
// define a route handler for the default home page

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('welcome to our book inventory');
});
app.get('/books', (req, res) => {
  res.send(JSON.stringify(books, null, 4));
});

// to create object, use POST request not PUT request
app.post('/books', (req, res) => {
  if (req.body instanceof Array) {
    const givenBooks: Book[] = req.body;
    const invalidValues = givenBooks.some((book) => {
      return !avjValidator.validate(bookSchema, book);
    });
    if (invalidValues) {
      res.status(500);
      res.send('At least one member is not a valid book');
    } else {
      books = books.concat(givenBooks);
      res.send(
        givenBooks
          .map((book) => {
            return book.title;
          })
          .join(',') + ' were added to the book inventory'
      );
    }
  } else {
    const book: Book = req.body;
    const isValid: boolean = avjValidator.validate(bookSchema, book);
    if (isValid) {
      // concat one single book on exisitng books[]
      books = books.concat(book);
      // why sending 200 only for one book?
      res.status(200);
      res.send(`${book.title} was added to the inventory `);
    } else {
      res.status(500);
      console.log(avjValidator.errors[0].message);
      res.send(
        (book.title
          ? `${book.title} is not valid book `
          : ' book object is not well formated => ') +
          avjValidator.errors[0].message
      );
    }
  }
});

app.patch('/books/:isbn', (req, res) => {
  const book: Book = req.body;
  const isValid: boolean = avjValidator.validate(bookSchema, book);

  if (isValid) {
    // fetch book match by `isbn`
    const found = books.find((b) => {
      return b.isbn === req.params.isbn;
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
        website: req.body.website
      };

      // find index of found object from array of data
      const targetIndex = books.indexOf(found);

      // replace object from data list with `updated` object
      books.splice(targetIndex, 1, updated);

      // return with status 204
      res.status(204);
      res.send(found.isbn + ' is updated!');
    } else {
      res.status(404);
      res.send(
        'owpzy daisy! this book doesnt exist in our awesome book inventory!'
      );
    }
  } else {
    res.status(500);
    console.log(avjValidator.errors[0].message);
    res.send(
      (book.title
        ? `${book.title} is not valid book `
        : ' book object is not well formated => ') +
        avjValidator.errors[0].message
    );
  }
});

app.delete('/books/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  books = books.filter((book) => book.isbn !== isbn);
  res.send('successfully deleted book with isbn code ' + isbn);
});

app.get('/search', (req, res) => {
  const filters = req.query;

  const filteredBooks = books.filter((book) => {
    let isValid = true;
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        isValid = isValid && book[key as keyof typeof book] === filters[key];
      }
    }
    return isValid;
  });

  res.send(filteredBooks);
});

app.use(jsonBodyParser);

// start the Express server
const server = app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export {server, app};

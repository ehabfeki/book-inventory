import app from '../src/index';
import request from 'supertest';
import { getBooks } from './__mocks__/books';
import { Book } from '../src/Book';

const kill = require('kill-port');
let isbn = '9781449331818';
let postPayload: Book = {
  isbn: '1',
  copies: 100,
  title: 'this is title for new book',
  subtitle: 'this is subtitle for new book',
  author: 'this is author for new book',
  published: '2014-12-14T00:00:00.000Z',
  publisher: 'this is publisher for new book',
  pages: 1234,
  description: 'this is description for new book',
  website: 'http://eloquentjavascript.net/route/here/for/updated/website'
};

let putPayload: Book = {
  isbn: '9781491904244',
  copies: 100,
  title: 'this is updated title',
  subtitle: 'this is updated subtitle',
  author: 'this is updated author',
  published: '2014-12-14T00:00:00.000Z',
  publisher: 'this is updated publisher',
  pages: 1234,
  description: 'this is updated description',
  website: 'http://eloquentjavascript.net/route/here/for/updated/website'
};

describe('Endpoints', () => {
  afterEach((done) => {
    // port can be ENV_VAR
    kill(8080, 'tcp');
    done();
  });

  it('GET /', async () => {
    const result = await request(app).get('/');
    expect(result.text).toEqual('welcome to our book inventory');
    expect(result.statusCode).toEqual(200);
  });

  it('GET /books', async () => {
    const result = await request(app).get('/books');
    expect(JSON.stringify(result.text)).toEqual(getBooks());
    expect(result.statusCode).toEqual(200);
  });

  it('POST /books', async () => {
    const result = await request(app).post('/books').send(postPayload);
    expect(JSON.stringify(result.text)).toEqual(
      `\"${postPayload.title} was added to the inventory \"`
    );
    expect(result.statusCode).toEqual(200);
  });

  it('DELETE /books/:isbn', async () => {
    const result = await request(app).delete(`/books/${isbn}`);
    expect(JSON.stringify(result.text)).toEqual(
      `\"successfully deleted book with isbn code ${isbn}\"`
    );
    expect(result.statusCode).toEqual(200);
  });

  it('PATCH /books/:isbn', async () => {
    const result = await request(app)
      .patch(`/books/${putPayload.isbn}`)
      .send(putPayload);
    expect(JSON.stringify(result.status)).toEqual('204');
  });

  it('GET /search', async () => {
    const result = await request(app).get('/search').query({ isbn: isbn });
    expect(JSON.stringify(result.status)).toEqual('200');
  });
});

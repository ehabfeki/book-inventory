This is a simple express app to CRUD on books

#### Endpoints:

GET /                 - Landing page
GET /books            - Get all books
POST /books           - Add a new book
DELETE /books/:isbn   - Delete a book
PATCH /books/:isbn    - Update a book
GET /search           - Filter by attributes

#### Examples:

POST /books
```
curl -X POST -H "Content-Type: application/json"  \
-d '{
     "isbn": "1",            
     "copies": 100,
     "title": "this is title for new book",                  
     "subtitle": "this is subtitle for new book",                
     "author": "this is author for new book",  
     "published": "2014-12-14T00:00:00.000Z",
     "publisher": "this is publisher for new book",  
     "pages": 1234,
     "description": "this is description for new book",                                                                                                                                                                    
     "website": "http://eloquentjavascript.net/route/here/for/updated/website"
   }' \
"http://localhost:8080/books/"
```

PATCH /books/:isbn
```
curl -X PATCH -H "Content-Type: application/json"  \
-d '{
     "isbn": "9781491904244",
     "copies": 100,
     "title": "this is updated title",                 
     "subtitle": "this is updated subtitle",               
     "author": "this is updated author", 
     "published": "2014-12-14T00:00:00.000Z",
     "publisher": "this is updated publisher", 
     "pages": 1234,
     "description": "this is updated description",                                                                                                                                                                   
     "website": "http://eloquentjavascript.net/route/here/for/updated/website" 
   }' \
"http://localhost:8080/books/9781491904244"
```

DELETE /books/:isbn
```
curl -X DELETE http://localhost:8080/books/9781491904244
     -H "Accept: application/json"
```

GET /search
```
curl -d '{"key1":"value1", "key2":"value2"}' -H "ContentType: application/json" -X GET "http://localhost:8080/search?isbn=9781449331818"
```
```
curl -d '{"key1":"value1", "key2":"value2"}' -H "ContentType: application/json" -X GET "http://localhost:8080/search?author=Eric%20Elliott&publisher=O%27Reilly%20Media"
```

#### Build:

```yarn install```

```yarn start```

or with Docker

```docker build -t book-inventory .```

```docker run -d -p 8080:8080 book-inventory```

#### Test

```yarn test```
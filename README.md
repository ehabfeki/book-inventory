<H1>
       Books Inventory API Test.
</H1>
<body>
<P>
The Following interface is used managing book inventory .

Currently implemented solutioins are:

1. Get : "http://localhost:8080/books" 
   This will return list of books that are available in the inventory .
2. Put : "http://localhost:8080/books"
   will add book\books to inventory 
 </P>

<p>
    <h2>Setup</h2>
    <p>
        &nbsp;
        1. You need node js and npm application to be install<Br> &nbsp;
        2. Run npm i from the root folder<Br> &nbsp;
        3. Run npm start<Br> &nbsp;
    </p>
    <H3>
        Requirements 
    </H3>
    1. You are asked to implement the following functions :
        <br>&nbsp;&nbsp;&nbsp;
        a. Update - update existing book.  <br>&nbsp;&nbsp;&nbsp;
        b. Delete - remove existing. <br>&nbsp;&nbsp;&nbsp;
        c. Filter - get list of books that match given object filter.<br>
    2. Provide 6 test cases for this application . <br>
    3. Automate 4 of the cases you suggested in 2 .<br>
    4 (BONUS) . Suggest code improvements.
        
</body>

<!-- 
QA Automation infrastructure tech assignment
Implement a program according to the specifications mentioned in the problem statement below.
The program should be implemented using Javascript / Typescript.
The solution must include the source code  and/or  build scripts, if required.


As a QA infrastructure automation engineer you will be responsible of a various tasks in the QA automation development life cycle, as: 
SW development (tests and tools)
Infrastructure management (CI\CD , Docker , k8s etc …)
Testing
Test Automation
In the assignment below we will cover all of these responsibilities:


Introduction
This code simulates an API layer for book inventory management application. 
The application should allow its users to add, update, delete and view books from the inventory. Only a part of the functionality is exposed, note that expected data is in JSON format.
Setup:
You will be provided with ZIP file you need to extract
You need to have node && npm installed
Run npm install
In order to run the application you should run npm start

Development :

The following endpoints are exposed 
http://localhost:8080/ welcome to the application
http://localhost:8080/books get the current list of books in the repository
http://localhost:8080/books put request will allow you to add a book or array of books to the repository.

You are asked to implement the following capabilities:
Update - update existing book (one or more properties)
Delete - remove existing
Filter - get a list of books that match the given object filter.ex : {title : “test bool “}


QA:
 The task :      Please provide 6 test cases for testing your solution       (at least 1 TC for each endpoint)


 Automation:
The Task :     You are asked to automate 1 of the cases you suggested in the QA task.


Infrastructure:
 The task:
Wrap your solution with Docker container 
Add launch instruction so all capabilities from the previous solution will be exposed


Delivery 
We would prefer your code to be checked in on any source code management system (Github,Bitbucket, etc). Please do not use the name ContentSquare inside your project as it is a registered trademark.



Thank you and good luck. -->

React MyReads app

[overview]
[architecture]
[todos]

Two screens:
- my reads
- search

# My Reads
This is the main screen. It shows books in 3 categories/shelves:
- Reading
- Want to read
- Read

When user clicks on a book, a popup menu is displayed. This menu gives the possibility to move a book from one category to another. **This selection must be reflected in the search screen too**.

## Want to read
Has a "+" button at the end of book row, that redirect user to /search

# /search
This screen offers the possibility to look into the Books API for books to add.
It has 
* input field
* main area

## input field
This needs state. Similarly to the contacts app, when user inputs a query, a search in the db is performed. Each time query changes, search is done again. Search should return all books whose name matches the regexp pattern given. 

## main area
Shows search results. Use CSS to organize results w/Flexbox.

***

But there is the book API here. Let's download it from the Udacity repo, also the README.md w/instructions. 
...
Ok, so now let's read these files, then come back here.

# BooksAPI
This API has three methods: getAll, update and search. All of them return a promise that resolve to a JSON object. 
`getAll` gives all the books available in the db
`update`: use this to move a book from one shelf to another
`search`: use this in the search screem to get books that match the query

**note**: The only search terms that will work on the server-side are the ones found in SEARCH_TERMS.md

DRY and DOT

First build static version -> lot of typing and no thinking
Then focus on interactivity (state and so on) -> lot of thinking and not much typing

TODO:
0. with drawings of home and search screens:
	- home screen:
		* identify component
	- search screen:
		* identify component
	- how do components interact?
	- create project folder structure
1. build static versions of the app. This means:
	- home screen:
		* build components
		* build styles
		* use props to pass data from parent to child	
	- search screen:
		* build components
		* build styles
		* use props to pass data from parent to child
2. build interactivity
	- identify where UI state changes
	- build states
	- implement routes


Components identified:
1. Header
2. Search icon that links to /search
3. Shelf
4. Book options
5. AddBook Button
6. Single book

Is book a component? Can a book be considered a component? 
A single book has:
- img
- button moveToShelf 
- title
- subtitle

So in BookRow, I'll have to create a method to fill row w/books up to 4. Then, for the same row, I will render the books by calling the fillRow() method.
Wait. The number of books to show in a single row is something that belongs to CSS. In fact, I can use Flexbox for that.

A function to render a single book component. 
A function to render all the books in the the shelf array. Book display style will be handled by Flexbox.

Each shelf has an array of books.

But the number 

...

Checked data coming from API. Each book is in JSON. Among infos there is:
* title
* subtitle
* authors: [authorN, author N+1]
* publisher
* pageCount
* imageLinks
	* smallThumbnail url
	* thumbnail url
* book id: I can use it as key prop
* shelf: this is a string 

So for each book I have all I need. Also, there is a shelf member. It contains a string. It can be:
* 'currentlyReading'
* 'wantToRead'
* 'read'

When a book is fetched, it should be assigned to a shelf based on book.shelf. But how do I say this? Each book belongs to BookRow. Ok. The BookRow contains an array, say named 'bookRowArr'.
So I can map over the books and push to 'BookRowArr' only the books w/ a certain shelf string. With CSS I can actually  handle the style.

...

So Let's do it like this: first let's handle the static version of the website, so that at the end of the process I have a static website that:
- shows an homepage that has:
	* header
	* search icon that links to /search
	* three shelves
		* currently reading
		* wanto to read
		* read
	* each shelf has a book
- /search has:
	* search input
	* back row that, when clicked, redirects back to homepage
- allows to go navigate between / and /search



What should book result be? Since there's a book compoent, I can reuuse that. Like on type, there's the query, and I want to return all the JSON book objs that match that query. So here I should reuse:
- fn to render a book
- fn to show books using flexbox

Fn to render a book should pick all the data from the book's JSON and, based on that, render the element.


So to recap:

TODO:
v0. with drawings of home and search screens:
	v- home screen:
	v	* identify component
	v- search screen:
	v	* identify component
	v- how do components interact?
	v- create project folder structure
1. build static versions of the app. This means:
	v home screen:
	v	* build components:
	v		v1. Header
	v		2. Shelf
	v		3. Book options
	v		4. AddBook Button
	v		5. Single book
	v	* build styles
	v	* use props to pass data from parent to child	
	v search screen:
	v	* build components:
	v		1. Search inputs
	v		2. Back arrow
	v	* build styles
	v	* use props to pass data from parent to child
2. build interactivity
	v identify where UI state changes
	v build states
	v implement routes
	v implement book change among shelves
	v implement search
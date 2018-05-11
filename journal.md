# Day 3 - Thu 10/5/18
6:18am - I set up the project and made a plan to build it. 
First of all I am going to make the static version of the app (props). Then I will focus on interactions (state).

One of the advantages of React is that it makes it possible to separate logic from the rendering. So in the same component file I can separate how I want it to work from how I want it to look.

TODO: 
v make header component
...
Header component created. 

TODO: create Book component.
The Book component should have:
- img
- (on the right corner of the img) button moveToShelf.
- title
- subtitle

I can make a method to fetch book img from API. But the thing is, API requests should be made in app.js because props flows from parent to child



# Day 4 - Fri 11/5/18
7:01am - when get data with API call, before passing array el as prop (arr[n] being an obj in this case), use conditional in the return to be sure to return that element only when prop value is ready. Otherwise I'll get undefined error.
TODO: build Shelf.
This is the Currently Reading one, so it must have:
- header:
	* h2
- main:
	* book list
	
For the book list, should put an array called shelfBooks, where I filter the books this.state.books by taking only the ones whose books.shelf === 'currentlyReading'. When I succeed to render a single shelf, what I can do is to abstract it. 

...

Made a shelf, now I should handle book division in three shelves.

...

Correction: I improved book display.
Now I should handle books in the three shelves. So now I have one Shelf component

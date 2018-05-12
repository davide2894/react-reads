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

***

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
Now I should handle books in the three shelves. So now I have one Shelf component, that should be reusable. 

There is the book list in App.js, I can use it to divide them based on the book.shelf value

So in App.js I can create a method to organize books. This takes the state.books[], maps through it and based on book.shelf I'll push it to its respective shelf[] array.


***

# Day 5 - Sat 12/5/18
6:35am - this is the thing: I want to fetch all books from the API. Then, when the promise returns the results, I wanto to filter these books and update state arrays (shelves arrs) consequently.

...

8:01am - ok. Home static done. Now should di search static. For the moment it should have only a searchbar with a placeholder like 'Search by title, author or cathegory'

TODO: style searchbar

...

10:13am - done. 
Now I can safely say I can start implementing interactions (oh boy). 

Let's see. The interactions to do are:
1. book dropdown menu
2. render search results 
3. add book by touching the add button in "Want to read" shelf

...

1. book dropdown menu
So:
* when book__button is clicked, render a dropdown menu
* dropdown menu:
	v content:
		v[ Move to...	  ]
		v- Currently reading
		v- Want to read
		v- Have read
	v when hover on list item:
		v- bg->peach
		v- color: #f5f5f5
	- when click on item:
		- update that book's state
		- save state (maybe w/localStorage?)
		
...

2:35pm - let's continue to render the dropdown. Drodown static is ready. I took inspiration fom Udacity's starter App.css
Position absolute is the way to go. Before it was showing up cause html wasn't organized.

...

When I click on the dropdown icon this is what should happen:
- dd list show have a V icon on the li corresponding to book shelf
- switch to dd list
- click on category: 
	* check tick appears on the left
	* book is moved to new shelf
	* selection is saved 
- page refresh: current state  saved

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


***

# Day 6 - Sun 13/5/18
5:09am - Books will move among shelves frequently, so when one is moved, what actually happens is that:
- book.shelf string changes
- organizeBooks() is called 
Because it's not good (I think) to have to make an API call everytime a book is moved. So stat --

Wait there, there's a server I need to update at each book move, because that's what happens for real-world applications with real-world servers.

And there's another thing: right now the state I created is for a static website, meaning that it can't be changed now. I need to implement the function version of the state. Hmmm.

Added BookList. 

***

# Day 7 - Mon 14/5/18
5:02am - how to add the checkmark to the list? Should try checkmark unicode. 
Yep it works. Ok so this is also something that changes in time cause user can select different shelf at any time. So this is state too. Where should the state live? In Book?? It's like when user selects another shelf, that book.shelf string changes accordingly, then I will use BooksAPI.update(book, shelf) to update its position. I need to test what update does in practice.

I see that using a <select> tag with <option>s children is more appropriate. I found a component control on gh 'react-select' that eases the job. Gonna try that now. I'll come back with the outcome


-->find what you get when you click on a book. Need to understand how to tell the program to recognize different books

***

# Day 8 - Tue 15/5/18
5:34am - continue from where I left yesterday. 
So books' ids are indeed registered and react knows which books it's dealing with

6:46am - I found a way to pass the selected value to parent child. I used two methods, one in parent, the other in child comp. Parent method is updating state w/param value. Child method is storing selection value with ref, then calls parent method via prop and passes selection in it. 

Now I can call API to update.

***

# Day 9 - Wed 16/5/18
6:30am - identify where books rendering happens when updated.
9:33am - gosh I didnt' understand what `BooksAPI.update()` actually does. 
What it does:
* It takes a book, meaning all the book info, and the shelf you want to move it to
* updated that book's shelf string
* gives back an object of array, where each item is:
	- shelfstring: [bookid, bookid, etc.]

So now the books actually update, but only when page refreshes because I am not including this update result in the rendering method. 

6:48pm - finally got it. All I had to do was to lift state up one level more and theb, from App.js, fetch all books when change is detected.

***

# Day 10 - Thu 17/5/18
5:59am - continue from yesterday. Within 9:30 I should send this app to Renato.
Before even implementing search I must handle the book button. What should do:
- on user click I want it to display the dropdown. 
- when user clicks outside book (lose focus) switch back to icon
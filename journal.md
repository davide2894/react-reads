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
Done with functional state.

TODO:
v eliminate auto creation of hot update commits
* improve loader with React Transitionn Group to entertain user during API fetch
* implement search feature

***

# Day 11 - Fri 18/5/18
6:15am - corrected typo in webpack.confing.dev > output that was breaking webpack on npm start.
On to the task for the day.

TODO: 
[x] improve loader with React Transitionn Group to entertain user during API fetch
[x] return to button def when dropdown loses focus
* implement search feature

Task: improve loader with React Transitionn Group to entertain user during API fetch
Should understand how transition group work.

So I should use { CSSTransition } to handle the loading screen. 
Ok I can create a loader with css. But CSST adds classes. 
When user changes shelf:
- this.state.showLoader = true
- CSS Transition is triggered
- Loader inside Transition
- fadein on loader modal
- show loader modal
- fadeout when API call is done

Loader should be placed in App because it involves the entire page. 

[x] i react-transition-group and import in App
[x] create Loader (html, css)
[x] import Loader into App
[x] Insert CSSTransition 
	
Doesn't have to be nested because it's going to be a simple full-screen modal w/z-index = 2

Make modal take full screen. Check how you did it in game. 

8:09am - was missing positon: fixed, left: 0 and top: 0.

9:38 - implemented loader. Key was updating state befre and after API calls.

10:04 - now dropdown is toggled on btn click and onBlur

Task: should implement search feature now, while waiting for Roll feedback

What should Search do?

Check rubric and udacityREADME

As user types:
- input state updates
- when search term is given
	* if it's among the ones in SEARCH_TERMS.md:
		* get books in whose obj the search pattern is matched
	* else: 
		* display error message like 'Oh shoot, there is no book like that :('
	
Or is it better to make an api call each time state updates? Mh. Better search on that.

6:11pm - ok so books from search results actually render now. API seems slow to update search results when change pattern changes. 

TODO:
- see why some books are fetched multiple times (Linux book)
- style book results
- implement Loader among search API calls
- implement suggestions

***

# Day 12 - Sat 19/5/18
6:07am - continue.

Look into the search term in md, where it says allowed ones.

***

# Day 13 - Mon 21/5/18
6:50am - seem to have solved it. Some books don't have the imageLinks property. For now I don't show those, but it's an incomplete solution. I should display them but with a placeholder image.
Instead of showing a placeholder img.

TODO:
[x] place placeholder img when needed
[x] implement move of searched book
[x] style results grid
[x] search results are not shown when all of the text is deleted out of the search input box.
[x] style search errors
[x] add none option to dropdown
[x] if book has shelf, show selection in /search results too
[x] Loader stops if query brings same results
[x] Loader stops when no results
[x] Task: Loader doesn't fire when query is ''.
[x] Loader fade-in is not smooth
[x] when click on None, remove book from shelf
[x] refactor if/else statements inside render->return
[x] implement suggestions
[x] style suggestions
[x] add publisher
[x] style publisher
[x] add rating
[x] style rating
- add genre
- style genre

***

# Day 14 - Tue 22/5/18

5:37am - continue from yesterday. 
Books coming from api search don't have shelf key. But if I iterate through all the books and, for each book, use api get - I obtain the shelf. 
Should make sure that books have the correct state from the beginning, and this is possible with get. So in Book.js I must set selectedOption to the value returned from BooksAPI.get()
Like this it seems to work but with one issue: the shelf loads after the book is rendered due to async call. But books should render only when shelf is loaded. So either put a transition in there OR map all the books and for each, get its id and push it to results[] in componentWillMount.
Fixed it: Book comp renders only when selectedOption state is defined.

Next is to insert a transition while books render in search. 
I want the transition to start when BooksAPI.search() is called, and to stop when books are rendered.
I set it in search by copying transition funcs in it, but it's an ugly solution.
Besides, in main page transition unmounts as soon as the books load.
2:46pm - kinda working. Put `<CSSTransition>` outside conditional rendering. But now, after second search loader state stays true.
Interesting. If query 'art' and then type i query doesn't become 'arti'.

***

# Day 15 - Wed 23/5/18
continue. 

***

# Day 16 - Thu 24/5/18
8:15am - continue. 

Task: Optimize Search so that it uses getAll instead of search() + get().

API available enpoints don't let that. Need to look if I can edit availablen endpoints. Can't edit because don't have permission to do so.

3:39pm - Task: Loader doesn't fire when query is ''. Ok, so works but doesn't show what are you looking for in this case

***

# Day 17 - Fri 25/5/18
8:31am - continue. Need to force getBooks when go back to home OR force it when page renders


***

# Day 18 - Fri 1/6/18
9:13am - when click on None, remove book from shelf

What happens? None means remove from {api}/books. Which means that the book doesn't appear anymore in getBooks()

after giving shelf to book, and click on back, app doesn't get books


***

# Day 19 - Sat 2/6/18

9:48am - handleAppChange should be triggered when a book is moved to a shelf.
6:02pm - many interrumptions. Problem was that since Route uses () => already, using it again in inline prop confuses React. In fact the call gets ignored. Remove () from inline prop, inside Route render(), and it works

# Day 20 - Sun 3/6/18
8:11am - implemet suggestions.
I can use the available search terms as suggestions. It's similar to search contacts. As user types I search for any word matching the pattern given. If amy is found show if below. Suggestions div should appear only when a pattern is matched.

Inside render:
[x] create sugg term arr
- creare sugg logic
	* if match: 
		* show matching terms
		* matching terms are clickable
		* when a matching term is clicked, search that term, which meas: 
			* query state updates
			* query is passed to search
			* search fires with that term
	* else: don't show div
- make sugg div appear on match


6:28pm - Task: add publisher









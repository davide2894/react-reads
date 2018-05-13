import React, { Component } from 'react';
import Header from './components/Header'
import BookList from './components/BookList'
import Shelf from './components/Shelf/Shelf'
import Search from './components/Search'
import * as BooksAPI from './utils/BooksAPI'
import { Route } from 'react-router-dom'

class App extends Component {	
			
	state = {
		books: []
	}
	
	getBooks = () => {
		BooksAPI.getAll().then(books => {
			this.setState({books: books})
		})
	}
	
	componentDidMount(){
		this.getBooks();
	}
  	
    render() {
		
		let { books } = this.state
				
		let currentlyReading = books.filter(book => book.shelf==='currentlyReading'),
			wantToRead = books.filter(book => book.shelf==='wantToRead'),
			read = books.filter(book => book.shelf==='read')
		
		return (
			<div className='app'>
			  <Route exact path='/' render={()=>(
					<div>
						<Header/>
						<BookList 
							books={books}
						/>
					</div>)}
				/>
				<Route path='/search' component={Search} />
			</div>
		)
    }
}

export default App;

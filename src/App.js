import React, { Component } from 'react';
import Header from './components/Header'
import Shelf from './components/Shelf/Shelf'
import Search from './components/Search'
import * as BooksAPI from './utils/BooksAPI'
import { Route } from 'react-router-dom'

class App extends Component {	
			
	state = {
		currentlyReading: [],
		wantToRead: [],
		read: []
	}
	
	getBooks(){
		BooksAPI.getAll().then(books => {
			this.setState({currentlyReading: books.filter(book=>book.shelf==="currentlyReading")})
			this.setState({wantToRead: books.filter(book=>book.shelf==="wantToRead")})
			this.setState({read: books.filter(book=>book.shelf==="read")})
			
		})
	}
	
	componentDidMount(){
		this.getBooks();
	}
  	
    render() {
		
		return (
			<div className='app'>
			  <Route exact path='/' render={()=>(
					<div>
						<Header/>
						<Shelf title='Currently Reading' books={this.state.currentlyReading} />
						<Shelf title='Want To Read' books={this.state.wantToRead} />
						<Shelf title='Have Read' books={this.state.read} />
					</div>)}
				/>
				<Route path='/search' component={Search} />
			</div>
		)
    }
}

export default App;

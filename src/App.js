import React, { Component } from 'react';
import Header from './components/Header'
import BookList from './components/BookList'
import Search from './components/Search'
import * as BooksAPI from './utils/BooksAPI'
import { Route } from 'react-router-dom'

class App extends Component {	
			
	state = {
		books: []
	}
	
	getBooks = () => {
		BooksAPI.getAll().then(books => {
			this.setState({books: books});
		})
	}
	
	componentDidMount(){
		this.getBooks();
	}

	handleChange = () => {
		BooksAPI.getAll().then(	books => this.setState({books: books}));
	}
  	
    render() {
		
		let { books } = this.state
		
		return (
			<div className='app'>
			  <Route exact path='/' render={()=>(
					<div>
						<Header/>
						<BookList 
							books={books}
							onChange={this.handleChange}
						/>
					</div>)}
				/>
				<Route path='/search' component={Search} />
			</div>
		)
    }
}

export default App;

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

	handleAppChange = () => {
		this.getBooks();
	}
	
  	
    render() {

		const baseUrl = process.env.PUBLIC_URL;
		
		let { books } = this.state
		
		return (
			<div className='app'>
			  <Route exact path={baseUrl + '/'} render={()=>(
					<div>
						<Header/>
						<BookList 
							books={books}
							onChange={this.handleAppChange}
						/>
					</div>)}
				/>
				<Route path={baseUrl + '/search'} component={Search} />
			</div>
		)
    }
}

export default App;

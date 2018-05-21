import React, { Component } from 'react';
import Header from './components/Header'
import BookList from './components/BookList'
import Search from './components/Search'
import Loader from './components/Loader'
import * as BooksAPI from './utils/BooksAPI'
import { Route } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

class App extends Component {	
			
	state = {
		books: [],
		showLoader: false
	}
	
	updateLoaderState = () => {
		this.setState((prevState)=>({
			showLoader: !prevState.showLoader
		}));	
	}
	
	getBooks = () => {
		
		//console.log('fetching books');
		
		BooksAPI.getAll().then(books => {
			this.setState({
				books: books
			});
			
			console.log('fetched books', this.state.books);
			// console.log('showLoader = ', this.state.showLoader);
			
			this.updateLoaderState();
		})
	}
	
	searchBooks = (userQuery) => {
		BooksAPI.search(userQuery).then(books => {
			this.setState({
				books: books
			})
		})
	}
	
	componentDidMount(){		
		this.updateLoaderState();
		this.getBooks();
		this.setDefShelf();
	}

	handleAppChange = () => {
				
		this.updateLoaderState();
		
		this.getBooks();
	}
	
	ComponentWillUpdate(){
		this.updateLoaderState();
		this.handleAppChange();
	}
	
	setDefShelf = () => {
		// for each book set shelf to its shelf
		let shelf;
		this.state.books.map(
			book => BooksAPI.get(book.id).then(
				book => this.setState(prevState => ({shelves: prevState.shelves.push(book.shelf)})))
		)
	}
  	
    render() {

		const baseUrl = process.env.PUBLIC_URL;
		
		let { books, showLoader } = this.state
				
		return (
			<div className='app'>
			  <Route exact path={baseUrl + '/'} render={()=>(
					<div>
						<Header/>
						<BookList 
							books={books}
							shelves={this.state.shelves}
							onChange={this.handleAppChange}
						/>
						<CSSTransition
							in={showLoader}
							classNames='Loader'
							timeout={2000}
							appear={true}
							unmountOnExit
						>
							<Loader/>							
						</CSSTransition>
					</div>)}
				/>
				<Route path={baseUrl + '/search'} render={() => (
						<Search 
							books={books}
							onChange={this.handleAppChange}
						/>)
				} />
			</div>
		)
    }
}

export default App;

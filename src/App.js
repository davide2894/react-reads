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
			
			// console.log('fetched books');
			// console.log('showLoader = ', this.state.showLoader);
			
			this.updateLoaderState();
		})
	}
	
	componentDidMount(){		
		this.updateLoaderState();
		this.getBooks();
	}

	handleAppChange = () => {
		
		// console.log('handling shelf change...');
		
		this.updateLoaderState();
		
		// console.log('showLoader = ', this.state.showLoader);

		this.getBooks();
	}
	
	ComponentWillUpdate(){
		this.updateLoaderState();
		this.handleAppChange();
	}
	
  	
    render() {

		const baseUrl = process.env.PUBLIC_URL;
		
		let { books, showLoader } = this.state
		
		console.log('showLoader = ', showLoader);
		
		return (
			<div className='app'>
			  <Route exact path={baseUrl + '/'} render={()=>(
					<div>
						<Header/>
						<BookList 
							books={books}
							onChange={this.handleAppChange}
						/>
						<CSSTransition
							in={showLoader}
							classNames='Loader'
							timeout={0}
							appear={true}
							unmountOnExit
						>
							<Loader/>							
						</CSSTransition>
					</div>)}
				/>
				<Route path={baseUrl + '/search'} component={Search} />
			</div>
		)
    }
}

export default App;

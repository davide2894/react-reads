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
		showLoader: false,
	}
	
	updateLoaderState = () => {
		this.setState((prevState)=>({
			showLoader: !prevState.showLoader
		}));	
	}
	
	getBooks = () => {
		console.log('calling getBooks');
		BooksAPI.getAll().then(books => {
			this.setState({
				books: books
			});
						
			this.updateLoaderState();
		})
	}
	
	componentDidMount(){		
		this.updateLoaderState();
		this.getBooks();
	}


	handleAppChange = () => {
		
		this.updateLoaderState();
		
		this.getBooks();
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
							timeout={300}
							appear={true}
							unmountOnExit={true}
						>
							<Loader/>							
						</CSSTransition>
					</div>)}
				/>
				<Route path={baseUrl + '/search'} render={() => (
						<div>
							<Search 
								books={books}
								showLoader={() => this.state.showLoader}
								onChange={() => this.handleAppChange}
								onResultsChange={() => this.handleResultsChange}
							/>
						</div>)}
				/>
			</div>
		)
    }
}

export default App;

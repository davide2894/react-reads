import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Loader from './Loader'
import Book from './Shelf/Book'
import coverPlaceholder from '../assets/cover-placeholder.jpg'
import * as BooksAPI from '.././utils/BooksAPI'

class Search extends Component {
	
	constructor(props){
		
		super(props);
		
		this.state = {
			query: '',
			results: [],
			showRes: false,
			showErrMsg: false,
			showSearchLoader: false
		};
		
		this.handleQuery = this.handleQuery.bind(this);
		this.search = this.search.bind(this);
	}
	
	handleQuery = (userQuery) => {
		
		let updatedQuery = userQuery;

		this.setState({
			query: 	userQuery.trim()
		})

		if(this.state.query !== '' || this.state.query !== undefined){
			//console.log(this.state.query);
			this.search(updatedQuery);
		}

	}
	
	search = (updatedQuery) => {

		let prevResJSON = JSON.stringify(this.state.results);

		this.setState({showSearchLoader: true});
		
		BooksAPI.search(updatedQuery).then(books => {
			
			if(!this.state.query){
				this.setState({showSearchLoader: false})
			} 

			if(books && !books.length){
				this.setState({showSearchLoader: false})
			}
			
			if(JSON.stringify(books) === prevResJSON){
				console.log('JSONs are true');
				this.setState({showSearchLoader: false});
			} else {
				this.setState({results: books})
			}
		});
	}

	handleShelfChange = (newOrganization) => {
		this.props.onChange(newOrganization)
	}
	
	handleResultsChange = () => {
		//console.log('updating loader from this.handleResultChange()');
		this.setState({showSearchLoader: false});
	}
	
	updateSearchLoader(){
		this.setState((prevState)=>({
			showSearchLoader: !prevState.showSearchLoader
		}));	
	}

	render(){
		
		let { results, query, showSearchLoader } = this.state;
		
		let searchErr = null;
		if(!query.length){
			searchErr = 'What are you looking for?';
		} else if(results && !results.length) {
			searchErr = 'Nothing matches : /';		
		}
			
		return(
			<div>
				<div className='searchbar'>
					<div className='searchbar__content'>	
						<Link
							className='searchbar__link-to-home' 
							to={`${process.env.PUBLIC_URL}/`}
						/>
						<div className='form'>						
							<input 
								className='form__input'
								placeholder='Search a book...'
								value={query}
								onChange={(event) =>
								this.handleQuery(event.target.value)}	
							/>
						</div>
					</div>
				</div>
				 
				{results && results.length && (
					<div className='results' onLoad={this.handleResultsChange}>
						{results.map(result => 
								<Book
									book={result}
									cover={result.imageLinks ? (result.imageLinks.thumbnail ? result.imageLinks.thumbnail : result.imageLinks.smallThumbnail) : coverPlaceholder}
									title={result.title}
									subtitle={result.subtitle}
									id={result.id}
									key={result.id}
									onChange={this.handleShelfChange}
								/>
							)
						}
					</div>				
				)}
				
				{!!searchErr &&  <div className='search-error'>{searchErr}</div>}
				
				<CSSTransition
					in={showSearchLoader}
					classNames='Loader'
					timeout={300}
					appear={true}
					unmountOnExit={true}
				>
					<Loader/>							
				</CSSTransition>
			</div>
		)
	}
}

export default Search
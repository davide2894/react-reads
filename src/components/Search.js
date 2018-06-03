import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Loader from './Loader'
import Book from './Shelf/Book'
import coverPlaceholder from '../assets/cover-placeholder.jpg'
import * as BooksAPI from '.././utils/BooksAPI'
import escapeRegExp from 'escape-string-regexp'

class Search extends Component {
	
	constructor(props){
		
		super(props);
		
		this.state = {
			query: '',
			results: [],
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
		console.log('handleShelfChange');
		this.props.onChange(newOrganization);
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

	refreshPage = () => {
		window.location.reload();
	}

	render(){
		
		let { results, query, showSearchLoader } = this.state;
		
		let searchErr = null;
		if(!query.length){
			searchErr = 'What are you looking for?';
		} else if(results && !results.length) {
			searchErr = 'Nothing matches : /';		
		}
		
		let showResults = null;
		
		if(results && results.length){
			showResults = true;
		} else {
			showResults = false;
		}
		
		let showSuggestions;
		
		let suggestionTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'];
		
		
		if(query){
			
			// create regexp
			let match = new RegExp(escapeRegExp(query), 'i');
			
			// return only matched arr terms
			showSuggestions = suggestionTerms.filter(suggestion => match.test(suggestion));
			
			
		} else {
			
			showSuggestions = null;
			
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
				
				{showSuggestions && ( 
					<ul className='suggestions'>
						{showSuggestions.map(suggestion => 
						 	<li 
						 		className='suggestion'
						 		onClick={()=>this.handleQuery(suggestion)}
						 		key={suggestion}
						 		>{suggestion}</li>)}
					</ul> )}
				 
				{showResults && (
					<div className='results' onLoad={this.handleResultsChange}>
						{results.map(result => 
								<Book
									book={result}
									cover={result.imageLinks ? (result.imageLinks.thumbnail ? result.imageLinks.thumbnail : result.imageLinks.smallThumbnail) : coverPlaceholder}
									title={result.title}
									subtitle={result.subtitle}
									publisher={result.publisher}
									publishedDate={result.publishedDate}
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
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
		this.search(updatedQuery);
	}
	
	search = (updatedQuery) => {
		//console.log('calling search...');
		//console.log('QUERY: ', this.state.query);
		//console.log('updating loader from this.search()');
		let prevResJSON = JSON.stringify(this.state.results);

		this.setState({showSearchLoader: true});
		
		BooksAPI.search(updatedQuery).then(books => {
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
		console.log('updating loader from this.handleResultChange()');
		this.setState({showSearchLoader: false});
	}
	
	updateSearchLoader(){
		this.setState((prevState)=>({
			showSearchLoader: !prevState.showSearchLoader
		}));	
	}

	render(){
		
		let { results, query, showSearchLoader } = this.state;
		console.log('showLoader: ', this.state.showSearchLoader)
		
		// Write a schme of the if/else logic in render and
		// identify where it refers to state
		// Set vars
		// If/else conditionals here and store outputs in vars
		// Use {} in render, where {} is if/else output (stored in vards)
	
		/*
		
		let 
		
		if(this.state.query.length > 0){
			if(this.state.results && this.state.results > 0){
				<Resutls></Resutls>
				this.setState({showRes: true})
			} else {
				<div className='search-error'>Nothing matches : /</div>
				this.setState({showErrMsg: true})
			}
		} else {
			<div className='search-error'>What are you looking for?</div>
			this.setState({showErrMsg: true})
		}
		
		IN RETURN
		
		{this.state.showRes && 
			jsx code for results
		}
		*/
		
			
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
				 {query.length > 0 ? (
					results && results.length > 0 ? (
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
						</div>) : (<div className='search-error'>Nothing matches : /</div>)				
				 ) : (<div className='search-error'>What are you looking for?</div>)}
				<CSSTransition
					in={showSearchLoader}
					classNames='Loader'
					timeout={300}
					appear={true}
					unmountOnExit
				>
					<Loader/>							
				</CSSTransition>
			</div>
		)
	}
}

export default Search
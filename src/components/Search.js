import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Shelf/Book'
import coverPlaceholder from '../assets/cover-placeholder.jpg'
import * as BooksAPI from '.././utils/BooksAPI'

class Search extends Component {
	
	constructor(props){
		
		super(props);
		
		this.state = {
			query: '',
			results: []
		};
		
		this.handleQuery = this.handleQuery.bind(this);
		this.search = this.search.bind(this);
	}
	
	componentDidMount(){
		this.handleQuery()
	}
		
	search = () => {
		
		BooksAPI.search(this.state.query).then(books => {
		   this.setState({results: books})
		})
	}
	
	handleQuery = (userQuery) => {
		
		this.setState({
			query: userQuery
		})

		//console.log(this.state)
		this.search();

	}
	
	handleChangeFromSearch = (newOrganization) => {
		this.props.onChange(newOrganization)
	}
	
	
		
	render(){
		
		let { results = [], query } = this.state;
				
		if(results.length>0){
			console.log('results = ', results);
		}																								

		
		/*if(results.length){
			console.log(results);
		}*/
		
		return(
			<div>
				<div className='searchbar'>
					<div className='searchbar__content'>	
						<Link
							className='searchbar__link-to-home' 
							to={`${process.env.PUBLIC_URL}/`}
						/>
						<form className='form'>						
							<input 
								className='form__input'
								placeholder='Search a book...'
								autoFocus
								onChange={(event) =>
								this.handleQuery(event.target.value)}	
							/>
						</form>
					</div>
				</div>
				{query ? (
					results.length ? (
						<div className='results'>
							{results.map(result => 
									<Book
										book={result}
										cover={result.imageLinks ? (result.imageLinks.thumbnail ? result.imageLinks.thumbnail : result.imageLinks.smallThumbnail) : coverPlaceholder}
										title={result.title}
										subtitle={result.subtitle}
										currentShelf={result.shelf}
										id={result.id}
										key={result.id}
										onChange={this.handleChangeFromSearch}
									/>
								)
							}
						</div>) : (
						<div className='search-error'>
							<p>No book like that : / </p>
						</div>
						)
				) : (<div className='search-error'><p>Nothing to show </p></div>) 
				}
			</div>
		)
	}
}

export default Search
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Shelf/Book'
import * as BooksAPI from '.././utils/BooksAPI'

class Search extends Component {
	
	state = {
		query: '',
		results: []
	}
	
	search = () => {
		BooksAPI.search(this.state.query).then(data => {
		   this.setState({results: data})
			//data => console.log(data)
		});
	}
	
	handleQuery = (userQuery) => {
		this.setState({
			query: userQuery
		})
		this.search();
	}
	
//	showResults = () => {
//		this.state.results.map(result => )
//	}
	
	
	render(){
		
		let { results } = this.state;
		
		if(results !== undefined){
			console.log(results);
		}
		
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
				{ results !== undefined && (
					<div className='results'>
						{results.map(result => 
							<Book
								book={result}
								title={result.title}
								subtitle={result.subtitle}
								cover={result.imageLinks.thumbnail}
								currentShelf={result.shelf}
								id={result.id}
								key={result.id}
								onChange={this.handleShelfChange}
							/>)}
					</div>			
				)}
			</div>
		)
	}
}

export default Search
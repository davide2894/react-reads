import React, { Component } from 'react';
import Book from './Book'
import * as BooksAPI from '../../../src/utils/BooksAPI'

class Shelf extends Component {
	
	handleShelfChange = (newOrganization) => {
		this.props.onChange(newOrganization);
	}	
	
	render() {
		
		const { books, title } = this.props;
				
		return (
			<div className='shelf'>
				<h1 className='shelf__title'>{title}</h1>
				<div className="shelf__books">
					{books.map((book) => 
						<Book 
							book={book}
							title={book.title}
							subtitle={book.subtitle}
							cover={book.imageLinks.thumbnail}
							currentShelf={book.shelf}
							id={book.id}
							key={book.id}
							onChange={this.handleShelfChange}
						/>
					)}
				</div>
			</div>
		)
	}
}



export default Shelf
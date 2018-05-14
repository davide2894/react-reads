import React, { Component } from 'react';
import Book from './Book'
//import * as BooksAPI from '../../utils/BooksAPI'

class Shelf extends Component {
	
	render() {
		
		const { books, title } = this.props;
				
		return (
			<div className='shelf'>
				<h1 className='shelf__title'>{title}</h1>
				<div className="shelf__books">
					{books.map((book) => 
						<Book 
							details={book} 
							shelf={book.shelf}
							id={book.id}
							key={book.id}
						/>
					)}
				</div>
			</div>
		)
	}
}



export default Shelf
import React, { Component } from 'react';
import Book from './Book'

class Shelf extends Component {
	
	
	render() {
		
		const books = this.props.books;
		
		return (
			<div className='shelf'>
				<h1 className='shelf__title'>{books.title}</h1>
				<div className="shelf__books">
					{books.map((book) => (
						<Book details={book} key={book.id}/>
					))}
				</div>
			</div>
		)
	}
}



export default Shelf
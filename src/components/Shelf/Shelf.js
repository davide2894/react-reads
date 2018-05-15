import React, { Component } from 'react';
import Book from './Book'
import * as BooksAPI from '../../utils/BooksAPI'

class Shelf extends Component {
	
	state = {
		bookshelf: ''
	}
	
	handleChange = (selectedOption) => {
		console.log('option passed to shelf =' + selectedOption);
		this.setState({bookshelf: selectedOption})
		console.log('shelf state = ' + JSON.stringify(this.state));
	}
	
	render() {
		
		const { books, title } = this.props;
				
		return (
			<div className='shelf'>
				<h1 className='shelf__title'>{title}</h1>
				<div className="shelf__books">
					{books.map((book) => 
						<Book 
							title={book.title}
							subtitle={book.subtitle}
							cover={book.imageLinks.thumbnail}
							currentShelf={book.shelf}
							id={book.id}
							key={book.id}
							onChange={this.handleChange}
						/>
					)}
				</div>
			</div>
		)
	}
}



export default Shelf
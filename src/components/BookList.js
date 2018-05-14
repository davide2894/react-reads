import React, { Component } from 'react'
import Shelf from './Shelf/Shelf'

class BookList extends Component {
	
	render(){
		
		let { books } = this.props
				
		let currentlyReading = books.filter(book => book.shelf==='currentlyReading'),
			wantToRead = books.filter(book => book.shelf==='wantToRead'),
			read = books.filter(book => book.shelf==='read')
		
		return(
			<div>
				<Shelf 
					title='Currently Reading' 
					books={currentlyReading}
				/>
				<Shelf 
					title='Want To Read'
					books={wantToRead}
				/>
				<Shelf
					title='Have Read'
					books={read}
				/>
			</div>
		)
	}
}





export default BookList
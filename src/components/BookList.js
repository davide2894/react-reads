import React, { Component } from 'react'
import Shelf from './Shelf/Shelf'

class BookList extends Component {
	
	handleBookListChange = (newOrganization) => {
		
		console.log('changing state...');
		
		this.props.onChange(newOrganization)
	}
	
	render(){
		
		console.log('BookList render() called');
				
		let { books } = this.props;
		
		let currentlyReading, wantToRead, read;
		
		currentlyReading = books.filter(book => book.shelf==='currentlyReading');
			
		wantToRead = books.filter(book => book.shelf==='wantToRead');
			
		read = books.filter(book => book.shelf==='read');
		
		return(
			<div>
				<Shelf 
					title='Currently reading' 
					books={currentlyReading}
					onChange={this.handleBookListChange}
				/>
				<Shelf 
					title='Want to read'
					books={wantToRead}
					onChange={this.handleBookListChange}
				/>
				<Shelf
					title='Have read'
					books={read}
					onChange={this.handleBookListChange}
				/>
			</div>
		)
	}
}





export default BookList
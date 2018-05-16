import React, { Component } from 'react'
import Shelf from './Shelf/Shelf'
import * as BooksAPI from '../utils/BooksAPI'

class BookList extends Component {
	
	state = {
		organization: {}
	}
	
	handleChange = (newOrganization) => {
		
		console.log('changing state...');
		
		this.props.onChange(newOrganization)
	}
	
	render(){
		
		console.log('BookList: render called');
				
		let { organization } = this.state;
		let { books } = this.props;
		
		let currentlyReading, wantToRead, read;
				
		/*if(this.state.organization){
			console.log('entered if(this.state.organization.length)');
			console.log(this.state.organization);
			
			currentlyReading = books.filter(book => organization.currentlyReading.includes(book.id));
			
			wantToRead = books.filter(book => organization.wantToRead.includes(book.id));
			
			read = books.filter(book => organization.read.includes(book.id));
			console.log(currentlyReading);
		} 
		else {
			
			currentlyReading = books.filter(book => book.shelf==='currentlyReading');
			
			wantToRead = books.filter(book => book.shelf==='wantToRead');
			
			read = books.filter(book => book.shelf==='read');
			}*/
		
		currentlyReading = books.filter(book => book.shelf==='currentlyReading');
			
		wantToRead = books.filter(book => book.shelf==='wantToRead');
			
		read = books.filter(book => book.shelf==='read');
		
		return(
			<div>
				<Shelf 
					title='Currently reading' 
					books={currentlyReading}
					onChange={this.handleChange}
				/>
				<Shelf 
					title='Want to read'
					books={wantToRead}
					onChange={this.handleChange}
				/>
				<Shelf
					title='Have read'
					books={read}
					onChange={this.handleChange}
				/>
			</div>
		)
	}
}





export default BookList
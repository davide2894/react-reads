import React, { Component } from 'react'
import Shelf from './Shelf/Shelf'

class BookList extends Component {
	
	
	organizeBooks = () => {
		console.log(this.props);
	}
	
	render(){
		
		return(
			<div>
				<Shelf 
					title='Currently Reading' 
					onChange={this.organizeBooks}
				/>
				<Shelf title='Want To Read' />
				<Shelf title='Have Read' />
			</div>
		)
	}
}





export default BookList
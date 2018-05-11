import React, { Component } from 'react';

class Book extends Component {
		
	render(){
		
		return (
				<div className='book'>
					<img 
						className='book__img'
						alt='Book cover'
						src={this.props.details.imageLinks.thumbnail}/>
					<p className='book__title'>{this.props.details.title}</p>
					<p className='book__subtitle'>{this.props.details.subtitle}</p>
				</div>

		)
	}
}

export default Book
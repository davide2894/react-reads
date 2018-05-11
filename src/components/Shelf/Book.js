import React, { Component } from 'react';

class Book extends Component {
		
	render(){
				
		return (
				<div className='book'>
					<button className='book__button'></button>
					<img 
						className='book__img'
						alt='Book cover'
						src={this.props.details.imageLinks.thumbnail}/>
					<div className='book__info'>
						<span className='book__title'><strong>{this.props.details.title}</strong></span>
						<span className='book__subtitle'>{this.props.details.subtitle}</span>
					</div>
				</div>

		)
	}
}

export default Book
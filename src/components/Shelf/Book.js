import React, { Component } from 'react';

class Book extends Component {
		
	render(){
				
		return (
				<div className='book'>
					<div className='book__dropdown'>
						<button className='dropdown__button'></button>
						<div className='dropdown__content'>
							<h3 className='dropdown__title'>Move to...</h3>
							<ul className='dropdown__list'>
								<li className="dropdown__list-item">Currently reading</li>
								<li className="dropdown__list-item">Want to read</li>
								<li className="dropdown__list-item">Have read</li>
							</ul>
						</div>						
					</div>
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
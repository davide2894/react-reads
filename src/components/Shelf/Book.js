import React, { Component } from 'react'
import Select from 'react-select'
import * as BooksAPI from '../../../src/utils/BooksAPI'

class Book extends Component {
	
	/*
	export const update = (book, shelf) =>
		fetch(`${api}/books/${book.id}`, {
		method: 'PUT',
		headers: {
		  ...headers,
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({ shelf })
  	}).then(res => res.json())
	*/
	
	state = {
		selectedShelf: this.props.shelf
	}

	handleChange = (selectedOption) => {
		this.setState({selectedShelf: selectedOption});
		console.log(this.state);
	}
		//use BooksAPI.update
//		BooksAPI
//			.update(this.props.id, this.state.selectedShelf)
//			.then(result => console.log(result) 
		
	render(){
		const { selectedShelf } = this.state;
		const { details } = this.props;
		
		console.log(this.props.title);
		console.log(this.state);
						
		return (
				<div className='book'>
					<div className='book__dropdown'>
						<button className='dropdown__button'></button>
						<div className='dropdown__content'>
							<h3 className='dropdown__title'>Move to...</h3>
							<Select 
								className='dropdown__list'
								name='Move to...'
								onBlurResetsInpu={false}
								autoFocus
								simpleValue
								searchable={false}
								clearable={false}
								value={this.state.selectedShelf}
								onSelectResetInput={false}
								onChange={this.handleChange}
								options={[
									{value: 'currentlyReading', label: 'Currently reading'},
									{value: 'wantToRead', label: 'Want to read'},
									{value: 'read', label: 'Have read'}
								]}
							/>
						</div>						
					</div>
					<img 
						className='book__img'
						alt='Book cover'
						src={details.imageLinks.thumbnail}/>
					<div className='book__info'>
						<span className='book__title'><strong>{details.title}</strong></span>
						<span className='book__subtitle'>{details.subtitle}</span>
					</div>
				</div>

		)
	}
}

export default Book
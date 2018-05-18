import React, { Component } from 'react'
import Select from 'react-select'
import * as BooksAPI from '../../../src/utils/BooksAPI'

class Book extends Component {
	
	state = {
		selectedOption: this.props.currentShelf,
		displayDropDown: false,
		displayButton: true
	}
	
	handleBookChange = (selectedOption) => {
				
		this.setState({ selectedOption: selectedOption });
		
		BooksAPI.update(this.props.book, selectedOption).then(
			newOrganization => this.props.onChange(newOrganization)
		)
	}
	
	toggleDropDown = () => {
		
		console.log('called toggleDropDown');
		
		this.setState( (prevState) => ({
			displayDropDown: !prevState.displayDropDown,
			displayButton: !prevState.displayButton
		}))
		// alert(this.state.displayDropDown);
	}
		
	render(){
		
		let { selectedOption, displayDropDown, displayButton } = this.state;
		
		console.log('displayDropDown = ', displayDropDown);
		
		const { title, subtitle, cover } = this.props;
								
		return (
				<div className='book'>
					<div className='book__dropdown'>
						{ displayButton && (
							<button
								className='dropdown__button'
								onClick={this.toggleDropDown}
							></button>
						)}
						{ displayDropDown && (
							<div className='dropdown__content'>
									<h3 className='dropdown__title'>Move to...</h3>
									<Select 
										ref={(ref) => this.dropdown = ref}
										className='dropdown__list'
										name='Move to...'
										onBlurResetsInpu={false}
										autoFocus
										simpleValue
										searchable={false}
										clearable={false}
										value={selectedOption}
										onSelectResetInput={false}
										onChange={this.handleBookChange}
										onBlur={this.toggleDropDown}
										options={[
											{value: 'currentlyReading', label: 'Currently reading'},
											{value: 'wantToRead', label: 'Want to read'},
											{value: 'read', label: 'Have read'}
										]}
									/>
							</div>						
						)}
					</div>
					<img 
						className='book__img'
						alt='Book cover'
						src={cover}
					/>
					<div className='book__info'>
						<span className='book__title'><strong>{title}</strong></span>
						<span className='book__subtitle'>{subtitle}</span>
					</div>
				</div>

		)
	}
}

export default Book
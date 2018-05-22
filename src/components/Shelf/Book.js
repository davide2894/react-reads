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
				
		this.setState( (prevState) => ({
			displayDropDown: !prevState.displayDropDown,
			displayButton: !prevState.displayButton
		}))
				
	}
	
	componentDidMount(){
		BooksAPI.get(this.props.id).then( data =>
			this.setState({
				selectedOption: data.shelf
			})
		)
	}
	
		
	render(){
		
		let { selectedOption, displayDropDown, displayButton } = this.state;
		const { title, subtitle, cover } = this.props;
		console.log('Render Book');
		return (
				<div>
					{selectedOption && (
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
												className='dropdown__list'
												name='Move to...'
												onBlurResetsInpu={false}
												autoFocus
												simpleValue
												searchable={false}
												clearable={false}
												value={selectedOption ? selectedOption : 'none'}
												onSelectResetInput={false}
												removeSelected={false}
												onChange={this.handleBookChange}
												onBlur={this.toggleDropDown}
												options={[
													{value: 'currentlyReading', label: 'Currently reading'},
													{value: 'wantToRead', label: 'Want to read'},
													{value: 'read', label: 'Have read'},
													{value: 'none', label: 'None'}
												]}
											/>
									</div>						
								)}
							</div>
							<img 
								className='book__cover book__cover--placeholder'
								alt='Book cover'
								src={cover}
							/>
							<div className='book__info'>
								<span className='book__title'><strong>{title}</strong></span>
								<span className='book__subtitle'>{subtitle}</span>
							</div>
						</div>
					)}
				</div>
		)
	}
}

export default Book
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Search extends Component {
	
	render(){
		return(
			<div className='searchbar'>
				<div className='searchbar__content'>	
					<Link
						className='searchbar__link-to-home' 
						to={`${process.env.PUBLIC_URL}/`}
					/>
					<input 
						className='searchbar__input'
						placeholder='Search a book...'		
					/>
				</div>
			</div>
		)
	}
}

export default Search
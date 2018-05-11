import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
	
	render(){
		return (
			<div className='header'>
				<div className="header__content">
					<h1 className='header__title'>React Reads</h1>
					<Link 
						to='/search'
						className='header__search-link'
						title='Search a book'
					>
					</Link>
				</div>
			</div>
		)
	}
}



export default Header
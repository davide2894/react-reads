import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {

	onHeaderChange = () => {
		this.props.onChange()
	}

	
	render(){
		return (
			<div className='header'>
				<div className="header__content">
					<h1 className='header__title'>React Reads</h1>
					<Link 
						to={`${process.env.PUBLIC_URL}/search`}
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
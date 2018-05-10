import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
	
	render(){
		return (
			<div className='header-container'>
				<h1 className='header'>React Reads</h1>
				<Link 
					to='/search'
					className='search-link'
				>
				</Link>
			</div>
		)
	}
}



export default Header
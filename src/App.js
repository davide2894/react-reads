import React, { Component } from 'react';
import Header from './components/Header'
import Book from './components/Shelf/Book'
import * as BooksAPI from './utils/BooksAPI'
import { Route } from 'react-router-dom'

class App extends Component {	
			
	state = {
		books: []
	}
	
	getData(){
		BooksAPI.getAll().then((books) => {
			this.setState({books: books});
		})
	}
	
	componentDidMount(){
		this.getData();
	}
  	
    render() {
						
		return (
		  <Route 
			exact path='/' 
			render={()=>(
			  <div className="App" >
				<Header/>
				{this.state.books[0] && (<Book details={this.state.books[0]}/>) } 
			  </div>
			)}
		  />
		);
    }
}

export default App;

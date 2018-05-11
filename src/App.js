import React, { Component } from 'react';
import Header from './components/Header'
import Shelf from './components/Shelf/Shelf'
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
				<Shelf books={this.state.books}/>
			  </div>
			)}
		  />
		);
    }
}

export default App;

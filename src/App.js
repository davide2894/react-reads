import React, { Component } from 'react';
import Header from './components/Header'
import * as BooksAPI from './utils/BooksAPI'
import { Route } from 'react-router-dom'

class App extends Component {					
	
	componentDidMount(){
		BooksAPI.getAll().then((books) => {
			console.log(books);
		})	
	}
  	
    render() {
      return (
		  <Route 
		  	exact path='/' 
		  	render={()=>(
			  <div className="App">
				<Header/>
			  </div>
			)}
     	  />
      );
    }
}

export default App;

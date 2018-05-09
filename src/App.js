import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './utils/BooksAPI'

class App extends Component {					
	
	componentDidMount(){
		BooksAPI.getAll().then((books) => {
			console.log(books);
		})	
	}
  	
    render() {
      return (
        <div className="App">
          Hello World :) !!!
        </div>
      );
    }
}

export default App;

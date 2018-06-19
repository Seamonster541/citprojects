import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary.js';
import CaesarCypher from './CaesarCypher.js';
import CryptoAES from './CryptoAES';
import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';

//</CaesarCypher plaintext="" offsetNum={2} shiftLeft={true} />
//<CryptoAES test={this.state.state1} />
//App component 
export default class App extends Component {
    	
	constructor(props) {
    	super(props);		
    	this.state = {
    		text: '', 
    		secretKey: ''
    	}
    }

    handleOnChange = (event) => {
    	this.setState({
   			text: event.target.value,
   		});
    }
    
    
    handleOnChangeTwo = (event) => {
    	this.setState({
   			secretKey: event.target.value,
   		});
    }

  render() {

    return (   
    	<ErrorBoundary>	
     	<div className="container">
           	<h1>Cyphers</h1>
        	<input type="input" value={this.state.text} onChange = {this.handleOnChange.bind(this)} placeholder="Enter text to encrypt" size="50"/> <br />
        	<br />
        	<input type="input" value={this.state.secretKey} onChange = {this.handleOnChangeTwo.bind(this)} placeholder="Enter secret key"/>       		
      		<h2>Caesar</h2>
      		<CaesarCypher clearText={this.state.text} />
      		<h2>Crypto AES</h2> 
      		<CryptoAES clearText ={this.state.text} secretKey={this.state.secretKey} />
      	</div>
      	</ErrorBoundary>
    );
 
  }
}



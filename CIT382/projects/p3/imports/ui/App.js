import React, { Component } from 'react';
import { Image, Menu, Header, Segment } from 'semantic-ui-react';
import ErrorBoundary from './ErrorBoundary.js';
import Info from './Info.js'
import NumberGuess from './NumberGuess.js'
import CaesarCypher from './CaesarCypher.js'

//use in command meteor npm install --save react react-dom semantic-ui-react semantic-ui-css


export default class App extends Component {

	constructor(props) {
    	super(props);
    	this.state = {activeItem: 'menu1'};
	}

	handleMenuItemClick (e, { name }) {
    	this.setState({activeItem: name });
	}	


  render() {

  	let component = null;
    switch (this.state.activeItem) {
        case 'menu1':
            component = <Info />;
            break;
        case 'menu2':
            component = <NumberGuess />;
            break;
            
        case 'menu3':
            component = <CaesarCypher />;
            break;
    }

    return (

        <ErrorBoundary>
    	<div className="container">
        <Image src='/images/godzilla.jpg' size='small'/>
			<Menu>
    			<Menu.Item 
    				name="menu1" 
    				active={true}  
    				active={this.state.activeItem === 'menu1'} 
    				onClick={this.handleMenuItemClick.bind(this)}
    				>Info
    				</Menu.Item>
    			<Menu.Item 
    				name="menu2" 
    				active={true}  
    				active={this.state.activeItem === 'menu2'} 
    				onClick={this.handleMenuItemClick.bind(this)}
    				>Number Guess
    				</Menu.Item>
    			<Menu.Item 
    				name="menu3" 
    				active={true}  
    				active={this.state.activeItem === 'menu3'} 
    				onClick={this.handleMenuItemClick.bind(this)}
    				>Caesar Cypher
    				</Menu.Item>
			</Menu>
			{component}
			
      	</div>
        </ErrorBoundary>
    );
  }
}

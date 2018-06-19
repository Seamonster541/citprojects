import React, { Component } from 'react';
import { Menu, Header, Segment } from 'semantic-ui-react';
import ErrorBoundary from './ErrorBoundary.js';
import Students from './Students.js';
import BallGame from './BallGame.js';



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
            component = <Students />;
            break;
        case 'menu2':
            component = <BallGame />;
            break;
      
    }

    return (

        <ErrorBoundary>
    	<div className="container">
			<Menu>
    			<Menu.Item 
    				name="menu1" 
    				active={true}  
    				active={this.state.activeItem === 'menu1'} 
    				onClick={this.handleMenuItemClick.bind(this)}
    				>Student Info
    				</Menu.Item>
    			<Menu.Item 
    				name="menu2" 
    				active={true}  
    				active={this.state.activeItem === 'menu2'} 
    				onClick={this.handleMenuItemClick.bind(this)}
    				>Ball game
    				</Menu.Item>
			</Menu>
			{component}
			
      	</div>
        </ErrorBoundary>
    );
  }
}
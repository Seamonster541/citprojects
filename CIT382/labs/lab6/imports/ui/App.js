import React, { Component } from 'react';
import { Image, Menu, Header, Segment } from 'semantic-ui-react';
//use in command meteor npm install --save react react-dom semantic-ui-react semantic-ui-css
//simon eeds and rimi


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
            component = <MenuOne />;
            break;
        case 'menu2':
            component = <MenuTwo />;
            break;
        case 'menu3':
            component = <MenuThree />;
            break;
    }

    return (

    	<div className="container">
			<Menu>
    			<Menu.Item 
    				name="menu1" 
    				active={true}  
    				active={this.state.activeItem === 'menu1'} 
    				onClick={this.handleMenuItemClick.bind(this)}
    				>Menu 1
    				</Menu.Item>
    			<Menu.Item 
    				name="menu2" 
    				active={true}  
    				active={this.state.activeItem === 'menu2'} 
    				onClick={this.handleMenuItemClick.bind(this)}
    				>Menu 2
    				</Menu.Item>
    			<Menu.Item 
    				name="menu3" 
    				active={true}  
    				active={this.state.activeItem === 'menu3'} 
    				onClick={this.handleMenuItemClick.bind(this)}
    				>Menu 3
    				</Menu.Item>
			</Menu>
			{component}
			
      	</div>
    );
  }
}

class MenuOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowShift: 10,
            columnShift: 10,
        }
    }

    handleOnChangeR = (event) => {
        this.setState({
            rowShift: event.target.value,
        });
    }

        handleOnChangeC  = (event) => {
        this.setState({
            columnShift: event.target.value,
        });
    }

    render() {

        let row = [];
        let rowNum = this.state.rowShift;
        let colNum = this.state.columnShift;

        const min = 1;
        const max = 50;
        const minNum = 65;
        const maxNum = 90;
    
        for (let i = 0; i < rowNum; i++){

            let column =[];

            for (let i = 0; i < colNum; i++) {
                let randLetter = String.fromCharCode(Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum) + " ";
                column.push(randLetter);
            }

             row.push(column);
        }


        const listLetters = row.map((col, index) =>
        <div key={index}>
            <div ><span>{col}</span> </div>
        </div>
        );

        return (
            <Segment>

                <Header as="h1">Menu One</Header>
                <h1> Simon and Rimi</h1>
                <img src='/images/godzilla.jpg' />
                <br />

                Rows: 
                    <input type="range" id="row" min={min} max={max} value={rowNum} onChange={this.handleOnChangeR.bind(this)} />
                    {rowNum}
                    <br />

                Columns: 
                    <input type="range" id="column" min={min} max={max} value={colNum} onChange={this.handleOnChangeC.bind(this)} />
                    {colNum}
                    <br />

                Results:
                <br />
                <div >{listLetters}</div>

            </Segment>
        );
    }
}

class MenuTwo extends Component {
    render() {
        return (
            <Segment>
                <Header as="h1">Menu Two</Header>
                <img src='/images/godzilla.jpg' />
            </Segment>
        );
    }
}

class MenuThree extends Component {
    render() {
        return (
            <Segment>
                <Header as="h1">Menu Three</Header>
            </Segment>
        );
    }
}
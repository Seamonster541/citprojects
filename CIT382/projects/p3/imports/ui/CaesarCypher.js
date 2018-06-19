import React, { Component } from 'react';
import { Image, Menu, Header, Segment, Input, Icon, Checkbox } from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';

export default class CaesarCypher extends Component {


	constructor(props) {
		super(props);
		this.state = {
			numShift: 2,
			dirShift: true,
			text: '',
						
		}
	}

	handleShiftChange  = (valueAsNumber) => {
    	this.setState({
   			numShift: valueAsNumber,
   		});
    }

    handleDirection = (event) => {
    	this.setState({
    		dirShift: !this.state.dirShift,
    	});
    }

    handleOnChange = (event) => {
    	this.setState({
   			text: event.target.value,
   		});
    }


	encrypt(){
		//holder
		let codeMsg = '';

		//lower code for letters limits
		const lMax = 90;
		const lMin = 65;

		//upper code for letters limits
		const uMax = 122;
		const uMin = 97;

		//numbers
		const nRange = 48;
		const nDiv = 10;

		const letter = 26;


		for (let i = 0; i < this.state.text.length; i++){
			//grabs values of events
			let key = this.state.numShift
			let check = this.state.dirShift
			let msg = this.state.text;

			let caeMsg = msg[i];
			let code = msg.charCodeAt(i);

			if (caeMsg.match(/[a-z]/i)) {
				if (check == true){
					key = 0 - key + letter;
				}

				if (code >= lMin && code <= lMax){
					key = parseInt(key);
					caeMsg = String.fromCharCode(((code - lMin + key) %letter ) + lMin);
				}
				
				else if (code >= uMin && code <= uMax){
					key = parseInt(key);
					caeMsg = String.fromCharCode(((code - uMin + key) %letter ) + uMin);
					caeMsg = caeMsg.toUpperCase();
				}
			}
		
			if (caeMsg.match(/[0-9]/i)){
				if (check == true){
					key = 0 - key + nDiv;
				}

					key = parseInt(key);
					caeMsg = String.fromCharCode(((code - nRange + key) % nDiv ) + nRange);
			}
			codeMsg += caeMsg
		}
		return codeMsg;
	}

	    render() {
        return (
            <Segment>
                <Header as="h1">Caesar Cypher</Header>
                <Icon name='unlock' />
                Plain Text: <Input onChange={this.handleOnChange.bind(this)} placeholder='Enter text...' size='small' />
                <br />
                <Icon name='lock' />
				Ecrypted text: {this.encrypt()}
				<br />
                <NumericInput onChange={this.handleShiftChange.bind(this)} size={1} min={0} max={9} value={this.state.numShift} />
                <Checkbox onChange={this.handleDirection.bind(this)} checked={this.state.dirShift} label='Left shift'/>
            </Segment>
        );
    }
}

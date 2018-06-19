import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CryptoJS from'crypto-js';

export default class CaesarCypher extends Component {
	//define state here
	
	constructor(props) {
		super(props);
		this.state = {
			numShift: 2,
			dirShift: true,
			text: '',			
		}
	}

	//connects components and using props->text from App
	componentWillReceiveProps(props){
		this.setState({text: props.clearText})
	}


	handleOnChange  = (event) => {
    	this.setState({
   			numShift: event.target.value,
   		});
    }

    handleDirection = (event) => {
    	this.setState({
    		dirShift: event.target.checked,
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



	render(){
		const sMin = 0;
		const sMax = 9;
		return(
			<div className="Toybox">
				<h3>Ciphertext: {this.encrypt()}</h3>
				<input type="text" value={this.state.numShift} onChange={this.handleOnChange.bind(this)} />
				<input type="range" min={sMin} max={sMax} value={this.state.numShift} onChange={this.handleOnChange.bind(this)} />
				Left Shift: <input type="checkbox" checked={this.state.dirShift} value={this.state.dirShift} onChange={this.handleDirection.bind(this)} />
			</div>
			);
	}
}

//defines prop type
CaesarCypher.propTypes = {
	clearText: PropTypes.string.isRequired,
	offsetNum: PropTypes.number,
	shiftLeft: PropTypes.bool
}


//sets default values
CaesarCypher.defaultProps = {
	clearText: '',
	offsetNum: 2,
	shiftLeft: true
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';

export default class CryptoAES extends Component {
	constructor(props){
		super(props)
		this.state = {
			encryptedText: '',
			decryptedText: '',
		}
	}

	componentWillReceiveProps = (props) => {
		// Encrypt
		let ciphertext = CryptoJS.AES.encrypt(props.clearText,  props.secretKey);
		let cipherString = ciphertext.toString();
		this.setState({
			encryptedText: cipherString
		});
		// Decrypt
		let bytes = CryptoJS.AES.decrypt(ciphertext.toString(), props.secretKey);
		let plaintext = bytes.toString(CryptoJS.enc.Utf8);
		this.setState({
			decryptedText: plaintext
		});

	}

	render(){
		return(
			<div className="bottom">
				<span> cyphertext: {this.state.encryptedText} </span>
				<br />
				<span> plaintext: {this.state.decryptedText} </span>		
			</div>
		);
	}
}


CryptoAES.defaultProps={
	clearText:'',
	secretKey:'',
};

CryptoAES.propTypes = {
	clearText: PropTypes.string.isRequired,
	secretKey: PropTypes.string.isRequired
};
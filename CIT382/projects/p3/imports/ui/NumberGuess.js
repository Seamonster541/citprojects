import React, { Component } from 'react';
import { Header, Segment, Button, Input, Table } from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';
import {Enum} from 'enumify';

const game = Object.freeze({
	SETUP: Symbol('SETUP'),
	PLAY: Symbol('PLAY'),
	VICTORY: Symbol('VICTORY'),
	ERROR: Symbol('ERROR')
});

export default class NumberGuess extends Component {

	constructor(props){
		super(props);
		this.state = {
			stage: game.SETUP,
			lower: 1,
			upper: 100,
			min: 1,
			max: 100,
			size: 1,
			randNum: 0,
			guess: null,
			hint: null,
			counter: 0,
			lowGuess: '',
			highGuess: '',
			error: '',
			bool: false,
		}
	}

	handleMinChange = (valueAsNumber) => {
		this.setState({
			min: valueAsNumber,
		});
	}

	handleMaxChange = (valueAsNumber) => {
		this.setState({
			max: valueAsNumber,
		});
	}

	getRandomInteger = (event) => {
		let max = this.state.max
		let min = this.state.min
		//let random = Math.floor(Math.random() * (max - min + 1)) + min
		this.getRESTData(min, max);
		this.setState({
			stage: game.PLAY,
			bool: true,
		})
	}

	checkGuess = (event) => {
		let guess = parseInt(this.state.guess);
		let random = parseInt(this.state.randNum);
		//console.log(random)
		
		if (guess == random){
			this.setState({
				counter: this.state.counter+1,
				stage: game.VICTORY,
			})
		}
		else if (guess > random){
			this.setState({
				counter: this.state.counter+=1,
				hint: this.state.guess + ' Too High! (guess ' + this.state.counter + ')',
				highGuess:  this.state.highGuess+= this.state.guess + ', ',

			})
		}
		else if (guess < random) {
			this.setState({
				counter: this.state.counter+=1,
				hint: this.state.guess + ' Too Low! (guess ' + this.state.counter + ')',
				lowGuess:  this.state.lowGuess+= this.state.guess + ', ',
			})
		}

	}

	changeGuess = (event) => {
		this.setState({
			guess: event.target.value,
		})
	}

	changeReplay = (event) => {
		this.setState({
			stage: game.SETUP,
			min: 1,
			max: 100,
			counter: 0,
			hint: null,
			lowGuess: '',
			highGuess: '',
			bool: false,
		})
	}

	getRESTData(min, max) {
    // Call server-side method to return data
    // Why bind(this) below? See http://stackoverflow.com/questions/35581611/exception-in-delivering-result-of-invoking-typeerror-is-not-a-function-in-met
    // Note that setState is asynchronous, which means you should not immediately (sequentially) depend on a setState changing
    if (Meteor.isClient) {
      Meteor.call("getRestData", min, max, function(error, results) {
        try{
          if (error) {
            // Note: We will not be using Meteor error parameter, so it will always be undefined
            // See http://docs.meteor.com/api/methods.html#Meteor-Error if you want to use Meteor errors
            console.log("Error in retrieving data: " + error);
          } else {
            //let parsedResults = JSON.parse(results);
            if (results.error) {
              console.log("Error status code: " + results.error.statusCode);
              console.log("Error: " + results.error.error);
              this.setState({
              	stage: game.ERROR,
              	error: results.error.error
              })
            } else {
              this.setState({randNum: results.content});
            }
          }
        } catch (err) {
          console.log("Error in Meteor call: " + err);
        }
      }.bind(this));
    }
  }

//set abovecode with a set.state

	render() {

		let stage = null;
		switch (this.state.stage) {
			case game.SETUP:
				stage = (
					<Segment>
						<Header as="h4">Select the number range before you start to play. </Header>

        				between
        				<NumericInput onChange={this.handleMinChange.bind(this)} 
        					min={this.state.lower} 
        					max={this.state.max} 			
        					value={this.state.min}
        					size={this.state.size}
        				/>
        				and
       					<NumericInput onChange={this.handleMaxChange.bind(this)} 
       						min={this.state.min} 
       						max={this.state.upper}
       						value={this.state.max} 
       						size={this.state.size}
       					/>
        				<br />

        				<Button color='blue' loading={this.state.bool} onClick={this.getRandomInteger.bind(this)}>Play</Button>
    				</Segment>
					)
				break;
			
			case game.PLAY:
				stage = (
					<Segment>
						Guess a number between {this.state.min} and {this.state.max}
						<br />
						<Input onChange={this.changeGuess.bind(this)} placeholder='Guess a Number...'/>
						<Button onClick={this.checkGuess.bind(this)} color='blue'>Guess</Button>
						{this.state.hint}

						<Table unstackable>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>Low Guess</Table.HeaderCell>
									<Table.HeaderCell textAlign='right'>High Guess</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								<Table.Row>
									<Table.Cell>{this.state.lowGuess}</Table.Cell>
									<Table.Cell textAlign='right'>{this.state.highGuess}</Table.Cell>
								</Table.Row>
							</Table.Body>

						</Table>
			
					</Segment>
				);
				break;
			
			case game.VICTORY:
				stage = (
					<Segment>
					You correctly guessed the number {this.state.guess} in {this.state.counter} tries!
					<br />
					<Button onClick={this.changeReplay.bind(this)} color='blue'>Replay?</Button>
					</Segment>
				);
				break;
			
			case game.ERROR:
				stage = (
					<Segment>
						<Header as="h2">Oops, error! </Header><br />
						<Header as="h2">Error: {this.state.error} </Header>
					</Segment>
				)
		}

        return (
            <Segment>
                <Header as="h1">Number Guess Game!</Header>
                {stage}
                
            </Segment>
        );
    }
}
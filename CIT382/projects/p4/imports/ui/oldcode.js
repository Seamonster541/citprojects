import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Input, Table, Button, Icon, Label, List } from 'semantic-ui-react';
import _ from 'lodash';
import './scroll.css';
import {BarChart} from 'react-easy-chart';

export default class Students extends Component {
	constructor(props) {
		super(props);
		this.state = {
			students: new students(),
			name: '',
			score: '',
		}
	}

	nameChange = (event) => {
		this.setState({
			name: event.target.value,
		})
	}

	scoreChange = (event) => {
		this.setState({
			score: event.target.value,
		})		
	}

	addScore = () => {
		let students = _.cloneDeep(this.state.students);
		let score = parseInt(this.state.score);
		//let getStudent = {student: this.state.name, studentScore: score}
		students.add(this.state.name, score);
		//students.add(this.state.name, score);
		students.max(this.state.students.score);
		students.min(this.state.students.score);
		students.avg(this.state.students.score);
		
		let rows = [{display: this.state.name},{display: " "},{display: score}]
		let result = rows.map((row,index) => `${row.display}`)
		this.state.students.list.push(result)
		console.log(result)
		/*
		let rows = [{name: this.state.name}, {score: score}]
		let result = rows.map((row, index) =>
			<List.Item key={index}>
            	<Label>
            		{name} {score}<Icon name='remove' onClick={this.removeItem.bind(this)} data-key={index} />
            	</Label>
       		</List.Item>
        );*/
		//this.state.students.list.push(result);
		//<Label color='red' pointing='left'>Only numbers please </Label>	


		this.setState({
			name:'',
			score:'',			
		})
		this.forceUpdate();
		console.log(this.state.students.list)
	}

	clearScore = () => {
		let students = _.cloneDeep(this.state.students);
		students.clear();
		this.forceUpdate();
	}

	removeItem = (event) => {
		let students = _.cloneDeep(this.state.students)
		let index = event.target.dataset.key
		students.max(this.state.students.score);
		students.min(this.state.students.score);
		students.avg(this.state.students.score);
		students.remove(index);
		this.forceUpdate();
	}
//<Label color='red' pointing='left'>Only numbers please </Label>
	render () {
	
		let row = this.state.students.list;
		const displayList = row.map((display, index) => 
		<List.Item key={index}>
            	<Label>
            		{display}<Icon name='remove' onClick={this.removeItem.bind(this)} data-key={index} />
            	</Label>
        </List.Item>
        );

		

		return (
			<Segment.Group compact={true}>
				<Segment.Group horizontal>
					<Segment>
						<div id='scroll'>
							<List>
								{displayList}
							</List>
						</div>
					</Segment>
					<Segment> 
						<Table>
							<Table.Body>
								<Table.Row>
									<Table.Cell>Name:</Table.Cell>
									<Table.Cell><Input placeholder='Student name' value={this.state.name} onChange={this.nameChange.bind(this)} /></Table.Cell>
								</Table.Row>
								<Table.Row>
								<Table.Cell>Score:</Table.Cell>
									<Table.Cell>
										<Input  placeholder='Student score' value={this.state.score} onChange={this.scoreChange.bind(this)}/>
										<Label color='red' pointing='left'>Only numbers please </Label>								
									</Table.Cell>								
								</Table.Row>
							</Table.Body>
						</Table>
						<Button disabled={false} color='blue' onClick={this.addScore.bind(this)}>Add Score</Button>
						<Button color='black' onClick={this.clearScore.bind(this)}>Clear Scores</Button>
					</Segment>
				</Segment.Group>
				<Segment.Group horizontal>
					<Segment>
						<div id='divGrp'>
							<div>Count: {this.state.students.count}</div>
							<div>Maxium: {this.state.students.maxGrade}</div>
							<div>Minimum: {this.state.students.minGrade}</div>
							<div>Average: {this.state.students.avgGrade}</div>
						</div>
					</Segment>
					<Segment>
						<BarChart
						axisLabels={{x: 'Students Grade', y: 'Amount'}}
						axes
						yTickNumber={1}
						data={this.state.students.grade} />
					</Segment>
				</Segment.Group>
			</Segment.Group>
		)
	}
}

class students {

	constructor () {
		this.minGrade = 0.0;
		this.maxGrade = 0.0;
		this.avgGrade = 0.0;
		this.count = 0;
		this.students = [];
		this.score = [];
		this.list = [];
		this.grade = [
			{x: 'F', y: 0},
			{x: 'D', y: 0},
			{x: 'C', y: 0},
			{x: 'B', y: 0},
			{x: 'A', y: 0},
		]
	}

	add = (student, score) => {
		this.students.push(student);
		this.score.push(score)
		
		if (score >= 90 && score <= 100) {
			this.grade[4].y += 1;
		}
		if (score < 90 && score >= 80) {
			this.grade[3].y += 1;
		}
		if (score < 80 && score >= 70) {
			this.grade[2].y += 1;
		}
		if (score < 70 && score >= 60) {
			this.grade[1].y += 1
		}
		if (score < 60 && score >= 0) {
			this.grade[0].y += 1
		}
		this.count += 1;		
	}

	max = (arr) => {
		this.maxGrade = Math.max(...arr).toFixed(2);
	}

	min = (arr) => {
		this.minGrade = Math.min(...arr).toFixed(2);
	}

	avg = (arr) => {
		let sum = 0;
		for (let i = 0; i < arr.length; i++) {
			sum += arr[i];
		}
		
		this.avgGrade = (sum / arr.length).toFixed(2);
	}
	

	remove = (index) => {
		let score = this.score[index];
		score = parseInt(score);

		if (score >= 90 && score <= 100) {
			this.grade[4].y -= 1;
		}
		if (score < 90 && score >= 80) {
			this.grade[3].y -= 1;
		}
		if (score < 80 && score >= 70) {
			this.grade[2].y -= 1;;
		}
		if (score < 70 && score >= 60) {
			this.grade[1].y -= 1;
		}
		if (score < 60 && score >= 0) {
			this.grade[0].y -= 1;
		}
		this.students.splice(index, 1);
		this.score.splice(index, 1);
		this.list.splice(index, 1);

		console.log(this.score);
		console.log(this.students)

		this.count -= 1;	
	}


	clear = () => {
		this.score = [];
		this.students = [];
		this.list = [];
		this.maxGrade = 0;
		this.minGrade = 0;
		this.avgGrade = 0;
		this.count = 0;
		this.grade = [
			{x: 'F', y: 0},
			{x: 'D', y: 0},
			{x: 'C', y: 0},
			{x: 'B', y: 0},
			{x: 'A', y: 0},
		]		
	}
}
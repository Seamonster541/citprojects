import React, { Component } from 'react';
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
			disable: false,
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
		let getStudents = {student:this.state.name, score: this.state.score}
		students.studentsMath();

		if (this.state.score >= 0 && this.state.score <= 100 && this.state.score != ''){
			students.add(getStudents);
			students.studentsMath();
			
		
			this.setState({
				name:'',
				score:'',			
			})
		}

		this.forceUpdate();
	}

	clearScore = () => {
		let students = _.cloneDeep(this.state.students);
		students.clear();
		this.setState({
			name:'',
			score:'',			
		})

		this.forceUpdate();
	}

	removeItem = (event) => {
		let students = _.cloneDeep(this.state.students)
		let index = event.target.dataset.key
		students.remove(index);
		students.studentsMath();

		this.forceUpdate();
	}
	render () {
	let rows = this.state.students.students
	const displayList = rows.map((row,index) => 
		<List.Item key={index}>
			<Label> 
				{row.student}  {row.score} <Icon onClick={this.removeItem.bind(this)} name="remove" data-key={index}/>
			</Label>
		</List.Item>)
	let error = null;

	let score = this.state.score;
	if (score >= 0 && score <= 100){

	}
	else {
		error = (
			<Label color='red' pointing='left'>Only numbers between 1 and 100 please</Label>
		)
	}

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
										{error}							
									</Table.Cell>								
								</Table.Row>
							</Table.Body>
						</Table>
						<Button disabled={this.state.disable} color='blue' onClick={this.addScore.bind(this)}>Add Score</Button>
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
		this.grade = [
			{x: 'F', y: 0},
			{x: 'D', y: 0},
			{x: 'C', y: 0},
			{x: 'B', y: 0},
			{x: 'A', y: 0},
		]
	}

	add = (student) => {
		this.students.push(student);
		let score = parseInt(student.score);
		
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

	studentsMath = () => {
		let arr = [];
		let sum = 0;

		for (let i=0; i < this.students.length; i++){
			let score = parseInt(this.students[i].score);
			arr.push(score);
			sum += score;
		}

		this.maxGrade = Math.max(...arr).toFixed(2);
		this.minGrade = Math.min(...arr).toFixed(2);
		this.avgGrade = (sum / arr.length).toFixed(2);
	}

	remove = (index) => {
		let score = this.students[index].score;
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

		this.count -= 1;	
	}

	clear = () => {
		this.students = [];
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
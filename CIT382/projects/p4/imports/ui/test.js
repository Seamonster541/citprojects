import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import SegmentGroup, { List, Label, Icon, Table, Image, Menu, Header, Segment } from 'semantic-ui-react';
import React, { Component } from 'react';
import _ from 'lodash';
import {BarChart} from 'react-easy-chart';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {studentName: '', Students: new Students(), studentScore: 0};
    }
    handleOnClick(event){
        let student_list = {student:this.state.studentName, score: this.state.studentScore}
        let studentScore = _.cloneDeep(this.state.Students)
        studentScore.add(student_list)
        this.setState({Students: studentScore})

        console.log(studentScore)
    }
    handleOnDelete(event){
      let index =  event.target.dataset.key;
      let studentClear = _.cloneDeep(this.state.Students)
      studentClear.delete(index)
      this.setState({Students: studentClear})
    }
    handleOnClear(event){
      this.setState({studentName:'', studentScore:0, Students: new Students()})
    };

    handleChangeName(event){
  this.setState({studentName: event.target.value})}
  handleChangeScore(event){
    this.setState({studentScore: event.target.value})}
    render() {
        return (
            <div>
            <Segment.Group horizontal>
            <Segment>
            <Table>
                <Table.Body>
                <Table.Row>
                <Table.Cell> Name:</Table.Cell>
                <Table.Cell> <input type="text1" placeholder="Student name" value= {this.state.studentName} onChange={this.handleChangeName.bind(this)}/> </Table.Cell></Table.Row>
                <Table.Row>
                <Table.Cell>Score: </Table.Cell>
                <Table.Cell><input type="text2" placeholder="Student score" value= {this.state.studentScore} onChange={this.handleChangeScore.bind(this)}/> </Table.Cell></Table.Row>

                </Table.Body></Table>

                <button className="ui primary button"  onClick={this.handleOnClick.bind(this)}>
            Add Score </button>
            <button className="ui secondary button" onClick={this.handleOnClear.bind(this)}>
            Clear Scores </button>
            </Segment>
            <Segment>
            <List>
            {this.state.Students.finalStudents.map((firstValue,index) => <List.Item key={index}><Label> <Icon onClick={this.handleOnDelete.bind(this)} name="delete" data-key={index}/>{firstValue.student}  {firstValue.score}</Label></List.Item>)}
            </List>
            </Segment>
            </Segment.Group>
            <Segment.Group>
            <div>
            Count:{this.state.Students.finalStudents.length}
            </div> <div>
            Max: {this.state.Students.max()}</div>
            <div> Min: {this.state.Students.min()}</div>
            <div> Average: {this.state.Students.avg()} </div>
            </Segment.Group>
            <Segment.Group>
              <BarChart
                axisLabels={{ x: 'StudentGrade', y: 'Amount' }}
                width= {450}
                height= {250}
                yTickNumber={5}
                colorBars axes
                data={this.state.Students.data}
              />
            </Segment.Group>
            </div>


        );
    }
  }
  class Students{
      constructor(){
          this.finalStudents=[];
          this.data = [{x: 'A', y: 0},{x:'B', y: 0}, {x:'C', y: 0}, {x:'D', y:0}, {x:'F', y:0}];

      }

      add(student_list){
          this.finalStudents.push(student_list);
          console.log(this.finalStudents);
          let newData = parseInt(student_list.score)
          if (newData >= 90 && newData<= 100){
            this.data[0].y += 1;
          }
          console.log(this.data)
          if (newData >= 80 && newData < 90){
            this.data[1].y += 1;
          }
          if (newData >= 70 && newData < 80){
            this.data[2].y += 1;
          }
          if (newData >= 60 && newData < 70){
            this.data[3].y += 1;
          }
          if ( newData < 60){
            this.data[4].y += 1;
          }

      }

      min(){
          let findMin = 0;
          if (this.finalStudents.length == 0){
            return findMin};
          let num = [];
          for (var i=0; i < this.finalStudents.length; i++){
              let finalscore = parseInt(this.finalStudents[i].score);
              num.push(finalscore);

          }
          console.log(num);
          findMin = Math.min(...num);
          return findMin;
      }
      max(){
          let findMin = 0;
          if (this.finalStudents.length == 0){
            return findMin};
          let num = [];
          for (var i=0; i < this.finalStudents.length; i++){
              let finalscore = parseInt(this.finalStudents[i].score);
              num.push(finalscore);

          }
          console.log(num);
          let findMax = Math.max(...num);
          return findMax;
      }
      avg(){
        let total = 0
        let findMin = 0;
        if (this.finalStudents.length == 0){
          return findMin};
        let num = 0;
        for (var i=0; i < this.finalStudents.length; i++){
            let finalscore = parseInt(this.finalStudents[i].score);
            num += finalscore;
        if (finalscore.length >= 1){
            total = num/final.length

      }

      return total;
    }
  }
  delete(index){
    let newData = this.finalStudents[index].score
    console.log(newData)
    newData = parseInt(newData)
    if (newData >= 90 && newData<= 100){
      this.data[0].y -= 1;
    }
    console.log(this.data)
    if (newData >= 80 && newData < 90){
      this.data[1].y -= 1;
    }
    if (newData >= 70 && newData < 80){
      this.data[2].y -= 1;
    }
    if (newData >= 60 && newData < 70){
      this.data[3].y -= 1;
    }
    if ( newData < 60){
      this.data[4].y -= 1;
    }
    this.finalStudents.splice(index,1)

  }

}
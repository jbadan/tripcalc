import React, { Component } from 'react';
import MemberList from './MemberList';
import AddMember from './AddMember';
import AddExpense from './AddExpense';
//flexbox
import { Grid, Row, Col } from 'react-flexbox-grid';
//material-ui
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberList: [
        {
          name: 'Louis',
          payments: [5.75, 35.00, 12.79]
        },
        {
          name: 'Carter',
          payments: [12.00, 15.00, 23.23]
        },
        {
          name: 'David',
          payments: [10.00, 20.00, 38.41, 45.00]
        }]
    }
  }


  liftMemberList = (updateMemberList) => {
    this.setState({
      memberList: updateMemberList
    })
  };
  add = (a, b) => {
    return a + b;
  };

  render() {
    let grandTotal = 0;
    this.state.memberList.map((person, index) => {
        grandTotal += +(person.payments.reduce(this.add, 0).toFixed(2))
    })
    return (
      <Grid fluid>
        <Row center="xs">
          <h1> Roadtrip Calculator </h1>
        </Row>
        <Row>
          <Col xs>
            <Paper zDepth={2}>
              <AddMember memberList={this.state.memberList} liftMemberList={this.liftMemberList}/>
              <AddExpense memberList={this.state.memberList} liftMemberList={this.liftMemberList}/>
              <MemberList memberList={this.state.memberList}/>
            </Paper>
          </Col>
        </Row>
        <Row>
          <Col xs>
            <h4>Grand Total: ${grandTotal}</h4>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Main;

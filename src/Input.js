import React, { Component } from 'react';
import PersonList from './PersonList';
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

class Input extends Component {
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

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs>
            <Paper zDepth={2}>
              <AddMember memberList={this.state.memberList} liftMemberList={this.liftMemberList}/>
              <AddExpense memberList={this.state.memberList} liftMemberList={this.liftMemberList}/>
              <PersonList memberList={this.state.memberList}/>
              <div>input</div>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Input;

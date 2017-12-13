import React, { Component } from 'react';
import PersonList from './PersonList';
//flexbox
import { Grid, Row, Col } from 'react-flexbox-grid';
//material-ui
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberList: ['Louis', 'Carter', 'David'],
      newName: '',
      dialogOpen: false
    }
  }

  openDialog = () => {
    this.setState({dialogOpen: true})
  };

  handleClose = () => {
    this.setState({dialogOpen: false});
  };

  nameChange = (e) => {
    this.setState({newName: e.target.value})
  };

  addMember = () => {
    let memberListAdd = this.state.memberList;
    memberListAdd.push(this.state.newName);
    this.setState({
      dialogOpen: false,
      memberList: memberListAdd
    })
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.addMember}
      />,
    ];
    return (
      <Grid fluid>
        <Row>
          <Col xs>
            <Paper zDepth={2}>
              <RaisedButton
                label="Add Member"
                primary={true}
                onClick={this.openDialog}
                />
              <Dialog
                title="Add a New Member"
                actions={actions}
                modal={false}
                open={this.state.dialogOpen}
                onRequestClose={this.handleClose}
              >
              <TextField
                floatingLabelText="Name"
                onChange={(e) => this.nameChange(e)}
                value= {this.state.newName}
              />
              </Dialog>

              <PersonList />
              <div>input</div>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Input;

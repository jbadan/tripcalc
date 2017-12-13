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
        }],
      newName: '',
      newPayment: 0,
      dialogOpen: false,
      dialogOpenPayment: false,
      selectedMember: 0
    }
  }

  openDialog = () => {
    this.setState({dialogOpen: true})
  };
  openDialogPayment = () => {
    this.setState({dialogOpenPayment: true})
  };

  handleClose = () => {
    this.setState({dialogOpen: false});
  };
  handleClosePayment = () => {
    this.setState({dialogOpenPayment: false});
  };

  nameChange = (e) => {
    this.setState({newName: e.target.value})
  };
  selectedMember = (e) => {
    this.setState({selectedMember: e.target.value})
  };
  paymentChange = (e) => {
   this.setState({
     newPayment: e.target.value
   })
  };

  addPayment = () => {
    let editMemberList = this.state.memberList;
    let index = this.state.selectedMember;
    editMemberList[index].payments.push(this.state.newPayment);
    this.setState({
      memberList: editMemberList
    })
  };

  addMember = () => {
    let memberListAdd = this.state.memberList;
    memberListAdd.push({name: this.state.newName});
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
    const actionsPayment = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClosePayment}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.addPayment}
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
                <RaisedButton
                  label="Add New Expense"
                  secondary={true}
                  onClick={this.openDialogPayment}
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

              <Dialog
                  title="Add Expense"
                  actions={actionsPayment}
                  modal={false}
                  open={this.state.dialogOpenPayment}
                  onRequestClose={this.handleClosePayment}
              >
              <SelectField
                hintText="Select a member"
                value={this.state.value}
                onChange={this.selectedMember}
              >
                {this.state.memberList.map((person, index) => {
                  return(
                    <MenuItem value={index} primaryText={person.name} />
                  )})}
              </SelectField>
                <TextField
                   floatingLabelText="Amount ($)"
                   type="number"
                   onChange={(e) => this.paymentChange(e)}
                   value={this.state.newPayment}
                 />
              </Dialog>

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

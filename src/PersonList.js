import React, { Component } from 'react';

//material-ui
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class PersonList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      memberList: this.props.memberList,
      dialogOpen: false
    }
  }
  openDialog = () => {
    this.setState({dialogOpen: true})
  };
  handleClose = () => {
   this.setState({dialogOpen: false});
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
        onClick={this.handleClose}
      />,
    ];
    return (
      <div>
      <Dialog
          title="Add Payments"
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleClose}
      >
      <TextField
         floatingLabelText="Amount"
         type="number"
         prefix='$'
       />
      </Dialog>
        <List>
        {this.props.memberList.map((person, index) => {
          return(
            <div>
              <ListItem
                  key={index}
                  value={person}
                  primaryText={person.name}
                  primaryTogglesNestedList={true}
                  nestedItems=
                    {person.payments.map((payment, index) => {
                      return(
                        <ListItem
                          key={index}
                          primaryText={payment}
                        />
                      )
                  })}
              />
              <FlatButton
                label="Add Payment"
                secondary={true}
                onClick={this.openDialog}
              />
            </div>
          )
        })}
        </List>
      </div>
    );
  }
}

export default PersonList;

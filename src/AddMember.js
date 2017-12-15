import React, { Component } from 'react';

//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class AddMember extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dialogOpen: false,
      newName: '',
    }
  }
  openDialog = () => {
    this.setState({dialogOpen: true})
  };
  handleClose = () => {
    this.setState({
      dialogOpen: false,
      newName: ''
    });
  };
  nameChange = (e) => {
    this.setState({newName: e.target.value})
  };
  addMember = () => {
    let updateMemberList = this.props.memberList;
    updateMemberList.push({name: this.state.newName, payments:[]});
    this.props.liftMemberList(updateMemberList);
    this.setState({
      dialogOpen: false,
      newName: ''
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
      <div>
        <RaisedButton
          label="Add New Member"
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
      </div>
    );
  }
}

export default AddMember;

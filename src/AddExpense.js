import React, { Component } from 'react';

//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class AddExpense extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dialogOpen: false,
      newPayment: 0,
      selectedMember: 0,
      value: 0,
      errorText: ''
    }
  }
  openDialog= () => {
    this.setState({dialogOpen: true})
  };

  handleClose = () => {
    this.setState({
      dialogOpen: false,
      newPayment: 0,
      value: 0
    });
  };


  selectedMember = (event, index, value) => this.setState({value});

  paymentChange = (e) => {
   this.setState({
     newPayment: e.target.value
   })
  };

  addPayment = () => {
    let updateMemberList = this.props.memberList;
    let index = this.state.value;
    //regex- commas, periods optional- must be in currency format
    let isCurrency = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/.test(this.state.newPayment);
    if(isCurrency === true){
      updateMemberList[index].payments.push(Number(this.state.newPayment));
      this.props.liftMemberList(updateMemberList);
      this.setState({
        dialogOpen: false,
        newPayment: 0,
        value: 0
      })
    }else{
      this.setState({
        errorText: "Please enter a valid dollar amount"
      })
    }
  };
  render() {
    return (
      <div className="inline">
        <RaisedButton
          label="Add New Expense"
          secondary={true}
          onClick={this.openDialog}
        />
        <Dialog
            title="Add Expense"
            actions={[
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
              />,
              <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.addPayment}
              />,
            ]}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this.handleClose}
        >
          <SelectField
            hintText="Select a member"
            value={this.state.value}
            onChange={this.selectedMember}
          >
            {this.props.memberList.map((person, index) => {
              return(
                <MenuItem value={index} key={index} primaryText={person.name} />
              )})}
          </SelectField>
            <TextField
               floatingLabelText="Amount ($)"
               type="number"
               errorText={this.state.errorText}
               onChange={(e) => this.paymentChange(e)}
               value={this.state.newPayment}
             />
        </Dialog>
      </div>
    );
  }
}

export default AddExpense;

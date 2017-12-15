import React, { Component } from 'react';

//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';


class ExpenseReport extends Component {
  constructor (props) {
    super(props)
    this.state = {
      finalOutput: [],
      open: false,
    }
  }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  add = (a, b) => {return a + b;};

  calculate = () => {
    let grandTotal=0;
    let nameAndTotal = [];
    let output = [];
    //calculating total expenditure (grand total and PP total)
    this.props.memberList.map((person, index) => {
        nameAndTotal.push({name: person.name, amount:person.payments.reduce(this.add, 0)});
        grandTotal += person.payments.reduce(this.add, 0);
    })
    //calculating total per person
    let expensePerPerson = 0;
    if(grandTotal > 0) {
      expensePerPerson = grandTotal/this.props.memberList.length;
    }
    //calculating difference between per person and actual amount spent - let's us know if person is owed or owes $$
    let nameAndDifference = [];
    for(let i=0; i<nameAndTotal.length; i++){
      nameAndDifference.push({name:nameAndTotal[i].name, difference: (expensePerPerson - nameAndTotal[i].amount)});
    }
    //sort least to greatest- (creditors --> debtors)
    nameAndDifference.sort(function(a,b) {return (a.difference > b.difference) ? 1 : ((b.difference > a.difference) ? -1 : 0);} );
    let copyArray = nameAndDifference;
    //loop through each person - copyArray[k].difference is amount to pay back
    for(let j=0; j<copyArray.length; j++){
      for(let k=copyArray.length-1; k>0; k--){
        if(typeof copyArray[j] !== "undefined"){
          if(copyArray[j].difference === 0){
            copyArray.splice(j, 1);
          }else if(copyArray[j].difference < 0 && copyArray[k].difference > 0){
                copyArray[j].difference += copyArray[k].difference;
                output.push(copyArray[k].name + " pays " + copyArray[j].name + " $"+ +(copyArray[k].difference).toFixed(2)+".");
                copyArray[k].difference = 0;
          }
        }
      }
    }
      this.setState({
        finalOutput: output,
        open: true
      })
    }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ];
    return (
      <div>
        <RaisedButton label="Calculate" fullWidth={true} onClick={this.calculate} />
        <Dialog
          title="The Breakdown"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <List>
            {this.state.finalOutput.map((sentence, index) => {
              return(
                <ListItem
                  key={index}
                  primaryText={sentence}
                />
              )
            })}
          </List>
        </Dialog>
      </div>
    );
  }
}

export default ExpenseReport;

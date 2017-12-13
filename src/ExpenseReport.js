import React, { Component } from 'react';

//material-ui
import RaisedButton from 'material-ui/RaisedButton'


class ExpenseReport extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  add = (a, b) => {
    return a + b;
  };

  calculate = () => {
    let grandTotal=0;
    let nameAndTotal = [];
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
    console.log(nameAndDifference);
    //sort least to greatest- (creditors --> debtors)
    nameAndDifference.sort(function(a,b) {return (a.difference > b.difference) ? 1 : ((b.difference > a.difference) ? -1 : 0);} );
    console.log(nameAndDifference);
    let copyArray = nameAndDifference;
    for(let j=0; j<copyArray.length; j++){
      for(let k=copyArray.length-1; k>0; k--){
        if(copyArray[j].difference === 0){
          copyArray.splice(j, 1);
        }else if(copyArray[j].difference < 0 && copyArray[k].difference > 0){
              copyArray[j].difference += copyArray[k].difference;
              copyArray[k].difference = 0;
          }
        }
      }
      console.log(copyArray);

    // for(let j=0; j<differenceArray.length; j++){
    //     for(let k=differenceArray.length-1; k>=0; k--){
    //       if(differenceArray[j] != 0 && differenceArray[k] > 0){
    //       differenceArray[j] += differenceArray[k];
    //       differenceArray[k] = 0;
    //     }
    //   }
    // }
    // console.log(differenceArray);

    }

  render() {

    return (
      <div>
        <RaisedButton label="Calculate" fullWidth={true} onClick={this.calculate} />

      </div>
    );
  }
}

export default ExpenseReport;

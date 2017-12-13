import React, { Component } from 'react';

//material-ui
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class MemberList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      memberList: this.props.memberList,
    }
  }
  add = (a, b) => {
    return a + b;
  }
  render() {
    return (
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
                        primaryText={"$"+payment}
                      />
                    )
                })}
            />
            <div className="total">
            Total Expenditure: ${+((person.payments.reduce(this.add, 0)).toFixed(2))}
            </div>
          </div>
        )
      })}
      </List>
    );
  }
}

export default MemberList;

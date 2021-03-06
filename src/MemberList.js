import React, { Component } from 'react';

//material-ui
import {List, ListItem} from 'material-ui/List';

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
      <div>
        <List>
        {this.props.memberList.map((person, index) => {
          return(
            <div key={index}>
              <ListItem
                  key={index}
                  className="listItems"
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
      </div>
    );
  }
}

export default MemberList;

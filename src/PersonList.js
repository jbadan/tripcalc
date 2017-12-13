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
    }
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
                        primaryText={payment}
                      />
                    )
                })}
            />
          </div>
        )
      })}
      </List>
    );
  }
}

export default PersonList;

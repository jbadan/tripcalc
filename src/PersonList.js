import React, { Component } from 'react';

//material-ui
import {List, ListItem} from 'material-ui/List';


class PersonList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      memberList: this.props.memberList
    }
  }
  render() {
    return (
      <List>
      {this.props.memberList.map((person, index) => {
        return(
          <ListItem
              key={index}
              value={person}
              primaryText={person.name}
              primaryTogglesNestedList={true}
              nestedItems={[]}
          />
        )}
      )}
      </List>
    );
  }
}

export default PersonList;

import React from "react";
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render } from 'react-dom';
import MemberList from '../MemberList';

Enzyme.configure({ adapter: new Adapter() })
jest.mock('react-dom');

describe("MemberList", () => {
  let props;
  let mountedMemberList;
  const memberList = () => {
    if (!mountedMemberList) {
      mountedMemberList = shallow(
        <MemberList {...props} />
      );
    }
    return mountedMemberList;
  }

  beforeEach(() => {
    props = {
      memberList: [
        {name: 'Louis', payments: [5.75, 35.00, 12.79]},
        {name: 'Carter',payments: [12.00, 15.00, 23.23]},
        {name: 'David', payments: [10.00, 20.00, 38.41, 45.00]}
      ],
    };
    mountedMemberList = undefined;
  });

  it("always renders a List", () => {
    const divs = memberList().find("List");
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("contains everything else that gets rendered", () => {
      const divs = memberList().find("div");
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(memberList().children());
    });
  });

  it('renders mapped memberList list items correctly', () => {
      const memberListItems =  [
        {name: 'Louis', payments: [5.75, 35.00, 12.79]},
        {name: 'Carter',payments: [12.00, 15.00, 23.23]},
        {name: 'David', payments: [10.00, 20.00, 38.41, 45.00]}
      ];
      expect(memberList().find('List').children().length).toBe(memberListItems.length);
      expect(memberList().find('List').children().find('ListItem').length).toBe(memberListItems.length);

  });
  it('renders mapped payment list items correctly', () => {
      const memberListItems =  [
        {name: 'Louis', payments: [5.75, 35.00, 12.79]},
        {name: 'Carter',payments: [12.00, 15.00, 23.23]},
        {name: 'David', payments: [10.00, 20.00, 38.41, 45.00]}
      ];
        memberList().find('List').children().find('ListItem').children().find('ListItem').forEach((node) => {
          expect(node.length.toBe(memberListItems.payments.length));
      })

  });
});

import React from "react";
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render } from 'react-dom';
import MemberList from '../AddMember';

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

  it("always renders a div", () => {
    const divs = memberList().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("contains everything else that gets rendered", () => {
      const divs = memberList().find("div");
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(memberList().children());
    });
  });

  describe("the rendered List", () => {
    it("maps the memberList prop", () => {
      const lists = memberList().find("div");
      console.log(lists);
      expect(lists.children().find('div')).to.have.length(props.memberList.length);
    });
  });

});

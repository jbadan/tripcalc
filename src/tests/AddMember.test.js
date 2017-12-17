import React from "react";
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render } from 'react-dom';
import AddMember from '../AddMember';

Enzyme.configure({ adapter: new Adapter() })
jest.mock('react-dom');

describe("AddMember", () => {
  let props;
  let mountedAddMember;
  const addMember = () => {
    if (!mountedAddMember) {
      mountedAddMember = shallow(
        <AddMember {...props} />
      );
    }
    return mountedAddMember;
  }

  beforeEach(() => {
    props = {
      liftMemberList: undefined,
      memberList: [
        {name: 'Louis', payments: [5.75, 35.00, 12.79]},
        {name: 'Carter',payments: [12.00, 15.00, 23.23]},
        {name: 'David', payments: [10.00, 20.00, 38.41, 45.00]}
      ],
    };
    mountedAddMember = undefined;
  });

  it("always renders a div", () => {
    const divs = addMember().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("contains everything else that gets rendered", () => {
      const divs = addMember().find("div");
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(addMember().children());
    });
  });

describe("RaisedButton", () => {
  it('click should open dialog', () => {
    const addMember = shallow(<AddMember {...props} />);
    expect(addMember.state().dialogOpen).toEqual(false);
    const raisedButton = addMember.find("RaisedButton");
    raisedButton.simulate('click');
    expect(addMember.state().dialogOpen).toEqual(true);
  });
});

describe('openDialog()/handleClose()', () => {
  it('should change dialogOpen state', () => {
    const addMember = shallow(<AddMember {...props} />);
    expect(addMember.state().dialogOpen).toEqual(false);
    addMember.instance().openDialog();
    expect(addMember.state().dialogOpen).toEqual(true);
    addMember.instance().handleClose();
    expect(addMember.state().dialogOpen).toEqual(false);
    expect(addMember.state().newName).toEqual('');
  });
});

describe('nameChange() ', () => {
  it('should change newName state', () => {
    const addMember = shallow(<AddMember {...props} />);
    expect(addMember.state().newName).toEqual('');
    const eventObject  = value => ({ currentTarget: { value }, target: { value } });
    const textField = addMember.find("TextField").props().onChange(eventObject('Jenna'));
    expect(addMember.state().newName).toEqual('Jenna');
  });
});

});

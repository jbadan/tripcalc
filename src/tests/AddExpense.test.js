import React from "react";
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render } from 'react-dom';
import AddExpense from '../AddExpense';

Enzyme.configure({ adapter: new Adapter() })
jest.mock('react-dom');

describe("AddExpense", () => {
  let props;
  let mountedAddExpense;
  const addExpense = () => {
    if (!mountedAddExpense) {
      mountedAddExpense = shallow(
        <AddExpense {...props} />
      );
    }
    return mountedAddExpense;
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
    mountedAddExpense = undefined;
  });

  it("always renders a div", () => {
    const divs = addExpense().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("contains everything else that gets rendered", () => {
      const divs = addExpense().find("div");
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(addExpense().children());
    });
  });

describe("RaisedButton", () => {
  it('click should open dialog', () => {
    const addExpense = shallow(<AddExpense {...props} />);
    expect(addExpense.state().dialogOpen).toEqual(false);
    const raisedButton = addExpense.find("RaisedButton");
    raisedButton.simulate('click');
    expect(addExpense.state().dialogOpen).toEqual(true);
  });
});

describe('openDialog()/handleClose()', () => {
  it('should change dialogOpen state', () => {
    const addExpense = shallow(<AddExpense {...props} />);
    expect(addExpense.state().dialogOpen).toEqual(false);
    addExpense.instance().openDialog();
    expect(addExpense.state().dialogOpen).toEqual(true);
    addExpense.instance().handleClose();
    expect(addExpense.state().dialogOpen).toEqual(false);
    expect(addExpense.state().newPayment).toEqual(0);
    expect(addExpense.state().value).toEqual(0);
  });
});

describe('paymentChange() ', () => {
  it('paymentChange() should change newPayment state', () => {
    const addExpense = shallow(<AddExpense {...props} />);
    expect(addExpense.state().newPayment).toEqual(0);
    const eventObject  = value => ({ currentTarget: { value }, target: { value } });
    const textField = addExpense.find("TextField").props().onChange(eventObject(100));
    expect(addExpense.state().newPayment).toEqual(100);
  });
});

});

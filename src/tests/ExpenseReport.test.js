import React from "react";
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render } from 'react-dom';
import ExpenseReport from '../ExpenseReport';

Enzyme.configure({ adapter: new Adapter() })
jest.mock('react-dom');

describe("ExpenseReport", () => {
  let props;
  let mountedExpenseReport;
  const expenseReport = () => {
    if (!mountedExpenseReport) {
      mountedExpenseReport = shallow(
        <ExpenseReport {...props} />
      );
    }
    return mountedExpenseReport;
  }

  beforeEach(() => {
    props = {
      memberList: [
        {name: 'Louis', payments: [5.75, 35.00, 12.79]},
        {name: 'Carter',payments: [12.00, 15.00, 23.23]},
        {name: 'David', payments: [10.00, 20.00, 38.41, 45.00]}
      ],
    };
    mountedExpenseReport = undefined;
  });

  it("always renders a div", () => {
    const divs = expenseReport().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("contains everything else that gets rendered", () => {
      const divs = expenseReport().find("div");
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(expenseReport().children());
    });
  });


});

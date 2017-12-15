import React from "react";
import { shallow, mount, render } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Main from "./Main";
import MemberList from './MemberList';
import AddMember from './AddMember';
import AddExpense from './AddExpense';
import ExpenseReport from './ExpenseReport';


Enzyme.configure({ adapter: new Adapter() })

describe("Main", () => {
  let props;
  let mountedMain;
  const main = () => {
    if (!mountedMain) {
      mountedMain = shallow(
        <Main {...props} />
      );
    }
    return mountedMain;
  }

  beforeEach(() => {
    mountedMain = undefined;
  });

it("always renders a grid", () => {
  const grids = main().find("Grid");
  expect(grids.length).toBeGreaterThan(0);
});

describe("the rendered grid", () => {
  it("contains everything else that gets rendered", () => {
    const grids = main().find("Grid");
    const wrappingDiv = grids.first();
    expect(wrappingDiv.children()).toEqual(main().children());
  });
});

it("always renders a `AddMember`", () => {
  expect(main().find(AddMember).length).toBe(1);
});

describe("rendered `AddMember`", () => {
  it("does receive 2 props", () => {
    const addMember = main().find(AddMember);
    expect(Object.keys(addMember.props()).length).toBe(2);
  });
});


it("always renders a `AddExpense`", () => {
  expect(main().find(AddExpense).length).toBe(1);
});

describe("rendered `AddExpense`", () => {
  it("does receive 2 props", () => {
    const addExpense = main().find(AddExpense);
    expect(Object.keys(addExpense.props()).length).toBe(2);
  });
});

it("always renders a `MemberList`", () => {
  expect(main().find(MemberList).length).toBe(1);
});

describe("rendered `MemberList`", () => {
  it("does receive 1 prop", () => {
    const memberList = main().find(MemberList);
    expect(Object.keys(memberList.props()).length).toBe(1);
  });
});

it("always renders a `ExpenseReport`", () => {
  expect(main().find(ExpenseReport).length).toBe(1);
});

describe("rendered `ExpenseReport`", () => {
  it("does receive 1 prop", () => {
    const expenseReport = main().find(ExpenseReport);
    expect(Object.keys(expenseReport.props()).length).toBe(1);
  });
});

});

import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ListItems from "./ListItem";

configure({ adapter: new Adapter() });

const setup = (props = {}) => {
  const wrapper = shallow(<ListItems {...props} />);
  return wrapper;
};

test("handling delete function", () => {
  const wrapper = setup();
  const spy = jest.spyOn(wrapper.instance(), "deleteItem");
  const expected = { key: 123 };
  wrapper
    .find(`[data-test="delete-btn"]`)
    .find(`data-test="delete-btn-one"`)
    .simulate("click");
  expect(spy.toHaveBeenCalledWith(expected));
});

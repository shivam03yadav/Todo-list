import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ListItems from "./ListItem";

configure({ adapter: new Adapter() });

const props = {
  items: [
    { text: "abc", key: 123 },
    { text: "efg", key: 321 },
  ],
};
const setup = (props) => {
  const wrapper = shallow(<ListItems {...props} />).dive();
  return wrapper;
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test("render without crashing", () => {
  const wrapper = setup(props);
  const appComponent = findByTestAttr(wrapper, "main-component-list");
  expect(appComponent.length).toBe(2);
});

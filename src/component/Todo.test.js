import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import Todo from "./Todo";

configure({ adapter: new Adapter() });

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<Todo {...props} />).dive();
  if (state) wrapper.setState(state);
  return wrapper;
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test("render correctly", () => {
  const tree = renderer.create(<Todo />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("render without crashing", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "main-component");
  expect(appComponent.length).toBe(1);
});

test("initially empty list item ", () => {
  const wrapper = setup();
  const initialItemArr = wrapper.state("items");
  expect(initialItemArr.length).toBe(0);
});

test("handling add item function", () => {
  const wrapper = setup();
  const instance = wrapper.instance();
  wrapper.setState({
    currentItem: {
      text: "abc",
      key: "123",
    },
  });
  expect(instance.state.counter).toBe(0);
  const button = findByTestAttr(wrapper, "add-btn");
  button.simulate("click", { preventDefault: () => {} });
  expect(instance.state.counter).toBe(1);
});

test("handling input function", () => {
  const wrapper = setup();
  const instance = wrapper.instance();
  const event = {
    target: { value: "the-value" },
  };
  expect(instance.state.currentItem.text).toBe("");
  const button = findByTestAttr(wrapper, "input-field");
  button.simulate("click", event);
  expect(instance.state.currentItem.text).toBe("the-value");
});

test("handling delete function", () => {
  const wrapper = setup();
  const instance = wrapper.instance();
  wrapper.setState({
    counter: 5,
  });
  const key = {
    key: 123,
  };
  expect(wrapper.find("h1").text()).toBe("Todo List has 5 item");
  instance.deleteItem(key);
  expect(wrapper.find("h1").text()).toBe("Todo List has 4 item");
});

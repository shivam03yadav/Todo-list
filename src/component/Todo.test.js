import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import Todo from "./Todo";
import sinon from "sinon";

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

test("render add button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "add-btn");
  expect(button.length).toBe(1);
});

test("render input field", () => {
  const wrapper = setup();
  const input = findByTestAttr(wrapper, "input-field");
  expect(input.length).toBe(1);
});

test("initially empty list item ", () => {
  const wrapper = setup();
  const initialItemArr = wrapper.state("items");
  expect(initialItemArr.length).toBe(0);
});

test("handling add item function", () => {
  const wrapper = setup();
  const spy = sinon.spy();
  const mockPreventDefault = () => {
    spy();
  };
  const event = {
    preventDefault: mockPreventDefault,
  };
  wrapper.instance().addItem(event);
  expect(spy.called).toBe(true);
});

test("handling input function", () => {
  const wrapper = setup();
  const instance = wrapper.instance();
  const event = {
    target: { value: "the-value" },
  };
  expect(instance.state.currentItem.text).toBe("");
  instance.handleInput(event);
  expect(instance.state.currentItem.text).toBe("the-value");
});

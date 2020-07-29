import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Todo from './Todo';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter()});

describe("todo testing", () => {
    let wrapper;
    beforeEach(() => {
         wrapper = shallow( <Todo /> );
    });

    it('renders correctly when there are no items', () => {
        const tree = renderer.create(<Todo />).toJSON();
        expect(tree).toMatchSnapshot();
      });

    it("should render the wrapper", () => {
        expect(wrapper).toBeDefined();
    })
    it("should call the functions", () => {
        const { add, update, deleteTodo } = wrapper.instance();
        add();
        update( {target: { value: "hello" } })
        deleteTodo( {key: "123"});
    })
    it("should check the input value", () => {
        wrapper.find("input").simulate("change", {
            target: { value: "hello" }
        })
    })
    it('should render the heading', () => {
        expect(wrapper.find("h1").text()).toContain("todo list");
    })
    it('should render the add button to check initial click', () => {
        wrapper.find("#addBtn").simulate("click");
        const text = wrapper.find("items")
        expect(text.length).toBe(0);
    })
    
})
import React, { Component } from 'react'

class Todo extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             input: '',
             items: []
        }
    }

    update = (event) => {
        this.setState({
            input: event.target.value
        })
    }
    add = () => {
        this.setState(prev => {
             return{
                 input: '',
                 items: prev.items.concat(prev.input)
             }
        })
    }

    deleteTodo = (key) => {
        this.setState(prev => {
            let items = [...prev.items];

            items.splice(key, 1);

            return{
                input: '',
                items
            };
        })

    }
    
    render() {
        const { items, input } = this.state
        return (
            <div>
                <h1> todo list</h1>
                <h4>Count is {items.length}</h4>
                <input 
                     className="input"
                     type="text" 
                     value={input} 
                     onChange={this.update}/>
                <button 
                     id="addBtn"
                     type="button" 
                     onClick={this.add}>add item</button>
                <ul>
                {
                    items.map((item, index) => (
                        <div>
                        <li key={index}>{item}{ ' '}
                        <button onClick={() => this.deleteTodo(index)}>X</button>
                        </li>
                        </div>
                    ))
                }
                </ul>
            </div>
        )
    }
}

export default Todo

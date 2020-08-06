import React, { Component } from "react";
import ListItems from "./ListItem";
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(10),
  },
}));

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      counter: 0,
      currentItem: {
        text: "",
        key: "",
      },
    };
  }

  handleInput = (e) => {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now(),
      },
    });
  };

  addItem = (e) => {
    e.preventDefault();
    const { items, currentItem, counter } = this.state;
    const newItem = currentItem;
    if (newItem.text !== "") {
      const newItems = [...items, newItem];
      this.setState({
        items: newItems,
        counter: counter + 1,
        currentItem: {
          text: "",
          key: "",
        },
      });
    }
  };

  incrementCounter = (e) => {
    e.preventDefault();
    const { counter } = this.state;
    this.setState({
      counter: counter + 1,
    });
  };

  deleteItem = (key) => {
    const { items, counter } = this.state;
    const filterItem = items.filter((item) => item.key !== key);
    this.setState({
      items: filterItem,
      counter: counter - 1,
    });
  };

  updateInput = (value, key) => {
    const { items } = this.state;
    const localItem = items;
    localItem.map((item) => {
      if (item.key === key) {
        item.text = value;
      }
      return item.text;
    });
    this.setState({
      items: localItem,
    });
  };

  render() {
    const { currentItem, items, counter } = this.state;
    const { classes } = this.props;
    return (
      <div data-test="main-component">
        <header>
          <h1>Todo List has {counter} item</h1>
          <form id="to-do-form">
            <CssTextField
              data-test="input-field"
              className={classes.margin}
              label="Add Item"
              variant="outlined"
              type="text"
              placeholder="Enter Text"
              value={currentItem.text}
              onChange={this.handleInput}
            />
            <Button
              data-test="add-btn"
              variant="contained"
              size="large"
              className={classes.margin}
              color="primary"
              type="submit"
              onClick={this.addItem}
            >
              Add
            </Button>
          </form>
        </header>
        <ListItems
          items={items}
          deleteItem={this.deleteItem}
          updateInput={this.updateInput}
        ></ListItems>
      </div>
    );
  }
}

export default withStyles(useStyles)(Todo);

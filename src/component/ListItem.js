import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  root: {
    minWidth: 50,
  },
}));

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

function ListItems(props) {
  const { deleteItem, updateInput, classes } = props;
  const items = props.items;
  const ListItems = items.map((item) => {
    return (
      <div data-test="main-component-list" className="list" key={item.key}>
        <p>
          <CssTextField
            className={classes.margin}
            data-test="delete-btn"
            variant="outlined"
            type="text"
            id={item.key}
            value={item.text}
            onChange={(e) => {
              updateInput(e.target.value, item.key);
            }}
          />
          <span>
            <DeleteIcon
              data-test="delete-btn-one"
              className={classes.btn}
              onClick={() => deleteItem(item.key)}
            ></DeleteIcon>
          </span>
        </p>
      </div>
    );
  });
  return <div>{ListItems}</div>;
}

export default withStyles(useStyles)(ListItems);

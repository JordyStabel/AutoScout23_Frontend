import React, { Component, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Form from "./Form";

export default class extends Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleFormSubmit = dish => {
    this.handleToggle();
    this.props.onCreate(dish);
  };

  render() {
    const { open } = this.state,
      { allergies, categories } = this.props;

    return (
      <Fragment>
        <Button variant="fab" onClick={this.handleToggle} mini>
          <Add />
        </Button>
        <Dialog open={open} onClose={this.handleToggle} fullWidth>
          <DialogTitle>Create new dish</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the form below.
            </DialogContentText>
            <Form allergies={allergies} categories={categories} onSubmit={this.handleFormSubmit} />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

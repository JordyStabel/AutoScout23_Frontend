import React, {Component} from "react";
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    Paper
} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Input from "@material-ui/core/Input/Input";

const styles = theme => ({
    FormControl: {
        // None for now
    },
    '@global': {
        'html, body, #root': {
            height: '100%'
        }
    },
    paper: {
        padding: 20,
        margin: 10,
    },
    container: {
        height: '100%',
        overflowY: 'auto',
    }
});

export default withStyles(styles)(
    class extends Component {
        state = this.getInitialState();

        getInitialState() {
            const {dish} = this.props;

            return dish
                ? dish
                : {
                    title: "",
                    description: "",
                    allergies: "",
                    makes: "",
                    categories: ""
                };
        }

        componentWillReceiveProps({dish}) {
            this.setState({
                ...dish
            });
        }

        handleChange = name => ({target: {value}}) => {
            this.setState({
                [name]: value
            });
            console.log(this.state.make);
        };

        handleSubmit = () => {
            this.props.onSubmit({
                // Create an ID from the title, replacing spaces with '-'
                id: this.state.title.toLocaleLowerCase().replace(/ /g, "-"),
                ...this.state
            });
        };

        render() {
            const {title, description, allergies, make} = this.state,
                {classes, dish, makes} = this.props;
            return (
                <div className={classes.container}>
                    <Paper className={classes.paper}>
                        <TextField
                            label="Title"
                            value={title}
                            onChange={this.handleChange("title")}
                            margin="normal"
                            className={classes.FormControl}
                            fullWidth
                        />
                        <br/>
                        <InputLabel htmlFor="makes">Car Make</InputLabel>
                        <FormControl className={classes.FormControl} fullWidth>
                            <Select
                                value={this.state.make}
                                onChange={this.handleChange("make")}>
                                {makes.map(make => (
                                    <MenuItem value={make}>
                                        {make}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br/>
                        <TextField
                            multiline={true}
                            rows="4"
                            label="Description"
                            value={description}
                            onChange={this.handleChange()}
                            margin="normal"
                            className={classes.FormControl}
                            fullWidth
                        />
                        <br/>
                        <Button
                            color="primary"
                            variant="raised"
                            onClick={this.handleChange()}
                            fullWidth
                            disabled={!title || !allergies || !description}>
                            {dish ? "Edit" : "Search"}
                        </Button>
                    </Paper>
                </div>
            );
        }
    }
);

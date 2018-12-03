import React, {Component, Fragment} from "react";
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper
} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

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
        };

        handleSubmit = () => {
            this.props.onSubmit({
                // Create an ID from the title, replacing spaces with '-'
                id: this.state.title.toLocaleLowerCase().replace(/ /g, "-"),
                ...this.state
            });
        };

        handleOnChangeTemp = () => {

        };

        render() {
            const {title, description, allergies, categories} = this.state,
                {classes, dish, categories: allCategories, allergies: allAllergies} = this.props;
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
                        <FormControl className={classes.FormControl} fullWidth>
                            <InputLabel htmlFor="allergies">Car Type</InputLabel>
                            <Select value={allergies} onChange={this.handleOnChangeTemp()}>
                            </Select>
                        </FormControl>
                        <br/>
                        <TextField
                            multiline={true}
                            rows="4"
                            label="Description"
                            value={description}
                            onChange={this.handleOnChangeTemp()}
                            margin="normal"
                            className={classes.FormControl}
                            fullWidth
                        />
                        <br/>
                        <Button
                            color="primary"
                            variant="raised"
                            onClick={this.handleOnChangeTemp()}
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

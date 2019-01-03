import React, {Component} from "react";
import {
    Button,
    //TextField,
    FormControl,
    InputLabel,
    Select,
    Paper
} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
//import Input from "@material-ui/core/Input/Input";
import Typography from "@material-ui/core/Typography/Typography";

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
        };

        handleSubmit = () => {
            this.props.onSubmit({
                // Create an ID from the title, replacing spaces with '-'
                id: this.state.title.toLocaleLowerCase().replace(/ /g, "-"),
                ...this.state
            });
        };

        render() {
            const {make} = this.state, //title, description, allergies,
                {classes, makes, onSearch, onResetFilter} = this.props; //dish,
            return (
                <div className={classes.container}>
                    <Paper className={classes.paper}>
                        <Typography variant={"headline"} align={"center"}
                                    style={{margin: 25}}>Filter by Make</Typography>
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
                        <Button
                            color="primary"
                            variant="raised"
                            onClick={() => onSearch(this.state.make)}
                            fullWidth
                            disabled={!make}
                            style={{marginTop: 15}}>
                            {make == null ? "Select make" : "Search"}
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() => onResetFilter()}
                            fullWidth
                            style={{marginTop: 15}}>
                            REST FILTER
                        </Button>
                    </Paper>
                </div>
            );
        }
    }
);

import React, {Component} from "react";
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
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
    }
});

export default withStyles(styles)(
    class extends Component {
        state = this.getInitialState();

        getInitialState() {
            const {car} = this.props;

            return car
                ? car
                : {
                    title: "",
                    description: "",
                    make: "",
                    price: ""
                };
        }

        componentWillReceiveProps({car}) {
            this.setState({
                ...car
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
            const {title, description, makes} = this.state,
                {classes, car, makes: allMakes} = this.props;
            return (
                <form>
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
                        <InputLabel htmlFor="car-makes">Makes</InputLabel>
                        <Select value={makes} onChange={this.handleChange("makes")}>
                            {allMakes.map(make => (
                                <MenuItem key={make} value={make}>
                                    {make}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br/>
                    <TextField
                        id="standard-number"
                        label="Price $"
                        value={this.state.price}
                        onChange={this.handleChange("price")}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        fullWidth={true}
                    />
                    <br/>
                    <br/>
                    <TextField
                        multiline={true}
                        rows="4"
                        label="Description"
                        value={description}
                        onChange={this.handleChange("description")}
                        margin="normal"
                        className={classes.FormControl}
                        fullWidth
                    />
                    <TextField
                        label="Image URL"
                        value={title}
                        onChange={this.handleChange("title")}
                        margin="normal"
                        className={classes.FormControl}
                        fullWidth
                    />
                    <br/>
                    <br/>
                    <Button
                        color="primary"
                        variant="raised"
                        onClick={this.handleSubmit}
                        fullWidth
                        disabled={!title || !makes || !description}>
                        {car ? "EDIT" : "SUBMIT"}
                    </Button>
                </form>
            );
        }
    }
);

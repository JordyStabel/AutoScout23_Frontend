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
import NumberFormat from 'react-number-format';

const styles = theme => ({
    '@global': {
        'html, body, #root': {
            height: '100%'
        }
    }
});

function NumberFormatPrice(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            allowNegative={false}
            prefix="$"
        />
    );
}

function NumberFormatMileage(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            allowNegative={false}
            suffix=" mi"
        />
    );
}

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

        render() {
            const {model, description, make, price, mileage, image, carOwner} = this.state,
                {classes, car, makes: allMakes, onSubmit} = this.props;
            return (
                <form>
                    <TextField
                        id="new-car-model-input"
                        label="Model"
                        value={model}
                        onChange={this.handleChange("model")}
                        margin="normal"
                        className={classes.FormControl}
                        fullWidth
                    />
                    <br/>
                    <FormControl
                        id="new-car-make-select"
                        className={classes.FormControl}
                        fullWidth>
                        <InputLabel htmlFor="car-makes">Make</InputLabel>
                        <Select
                            value={make}
                            onChange={this.handleChange("make")}>
                            {allMakes.map(make => (
                                <MenuItem id="new-car-make-select-options" key={make} value={make}>
                                    {make}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br/>
                    <TextField
                        id="new-car-owner-input"
                        label="Car Owner"
                        value={carOwner}
                        onChange={this.handleChange("carOwner")}
                        margin="normal"
                        className={classes.FormControl}
                        fullWidth
                    />
                    <br/>
                    <TextField
                        id="new-car-price-input"
                        label="Price $"
                        value={price}
                        onChange={this.handleChange("price")}
                        fullWidth={true}
                        InputProps={{
                            inputComponent: NumberFormatPrice,
                        }}
                    />
                    <br/>
                    <TextField
                        id="new-car-milage-input"
                        label="Mileage"
                        value={mileage}
                        onChange={this.handleChange("mileage")}
                        fullWidth={true}
                        InputProps={{
                            inputComponent: NumberFormatMileage,
                        }}
                    />
                    <br/>
                    <TextField
                        id="new-car-desciption-input"
                        multiline={true}
                        rows="4"
                        label="Description"
                        value={description}
                        onChange={this.handleChange("description")}
                        className={classes.FormControl}
                        fullWidth
                    />
                    <TextField
                        id="new-car-imageURL-input"
                        label="Image URL"
                        value={image}
                        onChange={this.handleChange("image")}
                        margin="normal"
                        className={classes.FormControl}
                        fullWidth
                    />
                    <br/>
                    <br/>
                    <Button
                        id="new-car-submit-button"
                        color="primary"
                        variant="raised"
                        onClick={() => onSubmit(this.state)}
                        fullWidth
                        disabled={!model || !make || !carOwner || !description}>
                        {car ? "EDIT" : "SUBMIT"}
                    </Button>
                </form>
            );
        }
    }
);

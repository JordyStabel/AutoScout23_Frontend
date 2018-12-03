import React, {Fragment} from "react";
import {
    Paper,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Button,
    IconButton,
    Avatar
} from "@material-ui/core";
import {Add, Delete, Edit, Remove, Fastfood, Pets, Whatshot} from "@material-ui/icons";
import Form from "./Form";
import {withStyles} from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import Item from "./Item.js";

const styles = theme => ({
    paper: {
        padding: 20,
        margin: 10,
        height: 500,
        overflowY: "auto"
    },
    orderButton: {
        flex: 1,
        background: "green"
    },
    avatarContainer: {
        display: 'flex',
        flex: 1,
        background: 'Red',
        flexDirection: 'row',
        maxWidth: 225,
        flexWrap: 'wrap'
    },
    dishItem: {
        padding: 20,
        height: "auto",
        margin: 5,
        overflowY: "auto"
    },
    categoryWrapper: {
        padding: 20,
        height: "auto",
        margin: 10,
        overflowY: "auto"
    },
    "@global": {
        "html, body, #root": {
            height: "100%"
        }
    },
    container: {
        height: "100%",
        overflowY: "auto"
    },
    button: {
        margin: theme.spacing.unit
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    avatar: {
        margin: 5,
    },
});

export default withStyles(styles)(
    ({
         classes,
         allergies,
         dishes,
         cars,
         dish,
         category,
         editMode,
         onSelect,
         dish: {
             id,
             title = "Welcome!",
             description = "Please select a dish from the list on the left",
             price = 5,
             amount = 0
         },
         onDelete,
         onSelectEdit,
         onEdit,
         onAddItem,
         onRemoveItem,
         showAll
     }) => (
        <Grid container className={classes.container}>
            {/*Generated items form 'database'*/}
            <Grid item xs={12}>
                {dishes.map(
                    ([group, dishes]) =>
                        !category || category === group ? (
                            <Paper key={group} className={classes.categoryWrapper}>
                                <Fragment key={group}>
                                    <Typography variant="headline">{group}</Typography>
                                    {cars.map(({make, model, mileage, price, created}, index) => (price > 250000 || showAll) ? (
                                        <Item car={cars[index]}/>
                                    ) : null)}
                                </Fragment>
                            </Paper>
                        ) : null
                )}
            </Grid>
        </Grid>
    )
);

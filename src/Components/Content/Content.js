import React, {Fragment} from "react";
import {
    Paper,
    Grid,
    Typography,
} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import Item from "./Item.js";

const styles = theme => ({
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
         cars,
         category,
         onSelect,
         onDelete
     }) => (
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Paper className={classes.categoryWrapper} id="car-content-grid">
                    <Fragment>
                        <Typography variant="headline">Second hand cars</Typography>
                        {cars.map(({make, model, mileage, price, created, carID}, index) =>
                            <Item key={index} car={cars[index]} onDelete={onDelete}/>
                        )}
                    </Fragment>
                </Paper>
            </Grid>
        </Grid>
    )
);

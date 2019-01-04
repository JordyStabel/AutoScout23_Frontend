import React from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import CreateDialog from "../Content/Create";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
//import {toggleTheme} from "../../index";

let isChecked = false;

function themeSwitch() {
    //toggleTheme();
    isChecked = !isChecked;
}

export default ({allergies, categories, onDishCreate, makes, toggleShowAll, showAll, onRequestBill, order}) => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="title" color="inherit" style={{flex: 1, marginLeft: 20}}>
                AutoScout23 - Buy & Sell Cars
            </Typography>
            <FormControlLabel
                control={
                    <Switch
                        color="secondary"
                        onChange={themeSwitch}
                    />
                }
                label={isChecked ? "Light-mode" : "Dark-mode"}
            />
            {/*<FormControlLabel*/}
                {/*control={*/}
                    {/*<Switch*/}
                        {/*color="secondary"*/}
                        {/*onChange={toggleShowAll}*/}
                    {/*/>*/}
                {/*}*/}
                {/*label={showAll ? "Show selected dishes" : "Show all dishes"}*/}
            {/*/>*/}
            <CreateDialog allergies={allergies} categories={categories} makes={makes} onCreate={onDishCreate}/>
        </Toolbar>
    </AppBar>
);

import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App.js";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {orange, grey} from "@material-ui/core/colors";

let isDarkTheme = false;

export const toggleTheme = () => {
    isDarkTheme = !isDarkTheme;
    ReactDOM.render(
        <MuiThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
            <App changeTheme={toggleTheme.bind(this)}/>
        </MuiThemeProvider>,
        document.getElementById("root")
    );
};

const lightTheme = createMuiTheme({
    palette: {
        type: "light",
        primary: orange,
        secondary: {
            main: grey[50],
            light: grey[50],
            dark: grey[50]
        }
    }
});

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: orange,
        secondary: {
            main: grey[50],
            light: grey[50],
            dark: grey[50]
        }
    }
});

ReactDOM.render(
    <MuiThemeProvider
        theme={lightTheme}
    >
        <App changeTheme={lightTheme}/>
    </MuiThemeProvider>,
    document.getElementById("root")
);

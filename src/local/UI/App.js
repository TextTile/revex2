import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./roots/Home/Home";
import Welcome from "./roots/Welcome/Welcome";

import DataSetDetail from "./roots/DatasetDetail/DataSetDetail";

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import "./Theme.css";
import "./App.css";
import "react-virtualized/styles.css";
import "../../../node_modules/semantic-ui-css/semantic.min.css";

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import background from "../assets/background.png";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: "#006CAB",
        primary2Color: "#006CAB",
        primary3Color: "#006CAB"
    },
    appBar: {
        height: 50
    }
});
/*Change to Web = <Router basename="/revex/demo/"> */
const App = () =>
    <MuiThemeProvider muiTheme={muiTheme}>
        <Router basename="/revex/ict4sd">
            <div style={{ backgroundImage: `url(${background})`, backgroundAttachment: "fixed", overflow: "auto", backgroundSize: "cover", height: "100%" }}>
                <div style={{ height: "100%", zIndex: 2 }}>
                    <Route exact path="/" component={Welcome} />
                    <Route exact path="/Home" component={Home} />
                    <Route path="/Dataset" component={DataSetDetail} />
                    <Route path="/Welcome" component={Welcome} />
                </div>
            </div>
        </Router>
    </MuiThemeProvider>;

export default App;

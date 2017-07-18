import React, { Component } from "react";
import style from "./TopBar.css";
import SearchBox from "../SearchBox/SearchBox";
import { withRouter } from "react-router";
import MainControls from "../MainControls/MainControls";
import { withRemote } from "../../Utils";
//import SelectedFilters from '../SelectedFilters/SelectedFilters'

class TopBar extends Component {
    render() {
        return (
            <div className={style.topContainer}>
                <div className={style.titleBar}>
                    <div style={{ cursor: "pointer" }} onClick={() => this.props.history.push("/Welcome")}>Cybersecurity Strategies Explorer</div>
                    {/*<div className={style.aboutButton}>ABOUT</div>*/}
                </div>
                <div className={style.topBar}>
                    <MainControls />
                    <SearchBox />
                </div>
            </div>
        );
    }
}

export default withRemote(withRouter(TopBar));

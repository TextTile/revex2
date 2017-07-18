import React, { Component } from "react";
import DataSetsList from "../../views/DataSetsList/DataSetsList";
import style from "./DataSets.css";
import logo from "../../../assets/Logo.svg";
import { connect } from "react-redux";

class DataSets extends Component {
    render() {
        return (
            <div className={style.dataSets}>

                <div className={style.container}>
                    <div className={style.logo}>
                        <img src={logo} alt="RevEx" />
                    </div>
                    <div className={style.panel}>
                        <DataSetsList readonly={this.props.readonly} />
                    </div>
                    {!this.props.readonly &&
                        <div className={style.controls}>
                            <button
                                className="button"
                                style={{ color: "white" }}
                                onClick={() => {
                                    this.props.push("/Dataset", {});
                                }}>
                                New Dataset
                            </button>
                        </div>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        readonly: state.readonly
    };
};

export default connect(mapStateToProps)(DataSets);

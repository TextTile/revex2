import React, { Component } from "react";
import DataSetItem from "../../primitives/DataSetItem/DataSetItem";
import { connect } from "react-redux";
import _ from "lodash";
import styles from "./DataSetsList.css";
import remote from "../../../../remote";
import { withRouter } from "react-router";

class DataSetsList extends Component {
    remove = (type, id) => {
        remote.removeDataset(type, id);
    };
    open = dataset => {
        console.log(this.props);
        this.props.history.push("/Home", dataset);
    };
    componentDidMount() {
        //const {datasets = {}} = this.props;
        //this.open(_.values(datasets)[0]);
    }

    componentWillMount() {
        let search = this.props.location.search;
        const { datasets = {} } = this.props;
        if (search) {
            let id = search.replace("?id=", "");
            if (datasets[id]) {
                this.open(datasets[id]);
            }
        }
    }

    componentWillReceiveProps(nextProps) {}

    render() {
        const { datasets = {} } = this.props;
        const datasetList = _.values(datasets).filter(d => !d.hide);
        return (
            <div>
                {datasetList.map((d, i) => <DataSetItem key={i} dataset={d} open={this.open} remove={this.remove} readonly={this.props.readonly} />)}
                {datasetList.length === 0 && <div className={styles.empty}>No Dataset Found</div>}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        datasets: state.datasets
    };
};

export default withRouter(connect(mapStateToProps)(DataSetsList));
